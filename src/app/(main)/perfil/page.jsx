"use client"

import CardService from "@/components/ui/card-service"
import UserInforCard from "@/components/ui/user-infor-card"
import UserInforCardMult from "@/components/ui/user-infor-card-mult"
import { usePerfilHook } from "@/hooks/use-perfil-hooks"
import BaseService from "@/services/base-service"
import ListingService from "@/services/listing-service"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function Page() {
  
    if (typeof window == "undefined") {
      return 
    }  

    const token = BaseService.getToken() 
    let info = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    
    if(info.accountId == null) {
      return router.push("/finalizar-perfil")
    }  
    const { perfilData, updateHookDataUnitValue } = usePerfilHook(info.accountId)  

    const [profileImage, setProfileImage] = useState("/images/perfil.png")
    const [userInfo, setUserInfo] = useState({
        name: "Roberta Martins",
        title: "Desenvolvedora de Software",
        about: "Sempre que possível, realizo cursos para desenvolver ainda mais minhas capacidades e habilidades como publicitário, com objetivo de me tornar cada vez mais qualificado e apto ao atender e superar as expectativas dos meus clientes.",
        email: "CompanyInga@mail.com",
        contact: "351123-12314",
        cpf: "123.789.456-00",
        location: "Juazeiro do Norte, Ceará",
    })
      // Chamada para listas laranjas
    // let listings = ListingService.findAll(`accountId=${info.accounId}`)

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setProfileImage(e.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleUserInfoChange = (field, newValue) => {
        setUserInfo((prevInfo) => ({
            ...prevInfo,
            [field]: newValue,
        }))
    }

    return (
        <section className="bg-[#FFD6B9] px-10 py-2 h-full pb-32 overflow-auto flex flex-col gap-2 xl:px-10">
            <div className="relative w-full h-fit p-2 bg-white rounded-xl">
                <div className="w-full h-[164px] rounded-xl relative bg-gradient-to-r from-[#F97316] to-[#F9731680]"></div>

                <div className="w-full h-[200px] flex items-center justify-center -translate-y-[40%]">
                    <div className="flex flex-col items-center justify-center max-w-[300px] gap-2">
                        <Image alt="perfil" src={profileImage} width={200} height={200} className="rounded-xl"/>
                        
                        <label htmlFor="imageUpload" className="w-[200px] px-2 py-1 bg-laranjaProdunfo text-white flex items-center justify-center gap-1 rounded-lg cursor-pointer">
                            <Image alt="edit" src={"/icons/edit.svg"} width={18} height={16} />
                            Editar foto do perfil
                        </label>
                        <input id="imageUpload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

                        <div className="flex flex-col items-center justify-center">
                            <h1 className="font-bold text-2xl">
                                {perfilData.name ? perfilData.name : 'carregando...'}
                            </h1>

                            <span className="text-sm text-[#32292F8F]">
                                {userInfo.title}
                            </span>
                        </div>

                        <div className="flex w-full justify-between gap-10">
                            <div className="flex flex-col items-center justify-center">
                                <span className="font-bold text-xl"> 
                                    10
                                </span>
                                <span className="text-[#32292F8F] text-sm">
                                    Anúncios feitos
                                </span>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <span className="font-bold text-xl">
                                    20
                                </span>
                                <span className="text-[#32292F8F] text-sm">
                                    Serviços contratados
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="flex flex-col md:flex-row justify-between w-full gap-4 h-full">
                <section className="w-full">
                    <div className="bg-white rounded-xl h-full p-2">
                        <div className="py-2">
                            <h1 className="font-bold text-2xl flex flex-col items-center justify-center px-10">
                                Minhas Informações
                            </h1>
                        </div>

                        <div className="flex flex-col gap-4">
                            {perfilData.name ? (
                                <>
                                  <UserInforCard title={"Nome"} value={perfilData.name} onChange={(newValue) => handleUserInfoChange("name", newValue)} isOwner={true}/>
                                  <UserInforCard title={"Seu titulo"} value={perfilData.title} onChange={(newValue) => handleUserInfoChange("title", newValue)} isOwner={true}/>
                                  <UserInforCard title={"Sobre você"} value={perfilData.description} onChange={(newValue) => handleUserInfoChange("about", newValue)} isOwner={true}/>
                                  <UserInforCard title={"Contato"} value={perfilData.phone} onChange={(newValue) => handleUserInfoChange("contact", newValue)} isOwner={true}/>
                                  <UserInforCard title={"CPF"} value={perfilData.document} onChange={(newValue) => handleUserInfoChange("cpf", newValue)} isOwner={true}/>
                                  <UserInforCard title={"Localização"} value={perfilData.address} onChange={(newValue) => handleUserInfoChange("location", newValue)} isOwner={true} />
                                  <UserInforCardMult 
                                    title={"Habilidades"} 
                                    value={perfilData.skills.map((skill) => {
                                      return {value: skill,label: skill}
                                    })}
                                    isOwner={true}
                                  />
                                </>
                            ) : null}

                        </div>
                    </div>
                </section>

                <section className="w-full flex flex-col gap-4 h-full">

                    <section className="w-full h-full">
                        <div className="bg-white rounded-xl flex flex-col h-full p-2 gap-4">
                            <div className="py-2">
                                <h1 className="font-bold text-2xl flex flex-col items-center justify-center px-10">
                                    Meus anúncios de serviços
                                </h1>
                                <p className="flex flex-col items-center justify-center text-sm text-[#32292F8F]">
                                    Aqui você encontra seus anúncios cadastrados
                                </p>                                                       
                                
                            </div>
                            <div className="flex flex-col gap-4">
                                <CardService 
                                    created_at={"Postado há 2 dias"}
                                    location={"Crato, CE"}
                                    title={"Landing Page"}
                                    type={"Freelancer"}
                                    has_button
                                    orange
                                />

                                <CardService 
                                    created_at={"Postado há 2 dias"}
                                    location={"Crato, CE"}
                                    title={"Landing Page"}
                                    type={"Freelancer"}
                                    has_button
                                    orange
                                />

                                <CardService 
                                    created_at={"Postado há 2 dias"}
                                    location={"Crato, CE"}
                                    title={"Landing Page"}
                                    type={"Freelancer"}
                                    has_button
                                    orange
                                />
                            </div>

                                
                        </div>
                    </section>

                    <section className="w-full h-full">
                        <div className="bg-white rounded-xl flex flex-col h-full p-2 gap-4">
                            <div className="py-2"> 
                                <h1 className="font-bold text-2xl flex flex-col items-center justify-center px-10">
                                    Meus serviços contratados
                                </h1>
                                <p className="flex flex-col items-center justify-center text-sm text-[#32292F8F]">
                                    Aqui você encontra seus serviços contratados por outros profissionais
                                </p>                                                       
                                
                            </div>
                            <div className="flex flex-col gap-4">
                                <CardService 
                                    created_at={"Postado há 2 dias"}
                                    location={"Crato, CE"}
                                    title={"Landing Page"}
                                    type={"Freelancer"}
                                    has_button
                                    orange={false}
                                    
                                />

                                <CardService 
                                    created_at={"Postado há 2 dias"}
                                    location={"Crato, CE"}
                                    title={"Landing Page"}
                                    type={"Freelancer"}
                                    has_button
                                    orange={false}
                                    
                                />

                                <CardService 
                                    created_at={"Postado há 2 dias"}
                                    location={"Crato, CE"}
                                    title={"Landing Page"}
                                    type={"Freelancer"}
                                    has_button
                                    orange={false}
                                    
                                />
                            </div>

                                
                        </div>
                    </section>
                    
                </section>


                
            </section>
        
        </section> 
    )
}