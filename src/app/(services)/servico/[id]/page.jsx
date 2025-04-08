'use client'
import Stars from "@/components/ui/stars";
import { TextArea } from "@/components/ui/text-area";
import { UseService } from "@/hooks/use-services";
import BaseService from "@/services/base-service";
import ContractedListingService from "@/services/contracted-listing-service";
import ListingService from "@/services/listing-service";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {use, useEffect, useState} from "react";


export default function ProdutoPage({ params }) {
  if (typeof window == "undefined") {
    return;
  }
  const  {id}  = use(params)

  const [message, setMessage] = useState('')
  const [isLoading, setLoading] = useState(true)

  const router = useRouter();

  const {service, updateService,} = UseService()

  const userInfo = BaseService.getTokenInfo()

  const matchId = userInfo.accountId == service.userProfile.id ? true : false

  async function fetch(){
    const response = await ListingService.findById(id)
    if(response.status != 200) {
      router.back()
    }
    const data = await response.json()
    updateService(data)
  }

  useEffect(() => {
    fetch()
    setLoading(false)
  },[id, isLoading])

  if(isLoading){
    return(
      <div>
        <h1>
          Carregando
        </h1>
      </div>
    )
  }

  async function handleSubmit(){

    const response = await ContractedListingService.create(
      message,
      new Date(),
      null,
      service.id
    );
    router.push('/servicos/contratados')
  }

  return (
    <section className="flex flex-col pt-10 bg-bege items-center justify-center">
      <div className="w-full max-w-[1168px] bg-white px-8 pt-5 pb-10 rounded-t-3xl flex items-center justify-center flex-col">
        <div className=" w-full bg-gradient-to-r from-laranjaProdunfo h-fit p-2 to-orange-300 flex items-center rounded-full justify-between">
          <button className="w-fit h-fit" onClick={() => router.back()}>
            <Image className="p-2 rounded-full bg-white hover:bg-zinc-100 " alt="" src={'/icons/_-.png'} width={45} height={45} />
          </button>
          {
            matchId ? (
              <button className="px-4 py-2 font-bold bg-white hover:bg-zinc-100 text-laranjaProdunfo rounded-full ">
                Editar
              </button>
            ): null
          }
        </div>
        <h1 className="text-[40px] pb-1 border-b w-full text-center">
          {service.title}
        </h1>
        <div className="flex flex-col gap-1 py-2">
          <p className="border-b font-semibold text-xl text-laranjaProdunfo w-fit border-laranjaProdunfo">
            Descrição
          </p>
          <p>
            {service.description}
          </p>
        </div>
        <div className="w-full flex items-center gap-2 py-5">
          <p className="text-xl">Tags</p>
          <ul className="flex w-full items-center h-fit flex-wrap justify-start gap-2">
            {service.skills.map((item,index) => {
              return(
              <li key={index} className="px-5 py-1 rounded-full bg-[#FFD0B0] text-laranjaProdunfo shadow-md font-semibold">
                {item}
              </li>
              )
            })}
          </ul>
        </div>
        <div className="flex gap-2 items-center flex-wrap w-full py-4">
          <div className=" flex flex-col gap-2">
            <h3 className="text-lg font-semibold border-b border-laranjaProdunfo text-laranjaProdunfo w-fit">
              Quem está oferecendo
            </h3>
            <Link href={'/profissional/1'} className="flex gap-1 items-center p-1 max-w-[300px] w-full border border-laranjaProdunfo rounded-full ">
              <Image
                className="rounded-full"
                alt="perfil"
                src={"/images/perfil.png"}
                width={40}
                height={40}
              />
              <div className="pr-10 flex flex-col">
                <strong>{service.userProfile.name}</strong>
                <p className="text-zinc-400 text-sm ">{service.userProfile.title}</p>
              </div>
            </Link>
          </div>
          <div className=" flex flex-col gap-2">
            <h3 className="text-lg font-semibold border-b border-laranjaProdunfo text-laranjaProdunfo w-fit">
              Localização do serviço
            </h3>
            <div className="flex gap-1 items-center p-1 max-w-[300px] w-full border border-laranjaProdunfo rounded-full ">
              <Image
                className="rounded-full"
                alt="perfil"
                src={"/icons/Pin_alt_light_orang.png"}
                width={40}
                height={40}
              />
              <div className="pr-10 flex flex-col">
                <strong>{service.location}</strong>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-2 w-full">
          <h3 className="text-lg font-semibold border-b border-laranjaProdunfo text-laranjaProdunfo w-fit">
            Informações
          </h3>
          <div className="flex gap-2 bg-[#FFAC72] px-3 py-1 rounded-lg w-fit">
            <Image
              alt="perfil"
              src={"/icons/money.png"}
              width={40}
              height={30}
            />
            <div>
              <p>Valor total do serviço</p>
              <strong>R$ {service.price}</strong>
            </div>
          </div>
        </div>
        <div className="w-full py-4">
          <div className="flex gap-2 items-center pb-2">
            <h3 className="text-lg font-semibold border-b border-laranjaProdunfo text-laranjaProdunfo w-fit">
              Informações
            </h3>
            <p className="text-zinc-400 text-sm">
              (negociações, dúvidas e etc...)
            </p>
          </div>
          <TextArea
            error={null}
            name={"message"}
            onChange={(e) => setMessage(e)}
            placeholder={"Escreva aqui"}
            inputStyle="form"
          />
          <button onClick={handleSubmit} disabled={matchId? true : false} className={`${matchId ? 'bg-zinc-500 cursor-not-allowed' : 'bg-laranjaProdunfo hover:bg-opacity-85 '}  w-full flex gap-2 py-2 text-xl items-center text-white justify-center font-bold rounded-xl`}>
            <Image
              alt="perfil"
              src={"/icons/omeee(nao_apaga_estou_usando_ari).png"}
              width={20}
              height={20}
            />
            Contratar serviço
          </button>
        </div>
        <div className="w-full">
          <h3 className="text-lg font-semibold border-b border-laranjaProdunfo text-laranjaProdunfo w-fit">
          Avaliações desse serviço:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full pt-4">
            {service.contractedListings.map((contracted) => {
              contracted.evaluation.map((evalua,index) => {
                return(
                  <div key={index} className="max-w-[330px] max-h-[200px] w-full h-full p-3 border border-laranjaProdunfo hover:scale-105 transition-all rounded-2xl">
                    <div className="flex gap-1 items-center p-1 max-w-[300px] w-full border border-laranjaProdunfo rounded-full ">
                      <Image
                        className="rounded-full"
                        alt="perfil"
                        src={"/images/perfil.png"}
                        width={40}
                        height={40}
                      />
                      <div className="pr-10 flex flex-col">
                        <strong>Maria Laura Silva</strong>
                        <p className="text-zinc-400 text-sm ">Publicicade criativa</p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center py-2">
                      <Stars numberStar={evalua.stars} click={false} size={18} />
                      <p className="text-xs text-zinc-400">
                       Tem data? 
                      </p>
                    </div>
                    <h3 className="text-sm font-semibold border-b border-laranjaProdunfo text-laranjaProdunfo w-fit">
                      Informações
                    </h3>
                    <p className="text-sm w-full ">
                      {evalua.comment}
                    </p>
                  </div>
                )
              })
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
