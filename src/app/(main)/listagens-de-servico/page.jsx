"use client";
import Image from "next/image";

export default function Page() {
  const handleAccept = () => {
    alert("Serviço Aceito!");
  };

  const handleCancel = () => {
    alert("Serviço Cancelado!");
  };

  const handleFinish = () => {
    alert("Serviço Finalizado!");
  };

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
        <div className=" h-full p-2 gap-4">
          <div className="flex flex-col py-2 px-10 border border-[#0000006B] rounded-xl gap-2">
            <div className="flex w-full justify-between gap-2">
              <div>
                <h1 className="font-bold text-2xl flex">
                  Desenvolvimento de E-commerce
                </h1>
                <div className=" flex text-sl  text-[#585858]  gap-2">
                  <Image
                    className="h-[17.17px] w-[18.81px]"
                    alt="work"
                    src={"/icons/work.png"}
                    height={17.17}
                    width={18.81}
                  />
                  ID do anúncio: 101
                  <ul className="list-disc pl-4">
                    <li>ID do serviço: 1</li>
                  </ul>
                </div>
              </div>

              <div className=" flex border bg-[#FEF9C3] text-[#974D0E] shadow-md h-fit rounded-3xl px-5 p-1 gap-1">
                <Image
                  className="w-[20px] h-[20px]"
                  alt="clock"
                  src={"/icons/clock.png"}
                  width={20}
                  height={20}
                />
                <span className="h-fit  ">Pendente aceitação</span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex  gap-2">
                <Image
                  alt="calendario"
                  src={"/icons/usuario.png"}
                  width={54}
                  height={52}
                />
                <div>
                  <span className="text-[#03000080]">Anunciante</span>
                  <h2 className="font-bold">João Silva</h2>
                </div>
              </div>
              <div className="flex  gap-2">
                <Image
                  alt="calendario"
                  src={"/icons/calendario.png"}
                  width={54}
                  height={52}
                />
                <div>
                  <span className="text-[#03000080]">Periodo</span>
                  <h2 className="font-bold">31/12/2024 até 31/01/2025</h2>
                </div>
              </div>
              <div className="flex gap-2">
                <Image
                  alt="dinheiro"
                  src={"/icons/dinheiro.png"}
                  width={54}
                  height={52}
                />
                <div>
                  <span className="text-[#03000080]">Valor total</span>
                  <h2 className="font-bold">R$ 8.000</h2>
                </div>
              </div>
            </div>
            <div className="flex justify-end border-t py-2 border-[#757575] gap-4 ">
              <button
                className="border bg-[#F97316] rounded-xl shadow-md p-2 text-[#FFDCC3]"
                onClick={handleAccept}
              >
                Aceitar
              </button>

              <button
                className="border bg-[#FF00004D] rounded-xl shadow-md p-2 text-[#FFDCC3]"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>

        <div className=" h-full p-2 gap-4">
          <div className="flex flex-col py-2 px-10 border border-[#0000006B] rounded-xl gap-2">
            <div className="flex w-full justify-between gap-2">
              <div>
                <h1 className="font-bold text-2xl flex ">
                  Desenvolvimento de E-commerce
                </h1>
                <div className=" flex text-sl  text-[#585858]  gap-2">
                  <Image
                    className="h-[17.17px] w-[18.81px]"
                    alt="work"
                    src={"/icons/work.png"}
                    height={17.17}
                    width={18.81}
                  />
                  ID do anúncio: 101
                  <ul className="list-disc pl-4">
                    <li>ID do serviço: 1</li>
                  </ul>
                </div>
              </div>

              <div className=" flex border bg-[#DBEAFE] shadow-md h-fit rounded-3xl px-5 p-1 gap-1">
                <Image
                  className="w-[20px] h-[20px]"
                  alt="correct"
                  src={"/icons/correct.png"}
                  width={20}
                  height={20}
                />
                <span className="h-fit text-[#3156C0]">
                  Aceito pelo prestador
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex  gap-2">
                <Image
                  alt="calendario"
                  src={"/icons/usuario.png"}
                  width={54}
                  height={52}
                />
                <div>
                  <span className="text-[#03000080]">Anunciante</span>
                  <h2 className="font-bold">João Silva</h2>
                </div>
              </div>
              <div className="flex  gap-2">
                <Image
                  alt="calendario"
                  src={"/icons/calendario.png"}
                  width={54}
                  height={52}
                />
                <div>
                  <span className="text-[#03000080]">Periodo</span>
                  <h2 className="font-bold">31/12/2024 até 31/01/2025</h2>
                </div>
              </div>
              <div className="flex gap-2">
                <Image
                  alt="dinheiro"
                  src={"/icons/dinheiro.png"}
                  width={54}
                  height={52}
                />
                <div>
                  <span className="text-[#03000080]">Valor total</span>
                  <h2 className="font-bold">R$ 8.000</h2>
                </div>
              </div>
            </div>
            <div className="flex justify-end border-t py-2 border-[#757575] gap-4">
              <button
                className="border bg-[#F97316] rounded-xl shadow-md p-2 text-[#FFDCC3]"
                onClick={handleFinish}
              >
                Finalizar Serviço
              </button>

              <button
                className="border bg-[#FF00004D] rounded-xl shadow-md p-2 text-[#FFDCC3]"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
        <div className=" h-full p-2 gap-4">
          <div className="flex flex-col py-2 px-10 border border-[#0000006B] rounded-xl gap-2">
            <div className="flex w-full justify-between gap-2">
              <div>
                <h1 className="font-bold text-2xl flex ">
                  Desenvolvimento de E-commerce
                </h1>
                <div className=" flex text-sl  text-[#585858]  gap-2">
                  <Image
                    className="h-[17.17px] w-[18.81px]"
                    alt="work"
                    src={"/icons/work.png"}
                    height={17.17}
                    width={18.81}
                  />
                  ID do anúncio: 101
                  <ul className="list-disc pl-4">
                    <li>ID do serviço: 1</li>
                  </ul>
                </div>
              </div>

              <div className=" flex border bg-[#DCFCE7] shadow-md h-fit rounded-3xl px-5 p-1 gap-1">
                <Image
                  className="w-[20px] h-[20px]"
                  alt="check"
                  src={"/icons/checkcircle.png"}
                  width={20}
                  height={20}
                />
                <span className="h-fit text-[#166534]">
                  Finalizado pelo prestadorr
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex  gap-2">
                <Image
                  alt="calendario"
                  src={"/icons/usuario.png"}
                  width={54}
                  height={52}
                />
                <div>
                  <span className="text-[#03000080]">Anunciante</span>
                  <h2 className="font-bold">João Silva</h2>
                </div>
              </div>
              <div className="flex  gap-2">
                <Image
                  alt="calendario"
                  src={"/icons/calendario.png"}
                  width={54}
                  height={52}
                />
                <div>
                  <span className="text-[#03000080]">Periodo</span>
                  <h2 className="font-bold">31/12/2024 até 31/01/2025</h2>
                </div>
              </div>
              <div className="flex gap-2">
                <Image
                  alt="dinheiro"
                  src={"/icons/dinheiro.png"}
                  width={54}
                  height={52}
                />
                <div>
                  <span className="text-[#03000080]">Valor total</span>
                  <h2 className="font-bold">R$ 8.000</h2>
                </div>
              </div>
            </div>
            <div className="flex justify-end border-t py-2 border-[#757575] gap-4"></div>
          </div>
        </div>
      </div>
    </section>
    
  );
}
