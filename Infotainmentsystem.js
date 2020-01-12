//******************************************************************
//*******************headfunctions**********************************
//******************************************************************
UpdateData = setInterval(showTemp, 3000);
function showTemp() {
	Temp.innerHTML = '';
	//setInterval(function () {
		fetch("http://192.168.178.82:5000/status").then(function (response) {
		//fetch("http://192.168.0.65:5000/status").then(function (response) {
			response.text().then(function (text) {
				//console.log(text)
				var array = JSON.parse(text);
				let TmpData = document.createTextNode(array.temp.toFixed(2) + "°C"); //  "Ausgabe-Stil" Temperatur
				Temp.appendChild(TmpData);
			})
		})
	//}, 1000)
}
showTemp();								// Temperatur anzeigen lassen

function showClock() {
	var todayC = new Date();
	var hour = todayC.getHours();		// Stunde
	var minute = todayC.getMinutes();	// Minute
	var second = todayC.getSeconds();	// Sekunde
	minute = checkTime(minute);
	second = checkTime(second);
	document.getElementById('Time').innerHTML = hour + ":" + minute + ":" + second;	// Zeit "Ausgabe-Stil"
	var t = setTimeout(showClock, 500);	// Datum anzeigen lassen
}

function checkTime(i) {
	if (i < 10) { i = "0" + i };			// Falls nur einstellige Uhrzeit, soll eine Null davor gesetzt werden
	return i;
}

function showDate() {
	var today = new Date();
	var year = today.getFullYear(); // Jahr 
	var month = today.getMonth() + 1; // Monat Monatsangabe startet bei 0!
	if (month < 10) {
		month = '0' + month; 	// Falls nur einstellige Uhrzeit, soll eine Null davor gesetzt werden
	}
	var day = today.getDate(); 		// Tag 
	if (day < 10) {
		day = '0' + day; 		// Falls nur einstellige Uhrzeit, soll eine Null davor gesetzt werden
	}

	today = day + '.' + month + '.' + year; // Datum "Ausgabe-Stil"
	return today;
}

var today = showDate();				// Datum anzeigen lassen

document.getElementById('DateT').textContent += today;


//******************************************************************
//*******************mainfunctions**********************************
//******************************************************************
var template = document.querySelector('#HomeScreen');
var clone = template.content.cloneNode(true);
template.parentNode.appendChild(clone);
var musiclist
var main = document.getElementsByClassName('main')


document.querySelector('main').addEventListener('click', handleHeaderClick);
function handleHeaderClick(event) {
	switch (event.target.id) {
		case 'Play':
			Playmusic();
			break;
		case 'Navigate':
			ShowNavigation();
			break;
		case 'Music':
			ShowMusic();
			break;
		case 'Settings':
			ShowSettings();
			break;
		case 'General Information':
			ShowGeneral();
			break;
		case 'Safety Information':
			ShowSafety();
			break;
		case 'Sensor Information':
			ShowSensor();
			break;
		case 'Home':
			GoHome();
			break;
	}
}

function ShowNavigation() {
	let mainElement = document.querySelector('main');
	mainElement.innerHTML = '';
	console.log("Maps");
}

function ShowMusic() {
	let mainElement = document.querySelector('main');
	mainElement.innerHTML = '';
	mainElement.style.gridTemplateAreas = "a";
	mainElement.style.gridTemplateColumns = '1fr'; 
	mainElement.style.gridTemplateRows = '1fr';
	console.log("Music");
	//fetch("http://192.168.0.65:5000/music").then(function (response) {
		fetch("http://192.168.178.82:5000/music").then(function (response) {
		response.text().then(function (text) {
			console.log(musiclist)
			musiclist = JSON.parse(text);
			var musicdiv = document.createElement('div');
			musicdiv.innerHTML = 'Music library'
			musicdiv.classList.add('musiclibrary')

			var table = document.createElement('ul')
			table.classList.add('Table')
			for (i = 0; i < musiclist.length; i++) {
				var list = document.createElement("li");
				//list.classList.add('music' + i);
				list.classList.add('music');
				list.id = i;
				let newListNode = document.createTextNode(musiclist[i].artist + ' - ' + musiclist[i].title);

				list.appendChild(newListNode);
				table.appendChild(list);

				mainElement.appendChild(musicdiv);
				musicdiv.appendChild(table)
				table.addEventListener('click', mark);
			}
		})
		})
}

