let Pins = require("pins");
 class AppBehavior extends Behavior {    onLaunch(application) {        Pins.configure({            Fan: {                require: "Digital",                pins: {                    ground: { pin: 51, type: "Ground" },                    digital: { pin: 52, direction: "output" }                }            },
            Irrigation: {                require: "Digital",                pins: {                    ground: { pin: 53, type: "Ground" },                    digital: { pin: 54, direction: "output" }                }            },
            TemperatureIn: {
            	require: "Analog",
            	pins: {
            		power: {pin: 55, type: "Power", voltage: 3.3},					analog: {pin: 56, type: "Analog", direction: "input"},					ground: {pin: 57, type: "Ground"}
            	}	
            },  
            HumidityIn: {
            	require: "Analog",
            	pins: {
            		power: {pin: 58, type: "Power", voltage: 3.3},					analog: {pin: 59, type: "Analog", direction: "input"},					ground: {pin: 60, type: "Ground"}
            	}	
            },
            SunlightIn: {
            	require: "Analog",
            	pins: {
            		power: {pin: 61, type: "Power", voltage: 3.3},					analog: {pin: 62, type: "Analog", direction: "input"},					ground: {pin: 63, type: "Ground"}
            	}	
            },         }, function(success) {           		if (!success) {trace("Failed to configure\n");}
           		else {
           			Pins.share("ws", {zeroconf: true, name: "pins-share"});
           			/*
           			Pins.repeat("/AC/read", 500, function(result) {		                if (result) {
		                    ac = "ac on";
		                    application.distribute("updateACState");		                } else {		                    ac = "ac off";
		                    application.distribute("updateACState");		                }		            });
		            Pins.repeat("/Feeder/read", 20, function(result) {		                if (result) {
		                    feeder = "unicorn fed";
		                    application.distribute("updateFeederState");		                } else {
		                	counter++;
		                	if (counter > 500 && feeder != "") {
		                		feeder = "";counter = 0;
		                		
		                		application.distribute("updateFeederState");
		                	}		                }		            });*/
           		}        });    }}application.behavior = new AppBehavior(); 
// Skins
var graySkin = new Skin ({fill: '#202020'});

// Fonts
var titleG = new Style({font: 'bold 30px', color: '#3AFF3E'});
var regularW = new Style({font: '20px', color: 'white'});

// Layoutvar DeviceScreen = Column.template($ => ({    left: 0, right: 0, top: 0, bottom: 0, skin: graySkin,    contents: [       new Label({left: 0, right: 0, top: 0, style: titleG, string: "greener house"}),
       
       Label($, {left: 0, right: 0, top: 10, style: regularW,
       		string: "",
       		Behavior: class extends Behavior{				updateACState(container, string) {					//container.string = ac;				}			}
       }),
       
       Label($, {left: 0, right: 0, top: 10, style: regularW,
       		string: "",
       		Behavior: class extends Behavior{				updateFeederState(container, string) {					//container.string = feeder;				}			}
       }),    ]}));
application.add(new DeviceScreen());
