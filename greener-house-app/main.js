// Import layouts from other files and pins
import { SunlightScreen, sunlightState } from "sunlight";
import { TemperatureScreen } from "temperature";
import { VentilationScreen, fanState } from "ventilation";
import { IrrigationScreen, irrigationState, checkBoxSelected, initial } from "irrigation";
import { Drawer, ghAroundScreen } from "drawer";
import Pins from "pins";
import { CrossFade, Push, Flip, TimeTravel } from 'transition';
import { currTemperature, currSunlight, currHumidity, currAirFlow, 
		number, currIrrigationState, currFanState} from "greenhouse";

// Skinslet blackSkin = new Skin ({fill: 'black'});let whiteSkin = new Skin ({fill: 'white'});
let graySkin = new Skin ({fill: '#999999'});
let greenSkin = new Skin ({fill: '#5CA05C'});
let navBarSkin = new Skin({      fill: "white",      borders: {left: 0, right: 0, top: 1, bottom: 0},       stroke: "#999999"});

// Irrigation representation
let drip0 = new Texture("assets/irrigation_0.png");
let drip1 = new Texture("assets/irrigation_1.png");
let drip2 = new Texture("assets/irrigation_2.png");
let drip3 = new Texture("assets/irrigation_3.png");
let irrigation0 = new Skin({
      width: 80, height: 30,      texture: drip0,      fill: "white",      aspect: "fit"});

let irrigation1 = new Skin({
      width: 80, height: 30,      texture: drip1,      fill: "#5CA05C",      aspect: "fit"});

let irrigation2 = new Skin({
      width: 80, height: 30,      texture: drip2,      fill: "#5CA05C",      aspect: "fit"});

let irrigation3 = new Skin({
      width: 80, height: 30,      texture: drip3,      fill: "#5CA05C",      aspect: "fit"});

// Fontsvar titleW = new Style({font: 'bold 20px', color: 'white'});
var titleB = new Style({font: 'bold 20px', color: 'black'});
var titleG = new Style({font: 'bold 20px', color: '#216C21'});
var regularW = new Style({font: '20px', color: 'white'});
var regularB = new Style({font: '20px', color: 'black'});
var regularG = new Style({font: '20px', color: '#216C21'});
var regularR = new Style({font: '20px', color: 'red'});
var smallB = new Style({font: '12px', color: 'black'});
var largeB = new Style({font: 'bold 30px', color: 'black'});

// Screen layout sizes
export var name_h = 50;
export var naviBar_h = 60;
export let padding = 10;

// Nav buttons icons
var sunlightBtn = "assets/sun.png";
var temperatureBtn = "assets/temp.png";
var homeBtn = "assets/home_g.png";
var ventilationBtn = "assets/fan.png";
var irrigationBtn = "assets/irrigation.png";
var addBtnIcon = "assets/settings.png";

// State variables
export var drawerState = "closed";
export var drawerScreen = new Drawer();

var dropsIcons = [];

// Screen layoutexport var Home = Container.template($ => ({	left: 0, right: 0, top: name_h, bottom: naviBar_h, skin: whiteSkin,	contents: [
	
		Column($, { left: 0, right: 0, top: 0, bottom: 0,
			contents: [
				// Current info
				new CurrInfo,
				
				// Sunlight diagram
				new IrrigationDiagram
			]
		}),
	]}));

