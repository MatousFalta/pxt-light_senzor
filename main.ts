let raceEnded: boolean = false
radio.setGroup(94)
let start:number = 0
let end:number = 1
const goalCompleted = (receivedNumber: number) => {
    if (receivedNumber === 1) {
        start = control.millis()
    }
}
radio.onReceivedNumber(goalCompleted)
Sensors.OnLightDrop(function() {
    
})

let finalTime = end - start
console.log(finalTime)
basic.pause(500)
radio.sendNumber(finalTime)
