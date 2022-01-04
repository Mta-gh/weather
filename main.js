
// var ville = "angers"
// var ville = document.getElementById('ville');
var search = document.getElementById('search');
// var ville = prompt("Ville?");
// var affichage = document.querySelector('.result')


var myHeaders = new Headers();

var myInit = { method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' 
};


function buttonClickGET() {

    var ville = document.getElementById("ville").value;

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&lang=en&appid=6e618f1604cf0428e080ea424422e401
`, myInit).then(
function(response) {
    return response.json();
    // console.log(response);
}
).then(function(myJson) {
    console.log(myJson.name);
    console.log(myJson.main.temp);
    console.log(myJson.main.humidity);
    console.log(myJson.coord);
    console.log(myJson.weather[0].description);
    console.log(myJson.weather[0].icon);
    var icon = myJson.weather[0].icon
    console.log(`https://openweathermap.org/img/wn/${icon}.png`)

    // add infos to html
    
    // infos div
    var affichageParent = document.createElement('div')
    affichageParent.classList.add('weathaResult')
    var affichage = document.createElement('div')
    affichage.classList.add('result')
    document.querySelector('main').appendChild(affichageParent)
    // var weather = document.querySelector(".weathaResultTitle")
    var villeName = document.createElement('h2');
    villeName.innerHTML = `${myJson.name} (${myJson.coord.lon} / ${myJson.coord.lat} ) : `
    affichageParent.appendChild(villeName)
    affichageParent.appendChild(affichage)

    // left div
    var left = document.createElement('div')
    left.classList.add('left')
    affichage.appendChild(left)

    // humidity
    var humid = document.createElement('p');
    humid.innerHTML = `Humidity : ${myJson.main.humidity}%`
    var wind = document.createElement('p');
    wind.innerHTML = `Wind<br>-<br>Speed : ${myJson.wind.speed}<br>Direction : ${myJson.wind.deg}`
    var sunrise = document.createElement('p');
    sunrise.innerHTML = `Sunrise : ${myJson.sys.sunrise}`
    var sunset = document.createElement('p');
    sunset.innerHTML = `Sunset : ${myJson.sys.sunset}`
    
    left.appendChild(humid);
    left.appendChild(wind);
    left.appendChild(sunrise);
    left.appendChild(sunset);

    // right div
    var right = document.createElement('div');
    right.classList.add('right')
    affichage.appendChild(right)

    
    // temprature
    var temp =  document.createElement('p');
    // temp.innerHTML = `The current temperature is : ${myJson.main.temp}°C`
    temp.innerHTML = myJson.main.temp+"°C"
    right.appendChild(temp);

    var iconIcon = document.createElement('p');
    iconIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`
    right.appendChild(iconIcon);

    
    // description
    var desc = document.createElement('p');
    desc.innerHTML = `${myJson.weather[0].description}`
    right.appendChild(desc);

})

}



// fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&lang=fr&appid=6e618f1604cf0428e080ea424422e401
// `, myInit).then(
// function(response) {
//     return response.json();
//     // console.log(response);
// }
// ).then(function(myJson) {
//     console.log(myJson.name);
//     console.log(myJson.main.temp);
//     console.log(myJson.main.humidity);
//     console.log(myJson.coord);
//     console.log(myJson.coord);
//     console.log(myJson.coord);
//     console.log(myJson.weather[0].description);
//     console.log(myJson.weather[0].icon);
//     var icon = myJson.weather[0].icon
//     console.log(`http://openweathermap.org/img/wn/${icon}.png`)
// })