import {name_h, naviBar_h, padding } from "main";
import { currTemperature, currSunlight, currHumidity, currAirFlow, 
		number, currIrrigationState, currFanState} from "greenhouse";
import { HorizontalSlider, HorizontalSliderBehavior } from 'sliders';
import { SwitchButton, SwitchButtonBehavior } from 'switch';

// Skinslet blackSkin = new Skin ({fill: 'black'});let whiteSkin = new Skin ({fill: 'white'});
let graySkin = new Skin ({fill: '#999999'});
let greenSkin = new Skin ({fill: '#5CA05C'});

// Fontsvar titleW = new Style({font: 'bold 20px', color: 'white'});
var titleB = new Style({font: 'bold 20px', color: 'black'});
var titleG = new Style({font: 'bold 20px', color: '#216C21'});
var regularW = new Style({font: '20px', color: 'white'});
var regularB = new Style({font: '20px', color: 'black'});
var regularG = new Style({font: '20px', color: '#216C21'});

export var heaterState = 0;
var temperature = 0;

// Sliderslet TempSlider = HorizontalSlider.template($ => ({    height: 40, left: 50, right: 50, active: $.on,    Behavior: class extends HorizontalSliderBehavior {
    	        onValueChanged(container) {
        	temperature = this.data.value;
        	temperature = Math.round(temperature);
        	application.distribute("updateTempString");          }
        adjustTempSlider(container) {
        	tempSlider.delegate("setValue", temperature);
        	tempSlider.delegate("onLayoutChanged");
        }    }}));
var tempSlider;

export var TemperatureScreen = Column.template($ => ({   left: 0, right: 0, top: name_h, bottom: naviBar_h, skin: whiteSkin,   contents: [      Label($, {          left: 0, right: 0, top: padding, bottom: undefined, style: titleG,          string: "Temperature"       }),
      
      new Picture({left: 0, right: 0, top: padding, bottom: undefined, url: "assets/big_temp_r.png"}),
      
      heaterSwitch = new MySwitch({id: "light", value: heaterState}),
      
      Label($, {          left: 0, right: 0, top: padding, bottom: undefined, style: regularB, 
         Behavior: class extends Behavior{			updateState(container, string) {				container.string = "Current temperature: " + currTemperature + " F";			}		 }       }),
      
      tempSlider = new TempSlider({min: 0, max: 140, value: temperature, on: heaterState}),
      
      Label($, {          left: 0, right: 0, top: padding, bottom: undefined, style: regularB,          string: temperature,
         Behavior: class extends Behavior{			updateTempString(container, string) {				container.string = temperature;			}		 }      }),   ]}));

// On/off switchlet MySwitch = SwitchButton.template($ => ({    height: 40, width: 100,    Behavior: class extends SwitchButtonBehavior {        onValueChanged(container){
			if (this.data.value == 1) {
				tempSlider.active = true;
				heaterState = 1;
			} else {
				temperature = 0;
				tempSlider.active = false;
				heaterState = 0;	
			} 
			application.distribute("updateTempString");
			application.distribute("adjustTempSlider");        }    }}));
var heaterSwitch;