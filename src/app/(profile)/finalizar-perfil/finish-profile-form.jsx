"use client";
import { TextArea } from "@/components/ui/text-area";
import { InputField } from "@/components/ui/input-field";
import SelectMultiGrouped from "@/components/ui/select-multi";
import optionsHabilidades from "@/data/habilidades.json";
import UserProfileService from "@/services/user-profile-service";
import { useRouter } from "next/navigation";

export default function FinishProfileForm() {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData);
    // This will be empty until the select is fixed
    formObject.skills = [];

    let response = await UserProfileService.create(
      formObject.name,
      formObject.document,
      formObject.phone,
      formObject.address,
      formObject.postalCode,
      formObject.description,
      formObject.skills
    );

    if (response.status >= 400) {
      console.error("Erro ao criar perfil de usuário");
      return;
    }

    router.push("/");
  }

  return (
    <form className="h-full pb-2" onSubmit={handleSubmit}>
      <InputField
        label={"Nome completo"}
        type="text"
        name="name"
        placeholder={"Nome completo"}
        required={true}
        inputStyle={"form"}
      />
      <InputField
        label={"CPF"}
        type="number"
        name="cpf"
        placeholder={"Apenas números"}
        required={true}
        inputStyle={"form"}
      />
      <InputField
        label={"Telefone"}
        type="text"
        name="phone"
        placeholder={"Apenas números"}
        required={true}
        inputStyle={"form"}
      />
      <InputField
        label={"Endereço"}
        type="text"
        name="address"
        placeholder={"Rua tal, n 123"}
        required={true}
        inputStyle={"form"}
      />
      <InputField
        label={"CEP"}
        type="text"
        name="postalCode"
        placeholder={"Apenas números"}
        required={true}
        inputStyle={"form"}
      />

      <TextArea
        label={"Sobre você"}
        name="description"
        inputStyle={"form"}
        placeholder={"Escreva aqui..."}
      />

      <SelectMultiGrouped
        label={"Habilidades"}
        name="skills"
        options={optionsHabilidades}
      />

      <div className="flex items-start gap-1 py-2">
        <input className="h-7" type="checkbox" name="" id="input_checkbox" />
        <div className="flex flex-col">
          <span>Eu aceito os termos de uso</span>
          <span className="text-sm border-b border-b-zinc-400 text-zinc-400 w-fit cursor-pointer">
            Termos da plataforma
          </span>
        </div>
      </div>

      <div className="py-2 w-full">
        <button className="w-full bg-laranjaProdunfo rounded-xl text-white font-semibold p-2">
          Salvar informações
        </button>
      </div>
    </form>
  );
}
