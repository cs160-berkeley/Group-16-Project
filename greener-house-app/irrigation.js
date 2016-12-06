import {name_h, naviBar_h, padding, deviceURL} from "main";
import { HorizontalSlider, HorizontalSliderBehavior } from 'sliders';
import { SwitchButton, SwitchButtonBehavior } from 'switch';
import { LabeledCheckbox } from 'buttons';
import { TimePicker } from 'time_picker';

// Skinslet blackSkin = new Skin ({fill: 'black'});let whiteSkin = new Skin ({fill: 'white'});
let graySkin = new Skin ({fill: '#999999'});
let greenSkin = new Skin ({fill: '#5CA05C'});

let transparentSkin = new Skin({fill: "transparent"});
let strokeSkinG = new Skin({fill: "#B9DAB9"});
let strokeSkinB = new Skin({fill: "#678F8F"});
let strokeSkinGray = new Skin({
	fill: "#E8E8E8",
	borders: {left: 1, right: 1, top: 1, bottom: 1},
	stroke: "black",
});

// Fontsvar titleW = new Style({font: 'bold 20px', color: 'white'});
var titleB = new Style({font: 'bold 20px', color: 'black'});
var titleG = new Style({font: 'bold 20px', color: '#216C21'});
var regularW = new Style({font: '20px', color: 'white'});
var regularB = new Style({font: '20px', color: 'black'});
var regularG = new Style({font: '20px', color: '#216C21'});
var smallB = new Style({font: '15px', color: 'black'});
var midB = new Style({font: '18px', color: 'black'});
var midG = new Style({font: '18px', color: '#216C21'});

// Plant images
let flower = "assets/flower.png";

export var sectionClicked;
export var irrigationState = [0,0,0,0,0,0];
export var initial = true;
export var beginTimeH = [8,8,8,8,8,8];
export var beginTimeM = [0,0,0,0,0,0];
export var beginAMPM = ["AM", "AM", "AM", "AM", "AM", "AM"];
export var endTimeH = [8,8,8,8,8,8];
export var endTimeM = [0,0,0,0,0,0];
export var endAMPM = ["AM", "AM", "AM", "AM", "AM", "AM"];
export var waterCanButtons = [];
var waterIcon = [flower, flower, flower, flower, flower, flower];
export var timePickerPopUp;
export var begin = true;
export var H;
export var M;
export var AP;

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
		      	new Label({ left: 0, right: 0, top: padding, bottom: undefined, style: smallB, string: "Switch to turn irrigation on" }),
		      	onSwitch = new MySwitch({value: 0, on: false}),
		      
		      	// Time picker
		      	new Label({ left: 0, right: 0, top: padding, bottom: undefined, style: smallB, string: "Click on the starting and ending time" }),
		      	new Label({ left: 0, right: 0, top: padding, bottom: undefined, style: smallB, string: "to adjust the schedule" }),
		     	new Schedule({}),
      		]
      	}),   ]}));

// Watering schedule
var Schedule = Container.template($ => ({   left: padding * 4, right: undefined, top: padding, bottom: undefined, width: 250, skin: strokeSkinGray,   contents: [
 
      	Line($, {
		  	left: 0, right: 0, top: 0, bottom: 0, height: padding * 4,
			contents: [
				
				beginBtn = new timeBtn({id: 1, on: false, r: padding, l: padding}),
				Picture($, {left: 0, right: 0, top: padding / 2, bottom: undefined, height: 24, witdh: 24, url: "assets/next.png"}),
				endBtn = new timeBtn({id: 2, on: false, r: padding, l: padding}),
			]
		}),          	   ]}));

// Time button
let timeBtn = Container.template($ => ({    left: 0, right: 0, top: 0, bottom: 0, active: $.on,
    
    behavior: Behavior({        onTouchBegan: function(content){   
        	content.time_string.style = midG; 	            if ($.id == 1) {
            	begin = true;
            	H = beginTimeH[sectionClicked];
            	M = beginTimeM[sectionClicked];
            	AP = beginAMPM[sectionClicked];
            }
            else {
            	begin = false;
            	H = endTimeH[sectionClicked];
            	M = endTimeM[sectionClicked];
            	AP = endAMPM[sectionClicked];
            }        },        onTouchEnded: function(content){
        	content.time_string.style = midB; 
			timePickerPopUp = new TimePicker();
			application.add(timePickerPopUp);
			
			onSwitch.active = false;
			for (var i = 0; i < waterCanButtons.length; i++) {
				waterCanButtons[i].active = false;
			}        },    }),    	contents: [        Label($, {
			left: 0, right: 0, top: 0, bottom: 0, style: midB, string: "0:00", name: "time_string",
			Behavior: class extends Behavior{				updateTimeString(container, string) {
					if (initial) {container.string = "0:00";}
					else {
						if ($.id == 1 && beginTimeM[sectionClicked] < 10) {
							container.string = beginTimeH[sectionClicked] + ":0" + beginTimeM[sectionClicked] + " " + beginAMPM[sectionClicked];
						} else if ($.id == 1 && beginTimeM[sectionClicked] > 9) {
							container.string = beginTimeH[sectionClicked] + ":" + beginTimeM[sectionClicked] + " " + beginAMPM[sectionClicked];
						} else if ($.id == 2 && endTimeM[sectionClicked] < 10) {
							container.string = endTimeH[sectionClicked] + ":0" + endTimeM[sectionClicked] + " " + endAMPM[sectionClicked];
						} else if ($.id == 2 && endTimeM[sectionClicked] > 9) {
							container.string = endTimeH[sectionClicked] + ":" + endTimeM[sectionClicked] + " " + endAMPM[sectionClicked];
						}
					}									}			}
		}),   ]}));
