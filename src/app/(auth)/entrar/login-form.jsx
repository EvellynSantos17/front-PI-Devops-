"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input-field";
import AuthService from "@/services/auth-service";
import { useErrorsHooks } from "@/hooks/error-message-hook";
import BaseService from "@/services/base-service";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const { disableErrorMessage, errorMessage, updateErrorMessage } = useErrorsHooks();
  const [loading, setLoading] = useState(false); 
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

  function validatePassword(password) {
    if (password.length < 1) {
      updateErrorMessage({
        title: "password",
        message: "A senha deve conter pelo menos 8 caracteres",
      });
      return false;
    }
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true); 

    const formData = new FormData(event.currentTarget);
    const { email, password } = Object.fromEntries(formData);

    if (!validateEmail(email) || !validatePassword(password)) {
      setLoading(false); 
      return;
    }

    disableErrorMessage();

    let response = await AuthService.login(email, password);
    if (response.status >= 400) {
      updateErrorMessage({
        message: 'Ops! E-mail ou senha inválidos.',
        title: 'email'
      })
      setLoading(false); 
      return;
    }

    const token = BaseService.getToken();
    let info = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    setLoading(false); // <- finaliza loading
    router.push(info.accountId == null ? "/finalizar-perfil" : "/");
  }

  return (
    <form className="w-full h-fit"  onSubmit={handleSubmit}>
      <InputField
        type="email"
        name="email"
        required={true}
        placeholder="Email"
        error={errorMessage?.title === "email" ? errorMessage.message : null}
      />
      <InputField
        type="password"
        name="password"
        required={true}
        placeholder="Senha"
        error={errorMessage?.title === "password" ? errorMessage.message : null}
      />

      <Button disabled={loading} rounded="rounded-2xl mt-4">
        <span className="text-white">
          {loading ? "Entrando..." : "Login"}
        </span>
      </Button>
    </form>
  );
}
