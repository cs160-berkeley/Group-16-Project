// Imports
import { name_h, naviBar_h, padding } from "main";
import { currTemperature, currSunlight, currHumidity, currAirFlow, 
		number, currIrrigationState, currFanState} from "greenhouse";
import { HorizontalSlider, HorizontalSliderBehavior } from 'sliders';
import { SwitchButton, SwitchButtonBehavior } from 'switch';

// Skinslet blackSkin = new Skin ({fill: 'black'});let whiteSkin = new Skin ({fill: 'white'});
let graySkin = new Skin ({fill: '#999999'});
let greenSkin = new Skin ({fill: '#5CA05C'});
let upperLineSkin = new Skin({      fill: "white",      borders: {left: 0, right: 0, top: 1, bottom: 0},       stroke: "#999999"});

// Fontsvar titleW = new Style({font: 'bold 20px', color: 'white'});
var titleB = new Style({font: 'bold 20px', color: 'black'});
var titleG = new Style({font: 'bold 20px', color: '#216C21'});
var regularW = new Style({font: '20px', color: 'white'});
var regularB = new Style({font: '16px', color: 'black'});
var regularG = new Style({font: '20px', color: '#216C21'});

export var fanState = 0;
export var humidityState = 0;
let maxFanSpeed = 4;
var humidity = 0;
var fanSpeed = 0;



// Screen layout
export var VentilationScreen = Column.template($ => ({   left: 0, right: 0, top: name_h, bottom: naviBar_h, skin: whiteSkin,   contents: [
   
      // Greenhouse's fans controller.
      new Fan(),
      
      // Greenhouse's humidity controller.
      new Humidity(),   ]}));

// Fan layout.
var Fan = Column.template($ => ({   left: 0, right: 0, top: 0, bottom: undefined,   contents: [
	  
	  Label($, {          left: 0, right: 0, top: padding / 2,          style: titleG, string: "Ventilation"       }),
      
      Picture($, {
      	left: 0, right: 0, top: padding / 2, bottom: undefined, url: "assets/fan.png",
      }),      
      
      Label($, {          left: 0, right: 0, top: padding / 2,          style: regularB, string: "Switch to adjust fans speed"       }),
      
      onFanSwitch = new MySwitchBtn({id: "fan", value: fanState}),
      
      fanSlider = new MySlider({ min: 0, max: maxFanSpeed, value: fanSpeed, id: "fan", on: fanState}),
      
      Label($, { left: 0, right: 0, top: 0, bottom: undefined,
      	style: regularB,
      	Behavior: class extends Behavior{			updateFanString(container, string) {				container.string = "Fan speed: " + fanSpeed;			}		}
      }),   ]}));

// Humidity layout
var Humidity = Column.template($ => ({
	left: 0, right: 0, top: padding, bottom: 0, skin: upperLineSkin,
	contents: [
		
		new Label({         	left: 0, right: 0, top: padding / 2, style: titleG, string: "Humidity"       	}),
      	
      	Picture($, {
      		left: 0, right: 0, top: padding / 2, bottom: undefined, url: "assets/big_humidity_b.png",
      	}),
      	
      	Label($, { 	         left: 0, right: 0, top: padding / 2, 	         style: regularB, string: "Switch to adjust humidity" 	    }),

      	onHumiditySwitch = new MySwitchBtn({id: "humidity", value: humidityState}),

      	Label ($, {left: 0, right: 0, top: padding / 2, 
      		style: regularB,
      		Behavior: class extends Behavior{				updateState(container, string) {					container.string = "Current humidity: " + Math.round(currHumidity) + "%";				}			}
		}),
		
      	humiditySlider = new MySlider({ min: 0, max: 100, value: humidity, id: "humidity", on: humidityState}),
      	
		Label ($, {left: 0, right: 0, top: 0, bottom: padding, style: regularB,
			Behavior: class extends Behavior{				updateHumidity(container, string) {					container.string = humidity + "%";				}			}
		}),
	]
}));

// On/off switchlet MySwitchBtn = SwitchButton.template($ => ({    height: 40, width: 100,    Behavior: class extends SwitchButtonBehavior {        onValueChanged(container){
        	if ($.id == "fan") {
        		// Fan slider is moving
        		if (this.data.value == 1) {
					fanState = 1;
					fanSlider.active = true;
					
				} else {
					fanState = 0;
					fanSlider.active = false;
					fanSpeed = 0;
				} 
				application.distribute("adjustVentSlider", fanSpeed);
				application.distribute("updateFanString");
        	} else {
        		// Humidity slider is moving
        		if (this.data.value == 1) {
					humidityState = 1;
					humiditySlider.active = true;
					
				} else {
					humidityState = 0;
					humiditySlider.active = false;
					humidity = 0;
				} 
				application.distribute("adjustVentSlider", humidity);
				application.distribute("updateHumidity");
        	}        }    }}));
var onFanSwitch;
var onHumiditySwitch;

// Sliderslet MySlider = HorizontalSlider.template($ => ({    height: 40, left: 50, right: 50, active: $.on,    Behavior: class extends HorizontalSliderBehavior {
    	        onValueChanged(container) {
 			if ($.id == "fan") {
 				// Changing the fan speed of a specific fan
 				// when the user uses the slider.
 				fanSpeed = this.data.value;
	        	fanSpeed = Math.round(fanSpeed);
	            application.distribute("updateFanString");
	            if (fanSpeed > 0) {application.distribute("onToggleFan", 1)}
	            else {application.distribute("onToggleFan", 0)}
	            
 			} else if ($.id == "humidity") {
 				// Changing humidity using a slider.
 				humidity = this.data.value;
	        	humidity = Math.round(humidity);	            application.distribute("updateHumidity");
 			}          }
        // Adjust fan and humidity slider when 
        // going back to the ventilation screen.
        adjustVentSlider(container) {
        	fanSlider.delegate("setValue", fanSpeed);
        	fanSlider.delegate("onLayoutChanged");
        	humiditySlider.delegate("setValue", humidity);
        	humiditySlider.delegate("onLayoutChanged");
        }    }}));
var fanSlider;
var humiditySlider;
