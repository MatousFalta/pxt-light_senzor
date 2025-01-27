let raceEnded: boolean = false
Sensors.SetLightLevel()
radio.setGroup(94)
let start:number = 0
let end:number = 0
let isStarted:boolean = false
const goalCompleted = (receivedNumber: number) => {
    if (receivedNumber === 1 && !isStarted) {
        start = control.millis()
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
})
Sensors.OnLightDrop(function() {
    if(isStarted){
        end = control.millis()
        let finalTime:number = end - start
        finalTime = finalTime/10
        Math.round(finalTime)
        finalTime = finalTime/100
        console.log(finalTime)
        radio.sendNumber(finalTime)
        basic.showNumber(finalTime)
        music.play(music.tonePlayable(Note.F, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }
})
let finalTime:number = end - start
input.onButtonPressed(Button.A, function() {
    console.log(finalTime)
    basic.showNumber(finalTime)
})
basic.pause(500)