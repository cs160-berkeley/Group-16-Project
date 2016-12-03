import {name_h, naviBar_h, padding} from "main";
import { HorizontalSlider, HorizontalSliderBehavior } from 'sliders';
import { SwitchButton, SwitchButtonBehavior } from 'switch';
import { LabeledCheckbox } from 'buttons';

// Skinslet blackSkin = new Skin ({fill: 'black'});let whiteSkin = new Skin ({fill: 'white'});
let graySkin = new Skin ({fill: '#999999'});
let greenSkin = new Skin ({fill: '#5CA05C'});
let strokeSkinW = new Skin({      fill: "transparent",});
let strokeSkinG = new Skin({      fill: "#B9DAB9",});

// Fontsvar titleW = new Style({font: 'bold 20px', color: 'white'});
var titleB = new Style({font: 'bold 20px', color: 'black'});
var titleG = new Style({font: 'bold 20px', color: '#216C21'});
var regularW = new Style({font: '20px', color: 'white'});
var regularB = new Style({font: '20px', color: 'black'});
var regularG = new Style({font: '20px', color: '#216C21'});
var smallB = new Style({font: '15px', color: 'black'});

// Plant images
let waterOn = "assets/irrigation_b.png";
let waterOff = "assets/irrigation_off.png";
let plant1 = "assets/plant1.png";
let plant2 = "assets/plant2.png";
let plant3 = "assets/plant3.png";
let plant4 = "assets/plant4.png";
let plant5 = "assets/plant5.png";
let plant6 = "assets/plant6.png";
let flower = "assets/flower.png";

var sectionClicked;
export var irrigationState = [0,0,0,0,0,0];
export var initial = true;
var beginTime = [1,1,1,1,1,1];
var beginAMPM = [" AM", " AM", " AM", " AM", " AM", " AM"];
var endTime = [1,1,1,1,1,1];
var endAMPM = [" AM", " AM", " AM", " AM", " AM", " AM"];
var waterCanButtons = [];
//var waterIcon = [plant1, plant2, plant3, plant4, plant5, plant6];
var waterIcon = [flower, flower, flower, flower, flower, flower];

export var IrrigationScreen = Container.template($ => ({   left: 0, right: 0, top: name_h, bottom: naviBar_h, skin: whiteSkin,   contents: [
   
   		Picture($, {
	   		left: 0, right: undefined, top: undefined, bottom: 0, 
	   		height: 150, width: 400, url: "assets/grass.png",
	   	}),
	   		   	      	Column($, {
      		left: 0, right: 0, top: 0, bottom: 0,
      		contents: [
      			new Label({ left: 0, right: 0, top: padding / 2, bottom: undefined, style: titleB, string: "Irrigation" }),
		      	new Label({ left: 0, right: 0, top: padding / 2, bottom: undefined, style: smallB, string: "Tap to select section" }),
		      	new IrrigationGrid(),
		
		      
		      
		      	// Water on/off switch
		      	new Label({ left: padding, right: undefined, top: padding, bottom: undefined, style: smallB, string: "Switch to turn irrigation on" }),
		      	Line($, { left: 0, right: 0, top: 0, bottom: 0,
		      		contents: [      	
		      			onSwitch = new MySwitch({value: 0, on: false}),
		      		]
		     	 }),
		      
		      	// Begin irrigation slider
		      	new Label({ left: padding, right: undefined, top: padding, bottom: undefined, style: smallB, string: "Irrigation starting time" }),
		      	Line($, { left: 0, right: 0, top: 0, bottom: 0,
		      		contents: [
		      	
		      			irrigationBeginSlider = new MySlider({min: 1, max: 24, value: 1, id: "begin", on: false, width: 250}),
		      		
		      			Label($, {
		      				left: padding / 2, right: undefined, top: 0, bottom: 0,
			      			style: regularB,
			      			Behavior: class extends Behavior{								updateBeginString(container, string) {									container.string = beginTime[sectionClicked] + beginAMPM[sectionClicked];								}							}
			      		}),	
			      	]
			     }),
		      
		      	// End irrigation slider
		      	new Label({ left: padding, right: undefined, top: padding, bottom: undefined, style: smallB, string: "Irrigation ending time" }),
		      	Line($, { left: 0, right: 0, top: 0, bottom: 0,
			      	contents: [
			      	
			      		irrigationEndSlider = new MySlider({min: 1, max: 24, value: 1, id: "end", on: false, width: 250}),
			      		
			      		Label($, {
			      			left: padding / 2, right: undefined, top: 0, bottom: 0,
			      			style: regularB,
			      			Behavior: class extends Behavior{								updateEndString(container, string) {									container.string = endTime[sectionClicked] + endAMPM[sectionClicked];								}							}
			      		}),	
			      	]
			     }),
      		]
      	}),   ]}));

