
let search = document.getElementById('search');


let myHeaders = new Headers();

let myInit = { method: 'GET',
headers: myHeaders,
mode: 'cors',
cache: 'default' 
};


function buttonClickGET() {
  
  let ville = document.getElementById("ville").value;
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&lang=en&appid=6e618f1604cf0428e080ea424422e401
  `, myInit).then(
    function(response) {
      return response.json();
    }
    ).then(function(myJson) {
      console.log(myJson.name);
      console.log(myJson.main.temp);
      console.log(myJson.main.humidity);
      console.log(myJson.coord);
      console.log(myJson.weather[0].description);
      console.log(myJson.weather[0].icon);
      let icon = myJson.weather[0].icon
      console.log(`https://openweathermap.org/img/wn/${icon}.png`)
      
      // add infos to html
      
      // infos div
      let affichageParent = document.createElement('div')
      affichageParent.classList.add('weathaResult')
      let affichage = document.createElement('div')
      affichage.classList.add('result')
      document.querySelector('main').appendChild(affichageParent)
      // let weather = document.querySelector(".weathaResultTitle")
      let villeName = document.createElement('h2');
      villeName.innerHTML = `${myJson.name} <span>(${myJson.coord.lon} / ${myJson.coord.lat})</span>`
      
      // the date and time
      let localDate = new Date();
      let localTime = localDate.getTime();
      let localOffset = localDate.getTimezoneOffset() * 60000;
      let utc = localTime + localOffset
      let wheathaTime = utc + (1000*myJson.timezone);
      let wheathaNewDate = new Date(wheathaTime);
      console.log(wheathaNewDate);
      let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      let timeOptions = {hour: 'numeric', minute: 'numeric', second: 'numeric'};
      console.log(new Intl.DateTimeFormat('en-GB', dateOptions).format(wheathaNewDate));
      console.log(new Intl.DateTimeFormat('en-GB', timeOptions).format(wheathaNewDate));
      let showDate = document.createElement('p')
      let showTime = document.createElement('p')
      showDate.innerHTML = new Intl.DateTimeFormat('en-GB', dateOptions).format(wheathaNewDate)

      function refreshTime() {
        let localDateTwo = new Date();
        let localTimeTwo = localDateTwo.getTime();
        let localOffsetTwo = localDateTwo.getTimezoneOffset() * 60000;
        let utcTwo = localTimeTwo + localOffsetTwo
        let wheathaTimeTwo = utcTwo + (1000*myJson.timezone);
        let wheathaNewDateTwo = new Date(wheathaTimeTwo);
        let timeOptionsTwo = {hour: 'numeric', minute: 'numeric', second: 'numeric'};

        showTime.innerHTML = new Intl.DateTimeFormat('en-GB', timeOptionsTwo).format(wheathaNewDateTwo)
      }
      setInterval(
        function() {refreshTime()}
      , 1000);


      
      
      
      
      
      affichageParent.appendChild(villeName)
      affichageParent.appendChild(showDate)
      affichageParent.appendChild(showTime)
      affichageParent.appendChild(affichage)
      
      
      // left div
      let left = document.createElement('div')
      left.classList.add('left')
      affichage.appendChild(left)
      
      // humidity
      let humid = document.createElement('p');
      humid.innerHTML = `Humidity : ${myJson.main.humidity}%`
      let wind = document.createElement('p');
      wind.innerHTML = `Wind<br>-<br>Speed : ${myJson.wind.speed}<br>Direction : ${myJson.wind.deg}`
      let sunrise = document.createElement('p');
      // Set unix to time format
      let sunriseTime = new Date(myJson.sys.sunrise*1000)
      let riseHours = "0" + sunriseTime.getHours();
      let riseMinutes = "0" + sunriseTime.getMinutes();
      let riseSeconds = "0" + sunriseTime.getSeconds();
      sunrise.innerHTML = `Sunrise : ${riseHours.substr(-2)}:${riseMinutes.substr(-2)}:${riseSeconds.substr(-2)} `
      let sunset = document.createElement('p');
      let sunsetTime = new Date(myJson.sys.sunset*1000)
      let setHours = sunsetTime.getHours();
      let setMinutes = "0" + sunsetTime.getMinutes();
      let setSeconds = "0" + sunsetTime.getSeconds();
      sunset.innerHTML = `Sunset : ${setHours}:${setMinutes.substr(-2)}:${setSeconds.substr(-2)}`
      
      left.appendChild(humid);
      left.appendChild(wind);
      left.appendChild(sunrise);
      left.appendChild(sunset);
      
      // right div
      let right = document.createElement('div');
      right.classList.add('right')
      affichage.appendChild(right)
      
      
      // temperature
      let temp =  document.createElement('p');
      // temp.innerHTML = `The current temperature is : ${myJson.main.temp}°C`
      temp.innerHTML = myJson.main.temp+"°C"
      right.appendChild(temp);
      
      let iconIcon = document.createElement('p');
      iconIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`
      right.appendChild(iconIcon);
      
      
      // description
      let desc = document.createElement('p');
      desc.innerHTML = `${myJson.weather[0].description}`
      right.appendChild(desc);
    })
  }
  
  
  
  // Get the input field
  let input = document.getElementById("ville");
  
  // Execute a function when the user releases a key on the keyboard
  input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.key === 'Enter') {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("search").click();
    }
  });