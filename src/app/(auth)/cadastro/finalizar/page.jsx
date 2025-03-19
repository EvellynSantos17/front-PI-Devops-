import SecundRegisterForm from "@/components/forms/secund-register-form";
import Footer from "@/components/layout/footer";
import Image from "next/image";

export default function Page(){
    return (
        <div className="bg-orange-100 w-full h-full  overflow-auto flex flex-col items-center pt-10">
            <div className="md:w-[80%] xl:w-[50%] w-full bg-white h-fit shadow-lg rounded-t-2xl overflow-hidden">
                <div className="bg-[#2C2C2C] text-center py-7 w-full flex items-center justify-center">
                    <Image alt="logo" src={'/images/logo-com-typography.png'} width={300} height={200}/>
                </div>
                <div className="p-6 h-full">
                    <h2 className="text-center text-2xl font-semibold text-gray-700 mb-2">Completar cadastro</h2>
                    <p className="text-center text-gray-500 text-sm mb-6">
                        Adicione suas informações para melhorar sua experiência na nossa plataforma
                    </p>
                    <SecundRegisterForm/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}