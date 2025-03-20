"use client"
import { userRegister } from "@/services/user-service";

export default function page() {
    return(
        <div>
            <button onClick={userRegister}>
                cadastrar
            </button>
        </div>
    )
}