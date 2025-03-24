import BaseService from "@/services/base-service";
import UserProfileService from "@/services/user-profile-service";
import { useEffect, useState } from "react";

export function usePerfilHook(id) {   
     
    const [loadingPerfil, setLoadingPerfil] = useState(true)

    const [perfilData, setPerfilData] = useState({
        id: null,
        name: '',
        document: '',
        phone: '',
        address: '',
        description: '',
        skills: '',
        terms: false,
        title: '',
    });

    function updateHookDataUnitValue({ field, value }) {
        setPerfilData(prevState => ({
            ...prevState,
            [field]: value
        }));
    }

    async function fetchData() {
        try {
            const response = await UserProfileService.findById(id);
            const data = await response.json();
            
            setPerfilData({
                address: data.address,
                description: data.description,
                document: data.document,
                id: data.id,
                name: data.name,
                phone: data.phone,
                skills: data.skills,
                terms: false,
                titulo: 'Tem ainda não!'
            });
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    }

    useEffect(() => {
        if (!id) return;
        fetchData();
        setLoadingPerfil(false)
    }, [id]); 

    return { perfilData, loadingPerfil, updateHookDataUnitValue };
    
}
