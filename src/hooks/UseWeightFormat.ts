function UseWeightFormat(weight: string){
    const splitDot = weight.split(' Kg')
    const joinString = splitDot.join('')
    const weightNumber = parseInt(joinString)

    return weightNumber
}

export default UseWeightFormat