import LoginForm from "./login-form";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <section className="w-screen h-screen overflow-hidden flex items-center justify-center ">
      <div className="w-3/4 h-[90%] md:h-full flex flex-col md:flex-row rounded-2xl overflow-hidden border-black border">
        <div className="flex flex-col items-center justify-center w-full h-full px-10 py-5 md:px-10 gap-8">
          <figure>
            <Image
              src={"/images/logo-workhub-typography.png"}
              alt="logo-workhub-typography"
              width={450}
              height={74}
            />
          </figure>
          <LoginForm />
        </div>
        <div className="w-full h-full bg-black flex flex-col items-center justify-center gap-5">
          <figure>
            <Image
              src={"/images/logo.png"}
              alt="logo"
              width={100}
              height={85}
            />
          </figure>
          <Link href={"/cadastro"} className="">
            <span className=" w-40 font-semibold bg-laranjaProdunfo text-white px-10 py-2 rounded-3xl">
              CADASTRO
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
