import {name_h, naviBar_h, padding} from "main";
import { currTemperature, currSunlight, currHumidity, currAirFlow, 
		number, currIrrigationState, currFanState} from "greenhouse";
import { HorizontalSlider, HorizontalSliderBehavior } from 'sliders';
import { SwitchButton, SwitchButtonBehavior } from 'switch';
import { LabeledCheckbox } from 'buttons';

// Skinslet blackSkin = new Skin ({fill: 'black'});let whiteSkin = new Skin ({fill: 'white'});
let graySkin = new Skin ({fill: '#999999'});
let greenSkin = new Skin ({fill: '#5CA05C'});
let strokeSkinW = new Skin({      fill: "transparent",      borders: {left: 1, right: 1, top: 1, bottom: 1},       stroke: "#999999"});
let strokeSkinG = new Skin({      fill: "#5CA05C",      borders: {left: 1, right: 1, top: 1, bottom: 1},       stroke: "#999999"});
let entranceSkin = new Skin({      fill: "transparent",      borders: {left: 0, right: 1, top: 1, bottom: 1},       stroke: "#999999"});

// Fontsvar titleW = new Style({font: 'bold 20px', color: 'white'});
var titleB = new Style({font: 'bold 20px', color: 'black'});
var titleG = new Style({font: 'bold 20px', color: '#216C21'});
var regularW = new Style({font: '20px', color: 'white'});
var regularB = new Style({font: '20px', color: 'black'});
var regularG = new Style({font: '20px', color: '#216C21'});
var smallB = new Style({font: '15px', color: 'black'});

let waterOn = "assets/irrigation_b.png";
let waterOff = "assets/irrigation_off.png";
var sectionClicked;
export var checkBoxSelected = 0;
export var irrigationState = [0,0,0,0,0,0];
export var initial = true;
var beginTime = [1,1,1,1,1,1];
var beginAMPM = [" AM", " AM", " AM", " AM", " AM", " AM"];
var endTime = [1,1,1,1,1,1];
var endAMPM = [" AM", " AM", " AM", " AM", " AM", " AM"];
var waterCanButtons = [];
var waterIcon = [waterOff, waterOff, waterOff, waterOff, waterOff, waterOff];
var waterPressure = 0;

export var IrrigationScreen = Column.template($ => ({   left: 0, right: 0, top: name_h, bottom: naviBar_h, skin: whiteSkin,   contents: [      new Label({ left: 0, right: 0, top: padding / 2, bottom: undefined, style: titleG, string: "Irrigation" }),
      
      new IrrigationGrid(),

      checkbox = new CheckBox({ name: "Apply settings to all sections." }),
      
      // Water pressure slider
      new Label({ left: padding, right: undefined, top: padding, bottom: undefined, style: smallB, string: "Adjust water pressure:" }),
      Line($, { left: 0, right: 0, top: 0, bottom: 0,
      	contents: [
      	
      		pressureSlider = new MySlider({min: 0, max: 3, value: 0, id: "pressure", on: false, width: 200}),
      		
      		Label($, {
      			left: padding, right: undefined, top: 0, bottom: 0,
      			style: regularB,
      			Behavior: class extends Behavior{					updatePressureLabel(container, string) {						container.string = irrigationState[sectionClicked];					}				}
      		}),	
      	]
      }),
      
      // Begin irrigation slider
      new Label({ left: padding, right: undefined, top: padding, bottom: undefined, style: smallB, string: "Adjust irrigation starting time:" }),
      Line($, { left: 0, right: 0, top: 0, bottom: 0,
      	contents: [
      	
      		irrigationBeginSlider = new MySlider({min: 1, max: 24, value: 1, id: "begin", on: false, width: 250}),
      		
      		Label($, {
      			left: padding / 2, right: undefined, top: 0, bottom: 0,
      			style: regularB,
      			Behavior: class extends Behavior{					updateBeginString(container, string) {						container.string = beginTime[sectionClicked] + beginAMPM[sectionClicked];					}				}
      		}),	
      	]
      }),
      
      // End irrigation slider
      new Label({ left: padding, right: undefined, top: padding, bottom: undefined, style: smallB, string: "Adjust irrigation ending time:" }),
      Line($, { left: 0, right: 0, top: 0, bottom: 0,
      	contents: [
      	
      		irrigationEndSlider = new MySlider({min: 1, max: 24, value: 1, id: "end", on: false, width: 250}),
      		
      		Label($, {
      			left: padding / 2, right: undefined, top: 0, bottom: 0,
      			style: regularB,
      			Behavior: class extends Behavior{					updateEndString(container, string) {						container.string = endTime[sectionClicked] + endAMPM[sectionClicked];					}				}
      		}),	
      	]
      }),   ]}));

