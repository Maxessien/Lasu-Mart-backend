export const cosineSimilarityScore = (vectorA, vectorB)=>{
    const dotProduct = vectorA.reduce((prevVal, currVal, index)=>{
        return (currVal * vectorB[index]) + prevVal
    }, 0)

    const vectorRepA = Math.sqrt(vectorA.reduce((prevVal, currVal)=>{
        return (currVal**2) + prevVal
    }, 0))

    const vectorRepB = Math.sqrt(vectorB.reduce((prevVal, currVal)=>{
        return (currVal**2) + prevVal
    }, 0))

    const score = dotProduct/(vectorRepA*vectorRepB)
    return score
}