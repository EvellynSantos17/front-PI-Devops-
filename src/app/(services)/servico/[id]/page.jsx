
import Stars from "@/components/ui/stars";
import { TextArea } from "@/components/ui/text-area";
import Image from "next/image";
import {use} from "react";


export default function ProdutoPage({ params }) {
  const  id  = use(params)

  console.log(id);

  return (
    <section className="flex flex-col pt-10 bg-bege items-center justify-center">
      <div className="w-full max-w-[1168px] bg-white px-8 pt-5 pb-10 rounded-t-3xl flex items-center justify-center flex-col">
        <header className="h-[65px] w-full bg-gradient-to-r from-laranjaProdunfo to-orange-300 flex items-center rounded-full"></header>
        <h1 className="text-[40px] pb-1 border-b w-full text-center">
          Criação de publicações para redes sociais
        </h1>
        <div className="flex flex-col gap-1 py-2">
          <p className="border-b font-semibold text-xl text-laranjaProdunfo w-fit border-laranjaProdunfo">
            Descrição
          </p>
          <p>
            Estamos em busca de um profissional criativo e estratégico para a
            criação de publicações para redes sociais. Se você tem paixão por
            design, entende a importância do marketing digital e sabe como criar
            conteúdos visuais impactantes, essa oportunidade é para você!
          </p>
        </div>
        <div className="w-full flex items-center gap-2 py-5">
          <p className="text-xl">Tags</p>
          <ul className="flex w-full items-center h-fit flex-wrap justify-start gap-2">
            <li className="px-5 py-1 rounded-full bg-[#FFD0B0] text-laranjaProdunfo shadow-md font-semibold">
              Proatividade
            </li>
            <li className="px-5 py-1 rounded-full bg-[#FFD0B0] text-laranjaProdunfo shadow-md font-semibold">
              Proatividade
            </li>{" "}
            <li className="px-5 py-1 rounded-full bg-[#FFD0B0] text-laranjaProdunfo shadow-md font-semibold">
              Proatividade
            </li>
          </ul>
        </div>
        <div className="flex gap-2 items-center flex-wrap w-full py-4">
          <div className=" flex flex-col gap-2">
            <h3 className="text-lg font-semibold border-b border-laranjaProdunfo text-laranjaProdunfo w-fit">
              Quem está oferecendo
            </h3>
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
                <strong>Maria Laura Silva</strong>
                <p className="text-zinc-400 text-sm ">Publicicade criativa</p>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-2">
            <h3 className="text-lg font-semibold border-b border-laranjaProdunfo text-laranjaProdunfo w-fit">
              Status do serviço
            </h3>
            <div className="flex gap-1 items-center p-1 max-w-[300px] w-full border border-laranjaProdunfo rounded-full ">
              <Image
                className="rounded-full"
                alt="perfil"
                src={"/icons/Subtract.png"}
                width={40}
                height={40}
              />
              <div className="pr-10 flex flex-col">
                <strong>Maria Laura Silva</strong>
                <p className="text-zinc-400 text-sm ">Publicicade criativa</p>
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
              <strong>R$ 450,00</strong>
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
            placeholder={"Escreva aqui"}
            inputStyle="form"
          />
          <button className="bg-laranjaProdunfo hover:bg-opacity-85 w-full flex gap-2 py-2 text-xl items-center text-white justify-center font-bold rounded-xl">
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
            <div className="max-w-[330px] max-h-[200px] w-full h-full p-3 border border-laranjaProdunfo hover:scale-105 transition-all rounded-2xl">
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
                <Stars numberStar={2} click={false} size={18} />
                <p className="text-xs text-zinc-400">
                  Avaliado em 20 de março de 2025
                </p>
              </div>
              <h3 className="text-sm font-semibold border-b border-laranjaProdunfo text-laranjaProdunfo w-fit">
                Informações
              </h3>
              <p className="text-sm w-full ">
                Produto feito com bons materiais e muito bonito, oferece muito espaço e tem uma ótima saída / entrada de ar!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