function mark(){
	//alert('Hi!');
	//document.getElementById('musiclist').innerHTML = value;
	document.getElementsByTagName('li')[i].style.backgroundColor = "green";
}

function ShowSettings() {
	let mainElement = document.querySelector('main');
	mainElement.innerHTML = '';
	console.log("Settings");
}

function ShowGeneral() {
	let mainElement = document.querySelector('main');
	mainElement.innerHTML = '';
	mainElement.style.gridTemplateAreas = "a a a";
	mainElement.style.gridTemplateColumns = '1fr 1fr 1fr';
	mainElement.style.gridTemplateRows = '1fr';

	var speed = document.createElement('div');
	speed.classList.add('speed');
	var speedicon = document.createElement('img');
	speedicon.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5CsuKPhbLJUGzzBhzCogA1L1_99Fjfk6neB_m9irKBs3Tjg9x&s";

	var consumption = document.createElement('div');
	consumption.classList.add('consumption');
	var consumptionicon = document.createElement('img');
	consumptionicon.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqc4p4DyeU5I0AzNnl7w1rYwsQrq3vV4ylviuU9JSy7g63vv0L";

	var fuel = document.createElement('div');
	fuel.classList.add('fuel');
	var fuelicon = document.createElement('img');
	fuelicon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8AAADPz890dHStra35+fkjIyOWlpYEBASxsbH8/PyQkJD29va7u7vs7Ozm5ubExMTg4OCmpqYsLCygoKBPT09HR0djY2NYWFjU1NRNTU2ZmZlsbGwYGBg9PT0oKCiAgIA0NDQPDw+IiIh7e3sdHR1xcXG/v786OjoOnFG/AAAEVUlEQVR4nO2d6XbqIBRGg9rW2ahRm7bawQ73/Z/wZrl6WyCQcDLAwfvtnwks2CtKmMJJEgAAAAAAAAAAAIBrZD3wz9yj30YEYbf2JXgII1gw8COYBRMUwssvdRpQUMx8GKYhDbc+DEchDcX06g1vYAhDGP53hvuhD0IaPnooL0nGAQ3vPJQHw+7xbxjyf8jqGU7Xi8lisGxfHlPD/F+Tu71rO8RiaTi/l3/KWbvyOBrmQuXU6u/KsKUZCJ3nNor8nuGyJCjEQ4vy+BmeDIZi07w8PoZf77uC+71JsM2bk4vh8tVs1v4hMjGcV/sVjU3j8pgYPtUZirdJw/J4GJrazxL7Zl04HoaOs7ZfTcqLyrBRe8PDcO1oKM708ngYJreuivSZFiaGC1dDsaCWx8QwmTkrrojlcTFMUkt3rQR1wYqNYdGvWV+oVSQ2qIwMv5nUKtLmNfgZJkPdSIe2dMzQMPnUlVLtuZLK42io7Z7YrvUFJNIbg6VhsvwdaxxHlytn2fCeUh5Pw6JhnQz3r6fD7GfPzVY45SvD1bCE0jmn7DWKxjB5lvJRJonjMZT7de+EfPEYyhPFO0I+hnPeFuTJqltCvnieobwDb0zIF4+h8vAJ2WDYPTC0AkMLMOweGFqBoQUYdk9IQ+a7LzswPN76QAQ09A8MYQhDGPYPDGEIQxj2DwxhCEMY9g8MYQhDGPYPDGEIQxj2DwxhCMPwhhTBOA1HE5maYwbljNEYamwr9/7KKWM1rN6FL6eL11BUfAkrJ4vY8OXqDSt2/8rJIjasqLtbKhiGB4Z1qWAYnisznN1dkC9dmSGp7m6pmBnewBCGMIRh78AQhjCEYf/AEIYwhGH/wBCGMIRh/8AQhjCEYf/AEIYwhGH/wBCGMIzLsItzE/3zbXiULlk3J8pnXx5jM5QPnLduopXPLz3FZigHP7ceRy7vSRnGZvgoXbJuv5SPX6KcaMXCUDnnOTVXtJOzoP3zbahEe/owV1Q+CpoUO4CFYbKTLxpjyShnspMCzfEwVCMDGDbsq1FaSMGteBhO1cslRS02AinoPA9DPczMUHGYauEgmse38I81stzb5sdxmr1pN5vHKPHP77drm9K9Q5bmeZodSjeIkVe5GKrRHapoEyvIP5LhyjVPm3hP/pG/sKyPEXSBHAaRj6Fb2C5aO8rMUO23mHkhC7IyVAZIRpoEsGZlWBdCr3UMS/+UvuVe/bEnfmgfh9Q/hq/VJ0dLWnLgQ66GRZUMAS3HGam3zdwwSQZnZbz78UIZ00dhWLBMs/Nhvz+8zxbUTkwkht0BQxjCEIYwhGE9jiPrnmhV9flo6MKuvho98ulQw8+zea2mdjAZE1vD+UoOEwJRUeqb5qFr1DWlZe2n+jyRkWuG4/oskaGva4euT/foy6avoSvUORvN0Gn6OCr0xnQZukJd81R6H6b1mWLCtAcqfwhdqw6xLMcsB1eC/ioEAAAAAAAAAAAAiIe/TPl4+Kb+yskAAAAASUVORK5CYII=";
			
	var speedData = document.createTextNode("Speed" + ": "  + " km/h");
	var consumptionData = document.createTextNode("Fuel Consumption" + ": " +  " l/100km");
	var fuelData = document.createTextNode("Fuel level" + ": " +  " %");
			
	speed.appendChild(speedicon);
	consumption.appendChild(consumptionicon);
	fuel.appendChild(fuelicon);
	mainElement.appendChild(speed);
	mainElement.appendChild(consumption);
	mainElement.appendChild(fuel);

	setInterval(function () {
		fuel.innerHTML = '';
		speed.innerHTML = '';
		consumption.innerHTML = '';
		
		//fetch("http://192.168.0.65:5000/status").then(function (response) {
		fetch("http://192.168.178.82:5000/status").then(function (response) {
			response.text().then(function (text) {
				console.log(text)
				var array = JSON.parse(text);
				console.log(array.consumption);
								
				speedData = document.createTextNode("Speed" + ": " + array.speed + " km/h");
				consumptionData = document.createTextNode("Fuel Consumption" + ": " + array.consumption + " l/100km");
				fuelData = document.createTextNode("Fuel level" + ": " + array.remainingfuel + " %");
					
				speed.appendChild(speedData);
				consumption.appendChild(consumptionData);
				fuel.appendChild(fuelData);

				
			})
		})
	}, 3000)
}




