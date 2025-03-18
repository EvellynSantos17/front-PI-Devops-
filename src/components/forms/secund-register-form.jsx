"use client"
import listEstados from '@/data/estados.json'
import { BaseSelectOne } from "../ui/base-select-one";
import { BaseTextArea } from "../ui/base-text-area";
import { InputField } from "../ui/input-field";
import SelectMultiGrouped from '../ui/select-multi';
import UploadFile from '../ui/upload-file';
import { BaseButton } from '../ui/base-button';

export default function SecundRegisterForm(){

    function handleForm(e){
        console.log('ola')
    }

    return (
        <form onChange={handleForm} className='h-full pb-2'>
            <InputField
                label={'Nome completo'}
                name={'nome'}
                inputStyle={'form'}
                required={true}
                placeholder={'Roberto Claudio da Silva'}
            />
            <InputField
                label={'CPF'}
                name={'cpf'}
                inputStyle={'form'}
                required={true}
                placeholder={'000.000.000-00'}
            />
            <InputField
                label={'Telefone para contato'}
                name={'telefone'}
                inputStyle={'form'}
                required={true}
                placeholder={'(00) 0 0000-0000'}
            />

            <BaseSelectOne
              name={'localizacao'}
              label={'Sua localização'}
              inputStyle="form"
              options={listEstados}

            />

            <BaseTextArea
                label={'Sobre você'}
                name={'telefone'}
                inputStyle={'form'}
                placeholder={'Escreva aqui...'}
            />

            <SelectMultiGrouped
                label={"Habilidades"}
            />

            <UploadFile label={'Adicionar currículo (formatos aceitos: PDF.)'} />

            <div className='flex items-start gap-1 py-2'>
                <input className='h-7' type="checkbox" name="" id="input_checkbox" />
                <div className='flex flex-col'>
                    <span>
                        Eu aceito os termos de uso
                    </span>
                    <span className='text-sm border-b border-b-zinc-400 text-zinc-400 w-fit cursor-pointer'>
                        Termos da plataforma
                    </span>
                </div>
            </div>

            
            <div className='py-2 w-full'>
                <button className='w-full bg-laranjaProdunfo rounded-xl text-white font-semibold p-2'>
                    Salvar informações
                </button>
            </div>

        </form>
    )
}