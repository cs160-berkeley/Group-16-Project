
 
            Irrigation: {
            TemperatureIn: {
            	require: "Analog",
            	pins: {
            		power: {pin: 55, type: "Power", voltage: 3.3},
            	}	
            },  
            HumidityIn: {
            	require: "Analog",
            	pins: {
            		power: {pin: 58, type: "Power", voltage: 3.3},
            	}	
            },
           		else {
           			Pins.share("ws", {zeroconf: true, name: "pins-share"});
           			/*
           			Pins.repeat("/AC/read", 500, function(result) {
		                    ac = "ac on";
		                    application.distribute("updateACState");
		                    application.distribute("updateACState");
		            Pins.repeat("/Feeder/read", 20, function(result) {
		                    feeder = "unicorn fed";
		                    application.distribute("updateFeederState");
		                	counter++;
		                	if (counter > 500 && feeder != "") {
		                		feeder = "";counter = 0;
		                		
		                		application.distribute("updateFeederState");
		                	}
           		}
// Skins
var graySkin = new Skin ({fill: '#202020'});

// Fonts
var titleG = new Style({font: 'bold 30px', color: '#3AFF3E'});
var regularW = new Style({font: '20px', color: 'white'});

// Layout
       
       Label($, {left: 0, right: 0, top: 10, style: regularW,
       		string: "",
       		Behavior: class extends Behavior{
       }),
       
       Label($, {left: 0, right: 0, top: 10, style: regularW,
       		string: "",
       		Behavior: class extends Behavior{
       }),