function ShowSafety() {
	let mainElement = document.querySelector('main');
	mainElement.innerHTML = '';
	mainElement.style.gridTemplateAreas = "a a";
	mainElement.style.gridTemplateColumns = '1fr 1fr';
	mainElement.style.gridTemplateRows = '1fr';

	let divElement1 = document.createElement('div');		//erstellen der beiden divs Car Lock und WIndows + Zuordnen der CSS-class-list
	let divElement2 = document.createElement('div');
	divElement1.classList.add('Carlock');
	divElement1.innerHTML = 'Car Lock';
	divElement2.classList.add('window');
	divElement2.innerHTML = 'Windows';

	var OpenCar = document.createElement('button');			//erstellen der Open/Close Button + Zuordnen der CSS-class-list
	var LockCar = document.createElement('button');
	OpenCar.innerHTML = 'Open';
	OpenCar.id ='OpenCar';
	LockCar.innerHTML = 'Lock';
	LockCar.id ='LockCar';

	let leftfront = document.createElement('div');		//erstellen der 5 divs für Windows + Zuordnen der CSS-class-list
	let leftback = document.createElement('div');
	let rightback = document.createElement('div');
	let rightfront = document.createElement('div');
	let allw = document.createElement('div');
	allw.classList.add('windowdiv');
	allw.innerHTML = 'All Windows';
	leftfront.classList.add('windowdiv');
	leftfront.innerHTML = 'Left Front';
	rightfront.classList.add('windowdiv');
	rightfront.innerHTML = 'Right Front';
	leftback.classList.add('windowdiv');
	leftback.innerHTML = 'Left Back';
	rightback.classList.add('windowdiv');
	rightback.innerHTML = 'Right Back';

	let OpenLV = document.createElement('button');			//erstellen der Open/Close Button für Windows + Zuordnen der CSS-class-list
	let CloseLV = document.createElement('button');
	let OpenRV = document.createElement('button');
	let CloseRV = document.createElement('button');
	let OpenLH = document.createElement('button');
	let CloseLH = document.createElement('button');
	let OpenRH = document.createElement('button');
	let CloseRH = document.createElement('button');
	let OpenAll = document.createElement('button');
	let CloseAll = document.createElement('button');
	OpenLV.innerHTML = 'Open';
	OpenLV.classList.add('WindowOpen');
	OpenLV.id ='OpenLV';
	CloseLV.innerHTML = 'Close';
	CloseLV.classList.add('WindowClose');
	CloseLV.id ='CloseLV';
	OpenRV.innerHTML = 'Open';
	OpenRV.classList.add('WindowOpen');
	OpenRV.id ='OpenRV';
	CloseRV.innerHTML = 'Close';
	CloseRV.classList.add('WindowClose');
	CloseRV.id ='CloseRV';
	OpenLH.innerHTML = 'Open';
	OpenLH.classList.add('WindowOpen');
	OpenLH.id ='OpenLH';
	CloseLH.innerHTML = 'Close';
	CloseLH.classList.add('WindowClose');
	CloseLH.id ='CloseLH';
	OpenRH.innerHTML = 'Open';
	OpenRH.classList.add('WindowOpen');
	OpenRH.id ='OpenRH';
	CloseRH.innerHTML = 'Close';
	CloseRH.classList.add('WindowClose');
	CloseRH.id ='CloseRH';
	OpenAll.innerHTML = 'Open';
	OpenAll.classList.add('WindowOpen');
	OpenAll.id ='OpenAll';
	CloseAll.innerHTML = 'Close';
	CloseAll.classList.add('WindowClose');
	CloseAll.id ='CloseAll';

	mainElement.appendChild(divElement1);					//Zuordnen der beiden divs zum Mainelement
	mainElement.appendChild(divElement2);
	divElement1.appendChild(OpenCar);						//ZUordnen der Beiden Open/Close Buttons zu Car Lock
	divElement1.appendChild(LockCar);
	divElement2.appendChild(allw);							//ZUordnen der 5 divs für Windows zu Windows
	divElement2.appendChild(leftfront);
	divElement2.appendChild(rightfront);
	divElement2.appendChild(leftback);
	divElement2.appendChild(rightback);
	leftfront.appendChild(OpenLV);								//ZUordnen der Beiden Open/Close Buttons zu Lefttop
	leftfront.appendChild(CloseLV);
	rightfront.appendChild(OpenRV);
	rightfront.appendChild(CloseRV);
	leftback.appendChild(OpenLH);
	leftback.appendChild(CloseLH);
	rightback.appendChild(OpenRH);
	rightback.appendChild(CloseRH);
	allw.appendChild(OpenAll);
	allw.appendChild(CloseAll);

	document.querySelector('main').addEventListener('click', FetchAction);
}

