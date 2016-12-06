import {name_h, naviBar_h, padding, currentScreen, currSunlight, updateFreq, deviceURL } from "main";
import { HorizontalSlider, HorizontalSliderBehavior } from 'sliders';
import { SwitchButton, SwitchButtonBehavior } from 'switch';

// Skinslet whiteSkin = new Skin ({fill: 'white'});
let greenSkin = new Skin ({fill: '#5CA05C'});
let grass = new Texture("assets/grass.png");
let grassSkin = new Skin({      width: 400, height: 150,      texture: grass,      fill: "transparent",      aspect: "fill"});
let transparentSkin = new Skin({ fill: "transparent" });

// Fonts
var titleB = new Style({font: 'bold 20px', color: 'black'});
var regularW = new Style({font: '20px', color: 'white'});
var regularB = new Style({font: '16px', color: 'black'});

export var sunlightState = 0;
var lightValue = 0;
var sunImg = "assets/big_sun_y.png";

export var SunlightScreen = Container.template($ => ({   left: 0, right: 0, top: name_h, bottom: naviBar_h, skin: whiteSkin,   contents: [
   		      Picture($, {
	   	left: 0, right: undefined, top: undefined, bottom: 0, 
	   	height: 150, width: 400, url: "assets/grass.png",
	  }),
	        Column($, {
      		left: 0, right: 0, top: 0, bottom: 0,
      		contents: [
      			Label($, { 			         left: 0, right: 0, top: padding / 2, bottom: 0, style: titleB, 			         string: "UV Exposure" 			    }),
			      
			    Picture($, {
			      	left: 0, right: 0, top: padding, bottom: 0, url: sunImg, height: 64, width: 64,
			    }),
			    
			    Label($, { 			         left: 0, right: 0, top: padding, bottom: 0, style: regularB, 			         string: "Switch to adjust light exposure" 			    }),
			      
			    lightSwitch = new MySwitch({id: "light", value: sunlightState}),
			      
			    lightSlider = new MySlider({ min: 0, max: 100, value: lightValue, id: "light", on: sunlightState}),
			      
			    Label($, { 			         left: 0, right: 0, top: 0, bottom: undefined, style: regularB,
			         Behavior: class extends Behavior{						updateLightString(container, string) {							container.string = lightValue;						}					}			    }),
			      
			    new sunlightDiagram(data),
			]
		}),   ]}));

// On/off switchlet MySwitch = SwitchButton.template($ => ({    height: 40, width: 100, top: padding,    Behavior: class extends SwitchButtonBehavior {        onValueChanged(container){
			if (this.data.value == 1) {
				lightSlider.active = true;
				sunlightState = 1;
				//if (lightValue > 0) {application.distribute("onToggleLight", 1)}
	            //else {application.distribute("onToggleLight", 0)}
	            if (deviceURL != "") new Message(deviceURL + "sunlightOn").invoke(Message.JSON).then(json => {});
			} else {
				lightValue = 0;
				lightSlider.active = false;
				sunlightState = 0;
				if (deviceURL != "") new Message(deviceURL + "sunlightOff").invoke(Message.JSON).then(json => {});
			} 
			application.distribute("updateLightString");
			application.distribute("adjustLightSlider");
			application.distribute("adjustInfoIcons");        }    }}));
var lightSwitch;

// Sliderslet MySlider = HorizontalSlider.template($ => ({    height: 40, left: 30, right: 30, active: $.on,    Behavior: class extends HorizontalSliderBehavior {
    	        onValueChanged(container) {
 			if ($.id == "light") {
 				lightValue = this.data.value;
	        	lightValue = Math.round(lightValue);
	            application.distribute("updateLightString");
 			}          }
        // Adjust light slider when 
        // going back to the sunlight screen.
        adjustLightSlider(container) {
        	lightSlider.delegate("setValue", lightValue);
        	lightSlider.delegate("onLayoutChanged");
        }    }}));
var lightSlider;

// Sunlight diagram
let SAMPLEGRAPH = require("creations/sampleGraph");let sunlightDiagram = Column.template($ => ({	left: 0, right: 0, top: 0, bottom: undefined, skin: transparentSkin,	Behavior: class extends Behavior {		generateTestValue(container) {
			let duration = 4000;			let fraction = (container.time % duration) / duration;			let value = Math.sin(fraction * (2 * Math.PI));			value = (1 + value) / 2;			return currSunlight / 100;		}		onDisplaying(container) {			container.interval = updateFreq;			container.start();		}		onTimeChanged(container) {			let value = this.generateTestValue(container);			container.firstMeter.distribute("onMeterLevelChanged", value);		}	},	contents: [
		Label($, { 	         left: 0, right: 0, top: 0, bottom: undefined, style: regularB, 	         string: "Current sunlight: " + Math.round(currSunlight) + "%",	         Behavior: class extends Behavior{				updateState(container, string) {					container.string = "Current natural light: " + Math.round(currSunlight) + "%";				}			 }      	}),		SAMPLEGRAPH.LevelMeterWithProbe($.first, { left: padding / 2, right: 0, top: padding, bottom: 0, height:80, name:'firstMeter' }),		]}));let data = { 	first : { numSamples : 22, barColor : "#cfb11f", currentBarColor : "black" },}
