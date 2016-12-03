import { name_h, naviBar_h, padding, drawerScreen, currentScreen, Home, currTemperature, updateFreq} from "main";
import { SwitchButton, SwitchButtonBehavior } from 'switch';
import { HorizontalSlider, HorizontalSliderBehavior } from 'sliders';

// Skinslet blackSkin = new Skin ({fill: 'black'});let whiteSkin = new Skin ({fill: 'white'});
let graySkin = new Skin ({fill: '#6c6c6c'});
let greenSkin = new Skin ({fill: '#71e28b'});
let strokeSkin = new Skin({    fill: "transparent",    borders: {left: 0, right: 0, top: 1, bottom: 0}, 
    stroke: "black",});

// Fontsvar titleW = new Style({font: 'bold 18px', color: 'white'});
var titleB = new Style({font: 'bold 18px', color: 'black'});
var bigW = new Style({font: 'bold 24px', color: 'white'});

var drawerWidth = 200;
var drawerHeight = 250;
export var degree = "F";

export var Drawer = Container.template($ => ({   left: 0, right: undefined, top: name_h, bottom: undefined, 
   width: drawerWidth, height: drawerHeight, skin: graySkin,   contents: [      Column($, {
      	left: 0, right: 0, top: 0, bottom: 0,
      	contents: [
      	
      		// Connect to device
      		connect = new connectBtn({}),
      		
      		new Label({
      			left: padding, right: undefined, top: padding, bottom: undefined,
      			style: titleW, string: "Switch between",
      		}),
      		
      		new Label({
      			left: padding, right: undefined, top: 0, bottom: undefined,
      			style: titleW, string: "fahrenheit and celsius",
      		}),
      		
      		Line($, {
      			left: 0, right: 0, top: 0, bottom: 0,
      			contents: [
      				// Switch between degrees format
		      		degreesSwitch = new MySwitch({value: 0}),
		      		
		      		new Label({
		      			left: padding, right: undefined, top: 0, bottom: 0,
		      			style: bigW, string: degree,
		      			Behavior: class extends Behavior{								switchDegreeFormat(container, string) {									container.string = degree + "";								}							}
		      		}),
      			]
      		}),
      		
      		new updateSection,
      	]
      }),   ]}));

let updateSection = Column.template($ => ({    left: 0, right: 0, top: 0, bottom: 0, skin: strokeSkin,
    contents: [        new Label({ top: 0, bottom: 0, left: 0, right: 0,
        	style: titleW, string: "Adjust update frequency" 
        }),
        updateSlider = new MySlider({min: 1234, max: 12345, value: updateFreq}),   ] }));

// Connect to device button
let connectBtn = Container.template($ => ({    left: 0, right: 0, top: 0, bottom: undefined, 
    height: 50, active: true,
    
    behavior: Behavior({        onCreate: function(content){            this.upSkin = new Skin({                fill: "transparent",                borders: {left: 0, right: 0, top: 0, bottom: 1}, 
                stroke: "black",            });            this.downSkin = new Skin({                fill: "#B9DAB9",                 borders: {left: 0, right: 0, top: 0, bottom: 1}, 
                stroke: "black",            });            content.skin = this.upSkin;        },        onTouchBegan: function(content){            content.skin = this.downSkin;
            content.btnLabel.style = titleB;
            application.distribute("getHumidity");
			application.distribute("getTemperature");
			application.distribute("getSunlight");
			application.distribute("getAirflow");        },        onTouchEnded: function(content){			content.skin = this.upSkin;
			content.btnLabel.style = titleW;        },    }),
    contents: [        new Label({ top: 0, bottom: 0, left: 0, right: 0, name: "btnLabel",
        style: titleW, string: "Connect to Greenhouse" })   ] }));
var connect;

// Degrees switchlet MySwitch = SwitchButton.template($ => ({    height: 40, width: 100, top: 0, left: 0, right: undefined, bottom: 0,    Behavior: class extends SwitchButtonBehavior {        onValueChanged(container){
			if (this.data.value == 0) {
	            degree = "F";
	            currTemperature = currTemperature * (9 / 5) + 32;
	            currTemperature = Math.round(currTemperature);
			} else {
				degree = "C";
				currTemperature = (currTemperature - 32) * (5 / 9);
	            currTemperature = Math.round(currTemperature);
			} 
			application.distribute("switchDegreeFormat");
			application.distribute("updateState");        }    }}));
var degreesSwitch;

// Update frequency sliderlet MySlider = HorizontalSlider.template($ => ({    height: 40, left: 50, right: 50, active: true,     Behavior: class extends HorizontalSliderBehavior {    	        onValueChanged(container) { 			updateFreq = this.data.value;
	        updateFreq = Math.round(updateFreq);        }        adjustFreqSlider(container) {        	updateSlider.delegate("setValue", updateFreq);        	updateSlider.delegate("onLayoutChanged");        }    }}));var updateSlider;
