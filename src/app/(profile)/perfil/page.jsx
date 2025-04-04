"use client";

import UserInforCardMult from "@/components/ui/user-infor-card-mult";
import UserInforCard from "@/components/ui/user-infor-card";
import FetchFindAll from "@/hooks/fetch/fetch-find-all";
import ListingService from "@/services/listing-service";
import CardService from "@/components/ui/card-service";
import { UseContracted } from "@/hooks/use-contracted";
import { UseService } from "@/hooks/use-services";
import BaseService from "@/services/base-service";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePerfil } from "@/hooks/use-perfil";
import FetchFindById from "@/hooks/fetch/fetch-find-by-id";

export default function Page() {
  if (typeof window == "undefined") {
    return;
  }

  const token = BaseService.getToken();
  let info = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

  if (info.accountId == null) {
    return router.push("/finalizar-perfil");
  }

  
  const [profileImage, setProfileImage] = useState("/images/perfil.png");
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleUserInfoChange = (field, newValue) => {
    updateDataUnitValue({
      field: field,
      value: newValue,
    });
  };
  
  const { perfil, updateDataUnitValue, updatePerfil } = usePerfil();
  const {updateListService, listService} = UseService();
  const {listContracted, updateListContracted} = UseContracted();

  FetchFindById({
    id: info.accountId,
    serviceName: "UserProfileService",
    onDataFetched: (value) => updatePerfil(value),
  });

  FetchFindAll({
    serviceName: "ListingService",
    query: { accountId: info.accountId },
    onDataFetched: (value) => updateListService(value),
  });

  FetchFindAll({
    serviceName: "ContractedListingService",
    query: { clientId: info.accountId },
    onDataFetched: (value) => updateListContracted(value),
  });

  return (
    <section className="bg-[#FFD6B9] px-10 py-2 h-full pb-32 overflow-auto flex flex-col gap-2 xl:px-10">
      <div className="relative w-full h-fit p-2 bg-white rounded-xl">
        <div className="w-full h-[164px] rounded-xl relative bg-gradient-to-r from-[#F97316] to-[#F9731680]"></div>

        <div className="w-full h-[200px] flex items-center justify-center -translate-y-[40%]">
          <div className="flex flex-col items-center justify-center max-w-[300px] gap-2">
            <Image
              alt="perfil"
              src={profileImage}
              width={200}
              height={200}
              className="rounded-xl"
            />

            <div
              htmlFor="imageUpload"
              className="w-[200px] px-2 py-1 bg-laranjaProdunfo text-white flex items-center justify-center gap-1 rounded-lg cursor-pointer"
            >
              <Image
                alt="edit"
                src={"/icons/edit.svg"}
                width={18}
                height={16}
              />
              <span>
                Editar foto do perfil
              </span>
            </div>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <div className="flex flex-col items-center justify-center">
              <h1 className="font-bold text-2xl">
                {perfil.name ? perfil.name : "carregando..."}
              </h1>

              <span className="text-sm text-[#32292F8F]">
                {perfil.title ? perfil.title : "carregando..."}
              </span>
            </div>

            <div className="flex w-full justify-between gap-10">
              <div className="flex flex-col items-center justify-center">
                <span className="font-bold text-xl">
                  {listService.page.totalElements}
                </span>
                <span className="text-[#32292F8F] text-sm">
                  Anúncios feitos
                </span>
              </div>

              <div className="flex flex-col items-center justify-center">
                <span className="font-bold text-xl">
                  {listContracted.page.totalElements}
                </span>
                <span className="text-[#32292F8F] text-sm">
                  Serviços contratados
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="flex flex-col md:flex-row justify-between w-full gap-4 h-full">
        <section className="w-full">
          <div className="bg-white rounded-xl h-full p-2">
            <div className="py-2">
              <h1 className="font-bold text-2xl flex flex-col items-center justify-center px-10">
                Minhas Informações
              </h1>
            </div>

            <div className="flex flex-col gap-4">
              {perfil.name ? (
                <>
                  <UserInforCard
                    title={"Nome"}
                    value={perfil.name}
                    onChange={(newValue) =>
                      handleUserInfoChange("name", newValue)
                    }
                    isOwner={true}
                  />
                  <UserInforCard
                    title={"Seu titulo"}
                    value={perfil.title}
                    onChange={(newValue) =>
                      handleUserInfoChange("title", newValue)
                    }
                    isOwner={true}
                  />
                  <UserInforCard
                    title={"Sobre você"}
                    value={perfil.description}
                    onChange={(newValue) =>
                      handleUserInfoChange("about", newValue)
                    }
                    isOwner={true}
                  />
                  <UserInforCard
                    title={"Contato"}
                    value={perfil.phone}
                    onChange={(newValue) =>
                      handleUserInfoChange("contact", newValue)
                    }
                    isOwner={true}
                  />
                  <UserInforCard
                    title={"CPF"}
                    value={perfil.document}
                    onChange={(newValue) =>
                      handleUserInfoChange("cpf", newValue)
                    }
                    isOwner={true}
                  />
                  <UserInforCard
                    title={"Localização"}
                    value={perfil.address}
                    onChange={(newValue) =>
                      handleUserInfoChange("location", newValue)
                    }
                    isOwner={true}
                  />
                  <UserInforCardMult
                    title={"Habilidades"}
                    value={perfil.skills.map((skill) => {
                      return { value: skill, label: skill };
                    })}
                    isOwner={true}
                  />
                </>
              ) : null}
            </div>
          </div>
        </section>

        <section className="w-full flex flex-col gap-4 h-full">
          <section className="w-full h-full">
            <div className="bg-white rounded-xl flex flex-col h-full p-2 gap-4">
              <div className="py-2">
                <h1 className="font-bold text-2xl flex flex-col items-center justify-center px-10">
                  Meus anúncios de serviços
                </h1>
                <p className="flex flex-col items-center justify-center text-sm text-[#32292F8F]">
                  Aqui você encontra seus anúncios cadastrados
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {listService.content.length > 0  &&
                listService.content[0].id? (
                  listService.content.map((item, index) => {
                    return (
                      <CardService
                        key={index}
                        created_at={"Postado há 2 dias"}
                        location={"Crato, CE"}
                        title={"Landing Page"}
                        type={"Freelancer"}
                        has_button
                        orange
                      />
                    );
                  })
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <h1>Nenhum anúncio postado!</h1>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="w-full h-full">
            <div className="bg-white rounded-xl flex flex-col h-full p-2 gap-4">
              <div className="py-2">
                <h1 className="font-bold text-2xl flex flex-col items-center justify-center px-10">
                  Meus serviços contratados
                </h1>
                <p className="flex flex-col items-center justify-center text-sm text-[#32292F8F]">
                  Aqui você encontra seus serviços contratados por outros
                  profissionais
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {listContracted.content.length > 0 &&
                listContracted.content[0].id ? (
                  listContracted.content.map((item, index) => {
                    return (
                      <CardService
                        key={index}
                        created_at={"Postado há 2 dias"}
                        location={"Crato, CE"}
                        title={"Landing Page"}
                        type={"Freelancer"}
                        has_button
                        orange={false}
                      />
                    );
                  })
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <h1>Nenhum serviço contratado!</h1>
                  </div>
                )}
              </div>
            </div>
          </section>
        </section>
      </section>
    </section>
  );
}
