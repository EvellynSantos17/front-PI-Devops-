"use client";
import Stars from "@/components/ui/stars";
import { TextArea } from "@/components/ui/text-area";
import { UseContracted } from "@/hooks/use-contracted";
import BaseService from "@/services/base-service";
import ContractedListingService from "@/services/contracted-listing-service";
import EvalutionService from "@/services/evalution-service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function ProdutoPage({ params }) {
  if (typeof window == "undefined") {
    return;
  }
  const { id } = use(params);

  const [message, setMessage] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [stars, setStars] = useState(1);

  const router = useRouter();

  const { contracted, updateContracted } = UseContracted();

  const userInfo = BaseService.getTokenInfo();

  async function fetch() {
    const response = await ContractedListingService.findById(id);
    if (response.status != 200) {
      router.back();
    }
    const data = await response.json();
    if(data.evaluation) return router.back()
    if(data.client.id != userInfo.accountId) return router.back()
    if(data.status != "ACCEPTED") return router.back()
    updateContracted(data);
  }

  useEffect(() => {
    fetch();
  }, []);

  async function handleSubmit() {
    setLoading(true)
    const response = await EvalutionService.create({
      comment: message,
      contractedListingId: contracted.id,
      stars: stars,
    });
    if(response.status >= 200){
      setLoading(false)
      router.push(`/servico/${contracted.listing.id}`);
    }
  }

  return (
    <section className="flex flex-col pt-10 bg-bege items-center justify-end h-[89vh]">
      <div className="w-full max-w-[1168px] bg-white px-8 pt-5 pb-10 rounded-t-3xl items-start flex flex-col h-full">
        <h1 className="text-[40px] pb-1 border-b w-full text-center ">
          {contracted.listing.title}
        </h1>
        <div className="flex flex-col gap-1 py-2">
          <p className="border-b font-semibold text-xl text-laranjaProdunfo w-fit border-laranjaProdunfo">
            Descrição
          </p>
          <p>{contracted.listing.description}</p>
        </div>
        <div className="flex flex-col gap-2 py-3">
          <p className="border-b font-semibold text-xl text-laranjaProdunfo w-fit border-laranjaProdunfo">
            Dê uma nota de 1 a 5 para este serviço:
          </p>
          <Stars
            click={true}
            numberStar={stars}
            onClick={(e) => setStars(e)}
            size={20}
          />
        </div>

        <div className="w-full py-4">
          <div className="flex gap-2 items-center pb-2">
            <h3 className="text-lg font-semibold border-b border-laranjaProdunfo text-laranjaProdunfo w-fit">
              Mensagens Faça aqui sua avaliação sobre o serviço
            </h3>
            <p className="text-zinc-400 text-sm">(elogios, feedbacks e etc.)</p>
          </div>
          <TextArea
            error={null}
            name={"message"}
            onChange={(e) => setMessage(e)}
            placeholder={"Escreva aqui"}
            inputStyle="form"
          />
          <button
           disabled={isLoading}
            onClick={handleSubmit}
            className={`bg-laranjaProdunfo hover:bg-opacity-85   w-full flex gap-2 py-2 text-xl items-center text-white justify-center font-bold rounded-xl`}
          >
            <Image
              alt="perfil"
              src={"/icons/ESTRELABRANCA.png"}
              width={20}
              height={20}
            />
            {isLoading ? 'Carregando...' : 'Avaliar este serviço'}
          </button>
          <div className="h-20"></div>
        </div>
      </div>
    </section>
  );
}
