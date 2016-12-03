// Import layouts from other files and pins
import { SunlightScreen, sunlightState } from "sunlight";
import { TemperatureScreen, heaterState } from "temperature";
import { VentilationScreen, fanState, humidityState } from "ventilation";
import { IrrigationScreen, irrigationState, initial } from "irrigation";
import { Drawer, degree } from "drawer";
import Pins from "pins";

// Skinslet brownSkin = new Skin ({fill: '#C89A73'});
let darkBrownSkin = new Skin ({fill: '#875429'});let whiteSkin = new Skin ({fill: 'white'});
let greenSkin = new Skin ({fill: '#5CA05C'}); 

// Irrigation representation
let dripOn = "assets/irrigation_on.png";
let dripOff = "assets/irrigation_off.png";

// Fontsvar titleW = new Style({font: 'bold 20px', color: 'white'});
var titleB = new Style({font: 'bold 20px', color: 'black'});
var regularW = new Style({font: '20px', color: 'white'});
var regularB = new Style({font: '20px', color: 'black'});
var smallW = new Style({font: 'bold 12px', color: 'white'});
var smallB = new Style({font: 'bold 12px', color: 'black'});
var midB = new Style({font: '18px', color: 'black'});
var largeB = new Style({font: 'bold 40px', color: 'black'});

// Screen layout sizes
export var name_h = 50;
export var naviBar_h = 60;
export let padding = 10;

// Nav buttons icons
var sunlightBtn = "assets/sun.png";
var temperatureBtn = "assets/temp.png";
var homeBtn = "assets/home_w.png";
var ventilationBtn = "assets/fan.png";
var irrigationBtn = "assets/irrigation.png";
var settingsIcon = "assets/settings.png";

// Drawer variables
export var drawerState = "closed";
export var drawerScreen = new Drawer();

var waterCanIcons = [];
var navBarColumns = [];
var navBarLabels = [];

// Greenhouse conditions
export var currTemperature = 0;
export var currHumidity = 0;
export var currAirflow = 0;
export var currSunlight = 0;

// Info icons
let off = "assets/off.png";
let on = "assets/on.png";
let inProgress = "assets/in_progress.png";
var airflowIcon = off;
var lightIcon = off;
var humidityIcon = "";
var temperatureIcon = "";

// Update info frequency in miliseconds
export var updateFreq = 2345;

// Screen layoutexport var Home = Container.template($ => ({	left: 0, right: 0, top: name_h, bottom: naviBar_h, skin: whiteSkin,	contents: [
	
		Column($, { left: 0, right: 0, top: 0, bottom: 0,
			contents: [
				// Current info
				new CurrInfo,
				
				// Irrigation diagram
				new IrrigationDiagram,
			]
		}),
	]}));

