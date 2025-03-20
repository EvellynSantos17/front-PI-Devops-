import apiService from "./api-service"

export async function userRegister() {

    const data = {
        email: "new-useedwr2324rf@mail.com",
        password: "123456789"
    }
    
    const service = await apiService({
        endPoit: '/auth/register',
        method: 'POST',
        body: data
    })

    return console.log(service)
}
