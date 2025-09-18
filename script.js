const inputBox = document.querySelector("#inputBox");
const form = document.getElementsByTagName("form");
const dataShow = document.querySelector(".dataShow");
const rainImage = `https://img.freepik.com/premium-vector/happy-rainy-weather-cartoon_543090-883.jpg`;
const clodyImage = `https://img.freepik.com/premium-vector/sun-cloud-cute-smiling-sun-cloud-isolated-white-background_711125-751.jpg`;
const sunnyImage =  `https://clipart-library.com/images/piqdkxqi9.png`;
const API_KEY = `RBMY2QWNEENLMXLPDUKL7CGEJ`;
let showImage = rainImage;
  
 async function fetchData  (location){

    try{
        dataShow.innerHTML = `<h2>Loading...</h2>`;
const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${API_KEY}`);
var res = await response.json();
    }
    catch(error){
        console.log(error);
         dataShow.innerHTML = `<h2>Invalid location</h2>`;
        
    }

if(res.currentConditions.icon === "rain"){
    showImage = rainImage;
}
else if (res.currentConditions.icon === "cloudy"){
    showImage = clodyImage;
}
else{

    showImage = sunnyImage;
}

let tempF =res.currentConditions.temp;
let tempC = (tempF - 32) * 5/9;


dataShow.innerHTML = `

<div class="dataWrapper">
<div>
<img src="${showImage}" alt="weatherImage" class="image"/>
</div>
<div class="whetherData">  
 <div class="heading"><p class="highlight">Address - </p>${res.address.toUpperCase()} </div>
 <div class="heading"><p class="highlight">Conditions - </p>${res.currentConditions.conditions} </div>
 <div class="heading"><p class="highlight">Temperature - </p>${tempC.toFixed(1)}°C </div>
 <div class="heading"><p class="highlight">Description - </p>${res.description} </div>

</div>


</div>


`
inputBox.value = "";
}

form[0].addEventListener("submit",(e)=>{
    e.preventDefault();
    const location = inputBox.value;  
    fetchData(location);   
})










