import Sound from "./sounds.js"
const sound = Sound()
export const Modal = {

    intervalHandle: "",

    setPause: false,
    
    header : document.querySelector("header"),

    focus: document.querySelector("#focus"),

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

    listFocus: [],

    toggle(element1, element2){
        element1.classList.toggle("hide")
        element2.classList.toggle("hide")
    },

    startTimer(duration) {
        var interval = duration, getMinutes, getSeconds;

        sound.bgAudio.play()

        sound.bgAudio.loop = true
        
        Modal.intervalHandle = setInterval(function () {
            
            getMinutes = parseInt(interval / 60, 10);
            getSeconds = parseInt(interval % 60, 10);
    
            getMinutes = Modal.checkValueTimer(getMinutes)
            getSeconds = Modal.checkValueTimer(getSeconds)
    
            Modal.minutes.textContent = getMinutes;
            Modal.seconds.textContent = getSeconds;
    
            if (--interval < 0) {
                Modal.finishTime()

                Modal.durationTime(duration)

                Modal.setPause = false
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

    finishTime(){
        Modal.clearIntervalHandle()
               
        Modal.toggle(Modal.setTime, Modal.stopCircle)
        Modal.toggle(Modal.buttonPause, Modal.buttonPlay)
        Modal.toggle(Modal.volumeMedium, Modal.volumeMute)

        sound.timeEnd()
        Modal.pauseBgSound()
        
        Modal.header.classList.add('hide')
        
    },

    durationTime(duration){

        if(Modal.setPause == false){

            Modal.listFocus.push(duration)

            localStorage.setItem("focusTimer", JSON.stringify(Modal.listFocus))

            Modal.focus.innerHTML = Modal.calcTimingFocus()
            
            Modal.header.classList.remove('hide')
        }

    },

    clearIntervalHandle(){
        clearInterval(Modal.intervalHandle)
    },

    calcTimingFocus(){
        var focusTimer = JSON.parse(window.localStorage.getItem('focusTimer'))

        var sum = 0
        for (const time of focusTimer) {
            sum += Number(time)
        }

        var hour = 0
        var min = parseInt(sum / 60, 10)

        if (min >=60){
            var h = parseInt(min / 60, 10)
            hour = Modal.checkValueTimer(h)
            min = min % 60
        }

        min = Modal.checkValueTimer(min)

        var editHour = hour > 1 ? 'horas' : 'hora'
        var editMin = min > 1 ? 'minutos' : 'minuto'
        
        return `${hour} ${editHour} e ${min} ${editMin} de foco. Parabéns!!`

        
    }
}
