// Import layouts from other files and pins
import { SunlightScreen } from "sunlight";
import { TemperatureScreen } from "temperature";
import { VentilationScreen, fanState } from "ventilation";
import { IrrigationScreen } from "irrigation";
import { Drawer, ghAroundScreen } from "drawer";
import Pins from "pins";
import { CrossFade, Push, Flip, TimeTravel } from 'transition';

// Skinslet blackSkin = new Skin ({fill: 'black'});let whiteSkin = new Skin ({fill: 'white'});
let graySkin = new Skin ({fill: '#999999'});
let greenSkin = new Skin ({fill: '#71e28b'});
let navBarSkin = new Skin({      fill: "white",      borders: {left: 0, right: 0, top: 1, bottom: 0},       stroke: "#999999"});
let fanWhiteSkin = new Skin({      fill: "white",      borders: {left: 1, right: 1, top: 1, bottom: 1},       stroke: "#999999"});
let fanGreenSkin = new Skin({      fill: "#71e28b",      borders: {left: 1, right: 1, top: 1, bottom: 1},       stroke: "#999999"});

// Fontsvar titleW = new Style({font: 'bold 20px', color: 'white'});
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

// Screen layoutexport var Home = Container.template($ => ({	left: 0, right: 0, top: name_h, bottom: naviBar_h, skin: whiteSkin,	contents: [
	
		Column($, { left: 0, right: 0, top: 0, bottom: 0,
			contents: [
				// Current info
				new CurrInfo,
				
				// Sunlight diagram
				new FanDiagram
			]
		}),
	]}));

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
					Behavior: class extends Behavior{						updateState(container, string) {							container.string = "Sunlight: " + Math.round(currSunlight) + "%";						}					}	
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
					Behavior: class extends Behavior{						updateState(container, string) {							container.string = "Temperature: " + Math.round(currTemperature) + " F";						}					}	
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
					Behavior: class extends Behavior{						updateState(container, string) {							container.string = "Humidity: " + Math.round(currHumidity) + "%";						}					}	
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
					Behavior: class extends Behavior{						updateState(container, string) {							container.string = "Airflow: " + Math.round(currAirFlow) + "%";						}					}	
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
							Behavior: class extends Behavior{								updateState(container, string) {									container.string = "Sunlight: " + Math.round(currSunlight) + "%";								}							}	
						}),
					]
				}),
				
				Column($, {
					left: 0, right: 0, top: 0, bottom: 0,
					contents: [
					
					
						new Picture({left: 0, right: 0, top: 0, bottom: 0, url: "assets/temp_b.png"}),
						Label($, {
							left: 0, right: 0, top: 0, bottom: 0, style: regularB, string: "Temperature: " + Math.round(currTemperature) + " F",
							Behavior: class extends Behavior{								updateState(container, string) {									container.string = "Temperature: " + Math.round(currTemperature) + " F";								}							}	
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
							Behavior: class extends Behavior{								updateState(container, string) {									container.string = "Humidity: " + Math.round(currHumidity) + "%";								}							}	
						}),
					]
				}),
				
				Column($, {
					left: 0, right: 0, top: 0, bottom: 0,
					contents: [
					
					
						new Picture({left: 0, right: 0, top: 0, bottom: 0, url: "assets/airflow.png"}),
						Label($, {
							left: 0, right: 0, top: 0, bottom: 0, style: regularB, string: "Airflow: " + Math.round(currAirFlow) + "%",
							Behavior: class extends Behavior{								updateState(container, string) {									container.string = "Airflow: " + Math.round(currAirFlow) + "%";								}							}	
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
let updateBtn = Container.template($ => ({    left: undefined, right: 0, top: 0, bottom: 0, width: 100, active: true,
    
    behavior: Behavior({        onCreate: function(content){            this.upSkin = new Skin({                fill: "#999999",                borders: {left: 1, right: 1, top: 1, bottom: 1},             });            this.downSkin = new Skin({                fill: "#71e28b",                 borders: {left: 1, right: 1, top: 1, bottom: 1},             });            content.skin = this.upSkin;        },        onTouchBegan: function(content){            content.skin = this.downSkin;
            application.distribute("getTemperature");
            application.distribute("getHumidity");        },        onTouchEnded: function(content){            content.skin = this.upSkin;
            
            // fetch info from device and update on screen
            application.distribute("updateInfo");        },
        updateInfo(container) {
         
            setCurrentState();		}    }),    	contents: [        new Label({ top: 0, bottom: 0, left: 0, right: 0, 
        style: regularW, string: "update" })   ]}));

// add greenhouse button
let settingsBtn = Container.template($ => ({    left: 0, right: undefined, top: 0, bottom: 0, 
    width: 50, active: true,
    
    behavior: Behavior({        onCreate: function(content){            this.upSkin = new Skin({                fill: "transparent",             });            this.downSkin = new Skin({                fill: "#71e28b",             });            content.skin = this.upSkin;        },        onTouchBegan: function(content){            content.skin = this.downSkin;        },        onTouchEnded: function(content){            content.skin = this.upSkin;
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

// Transition for the side drawer.
/*let transitioningBehavior = Behavior({    onCreate: function(container, data) {        this.numTransitions = 2;    },    onDisplayed: function(container) {        container.interval = 1800;        container.start();    },    onTimeChanged: function(container) {        container.bubble( "onTriggerTransition" );    },    onTriggerTransition: function(container) {        let toScreen = new NumberedScreen({             transitionNumber: (data.index + 1) % this.numTransitions,        });                switch ( data.index ) {            case 0:                container.run( new Push(), container.last, toScreen,                     { duration: 400, direction: "left" } );                break;            case 1:                container.run( new Push(), container.last, toScreen,                     { direction: "right", duration: 400 } );                break;        }        data.index = (data.index + 1) % this.numTransitions;    },})
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
var TopBar = Line.template($ => ({ left: 0, right: 0, top: 0, height: name_h, skin: graySkin,    contents: [
    	// add greenhouse button
		new settingsBtn({}),
		
		// Greenhouse's name        Label($, {left: 50, right: undefined, top: 0, bottom: 0,
        	style: regularW, string: "Greenhouse " + greenhouseNum,
        	Behavior: class extends Behavior{				updateGhNum(container, string) {					container.string = "Greenhouse " + greenhouseNum;				}			}
        }),
        
        // Update button
		//new updateBtn({}),    ]}));

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
