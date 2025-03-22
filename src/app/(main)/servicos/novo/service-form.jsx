"use client"
import { InputField } from "@/components/ui/input-field";
import SelectMultiGrouped from "@/components/ui/select-multi";
import { SelectOne } from "@/components/ui/select-one";
import tipos_contratos from "@/data/tipos-contratos.json"
import estados from "@/data/estados.json"
import habilidades from "@/data/habilidades.json"
import { TextArea } from "@/components/ui/text-area";
import {UseServiceHook} from "@/hooks/services-hook"
import { useRouter } from "next/navigation";
import { useErrorsHooks } from "@/hooks/error-message-hook";

export default function ServiceForm(){
  const router = useRouter();
  const {serviceData, updateServiceDateUnitValue} = UseServiceHook();
  const {disableErrorMessage, errorMessage, updateErrorMessage} = useErrorsHooks();

  function isEmpty({value, fild}){
    const empty = value === undefined || value === null || (typeof value === "string" && value.trim() === "") || value == ""
    if(empty){
      updateErrorMessage({
        title: fild,
        message: `Por favor, Preencha o campo corretamente`
      })
      return true
    }
    return false
  }

  function validationDate(date){
    const correntDay = new Date()
    const dateSelect = new Date(date)
    dateSelect.setDate(dateSelect.getDate() + 1)

    if(dateSelect < correntDay){
      updateErrorMessage({
        title: 'dt_limite',
        message: `A data limite não pode ser anterior à data atual.`
      })
      return true
    }

    return false
  }

  function checkMinAndMaxTextAreaLength({value}){
    if(value.length > 250) {
      updateErrorMessage({
        title: 'descricao',
        message: 'Sua descrição não pode passar de 250 caracteres!'
      })
      return true
    } 
    
    if(value.length < 20) {
      updateErrorMessage({
        title: 'descricao',
        message: 'Sua descrição deve conter pelo menos 20 caracteres '
      })
      return true
    }
    return false
  }

  function checkMinAndMaxTitleLength({value}){
    if(value.length > 150) {
      updateErrorMessage({
        title: 'titulo',
        message: 'Sua titulo não pode passar de 250 caracteres!'
      })
      return true
    } 
    
    if(value.length < 10) {
      updateErrorMessage({
        title: 'titulo',
        message: 'Sua titulo deve conter pelo menos 10 caracteres '
      })
      return true
    }
    return false
  }

  function checkMinAndMaxSelectSkils({value}){
    if(value.length > 10) {
      updateErrorMessage({
        title: 'requisitos',
        message: 'Máximo de 10 requisitos permitidas.'
      })
      return true
    } 
    
    if(value.length < 1) {
      updateErrorMessage({
        title: 'requisitos',
        message: 'Selecione pelo menos um requisito.'
      })
      return true
    }

    return false
  }

  function checkBoxTrue({value}){
    if(!value) {
      updateErrorMessage({
        title: 'checkBox',
        message: 'Concorde com os termos!'
      })
      return true
    } 
    
    return false
  }
  
  function handleSubmit(event){
    event.preventDefault();
    
    if(isEmpty({fild: 'titulo', value: serviceData.titulo})) return
    if(checkMinAndMaxTitleLength({value: serviceData.titulo})) return 
    if(isEmpty({fild: 'tipo', value: serviceData.tipo})) return
    if(isEmpty({fild: 'dt_limite', value: serviceData.dt_limite})) return
    if(validationDate(serviceData.dt_limite)) return
    if(isEmpty({fild: 'valor', value: serviceData.valor})) return
    if(isEmpty({fild: 'localizacao', value: serviceData.localizacao})) return
    if(isEmpty({fild: 'descricao', value:serviceData.descricao })) return
    if(isEmpty({fild: 'requisitos', value: serviceData.requisitos})) return
    
    
    if(checkMinAndMaxTextAreaLength({value:serviceData.descricao })) return
    if(checkMinAndMaxSelectSkils({value: serviceData.requisitos})) return
    
    if(checkBoxTrue({ value: serviceData.termos})) return

    disableErrorMessage()

    console.log(serviceData)
  }

return (
  <form onSubmit={(e) => handleSubmit(e)} className="w-full">
    <InputField
      name={"titulo"}
      placeholder={"Desenvolvimento de um Website E-commerce"}
      label={"Título da vaga"}
      error={errorMessage?.title == 'titulo' ? errorMessage.message : null}
      inputStyle="form"
      onChange={(e) => updateServiceDateUnitValue({
        field: 'titulo',
        value:e
      })}
    />
    <SelectOne
      name={"tipo"}
      label={"Tipo de contratação"}
      options={tipos_contratos}
      error={errorMessage?.title == 'tipo' ? errorMessage.message : null}
      onChange={(e) => updateServiceDateUnitValue({
        field:'tipo',
        value:e
      })}
    />
    <div className="flex items-center gap-4">
        <InputField
          name={"valor"}
          type="number"
          placeholder={"R$ 500,00"}
          label={"Valor do serviço"}
          error={errorMessage?.title == 'valor' ? errorMessage.message : null}
          inputStyle="form"
          value={serviceData.valor}
          onChange={(e) => updateServiceDateUnitValue({
            field: 'valor',
            value: e
          })}
        />
        <InputField
          name={"Limite de candidatura"}
          placeholder={"dd/mm/aaaa"}
          type="date"
          label={"Limite de candidatura"}
          error={errorMessage?.title == 'dt_limite' ? errorMessage.message : null}
          inputStyle="form"
          onChange={(e) => updateServiceDateUnitValue({
            field: 'dt_limite',
            value:e
          })}
        />
    </div>
    <SelectOne
      label={'Localização'}
      error={errorMessage?.title == 'localizacao' ? errorMessage.message : null}
      options={estados}
      onChange={(e) => updateServiceDateUnitValue({
        field: 'localizacao',
        value: e
      })}
    />
    <TextArea
      label={'Descrição da vaga'}
      name={'de'}
      placeholder={'Descreva detalhadamente o projeto, seus objetivos e expectativas...'}
      error={errorMessage?.title == 'descricao' ? errorMessage.message : null}
      inputStyle="form"
      onChange={(e) => updateServiceDateUnitValue({
        field: 'descricao',
        value: e
      })}
    />
    <SelectMultiGrouped 
        label={'Requisitos'}
        options={habilidades}
        value={serviceData.requisitos}
        error={errorMessage?.title == 'requisitos' ? errorMessage.message : null}
        onChange={(e) => updateServiceDateUnitValue({
          field:  'requisitos',
          value: e
        })}
    />
    <div className='flex items-start gap-1 py-2'>
      <input 
       className='h-7' 
       type="checkbox" 
       name="" 
       id="input_checkbox" 
       value={serviceData.termos}
       onChange={(e) => {
        updateServiceDateUnitValue({
          field:'termos',
          value: !serviceData.termos
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
    <div className="flex items-center gap-2  py-2">
      <button className="hover:bg-opacity-80 w-full text-center rounded-lg bg-laranjaProdunfo text-white py-2 flex-1">
          Fazer publicação
      </button>
      <button onClick={() => router.back()} className="hover:bg-opacity-80 px-2 py-2 rounded-lg bg-[#FF00004D] text-red-800">
          Cancelar
      </button>
    </div>
  </form>
 )
}