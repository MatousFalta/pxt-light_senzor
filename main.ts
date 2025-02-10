let raceEnded: boolean = false

Sensors.SetLightLevel()
radio.setGroup(94)

let start:number = 0
let startOutside:number = 0
let end:number = 0
let endOutside:number = 0
let isStarted:boolean = false
let finalTime:number;

const goalCompleted = (receivedNumber: number) => {
    if (receivedNumber === 1 && !isStarted) {
        start = control.millis()
        isStarted = true
        basic.showString("s",0)
        music.playTone(Note.C, 500);
        basic.clearScreen()
    }
    if (receivedNumber === 2 && !raceEnded) {
        basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
        reset()
    }

}

function reset() {
    isStarted = false
    raceEnded = false
    basic.clearScreen()
    Sensors.SetLightLevel()
}

radio.onReceivedNumber(goalCompleted)
input.onButtonPressed(Button.B, reset)

Sensors.OnLightDrop(function() {
    if(isStarted && !raceEnded){
        raceEnded = true
        end = control.millis()
        finalTime = end - start
        finalTime = finalTime/10
        Math.round(finalTime)
        finalTime = finalTime/100
        console.log(finalTime)
        radio.sendNumber(finalTime)
        basic.showNumber(finalTime)
        music.playTone(Note.C, 500)
    }
})

input.onButtonPressed(Button.A, function() {
    console.log(finalTime)
    basic.showNumber(finalTime)
})

input.onButtonPressed(Button.AB, function() {
    Sensors.SetLightLevel()
})