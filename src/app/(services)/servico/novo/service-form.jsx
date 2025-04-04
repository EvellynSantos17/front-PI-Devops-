"use client"
import { InputField } from "@/components/ui/input-field";
import SelectMultiGrouped from "@/components/ui/select-multi";
import { SelectOne } from "@/components/ui/select-one";
import tipos_contratos from "@/data/tipos-contratos.json"
import estados from "@/data/estados.json"
import habilidades from "@/data/habilidades.json"
import { TextArea } from "@/components/ui/text-area";
import { useRouter } from "next/navigation";
import { useErrorsHooks } from "@/hooks/error-message-hook";
import { UseService } from "@/hooks/use-services";

export default function ServiceForm(){
  const router = useRouter();
  const {service, updateOneValueServico} = UseService();
  const {disableErrorMessage, errorMessage, updateErrorMessage} = useErrorsHooks();

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
  
  async function handleSubmit(event){
    event.preventDefault();
    

    if(checkMinAndMaxTitleLength({value: service.titulo})) return 
    if(validationDate(service.dt_limite)) return
    if(checkMinAndMaxTextAreaLength({value:service.descricao })) return
    if(checkMinAndMaxSelectSkils({value: service.requisitos})) return
    
    if(checkBoxTrue({ value: service.termos})) return

    disableErrorMessage()

    console.log(service)
  }

return (
  <form onSubmit={(e) => handleSubmit(e)} className="w-full">
    <InputField
      name={"titulo"}
      required={true}
      placeholder={"Desenvolvimento de um Website E-commerce"}
      label={"Título da vaga"}
      error={errorMessage?.title == 'titulo' ? errorMessage.message : null}
      inputStyle="form"
      onChange={(e) => updateOneValueServico({
        field: 'titulo',
        value:e
      })}
    />
    <div className="flex items-center gap-4">
        <InputField
          name={"valor"}
          required={true}
          type="number"
          placeholder={"R$ 500,00"}
          label={"Valor do serviço"}
          error={errorMessage?.title == 'valor' ? errorMessage.message : null}
          inputStyle="form"
          value={service.valor}
          onChange={(e) => updateOneValueServico({
            field: 'valor',
            value: e
          })}
        />
    </div>
    <SelectOne
      label={'Localização'}
      error={errorMessage?.title == 'localizacao' ? errorMessage.message : null}
      options={estados}
      onChange={(e) => updateOneValueServico({
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
      onChange={(e) => updateOneValueServico({
        field: 'descricao',
        value: e
      })}
    />
    <SelectMultiGrouped 
        label={'Requisitos'}
        options={habilidades}
        value={service.requisitos}
        error={errorMessage?.title == 'requisitos' ? errorMessage.message : null}
        onChange={(e) => updateOneValueServico({
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
       value={service.termos}
       onChange={(e) => {
        updateOneValueServico({
          field:'termos',
          value: !service.termos
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