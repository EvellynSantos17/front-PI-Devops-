"use client"

import CardService from "@/components/ui/card-service"
import UserInforCard from "@/components/ui/user-infor-card"
import UserInforCardMult from "@/components/ui/user-infor-card-mult"
import Image from "next/image"
import { useState } from "react"

export default function Page() {
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
                                {userInfo.name}
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
                            <UserInforCard title={"Nome"} value={userInfo.name} onChange={(newValue) => handleUserInfoChange("name", newValue)} />
                            <UserInforCard title={"Seu titulo"} value={userInfo.title} onChange={(newValue) => handleUserInfoChange("title", newValue)} />
                            <UserInforCard title={"Sobre você"} value={userInfo.about} onChange={(newValue) => handleUserInfoChange("about", newValue)} />
                            <UserInforCard title={"E-mail"} value={userInfo.email} onChange={(newValue) => handleUserInfoChange("email", newValue)} />
                            <UserInforCard title={"Contato"} value={userInfo.contact} onChange={(newValue) => handleUserInfoChange("contact", newValue)} />
                            <UserInforCard title={"CPF"} value={userInfo.cpf} onChange={(newValue) => handleUserInfoChange("cpf", newValue)} />
                            <UserInforCard title={"Localização"} value={userInfo.location} onChange={(newValue) => handleUserInfoChange("location", newValue)} />

                            <UserInforCardMult 
                                title={"Habilidades"} 
                                value={[
                                    { value: "cybersecurity", label: "Cibersegurança" },
                                    { value: "data-science", label: "Ciência de Dados" },
                                    { value: "blockchain", label: "Blockchain & Criptomoedas" },
                                    { value: "web-development", label: "Desenvolvimento Web" },
                                    { value: "mobile-development", label: "Desenvolvimento Mobile" },
                                ]}
                            />
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