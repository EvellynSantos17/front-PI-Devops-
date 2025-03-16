import { getDisplayName } from "next/dist/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
/*import Image from "next/image";*/


export default function BaseHeader(){
    const userAuth = false
    const userName = "Eve Linda"

    return(
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
            <Image 
              className="" 
              src="images/logo.svg" 
              alt="" 
              width={50}
               height={60}
            /> 
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 w-fix " >
                <input 
                    className="bg-transparent border-none outline-none flex-1 w-[300px]"
                    type="text" 
                    placeholder="Digite Aqui..."
                /> 
                <Image 
                  className="cursor-pointer" 
                  src="images/lupa.svg" 
                  alt="icone" 
                  width={18}
                  height={18}
                /> 
            </div>
            <ul className="flex items-center gap-4">
                <li>
                    <Link className="hover:bg-laranjaProdunfo px-2 py-1 rounded-2xl hover:text-white"
                    href={"ver-oportunidades"} 
                    >
                        VER OPORTUNIDADES
                    </Link>
                </li>
                <li>
                    <Link className="hover:bg-laranjaProdunfo px-2 py-1 rounded-2xl hover:text-white"
                    href={"/ofertar-serviços"}
                    >
                        OFERTAR SERVIÇOS
                    </Link>
                </li>
                <li>
                    <Link className="hover:bg-laranjaProdunfo px-2 py-1 rounded-2xl hover:text-white"
                      href={"/profissionais"} 
                    >
                        PROFISSIONAIS
                    </Link>
                </li>
                <li>
                    <Link className="hover:bg-laranjaProdunfo px-2 py-1 rounded-2xl hover:text-white"
                    href={"/suporte"}
                    >
                        SUPORTE
                    </Link>
                </li>
                <li>
                {userAuth ? ( // Se o usuário estiver autenticado, exibe a imagem e o nome
    <div className="p-2 rounded-lg bg-transparent  flex items-center gap-2">
        <h1 className="text-lg underline">{userName}</h1> 
        <Image
            className="rounded-full" 
            alt="img" 
            src="/eve.png"
            width={35} 
            height={35}
        />
    </div>
) : ( // Se NÃO estiver autenticado, exibe os botões de entrar e cadastro
    <div className="flex gap-2"> 
        <Link 
            className="hover:bg-slate-600 px-2 py-1 rounded-2xl hover:text-white" 
            href={"/entrar"}
        >
            ENTRAR
        </Link>
        <Link 
            className="hover:bg-laranjaProdunfo px-2 py-1 rounded-2xl hover:text-white"
            href={"/cadastre-se"}
        > 
            CADASTRE-SE
        </Link>
    </div>
)}

 
</li>

                
            </ul>
        </header>

    )
}



