import { ref, onBeforeUnmount } from "vue";

export const useCurrentTime = () => {
  const currentTime = ref({
    seconds: parse(new Date().getSeconds()),
    hourPosition: parseHour(new Date().getHours())
  });
  const updateCurrentTime = () => {
    currentTime.value.hourPosition = parseHour(new Date().getHours())
  };
  const updateTimeInterval = setInterval(updateCurrentTime, 500);
  onBeforeUnmount(() => {
    clearInterval(updateTimeInterval);
  });
  
  return {
    currentTime,
    hourLabel: {
      0: '12AM',
      1: '1AM',
      2: '2AM',
      3: '3AM',
      4: '4AM',
      5: '5AM',
      6: '6AM',
      7: '7AM',
      8: '8AM',
      9: '9AM',
      10: '10AM',
      11: '11AM',
      12: '12PM',
      13: '1PM',
      14: '2PM',
      15: '3PM',
      16: '4PM',
      17: '5PM',
      18: '6PM',
      19: '7PM',
      20: '8PM',
      21: '9PM',
      22: '10PM',
      23: '11PM',
    },
    minutesText: ((sec)=>{

      let minText = '';
      const numbers = {
        0 : "o'clock",
        1 : "one",
        2 : "two",
        3 : "three",
        4 : "four",
        5 : "five",
        6 : "six",
        7 : "seven",
        8 : "eight",
        9 : "nine",
        10 : "ten",
        11 : "eleven",
        12 : "twelve",
        13 : "thirteen",
        14 : "fourteen",
        15 : "fifteen",
        16 : "sixteen",
        17 : "seventeen",
        18 : "eighteen",
        19 : "ninteeen",
        20 : "twenty",
        30 : "thirty",
        40 : "forty",
        50 : "fifty"
      }
      if(sec < 20){
        return numbers[sec]
      }else if(sec === 20 || sec === 30 || sec === 40 || sec === 50){
        return numbers[sec]
      }else{
        let first = sec.toString()[0]
        let second = sec.toString()[1]
        first += "0"
        minText += numbers[first]
        minText += numbers[second]
        return minText
      }
    })
  };
};

function parse(seconds){
  let graphSeconds = 6  
  if(seconds < 47){
    graphSeconds *= seconds
    graphSeconds += 84
  }else{
    seconds -= 46
    graphSeconds *= seconds
  }
  let endingDeg = graphSeconds + 360
  return {startDeg: graphSeconds, endDeg: endingDeg }
}

function parseHour(hour){
  if(hour === 0 || hour === 12) return 84
  else if (hour === 1 || hour === 13) return 114
  else if (hour === 2 || hour === 14) return 144
  else if (hour === 3 || hour === 15) return 174
  else if (hour === 4 || hour === 16) return 204
  else if (hour === 5 || hour === 17) return 234
  else if (hour === 6 || hour === 18) return 264
  else if (hour === 7 || hour === 19) return 294
  else if (hour === 8 || hour === 20) return 324
  else if (hour === 9 || hour === 21) return 354
  else if (hour === 10 || hour === 22) return 24
  else if (hour === 11 || hour === 23) return 54
}

function flipString(aString) {
  var last = aString.length - 1;
  var result = new Array(aString.length)
  for (var i = last; i >= 0; --i) {
   var c = aString.charAt(i)
   var r = flipTable[c]
   result[last - i] = r != undefined ? r : c
  }
  return result.join('')
 }

