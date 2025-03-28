"use client";

import { useRouter } from "next/navigation";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import AuthService from "@/services/auth-service";
import { useErrorsHooks } from "@/hooks/error-message-hook";

export default function RegisterForm() {
  const router = useRouter();

  const { errorMessage, updateErrorMessage, disableErrorMessage } =
    useErrorsHooks();

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
        message:
          "Formato de e-mail inválido. Por favor, insira um e-mail válido!",
      });
      return false;
    }
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const { email, password, confirmPassword } = Object.fromEntries(formData);

    if (
      !validateEmail(email) ||
      !matchPassword(password, confirmPassword) ||
      !validatePassword(password)
    )
      return;

    disableErrorMessage();

    const response = await AuthService.register(email, password);
    if (response.status >= 400) {
      // handle errors here
      const error = await response.json();
      console.log(error);
      return;
    }

    router.push("/entrar");
  }

  return (
    <form className="w-full h-fit" onSubmit={handleSubmit}>
      <InputField
        type="email"
        name="email"
        placeholder={"E-mail"}
        required={true}
        error={errorMessage?.title === "email" ? errorMessage.message : null}
      />
      <InputField
        type="password"
        name="password"
        placeholder={"Senha"}
        required={true}
        error={errorMessage?.title === "password" ? errorMessage.message : null}
      />
      <InputField
        type="password"
        name="confirmPassword"
        placeholder={"Confirmar sua senha"}
        required={true}
        error={
          errorMessage?.title === "confirmPassword"
            ? errorMessage.message
            : null
        }
      />
      <Button rounded={"rounded-2xl mt-4"}>
        <span className="font-semibold text-white">CADASTRAR</span>
      </Button>
    </form>
  );
}