// Current conditions inside the greenhouse.
var CurrInfo = Column.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0,
	contents: [
	
		new Label ({ left: 0, right: 0, top: padding * 2, bottom: padding * 3, style: titleB, 
			string: "Current Conditions"
		}),
		
		Line($, {
			left: padding * 2, right: 0, top: 0, bottom: 0,
			contents: [
			
				Column($, {
					left: 0, right: 0, top: 0, bottom: 0, name: "sunlight",
					contents: [
					
						Line($, {
							left: 0, right: 0, top: 0, bottom: 0,
							contents: [
							
								Label($, {
									left: padding, right: undefined, top: 0, bottom: 0, style: largeB, string: Math.round(currSunlight) + "%",
									Behavior: class extends Behavior{										updateState(container, string) {											container.string = Math.round(currSunlight) + "%";										}									}	
								}),
								
								Picture($, {									left: padding * 2, right: undefined, top: 0, bottom: 0, width: 24, height: 24,									Behavior: class extends Behavior{										updateState(container, url) {											container.url = lightIcon;										}									}									}),	
							]
						}),

						Line($, {
							left:0, right: 0, top: padding, bottom: 0,
							contents: [
								new Picture({left: padding, right: undefined, top: 0, bottom: 0,
									height: 24, width: 24, url: "assets/sun_y.png"}),
								
								
								new Label({ left: padding, right: undefined, top: 0, bottom: 0,	
									style: midB, string: "Sunlight",
								}),
							]
						}),
					]
				}),
				
				Column($, {
					left: 0, right: 0, top: 0, bottom: 0, name: "airflow",
					contents: [
					
						Line($, {
							left: 0, right: 0, top: 0, bottom: 0,
							contents: [
							
								Label($, {
									left: padding, right: undefined, top: 0, bottom: 0, style: largeB, string: Math.round(currAirflow) + "%",
									Behavior: class extends Behavior{										updateState(container, string) {											container.string = Math.round(currAirflow) + "%";										}									}	
								}),
								
								Picture($, {
									left: padding * 2, right: undefined, top: 0, bottom: 0, width: 24, height: 24,
									Behavior: class extends Behavior{										updateState(container, url) {											container.url = airflowIcon;										}									}	
								}),	
							]
						}),
					
						Line($, {
							left:0, right: 0, top: padding, bottom: 0,
							contents: [
								new Picture({left: padding, right: undefined, top: 0, bottom: 0,
									height: 24, width: 24, url: "assets/airflow.png"}),
								
								new Label({ left: padding, right: undefined, top: 0, bottom: 0,	
									style: midB, string: "Airflow",
								}),
							]
						}),
					]
				}),		
			]
		}),
		
		Line($, {
			left: padding * 2, right: 0, top: padding * 4, bottom: 0,
			contents: [
			
				Column($, {
					left: 0, right: 0, top: 0, bottom: 0,
					contents: [
					
						Line($, {
							left: 0, right: 0, top: 0, bottom: 0,
							contents: [
							
								Label($, {
									left: padding, right: undefined, top: 0, bottom: 0, style: largeB, string: Math.round(currHumidity) + "%",
									Behavior: class extends Behavior{										updateState(container, string) {											container.string = Math.round(currHumidity) + "%";										}									}	
								}),
								
								Picture($, {
									left: padding * 2, right: undefined, top: 0, bottom: 0, width: 24, height: 24,
									Behavior: class extends Behavior{										updateState(container, url) {											container.url = humidityIcon;										}									}	
								}),
							]
						}),
						
						Line($, {
							left:0, right: 0, top: padding, bottom: 0,
							contents: [
								new Picture({left: padding, right: undefined, top: 0, bottom: 0,
									height: 24, width: 24, url: "assets/humidity.png"}),
								
								
								new Label({ left: padding, right: undefined, top: 0, bottom: 0,	
									style: midB, string: "Humidity",
								}),
							]
						}),
					]
				}),
				
				Column($, {
					left: 0, right: 0, top: 0, bottom: 0,
					contents: [
					
						Line($, {
							left: 0, right: 0, top: 0, bottom: 0,
							contents: [
							
								Label($, {
									left: padding, right: undefined, top: 0, bottom: 0, style: largeB, string: Math.round(currTemperature) + "F",
									Behavior: class extends Behavior{										updateState(container, string) {											container.string = Math.round(currTemperature) + degree + "  ";										}									}	
								}),
								
								Picture($, {									left: padding * 2, right: undefined, top: 0, bottom: 0, width: 24, height: 24,									Behavior: class extends Behavior{										updateState(container, url) {											container.url = temperatureIcon;										}									}									}),	
							]
						}),
					
						Line($, {
							left:0, right: 0, top: padding, bottom: 0,
							contents: [
								new Picture({left: padding, right: undefined, top: 0, bottom: 0,
									height: 24, width: 24, url: "assets/temp_r.png"}),
								
								
								new Label({left: padding, right: undefined, top: 0, bottom: 0,	
									style: midB, string: "Temperature",
								}),
							]
						}),
					]
				}),
			]
		}),
	]
}));