// Irrigation sections grid layout.
var IrrigationGrid = Container.template($ => ({   left: padding, right: padding, top: 0, bottom: undefined,   contents: [
   	   	   
   	   	new entrance,           	
      	Column($, {
		  	left: 0, right: 0, top: 0, bottom: 0,
			contents: [
				Line($, {
				  	left: padding * 5, right: padding * 5, top: padding, bottom: 0,
					contents: [
						waterCanButtons[0] = new waterBtn({id: 0}),
						waterCanButtons[1] = new waterBtn({id: 1}),
						waterCanButtons[2] = new waterBtn({id: 2}),
					]
				}),
  
			  	Line($, {
			  		left: padding * 5, right: padding * 5, top: padding, bottom: 0,
					contents: [
						waterCanButtons[3] = new waterBtn({id: 3}),
						waterCanButtons[4] = new waterBtn({id: 4}),
						waterCanButtons[5] = new waterBtn({id: 5}),
					]
			  	}),
			]
		}),         	   ]}));

var entrance = Container.template($ => ({   left: undefined, right: 35, top: padding * 2, bottom: undefined, 
   height: 55, width: 15, skin: entranceSkin,}));

// Water button
let waterBtn = Container.template($ => ({    left: 0, right: 0, top: 0, bottom: 0, active: true,
    
    behavior: Behavior({        onCreate: function(content){
        	this.upSkin = strokeSkinW;
        	this.downSkin = strokeSkinG;            content.skin = this.upSkin;        },        onTouchBegan: function(content){            content.skin = this.downSkin;
            sectionClicked = $.id;
            pressureSlider.active = true;
            irrigationBeginSlider.active = true;
            irrigationEndSlider.active = true;        },        onTouchEnded: function(content){
        	// When a water button clicked, 
        	// change the skin of the rest of them back to white.
        	for (var i = 0; i < waterCanButtons.length; i++) {
        		if ($.id != i) {
        			waterCanButtons[i].skin = this.upSkin;
        		}
        	}
        	initial = false;
        	
        	// Update sliders position and labels.
        	application.distribute("updatePressureLabel");
        	application.distribute("updateBeginString");
        	application.distribute("updateEndString");
        	application.distribute("adjustIrrigationSliders");        },    }),    	contents: [        Picture($, { top: 0, bottom: undefined, left: 0, right: 0, 
        	height: 32, width: 32, url: waterIcon[$.id],
	        Behavior: class extends Behavior{				updateWaterBtn(container, url) {					container.url = waterIcon[$.id];				}			}
        })   ]}));

