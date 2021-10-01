window.onload = executeClockModule;
const navList = document.querySelector('.navlist');
const navClock = document.querySelector('.nav-clock');
const navStopwatch = document.querySelector('.nav-stopwatch');
const navTimer = document.querySelector('.nav-timer');

if(window.screen.width < 1024){
    navList.classList.add("hidden");
}

const burger = document.querySelector('.burger');
burger.addEventListener('click', ()=> {
    navList.classList.toggle("hidden");
})




//adding listeners for nav items
navList.addEventListener('click', e=>{
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
    if(window.screen.width < 1024){
        navList.classList.toggle("hidden");
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
        hoursElement.innerHTML = hours<10?`0${hours}`:hours;
        minutesElement.innerHTML = minutes<10?`0${minutes}`:minutes;
        secondsElement.innerHTML = seconds<10?`0${seconds}`:seconds;
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
    const swMilseconds = document.querySelector('.sw_values-milseconds');

    //control buttons
    const startBtn = document.querySelector('.sw-start');
    const pauseBtn = document.querySelector('.sw-pause');
    const stopBtn = document.querySelector('.sw-stop');

    let stopwatchStarted = false; // flag for start button

    let stopwatchTime = {
        h: 0,
        m: 0,
        s: 0,
        ms: 0
    }

    let intID;
    startBtn.addEventListener('click', ()=>{
        if(!stopwatchStarted){
            stopwatchStarted = true;
            intID = setInterval(startStopwatch,100);
        }
    });

    const startStopwatch = () => {
            // stopwatchTime.s+=1;
            // if(stopwatchTime.s%60==0){
            //     stopwatchTime.m+=1;
            //     stopwatchTime.s=0;
            //     if(stopwatchTime.m%60==0){
            //         stopwatchTime.h+=1;
            //         stopwatchTime.m=0;
            //     }
            // }
            stopwatchTime.ms+=100;
            if(stopwatchTime.ms%1000==0){
                stopwatchTime.s+=1;
                stopwatchTime.ms=0;
                if(stopwatchTime.s%60==0){
                    stopwatchTime.m+=1;
                    stopwatchTime.s=0;
                    if(stopwatchTime.m%60==0){
                        stopwatchTime.h+=1;
                        stopwatchTime.m=0;
                    }
                }
            }

            //setting the time on DOM
            swHours.innerHTML = stopwatchTime.h<10?`0${stopwatchTime.h}`:stopwatchTime.h;
            swMinutes.innerHTML = stopwatchTime.m<10?`0${stopwatchTime.m}`:stopwatchTime.m;
            swSeconds.innerHTML = stopwatchTime.s<10?`0${stopwatchTime.s}`:stopwatchTime.s;
            swMilseconds.innerHTML = `0${stopwatchTime.ms/100}`;
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
        swHours.innerHTML = '00';
        swMinutes.innerHTML = '00';
        swSeconds.innerHTML = '00';
        swMilseconds.innerHTML = '00';
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
    tSeconds.focus();
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
            tHours.value = timerTime.h<10?`0${timerTime.h}`:timerTime.h;
            tMinutes.value = timerTime.m<10?`0${timerTime.m}`:timerTime.m;
            tSeconds.value = timerTime.s<10?`0${timerTime.s}`:timerTime.s;

    }

    let timerStarted = false;
    let timerID;

    timerStartBtn.addEventListener('click', ()=>{
        timerTime.h = tHours.value==''?0:tHours.value;
        timerTime.m = tMinutes.value==''?0:tMinutes.value;
        timerTime.s = tSeconds.value==''?0:tSeconds.value;

        if(!timerStarted){
            timerStarted = true;
            timerID = setInterval(startTimer,1000);
        }
    });

    timerStopBtn.addEventListener('click', ()=>{
        resetTimer();
    })
}