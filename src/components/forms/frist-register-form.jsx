"use client";

import { useErrorsHooks } from "@/hooks/error";
import { userRegister } from "@/services/user-service";
import { useRouter } from "next/navigation";
import { InputField } from "../ui/input-field";
import { BaseButton } from "../ui/base-button";

export default function FristRegisterForm() {
  const router = useRouter();

  const { errorMessage, updateErrorMessage, disableErrorMessage } = useErrorsHooks();

  function matchPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      updateErrorMessage({
        title: "confirmPassword",
        message: "As senhas não coincidem!",
      });
      return false;
    }
    return true;
  }

  function validatePassword(password) {
    if (password.length < 8) {
      updateErrorMessage({
        title: "password",
        message: "A senha deve conter pelo menos 8 caracteres.",
      });
      return false;
    }
    return true;
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      updateErrorMessage({
        title: "email",
        message: "Formato de e-mail inválido. Por favor, insira um e-mail válido!",
      });
      return false;
    }
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const { email, password, confirmPassword } = Object.fromEntries(formData);

    if (!validateEmail(email)) return;
    if (!matchPassword(password, confirmPassword)) return;
    if (!validatePassword(password)) return;

    disableErrorMessage();

    await userRegister({ email, password });

    router.push("/login");
  }

  return (
    <form className="w-full h-fit"
     onSubmit={handleSubmit}
    >
      <InputField
        type="email"
        name="email"
        placeholder={'E-mail'}
        required={true}
        error={errorMessage?.title === "email" ? errorMessage.message : null}
      />
      <InputField
        type="password"
        name="password"
        placeholder={'Senha'}
        required={true}
        error={errorMessage?.title === "password" ? errorMessage.message : null}
      />
      <InputField
        type="password"
        name="confirmPassword"
        placeholder={'Confirmar sua senha'}
        required={true}
        error={errorMessage?.title === "confirmPassword" ? errorMessage.message : null}
      />
      <BaseButton rounded={'rounded-2xl mt-4'}>
        <span className="font-semibold text-white">
          CADASTRAR
        </span>
      </BaseButton>
    </form>
  );
}