// Current conditions inside the greenhouse.
var CurrInfo = Column.template($ => ({
	left: 0, right: 0, top: 0, bottom: undefined, height: 250,
	contents: [
	
		new Label ({ left: padding, right: undefined, top: padding, style: titleG, 
			string: "Current Conditions"
		}),
		
		Line($, {
			left: 0, right: 0, top: padding, bottom: 0,
			contents: [
			
				Column($, {
					left: 0, right: 0, top: 0, bottom: 0,
					contents: [
					
						Line($, {
							left: 0, right: 0, top: 0, bottom: undefined,
							contents: [
							
								Label($, {
									left: padding, right: undefined, top: 0, bottom: undefined, style: largeB, string: Math.round(currSunlight) + "%",
									Behavior: class extends Behavior{										updateState(container, string) {											container.string = Math.round(currSunlight) + "%";										}									}	
								}),
								
							]
						}),

						Line($, {
							left:0, right: 0, top: 0, bottom: undefined,
							contents: [
								new Picture({left: padding, right: undefined, top: padding / 2, bottom: undefined,
									height: 24, width: 24, url: "assets/sun_y.png"}),
								
								
								new Label({ left: padding, right: undefined, top: padding / 2, bottom: undefined,	
									style: regularB, string: "Sunlight",
								}),
							]
						}),
					]
				}),
				
				Column($, {
					left: 0, right: 0, top: 0, bottom: 0,
					contents: [
					
						Line($, {
							left: 0, right: 0, top: 0, bottom: undefined,
							contents: [
							
								Label($, {
									left: padding, right: undefined, top: 0, bottom: undefined, style: largeB, string: Math.round(currTemperature) + "F",
									Behavior: class extends Behavior{										updateState(container, string) {											container.string = Math.round(currTemperature) + "F";										}									}	
								}),
								
							]
						}),
					
						Line($, {
							left:0, right: 0, top: 0, bottom: undefined,
							contents: [
								new Picture({left: padding, right: undefined, top: padding / 2, bottom: undefined,
									height: 24, width: 24, url: "assets/temp_r.png"}),
								
								
								new Label({left: padding, right: undefined, top: padding / 2, bottom: undefined,	
									style: regularB, string: "Temperature",
								}),
							]
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
					
						Line($, {
							left: 0, right: 0, top: 0, bottom: undefined,
							contents: [
							
								Label($, {
									left: padding, right: undefined, top: 0, bottom: undefined, style: largeB, string: Math.round(currHumidity) + "%",
									Behavior: class extends Behavior{										updateState(container, string) {											container.string = Math.round(currHumidity) + "%";										}									}	
								}),
								
								
							]
						}),
						
						Line($, {
							left:0, right: 0, top: 0, bottom: undefined,
							contents: [
								new Picture({left: padding, right: undefined, top: padding / 2, bottom: undefined,
									height: 24, width: 24, url: "assets/humidity.png"}),
								
								
								new Label({ left: padding, right: undefined, top: padding / 2, bottom: undefined,	
									style: regularB, string: "Humidity",
								}),
							]
						}),
					]
				}),
				
				Column($, {
					left: 0, right: 0, top: 0, bottom: 0,
					contents: [
					
						Line($, {
							left: 0, right: 0, top: 0, bottom: undefined,
							contents: [
							
								Label($, {
									left: padding, right: undefined, top: 0, bottom: undefined, style: largeB, string: Math.round(currAirFlow) + "%",
									Behavior: class extends Behavior{										updateState(container, string) {											container.string = Math.round(currAirFlow) + "%";										}									}	
								}),
								
								
							]
						}),
					
						Line($, {
							left:0, right: 0, top: 0, bottom: undefined,
							contents: [
								new Picture({left: padding, right: undefined, top: padding / 2, bottom: undefined,
									height: 24, width: 24, url: "assets/airflow.png"}),
								
								
								new Label({ left: padding, right: undefined, top: padding / 2, bottom: undefined,	
									style: regularB, string: "Airflow         ",
								}),
							]
						}),
					]
				}),
			]
		}),
	]
}));

// Fans state
var IrrigationDiagram = Column.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0, height: Home.height / 2, skin: navBarSkin,
	contents: [
	
		new Label({ left: padding, right: undefined, top: padding / 2, bottom : 0, 
			style: titleG, string: "Current Irrigation "
		}),
		
		Line($, {
	  		left: padding, right: padding, top: padding / 2, bottom: 0,
			contents: [			
				dropsIcons[0] = new IrrigationZone({skin: irrigation0, id: 0}),
				dropsIcons[1] = new IrrigationZone({skin: irrigation0, id: 1}),
				dropsIcons[2] = new IrrigationZone({skin: irrigation0, id: 2}),
			]
	    }),
	  
	  	Line($, {
	  		left: padding, right: padding, top: padding / 2, bottom: padding / 2,
			contents: [
				dropsIcons[3] = new IrrigationZone({skin: irrigation0, id: 3}),
				dropsIcons[4] = new IrrigationZone({skin: irrigation0, id: 4}),
				dropsIcons[5] = new IrrigationZone({skin: irrigation0, id: 5}),
			]
	  	}),
	]
}));

var IrrigationZone = Column.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0, skin: $.skin, id: $.id,
}));

