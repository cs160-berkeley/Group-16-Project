import {name_h, naviBar_h, padding, currTemperature} from "main";
import { HorizontalSlider, HorizontalSliderBehavior } from 'sliders';

// Skins
let graySkin = new Skin ({fill: '#999999'});
let greenSkin = new Skin ({fill: '#71e28b'});

// Fonts
var titleB = new Style({font: 'bold 20px', color: 'black'});
var titleG = new Style({font: 'bold 20px', color: '#71e28b'});
var regularW = new Style({font: '20px', color: 'white'});
var regularB = new Style({font: '20px', color: 'black'});
var regularG = new Style({font: '20px', color: '#71e28b'});


// Sliders
    	
        	setTemp = this.data.value;
        	setTemp = Math.round(setTemp);
        	application.distribute("updateSetTemp");  
        adjustTempSlider(container) {
        	tempSlider.delegate("setValue", setTemp);
        	tempSlider.delegate("onLayoutChanged");
        }
var tempSlider;

var setTemp = 0;

export var TemperatureScreen = Column.template($ => ({
      new Picture({left: 0, right: 0, top: padding, bottom: undefined, url: "assets/big_sun_b.png"}),
      Label($, { 
         Behavior: class extends Behavior{
      tempSlider = new TempSlider({min: 0, max: 140, value: setTemp}),
      Label($, { 
         Behavior: class extends Behavior{