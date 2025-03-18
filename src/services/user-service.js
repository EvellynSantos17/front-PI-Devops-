export async function userRegister() {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (typeof window !== "undefined") {
                window.alert('Usuário registrado com sucesso, faça o login para finalizar o cadastro!');
              }
            resolve();
        }, 2000);
    });
}