// Sliderslet MySlider = HorizontalSlider.template($ => ({    left: 10, right: undefined, height: 40, width: $.width, active: $.on,    Behavior: class extends HorizontalSliderBehavior {
    	        onValueChanged(container) {
        
 			if ($.id == "pressure" && !initial) {
 				// Changing water pressure of a specific zone
 				// when the user uses the slider.
 				waterPressure = this.data.value;
	        	waterPressure = Math.round(waterPressure);
	        	if (pressureSlider.active) {irrigationState[sectionClicked] = waterPressure;}
	        	application.distribute("updatePressureLabel");
	            if (waterPressure > 0) {application.distribute("onToggleIrrigation", 1)}
	            else {application.distribute("onToggleIrrigation", 0)}
	            

 			} else if ($.id == "begin" && !initial) {
 				// Changing the beginning of the irrigation schedule using a slider.
 				var val = this.data.value;
	        	val = Math.round(val);
	        	if (val == 12) {
	        		beginTime[sectionClicked] = val;
	        		beginAMPM[sectionClicked] = " PM";
	        	} else if (val == 24) {
	        		beginTime[sectionClicked] = val - 12;
	        		beginAMPM[sectionClicked] = " AM";
	        	} else if (val > 12) {
	        		beginTime[sectionClicked] = val - 12;
	        		beginAMPM[sectionClicked] = " PM";
	        	}
	        	else if (val < 12) {
	        		beginTime[sectionClicked] = val;
	        		beginAMPM[sectionClicked] = " AM";
	        	} 	            application.distribute("updateBeginString");
	            
 			} else if ($.id == "end" && !initial) {
 				// Changing the end of the irrigation schedule using a slider.
 				var val = this.data.value;
	        	val = Math.round(val);
	        	if (val == 12) {
	        		endTime[sectionClicked] = val;
	        		endAMPM[sectionClicked] = " PM";
	        	} else if (val == 24) {
	        		endTime[sectionClicked] = val - 12;
	        		endAMPM[sectionClicked] = " AM";
	        	} else if (val > 12) {
	        		endTime[sectionClicked] = val - 12;
	        		endAMPM[sectionClicked] = " PM";
	        	} else if (val < 12) {
	        		endTime[sectionClicked] = val;
	        		endAMPM[sectionClicked] = " AM";
	        	}	            application.distribute("updateEndString");
 			}          }
        onTouchEnded(container) {
        	adjustIrrigationImages();
        }
    
        // Adjust sliders when 
        // going back to the irrigation screen.
        adjustIrrigationSliders(container) {
        	// Adjust water pressure slider
        	pressureSlider.delegate("setValue", irrigationState[sectionClicked]);
        	pressureSlider.delegate("onLayoutChanged");
        	
        	// Adjust begin schedule slider       	
        	var begin = 1;
        	if (beginAMPM[sectionClicked] == " PM" && beginTime[sectionClicked] != 12) {
        		begin = beginTime[sectionClicked] + 12;
        	} else if (beginTime[sectionClicked] == 12 && beginAMPM[sectionClicked] == " AM") {
        		begin = beginTime[sectionClicked] + 12;
        	} else {begin = beginTime[sectionClicked];}
        	
        	irrigationBeginSlider.delegate("setValue", begin);
        	irrigationBeginSlider.delegate("onLayoutChanged");
        	
        	// Adjust end schedule slider
        	var end = 1;
        	if (endAMPM[sectionClicked] == " PM" &&  endTime[sectionClicked] != 12) {
        		end = endTime[sectionClicked] + 12;
        	} else if (endTime[sectionClicked] == 12 && endAMPM[sectionClicked] == " AM") {
        		end = endTime[sectionClicked] + 12;
        	} else {end = endTime[sectionClicked];}
        	
        	irrigationEndSlider.delegate("setValue", end);
        	irrigationEndSlider.delegate("onLayoutChanged");
        }    }}));
var pressureSlider;
var irrigationBeginSlider;
var irrigationEndSlider;

function adjustIrrigationImages(){
	if (irrigationState[sectionClicked] > 0) {         	
    	waterIcon[sectionClicked] = waterOn;
    } else {
        waterIcon[sectionClicked] = waterOff;
    }
    application.distribute("updateWaterBtn");
}

// Auto/manual switchlet MySwitchTemplate = SwitchButton.template($ => ({    height: 40, width: 100,    Behavior: class extends SwitchButtonBehavior {        onValueChanged(container){
			if (this.data.value == 1) {
				irrigationManualState = 1;
				pressureSlider.active = true;
				application.distribute("adjustIrrigationSlider");
			} else {
				irrigationManualState = 0;
				pressureSlider.active = false;
			}         }    }}));

let CheckBox = LabeledCheckbox.template($ => ({    active: true, top: padding, bottom: padding, left: padding, right: padding,    behavior: Behavior({        onSelected: function(checkBox){            checkBoxSelected = 1;        },        onUnselected: function(checkBox){            checkBoxSelected = 0;        },
        adjustCheckBox(checkBox) {
        	checkbox.distribute("setSelected", true, false);
        }    })}));var checkbox;
