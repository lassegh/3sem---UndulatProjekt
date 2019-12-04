import axios, {
  AxiosResponse,
  AxiosError
} from "../../node_modules/axios/index";

interface ITimeStamp {
  id: number;
  time: string;
}

let baseUri: string = "http://lgwebservice.azurewebsites.net/api/starttime";
let videoLogs : HTMLDivElement = <HTMLDivElement>document.getElementById("videoLogs");

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
    showAllRecords();
    myStartFunctionForBur();
    myStartFunctionForMad();  
    autoReloadVideoData();  
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

function autoReloadVideoData() {
  // Set the date we're counting down to
  var countDownDate = new Date().getTime()+10000; // Det sidste er en uge i milisekunder

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

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      showAllRecords();
      autoReloadVideoData();
    }
  }, 
  1000);
}

function showAllRecords(): void {
  axios.get<ITimeStamp[]>(baseUri)
          .then(function (response: AxiosResponse<ITimeStamp[]>): void {
              printDataToAllRecordsDiv(response.data); 
          })
          .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
              if (error.response) {
                  videoLogs.innerHTML = error.message;
  
              } else { // something went wrong in the .then block?
                videoLogs.innerHTML = error.message;
              }
          });
          
}

function printDataToAllRecordsDiv(records : ITimeStamp[]): void{
  videoLogs.innerHTML = "";

    let result = "";
    records.forEach((record: ITimeStamp) => {
          
      result +=  "#" + record.id + ": " + record.time + "<br>";
      
      videoLogs.innerHTML = result;
      });
}




