"use client"
import listEstados from '@/data/estados.json'
import { SelectOne } from "@/components/ui/select-one";
import { TextArea } from "@/components/ui/text-area";
import { InputField } from "@/components/ui/input-field";
import SelectMultiGrouped from '@/components/ui/select-multi';
import optionsHabilidades from "@/data/habilidades.json"
import { UserHooks } from '@/hooks/user-hooks';
import { maskInput } from '@/utils/mask-input';
import { useErrorsHooks } from '@/hooks/error-message-hook';


export default function SecundRegisterForm(){
    
    const {userData, updateUserDataUnitValue} = UserHooks();
    const {disableErrorMessage, errorMessage, updateErrorMessage} = useErrorsHooks();
    const {formatCPF, formatPhone} = maskInput();
    
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

    function checkLengt({valueLength, title, message, lessThan }){
        if( valueLength  <= lessThan  ){
            updateErrorMessage({
                title: title,
                message: message
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

    function handleForm(event){
        event.preventDefault();
        
        if(checkMinAndMaxLengthName( userData.name)) return 
        if(validateCPF(userData.cpf)) return
        if(validatePhone(userData.phone)) return
        if(validateLocation(userData.location)) return
        if(checkMinAndMaxLengthAbout(userData.about)) return
        if(checkMinAndMaxSelectSkils(userData.skills)) return
        if(checkBoxTrue(userData.terms)) return

        disableErrorMessage()
        
        const {terms, ...data} = userData

        console.log(data)
    }

    return (
        <form onSubmit={handleForm} className='h-full pb-2'>
            <InputField
                label={'Nome completo'}
                name={'nome'}
                inputStyle={'form'}
                required={true}
                placeholder={'Roberto Claudio da Silva'}
                error={errorMessage?.title == 'name' ? errorMessage.message : null}
                onChange={(e) => updateUserDataUnitValue({
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
                value={formatCPF(userData.cpf)}
                onChange={(e) => 
                    e.length <= 14 ? updateUserDataUnitValue({field: 'cpf', value: e}) : null
                }
            />
            <InputField
                label={'Telefone para contato'}
                name={'phone'}
                inputStyle={'form'}
                required={true}
                placeholder={'(00) 0 0000-0000'}
                error={errorMessage?.title == 'phone' ? errorMessage.message : null}
                value={formatPhone(userData.phone)}
                onChange={(e) => 
                    e.length <= 15 ? updateUserDataUnitValue({field: 'phone', value: e}) : null
                }
            />

            <SelectOne
              name={'localizacao'}
              label={'Sua localização'}
              inputStyle="form"
              options={listEstados}
              error={errorMessage?.title == 'location' ? errorMessage.message : null}
              onChange={(e) => updateUserDataUnitValue({
                field: 'location',
                value:e
              })}

            />

            <TextArea
                label={'Sobre você'}
                name={'telefone'}
                inputStyle={'form'}
                placeholder={'Escreva aqui...'}
                error={errorMessage?.title == 'about' ? errorMessage.message : null}
                onChange={(e) => updateUserDataUnitValue({
                    field: 'about',
                    value:e
                  })}
            />

            <SelectMultiGrouped 
                label={'Habilidades'}
                options={optionsHabilidades}
                value={userData.requisitos}
                error={errorMessage?.title == 'skills' ? errorMessage.message : null}
                onChange={(e) => updateUserDataUnitValue({
                    field:  'skills',
                    value: e
                })}
            />

            <div className='flex items-start gap-1 py-2'>
                <input className='h-7' 
                  type="checkbox" 
                  name="" 
                  id="input_checkbox" 
                  value={userData.terms}
                  onClick={() => {
                    updateUserDataUnitValue({
                      field:'terms',
                      value: !userData.terms
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