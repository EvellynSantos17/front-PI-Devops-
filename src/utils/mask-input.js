export function maskInput() {

    function formatCPF(cpf) {
        cpf = cpf.replace(/\D/g, "");

        if (cpf.length <= 3) {
            return cpf;
        } else if (cpf.length <= 6) {
            return cpf.replace(/(\d{3})(\d{1,})/, "$1.$2");
        } else if (cpf.length <= 9) {
            return cpf.replace(/(\d{3})(\d{3})(\d{1,})/, "$1.$2.$3");
        } else {
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,})/, "$1.$2.$3-$4");
        }
    }

    function formatPhone(phone) {
        phone = phone.replace(/\D/g, "");

        if (phone.length <= 2) {
            return phone;
        } else if (phone.length <= 6) {
            return phone.replace(/(\d{2})(\d{1,})/, "($1) $2");
        } else {
            return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        }
    }

    function formatMoney(value) {
        value = value.replace(/\D/g, ""); 
        value = (value / 100).toFixed(2); 

        let [integer, decimal] = value.split("."); 

        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return `R$ ${integer},${decimal}`;
    }

    return {
        formatCPF,
        formatPhone,
        formatMoney
    };
}
