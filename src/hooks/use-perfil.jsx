import { useState } from "react";
import { DicPerfil } from "./dictionary/dic-perfil";

export function usePerfil() {   
     
    const [perfil, setPerfil] = useState(DicPerfil);

    function updateDataUnitValue({ field, value }) {
      setPerfil(prevState => ({
            ...prevState,
            [field]: value
        }));
    }

    function updatePerfil(newValue){
      setPerfil(newValue)
    }
 
    return { perfil, updateDataUnitValue, updatePerfil };
    
}
