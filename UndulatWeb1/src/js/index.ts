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

let contentForCleanTimer : HTMLDivElement = <HTMLDivElement>document.getElementById("cleanTimer");
let contentOfTimerMad : HTMLDivElement = <HTMLDivElement>document.getElementById("feedTimer");
let contentTemp : HTMLDivElement = <HTMLDivElement>document.getElementById("temp");

(()=> {
    showAllTimeStamps();
    TimerWithAlert(contentForCleanTimer,345600000,"Tid til at skifte bur!");
    TimerWithAlert(contentOfTimerMad,604800000,"Tid at give Pepsi mad og drikke");
    autoReloadData();  
    showWeather();
})();

function TimerWithAlert(divTag: HTMLDivElement, milisecondsToRun: number, textToAlert:string) {
  // Set the date we're counting down to
  var countDownDate = new Date().getTime()+milisecondsToRun;

  var x = setInterval(function() {
    // Get today's date and time
    var now = new Date().getTime();

    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    divTag.innerHTML = days + "d " + hours + "h " + minutes + "m";

    if (distance < 0) {
      clearInterval(x);
      (()=> {
        alert(textToAlert);
        TimerWithAlert(divTag,milisecondsToRun,textToAlert);
      })();
    }
  }, 
  1000);
}

function autoReloadData() {
  var countDownDate = new Date().getTime()+10000;

  var x = setInterval(function() {
    var now = new Date().getTime();

    var distance = countDownDate - now;

    if (distance < 0) {
      clearInterval(x);
      showAllTimeStamps();
      showWeather();
      autoReloadData();
    }
  }, 
  1000);
}

function showAllTimeStamps(): void {
  axios.get<ITimeStamp[]>(baseUri)
          .then(function (response: AxiosResponse<ITimeStamp[]>): void {
            videoLogs.innerHTML = "";
            let result = "";
            response.data.forEach((record: ITimeStamp) => { 
              result +=  "#" + record.id + ": " + record.time + "<br>";
              videoLogs.innerHTML = result;
              }); 
          })
          .catch(function (error: AxiosError): void {
              if (error.response) {
                  videoLogs.innerHTML = error.message;
              } else {
                videoLogs.innerHTML = error.message;
              }
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




