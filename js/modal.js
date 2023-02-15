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

    music: document.querySelector(".music"),
    alarm: document.querySelector(".alarm"),

    toggle(element1, element2){
        element1.classList.toggle("hide")
        element2.classList.toggle("hide")
    },

    startTimer(duration) {
        var interval = duration, getMinutes, getSeconds;
        
        Modal.intervalHandle = setInterval(function () {
            
            getMinutes = parseInt(interval / 60, 10);
            getSeconds = parseInt(interval % 60, 10);
    
            getMinutes = Modal.checkValueTimer(getMinutes)
            getSeconds = Modal.checkValueTimer(getSeconds)
    
            Modal.minutes.textContent = getMinutes;
            Modal.seconds.textContent = getSeconds;
    
            if (--interval < 0) {
                clearInterval(Modal.intervalHandle)
                Modal.music.pause()

                var timeOut = 15
                var alarmHadle = setInterval(() => {
                    
                    Modal.alarm.load()
                    var alarmInterrupt = setTimeout(function(){
                        Modal.alarm.play()

                    },0)

                    if(--timeOut < 0){
                        clearInterval(alarmHadle)
                        clearTimeout(alarmInterrupt)
                        Modal.toggle(Modal.setTime, Modal.stopCircle)
                        Modal.toggle(Modal.buttonPause, Modal.buttonPlay)
                        Modal.alarm.pause()
                    }
                }, 250);             
            }
        }, 1000);
    },

    checkValueTimer(time){
        return time < 10 ? "0" + time : time;
    }
}

