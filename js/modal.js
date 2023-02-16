import Sound from "./sounds.js"
const sound = Sound()
export const Modal = {

    intervalHandle: "",

    icons: document.querySelector(".icon-buttons"),

    timer: document.querySelector("#timer"),

    buttonPlay: document.querySelector(".play"),
    buttonPause: document.querySelector(".pause"),

    setTime: document.querySelector(".set"),
    stopCircle: document.querySelector(".stop"),

    volumeMedium: document.querySelector(".medium"),
    volumeMute: document.querySelector(".mute"),

    minutes: document.querySelector("#minutes"),
    seconds: document.querySelector("#seconds"),

    toggle(element1, element2){
        element1.classList.toggle("hide")
        element2.classList.toggle("hide")
    },

    startTimer(duration) {
        var interval = duration, getMinutes, getSeconds;
        sound.bgAudio.play()
        
        Modal.intervalHandle = setInterval(function () {
            
            getMinutes = parseInt(interval / 60, 10);
            getSeconds = parseInt(interval % 60, 10);
    
            getMinutes = Modal.checkValueTimer(getMinutes)
            getSeconds = Modal.checkValueTimer(getSeconds)
    
            Modal.minutes.textContent = getMinutes;
            Modal.seconds.textContent = getSeconds;
    
            if (--interval < 0) {
                Modal.intervalHandle = clearInterval(Modal.intervalHandle)
               
                Modal.toggle(Modal.setTime, Modal.stopCircle)
                Modal.toggle(Modal.buttonPause, Modal.buttonPlay)

                sound.timeEnd()
                Modal.pauseBgSound()
          
            }
        }, 1000);
    },

    checkValueTimer(time){
        return time < 10 ? "0" + time : time;
    },

    pauseBgSound(){
        sound.bgAudio.pause()
    },

    volumeOn(){
        sound.bgAudio.volume = 1
    },

    volumeOff(){
        sound.bgAudio.volume = 0
    },
}


