import { gh, greenhouseBtn, ghAroundScreen } from "drawer";
import { fanState } from "ventilation";
import { padding, drawerScreen, currentScreen, Home,
		 adjustFanIcons, adjustNavButtons, greenhouseNum, 
		 currTemperature, currSunlight, currHumidity, currAirFlow } from "main";

// Skins
let graySkin = new Skin ({fill: '#6c6c6c'});
let greenSkin = new Skin ({fill: '#71e28b'});

// Fonts
var titleB = new Style({font: 'bold 20px', color: 'black'});
var titleG = new Style({font: 'bold 20px', color: '#71e28b'});
var regularW = new Style({font: '20px', color: 'white'});
var regularB = new Style({font: '20px', color: 'black'});
var regularG = new Style({font: '20px', color: '#71e28b'});

var conWH = 200;

export var Greenhouses = Container.template($ => ({
   width: conWH, height: conWH, skin: graySkin,
      	left: 0, right: 0, top: 0, bottom: 0,
      	contents: [
      		new ghABtn({text: "Greenhouse 1", id: 1}),
      		new ghABtn({text: "XYZ_123-%PO", id: 2}),
      	]
      }),

// Greenhouses buttons
let ghABtn = Container.template($ => ({
    height: 50, active: true,
    
    behavior: Behavior({
                stroke: "black",
                stroke: "black",
        	content.skin = this.upSkin;
        	application.remove(ghAroundScreen);
        	application.remove(currentScreen);
            currentScreen = new Home();
            application.add(currentScreen);
            application.distribute("updateState");
            adjustFanIcons();
            adjustNavButtons(0);
            application.distribute("updateNavButtons");
            if ($.id == 1) {
            	//application.distribute("updateInfo", 1);
            } else if ($.id == 2) {
	            gh[1] = new greenhouseBtn({text: "Greenhouse 2", id: 2});
	            //application.distribute("updateInfo", 2);
	            greenhouseNum = 2;
	            currTemperature = 62;
	            currSunlight = 34;
	            currHumidity = 45;
	            currAirFlow = 5;
	            fanState = [0,0,0,0,0,0];
	            application.distribute("updateGhNum");
	            application.distribute("updateState");
	            application.distribute("updateFanString");
	            application.distribute("updateNavButtons");
	            
        	}
        	top: 0, bottom: 0, left: 10, right: undefined, 
        	style: regularW, string: $.text, 
        })