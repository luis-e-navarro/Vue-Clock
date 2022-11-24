<script type="module">
import { useCurrentTime } from "./useCurrentTime";
import {ref, onMounted} from 'vue'

export default {
  name: "clockExample",
  setup() {
    const input = ref(null)
    const minutes = ref('infinitywasteland_');
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
        const { currentTime, hourLabel } = useCurrentTime();
        setInterval(()=> {
            const currentDate = new Date()
            input.value.style.transform = `rotate(${currentTime.value.seconds}deg) `;
            minutes.value = currentDate.getMinutes().toString();
            hour.value = hourLabel[currentDate.getHours()];
            console.log(typeof minutes.value)
        },500)
    })
    return {input,minutes, hour}
  }
//   mounted(){
//     const { currentTime } = useCurrentTime();
//     console.log(currentTime.value);
//     this.$refs.input.style.transform = `rotate(${currentTime.value}deg)`
//   }
};
</script>

<template>
<div class="backgroundTank">
    <div id="circle">
        <div class="clock">
            <svg ref="input"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="300px" height="300px" viewBox="0 0 300 300" enable-background="new 0 0 300 300" xml:space="preserve">
            <defs>
                <path  id="circlePath" d=" M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "/>
            </defs>
            <circle cx="150" cy="100" r="75" fill="none"/>
            <g id="gElement">
                <use xlink:href="#circlePath" fill="none"/>
                <text   id="textCircle">
    
                    <textPath id="textPathId" xlink:href="#circlePath">{{minutes}}</textPath>
               
                </text>
            </g>
        </svg>
        <svg  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="300px" height="300px" viewBox="0 0 300 300" enable-background="new 0 0 300 300" xml:space="preserve">
            <defs>
                <path  id="circlePath" d=" M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "/>
            </defs>
            <circle cx="150" cy="100" r="75" fill="none"/>
            <g id="gElement">
                <use xlink:href="#circlePath" fill="none"/>
                <text   id="textCircle">
    
                    <textPath id="textPathId" xlink:href="#circlePath">{{hour}}</textPath>
               
                </text>
            </g>
        </svg>
        </div>

    </div>
</div>
</template>