// Irrigation sections grid layout.
var IrrigationGrid = Container.template($ => ({   left: padding * 4, right: undefined, top: padding, bottom: undefined, width: 250,   contents: [
   	   	   
      	Column($, {
		  	left: 0, right: 0, top: 0, bottom: 0,
			contents: [
				Line($, {
				  	left: 0, right: 0, top: 0, bottom: 0, height: padding * 4,
					contents: [
						waterCanButtons[0] = new waterBtn({id: 0}),
						waterCanButtons[1] = new waterBtn({id: 1}),
						waterCanButtons[2] = new waterBtn({id: 2}),
					]
				}),
  
			  	Line($, {
			  		left: 0, right: 0, top: 0, bottom: 0, height: padding * 4,
					contents: [
						waterCanButtons[3] = new waterBtn({id: 3}),
						waterCanButtons[4] = new waterBtn({id: 4}),
						waterCanButtons[5] = new waterBtn({id: 5}),
					]
			  	}),
			]
		}),
		Picture($, {
   			left: 0, right: 0, top: 0, bottom: 0, url: "assets/layout.png",
   		}),          	   ]}));

// Water button
let waterBtn = Container.template($ => ({    left: 0, right: 0, top: 0, bottom: 0, active: true,
    
    behavior: Behavior({        onCreate: function(content){
        	this.upSkin = strokeSkinW;
        	this.downSkin = strokeSkinG;            content.skin = this.upSkin;        },        onTouchBegan: function(content){            content.skin = this.downSkin;
            sectionClicked = $.id;
            onSwitch.active = true;
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
        	var val = 0;
        	if (irrigationState[sectionClicked] == 1) {val = 60;}
        	application.distribute("onSwitch", val);
        	application.distribute("updateBeginString");
        	application.distribute("updateEndString");
        	application.distribute("adjustIrrigationSliders");        },    }),    	contents: [        Picture($, { top: padding / 2, bottom: undefined, left: 0, right: 0, 
        	height: 28, width: 28, url: waterIcon[$.id],
	        Behavior: class extends Behavior{				updateWaterBtn(container, url) {					container.url = waterIcon[$.id];				}			}
        })   ]}));

// Sliderslet MySlider = HorizontalSlider.template($ => ({    left: 10, right: undefined, height: 40, width: $.width, active: $.on,    Behavior: class extends HorizontalSliderBehavior {
    	        onValueChanged(container) {
 			if ($.id == "begin" && !initial) {
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
        	//adjustIrrigationImages();
        }
    
        // Adjust sliders when 
        // going back to the irrigation screen.
        adjustIrrigationSliders(container) {
        	
        	
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
var irrigationBeginSlider;
var irrigationEndSlider;

function adjustIrrigationImages(){
	if (irrigationState[sectionClicked] > 0) {         	
    	waterCanButtons[sectionClicked].skin = graySkin;
    } else {
        waterIcon[sectionClicked] = waterOff;
    }
    application.distribute("updateWaterBtn");
}

// On/off switchlet MySwitch = SwitchButton.template($ => ({    height: 40, width: 100, active: $.on,    Behavior: class extends SwitchButtonBehavior {        onValueChanged(container){
			if (this.data.value == 1) {
				irrigationState[sectionClicked] = 1;
				irrigationBeginSlider.active = true;
				irrigationEndSlider.active = true;
				application.distribute("onToggleIrrigation", 1);
				application.distribute("adjustIrrigationSlider");
			} else {				
				irrigationState[sectionClicked] = 0;				
				irrigationBeginSlider.active = false;
				irrigationEndSlider.active = false;
				application.distribute("onToggleIrrigation", 0);
			}         }
        onSwitch(container, value) {
        	onSwitch.delegate("changeOffset", this.size - value);
        	if (value == 0) {
        		irrigationState[sectionClicked] = 0;
        		trace("should be 0: " + irrigationState[sectionClicked] + "\n");
        	} else {
        		irrigationState[sectionClicked] = 1;
        		trace("should be 1: " + irrigationState[sectionClicked] + "\n");
        	}
        }    }}));
var onSwitch;
