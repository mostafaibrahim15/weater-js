 let btn= document.getElementById('btn');
 let search= document.getElementById('search');
 let today= document.getElementById('today');
 let tomorowDay= document.getElementById('tomorow');
 let nextDay= document.getElementById('nextDay');

let allData=[];

navigator.geolocation.watchPosition(position=>{
  let long = position.coords.longitude;
  let lat = position.coords .latitude;
  (async function getLocation()
  {
     let myData= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a5044205f57747e2a35121038242609&q=${long},q=${lat}&days=3`);
     let data= await myData.json()
     allData=data;
     displayData();
  })();

})


 btn.addEventListener('click',()=>{
  let endpoint= search.value
    
    getLocation(endpoint)
 })
 search.addEventListener('input',()=>{
  let endpoint= search.value
    
  getLocation(endpoint);
 })

 async function getLocation(endpoint)
 {
    let myData= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a5044205f57747e2a35121038242609&q=${endpoint}&days=3`);
    let data= await myData.json()
    allData=data;
    displayData();
 }

function displayData()
{
  document.getElementById('demo').classList.replace('d-none','d-flex')
    let name= allData.location.name;
    let locationTime= allData.location.localtime
    let dayOne = allData.forecast.forecastday[0].date;
    let dayTwo = allData.forecast.forecastday[1].date;
    let dayThree = allData.forecast.forecastday[2].date;
    let temp= allData.forecast.forecastday[0].hour
    let date= new Date(locationTime)
    let hour= date.getHours();
    let updatedTemp;
    let text;
    let icon;
   
    let tomorowdayTemp= allData.forecast.forecastday[1].day.avgtemp_c
    let text2=allData.forecast.forecastday[1].day.condition.text;
    let icon2=allData.forecast.forecastday[1].day.condition.icon;
    let nextdayTemp= allData.forecast.forecastday[2].day.avgtemp_c
    let text3=allData.forecast.forecastday[2].day.condition.text;
    let icon3=allData.forecast.forecastday[2].day.condition.icon;
    
    
    for(let i=0; i<temp.length;i++)
    {
      let time= new Date(temp[i].time)
        let dayHour= time.getHours();
        if(hour== dayHour)
        {
           updatedTemp=temp[i].temp_c;
           text=temp[i].condition.text;
           icon=temp[i].condition.icon;
           console.log(updatedTemp);
           
        }
    }
    
 
    
   
    let months= ['January',"Fabruary","March","April","May","June","July","August","September","October","Novemmber","December"];
   let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    
    console.log(allData);
    
  
    
   
    let dataNow= new Date(dayOne);
    let day=dataNow.getDay();
    let dayName=days[day]
    let month=dataNow.getMonth();
    let monthName= months[month];
    let dayNum= dataNow.getDate()

    let tomorrow = new Date(dayTwo);
    let day2=tomorrow.getDay();
    let dayName2=days[day2]
    
    let thirdDay= new Date(dayThree)
    let day3=thirdDay.getDay();
    let dayName3=days[day3]
   
    
    
    today.innerHTML=
    `
       <div class="card-header w-100  d-flex flex-row justify-content-between align-items-center text-center py-2 px-0 m-0">
                <p>${dayName}</p>
                <p>${dayNum} ${monthName} </p>
              </div>
              <div class="card-body w-100  d-flex flex-column justify-content-start align-items-start ">
                
                <p class="pt-3 fs-4">${name}</p>
                <p class="temp">${updatedTemp}°C  <img src="${icon}"></p>
                <p class="status ">${text}</p>
               <div class="d-flex flex-row justify-content-between align-items-center mt-3">
                <span class="me-3">
                  <img src="img/icon-umberella.png">
                  "25%"
                </span>
                <span class="me-3">
                  <img src="img/icon-wind.png">
                  18 km/h
                </span>
                <span class="me-3 ">
                  <img src="img/icon-compass.png">
                  East
                </span>
               </div>
              </div>
    `
    tomorowDay.innerHTML =
    `
       <div class="card-header w-100  d-flex flex-row justify-content-center align-items-center text-center text-center py-2 px-0 m-0">
                <p class="text-center">${dayName2}</p>
                
              </div>
              <div class="card-body w-100  d-flex flex-column justify-content-center align-items-center mt-5 ">
                
               
                <p class="temp">${tomorowdayTemp}°C  <img src="${icon2}"></p>
                <p class="status ">${text2}</p>
               <div class="d-flex flex-row justify-content-between align-items-center mt-5">
                <span class="me-3 ">
                  <img src="img/icon-umberella.png">
                  "25%"
                </span>
                <span class="me-3 ">
                  <img src="img/icon-wind.png">
                  18 km/h
                </span>
                <span class="me-3 ">
                  <img src="img/icon-compass.png">
                  East
                </span>
               </div>
              </div>
    
    `
    nextDay.innerHTML =
    `
       <div class="card-header w-100  d-flex flex-row justify-content-center align-items-center text-center text-center py-2 px-0 m-0">
                <p>${dayName3}</p>
                
              </div>
              <div class="card-body w-100  d-flex flex-column justify-content-center align-items-center mt-5 ">
                
              
                <p class="temp">${nextdayTemp}°C  <img src="${icon3}"></p>
                <p class="status ">${text3}</p>
               <div class="d-flex flex-row justify-content-between align-items-center mt-5">
                <span class="me-3 ">
                  <img src="img/icon-umberella.png">
                  "25%"
                </span>
                <span class="me-3 ">
                  <img src="img/icon-wind.png">
                  18 km/h
                </span>
                <span class="me-3 ">
                  <img src="img/icon-compass.png">
                  East
                </span>
               </div>
              </div>
    
    `
   
}