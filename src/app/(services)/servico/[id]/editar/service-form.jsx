"use client";
import { InputField } from "@/components/ui/input-field";
import SelectMultiGrouped from "@/components/ui/select-multi";
import habilidades from "@/data/habilidades.json";
import { TextArea } from "@/components/ui/text-area";
import { useParams, useRouter } from "next/navigation";
import { useErrorsHooks } from "@/hooks/error-message-hook";
import { UseService } from "@/hooks/use-services";
import UseLoading from "@/hooks/use-loading";
import ListingService from "@/services/listing-service";
import FetchFindById from "@/hooks/fetch/fetch-find-by-id";
import BaseService from "@/services/base-service";

export default function ServiceForm() {
  
  const { id } = useParams()
  const router = useRouter();
  const { service, updateOneValueServico, updateService } = UseService();
  const { loading, upDateLoading } = UseLoading(false);
  const { disableErrorMessage, errorMessage, updateErrorMessage } =
  useErrorsHooks();
  const userInfo = BaseService.getTokenInfo();
  
  FetchFindById({
    id: id,
    serviceName: 'ListingService',
    onDataFetched: (value) => {
      value.error == 'Resource not found' && router.back()
      value.userProfile.id != userInfo.accountId && router.back()
      updateService(value)
    }
  })


  function checkMinAndMaxTextAreaLength({ value }) {
    if (value.length > 250) {
      updateErrorMessage({
        title: "descricao",
        message: "Sua descrição não pode passar de 250 caracteres!",
      });
      return true;
    }

    if (value.length < 20) {
      updateErrorMessage({
        title: "descricao",
        message: "Sua descrição deve conter pelo menos 20 caracteres ",
      });
      return true;
    }
    return false;
  }

  function checkMinAndMaxTitleLength({ value }) {
    if (value.length > 150) {
      updateErrorMessage({
        title: "titulo",
        message: "Sua titulo não pode passar de 250 caracteres!",
      });
      return true;
    }

    if (value.length < 10) {
      updateErrorMessage({
        title: "titulo",
        message: "Sua titulo deve conter pelo menos 10 caracteres ",
      });
      return true;
    }
    return false;
  }

  function checkMinAndMaxSelectSkils({ value }) {
    if (value.length > 10) {
      updateErrorMessage({
        title: "requisitos",
        message: "Máximo de 10 requisitos permitidas.",
      });
      return true;
    }

    if (value.length < 1) {
      updateErrorMessage({
        title: "requisitos",
        message: "Selecione pelo menos um requisito.",
      });
      return true;
    }

    return false;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (checkMinAndMaxTitleLength({ value: service.title })) {
      upDateLoading(false);
      return;
    }
    if (checkMinAndMaxTextAreaLength({ value: service.description })) {
      upDateLoading(false);
      return;
    }
    if (checkMinAndMaxSelectSkils({ value: service.skills })) {
      upDateLoading(false);
      return;
    }

    disableErrorMessage();

    await ListingService.update({
      id: service.id,
      title: service.title,
      price: service.price,
      description: service.description,
      location: service.location,
      skills: service.skills
    });

    upDateLoading(false);

    router.push(`/servico/${id}`);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="w-full">
      <div className="flex py-2 flex-col items-center justify-center">
        <h1 className="text-[40px]">Editar serviço</h1>
        <span className="text-base text-[#757575]">
          Data de criação: {service.creationDate}
        </span>
      </div>
      <InputField
        name={"titulo"}
        required={true}
        placeholder={"Desenvolvimento de um Website E-commerce"}
        label={"Título da vaga"}
        error={errorMessage?.title == "titulo" ? errorMessage.message : null}
        inputStyle="form"
        value={service.title}
        onChange={(e) =>
          updateOneValueServico({
            field: "title",
            value: e,
          })
        }
      />
      <InputField
        name={"valor"}
        required={true}
        type="number"
        placeholder={"R$ 500,00"}
        label={"Valor do serviço"}
        error={errorMessage?.title == "valor" ? errorMessage.message : null}
        inputStyle="form"
        value={service.price}
        onChange={(e) =>
          updateOneValueServico({
            field: "price",
            value: e,
          })
        }
      />
      <InputField
        name={"localizacao"}
        required={true}
        placeholder={"Desenvolvimento de um Website E-commerce"}
        label={"Localização"}
        value={service.location}
        error={
          errorMessage?.title == "localizacao" ? errorMessage.message : null
        }
        inputStyle="form"
        onChange={(e) =>
          updateOneValueServico({
            field: "location",
            value: e,
          })
        }
      />
      <TextArea
        label={"Descrição da vaga"}
        name={"de"}
        placeholder={
          "Descreva detalhadamente o projeto, seus objetivos e expectativas..."
        }
        error={errorMessage?.title == "descricao" ? errorMessage.message : null}
        inputStyle="form"
        value={service.description}
        onChange={(e) =>
          updateOneValueServico({
            field: "description",
            value: e,
          })
        }
      />
      <SelectMultiGrouped
        label={"Requisitos"}
        options={habilidades}
        value={service.skills.map((skill) => ({value: skill,label: skill}))}
        error={
          errorMessage?.title == "requisitos" ? errorMessage.message : null
        }
        onChange={(e) => 
          updateOneValueServico({
            field: "skills",
            value: e.map(item => item.label),
          })
        }
      />
      <div className="flex items-center gap-2  py-2">
        <button
          disabled={loading}
          className={`${
            loading ? "bg-opacity-80" : null
          } hover:bg-opacity-80 w-full text-center rounded-lg bg-laranjaProdunfo text-white py-2 flex-1`}
        >
          Salvar alterações
        </button>
        <button
          onClick={() => upDateLoading(loading)}
          className="hover:bg-opacity-80 px-2 py-2 rounded-lg bg-[#FF00004D] text-red-800"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
