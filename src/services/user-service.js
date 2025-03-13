export async function userRegister() {
    return new Promise((resolve) => {
        setTimeout(() => {
            window.alert('Usuário registrado com sucesso, faça o login para finalizar o cadastro!');
            resolve();
        }, 2000);
    });
}
