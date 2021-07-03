window.onload = executeClockModule;

const burger = document.querySelector('.burger');
const navList = document.querySelector('.navlist');
burger.addEventListener('click', ()=> {
    navList.classList.toggle("hidden");
})
//adding listeners for nav items
navList.addEventListener('click', e=>{
    navList.classList.toggle("hidden");
    const targetClass = e.target.className.split(' ')[0];
    switch(targetClass){
        case "nav-clock":
            executeClockModule();
            break;
        case "nav-stopwatch":
            executeStopwatchModule();
            break;
        case "nav-timer":
            executeTimerModule();
            break;        
    }
})

function executeClockModule(){
    document.querySelector('.current-time').classList.remove('hidden');
    document.querySelector('.stopwatch').classList.add('hidden');
    document.querySelector('.timer').classList.add('hidden');
    //Getting the elements from DOM
    const hoursElement = document.querySelector('.values_hours');
    const minutesElement = document.querySelector('.values_minutes');
    const secondsElement = document.querySelector('.values_seconds');

    const getCurrentTime = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return {hours, minutes, seconds};
    }

    const setCurrentTime = () => {
        const {hours, minutes, seconds} = getCurrentTime();
        hoursElement.innerHTML = hours;
        minutesElement.innerHTML = minutes;
        secondsElement.innerHTML = seconds;
    }

    setInterval(setCurrentTime, 1000);
}

//Stopwatch
function executeStopwatchModule(){
    document.querySelector('.current-time').classList.add('hidden');
    document.querySelector('.stopwatch').classList.remove('hidden');
    document.querySelector('.timer').classList.add('hidden');
    //sw ~ stopwatch
    const swHours = document.querySelector('.sw_values-hours');
    const swMinutes = document.querySelector('.sw_values-minutes');
    const swSeconds = document.querySelector('.sw_values-seconds');

    //control buttons
    const startBtn = document.querySelector('.sw-start');
    const pauseBtn = document.querySelector('.sw-pause');
    const stopBtn = document.querySelector('.sw-stop');

    let stopwatchStarted = false; // flag for start button

    let stopwatchTime = {
        h: 0,
        m: 0,
        s: 0
    }

    let intID;
    startBtn.addEventListener('click', ()=>{
        if(!stopwatchStarted){
            stopwatchStarted = true;
            intID = setInterval(startStopwatch,1000);
        }
    });

    const startStopwatch = () => {
            stopwatchTime.s+=1;
            if(stopwatchTime.s%60==0){
                stopwatchTime.m+=1;
                stopwatchTime.s=0;
                if(stopwatchTime.m%60==0){
                    stopwatchTime.h+=1;
                    stopwatchTime.m=0;
                }
            }

            //setting the time on DOM
            swHours.innerHTML = stopwatchTime.h;
            swMinutes.innerHTML = stopwatchTime.m;
            swSeconds.innerHTML = stopwatchTime.s;
    }

    pauseBtn.addEventListener('click', ()=>{
        clearInterval(intID);
        stopwatchStarted = false;
    })

    stopBtn.addEventListener('click', ()=>{
        clearInterval(intID);
        stopwatchStarted = false;
        stopwatchTime.h=0;
        stopwatchTime.m=0;
        stopwatchTime.s=0;
        swHours.innerHTML = stopwatchTime.h;
        swMinutes.innerHTML = stopwatchTime.m;
        swSeconds.innerHTML = stopwatchTime.s;
    })
}

//timer
function executeTimerModule(){
    document.querySelector('.current-time').classList.add('hidden');
    document.querySelector('.stopwatch').classList.add('hidden');
    document.querySelector('.timer').classList.remove('hidden');

    const tHours = document.querySelector('.input-hours');
    const tMinutes = document.querySelector('.input-minutes');
    const tSeconds = document.querySelector('.input-seconds');

    //buttons
    const timerStartBtn = document.querySelector('.t-start');
    const timerStopBtn = document.querySelector('.t-stop');

    let timerTime = {
        h: 0,
        m: 0,
        s: 0
    }

    const resetTimer = () => {
        clearInterval(timerID);
        timerStarted = false;
        timerTime.h=0;
        timerTime.m=0;
        timerTime.s=0;
        tHours.value = '';
        tMinutes.value = '';
        tSeconds.value = '';

        tHours.placeholder = '00';
        tMinutes.placeholder = '00';
        tSeconds.placeholder = '00';
    }

    const startTimer = () => {
        if(timerTime.h == 0 && timerTime.m == 0 && timerTime.s <= 0){
            resetTimer()
            return
        }
        timerTime.s-=1;
        if(timerTime.s==0 && timerTime.m > 0){
            timerTime.m-=1;
            timerTime.s=59;
            if(timerTime.m==0 && timerTime.h > 0){
                timerTime.h-=1;
                timerTime.m=59;
            }
        }
            //setting the time on DOM
            tHours.value = timerTime.h;
            tMinutes.value = timerTime.m;
            tSeconds.value = timerTime.s;

    }

    let timerStarted = false;
    let timerID;

    timerStartBtn.addEventListener('click', ()=>{
        timerTime.h = tHours.value;
        timerTime.m = tMinutes.value;
        timerTime.s = tSeconds.value;

        if(!timerStarted){
            timerStarted = true;
            timerID = setInterval(startTimer,1000);
        }
    });

    timerStopBtn.addEventListener('click', ()=>{
        resetTimer();
    })
}