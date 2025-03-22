import { useState } from "react"

export function UseServiceHook(){

    const [serviceData, setServiceDate ] = useState({
        titulo: '',
        tipo: '',
        valor: '',
        dt_limite: '',
        localizacao: '',
        requisitos: '',
        descricao: '',
        termos: false
    })

    function updateServiceDateUnitValue({field, value}){
        setServiceDate(prevState => ({
            ...prevState,
            [field]: value
        }));

    }

    return {updateServiceDateUnitValue, serviceData}
}