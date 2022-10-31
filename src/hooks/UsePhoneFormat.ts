function UsePhoneFormat(phone: string){
    const splitDot = phone.split('-')
    const joinString = splitDot.join('')
    const phoneNumber = parseInt(joinString)

    return phoneNumber
}

export default UsePhoneFormat