import {name_h, naviBar_h, padding, currTemperature} from "main";
import { HorizontalSlider, HorizontalSliderBehavior } from 'sliders';

// Skinslet blackSkin = new Skin ({fill: 'black'});let whiteSkin = new Skin ({fill: 'white'});
let graySkin = new Skin ({fill: '#999999'});
let greenSkin = new Skin ({fill: '#71e28b'});

// Fontsvar titleW = new Style({font: 'bold 20px', color: 'white'});
var titleB = new Style({font: 'bold 20px', color: 'black'});
var titleG = new Style({font: 'bold 20px', color: '#71e28b'});
var regularW = new Style({font: '20px', color: 'white'});
var regularB = new Style({font: '20px', color: 'black'});
var regularG = new Style({font: '20px', color: '#71e28b'});


// Sliderslet TempSlider = HorizontalSlider.template($ => ({    height: 40, left: 50, right: 50, active: true,    Behavior: class extends HorizontalSliderBehavior {
    	        onValueChanged(container) {
        	setTemp = this.data.value;
        	setTemp = Math.round(setTemp);
        	application.distribute("updateSetTemp");          }
        adjustTempSlider(container) {
        	tempSlider.delegate("setValue", setTemp);
        	tempSlider.delegate("onLayoutChanged");
        }    }}));
var tempSlider;

var setTemp = 0;

export var TemperatureScreen = Column.template($ => ({   left: 0, right: 0, top: name_h, bottom: naviBar_h, skin: whiteSkin,   contents: [      Label($, {          left: 0, right: 0, top: padding, bottom: undefined, style: titleG,          string: "Temperature"       }),
      new Picture({left: 0, right: 0, top: padding, bottom: undefined, url: "assets/big_sun_b.png"}),
      Label($, {          left: 0, right: 0, top: padding, bottom: undefined, style: regularB, 
         Behavior: class extends Behavior{			updateCurrTemp(container, string) {				container.string = "Current temperature: " + currTemperature + " F";			}		 }       }),
      tempSlider = new TempSlider({min: 0, max: 140, value: setTemp}),
      Label($, {          left: 0, right: 0, top: padding, bottom: undefined, style: regularB,          string: setTemp,
         Behavior: class extends Behavior{			updateSetTemp(container, string) {				container.string = setTemp + "";			}		 }      }),   ]}));