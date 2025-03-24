"use client"
import listEstados from '@/data/estados.json'
import { SelectOne } from "@/components/ui/select-one";
import { TextArea } from "@/components/ui/text-area";
import { InputField } from "@/components/ui/input-field";
import { usePerfilHook } from '@/hooks/use-perfil-hooks';
import { maskInput } from '@/utils/mask-input';
import { useErrorsHooks } from '@/hooks/error-message-hook';
import SelectMultiGrouped from '@/components/ui/select-multi';
import UserProfileService from '@/services/user-profile-service';
import { useRouter } from 'next/navigation';
import BaseService from '@/services/base-service';


export default function FinishProfileForm(){
    
    const {perfilData, updateHookDataUnitValue} = usePerfilHook();
    const {disableErrorMessage, errorMessage, updateErrorMessage} = useErrorsHooks();
    const {formatCPF, formatPhone} = maskInput();
    const router = useRouter();
    

    const optionsHabilidades = [
      {
        label: "Tecnologia",
        options: [
          { value: "web-development", label: "Desenvolvimento Web" },
          { value: "mobile-development", label: "Desenvolvimento Mobile" },
          { value: "ui-ux-design", label: "UI/UX Design" },
        ]
      },
      {
        label: "Serviços Gerais",
        options: [
          { value: "plumbing", label: "Encanamento" },
          { value: "electrical", label: "Serviços Elétricos" },
          { value: "carpentry", label: "Marcenaria & Carpintaria" },
        ]
      },
    ]
    
    function checkMinAndMaxLengthAbout(value){
      if(value.length > 250) {
        updateErrorMessage({
          title: 'about',
          message: 'Sua descrição não pode passar de 250 caracteres!'
        })
        return true
      } 
      
      if(value.length < 20) {
        updateErrorMessage({
          title: 'about',
          message: 'Sua descrição deve conter pelo menos 20 caracteres '
        })
        return true
      }
      return false
    }
  
    function checkMinAndMaxLengthName(value){
      if(value.length > 250) {
        updateErrorMessage({
          title: 'name',
          message: 'Sua nome não pode passar de 250 caracteres!'
        })
        return true
      } 
      
      if(value.length < 5) {
        updateErrorMessage({
          title: 'name',
          message: 'Sua nome deve conter pelo menos 5 caracteres '
        })
        return true
      }
      return false
    }
  
    function checkMinAndMaxSelectSkils(value){
      if(value.length > 10) {
        updateErrorMessage({
          title: 'skills',
          message: 'Máximo de 10 habilidades permitidas.'
        })
        return true
      } 
      
      if(value.length < 1) {
        updateErrorMessage({
          title: 'skills',
          message: 'Selecione pelo menos um habilidade.'
        })
        return true
      }
      return false
    }

    function checkBoxTrue(value){
      if(!value) {
        updateErrorMessage({
          title: 'checkBox',
          message: 'Concorde com os termos!'
        })
        return true
      } 
      
      return false
    }

    function validateCPF(cpf) {
        if(cpf.replace(/\D/g, '').length < 11){
            updateErrorMessage({
                title: 'cpf',
                message: 'Por favor, preencha este campo corretamente'
              })
            return true
        }
        return false
    }
    
    function validatePhone(phone) {
        if(phone.replace(/\D/g, '').length <= 10){
            updateErrorMessage({
                title: 'phone',
                message: 'Por favor, preencha este campo corretamente'
              })
            return true
        }
        return false
    }

    function validateLocation(location){
        if(location.length <= 1){
            updateErrorMessage({
                title: 'location',
                message: 'Por favor, preencha este campo corretamente'
              })
            return true
        }
        return false
    }


    async function handleSubmit(event) {
      event.preventDefault();
      
      if(checkMinAndMaxLengthName( perfilData.name)) return 
      if(validateCPF(perfilData.document)) return
      if(validatePhone(perfilData.phone)) return
      if(validateLocation(perfilData.address)) return
      if(checkMinAndMaxLengthAbout(perfilData.description)) return
      if(checkMinAndMaxSelectSkils(perfilData.skills)) return
      if(checkBoxTrue(perfilData.terms)) return
      disableErrorMessage()
      console.log(perfilData);
      
      let response = await UserProfileService.create(
        perfilData.name,
        perfilData.document,
        perfilData.phone,
        perfilData.address,
        '34324233',
        perfilData.description,
        perfilData.skills.map(item => item.value)
      );
  
      if (response.status >= 400) {
        console.error("Erro ao criar perfil de usuário");
        return;
      }

      BaseService.setToken("")
      router.push("/entrar");
    }

    return (
        <form onSubmit={handleSubmit} className='h-full pb-2'>
            <InputField
                label={'Nome completo'}
                name={'nome'}
                inputStyle={'form'}
                required={true}
                placeholder={'Roberto Claudio da Silva'}
                error={errorMessage?.title == 'name' ? errorMessage.message : null}
                onChange={(e) => updateHookDataUnitValue({
                    field: 'name',
                    value:e
                  })}
            />
            <InputField
                label={'CPF'}
                name={'cpf'}
                inputStyle={'form'}
                required={true}
                placeholder={'000.000.000-00'}
                error={errorMessage?.title == 'cpf' ? errorMessage.message : null}
                value={formatCPF(perfilData.document)}
                onChange={(e) => 
                    e.length <= 14 ? updateHookDataUnitValue({field: 'document', value: e}) : null
                }
            />
            <InputField
                label={'Telefone para contato'}
                name={'phone'}
                inputStyle={'form'}
                required={true}
                placeholder={'(00) 0 0000-0000'}
                error={errorMessage?.title == 'phone' ? errorMessage.message : null}
                value={formatPhone(perfilData.phone)}
                onChange={(e) => 
                    e.length <= 15 ? updateHookDataUnitValue({field: 'phone', value: e}) : null
                }
            />

            <SelectOne
              name={'localizacao'}
              label={'Sua localização'}
              inputStyle="form"
              options={listEstados}
              error={errorMessage?.title == 'location' ? errorMessage.message : null}
              onChange={(e) => updateHookDataUnitValue({
                field: 'address',
                value:e
              })}

            />

            <TextArea
                label={'Sobre você'}
                name={'telefone'}
                inputStyle={'form'}
                placeholder={'Escreva aqui...'}
                error={errorMessage?.title == 'about' ? errorMessage.message : null}
                onChange={(e) => updateHookDataUnitValue({
                    field: 'description',
                    value:e
                  })}
            />

            <SelectMultiGrouped 
                label={'Habilidades'}
                options={optionsHabilidades}
                value={perfilData.requisitos}
                error={errorMessage?.title == 'skills' ? errorMessage.message : null}
                onChange={(e) => updateHookDataUnitValue({
                    field:  'skills',
                    value: e
                })}
            />

            <div className='flex items-start gap-1 py-2'>
                <input className='h-7' 
                  type="checkbox" 
                  name="" 
                  id="input_checkbox" 
                  value={perfilData.terms}
                  onClick={() => {
                    updateHookDataUnitValue({
                      field:'terms',
                      value: !perfilData.terms
                    })
                  }}
                />
                <div className={`flex flex-col ${errorMessage?.title == 'checkBox' ? 'text-red-400' : null}`}>
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