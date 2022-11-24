import { ref, onBeforeUnmount } from "vue";

export const useCurrentTime = () => {
  const currentTime = ref({
    minutes: new Date().getMinutes(),
    seconds: parse(new Date().getSeconds())}
    );
  const updateCurrentTime = () => {
    currentTime.value.seconds = parse(new Date().getSeconds());
    currentTime.value.minutes = new Date().getMinutes();
    // console.log(currentTime.value.seconds)
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
    }
  };
};

function parse(seconds){
  let graphSeconds = 6
  if(seconds < 49){
    graphSeconds *= seconds
    graphSeconds += 72
    return graphSeconds
  }else{
    seconds -= 48
    graphSeconds *= seconds
    return graphSeconds
  }
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

