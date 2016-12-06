//greener-house-device.project.kinoma.marvell.com
// Skinslet blackSkin = new Skin ({fill: 'black'});let whiteSkin = new Skin ({fill: 'white'});let greenSkin = new Skin ({fill: '#5CA05C'}); 
// Irrigation representationlet dripOn = "assets/irrigation_on.png";let dripOff = "assets/irrigation_off.png";// Fontsvar titleW = new Style({font: 'bold 18px', color: 'white'});var titleB = new Style({font: 'bold 18px', color: 'black'});var titleG = new Style({font: 'bold 20px', color: '#216C21'});var regularW = new Style({font: '20px', color: 'white'});var regularB = new Style({font: '20px', color: 'black'});var regularG = new Style({font: '20px', color: '#216C21'});var regularR = new Style({font: '20px', color: 'red'});var smallB = new Style({font: '12px', color: 'black'});var midB = new Style({font: '18px', color: 'black'});var largeB = new Style({font: 'bold 25px', color: 'black'});var waterCanIcons = [];
var irrigationState = [0,0,0,0,0,0];

// Greenhouse conditions
export var currTemperature = 0;
export var currHumidity = 0;
export var currAirflow = 0;
export var currSunlight = 0;

// Info icons
let off = "assets/off.png";
let on = "assets/on.png";
var settingsIcon = "assets/settings.png";
let inProgress = "assets/in_progress.png";
var airflowIcon = off;
var lightIcon = off;
var humidityIcon = "";
var temperatureIcon = "";
var degree = "F";
var connected = false;

// Update info frequency in miliseconds
export var updateFreq = 2123;// Screen layout
let padding = 10;export var Home = Container.template($ => ({	left: 0, right: 0, top: padding * 2, bottom: 0, skin: whiteSkin,	contents: [
			// Grass image
		Picture($, {
   			left: 0, right: undefined, top: undefined, bottom: 0, 
   			height: 150, width: 400, url: "assets/grass.png",
   		}),
   				Column($, { left: 0, right: 0, top: 0, bottom: 0,			contents: [
								// Current info				new CurrInfo,								// Sunlight diagram				new IrrigationDiagram			]		}),	]}));
// Current conditions inside the greenhouse.var CurrInfo = Column.template($ => ({	left: 0, right: 0, top: 0, bottom: 0,	contents: [			new Label ({ left: 0, right: 0, top: 0, bottom: undefined, style: titleB, 			string: "Current Conditions"		}),				Line($, {			left: padding, right: padding, top: padding, bottom: 0,			contents: [						     					new InfoType({name: "Sunlight", status: off, img: "assets/sun_y.png", measure: "%", value: currSunlight}),				new InfoType({name: "Airflow", status: off, img: "assets/airflow.png", measure: "%", value: currAirflow}),			]		}),				Line($, {			left: padding, right: padding, top: padding * 2, bottom: 0,			contents: [ 				new InfoType({name: "Humidity", status: "", img: "assets/humidity.png", measure: "%", value: currHumidity}),				new InfoType({name: "Temperature", status: "", img: "assets/temp_r.png", measure: degree, value: currTemperature}),			]		}),	]})); 

var InfoType = Container.template($ => ({
	left: 0, right: undefined, top: 0, bottom: 0, width: padding * 15, height: padding * 5,
	contents: [
	 
		Picture($, {			left: undefined, right: padding * 2, top: 0, bottom: undefined,
			width: 24, height: 24,			Behavior: class extends Behavior{				updateState(container, url) {
					if ($.name == "Sunlight") {container.url = lightIcon;}
					else if ($.name == "Airflow") {container.url = airflowIcon;}
					else if ($.name == "Humidity") {container.url = humidityIcon;}
					else if ($.name == "Temperature") {container.url = temperatureIcon;}				}			}	   		}),  
				
		Column($, {
			left: 0, right: 0, top: 0, bottom: 0,
			contents: [
			
				Label($, {
					left: padding, right: undefined, top: 0, bottom: 0, style: largeB, string: Math.round($.value) + $.measure,
					Behavior: class extends Behavior{						updateState(container, string) {
							if ($.name == "Sunlight") {container.string = container.string = Math.round(currSunlight) + $.measure;}
							else if ($.name == "Airflow") {container.string = container.string = Math.round(currAirflow) + $.measure;}
							else if ($.name == "Humidity") {container.string = container.string = Math.round(currHumidity) + $.measure;}
							else if ($.name == "Temperature") {container.string = container.string = Math.round(currTemperature) + degree;}							}					}	
				}), 
		
				Line($, {
					left:0, right: 0, top: padding / 2, bottom: 0,
					contents: [
						new Picture({left: padding, right: undefined, top: 0, bottom: 0,
							height: 24, width: 24, url: $.img}),
						
						
						new Label({ left: padding, right: undefined, top: 0, bottom: 0,	
							style: midB, string: $.name,
						}),
					]
				}),
			]
		}),
	]
}));

// Irrigation state diagram
var IrrigationDiagram = Container.template($ => ({
	left: 0, right: 0, top: undefined, bottom: undefined, height: padding * 8,
	contents: [
	
		Picture($, {
   			left: 0, right: 0, top: undefined, bottom: 0, 
   			height: 60, width: 250, url: "assets/layout.png",
   		}),
   		
		Column($, {
			left: padding * 3, right: padding * 3, top: 0, bottom: 0,
			contents: [
			
				Label($, {
					left: 0, right: 0, top: 0, bottom: undefined, style: titleB, string: "Current Irrigation",
				}),
				
				Line($, {
		  			left: padding * 3, right: padding * 3, top: 0, bottom: 0, height: padding * 3,
					contents: [			
						waterCanIcons[0] = new waterCan({}),
						waterCanIcons[1] = new waterCan({}),
						waterCanIcons[2] = new waterCan({}),
					]
			    }),
			  
			  	Line($, {
			  		left: padding * 3, right: padding * 3, top: 0, bottom: 0, height: padding * 3,
					contents: [
						waterCanIcons[3] = new waterCan({}),
						waterCanIcons[4] = new waterCan({}),
						waterCanIcons[5] = new waterCan({}),
					]
			  	}),
			]
		}),	
	]
}));

// Adjust on/off/in-progress icons
function adjustInfoIcons() {
	// Airflow icon
	if (fanState == 1) {airflowIcon = on;} 
	else {airflowIcon = off;}
	
	// Light icon
	if (sunlightState == 1) {lightIcon = on;} 
	else {lightIcon = off;}
	
	// Humidity icon
	if (humidityState == 1) {humidityIcon = inProgress;} 
	else {humidityIcon = "";}
	
	// Temperature icon
	if (heaterState == 1) {temperatureIcon = inProgress;} 
	else {temperatureIcon = "";}
}

// Water can image
var waterCan = Container.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0,
	contents: [
		Picture($, { 
			top: undefined, bottom: undefined, left: 0, right: 0, name: "water_can",
        	height: 24, width: 24, url: "assets/irrigation_off.png",
        })
	]
}));

// Changes the water cans depending on irrigation state
function adjustWaterCanIcons(){
	for (var i = 0; i < irrigationState.length; i++) {
		if (irrigationState[i] < 1) {
			waterCanIcons[i].water_can.url = dripOff;
		} else {
			waterCanIcons[i].water_can.url = dripOn;
		}
	}
}

// Top bar
var TopBar = Line.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: undefined, height: padding * 2, skin: greenSkin,    contents: [
		// Greenhouse's name        new Label({left: 0, right: 0, top: 0, bottom: 0,
        	style: titleW, string: "GreenerHouse",
        }),    ]}));

