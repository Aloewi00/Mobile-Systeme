//******************************************************************
//*******************headfunctions**********************************
//******************************************************************

function showTemp(){
	fetch("http://192.168.178.82:5000/status").then(function (response) {
		response.text().then(function (text) {
				console.log(text)
				var array = JSON.parse(text);	 		
				let TmpData = document.createTextNode(array.temp.toFixed(2) + "°C"); //  "Ausgabe-Stil" Temperatur
				Temp.appendChild(TmpData);
		})
	})		
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
	mainElement.style.gridTemplateAreas = "a a a";
	mainElement.style.gridTemplateColumns = 'auto';
	mainElement.style.gridTemplateRows = '100vh';
	console.log("Maps");	
}

function ShowMusic() {
	let mainElement = document.querySelector('main');
	mainElement.innerHTML = '';
	mainElement.style.gridTemplateAreas = "a a a";
	mainElement.style.gridTemplateColumns = 'auto';
	mainElement.style.gridTemplateRows = '100vh';
	console.log("Music");	
}

function ShowSettings() {
	let mainElement = document.querySelector('main');
	mainElement.innerHTML = '';
	mainElement.style.gridTemplateAreas = "a a a";
	mainElement.style.gridTemplateColumns = 'auto';
	mainElement.style.gridTemplateRows = '100vh';
	console.log("Settings");	
}

function ShowGeneral() {
	let mainElement = document.querySelector('main');
	mainElement.innerHTML = '';
	mainElement.style.gridTemplateAreas = "a a a";
	mainElement.style.gridTemplateColumns = 'auto';
	mainElement.style.gridTemplateRows = '100vh';
	console.log("hallo");

	fetch("http://192.168.178.82:5000/status").then(function (response) {
		response.text().then(function (text) {
			console.log(text)
			var array = JSON.parse(text);
			console.log(array.consumption);

			let speed = document.createElement('div');
			speed.classList.add('speed');
			let speedicon = document.createElement('img');
			speedicon.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5CsuKPhbLJUGzzBhzCogA1L1_99Fjfk6neB_m9irKBs3Tjg9x&s";

			let consumption = document.createElement('div');
			consumption.classList.add('consumption');
			let consumptionicon = document.createElement('img');
			//consumptionicon.src = "https://www.android-user.de/wp-content/uploads/2015/08/icon-fuelio.png";

			let fuel = document.createElement('div');
			fuel.classList.add('fuel');
			let fuelicon = document.createElement('img');
			fuelicon.src = "";

			let speedData = document.createTextNode("Speed" + ": " + array.speed + " km/h");
			let consumptionData = document.createTextNode("Consumption" + ": " + array.consumption + " l/100km");
			let fuelData = document.createTextNode("Fuel" + ": " + array.remainingfuel + " %");

			speed.appendChild(speedicon);
			consumption.appendChild(consumptionicon);
			fuel.appendChild(fuelicon);

			speed.appendChild(speedData);
			consumption.appendChild(consumptionData);
			fuel.appendChild(fuelData);

			mainElement.appendChild(speed);
			mainElement.appendChild(consumption);
			mainElement.appendChild(fuel);

			mainElement.addEventListener('click', handleMainClick);
		})
	})
}

