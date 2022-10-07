export const validatePassword = (password: string): string | undefined => {
    if(password.length < 5) {
        return `Senha muito curta!`
    }
};

export const validateUsername = (username: string): string | undefined => {
    if(username.length < 3) {
        return `Nome de usuário muito curto!`
    }
};

export const validateCpf = (cpf: string): string | undefined => {
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999" 
    ) {
        return `CPF inválido!`
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++) 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(9, 10)) ) return `CPF inválido!`
    soma = 0
    for (var j = 1; j <= 10; j++) 
        soma = soma + parseInt(cpf.substring(j-1, i)) * (12 - j)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(10, 11) ) ) return `CPF inválido!`
}