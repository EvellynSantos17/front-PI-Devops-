import { useState } from "react"

export function useFristRegisterFormHooks(){
    const [formRegister, setFormRegister] = useState({
        email: '',
        password: '',
        confirmPassword: ''

    })

    function updateFormRegister({field, value}){
        setFormRegister(prevState => ({
            ...prevState,
            [field]: value
        }));

    }

    return {formRegister, updateFormRegister }
}