function FetchAction(event){
	
    var Klick = event.target.id;

    if ( Klick == "OpenLV"){
		fetch("http://192.168.178.82:5000/action/openLV");
        //fetch("http://192.168.0.65:5000/action/openLV");
        document.getElementById("OpenLV").style.backgroundColor = "green";
        document.getElementById("CloseLV").style.backgroundColor = "white";
		document.getElementById("CloseAll").style.backgroundColor = "white";
        console.log("LV opened");
    }
    else if ( Klick == "CloseLV"){
		fetch("http://192.168.178.82:5000/action/closeLV");
        //fetch("http://192.168.0.65:5000/action/closeLV");
        document.getElementById("CloseLV").style.backgroundColor = "red";
        document.getElementById("OpenLV").style.backgroundColor = "white";
		document.getElementById("OpenAll").style.backgroundColor = "white";
        console.log("LV closed");
    }
    else if ( Klick == "OpenLH"){
		fetch("http://192.168.178.82:5000/action/openLH");
        //fetch("http://192.168.0.65:5000/action/openLH");
        document.getElementById("OpenLH").style.backgroundColor = "green";
        document.getElementById("CloseLH").style.backgroundColor = "white";
		document.getElementById("CloseAll").style.backgroundColor = "white";
        console.log("LH opened");
    }
    else if ( Klick == "CloseLH"){
		fetch("http://192.168.178.82:5000/action/closeLH");
        //fetch("http://192.168.0.65:5000/action/closeLH");
        document.getElementById("CloseLH").style.backgroundColor = "red";
        document.getElementById("OpenLH").style.backgroundColor = "white";
		document.getElementById("OpenAll").style.backgroundColor = "white";
        console.log("LH closed");
	}
	else if ( Klick == "OpenRH"){
		fetch("http://192.168.178.82:5000/action/openRH");
        //fetch("http://192.168.0.65:5000/action/openRH");
        document.getElementById("OpenRH").style.backgroundColor = "green";
        document.getElementById("CloseRH").style.backgroundColor = "white";
		document.getElementById("CloseAll").style.backgroundColor = "white";
        console.log("RH opened");
	}
	else if ( Klick == "CloseRH"){
		fetch("http://192.168.178.82:5000/action/closeLH");
        //fetch("http://192.168.0.65:5000/action/closeLH");
        document.getElementById("CloseRH").style.backgroundColor = "red";
        document.getElementById("OpenRH").style.backgroundColor = "white";
		document.getElementById("OpenAll").style.backgroundColor = "white";
        console.log("RH closed");
	}
	else if ( Klick == "OpenRV"){
		fetch("http://192.168.178.82:5000/action/openRV");
        //fetch("http://192.168.0.65:5000/action/openRV");
        document.getElementById("OpenRV").style.backgroundColor = "green";
        document.getElementById("CloseRV").style.backgroundColor = "white";
		document.getElementById("CloseAll").style.backgroundColor = "white";
        console.log("RV opened");
	}
	else if ( Klick == "CloseRV"){
		fetch("http://192.168.178.82:5000/action/closeRV");
        //fetch("http://192.168.0.65:5000/action/closeRV");
        document.getElementById("CloseRV").style.backgroundColor = "red";
        document.getElementById("OpenRV").style.backgroundColor = "white";
		document.getElementById("OpenAll").style.backgroundColor = "white";
        console.log("RV closed");
	}
	else if ( Klick == "OpenAll"){
		fetch("http://192.168.178.82:5000/action/openall");
        //fetch("http://192.168.0.65:5000/action/openall");
        document.getElementById("OpenAll").style.backgroundColor = "green";
        document.getElementById("CloseAll").style.backgroundColor = "white";
		document.getElementById("OpenLV").style.backgroundColor = "green";
		document.getElementById("CloseLV").style.backgroundColor = "white";
		document.getElementById("OpenLH").style.backgroundColor = "green";
		document.getElementById("CloseLH").style.backgroundColor = "white";
		document.getElementById("OpenRH").style.backgroundColor = "green";
		document.getElementById("CloseRH").style.backgroundColor = "white";
		document.getElementById("OpenRV").style.backgroundColor = "green";
		document.getElementById("CloseRV").style.backgroundColor = "white";
		console.log("All Windows opened");
	}
	else if ( Klick == "CloseAll"){
		fetch("http://192.168.178.82:5000/action/closeall");
        //fetch("http://192.168.0.65:5000/action/closeall");
        document.getElementById("CloseAll").style.backgroundColor = "red";
        document.getElementById("OpenAll").style.backgroundColor = "white";
		document.getElementById("CloseLV").style.backgroundColor = "red";
		document.getElementById("OpenLV").style.backgroundColor = "white";
		document.getElementById("CloseLH").style.backgroundColor = "red";
		document.getElementById("OpenLH").style.backgroundColor = "white";
		document.getElementById("CloseRH").style.backgroundColor = "red";
		document.getElementById("OpenRH").style.backgroundColor = "white";
		document.getElementById("CloseRV").style.backgroundColor = "red";
		document.getElementById("OpenRV").style.backgroundColor = "white";
        console.log("All Windows closed");
	}
	else if ( Klick == "OpenCar"){
		fetch("http://192.168.178.82:5000/action/unlock");
        fetch("http://192.168.0.65:5000/action/unlock");
        document.getElementById("OpenCar").style.backgroundColor = "green";
        document.getElementById("LockCar").style.backgroundColor = "white";
        console.log("Car is unlocked");
	}
	else if ( Klick == "LockCar"){
		fetch("http://192.168.178.82:5000/action/lock");
        fetch("http://192.168.0.65:5000/action/lock");
        document.getElementById("LockCar").style.backgroundColor = "red";
        document.getElementById("OpenCar").style.backgroundColor = "white";
        console.log("Car is locked");
    }
};


