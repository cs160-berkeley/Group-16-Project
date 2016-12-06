import { padding } from 'main';
import { irrigationState, sectionClicked, timePickerPopUp, 
		 onSwitch, waterCanButtons, beginTimeH, beginTimeM,
		 endTimeH, endTimeM, beginAMPM, endAMPM, begin, H, M, AP } from 'irrigation';

let greenSkin = new Skin ({fill: '#5CA05C'});

let strokeSkinW = new Skin({
	fill: "white",
	borders: {left: 1, right: 1, top: 1, bottom: 1},
	stroke: "black",
});
let strokeSkinG = new Skin({
	fill: "#5CA05C",
	borders: {left: 1, right: 1, top: 1, bottom: 1},
	stroke: "black",
});
let upArrowB = new Texture("assets/up.png");
let upArrowG = new Texture("assets/up_g.png");
let downArrowB = new Texture("assets/down.png");
let downArrowG = new Texture("assets/down_g.png");
let UAB = new Skin({
	width: 32, height: 32,
	texture: upArrowB,
	aspect: "fit",
});
let UAG = new Skin({
	width: 32, height: 32,
	texture: upArrowG,
	aspect: "fit",
});
let DAB = new Skin({
	width: 32, height: 32,
	texture: downArrowB,
	aspect: "fit",
});
let DAG = new Skin({
	width: 32, height: 32,
	texture: downArrowG,
	aspect: "fit",
});

// Fonts
var titleB = new Style({font: 'bold 20px', color: 'black'});
var titleG = new Style({font: 'bold 20px', color: '#5CA05C'});
var regularW = new Style({font: '20px', color: 'white'});
var regularB = new Style({font: '20px', color: 'black'});

var h = 8;
var m = 0;
var ap = "AM";

// Time picker layout
export var TimePicker = Container.template($ => ({
   	   	   
      	Column($, {
		  	left: 0, right: 0, top: padding, bottom: 0,
			contents: [
			
				// Line of arrows
				Line($, {
				  	left: padding, right: padding * 3, top: 0, bottom: 0,
					contents: [
						arrowBtn({id: 1, img: "assets/up.png"}),
						arrowBtn({id: 2, img: "assets/up.png"}),
					]
				}),
  				
			  	// Time Labels
			  	Line($, {
			  		left: padding, right: 0, top: 0, bottom: undefined, height: padding * 3,
					contents: [
					
						Label($, {
			      			left: padding + 5, right: 0, top: 0, bottom: 0, style: regularB, string: h,
			      			Behavior: class extends Behavior{
			      		}),
			      		
			      		new Label({left: 0, right: 0, top: 0, bottom: 0, style: titleB, string: ":"}),
			      		
			      		Label($, {
			      			left: 0, right: 0, top: 0, bottom: 0, style: regularB, string: m,
			      			Behavior: class extends Behavior{
			      		}),			      		
			      		
			      		// AM/PM button
			      		timeBtn = new ampmBtn({}),			 
					]
			  	}),
			  	
			  	// Line of arrows
				Line($, {
				  	left: padding, right: padding * 3, top: 0, bottom: 0,
					contents: [
						arrowBtn({id: 3, img: "assets/down.png"}),
						arrowBtn({id: 4, img: "assets/down.png"}),
					]
				}),				
				
				// Cancel and done buttons
				Line($, {
				  	left: padding * 2, right: 0, top: undefined, bottom: padding / 2,
					contents: [
						cancelBtn = new stateBtn({id: 1, text: "cancel"}),
						doneBtn = new stateBtn({id: 2, text: "done"}),
					]
				}),					
			]
		}),
		          	

// Arrow buttons
let arrowBtn = Container.template($ => ({
    
    behavior: Behavior({
        	h = H;
        	m = M;
        	ap = AP;
        	application.distribute("updateAMPM");
        	application.distribute("updateTime");
        	if ($.id < 3) {
        		this.upSkin = UAB;
        		this.downSkin = UAG;
        	} else {
        		this.upSkin = DAB;
        		this.downSkin = DAG;
        	}
        	content.skin = this.upSkin;
        	content.skin = this.downSkin;
        	if ($.id == 1) {
        		if (h == 12) {h = 0;}
        		h++;
        	} else if ($.id == 2) {
        		if (m == 59) {m = -1;}
        		m++;
        	} else if ($.id == 3) {
        		if (h == 1) {h = 13;}
        		h--;
        	} else if ($.id == 4) {
        		if (m == 0) {m = 60;}
        		m--;
        	}
        	content.skin = this.upSkin;
        	application.distribute("updateTime");

// AM/PM buttons
let ampmBtn = Container.template($ => ({
    
    behavior: Behavior({
        	this.upSkin = strokeSkinW;
        	this.downSkin = strokeSkinG;
        	content.skin = this.upSkin;
        	content.skin = this.downSkin;
        	if (ap == "AM") {ap = "PM";}
        	else {ap = "AM";}
        	application.distribute("updateAMPM");
        	content.skin = this.upSkin;
        	top: 0, bottom: 0, left: 0, right: 0,
        	style: titleB, string: ap,
        	Behavior: class extends Behavior{
     	})
let timeBtn;

// Done/cancel buttons
let stateBtn = Container.template($ => ({
    
    behavior: Behavior({
        	
        	content.label.style = titleG;
        	content.label.style = titleB;
        	if ($.id == 1) {
        		
        	} else {
        		if (begin) {
        			beginTimeH[sectionClicked] = h;
            		beginTimeM[sectionClicked] = m;
            		beginAMPM[sectionClicked] = ap;
            		if (h == 12) {
            			endTimeH[sectionClicked] = 1;
            			endAMPM[sectionClicked] = ap;
            		} else if (h == 11 && ap == "AM") {
            			endAMPM[sectionClicked] = "PM";
            			endTimeH[sectionClicked] = h + 1;
            		} else if (h == 11 && ap == "PM") {
            			endAMPM[sectionClicked] = "AM";
            			endTimeH[sectionClicked] = h + 1;
            		} else {
            			endTimeH[sectionClicked] = h + 1;
	            		endAMPM[sectionClicked] = ap;
            		}
            		endTimeM[sectionClicked] = m;
        		} else {
        			endTimeH[sectionClicked] = h;
            		endTimeM[sectionClicked] = m;
            		endAMPM[sectionClicked] = ap;
        		}
				application.distribute("updateTimeString");
        	}
        	application.remove(timePickerPopUp);
        	onSwitch.active = true;
			for (var i = 0; i < waterCanButtons.length; i++) {
				waterCanButtons[i].active = true;
			}
        	top: 0, bottom: undefined, left: 0, right: 0,
        	style: titleB, string: $.text, name: "label",
     	})
let doneBtn;
let cancelBtn;