import { gh, greenhouseBtn, ghAroundScreen } from "drawer";
import { fanState } from "ventilation";
import { padding, drawerScreen, currentScreen, Home,
		 adjustIrrigationIcons, adjustNavButtons } from "main";
import { currTemperature, currSunlight, currHumidity, currAirFlow, 		number, currIrrigationState, currFanState} from "greenhouse";

// Skinslet blackSkin = new Skin ({fill: 'black'});let whiteSkin = new Skin ({fill: 'white'});
let graySkin = new Skin ({fill: '#6c6c6c'});
let greenSkin = new Skin ({fill: '#71e28b'});

// Fontsvar titleW = new Style({font: 'bold 20px', color: 'white'});
var titleB = new Style({font: 'bold 20px', color: 'black'});
var titleG = new Style({font: 'bold 20px', color: '#71e28b'});
var regularW = new Style({font: '20px', color: 'white'});
var regularB = new Style({font: '20px', color: 'black'});
var regularG = new Style({font: '20px', color: '#71e28b'});

var conWH = 200;

export var Greenhouses = Container.template($ => ({   left: undefined, right: undefined, top: undefined, bottom: undefined, 
   width: conWH, height: conWH, skin: graySkin,   contents: [      Column($, {
      	left: 0, right: 0, top: 0, bottom: 0,
      	contents: [
      		new ghABtn({text: "Greenhouse 1", id: 1}),
      		new ghABtn({text: "XYZ_123-%PO", id: 2}),
      	]
      }),   ]}));

// Greenhouses buttons
let ghABtn = Container.template($ => ({    left: 0, right: 0, top: 0, bottom: undefined, 
    height: 50, active: true,
    
    behavior: Behavior({        onCreate: function(content){            this.upSkin = new Skin({                fill: "transparent",                borders: {left: 0, right: 0, top: 0, bottom: 1},
                stroke: "black",            });            this.downSkin = new Skin({                fill: "#71e28b",                 borders: {left: 0, right: 0, top: 1, bottom: 1}, 
                stroke: "black",            });            content.skin = this.upSkin;        },        onTouchBegan: function(content){            content.skin = this.downSkin;        },        onTouchEnded: function(content){
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
	            number = 2;
	            currTemperature = 62;
	            currSunlight = 34;
	            currHumidity = 45;
	            currAirFlow = 5;
	            fanState = [0,0,0,0,0,0];
	            application.distribute("updateGhNum");
	            application.distribute("updateState");
	            application.distribute("updateFanString");
	            application.distribute("updateNavButtons");
	            
        	}        },    }),    	contents: [        Label($, { 
        	top: 0, bottom: 0, left: 10, right: undefined, 
        	style: regularW, string: $.text, 
        })   ]}));
