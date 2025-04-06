"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import FetchFindAll from "@/hooks/fetch/fetch-find-all";
import { UseContracted } from "@/hooks/use-contracted";
import BaseService from "@/services/base-service";
import StatusComponent from "@/components/ui/contrato-card";

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

  function parseDate(dateString) {
    return new Date(dateString).toLocaleDateString("pt-BR");
  }

  function calculateTotals(contractedListing) {
    try {
      let startedAt = new Date(contractedListing.startedAt);

      let finishedAt = new Date(contractedListing.finishedAt);
      let difference = finishedAt.getTime() - startedAt.getTime();
      let days = Math.round(difference / (1000 * 3600 * 24));
      return String(days) + "dias";
    } catch (e) {
      return "error";
    }
  }

  function handleAccept(id) {
    window.alert("handleAccept");
  }

  function handleCancel(id) {
    window.alert("handleCancel");
  }

  function handleFinish(id) {
    window.alert("handleFinish");
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
                    <div className="flex gap-2">
                      <button
                        className="border bg-[#F97316] rounded-xl shadow-md p-2"
                        onClick={() => handleFinish(contractedListing.id)}
                      >
                        Finalizar Serviço
                      </button>
                      <button
                        className="border bg-[#FF00004D] rounded-xl shadow-md p-2"
                        onClick={() => handleCancel(contractedListing.id)}
                      >
                        Cancelar
                      </button>

                    </div>
                    
                  )}
                  {contractedListing.status === "ACCEPTED" && (
                    <button
                      className="border bg-[#F97316] rounded-xl shadow-md p-2 "
                      onClick={() => handleAccept(contractedListing.id)}
                    >
                      Cancelar
                    </button>
                  )}

                  {contractedListing.status === "FINISHED" && <></>}
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
