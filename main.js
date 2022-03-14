
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
      let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      let timeOptions = {hour: 'numeric', minute: 'numeric', second: 'numeric'};
      console.log(new Intl.DateTimeFormat('en-GB', dateOptions).format(wheathaNewDate));
      console.log(new Intl.DateTimeFormat('en-GB', timeOptions).format(wheathaNewDate));
      let showDate = document.createElement('p')
      let showTime = document.createElement('p')

      const mql = window.matchMedia("screen and (max-width: 768px)")
      const mediaQueryList = window.matchMedia(mql);
      
      // Change date format for responsive
      function respoDate() {

        if (mql.matches) { // If media query matches
          showDate.innerHTML ="-<br>" + localDate.getDate() + "-" + (localDate.getMonth() + 1) + "-" + localDate.getFullYear();
          console.log('Media Query Matched!')
        } else {
          showDate.innerHTML ="-<br>" + new Intl.DateTimeFormat('en-GB', dateOptions).format(wheathaNewDate);
          console.log('blablas')

        }
      }
      
      // Initialize function
      respoDate()

      // Listen for window resize
      mql.addListener(respoDate)

      
      
      function refreshTime() {
        // Find better way
        let localDateTwo = new Date();
        let localTimeTwo = localDateTwo.getTime();
        let localOffsetTwo = localDateTwo.getTimezoneOffset() * 60000;
        let utcTwo = localTimeTwo + localOffsetTwo
        let wheathaTimeTwo = utcTwo + (1000*myJson.timezone);
        let wheathaNewDateTwo = new Date(wheathaTimeTwo);
        
        showTime.innerHTML = new Intl.DateTimeFormat('en-GB', timeOptions).format(wheathaNewDateTwo) + "<br>-"
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
        // Wind
        let wind = document.createElement('p');
        let windDir = myJson.wind.deg
        
        // Convert degrees to letter direction
        // Thanks Shivabeach/#OpenWeathermap wind direction repo 🙏
        switch (true) {
          case windDir >= 360 || windDir <= 21:
          windDir = "N";
          break;
          case windDir >= 22 && windDir <= 44:
          windDir = "NNE";
          break;
          case windDir >= 45 && windDir <= 66:
          windDir = "NE";
          break;
          case windDir >= 67 && windDir <= 89:
          windDir = "ENE";
          break;
          case windDir >= 90 && windDir <= 111:
          windDir = "E";
          break;
          case windDir >= 112 && windDir <= 134:
          windDir = "ESE";
          break;
          case windDir >= 135 && windDir <= 156:
          windDir = "SE";
          break;
          case windDir >= 157 && windDir <= 179:
          windDir = "SSE";
          break;
          case windDir >= 180 && windDir <= 201:
          windDir = "S";
          break;
          case windDir >= 202 && windDir <= 224:
          windDir = "SSW";
          break;
          case windDir >= 225 && windDir <= 246:
          windDir = "SW";
          break;
          case windDir >= 247 && windDir <= 269:
          windDir = "WSW";
          break;
          case windDir >= 270 && windDir <= 291:
          windDir = "W";
          break;
          case windDir >= 292 && windDir <= 314:
          windDir = "WNW";
          break;
          case windDir >= 315 && windDir <= 336:
          windDir = "NW";
          break;
          case windDir >= 337 && windDir <= 359:
          windDir = "NNW";
          break;
          default:
          windDir = "unknown";
        }
        
        // Convert wind speed to km/h
        let windSpeed = Math.floor((myJson.wind.speed) * 3.6)
        
        wind.innerHTML = `Wind<br>-<br>Speed : ${windSpeed} km/h<br>Direction : ${windDir}`
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