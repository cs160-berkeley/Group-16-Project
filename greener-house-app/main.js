// Import layouts from other files and pins
import { SunlightScreen } from "sunlight";
import { TemperatureScreen } from "temperature";
import { VentilationScreen, fanState } from "ventilation";
import { IrrigationScreen } from "irrigation";
import { Drawer, ghAroundScreen } from "drawer";
import Pins from "pins";
import { CrossFade, Push, Flip, TimeTravel } from 'transition';

// Skins
let graySkin = new Skin ({fill: '#999999'});
let greenSkin = new Skin ({fill: '#71e28b'});
let navBarSkin = new Skin({
let fanWhiteSkin = new Skin({
let fanGreenSkin = new Skin({

// Fonts
var titleB = new Style({font: 'bold 20px', color: 'black'});
var titleG = new Style({font: 'bold 20px', color: '#71e28b'});
var regularW = new Style({font: '20px', color: 'white'});
var regularB = new Style({font: '20px', color: 'black'});
var regularG = new Style({font: '20px', color: '#71e28b'});
var smallB = new Style({font: '12px', color: 'black'});

// Screen layout sizes
export var name_h = 50;
export var naviBar_h = 60;
export let padding = 10;


// Info variables
export var currTemperature = 86;
export var currSunlight = 55;
export var currHumidity = 62;
export var currAirFlow = 15;
export var greenhouseNum = 1;

// Nav buttons icons
var sunlightBtn = "assets/sun.png";
var temperatureBtn = "assets/temp.png";
var homeBtn = "assets/home_g.png";
var ventilationBtn = "assets/fan.png";
var irrigationBtn = "assets/irrigation.png";
var addBtnIcon = "assets/settings.png";

// State variables
export var greenhouses = [];
export var UVLights = {};
export var heater = false;
export var drawerState = "closed";
export var drawerScreen = new Drawer();

var fanIcons = [];

// Screen layout
	
		Column($, { left: 0, right: 0, top: 0, bottom: 0,
			contents: [
				// Current info
				new CurrInfo,
				
				// Sunlight diagram
				new FanDiagram
			]
		}),
	]

// Current conditions inside the greenhouse.
var CurrInfo = Column.template($ => ({
	left: 0, right: 0, top: 0, bottom: undefined, height: 250,
	contents: [
	
		new Label ({ left: padding, right: undefined, top: padding, style: titleG, 
			string: "Current info:"
		}),
		Line($, {
			left: 0, right: 0, top: padding, bottom: 0, skin: navBarSkin,
			contents: [
				new Picture({left: padding, right: undefined, top: 0, bottom: 0, 
					url: "assets/sun_b.png", height: 32, width: 32,
				}),
				Label($, {
					left: padding, right: undefined, top: 0, bottom: 0, style: regularB,
					Behavior: class extends Behavior{
				}),
			]
		}),
		Line($, {
			left: 0, right: 0, top: 0, bottom: 0, skin: navBarSkin,
			contents: [
				new Picture({left: padding, right: undefined, top: 0, bottom: 0, 
					url: "assets/temp_b.png", height: 32, width: 32,
				}),
				Label($, {
					left: padding, right: undefined, top: 0, bottom: 0, style: regularB,
					Behavior: class extends Behavior{
				}),
			]
		}),
		Line($, {
			left: 0, right: 0, top: 0, bottom: 0, skin: navBarSkin,
			contents: [
				new Picture({left: padding, right: undefined, top: 0, bottom: 0, 
					url: "assets/humidity.png", height: 32, width: 32,
				}),
				Label($, {
					left: padding, right: undefined, top: 0, bottom: 0, style: regularB,
					Behavior: class extends Behavior{
				}),
			]
		}),
		Line($, {
			left: 0, right: 0, top: 0, bottom: 0, skin: navBarSkin,
			contents: [
				new Picture({left: padding, right: undefined, top: 0, bottom: 0, 
					url: "assets/airflow.png", height: 32, width: 32,
				}),
				Label($, {
					left: padding, right: undefined, top: 0, bottom: 0, style: regularB,
					Behavior: class extends Behavior{
				}),
			]
		}),
		/*
		new Label ({ left: 0, right: 0, top: padding, style: titleG, 
			string: "Current info"
		}),
	
		Line($, {
			left: 0, right: 0, top: padding, bottom: 0,
			contents: [
			
				Column($, {
					left: 0, right: 0, top: 0, bottom: 0,
					contents: [
					
					
						new Picture({left: 0, right: 0, top: 0, bottom: 0, url: "assets/sun_b.png"}),
						Label($, {
							left: 0, right: 0, top: 0, bottom: 0, style: regularB, string: "Sunlight: " + Math.round(currSunlight) + "%",
							Behavior: class extends Behavior{
						}),
					]
				}),
				
				Column($, {
					left: 0, right: 0, top: 0, bottom: 0,
					contents: [
					
					
						new Picture({left: 0, right: 0, top: 0, bottom: 0, url: "assets/temp_b.png"}),
						Label($, {
							left: 0, right: 0, top: 0, bottom: 0, style: regularB, string: "Temperature: " + Math.round(currTemperature) + " F",
							Behavior: class extends Behavior{
						}),
					]
				}),
			]
		}),
		Line($, {
			left: 0, right: 0, top: 0, bottom: 0,
			contents: [
			
				Column($, {
					left: 0, right: 0, top: 0, bottom: 0,
					contents: [
					
					
						new Picture({left: 0, right: 0, top: 0, bottom: 0, url: "assets/humidity.png"}),
						Label($, {
							left: 0, right: 0, top: 0, bottom: 0, style: regularB, string: "Humidity: " + Math.round(currHumidity) + "%",
							Behavior: class extends Behavior{
						}),
					]
				}),
				
				Column($, {
					left: 0, right: 0, top: 0, bottom: 0,
					contents: [
					
					
						new Picture({left: 0, right: 0, top: 0, bottom: 0, url: "assets/airflow.png"}),
						Label($, {
							left: 0, right: 0, top: 0, bottom: 0, style: regularB, string: "Airflow: " + Math.round(currAirFlow) + "%",
							Behavior: class extends Behavior{
						}),
					]
				}),
			]
		}),*/
	]
}));

// Sunlight over a day.
var FanDiagram = Column.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0, height: Home.height / 2, skin: navBarSkin,
	contents: [
	
		new Label({ left: 10, right: undefined, top: padding, bottom : 0, 
			style: titleG, string: "Current fans state: "
		}),
		
		Line($, {
	  		left: 10, right: 10, top: 10, bottom: 0,
			contents: [			
				fanIcons[0] = new Fan({skin: fanWhiteSkin, id: 0}),
				fanIcons[1] = new Fan({skin: fanWhiteSkin, id: 1}),
				fanIcons[2] = new Fan({skin: fanWhiteSkin, id: 2}),
			]
	    }),
	  
	  	Line($, {
	  		left: 10, right: 10, top: 0, bottom: 10,
			contents: [
				fanIcons[3] = new Fan({skin: fanWhiteSkin, id: 3}),
				fanIcons[4] = new Fan({skin: fanWhiteSkin, id: 4}),
				fanIcons[5] = new Fan({skin: fanWhiteSkin, id: 5}),
			]
	  	}),
	]
}));

var Fan = Column.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0, skin: $.skin, id: $.id,
	contents: [
		Label($, {
			left: 0, right: 0, top: 0, bottom: 0, 
			style: regularB, string: fanState[$.id],
		}),
	],
}));

//navigation buttons
var navBtn = Picture.template($ => ({
	height: 32, width: 32, active: true, url: $.img,
	
	behavior: Behavior({
            
            adjustNavButtons($.id);
            application.remove(currentScreen);
			currentScreen = new $.nextScreen;
            application.distribute("updateNavButtons");
        updateNavButtons(container, url) {	
			if ($.id == 1) {
				container.url = sunlightBtn;
			} else if ($.id == 2) {
				container.url = temperatureBtn;
				application.distribute("updateCurrTemp");
				application.distribute("adjustTempSlider");
			} else if ($.id == 0) {
				container.url = homeBtn;
				application.distribute("updateState");
				adjustFanIcons();
			} else if ($.id == 3) {
				container.url = ventilationBtn;
				application.distribute("adjustVentSlider", 0);
			} else if ($.id == 4) {
				container.url = irrigationBtn;
			}
			application.distribute("updateDrawer");
		updateDrawer() {
			if (drawerState == "open") {
            	application.remove(drawerScreen);
            	drawerState = "closed";
            	addBtnIcon = "assets/settings.png";
            	application.distribute("updateSettingsBtn");
            }
		},

// Changes the fans bg depending on state
export function adjustFanIcons(){
	for (var i = 0; i < fanState.length; i++) {
		if (fanState[i] > 0) {
			fanIcons[i].skin = fanGreenSkin;
		} else {
			fanIcons[i].skin = fanWhiteSkin;
		}
	}
}

// Update button
let updateBtn = Container.template($ => ({
    
    behavior: Behavior({
            application.distribute("getTemperature");
            application.distribute("getHumidity");
            
            // fetch info from device and update on screen
            application.distribute("updateInfo");
        updateInfo(container) {
         
            setCurrentState();
        style: regularW, string: "update" })

// add greenhouse button
let settingsBtn = Container.template($ => ({
    width: 50, active: true,
    
    behavior: Behavior({
            // Opening or closing drawer
            if (drawerState == "closed") {
            	application.add(drawerScreen);
            	drawerState = "open";
            	addBtnIcon = "assets/back.png";
            } else {
            	application.remove(drawerScreen);
            	drawerState = "closed";
            	addBtnIcon = "assets/settings.png";
            }
            application.distribute("updateSettingsBtn");
        right: undefined, url: addBtnIcon,
	        Behavior: class extends Behavior{
        })

// Transition for the side drawer.
/*let transitioningBehavior = Behavior({
*/

export function adjustNavButtons(id) {
	
	if (id == 1) {
		sunlightBtn = "assets/sun_g.png";
		temperatureBtn = "assets/temp.png";
		homeBtn = "assets/home.png";
		ventilationBtn = "assets/fan.png";
		irrigationBtn = "assets/irrigation.png";
	} else if (id == 2) {
		sunlightBtn = "assets/sun.png";
		temperatureBtn = "assets/temp_g.png";
		homeBtn = "assets/home.png";
		ventilationBtn = "assets/fan.png";
		irrigationBtn = "assets/irrigation.png";
	} else if (id == 0) {
		sunlightBtn = "assets/sun.png";
		temperatureBtn = "assets/temp.png";
		homeBtn = "assets/home_g.png";
		ventilationBtn = "assets/fan.png";
		irrigationBtn = "assets/irrigation.png";
	} else if (id == 3) {
		sunlightBtn = "assets/sun.png";
		temperatureBtn = "assets/temp.png";
		homeBtn = "assets/home.png";
		ventilationBtn = "assets/fan_g.png";
		irrigationBtn = "assets/irrigation.png";
	} else if (id == 4) {
		sunlightBtn = "assets/sun.png";
		temperatureBtn = "assets/temp.png";
		homeBtn = "assets/home.png";
		ventilationBtn = "assets/fan.png";
		irrigationBtn = "assets/irrigation_g.png";
	}
}

// App's top bar.
var TopBar = Line.template($ => ({ left: 0, right: 0, top: 0, height: name_h, skin: graySkin,
    	// add greenhouse button
		new settingsBtn({}),
		
		// Greenhouse's name
        	style: regularW, string: "Greenhouse " + greenhouseNum,
        	Behavior: class extends Behavior{
        }),
        
        // Update button
		//new updateBtn({}),

// Navigation bar
var NavBar = new Line({ left: 0, right: 0, bottom: 0, 
	skin: navBarSkin, height: naviBar_h,
    	new Column({left: 0, right: 0, top: 0, bottom: 0,
    		contents: [
    			new navBtn({nextScreen: Home, img: homeBtn, id: 0}),
    			new Label({left: 0, right: 0, top: 0, bottom: 0, 
    				style: smallB, string: "Home",
    			}),
    		]
    	}),
    	new Column({left: 0, right: 0, top: 0, bottom: 0,
    		contents: [
    			new navBtn({nextScreen: SunlightScreen, img: sunlightBtn, id: 1}),
    			new Label({left: 0, right: 0, top: 0, bottom: 0, 
    				style: smallB, string: "Sunlight",
    			}),
    		]
    	}),
    	new Column({left: 0, right: 0, top: 0, bottom: 0,
    		contents: [
    			new navBtn({nextScreen: TemperatureScreen, img: temperatureBtn, id: 2}),
    			new Label({left: 0, right: 0, top: 0, bottom: 0, 
    				style: smallB, string: "Temperature",
    			}),
    		]
    	}),
    	new Column({left: 0, right: 0, top: 0, bottom: 0,
    		contents: [
    			new navBtn({nextScreen: VentilationScreen, img: ventilationBtn, id: 3}),
    			new Label({left: 0, right: 0, top: 0, bottom: 0, 
    				style: smallB, string: "Ventilation",
    			}),
    		]
    	}),
    	new Column({left: 0, right: 0, top: 0, bottom: 0,
    		contents: [
    			new navBtn({nextScreen: IrrigationScreen, img: irrigationBtn, id: 4}),
    			new Label({left: 0, right: 0, top: 0, bottom: 0, 
    				style: smallB, string: "Irrigation",
    			}),
    		]
    	}),		

// Get's current info from device
function setCurrentState() {

	// update info on screen
	application.distribute("updateState");
}

/* Application definition */
export var currentScreen = new Home();
export let remotePins;

	
		// Sets the pin connection
		let discoveryInstance = Pins.discover(
      	
		// Adds the top bar, current screen and 
		// navigation bar to the screen.
		application.add(new TopBar());
		application.add(NavBar); 
		application.distribute("updateState");      
	onToggleFan(application, value) {
        	remotePins.invoke("/Fan/write", value);
        }
    onToggleIrrigation(application, value) {
        	remotePins.invoke("/Irrigation/write", value);
        }
    getTemperature(application) {
    	if (remotePins) {
        	remotePins.invoke("/TemperatureIn/read", function(result) {
					currTemperature = result * 100 + 20;
        }
    }
    getHumidity(application) {
    	if (remotePins) {
        	remotePins.invoke("/HumidityIn/read", function(result) {
                	currHumidity = result * 100;
        }
    }
    setTemperature(application, value) {
    	if (remotePins) {
        	remotePins.invoke("/TemperatureOut/write", value);
        }
    }
    setHumidity(application, value) {
    	if (remotePins) {
        	remotePins.invoke("/HumidityOut/write", value);
        }
    }