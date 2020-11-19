
const Reserves = {
    skillPoints: 0,
    getReserve(reserveName){
        console.log("getReserve (",reserveName,") value:", this[reserveName])
        return this[reserveName]
    },
    setReserve(reserveName, newTotal){
        console.log("setReserve (",reserveName,") to ",newTotal)
        this[reserveName] = newTotal
    },
}

export default Reserves;