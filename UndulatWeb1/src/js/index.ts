let contentOfAllRecords : HTMLDivElement = <HTMLDivElement>document.getElementById("cleanTimer");
let contentOfTimerMad : HTMLDivElement = <HTMLDivElement>document.getElementById("feedTimer");
function alertFuncForBur() {
  alert("Tid til at skifte bur!");
  myStartFunctionForBur();
}

function alertFuncForMad() {
  alert("Tid at give Pepsi mad og drikke");
  myStartFunctionForMad();
}

(()=> {

    myStartFunctionForBur();
    myStartFunctionForMad();    
})();

function myStartFunctionForBur() {
  // Set the date we're counting down to
  var countDownDate = new Date().getTime()+345600000; // Det sidste er 4 dage i milisekunder

  // Update the count down every 1 second
  var x = setInterval(function() {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    // Display the result in the element with id="demo"
    contentOfAllRecords.innerHTML = days + "d " + hours + "h " + minutes + "m";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      alertFuncForBur()
    }
  }, 
  1000);
}

function myStartFunctionForMad() {
  // Set the date we're counting down to
  var countDownDate = new Date().getTime()+604800000; // Det sidste er en uge i milisekunder

  // Update the count down every 1 second
  var x = setInterval(function() {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    // Display the result in the element with id="demo"
    contentOfTimerMad.innerHTML = days + "d " + hours + "h " + minutes + "m";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      alertFuncForMad()
    }
  }, 
  1000);
}
