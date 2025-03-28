import Image from "next/image";
import Link from "next/link";

export default function Header() {
    const userAuth = false
    const userName = "Eve Linda"

    return (
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
            <div className="flex items-center gap-2">
                <Image
                    className=""
                    src="/images/logo.svg"
                    alt="logo"
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
                        src="/images/lupa.svg"
                        alt="icone"
                        width={18}
                        height={18}
                    />
                </div>
            </div>
            <ul className="flex items-center gap-4">
                <li>
                    <Link
                        className="hover:bg-laranjaProdunfo px-2 py-1 rounded-2xl hover:text-white"
                        href={"ver-oportunidades"}
                    >
                        <span>
                            VER OPORTUNIDADES
                        </span>
                    </Link>
                </li>
                <li>
                    <Link
                        className="hover:bg-laranjaProdunfo px-2 py-1 rounded-2xl hover:text-white"
                        href={"/ofertar-serviços"}
                    >
                        <span>
                            OFERTAR SERVIÇOS
                        </span>
                    </Link>
                </li>
                <li>
                    <Link
                        className="hover:bg-laranjaProdunfo px-2 py-1 rounded-2xl hover:text-white"
                        href={"/profissionais"}
                    >
                        <span>
                            PROFISSIONAIS
                        </span>
                    </Link>
                </li>
                <li>
                    <Link
                        className="hover:bg-laranjaProdunfo px-2 py-1 rounded-2xl hover:text-white"
                        href={"/suporte"}
                    >
                        <span>
                            SUPORTE
                        </span>
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
                                className="bg-slate-600 px-2 py-1 rounded-2xl text-white"
                                href={"/entrar"}
                            >
                                <span>
                                    ENTRAR
                                </span>
                            </Link>
                            <Link
                                className="bg-laranjaProdunfo px-2 py-1 rounded-2xl text-white"
                                href={"/cadastro"}
                            >
                                <span>
                                    CADASTRE-SE
                                </span>
                            </Link>
                        </div>
                    )}
                </li>
            </ul>
        </header>

    )
}



