import service from "./service"

export async function userRegister({email,password}) {
    return service({
        endPoint: '/auth/register',
        method: 'POST',
        body: {
            "email": email,
            "password": password
        },
    })

}
