import { Modal } from "./modal.js";

const minutes = Modal.minutes
const seconds = Modal.seconds

let timer = 0;
// var playPromise = Modal.music.play();

Modal.buttonPlay.addEventListener("click", ()=>{

    let min = Number(minutes.innerText)
    let sec = Number(seconds.innerText)
    timer = min * 60 + sec

    if(min != 0 || sec != 0){

        Modal.startTimer(timer)
    
        Modal.toggle(Modal.buttonPlay, Modal.buttonPause)

        if(Modal.stopCircle.classList.contains('hide'))
            Modal.toggle(Modal.setTime, Modal.stopCircle)
        
        Modal.music.load();
        setTimeout(function(){
            Modal.music.play();
        },0)

    }

})
Modal.buttonPause.addEventListener("click", ()=>{

    clearInterval(Modal.intervalHandle);

    Modal.music.pause()
        
    Modal.toggle(Modal.buttonPlay, Modal.buttonPause)

})
Modal.setTime.addEventListener("click", ()=>{

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

    Modal.music.pause()
    Modal.toggle(Modal.setTime, Modal.stopCircle)

    if(Modal.buttonPlay.classList.contains('hide'))
        Modal.toggle(Modal.buttonPlay, Modal.buttonPause)
    
})
Modal.volumeMedium.addEventListener("click", ()=>{
    
    Modal.music.volume = 0
    Modal.toggle(Modal.volumeMedium, Modal.volumeMute)
})
Modal.volumeMute.addEventListener("click", ()=>{

    Modal.music.volume = 1;
    Modal.toggle(Modal.volumeMedium, Modal.volumeMute)
})
