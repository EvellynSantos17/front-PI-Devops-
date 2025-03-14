"use client"
import { useRouter } from "next/navigation";
import { BaseButton } from "../ui/base-button";
import { InputField } from "../ui/input-field";
import { useErrorsHooks } from "@/hooks/error";

export default function LoginForm(){

    const router = useRouter()

    const{disableErrorMessage, errorMessage, updateErrorMessage} = useErrorsHooks();

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
        if (password.length < 8) {
            updateErrorMessage({
                title:"password", 
                message:"a senha deve conter pelo menos 8 caracteres"
            })
            return false;
        }
        return true;
    }

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const { email, password} = Object.fromEntries(formData);

        if (!validateEmail(email)) return;
        if (!validatePassword(password)) return;

        disableErrorMessage();

        router.push("/")
    }
    return(
        <form onSubmit={handleSubmit}>
            <InputField
                type="email"
                name={"email"}
                required={true}
                error={errorMessage?.title == "email" ? errorMessage.message :null}            
            />
            <InputField
                type="password"
                name={"password"}
                required={true}
                error={errorMessage?.title == "password" ? errorMessage.message :null}
            />

            <BaseButton>
                <span>
                    Login
                </span>
            </BaseButton>
        </form>
    )
}