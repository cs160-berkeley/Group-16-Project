import { Greenhouses } from "greenhouses_around";
import { name_h, naviBar_h, padding, drawerScreen, 
		currentScreen, Home, adjustFanIcons, adjustNavButtons } from "main";

// Skinslet blackSkin = new Skin ({fill: 'black'});let whiteSkin = new Skin ({fill: 'white'});
let graySkin = new Skin ({fill: '#6c6c6c'});
let greenSkin = new Skin ({fill: '#71e28b'});

// Fontsvar titleW = new Style({font: 'bold 20px', color: 'white'});
var titleB = new Style({font: 'bold 20px', color: 'black'});
var titleG = new Style({font: 'bold 20px', color: '#71e28b'});
var regularW = new Style({font: '20px', color: 'white'});
var regularB = new Style({font: '20px', color: 'black'});
var regularG = new Style({font: '20px', color: '#71e28b'});

// Greenhouses buttons
export let greenhouseBtn = Container.template($ => ({    left: 0, right: 0, top: 0, bottom: undefined, 
    height: 50, active: true,
    
    behavior: Behavior({        onCreate: function(content){            this.upSkin = new Skin({                fill: "transparent",                borders: {left: 0, right: 0, top: 0, bottom: 1},
                stroke: "black",            });            this.downSkin = new Skin({                fill: "#71e28b",                 borders: {left: 0, right: 0, top: 1, bottom: 1}, 
                stroke: "black",            });            content.skin = this.upSkin;        },        onTouchBegan: function(content){            content.skin = this.downSkin;        },        onTouchEnded: function(content){            content.skin = this.upSkin;
            application.remove(currentScreen);
            currentScreen = new Home();
            application.add(currentScreen);
            application.distribute("updateState");
            adjustFanIcons();
            adjustNavButtons(0);
            application.distribute("updateNavButtons");
            application.distribute("updateInfo", 1);
                    },    }),    	contents: [        Label($, { 
        	top: 0, bottom: 0, left: 10, right: undefined, 
        	style: regularW, string: $.text, 
        })   ]}));

var drawerWidth = 200;
export var gh = [];
gh[0] = new greenhouseBtn({text: "Greenhouse 1", id: 1});

export var Drawer = Container.template($ => ({   left: 0, right: undefined, top: name_h, bottom: naviBar_h, 
   width: drawerWidth, skin: graySkin,   contents: [      Column($, {
      	left: 0, right: 0, top: 0, bottom: 0,
      	contents: [
      		gh,
      		new addBtn({}),
      	]
      }),   ]}));

// Add greenhous button
let addBtn = Container.template($ => ({    left: 0, right: 0, top: 0, bottom: undefined, 
    height: 50, active: true,
    
    behavior: Behavior({        onCreate: function(content){            this.upSkin = new Skin({                fill: "transparent",                borders: {left: 0, right: 0, top: 0, bottom: 1}, 
                stroke: "black",            });            this.downSkin = new Skin({                fill: "#71e28b",                 borders: {left: 0, right: 0, top: 0, bottom: 1}, 
                stroke: "black",            });            content.skin = this.upSkin;        },        onTouchBegan: function(content){            content.skin = this.downSkin;        },        onTouchEnded: function(content){			content.skin = this.upSkin;
			application.distribute("updateDrawer");
			application.add(ghAroundScreen);
			        },    }),
    contents: [        new Label({ top: 0, bottom: 0, left: padding, right: undefined, 
        style: regularW, string: "Add" })   ] }));

export var ghAroundScreen = new Greenhouses(); 