Handler.bind("/connect", Behavior({    onInvoke: function(handler, message){
    	connected = true;
    	enablePins();        message.status = 200;    }}));Handler.bind("/sunlightOn", Behavior({    onInvoke: function(handler, message){
    	lightIcon = on;        message.status = 200;    }}));
Handler.bind("/sunlightOff", Behavior({    onInvoke: function(handler, message){
    	lightIcon = off;        message.status = 200;    }}));
Handler.bind("/fanOn", Behavior({    onInvoke: function(handler, message){
    	airflowIcon = on;        message.status = 200;    }}));
Handler.bind("/fanOff", Behavior({    onInvoke: function(handler, message){
    	airflowIcon = off;        message.status = 200;    }}));
Handler.bind("/humidityOn", Behavior({    onInvoke: function(handler, message){
    	humidityIcon = inProgress;        message.status = 200;    }}));
Handler.bind("/humidityOff", Behavior({    onInvoke: function(handler, message){
    	humidityIcon = "";        message.status = 200;    }}));
Handler.bind("/tempOn", Behavior({    onInvoke: function(handler, message){
    	temperatureIcon = inProgress;        message.status = 200;    }}));
Handler.bind("/tempOff", Behavior({    onInvoke: function(handler, message){
    	temperatureIcon = "";        message.status = 200;    }}));Handler.bind("/irrigation0On", Behavior({    onInvoke: function(handler, message){
    	irrigationState[0] = 1;
    	waterCanIcons[0].water_can.url = dripOn;        message.status = 200;    }}));
Handler.bind("/irrigation0Off", Behavior({    onInvoke: function(handler, message){
    	irrigationState[0] = 0;
    	waterCanIcons[0].water_can.url = dripOff;        message.status = 200;    }}));
Handler.bind("/irrigation1On", Behavior({    onInvoke: function(handler, message){
    	irrigationState[1] = 1;
    	waterCanIcons[1].water_can.url = dripOn;        message.status = 200;    }}));
Handler.bind("/irrigation1Off", Behavior({    onInvoke: function(handler, message){
    	irrigationState[1] = 0;
    	waterCanIcons[1].water_can.url = dripOff;        message.status = 200;    }}));
