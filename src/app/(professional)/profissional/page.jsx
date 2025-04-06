import CardService from "@/components/ui/card-service";
import Image from "next/image";
import Link from "next/link";


export default function page(){

  return(
    <section className="w-full bg-bege p-10 flex flex-col gap-3">
      <div className="flex flex-col gap-2 w-full px-28 py-10 bg-white rounded-2xl">
        <div className="flex gap-4 items-center">
          <Image className="rounded-xl" alt="foto de perfil" src={"/images/perfil.png"}  width={200} height={200} />
          <div>
            <h1 className="text-3xl font-bold">
              Mariana Rosendo
            </h1>
            <p className="text-2xl">
              Designer Gráfico
            </p>
          </div>
        </div>
        <h2 className="font-bold text-xl">
          Sobre o profissional
        </h2>
        <p>
          Desenvolver trabalhos criativos e com qualidade, com custo acessível para você e sua empresa. Visando sempre sua satisfação e sucesso.  
        </p>
        <h2 className="font-bold text-xl">
          Habilidades ofertadas
        </h2>
        <div className="flex flex-col">
          <li>
            Geração de Arte
          </li>
          <li>
            Logo Marcas
          </li>
          <li>
            Criações de Histórias
          </li>

        </div>
        <div className="flex w-full justify-between gap-4 p-4">
          <Link href={""} className="w-full py-2 rounded-xl border border-laranjaProdunfo flex gap-1 items-center justify-center">
            <Image alt="" src={"/icons/Pin_alt_light.png"} width={30} height={30}/>
            Juazeiro do Norte-CE
          </Link>
          <Link href={""} className="w-full py-2 rounded-xl border border-laranjaProdunfo flex gap-1 items-center justify-center">
          <Image alt="" src={"/icons/E-mail.png"} width={30} height={30}/>
            Mariarosendo@gmail.com
          </Link>
          <Link href={""} className="w-full py-2 rounded-xl border border-laranjaProdunfo bg-laranjaProdunfo text-white flex gap-1 items-center justify-center">
          <Image alt="" src={"/icons/WhatsApp.png"} width={30} height={30}/>
            Entrar em Contato
          </Link>
        </div>
        </div>
        <div className="flex flex-col gap-2 w-full px-28 py-10 bg-white rounded-2xl justify-center items-center">
          <h1 className=" text-2xl font-bold">
          Anúncios de serviços
          </h1>
          <p className="text-xl text-zinc-400">
          Aqui você encontra seus anúncios cadastrados.
          </p>
          <div className="flex flex-col gap-2 w-full">
          <CardService created_at={"Postado há 2 dias"} location={"São Paulo, SP"} title={"Conserto de Motor de Carro"} type={"Freelancer"} has_button={false} orange/>
          <CardService created_at={"Postado há 2 dias"} location={"São Paulo, SP"} title={"Remendo Pneu"} type={"Freelancer"} has_button={false} orange/>
          <CardService created_at={"Postado há 2 dias"} location={"São Paulo, SP"} title={"Supervisor(a) de negócios (Freela)"} type={"Freelancer"} has_button={false} orange/>
          </div>

      </div>
    </section>
  )
}