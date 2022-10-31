function UseCpfFormat(cpf: string){
    const splitDot = cpf.split('.')
    const joinString = splitDot.join('')
    const splitHifen = joinString.split('-')
    const joinToString = splitHifen.join('')
    const cpfNumber = parseInt(joinToString)

    return cpfNumber
}

export default UseCpfFormat
