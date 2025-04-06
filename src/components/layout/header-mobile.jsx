"use client";
import FetchFindById from "@/hooks/fetch/fetch-find-by-id";
import BaseService from "@/services/base-service";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeaderMobile() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openMenuSearch, setOpenMenuSearch] = useState(false);
  const router = useRouter();
  const [userAuth, setUserAuth] = useState(false);
  const [userName, setUserName] = useState("");

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
    <header className="lg:hidden flex justify-between items-center w-full p-4 bg-white relative">
      <button
        onClick={() => {
          if (openMenuSearch) {
            setOpenMenuSearch(false);
          }
          setOpenMenu(!openMenu);
        }}
      >
        <Image alt="menu" src={"/icons/menu-bar.svg"} width={30} height={30} />
      </button>
      <button
        onClick={() => {
          if (openMenu) {
            setOpenMenu(false);
          }
          setOpenMenuSearch(!openMenuSearch);
        }}
      >
        <Image alt="menu" src={"/icons/lupa-p.svg"} width={30} height={30} />
      </button>
      <div
        className={`fixed ${
          openMenu ? "left-0 " : "-left-[999px]"
        } border-r-2 p-2 transition-all duration-300 w-[85%] bottom-0 h-screen z-50 rela bg-white flex flex-col gap-2`}
      >
        <div className="flex items-center justify-between">
          {userAuth ? (
            <Link className="flex gap-1 items-center" href={"/perfil"}>
              <Image
                className="rounded-full"
                alt="menu"
                src={"/images/perfil.png"}
                width={40}
                height={40}
              />
              <h1 className="text-xl font-bold">{userName}</h1>
            </Link>
          ) : (
            <Link
              className="p-2 w-fit rounded-full bg-laranjaProdunfo text-white"
              href={"/entrar"}
            >
              Login
            </Link>
          )}
          <button
            className="text-2xl font-semibold h-10 w-10 text-center rounded-md text-white bg-laranjaProdunfo"
            onClick={() => {
              if (openMenuSearch) {
                setOpenMenuSearch(false);
              }
              setOpenMenu(!openMenu);
            }}
          >
            X
          </button>
        </div>
        {!userAuth && (
          <Link
            className="p-2 w-fit rounded-full bg-zinc-500 text-white"
            href={"/cadastro"}
          >
            Cadastrar
          </Link>
        )}
        <Link
          className="p-2 w-fit rounded-full hover:bg-laranjaProdunfo hover:text-white"
          href={"/"}
        >
          Início
        </Link>
        <Link
          className="p-2 w-fit rounded-full hover:bg-laranjaProdunfo hover:text-white"
          href={"/servicos?page=0"}
        >
          VER OPORTUNIDADES
        </Link>
        <Link
          className="p-2 w-fit rounded-full hover:bg-laranjaProdunfo hover:text-white"
          href={"/servico/novo"}
        >
          OFERTAR SERVIÇOS
        </Link>
      </div>

      <div
        className={`fixed ${
          openMenuSearch ? "right-0 " : "-right-[999px]"
        } border-r-2 p-2 transition-all duration-300 w-[85%] bottom-0 h-screen z-50 rela bg-white flex flex-col gap-2`}
      >
        <div className="flex items-center justify-between gap-1">
          <button
            className="text-2xl font-semibold h-10 w-10 text-center rounded-md text-white bg-laranjaProdunfo"
            onClick={() => {
              if(openMenu) {
                setOpenMenu(false);
              }
              setOpenMenuSearch(!openMenuSearch);
            }}
          >
            X
          </button>
          <form className="w-full" onSubmit={handleSubmit}>
            <input
              className="bg-transparent border-none outline-none flex-1 w-[300px]"
              type="text"
              name="search"
              placeholder="Digite Aqui..."
            />
          </form>
        </div>
      </div>
    </header>
  );
}
