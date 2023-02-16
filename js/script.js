import {Modal} from "./modal.js";
import Sound from "./sounds.js";

const minutes = Modal.minutes
const seconds = Modal.seconds

const sound = Sound()

let timer = 0;

Modal.buttonPlay.addEventListener("click", ()=>{

    let min = Number(minutes.innerText)
    let sec = Number(seconds.innerText)
    timer = min * 60 + sec

    if(min != 0 || sec != 0){

        Modal.startTimer(timer)
    
        Modal.toggle(Modal.buttonPlay, Modal.buttonPause)

        if(Modal.stopCircle.classList.contains('hide'))
            Modal.toggle(Modal.setTime, Modal.stopCircle)

        if(Modal.volumeMedium.classList.contains('hide'))
        Modal.toggle(Modal.volumeMedium, Modal.volumeMute)
        
        sound.pressButton()

    }

})
Modal.buttonPause.addEventListener("click", ()=>{

    clearInterval(Modal.intervalHandle);

    sound.pressButton()
    Modal.pauseBgSound()

    if(Modal.volumeMute.classList.contains('hide'))
        Modal.toggle(Modal.volumeMedium, Modal.volumeMute)
        
    Modal.toggle(Modal.buttonPlay, Modal.buttonPause)

})
Modal.setTime.addEventListener("click", ()=>{

    sound.pressButton()

    const setMinutes = Number(prompt("Minutos: "))
    const setSeconds = Number(prompt("Segundos: "))

    if(setMinutes != 0 || setSeconds != 0){
        minutes.innerText = Modal.checkValueTimer(setMinutes)
        seconds.innerText = Modal.checkValueTimer(setSeconds)
    }

})

Modal.stopCircle.addEventListener("click", ()=>{

    clearInterval(Modal.intervalHandle);

    minutes.innerText = "00"
    seconds.innerText = "00"

    sound.pressButton()
    Modal.toggle(Modal.setTime, Modal.stopCircle)

    if(Modal.buttonPlay.classList.contains('hide'))
        Modal.toggle(Modal.buttonPlay, Modal.buttonPause)
        Modal.pauseBgSound()
    
})
Modal.volumeMedium.addEventListener("click", ()=>{
    
    Modal.volumeOff()
    Modal.toggle(Modal.volumeMedium, Modal.volumeMute)
})
Modal.volumeMute.addEventListener("click", ()=>{

    if(minutes.innerText != 0 || seconds.innerText != 0)
        Modal.volumeOn()
        Modal.toggle(Modal.volumeMedium, Modal.volumeMute)
})