// Irrigation state diagram
var IrrigationDiagram = Container.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0,
	contents: [
	
		Picture($, {
   			left: 0, right: undefined, top: undefined, bottom: 0, 
   			height: 150, width: 400, url: "assets/grass.png",
   		}),
   		
		Picture($, {
   			left: 0, right: 0, top: undefined, bottom: padding, 
   			height: 80, width: 250, url: "assets/layout.png",
   		}),
   		
		Column($, {
			left: padding * 3, right: padding * 3, top: undefined, bottom: padding,
			contents: [
			
				Label($, {
					left: 0, right: 0, top: 0, bottom: undefined, style: titleB, string: "Current Irrigation",
				}),
				
				Line($, {
		  			left: 0, right: 0, top: 0, bottom: 0, height: padding * 4,
					contents: [			
						waterCanIcons[0] = new waterCan({}),
						waterCanIcons[1] = new waterCan({}),
						waterCanIcons[2] = new waterCan({}),
					]
			    }),
			  
			  	Line($, {
			  		left: 0, right: 0, top: 0, bottom: 0, height: padding * 4,
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
			top: padding / 2, bottom: undefined, left: 0, right: 0, name: "water_can",
        	height: 32, width: 32, url: "assets/irrigation_off.png",
        	Behavior: class extends Behavior{				updateWaterBtn(container, url) {					container.url = dripOff;				}			}
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

//navigation buttons
var navBtn = Picture.template($ => ({	left: padding / 2, right: padding / 2, top: padding / 2, bottom: undefined, 
	height: 32, width: 32, active: true, url: $.img,
	
	behavior: Behavior({
        onTouchBegan: function(content){            navBarColumns[$.id].skin = darkBrownSkin;
            navBarLabels[$.id].style = smallW;        },        onTouchEnded: function(content){
            for (var i = 0; i < 5; i++) {
        		if ($.id != i) {
        			navBarColumns[i].skin = brownSkin;
        			navBarLabels[i].style = smallB;
        		}
        	}
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
				adjustInfoIcons();
				application.distribute("updateState");
				adjustWaterCanIcons();
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
            	settingsIcon = "assets/settings.png";
            	application.distribute("updateSettingsBtn");
            }
		},    }),}));

// Settings button
let settingsBtn = Container.template($ => ({    left: 0, right: undefined, top: 0, bottom: 0, 
    width: 50, active: true,
    
    behavior: Behavior({        onCreate: function(content){            this.upSkin = new Skin({                fill: "transparent",             });            this.downSkin = new Skin({                fill: "#B9DBB9",             });            content.skin = this.upSkin;        },        onTouchBegan: function(content){            content.skin = this.downSkin;        },        onTouchEnded: function(content){            content.skin = this.upSkin;
            // Opening or closing drawer
            if (drawerState == "closed") {
            	application.add(drawerScreen);
            	drawerState = "open";
            	settingsIcon = "assets/back.png";
            	application.distribute("adjustFreqSlider");
            } else {
            	application.remove(drawerScreen);
            	drawerState = "closed";
            	settingsIcon = "assets/settings.png";
            }
            application.distribute("updateSettingsBtn");        },    }),    	contents: [        Picture($, { top: padding, bottom: undefined, left: undefined, 
        right: undefined, url: settingsIcon,
	        Behavior: class extends Behavior{				updateSettingsBtn(container, url) {					container.url = settingsIcon;				}			}
        })   ]}));

// Adjust navigation buttons when clicked
function adjustNavButtons(id) {
	
	if (id == 1) {
		sunlightBtn = "assets/sun_w.png";
		temperatureBtn = "assets/temp.png";
		homeBtn = "assets/home.png";
		ventilationBtn = "assets/fan.png";
		irrigationBtn = "assets/irrigation.png";
	} else if (id == 2) {
		sunlightBtn = "assets/sun.png";
		temperatureBtn = "assets/temp_w.png";
		homeBtn = "assets/home.png";
		ventilationBtn = "assets/fan.png";
		irrigationBtn = "assets/irrigation.png";
	} else if (id == 0) {
		sunlightBtn = "assets/sun.png";
		temperatureBtn = "assets/temp.png";
		homeBtn = "assets/home_w.png";
		ventilationBtn = "assets/fan.png";
		irrigationBtn = "assets/irrigation.png";
	} else if (id == 3) {
		sunlightBtn = "assets/sun.png";
		temperatureBtn = "assets/temp.png";
		homeBtn = "assets/home.png";
		ventilationBtn = "assets/fan_w.png";
		irrigationBtn = "assets/irrigation.png";
	} else if (id == 4) {
		sunlightBtn = "assets/sun.png";
		temperatureBtn = "assets/temp.png";
		homeBtn = "assets/home.png";
		ventilationBtn = "assets/fan.png";
		irrigationBtn = "assets/irrigation_w.png";
	}
}

// Top bar
var TopBar = Line.template($ => ({ left: 0, right: 0, top: 0, height: name_h, skin: greenSkin,    contents: [
    	// add greenhouse button
		new settingsBtn({}),
		
		// Greenhouse's name        Label($, {left: 50, right: undefined, top: 0, bottom: 0,
        	style: titleW, string: "GreenerHouse",
        }),    ]}));

// Navigation bar
var NavBar = new Line({ left: 0, right: 0, bottom: 0, 
	skin: brownSkin, height: naviBar_h,    contents: [
    	navBarColumns[0] = new Column({left: 0, right: 0, top: 0, bottom: 0, skin: darkBrownSkin,
    		contents: [
    			new navBtn({nextScreen: Home, img: homeBtn, id: 0}),
    			navBarLabels[0] = new Label({left: 0, right: 0, top: 0, bottom: 0, 
    				style: smallW, string: "Home",
    			}),
    		]
    	}),
    	navBarColumns[1] = new Column({left: 0, right: 0, top: 0, bottom: 0,
    		contents: [
    			new navBtn({nextScreen: SunlightScreen, img: sunlightBtn, id: 1}),
    			navBarLabels[1] = new Label({left: 0, right: 0, top: 0, bottom: 0, 
    				style: smallB, string: "Sunlight",
    			}),
    		]
    	}),
    	navBarColumns[2] = new Column({left: 0, right: 0, top: 0, bottom: 0,
    		contents: [
    			new navBtn({nextScreen: TemperatureScreen, img: temperatureBtn, id: 2}),
    			navBarLabels[2] = new Label({left: 0, right: 0, top: 0, bottom: 0, 
    				style: smallB, string: "Temperature",
    			}),
    		]
    	}),
    	navBarColumns[3] = new Column({left: 0, right: 0, top: 0, bottom: 0,
    		contents: [
    			new navBtn({nextScreen: VentilationScreen, img: ventilationBtn, id: 3}),
    			navBarLabels[3] = new Label({left: 0, right: 0, top: 0, bottom: 0, 
    				style: smallB, string: "Ventilation",
    			}),
    		]
    	}),
    	navBarColumns[4] = new Column({left: 0, right: 0, top: 0, bottom: 0,
    		contents: [
    			new navBtn({nextScreen: IrrigationScreen, img: irrigationBtn, id: 4}),
    			navBarLabels[4] = new Label({left: 0, right: 0, top: 0, bottom: 0, 
    				style: smallB, string: "Irrigation",
    			}),
    		]
    	}),		    ]});

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
        	remotePins.invoke("/Fans/write", value);
        }    }
    onToggleIrrigation(application, value) {        if (remotePins) {
        	remotePins.invoke("/Irrigation/write", value);
        }    }
    getSunlight(application) {
    	if (remotePins) {
        	remotePins.repeat("/Sunlight/read", updateFreq, function(result) {                if (result) {
					currSunlight = result * 100;
					application.distribute("updateState");                } else {                    trace("no result\n");                }            });
        }
    }	
    getTemperature(application) {
    	if (remotePins) {
        	remotePins.repeat("/Temperature/read", updateFreq, function(result) {                if (result && degree == "F") {
					currTemperature = result * 100 + 20;                } else if (result && degree == "C") {
					currTemperature = result * 100 - 45;
					if (currTemperature < -20) {
						currTemperature = -20;
					}                } else {                    trace("no result\n");                }            });
        }
    }
    getHumidity(application) {
    	if (remotePins) {
        	remotePins.repeat("/Humidity/read", updateFreq, function(result) {                if (result) {
                	currHumidity = result * 100;                } else {                    trace("no result\n");                }            });
        }
    }
    getAirflow(application) {
    	if (remotePins) {
        	remotePins.repeat("/Airflow/read", updateFreq, function(result) {                if (result) {
                	currAirflow = result * 100;                } else {                    trace("no result\n");                }            });
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
