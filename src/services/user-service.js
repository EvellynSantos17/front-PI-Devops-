import service from "./service";

export async function userRegister({ email, password }) {
    const response = service({
        endPoint: "/auth/register",
        method: "POST",
        body: { email, password },
    });


    return console.log(response)
}
