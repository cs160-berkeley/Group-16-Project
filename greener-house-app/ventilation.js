// Imports
import { name_h, naviBar_h, currHumidity } from "main";
import { HorizontalSlider, HorizontalSliderBehavior } from 'sliders';

// Skins
let graySkin = new Skin ({fill: '#999999'});
let greenSkin = new Skin ({fill: '#71e28b'});
let upperLineSkin = new Skin({

// Fonts
var titleB = new Style({font: 'bold 20px', color: 'black'});
var titleG = new Style({font: 'bold 20px', color: '#71e28b'});
var regularW = new Style({font: '20px', color: 'white'});
var regularB = new Style({font: '20px', color: 'black'});
var regularG = new Style({font: '20px', color: '#71e28b'});


// Fan button.
let FanBtn = Container.template($ => ({
    
    behavior: Behavior({
            // Since a button was clicked,
        	// we can now adjust the fan slider.
        	fanSlider.active = true;
        	fanClicked = $.id;
        	fanSpeed = fanState[fanClicked];
        	// When a fan button clicked, 
        	// change the skin of the rest of them back to white.
        	for (var i = 0; i < fanButtons.length; i++) {
        		if ($.id != i) {
        			fanButtons[i].skin = this.upSkin;
        		}
        	}
        	// Update the fan slider position and label.
        	application.distribute("adjustVentSlider", fanState[fanClicked]);
        style: titleB, string: fanState[$.id],
        	Behavior: class extends Behavior{
        })

export var fanState = [0,0,0,0,0,0];
var fanButtons = [];
let maxFanSpeed = 4;
let padding = 10;
var humidity = 0;
var fanSpeed = 0;
var fanClicked = -1;

// Sliders
    	
 			if ($.id == "fan") {
 				// Changing the fan speed of a specific fan
 				// when the user uses the slider.
 				fanSpeed = this.data.value;
	        	fanSpeed = Math.round(fanSpeed);
	        	if (fanSlider.active) {fanState[fanClicked] = fanSpeed;}
	            application.distribute("updateFanString");
	            if (fanSpeed > 0) {application.distribute("onToggleFan", 1)}
	            else {application.distribute("onToggleFan", 0)}
	            
 			} else if ($.id == "humidity") {
 				// Changing humidity using a slider.
 				humidity = this.data.value;
	        	humidity = Math.round(humidity);
 			}  
        // Adjust fan and humidity slider when 
        // going back to the ventilation screen.
        adjustVentSlider(container, fanValue) {
        	fanSlider.delegate("setValue", fanValue);
        	fanSlider.delegate("onLayoutChanged");
        	humiditySlider.delegate("setValue", humidity);
        	humiditySlider.delegate("onLayoutChanged");
        }
var fanSlider;
var humiditySlider;

// Screen layout
export var VentilationScreen = Column.template($ => ({
   
      Label($, { 
      
      // Greenhouse's fans controller.
      new FanGrid(),
      
      // Greenhouse's humidity controller.
      new Humidity(),

// Fan grid layout.
var FanGrid = Column.template($ => ({
   
	  	left: 0, right: 0, top: 0, bottom: 0,
			contents: [
				fanButtons[0] = new FanBtn({id: 0}),
				fanButtons[1] = new FanBtn({id: 1}),
				fanButtons[2] = new FanBtn({id: 2}),
			]
	  }),
	  Line($, {
	  	left: 0, right: 0, top: 0, bottom: 0,
			contents: [
				fanButtons[3] = new FanBtn({id: 3}),
				fanButtons[4] = new FanBtn({id: 4}),
				fanButtons[5] = new FanBtn({id: 5}),
			]
	  }),
	  
      fanSlider = new MySlider({ min: 0, max: maxFanSpeed, value: fanSpeed, id: "fan", on: false}),

// Humidity layout
var Humidity = Column.template($ => ({
	left: 0, right: 0, top: 0, bottom: 0, height: VentilationScreen.height / 2, skin: upperLineSkin,
	contents: [
		
		new Label({ 
      	
      	new Label ({left: 0, right: 0, top: padding, 
      		style: regularB, string: "current humidity: " + Math.round(currHumidity) + "%",
		}),
      	
      	humiditySlider = new MySlider({ min: 0, max: 100, value: humidity, id: "humidity", on: true}),
		Label ($, {left: 0, right: 0, top: 0, style: regularB,
			Behavior: class extends Behavior{
		}),
	]
}));