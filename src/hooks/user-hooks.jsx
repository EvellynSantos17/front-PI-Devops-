import { useState } from "react"

export function UserHooks(){
    const [userData, setUserData] = useState({
        name: '',
        cpf: '',
        phone: '',
        location: '',
        about: '',
        skills: '',
        terms: false
    })

    function updateUserDataUnitValue({field, value}){
        setUserData(prevState => ({
            ...prevState,
            [field]: value
        }));

    }

    return {userData, updateUserDataUnitValue }
}