function ShowSensor() {
	var mainElement = document.querySelector('main');
	mainElement.innerHTML = '';
	mainElement.style.gridTemplateAreas = "a b c", "d e f";
	mainElement.style.gridTemplateColumns = 'auto';
	mainElement.style.gridTemplateRows = 'auto';

	var Tmpsensor = document.createElement('div');
	var Hmdsensor = document.createElement('div');
	var Barsensor = document.createElement('div');
	var Gyrsensor = document.createElement('div');
	var ACCsensor = document.createElement('div');
	var Magsensor = document.createElement('div');
	Tmpsensor.classList.add('panel');
	Hmdsensor.classList.add('panel');
	Barsensor.classList.add('panel');
	Gyrsensor.classList.add('panel');
	ACCsensor.classList.add('panel');
	Magsensor.classList.add('panel');

	//setInterval(function () {
		//fetch("http://192.168.0.65:5000/status").then(function (response) {
			fetch("http://192.168.178.82:5000/status").then(function (response) {
			response.text().then(function (text) {
				console.log(text)
				var array = JSON.parse(text);

				var TmpData = document.createTextNode("Temperature" + ": " + array.temp.toFixed(2) + "°C")
				var HmdData = document.createTextNode("Humidity" + ": " + array.humidity.toFixed(2) + "%")
				var BarData = document.createTextNode("Barometric pressure" + ": " + array.pressure.toFixed(2) + "mbar")
				var GyrData = document.createTextNode("Gyroscope" + ": " + array.gyroscope + " ")
				var MagData = document.createTextNode("Magnetometer" + ": " + array.magnetometer + " ")
				var ACCData = document.createTextNode("Accelormeter" + ": " + array.accelormeter + " ")

				Tmpsensor.appendChild(TmpData);
				Hmdsensor.appendChild(HmdData);
				Barsensor.appendChild(BarData);
				Gyrsensor.appendChild(GyrData);
				Magsensor.appendChild(MagData);
				ACCsensor.appendChild(ACCData);

				mainElement.appendChild(Tmpsensor);
				mainElement.appendChild(Hmdsensor);
				mainElement.appendChild(Barsensor);
				mainElement.appendChild(Gyrsensor);
				mainElement.appendChild(Magsensor);
				mainElement.appendChild(ACCsensor);
			})
		})
	//}, 1000)
}
//******************************************************************
//*******************footerfunctions**********************************
//******************************************************************

