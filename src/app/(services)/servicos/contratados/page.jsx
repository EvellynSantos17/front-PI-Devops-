"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import FetchFindAll from "@/hooks/fetch/fetch-find-all";
import { UseContracted } from "@/hooks/use-contracted";
import BaseService from "@/services/base-service";
import StatusComponent from "@/components/ui/contrato-card";
import ContractedListingService from "@/services/contracted-listing-service";
import Link from "next/link";

export default function Page() {
  if (typeof window == "undefined") {
    return;
  }
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const { listContracted, updateListContracted } = UseContracted();
  const token = BaseService.getToken();
  let info = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

  FetchFindAll({
    serviceName: "ContractedListingService",
    query: { page: page == null ? 0 : page, clientId: info.accountId },
    onDataFetched: (value) => updateListContracted(value),
  });

  function handleAccept(id) {
    ContractedListingService.updateStatus(id, "STARTED");
    window.location.reload();
  }

  function handleCancel(id) {
    ContractedListingService.delete(id);
    window.location.reload();
  }

  function handleFinish(id) {
    ContractedListingService.updateStatus(id, "ACCEPTED");
    window.location.reload();
  }

  // nessa função de baixo eu pensei o seguinte quando o prestador finalizar e o servico não foi concluido e ele apertar em cancelar o finalizar servico ele voltar para estado de started
  function handleCancelFineshed(id) {
    ContractedListingService.updateStatus(id, "STARTED");
    window.location.reload();
  }

  return (
    <section className="flex flex-col pt-10 bg-bege items-center justify-center">
      <div className="w-full max-w-[1168px] bg-white px-8 pt-5 pb-10 rounded-t-2xl">
        <Image
          className="w-full rounded-2xl"
          alt="varias pessoas foto"
          src={"/images/Rectangle50.png"}
          width={1056}
          height={182}
        />
        <h1 className="flex flex-col items-center justify-center font-bold text-[40px] ">
          Serviços Contratados
        </h1>
        <span className="flex flex-col items-center justify-center text-base text-[#757575]">
          Gerencie seus serviços e acompanhe o status de cada contratação
        </span>

        {listContracted.content.map((contractedListing, index) => {
          return (
            <div key={index} className=" h-full p-2 gap-4">
              <div className="flex flex-col py-2 px-10 border border-[#0000006B] rounded-xl gap-2">
                <div className="flex w-full justify-between gap-2">
                  <div>
                    <div className="flex gap-4 mt-4">
                      <Image
                        className="rounded-full w-[50px] h-[50px]"
                        alt="perfil"
                        src={"/images/perfil.png"}
                        width={50}
                        height={50}
                      />
                      <div className="mt-1">
                        <h2 className="font-bold ">
                          {contractedListing.listing.userProfile.name}
                        </h2>
                        <span className="text-[#03000080]">Anunciante</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-2xl flex mt-5">
                      {contractedListing.listing.title}
                    </h3>
                    <div className=" flex text-sl text-[#585858] gap-2">
                      <Image
                        className="h-[17.17px] w-[18.81px]"
                        alt="work"
                        src={"/icons/work.png"}
                        height={17.17}
                        width={18.81}
                      />
                      ID do anúncio: {contractedListing.listingId}
                      <ul className="list-disc pl-4">
                        <li>ID do serviço: {contractedListing.id}</li>
                      </ul>
                    </div>
                  </div>

                  <StatusComponent statusCard={contractedListing.status} />
                </div>
                <div className="flex gap-56">
                  <div className="flex gap-2">
                    <Image
                      alt="dinheiro"
                      src={"/icons/dinheiro.png"}
                      width={54}
                      height={52}
                    />
                    <div>
                      <span className="text-[#03000080]">Valor total</span>
                      <h2 className="font-bold">
                        R$ {contractedListing.listing.price}
                      </h2>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Image
                        alt="Whatsapp"
                        src={"/icons/whatsapp-logo-light.png"}
                        width={54}
                        height={52}
                      />
                      <div>
                      <h2 className="text-[#03000080]">Contato</h2>
                      <Link
                          className="font-bold"
                          href={`https://wa.me/55${contractedListing.client.phone}/?text=Olá%2C%20tudo%20bem%3F%20Me%20chamo%20${contractedListing.listing.userProfile.name}.%0Estou%20interessado%20no%20seu%20serviço:%20${contractedListing.listing.id}%20-%20${contractedListing.listing.title}%20e%20estou%20disponível%20para%20conversar%20sobre%20os%20detalhes.`}
                        >
                          WhatsApp
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end border-t py-2 border-[#757575] gap-4 ">
                  {contractedListing.status === "CONTRACTED" && (
                    <button
                      className="border bg-[#FF00004D] rounded-xl shadow-md p-2"
                      onClick={() => handleCancel(contractedListing.id)}
                    >
                      Cancelar
                    </button>
                  )}

                  {contractedListing.status === "STARTED" && (
                    <button
                      className="border bg-[#FF00004D] rounded-xl shadow-md p-2"
                      onClick={() => handleCancel(contractedListing.id)}
                    >
                      Cancelar
                    </button>
                  )}
                  {contractedListing.status === "ACCEPTED" && (
                    <button
                      className="border bg-[#F97316] rounded-xl shadow-md p-2 "
                      onClick={() => handleAccept(contractedListing.id)}
                    >
                      Avaliar
                    </button>
                  )}
                  {contractedListing.status === "FINISHED" && (
                    <div className="flex gap-2">
                      <button
                        className="border bg-[#F97316] rounded-xl shadow-md p-2 "
                        onClick={() => handleFinish(contractedListing.id)}
                      >
                        Finalizar
                      </button>
                      <button
                        className="border bg-[#FF00004D] rounded-xl shadow-md p-2 "
                        onClick={() =>
                          handleCancelFineshed(contractedListing.id)
                        }
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                  {contractedListing.status === "CANCELLED" && <></>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
