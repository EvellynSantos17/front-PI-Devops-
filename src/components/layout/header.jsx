"use client";
import FetchFindById from "@/hooks/fetch/fetch-find-by-id";
import BaseService from "@/services/base-service";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  if (typeof window == "undefined") {
    return;
  }

  const router = useRouter();
  const [userAuth, setUserAuth] = useState(false);
  const [userName, setUserName] = useState("Zeca urubu");
  const pathname = usePathname();

  const isOnServicos = pathname === '/servicos';

  const info = BaseService.getTokenInfo();
  if (info && info.accountId) {
    FetchFindById({
      id: info.accountId,
      serviceName: "UserProfileService",
      onDataFetched: (value) => {
        setUserName(value.name);
        setUserAuth(true);
      },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { search } = Object.fromEntries(formData);

    if (!search) return;

    router.push(`/servicos?title=${search}&page=0`);
  }

  return (
    <header
      onSubmit={handleSubmit}
      className="hidden items-center justify-between p-4 bg-white shadow-md top-0 left-0 sticky z-50  lg:flex"
    >
      <div className="flex items-center gap-2">
        <Link href={"/"}>
          <Image src="/images/logo.svg" alt="logo" width={50} height={60} />
        </Link>
        {!isOnServicos && (
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 w-fix"
        >
          <input
            className="bg-transparent border-none outline-none flex-1 w-[300px]"
            type="text"
            name="search"
            placeholder="Digite Aqui..."
          />
          <Image
            className="cursor-pointer"
            src="/icons/lupa-lalanja.png"
            alt="icone"
            width={20}
            height={20}
          />
        </form>
        )}
      </div>
      <ul className="flex items-center gap-4">
        <li>
          <Link
            className="hover:bg-laranjaProdunfo px-2 py-1 rounded-2xl hover:text-white"
            href="/servicos?page=0"
          >
            VER OPORTUNIDADES
          </Link>
        </li>
        <li>
          <Link
            className="hover:bg-laranjaProdunfo px-2 py-1 rounded-2xl hover:text-white"
            href="/servico/novo"
          >
            OFERTAR SERVIÇOS
          </Link>
        </li>

        <li>
          {userAuth ? (
            <Link href={'/perfil'} className="p-2 rounded-lg bg-transparent flex items-center gap-2">
              <h1 className="text-lg underline">{userName}</h1>
              <Image
                className="rounded-full"
                alt="img"
                src="/images/perfil.png"
                width={35}
                height={35}
              />
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link
                className="bg-slate-600 px-2 py-1 rounded-2xl text-white"
                href="/entrar"
              >
                ENTRAR
              </Link>
              <Link
                className="bg-laranjaProdunfo px-2 py-1 rounded-2xl text-white"
                href="/cadastro"
              >
                CADASTRE-SE
              </Link>
            </div>
          )}
        </li>
      </ul>
    </header>
  );
}
