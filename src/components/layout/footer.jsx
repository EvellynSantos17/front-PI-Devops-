import Image from "next/image";

export default function Footer(){
    return (
        <footer className="w-full p-2 flex items-center justify-center bg-laranjaProdunfo gap-2 "> 
            <Image alt="logoPRETA" src={'/images/logoPRETA.svg'} width={30} height={30}/>
            <span>
                © 2025 | WorkFlow  - Todos os direitos reservados
            </span>
        </footer>
    )
}