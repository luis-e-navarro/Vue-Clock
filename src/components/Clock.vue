<script type="module">
import { useCurrentTime } from "./useCurrentTime";
import {ref, onMounted} from 'vue'

export default {
  name: "clockExample",
  setup() {
    let newStyle = null
    const keyFrames = '\
@keyframes rotate {\
    from {\
       transform: rotate(STARTING_VALUE);\
    }\
    to {\
       transform: rotate(ENDING_VALUE);\
    }\
}';
    const input = ref(null)
    const rotatingMinutes = ref('')
    const minutes = ref(['infinitywasteland_','']);
    const hourInput = ref(null)
    const hour = ref('')
    const flipTable = {
        a : '\u0250',
        b : 'q',
        c : '\u0254', 
        d : 'p',
        e : '\u01DD',
        f : '\u025F', 
        g : '\u0183',
        h : '\u0265',
        i : '\u0131', 
        j : '\u027E',
        k : '\u029E',
        l : '\u0283',
        m : '\u026F',
        n : 'u',
        r : '\u0279',
        t : '\u0287',
        v : '\u028C',
        w : '\u028D',
        y : '\u028E',
        '.' : '\u02D9',
        '[' : ']',
        '(' : ')',
        '{' : '}',
        '?' : '\u00BF',
        '!' : '\u00A1',
        "\'" : ',',
        '<' : '>',
        '_' : '\u203E',
        ';' : '\u061B',
        '\u203F' : '\u2040',
        '\u2045' : '\u2046',
        '\u2234' : '\u2235',
        '\r' : '\n' 
        }
    onMounted(()=>{
        const { currentTime, hourLabel, minutesText } = useCurrentTime();
        // animation code -------------------------------------------------------------------------------------------------------------
        const elts = {
            text1: document.getElementById("text1"),
            text2: document.getElementById("text2")
        };
        rotatingMinutes.value = elts
        let texts = [
            minutes.value[0],
            minutes.value[1]
        ];

        const morphTime = 1;
        const cooldownTime = 0.25;

        let textIndex = texts.length - 1;
        let time = new Date();
        let morph = 0;
        let cooldown = cooldownTime;

        elts.text1.textContent = texts[textIndex % texts.length];
        elts.text2.textContent = texts[(textIndex + 1) % texts.length];

        function doMorph() {
            morph -= cooldown;
            cooldown = 0;

            let fraction = morph / morphTime;

            if (fraction > 1) {
                cooldown = cooldownTime;
                fraction = 1;
            }

            setMorph(fraction);
        }

        function setMorph(fraction) {
            elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

            fraction = 1 - fraction;
            elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

            elts.text1.textContent = texts[textIndex % texts.length];
            elts.text2.textContent = texts[(textIndex + 1) % texts.length];
        }

        function doCooldown() {
            morph = 0;

            elts.text2.style.filter = "";
            elts.text2.style.opacity = "100%";

            elts.text1.style.filter = "";
            elts.text1.style.opacity = "0%";
        }

        function animate() {
            requestAnimationFrame(animate);

            let newTime = new Date();
            let shouldIncrementIndex = cooldown > 0;
            let dt = (newTime - time) / 1000;
            time = newTime;

            cooldown -= dt;

            if (cooldown <= 0) {
                if (shouldIncrementIndex) {
                    textIndex++;
                }

                doMorph();
            } else {
                doCooldown();
            }
        }

        animate();

   


//---------------------------------------------------------------------------------------------------
        const mapObj = {
            STARTING_VALUE: `${currentTime.value.seconds.startDeg}deg`,
            ENDING_VALUE: `${currentTime.value.seconds.endDeg}deg`
        }
        if(!newStyle){
            newStyle = document.createElement('style');
            document.head.appendChild(newStyle);
            newStyle.sheet.insertRule(keyFrames.replace(/STARTING_VALUE|ENDING_VALUE/g, function(matched){
                return mapObj[matched]
            }))
        }
        setInterval(()=> {
            texts = [
            minutes.value[0],
            minutes.value[1]
        ];
            const currentDate = new Date()
            hourInput.value.style.transform = `rotate(${currentTime.value.hourPosition}deg)`
            minutes.value[0] = currentDate.getMinutes().toString();
            minutes.value[1] = minutesText(currentDate.getMinutes())
            hour.value = '✣'
            hour.value = hourLabel[currentDate.getHours()];
        },500)
    })
    return {input,minutes, hour, hourInput, rotatingMinutes}
  }
};
</script>

<template>
<div class="backgroundTank">
    <div id="circle">
        <div  class="clock">
            <svg class="snurra" viewBox="0 0 200 200">
                <defs>
                    <linearGradient id="linjärGradient">
                    <stop class="stopp1" offset="0" />
                    <stop class="stopp2" offset="1" />
                    </linearGradient>
                    <linearGradient
                    y2="160"
                    x2="160"
                    y1="40"
                    x1="40"
                    gradientUnits="userSpaceOnUse"
                    id="gradient"
                    xlink:href="#linjärGradient"
                    />
                </defs>
                <path
                    class="halvan"
                    d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64"
                />
                <circle class="strecken" cx="100" cy="100" r="64" />
            </svg>
            <svg ref="input" id="secondsMinutes" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="300px" height="300px" viewBox="0 0 300 300" enable-background="new 0 0 300 300" xml:space="preserve">
            <defs>
                <path  id="circlePath" d=" M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "/>
            </defs>
            <circle cx="150" cy="100" r="75" fill="none"/>
            <g id="container">
                <use xlink:href="#circlePath" fill="none"/>
                <text >
                    <textPath id="text1" xlink:href="#circlePath"></textPath>
                    <textPath id="text2" xlink:href="#circlePath"></textPath>
                </text>
            </g>
            </svg>
            <svg ref="hourInput" id="hoursDisplayed" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="300px" height="300px" viewBox="0 0 300 300" enable-background="new 0 0 300 300" xml:space="preserve">
                <defs>
                    <path  id="circlePath" d=" M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "/>
                </defs>
                <circle cx="150" cy="100" r="75" fill="none"/>
                <g id="gElement">
                    <use xlink:href="#circlePath" fill="none"/>
                    <text   id="textCircle">
        
                        <textPath id="textPathId" xlink:href="#circlePath">○</textPath>
                
                    </text>
                </g>
            </svg>



            <svg id="filters">
                <defs>
                    <filter id="threshold">
                        <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0
                                                0 1 0 0 0
                                                0 0 1 0 0
                                                0 0 0 255 -140" />
                    </filter>
                </defs>
            </svg>


        </div>

    </div>
</div>
</template>

<!-- <style>
#secondsMinutes{
    animation-name: rotate;
    
}



</style> -->