let beginBtn;
let endBtn;

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
        	if (irrigationState[$.id] == 1) {
        		this.upSkin = strokeSkinB;
        	} else {
        		this.upSkin = transparentSkin;
        	}
        	this.downSkin = strokeSkinG;            content.skin = this.upSkin;        },        onTouchBegan: function(content){            content.skin = this.downSkin;
            sectionClicked = $.id;
            onSwitch.active = true;
            application.distribute("updateTimeString");        },        onTouchEnded: function(content){
        	// When a water button clicked, 
        	// change the skin of the rest of them back to white.
        	for (var i = 0; i < waterCanButtons.length; i++) {
        		if ($.id != i) {
        			if (irrigationState[i] == 1) {
        				waterCanButtons[i].skin = strokeSkinB;
        			} else {
        				waterCanButtons[i].skin = transparentSkin;
        			}
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
        	height: 28, width: 28, url: "assets/flower.png",
        })   ]}));

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
				beginBtn.active = true;
				endBtn.active = true;
				irrigationState[sectionClicked] = 1;
				waterCanButtons[sectionClicked].skin = strokeSkinB;
				application.distribute("onToggleIrrigation", 1);
				application.distribute("adjustIrrigationSlider");
				if (sectionClicked == 0) {
					if (deviceURL != "") new Message(deviceURL + "irrigation0On").invoke(Message.JSON).then(json => {});
				} else if (sectionClicked == 1) {
					if (deviceURL != "") new Message(deviceURL + "irrigation1On").invoke(Message.JSON).then(json => {});
				} else if (sectionClicked == 2) {
					if (deviceURL != "") new Message(deviceURL + "irrigation2On").invoke(Message.JSON).then(json => {});
				} else if (sectionClicked == 3) {
					if (deviceURL != "") new Message(deviceURL + "irrigation3On").invoke(Message.JSON).then(json => {});
				} else if (sectionClicked == 4) {
					if (deviceURL != "") new Message(deviceURL + "irrigation4On").invoke(Message.JSON).then(json => {});
				} else if (sectionClicked == 5) {
					if (deviceURL != "") new Message(deviceURL + "irrigation5On").invoke(Message.JSON).then(json => {});
				}
				
			} else {			
				beginBtn.active = false;
				endBtn.active = false;	
				irrigationState[sectionClicked] = 0;				
				waterCanButtons[sectionClicked].skin = strokeSkinG;
				application.distribute("onToggleIrrigation", 0);
				if (sectionClicked == 0) {
					if (deviceURL != "") new Message(deviceURL + "irrigation0Off").invoke(Message.JSON).then(json => {});
				} else if (sectionClicked == 1) {
					if (deviceURL != "") new Message(deviceURL + "irrigation1Off").invoke(Message.JSON).then(json => {});
				} else if (sectionClicked == 2) {
					if (deviceURL != "") new Message(deviceURL + "irrigation2Off").invoke(Message.JSON).then(json => {});
				} else if (sectionClicked == 3) {
					if (deviceURL != "") new Message(deviceURL + "irrigation3Off").invoke(Message.JSON).then(json => {});
				} else if (sectionClicked == 4) {
					if (deviceURL != "") new Message(deviceURL + "irrigation4Off").invoke(Message.JSON).then(json => {});
				} else if (sectionClicked == 5) {
					if (deviceURL != "") new Message(deviceURL + "irrigation5Off").invoke(Message.JSON).then(json => {});
				}
			}         }
        onSwitch(container, value) {
        	onSwitch.delegate("changeOffset", this.size - value);
        	if (value == 0) {
        		irrigationState[sectionClicked] = 0;
        		this.data.value = 0;
        	} else {
        		irrigationState[sectionClicked] = 1;
        		this.data.value = 1;
        	}
        	application.distribute("onValueChanged");
        	waterCanButtons[sectionClicked].skin = strokeSkinG;
        }    }}));
export var onSwitch;