//navigation buttons
var navBtn = Picture.template($ => ({	left: padding / 2, right: padding / 2, top: padding / 2, bottom: undefined, 
	height: 32, width: 32, active: true, url: $.img,
	
	behavior: Behavior({        onTouchEnded: function(content){
            
            adjustNavButtons($.id);
            application.remove(currentScreen);
			currentScreen = new $.nextScreen;            application.add(currentScreen);
            application.distribute("updateNavButtons");        },
        updateNavButtons(container, url) {	
			if ($.id == 1) {
				container.url = sunlightBtn;
				application.distribute("adjustLightSlider");
			} else if ($.id == 2) {
				container.url = temperatureBtn;
				application.distribute("updateCurrTemp");
				application.distribute("adjustTempSlider");
			} else if ($.id == 0) {
				container.url = homeBtn;
				application.distribute("updateState");
				adjustIrrigationIcons();
			} else if ($.id == 3) {
				container.url = ventilationBtn;
				application.distribute("adjustVentSlider");
			} else if ($.id == 4) {
				initial = true;
				container.url = irrigationBtn;
			}
			application.distribute("updateDrawer");		},
		updateDrawer() {
			if (drawerState == "open") {
            	application.remove(drawerScreen);
            	drawerState = "closed";
            	addBtnIcon = "assets/settings.png";
            	application.distribute("updateSettingsBtn");
            }
		},    }),}));

// Changes the fans bg depending on state
export function adjustIrrigationIcons(){
	for (var i = 0; i < irrigationState.length; i++) {
		if (irrigationState[i] == 0) {
			dropsIcons[i].skin = irrigation0;
		} else if (irrigationState[i] == 1) {
			dropsIcons[i].skin = irrigation1;
		} else if (irrigationState[i] == 2) {
			dropsIcons[i].skin = irrigation2;
		} else if (irrigationState[i] == 3) {
			dropsIcons[i].skin = irrigation3;
		}
	}
}

// Settings button
let settingsBtn = Container.template($ => ({    left: 0, right: undefined, top: 0, bottom: 0, 
    width: 50, active: true,
    
    behavior: Behavior({        onCreate: function(content){            this.upSkin = new Skin({                fill: "transparent",             });            this.downSkin = new Skin({                fill: "#B9DBB9",             });            content.skin = this.upSkin;        },        onTouchBegan: function(content){            content.skin = this.downSkin;        },        onTouchEnded: function(content){            content.skin = this.upSkin;
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
            application.distribute("updateSettingsBtn");        },    }),    	contents: [        Picture($, { top: padding, bottom: undefined, left: undefined, 
        right: undefined, url: addBtnIcon,
	        Behavior: class extends Behavior{				updateSettingsBtn(container, url) {					container.url = addBtnIcon;				}			}
        })   ]}));

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
var TopBar = Line.template($ => ({ left: 0, right: 0, top: 0, height: name_h, skin: greenSkin,    contents: [
    	// add greenhouse button
		new settingsBtn({}),
		
		// Greenhouse's name        Label($, {left: 50, right: undefined, top: 0, bottom: 0,
        	style: titleW, string: "Greenhouse " + number,
        	Behavior: class extends Behavior{				updateGhNum(container, string) {					container.string = "Greenhouse " + number;				}			}
        }),    ]}));

// Navigation bar
var NavBar = new Line({ left: 0, right: 0, bottom: 0, 
	skin: navBarSkin, height: naviBar_h,    contents: [
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
    	}),		    ]});

// Get's current info from device
function setCurrentState() {
	// update info on screen
	application.distribute("updateState");
}

/* Application definition */
export var currentScreen = new Home();
export let remotePins;
class AppBehavior extends Behavior {	onLaunch(application) {
	
		// Sets the pin connection
		let discoveryInstance = Pins.discover(            connectionDesc => {                if (connectionDesc.name == "pins-share") {                    trace("Connecting to remote pins\n");                    remotePins = Pins.connect(connectionDesc);                }            },             connectionDesc => {                if (connectionDesc.name == "pins-share") {                    trace("Disconnected from remote pins\n");                    remotePins = undefined;                }            }        );
      	
		// Adds the top bar, current screen and 
		// navigation bar to the screen.
		application.add(new TopBar());		application.add(currentScreen); 
		application.add(NavBar); 
		application.distribute("updateState");      	}
	onToggleFan(application, value) {        if (remotePins) {
        	remotePins.invoke("/Fan/write", value);
        }    }
    onToggleIrrigation(application, value) {        if (remotePins) {
        	remotePins.invoke("/Irrigation/write", value);
        }    }	
    getTemperature(application) {
    	if (remotePins) {
        	remotePins.invoke("/TemperatureIn/read", function(result) {                if (result) {
					currTemperature = result * 100 + 20;                } else {                    trace("no result\n");                }            });
        }
    }
    getHumidity(application) {
    	if (remotePins) {
        	remotePins.invoke("/HumidityIn/read", function(result) {                if (result) {
                	currHumidity = result * 100;                } else {                    trace("no result\n");                }            });
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
    }}application.behavior = new AppBehavior();
