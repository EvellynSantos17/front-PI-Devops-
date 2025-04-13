"use client";
import { useRouter } from "next/navigation";
import SelectMultiGrouped from "@/components/ui/select-multi";
import { SelectOne } from "@/components/ui/select-one";
import listEstados from "@/data/estados.json";
import { TextArea } from "@/components/ui/text-area";
import { InputField } from "@/components/ui/input-field";
import { useErrorsHooks } from "@/hooks/error-message-hook";
import UserProfileService from "@/services/user-profile-service";
import BaseService from "@/services/base-service";
import AuthService from "@/services/auth-service";
import { maskInput } from "@/utils/mask-input";
import { usePerfil } from "@/hooks/use-perfil";
import { useState } from "react";

export default function FinishProfileForm() {
  const { perfil, updateDataUnitValue } = usePerfil();
  const { disableErrorMessage, errorMessage, updateErrorMessage } =
    useErrorsHooks();
  const { formatCPF, formatPhone } = maskInput();
  const router = useRouter();

  const optionsHabilidades = [
    {
      label: "Tecnologia",
      options: [
        { value: "web-development", label: "Desenvolvimento Web" },
        { value: "mobile-development", label: "Desenvolvimento Mobile" },
        { value: "ui-ux-design", label: "UI/UX Design" },
      ],
    },
    {
      label: "Serviços Gerais",
      options: [
        { value: "plumbing", label: "Encanamento" },
        { value: "electrical", label: "Serviços Elétricos" },
        { value: "carpentry", label: "Marcenaria & Carpintaria" },
      ],
    },
  ];

  function checkMinAndMaxLengthAbout(value) {
    if (value.length > 250) {
      updateErrorMessage({
        title: "about",
        message: "Sua descrição não pode passar de 250 caracteres!",
      });
      return true;
    }

    if (value.length < 20) {
      updateErrorMessage({
        title: "about",
        message: "Sua descrição deve conter pelo menos 20 caracteres ",
      });
      return true;
    }
    return false;
  }

  function checkMinAndMaxLengthName(value) {
    if (value.length > 250) {
      updateErrorMessage({
        title: "name",
        message: "Sua nome não pode passar de 250 caracteres!",
      });
      return true;
    }

    if (value.length < 5) {
      updateErrorMessage({
        title: "name",
        message: "Sua nome deve conter pelo menos 5 caracteres ",
      });
      return true;
    }
    return false;
  }

  function checkMinAndMaxSelectSkils(value) {
    if (value.length > 10) {
      updateErrorMessage({
        title: "skills",
        message: "Máximo de 10 habilidades permitidas.",
      });
      return true;
    }

    if (value.length < 1) {
      updateErrorMessage({
        title: "skills",
        message: "Selecione pelo menos um habilidade.",
      });
      return true;
    }
    return false;
  }

  function checkBoxTrue(value) {
    if (!value) {
      updateErrorMessage({
        title: "checkBox",
        message: "Concorde com os termos!",
      });
      return true;
    }

    return false;
  }

  function validateCPF(cpf) {
    if (cpf.replace(/\D/g, "").length < 11) {
      updateErrorMessage({
        title: "cpf",
        message: "Por favor, preencha este campo corretamente",
      });
      return true;
    }
    return false;
  }

  function validatePhone(phone) {
    if (phone.replace(/\D/g, "").length <= 10) {
      updateErrorMessage({
        title: "phone",
        message: "Por favor, preencha este campo corretamente",
      });
      return true;
    }
    return false;
  }

  function validateLocation(location) {
    if (location.length <= 1) {
      updateErrorMessage({
        title: "location",
        message: "Por favor, preencha este campo corretamente",
      });
      return true;
    }
    return false;
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  
  async function handleSubmit(event) {
    event.preventDefault();

    if (checkMinAndMaxLengthName(perfil.name)) return;
    if (validateCPF(perfil.document)) return;
    if (validatePhone(perfil.phone)) return;
    if (validateLocation(perfil.address)) return;
    if (checkMinAndMaxLengthAbout(perfil.description)) return;
    if (checkMinAndMaxSelectSkils(perfil.skills)) return;
    if (checkBoxTrue(perfil.terms)) return;

    disableErrorMessage();
    setIsSubmitting(true);

    try {
      let response = await UserProfileService.create(
        perfil.name,
        perfil.document,
        perfil.phone,
        perfil.address,
        perfil.title,
        perfil.cpf,
        perfil.description,
        perfil.skills.map((item) => item.value)
      );

      if (response.status >= 400) {
        console.error("Erro ao criar perfil de usuário");
        setIsSubmitting(false);
        return;
      }

      response = await AuthService.refreshToken();

      if (response.status >= 400) {
        console.error("Erro ao atualizar token");
        router.push("/entrar");
      } else {
        let token = response.headers.get("Authorization");
        BaseService.setToken(token);
        router.push("/");
      }
    } catch (error) {
      console.error("Erro no envio do formulário", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="h-full pb-2">
      <InputField
        label={"Nome completo"}
        name={"nome"}
        inputStyle={"form"}
        required={true}
        placeholder={"Roberto Claudio da Silva"}
        error={errorMessage?.title == "name" ? errorMessage.message : null}
        onChange={(e) =>
          updateDataUnitValue({
            field: "name",
            value: e,
          })
        }
      />
      <InputField
        label={"CPF"}
        name={"cpf"}
        inputStyle={"form"}
        required={true}
        placeholder={"000.000.000-00"}
        error={errorMessage?.title == "cpf" ? errorMessage.message : null}
        value={formatCPF(perfil.document)}
        onChange={(e) =>
          e.length <= 14
            ? updateDataUnitValue({ field: "document", value: e })
            : null
        }
      />
      <InputField
        label={"Telefone para contato"}
        name={"phone"}
        inputStyle={"form"}
        required={true}
        placeholder={"(00) 0 0000-0000"}
        error={errorMessage?.title == "phone" ? errorMessage.message : null}
        value={formatPhone(perfil.phone)}
        onChange={(e) =>
          e.length <= 15
            ? updateDataUnitValue({ field: "phone", value: e })
            : null
        }
      />

      <InputField
        name={"CEP"}
        label={"CEP"}
        inputStyle="form"
        required={true}
        placeholder={"000.000-000"}
        options={listEstados}
        error={null}
        onChange={(e) =>
          updateDataUnitValue({
            field: "cep",
            value: e,
          })
        }
      />

      <InputField
        name={"localizacao"}
        label={"Sua localização"}
        inputStyle="form"
        required={true}
        placeholder={"Rua Dr.João pessoa, 88, Crato - CE"}
        options={listEstados}
        error={errorMessage?.title == "location" ? errorMessage.message : null}
        onChange={(e) =>
          updateDataUnitValue({
            field: "address",
            value: e,
          })
        }
      />

      <InputField
        name={"title"}
        label={"Seu Titulo"}
        inputStyle="form"
        placeholder={"Encanador / Eletricista"}
        options={listEstados}
        error={errorMessage?.title == "title" ? errorMessage.message : null}
        onChange={(e) =>
          updateDataUnitValue({
            field: "title",
            value: e,
          })
        }
      />

      <TextArea
        label={"Sobre você"}
        name={"telefone"}
        inputStyle={"form"}
        placeholder={"Escreva aqui..."}
        error={errorMessage?.title == "about" ? errorMessage.message : null}
        onChange={(e) =>
          updateDataUnitValue({
            field: "description",
            value: e,
          })
        }
      />

      <SelectMultiGrouped
        label={"Habilidades"}
        options={optionsHabilidades}
        value={perfil.requisitos}
        error={errorMessage?.title == "skills" ? errorMessage.message : null}
        onChange={(e) =>
          updateDataUnitValue({
            field: "skills",
            value: e,
          })
        }
      />

      <div className="flex items-start gap-1 py-2">
        <input
          className="h-7"
          type="checkbox"
          name=""
          id="input_checkbox"
          value={perfil.terms}
          onClick={() => {
            updateDataUnitValue({
              field: "terms",
              value: !perfil.terms,
            });
          }}
        />
        <div
          className={`flex flex-col ${
            errorMessage?.title == "checkBox" ? "text-red-400" : null
          }`}
        >
          <span>Eu aceito os termos de uso</span>
          <span className="text-sm border-b border-b-zinc-400 text-zinc-400 w-fit cursor-pointer">
            Termos da plataforma
          </span>
        </div>
      </div>

      <div className="py-2 w-full">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full rounded-xl text-white font-semibold p-2 transition ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-laranjaProdunfo"
          }`}
        >
          {isSubmitting ? "Salvando..." : "Salvar informações"}
        </button>
      </div>
    </form>
  );
}
