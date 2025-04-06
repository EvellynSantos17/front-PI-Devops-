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
import Link from "next/link";

export default function Page() {
  if (typeof window == "undefined") {
    return;
  }

  const token = BaseService.getToken();
  let info = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

  if (info.accountId == null) {
    return router.push("/finalizar-perfil");
  }

  const { perfil, updateDataUnitValue, updatePerfil } = usePerfil();
  const { updateListService, listService } = UseService();
  const { listContracted, updateListContracted } = UseContracted();

  const [profileImage, setProfileImage] = useState("/images/perfil.png");
  const [originalPerfil, setOriginalPerfil] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

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
  
  FetchFindById({
    id: info.accountId,
    serviceName: "UserProfileService",
    onDataFetched: (value) => {
      updatePerfil(value);
      setOriginalPerfil(value);
    },
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

  useEffect(() => {
    if (!originalPerfil || !perfil) return;

    const changed =
      perfil.name !== originalPerfil.name ||
      perfil.title !== originalPerfil.title ||
      perfil.description !== originalPerfil.description ||
      perfil.phone !== originalPerfil.phone ||
      perfil.document !== originalPerfil.document ||
      perfil.address !== originalPerfil.address ||
      JSON.stringify(perfil.skills) !== JSON.stringify(originalPerfil.skills);

    setHasChanges(changed);
  }, [perfil, originalPerfil]);

  


  FetchFindById({
    id: info.accountId,
    serviceName: "UserProfileService",
    onDataFetched: (value) => updatePerfil(value),
  });

  FetchFindAll({
    serviceName: "ListingService",
    query: { accountId: info.accountId,size: 3 },
    onDataFetched: (value) => updateListService(value),
  });

  FetchFindAll({
    serviceName: "ContractedListingService",
    query: { clientId: info.accountId,size: 3 },
    onDataFetched: (value) => updateListContracted(value),
  });

  const handleUserInfoChange = (field, newValue) => {
    updateDataUnitValue({
      field: field,
      value: newValue,
    });
  };

  const handleConfirmChanges = async () => {
    try {
      await updatePerfil(perfil); 
      setOriginalPerfil({ ...perfil }); 
      handleProfileEdit()

    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  const [edit, setEdit] = useState(false)
  function handleProfileEdit(){
    setEdit(!edit)
  }
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

            <label
              htmlFor="imageUpload"
              className="w-[200px] px-2 py-1 bg-laranjaProdunfo text-white flex items-center justify-center gap-1 rounded-lg cursor-pointer"
            >
              <Image
                alt="edit"
                src={"/icons/edit.svg"}
                width={18}
                height={16}
              />
              <span>Editar foto do perfil</span>
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <div className="flex flex-col items-center justify-center">
              <h1 className="font-bold text-2xl whitespace-nowrap">
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
                    isOwner={edit}
                  />
                  <UserInforCard
                    title={"Seu titulo"}
                    value={perfil.title}
                    onChange={(newValue) =>
                      handleUserInfoChange("title", newValue)
                    }
                    isOwner={edit}
                  />
                  <UserInforCard
                    title={"Sobre você"}
                    value={perfil.description}
                    onChange={(newValue) =>
                      handleUserInfoChange("description", newValue)
                    }
                    isOwner={edit}
                  />
                  <UserInforCard
                    title={"Contato"}
                    value={perfil.phone}
                    onChange={(newValue) =>
                      handleUserInfoChange("phone", newValue)
                    }
                    isOwner={edit}
                  />
                  <UserInforCard
                    title={"CPF"}
                    value={perfil.document}
                    onChange={(newValue) =>
                      handleUserInfoChange("document", newValue)
                    }
                    isOwner={edit}
                  />
                  <UserInforCard
                    title={"Localização"}
                    value={perfil.address}
                    onChange={(newValue) =>
                      handleUserInfoChange("address", newValue)
                    }
                    isOwner={edit}
                  />
                  <UserInforCardMult
                    title={"Habilidades"}
                    value={perfil.skills.map((skill) => {                      
                      return { value: skill, label: skill };
                    })}
                    onChange={(newValue) => 
                      handleUserInfoChange("skills", newValue)
                    }
                    isOwner={edit}
                  />
                </>
              ) : null}
              {edit ? (
                <button
                  onClick={handleConfirmChanges}
                  className="border font-bold bg-[#F97316] rounded-xl shadow-md p-2 text-center text-[#FFDCC3]"
                >
                  Confirmar alterações
                </button>
              ):(
                <button className="border font-bold bg-[#F97316] rounded-xl shadow-md p-2 text-center text-[#FFDCC3]" onClick={handleProfileEdit}>
                  Editar Perfil
                </button>

              )}
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
                {listService.content.length > 0 && listService.content[0].id ? (
                  listService.content.map((item, index) => {
                    return (
                      <CardService
                        key={index}
                        id={item.id}
                        created_at={item.creationDate}
                        location={item.location}
                        title={item.title}
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
                {listService.content.length > 0 &&
                  listService.content[0].id && (
                    <Link
                      className="border font-bold bg-[#F97316]  rounded-xl shadow-md p-2 text-center text-[#FFDCC3]"
                      href={"servicos/prestados"}
                    >
                      Ver todos os contratos
                    </Link>
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
                        id={item.listing.id}
                        created_at={item.listing.creationDate}
                        location={item.listing.location}
                        title={item.listing.title}
                        type={"Freelancer"}
                        has_button={false}
                        orange={false}
                      />
                    );
                  })
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <h1>Nenhum serviço contratado!</h1>
                  </div>
                )}
                {listContracted.content.length > 0 &&
                  listContracted.content[0].id && (
                    <Link
                      className="border font-bold bg-[#F97316] rounded-xl shadow-md p-2 text-center text-[#FFDCC3]"
                      href={"servicos/contratados"}
                    >
                      Ver todos os contratos
                    </Link>
                  )}
              </div>
            </div>
          </section>
        </section>
      </section>
    </section>
  );
}
