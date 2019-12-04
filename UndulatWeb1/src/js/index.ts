let contentOfAllRecords : HTMLDivElement = <HTMLDivElement>document.getElementById("demo");

function alertFunc() {
  alert("Tid til at skifte bur!");
}

(()=> {

    myStartFunction();
    
})();

function myStartFunction() {
// Set the date we're counting down to
var countDownDate = new Date("Dec 5, 2019 10:19:25").getTime();

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
    alertFunc()
  }
}, 1000);
}



