"use client";
import CardService from "@/components/ui/card-service";
import PageNavigator from "@/components/ui/pagination";
import FetchFindAll from "@/hooks/fetch/fetch-find-all";
import { UseService } from "@/hooks/use-services";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function page() {
  if (typeof window == "undefined") {
    return;
  }
  try {
    const params = useSearchParams();
    const page = params.get("page");
    const title = params.get("title");
    const route = useRouter()
    function hanleSubmit(e) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const {search} = Object.fromEntries(formData);
      route.push(`/servicos?title=${search}&page=0`);
    }
    const { listService, updateListService } = UseService();
    
    FetchFindAll({
      serviceName: "ListingService",
      attFetch: params,
      query: {
        page: page ? page : 0,
        size: 10,
        sortBy:'creationDate',
        title: title ? title : "",
      },
      onDataFetched: (value) => updateListService(value),
    });

  
    return (
<Suspense fallback={<div>Carregando...</div>}>
  <section className="flex flex-col items-center flex-1 bg-bege justify-start min-h-screen py-10 px-4 sm:px-6">
    <form 
      onSubmit={(e) => hanleSubmit(e)} 
      className="max-w-[1200px] w-full flex items-center p-1 overflow-hidden rounded-3xl border border-laranjaProdunfo bg-white"
    >
      <div className="flex items-center gap-1 justify-center w-full">
        <div className="border-r w-10 h-10 flex items-center justify-center">
          <Image alt="lupa-lalanja" src={"/icons/lupa-lalanja.png"} width={20} height={20} />
        </div>
        <input
          name="search"
          type="text"
          className="w-full bg-transparent border-none outline-none text-sm sm:text-base px-2 py-2"
          placeholder="Pesquise o Serviço Desejado..."
        />
      </div>
    </form>

    <div className="max-w-[1200px] w-full pt-6">
      <h1 className="font-bold text-2xl flex gap-2 items-center">
        Resultado {title.length > 0 && '>'}
        <span className="text-laranjaProdunfo">{title}</span>
      </h1>
    </div>

    <div className="w-full max-w-[1200px] pt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {listService.content.length > 0 ? (
          listService.content.map((item, index) => {
            if (!item.id) return null
            return (
              <CardService
                key={index}
                id={item.id}
                created_at={item.creationDate}
                location={item.location}
                title={item.title}
                type="Free-Lancer"
                has_button={false}
                orange
              />
            )
          })
        ) : (
          <div className="col-span-full flex justify-center items-center min-h-[200px] bg-white rounded-xl shadow text-gray-600">
            <span>Nada Encontrado</span>
          </div>
        )}
      </div>
    </div>

    <div className="py-10">
      <PageNavigator
        correntPage={page ? page : 0}
        sizePages={listService.page.totalPages}
        title={title ? title : null}
      />
    </div>
  </section>
</Suspense>

    );
  } catch (error) {
    console.log(`Prefiro ser apagado do que explicar esse erro aqui: ${error}`)
  }
}
