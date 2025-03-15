import { getDisplayName } from "next/dist/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function BaseHeader(){
    return(
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
            <Image 
              className="" 
              src="images/logo.svg" 
              alt="" 
              width={50}
               height={60}
            /> 
            <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-3 py-2 w-[400px]" >
                <input 
                    className="bg-transparent border-none outline-none flex-1"
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
                    <Link className="hover:bg-slate-600 px-2 py-1 rounded-2xl hover:text-white "
                    href={"/entrar"}
                    >
                        ENTRAR
                    </Link>
                </li>
                <li>
                    <Link className="hover:bg-laranjaProdunfo px-2 py-1 rounded-2xl hover:text-white"
                    href={"/cadastre-se"}
                    > 
                        CADASTRE-SE
                    </Link>
                </li>
            </ul>
        </header>

    )
}