Handler.bind("/irrigation2On", Behavior({    onInvoke: function(handler, message){
    	irrigationState[2] = 1;
    	waterCanIcons[2].water_can.url = dripOn;        message.status = 200;    }}));
Handler.bind("/irrigation2Off", Behavior({    onInvoke: function(handler, message){
    	irrigationState[2] = 0;
    	waterCanIcons[2].water_can.url = dripOff;        message.status = 200;    }}));
Handler.bind("/irrigation3On", Behavior({    onInvoke: function(handler, message){
    	irrigationState[3] = 1;
    	waterCanIcons[3].water_can.url = dripOn;        message.status = 200;    }}));
Handler.bind("/irrigation3Off", Behavior({    onInvoke: function(handler, message){
    	irrigationState[3] = 0;
    	waterCanIcons[3].water_can.url = dripOff;        message.status = 200;    }}));
Handler.bind("/irrigation4On", Behavior({    onInvoke: function(handler, message){
    	irrigationState[4] = 1;
    	waterCanIcons[4].water_can.url = dripOn;        message.status = 200;    }}));
Handler.bind("/irrigation4Off", Behavior({    onInvoke: function(handler, message){
    	irrigationState[4] = 0;
    	waterCanIcons[4].water_can.url = dripOff;        message.status = 200;    }}));
Handler.bind("/irrigation5On", Behavior({    onInvoke: function(handler, message){
    	irrigationState[5] = 1;
    	waterCanIcons[5].water_can.url = dripOn;        message.status = 200;    }}));
Handler.bind("/irrigation5Off", Behavior({    onInvoke: function(handler, message){
    	irrigationState[5] = 0;
    	waterCanIcons[5].water_can.url = dripOff;        message.status = 200;    }}));
Handler.bind("/changeDegree", Behavior({    onInvoke: function(handler, message){		if (degree == "F") {
			degree = "C";
			currTemperature = (currTemperature - 32) * (5 / 9);
	        currTemperature = Math.round(currTemperature);
		} else {
			degree = "F";
			currTemperature = currTemperature * (9 / 5) + 32;
	        currTemperature = Math.round(currTemperature);
		}        message.status = 200;    }}));

function enablePins() {
	Pins.repeat("/Temperature/read", updateFreq, function(result) {
    	if (result && degree == "F") {
			currTemperature = result * 100 + 20;		} else if (result && degree == "C") {
			currTemperature = result * 100 - 45;
			if (currTemperature < -20) {
				currTemperature = -20;
			}		} 
		application.distribute("updateState");	});
    Pins.repeat("/Sunlight/read", updateFreq, function(result) {        if (result) {
           currSunlight = result * 100;        }    });
    Pins.repeat("/Humidity/read", updateFreq, function(result) {        if (result) {
           currHumidity = result * 100;          }    });
    Pins.repeat("/Airflow/read", updateFreq, function(result) {        if (result) {
           currAirflow = result * 100;        }    });
}

var currentScreen = new Home();
let Pins = require("pins");

/* Application definition */
class AppBehavior extends Behavior {	onLaunch(application) {
		application.shared = true;
		
      	// Pins configuration
      	Pins.configure({            Fans: {                require: "Digital",                pins: {                    ground: { pin: 51, type: "Ground" },                    digital: { pin: 52, direction: "output" }                }            },
            Irrigation: {                require: "Digital",                pins: {                    ground: { pin: 53, type: "Ground" },                    digital: { pin: 54, direction: "output" }                }            },
            Temperature: {
            	require: "Analog",
            	pins: {
            		power: {pin: 55, type: "Power", voltage: 3.3},					analog: {pin: 56, type: "Analog", direction: "input"},					ground: {pin: 57, type: "Ground"}
            	}	
            },  
            Humidity: {
            	require: "Analog",
            	pins: {
            		power: {pin: 58, type: "Power", voltage: 3.3},					analog: {pin: 59, type: "Analog", direction: "input"},					ground: {pin: 60, type: "Ground"}
            	}	
            },
            Sunlight: {
            	require: "Analog",
            	pins: {
            		power: {pin: 61, type: "Power", voltage: 3.3},					analog: {pin: 62, type: "Analog", direction: "input"},					ground: {pin: 63, type: "Ground"}
            	}	
            },
            Airflow: {
            	require: "Analog",
            	pins: {
            		power: {pin: 64, type: "Power", voltage: 3.3},					analog: {pin: 65, type: "Analog", direction: "input"},					ground: {pin: 66, type: "Ground"}
            	}	
            },         }, function(success) {           		if (!success) {trace("Failed to configure\n");}
           		else {
           			
           			Pins.share("ws", {zeroconf: true, name: "pins-share"});
           		}        });
      	
		// Adds the top bar and current screen.
		application.add(new TopBar());		application.add(currentScreen); 
		application.distribute("updateState");      	}
	onQuit(application) {        application.shared = false;    }
}
application.behavior = new AppBehavior();
