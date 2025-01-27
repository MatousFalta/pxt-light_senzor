let raceEnded: boolean = false
Sensors.SetLightLevel()
radio.setGroup(94)
let start:number = 0
let startOutside:number = 0
let end:number = 0
let endOutside:number = 0
let isStarted:boolean = false
const goalCompleted = (receivedNumber: number) => {
    if (receivedNumber === 1 && !isStarted) {
        start = control.millis()
        startOutside = start
        isStarted = true
        basic.showString("s",0)
        music.playTone(Note.C, 500);
        basic.clearScreen()
    }
}
radio.onReceivedNumber(goalCompleted)
input.onButtonPressed(Button.B, function(){
    isStarted = false
    Sensors.SetLightLevel()
    raceEnded = false
})
Sensors.OnLightDrop(function() {
    if(isStarted && !raceEnded){
        end = control.millis()
        endOutside = end
        let finalTime:number = end - start
        finalTime = finalTime/10
        Math.round(finalTime)
        finalTime = finalTime/100
        console.log(finalTime)
        radio.sendNumber(finalTime)
        basic.showNumber(finalTime)
        music.play(music.tonePlayable(Note.F, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        raceEnded = true
    }
})
let finaltime:number = endOutside - startOutside
input.onButtonPressed(Button.A, function() {
    console.log(finaltime)
    basic.showNumber(finaltime)
})
basic.pause(500)