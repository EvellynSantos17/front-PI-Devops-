"use client";
import CardService from "@/components/ui/card-service";
import FetchFindAll from "@/hooks/fetch/fetch-find-all";
import { UseService } from "@/hooks/use-services";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function page() {
  const route = useRouter();
  function hanleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { search } = Object.fromEntries(formData);
    route.push(`/servicos?title=${search}&page=0`);
  }
  const { listService, updateListService } = UseService();
  const att = null;
  FetchFindAll({
    serviceName: "ListingService",
    attFetch: att,
    query: {
      page: 0,
      size: 6,
      sortBy: "creationDate",
      title: "",
    },
    onDataFetched: (value) => updateListService(value),
  });
  return (
    <section className="w-full h-full justify-center items-center gap-2 flex flex-col">
      <div className="w-full h-full flex justify-center items-center bg-laranjaProdunfo gap-10">
        <div className="w-full h-full max-w-[300px]">
          <div>
            <h2 className="text-3xl">Encontre o</h2>
            <h2 className="text-3xl">Serviço que você</h2>
            <h2 className="text-3xl">Deseja aqui!</h2>
          </div>
          <form
            onSubmit={(e) => hanleSubmit(e)}
            className="w-full flex items-center p-1 overflow-hidden rounded-3xl border border-laranjaProdunfo mt-2 bg-white"
          >
            <div className="flex items-center gap-1 justify-center w-full">
              <div className="border-r w-10 h-10 flex items-center justify-center">
                <Image
                  alt="lupa-lalanja"
                  src={"/icons/lupa-lalanja.png"}
                  width={20}
                  height={20}
                />
              </div>
              <input
                name="search"
                type="text"
                className="w-full bg-transparent border-none outline-none text-sm sm:text-base px-2 py-2"
                placeholder="Pesquise o Serviço Desejado..."
              />
            </div>
          </form>
        </div>
        <Image
          alt="Muie legal"
          src={"/images/Muie legal.png"}
          width={350}
          height={400}
        />
      </div>
      <div className="max-w-[1200px] w-full pt-6">
        <h1 className="font-bold text-2xl flex gap-2 items-center">
          Últimas Ofertas
          <span className="text-laranjaProdunfo">Free-Lancer</span>
        </h1>
      </div>

      <div className="w-full max-w-[1200px] pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {listService.content.length > 0 ? (
            listService.content.map((item, index) => {
              if (!item.id) return null;
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
              );
            })
          ) : (
            <div className="col-span-full flex justify-center items-center min-h-[200px] bg-white rounded-xl shadow text-gray-600">
              <span>Nada Encontrado</span>
            </div>
          )}
        </div>
      </div>
      <ul className="flex items-center justify-center py-10 w-full h-full bg-bege gap-4 flex-wrap px-2">
        <li className="p-2 flex flex-col bg-white rounded-xl items-center justify-center">
          <span>Free-Lancer</span>
          <Image
            alt="homem pintando "
            src={"/images/homem pintando.png"}
            about=""
            width={180}
            height={180}
          />
        </li>
        <li className="p-2 flex flex-col bg-white rounded-xl items-center justify-center">
          <span>Temporário</span>
          <Image
            alt="Robo"
            src={"/images/Robo.png"}
            about=""
            width={180}
            height={180}
          />
        </li>
        <li className="p-2 flex flex-col bg-white rounded-xl items-center justify-center">
          <span>Mais Procurados</span>
          <Image
            alt="panela "
            src={"/images/panela.png"}
            about=""
            width={180}
            height={180}
          />
        </li>
        <li className="p-2 flex flex-col bg-white rounded-xl items-center justify-center">
          <span>Serviços</span>
          <Image
            alt="muie "
            src={"/images/muie.png"}
            about=""
            width={180}
            height={180}
          />
        </li>
        <li className="p-2 flex flex-col bg-white rounded-xl items-center justify-center">
          <span>Profissionais</span>
          <Image
            alt="homem sentado"
            src={"/images/homem sentado.png"}
            about=""
            width={180}
            height={180}
          />
        </li>
      </ul>
      <div className="w-full h-full flex justify-center items-center bg-black py-10 gap-2">
        <div className="flex flex-col gap-2 max-w-[400px] w-full h-full">
          <h1 className="text-3xl text-white">Faça igual a eles encontre</h1>
          <h1 className="text-3xl text-white">Oportunidades no</h1>
          <h1 className="text-3xl text-white">WorkFlow</h1>
          <Link
            className="px-5 rounded-2xl bg-laranjaProdunfo text-white w-fit py-2 "
            href={"/cadastro"}
          >
            Faça seu Cadastro Aqui!
          </Link>
        </div>
        <Image
          alt="people"
          src={"/images/people.png"}
          width={350}
          height={350}
        />
      </div>
    </section>
  );
}