//document.querySelector('main').addEventListener('click', handleHeaderClick);

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
	
	let OpenCar = document.createElement('button');			//erstellen der Open/Close Button + Zuordnen der CSS-class-list
	let LockCar = document.createElement('button');
	OpenCar.innerHTML = 'Open';
	OpenCar.classList.add('CarOpen');
	LockCar.innerHTML = 'Lock';
	LockCar.classList.add('CarClose');
	
	let lefttop = document.createElement('div');		//erstellen der 5 divs für Windows + Zuordnen der CSS-class-list
	let leftback = document.createElement('div');
	let rightback = document.createElement('div');
	let righttop = document.createElement('div');
	let allw = document.createElement('div');
	allw.classList.add('windowdiv');
	allw.innerHTML = 'All Windows';
	lefttop.classList.add('windowdiv');				
	lefttop.innerHTML = 'Left Top';
	righttop.classList.add('windowdiv');
	righttop.innerHTML = 'Right Top';
	leftback.classList.add('windowdiv');
	leftback.innerHTML = 'Left Back';
	rightback.classList.add('windowdiv');
	rightback.innerHTML = 'Right Back';
	
	let OpenLT = document.createElement('button');			//erstellen der Open/Close Button für Windows + Zuordnen der CSS-class-list
	let CloseLT = document.createElement('button');
	let OpenRT = document.createElement('button');
	let CloseRT = document.createElement('button');
	let OpenLB = document.createElement('button');
	let CloseLB = document.createElement('button');
	let OpenRB = document.createElement('button');
	let CloseRB = document.createElement('button');
	let OpenA = document.createElement('button');
	let CloseA = document.createElement('button');
	OpenLT.innerHTML = 'Open';
	OpenLT.classList.add('WindowOpen');
	CloseLT.innerHTML = 'Close';
	CloseLT.classList.add('WindowClose');	
	OpenRT.innerHTML = 'Open';
	OpenRT.classList.add('WindowOpen');
	CloseRT.innerHTML = 'Close';
	CloseRT.classList.add('WindowClose');
	OpenLB.innerHTML = 'Open';
	OpenLB.classList.add('WindowOpen');
	CloseLB.innerHTML = 'Close';
	CloseLB.classList.add('WindowClose');
	OpenRB.innerHTML = 'Open';
	OpenRB.classList.add('WindowOpen');
	CloseRB.innerHTML = 'Close';
	CloseRB.classList.add('WindowClose');
	OpenA.innerHTML = 'Open';
	OpenA.classList.add('WindowOpen');
	CloseA.innerHTML = 'Close';
	CloseA.classList.add('WindowClose');
	
	mainElement.appendChild(divElement1);					//Zuordnen der beiden divs zum Mainelement
	mainElement.appendChild(divElement2);
	divElement1.appendChild(OpenCar);						//ZUordnen der Beiden Open/Close Buttons zu Car Lock
	divElement1.appendChild(LockCar);
	divElement2.appendChild(allw);							//ZUordnen der 5 divs für Windows zu Windows
	divElement2.appendChild(lefttop);
	divElement2.appendChild(righttop);	
	divElement2.appendChild(leftback);
	divElement2.appendChild(rightback);
	lefttop.appendChild(OpenLT);								//ZUordnen der Beiden Open/Close Buttons zu Lefttop
	lefttop.appendChild(CloseLT);
	righttop.appendChild(OpenRT);								
	righttop.appendChild(CloseRT);
	leftback.appendChild(OpenLB);								
	leftback.appendChild(CloseLB);
	rightback.appendChild(OpenRB);								
	rightback.appendChild(CloseRB);
	allw.appendChild(OpenA);								
	allw.appendChild(CloseA);
	
	function handleHeaderClick(event) {
	switch (event.target.id) {
		case 'OpenCar':
			lock();
			break;
		case 'LockCar':
			unlock();
			break;
	}
}
	
	function lock(){
		fetch("http://192.168.178.82:5000/action/lock")
		LockCar.style.background = "red";		
	}
	
	//function unlock(){
		fetch("http://192.168.178.82:5000/action/unlock")
		OpenCar.style.background = "green";		
	//}
	document.querySelector('main').addEventListener('click', handleHeaderClick);
}
	
function ShowSensor(){
	let mainElement = document.querySelector('main');
	mainElement.innerHTML = '';
	mainElement.style.gridTemplateAreas = "a b c", "d e f";
	mainElement.style.gridTemplateColumns = 'auto';
	mainElement.style.gridTemplateRows = 'auto';
	
	fetch("http://192.168.178.82:5000/status").then(function (response) {
		response.text().then(function (text) {
			console.log(text)
			var array = JSON.parse(text);

	let Tmpsensor = document.createElement('div');
	let Hmdsensor = document.createElement('div');
	let Barsensor = document.createElement('div');
	let Gyrsensor = document.createElement('div');
	let ACCsensor = document.createElement('div');
	let Magsensor = document.createElement('div');
	let CarlockOpenElement = document.createElement('div');
	let CarlockCloseElement = document.createElement('div')
	Tmpsensor.classList.add('panel');
	Hmdsensor.classList.add('panel');
	Barsensor.classList.add('panel');
	Gyrsensor.classList.add('panel');
	ACCsensor.classList.add('panel');
	Magsensor.classList.add('panel');
	
	let TmpData = document.createTextNode("Temperature" + ": " + array.temp.toFixed(2) + "°C");
	let HmdData = document.createTextNode("Humidity" + ": " + array.humidity.toFixed(2) + "%");
	let BarData = document.createTextNode("Barometric pressure" + ": " + array.pressure.toFixed(2) + "mbar");
	let GyrData = document.createTextNode("Gyroscope" + ": " + array.gyroscope + " ");
	let MagData = document.createTextNode("Magnetometer" + ": " + array.magnetometer + " ");
	let ACCData = document.createTextNode("Accelormeter" + ": " + array.accelormeter + " ");

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
}

document.querySelector('footer').addEventListener('click', handleHeaderClick);

function Playmusic() {
	//document.getElementById('Play').classList.add("StopMusic");
	//background-image: url('https://cdn.onlinewebfonts.com/svg/img_497514.png');
	if (document.getElementById("Play").style.backgroundImage = "url(https://cdn3.iconfinder.com/data/icons/music-icons-4/100/pause-512.png)") {
		document.getElementById("Play").style.backgroundImage = "url(https://cdn.onlinewebfonts.com/svg/img_497514.png)";
	}
	else {
		document.getElementById("Play").style.backgroundImage = "url(https://cdn3.iconfinder.com/data/icons/music-icons-4/100/pause-512.png)";
	}
	return
}

function GoHome() {			// neuladen der Seite
	location.reload();		
	//location.reload(true); // lädt Seite nicht aus dem Cache
}