import {name_h, naviBar_h, padding, currentScreen} from "main";
import { HorizontalSlider, HorizontalSliderBehavior } from 'sliders';
import { currTemperature, currSunlight, currHumidity, currAirFlow, 
		number, currIrrigationState, currFanState} from "greenhouse";
import { SwitchButton, SwitchButtonBehavior } from 'switch';

// Skinslet blackSkin = new Skin ({fill: 'black'});let whiteSkin = new Skin ({fill: 'white'});
let graySkin = new Skin ({fill: '#999999'});
let greenSkin = new Skin ({fill: '#5CA05C'});

// Fontsvar titleW = new Style({font: 'bold 20px', color: 'white'});
var titleB = new Style({font: 'bold 20px', color: 'black'});
var titleG = new Style({font: 'bold 20px', color: '#216C21'});
var regularW = new Style({font: '20px', color: 'white'});
var regularB = new Style({font: '16px', color: 'black'});
var regularG = new Style({font: '20px', color: '#216C21'});

export var sunlightState = 0;
var lightValue = 0;
let sunlightDiagramHeight = 80;
var sunImg = "assets/big_sun_y.png";

export var SunlightScreen = Column.template($ => ({   left: 0, right: 0, top: name_h, bottom: naviBar_h, skin: whiteSkin,   contents: [
         Label($, {          left: 0, right: 0, top: padding / 2, bottom: undefined, style: titleG,          string: "UV Exposure"       }),
      
      Picture($, {
      	left: 0, right: 0, top: padding / 2, bottom: undefined, url: sunImg,
      }),
      
      Label($, {          left: 0, right: 0, top: padding, bottom: undefined, style: regularB,          string: "Switch to adjust light exposure"       }),
      
      lightSwitch = new MySwitch({id: "light", value: sunlightState}),
      
      lightSlider = new MySlider({ min: 0, max: 100, value: lightValue, id: "light", on: sunlightState}),
      
      Label($, {          left: 0, right: 0, top: 0, bottom: undefined, style: regularB,
         Behavior: class extends Behavior{			updateLightString(container, string) {				container.string = lightValue;			}		}      }),
      
      new sunlightDiagram(data),
      
         ]}));

// On/off switchlet MySwitch = SwitchButton.template($ => ({    height: 40, width: 100,    Behavior: class extends SwitchButtonBehavior {        onValueChanged(container){
			if (this.data.value == 1) {
				lightSlider.active = true;
				sunlightState = 1;
				if (lightValue > 0) {application.distribute("onToggleLight", 1)}
	            else {application.distribute("onToggleLight", 0)}
	            
			} else {
				lightValue = 0;
				lightSlider.active = false;
				sunlightState = 0;
				
			} 
			application.distribute("updateLightString");
			application.distribute("adjustLightSlider");        }    }}));
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
let SAMPLEGRAPH = require("creations/sampleGraph");let sunlightDiagram = Column.template($ => ({	left: padding, right:0, top: undefined, bottom: 0, skin: whiteSkin,	Behavior: class extends Behavior {		generateTestValue(container) {			let duration = 4000;			let fraction = (container.time % duration) / duration;			let value = Math.sin(fraction * 2 * Math.PI);			value = (1 + value) / 2;			return value;		}		onDisplaying(container) {			container.interval = 100;			container.start();		}		onTimeChanged(container) {			let value = this.generateTestValue(container);			container.firstMeter.distribute("onMeterLevelChanged", value);		}	},	contents: [		SAMPLEGRAPH.LevelMeterWithProbe($.first, { left:0, right:0, top:padding, height:100, name:'firstMeter' }),
		Label($, {          left: 0, right: 0, top: padding / 2, bottom: undefined, style: regularB,          string: "Current sunlight: " + currSunlight + "%",
         Behavior: class extends Behavior{			updateState(container, string) {				container.string = "Current natural light: " + currSunlight + "%";			}		}      }),	]}));let data = { 	first : { numSamples : 22, barColor : "#5CA05C", currentBarColor : "black" },	// data scoped for firstMeter}