document.querySelector('footer').addEventListener('click', handleHeaderClick);

function Playmusic() {
	//document.getElementById('Play').classList.add("StopMusic");
	//background-image: url('https://cdn.onlinewebfonts.com/svg/img_497514.png');
	if (Play.style.backgroundImage = "url(https://cdn3.iconfinder.com/data/icons/music-icons-4/100/pause-512.png)") {
		Play.style.backgroundImage = "url(https://cdn.onlinewebfonts.com/svg/img_497514.png)";
	} else if (document.getElementById('Play').style.backgroundImage = "url(https://cdn.onlinewebfonts.com/svg/img_497514.png)") {
		Play.style.backgroundImage = "url(https://cdn3.iconfinder.com/data/icons/music-icons-4/100/pause-512.png)";
	}
	/* document.getElementById("Play").addEventListener('click', function(evt) {
		var target = evt.target;
		if (target.style.backgroundImage = "url(https://cdn3.iconfinder.com/data/icons/music-icons-4/100/pause-512.png)") {
			target.style.backgroundImage = "url(https://cdn.onlinewebfonts.com/svg/img_497514.png)";
			console.log("Hello");
		} else if (target.style.backgroundImage = "url(https://cdn.onlinewebfonts.com/svg/img_497514.png)") {
			target.style.backgroundImage = "url(https://cdn3.iconfinder.com/data/icons/music-icons-4/100/pause-512.png)";
			console.log("BYe");
		}  else {
		target.style.backgroundImage = "";
			target.style.backgroundImage = "";
			console.log("BYe");
	  }
	}, false); */
}
//window.onload = function(){
function GoHome() {			// neuladen der Seite
	/* console.log(template);
	var mainElement = document.querySelector('main');
	mainElement.innerHTML = '';
	var temp = document.getElementsByName("template")[0];
	var clon = template.content.cloneNode(true);
	document.mainElement[0].appendChild(clon); */
	//window.location.href = "../index.html";
	location.reload();
	//location.reload(true); // lädt Seite nicht aus dem Cache
}
//}