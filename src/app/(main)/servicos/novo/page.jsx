import ServiceForm from "@/components/forms/service-form";
import Image from "next/image";

export default function page(){
    return (
        <section className="flex flex-col pt-10 bg-bege items-center justify-center">
            <div className="w-full max-w-[1168px] bg-white px-8 pt-5 pb-10 rounded-t-2xl flex items-center justify-center flex-col">
                <Image className="w-full rounded-2xl"
                  alt="varias pessoas foto"
                  src={"/images/Rectangle50.png"}
                  width={1056}
                  height={182}
                />
                <h1 className="text-[40px]">
                    Publicar um novo serviço
                </h1>
                <span className="text-base text-[#757575]">
                    Encontre o profissional ideal para seu projeto
                </span>
                <ServiceForm/>
            </div>
        </section>
    )
}