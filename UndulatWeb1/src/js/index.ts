import axios, {
  AxiosResponse,
  AxiosError
} from "../../node_modules/axios/index";

interface ITimeStamp {
  id: number;
  time: string;
}

let baseUri: string = "http://lgwebservice.azurewebsites.net/api/starttime";
let baseUrlForWeather = "http://api.openweathermap.org/data/2.5/weather?q=roskilde&APPID=1a38fe1f59581dcfa8c2121a26de6b86";

let videoLogs : HTMLDivElement = <HTMLDivElement>document.getElementById("videoLogs");

let contentOfAllRecords : HTMLDivElement = <HTMLDivElement>document.getElementById("cleanTimer");
let contentOfTimerMad : HTMLDivElement = <HTMLDivElement>document.getElementById("feedTimer");
let contentTemp : HTMLDivElement = <HTMLDivElement>document.getElementById("temp");

function alertFuncForBur() {
  alert("Tid til at skifte bur!");
  myStartFunctionForBur();
}

function alertFuncForMad() {
  alert("Tid at give Pepsi mad og drikke");
  myStartFunctionForMad();
}

(()=> {
    showAllTimeStamps();
    myStartFunctionForBur();
    myStartFunctionForMad();  
    autoReloadVideoData();  
    showWeather();
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
      showAllTimeStamps();
      showWeather();
      autoReloadVideoData();
    }
  }, 
  1000);
}

function showAllTimeStamps(): void {
  axios.get<ITimeStamp[]>(baseUri)
          .then(function (response: AxiosResponse<ITimeStamp[]>): void {
              printDataToAllTimeStampsDiv(response.data); 
          })
          .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
              if (error.response) {
                  videoLogs.innerHTML = error.message;
  
              } else { // something went wrong in the .then block?
                videoLogs.innerHTML = error.message;
              }
          });
          
}

function printDataToAllTimeStampsDiv(records : ITimeStamp[]): void{
  videoLogs.innerHTML = "";

    let result = "";
    records.forEach((record: ITimeStamp) => {
          
      result +=  "#" + record.id + ": " + record.time + "<br>";
      
      videoLogs.innerHTML = result;
      });
}

function showWeather(): void {

  axios.get(baseUrlForWeather)
  .then(function(response: AxiosResponse): void {
    let newData:number = response.data["main"]["temp"]; 
    contentTemp.innerHTML = String(newData-273.15).slice(0,-14)+" grader c";
  })
  .catch(function (error: AxiosError): void {
      if (error.response) {
          contentTemp.innerHTML = error.message;
      } else {
        contentTemp.innerHTML = error.message;
      }
  });
          
}




