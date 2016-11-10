import { Greenhouses } from "greenhouses_around";
import { name_h, naviBar_h, padding, drawerScreen, 
		currentScreen, Home, adjustFanIcons, adjustNavButtons } from "main";

// Skins
let graySkin = new Skin ({fill: '#6c6c6c'});
let greenSkin = new Skin ({fill: '#71e28b'});

// Fonts
var titleB = new Style({font: 'bold 20px', color: 'black'});
var titleG = new Style({font: 'bold 20px', color: '#71e28b'});
var regularW = new Style({font: '20px', color: 'white'});
var regularB = new Style({font: '20px', color: 'black'});
var regularG = new Style({font: '20px', color: '#71e28b'});

// Greenhouses buttons
export let greenhouseBtn = Container.template($ => ({
    height: 50, active: true,
    
    behavior: Behavior({
                stroke: "black",
                stroke: "black",
            application.remove(currentScreen);
            currentScreen = new Home();
            application.add(currentScreen);
            application.distribute("updateState");
            adjustFanIcons();
            adjustNavButtons(0);
            application.distribute("updateNavButtons");
            application.distribute("updateInfo", 1);
            
        	top: 0, bottom: 0, left: 10, right: undefined, 
        	style: regularW, string: $.text, 
        })

var drawerWidth = 200;
export var gh = [];
gh[0] = new greenhouseBtn({text: "Greenhouse 1", id: 1});

export var Drawer = Container.template($ => ({
   width: drawerWidth, skin: graySkin,
      	left: 0, right: 0, top: 0, bottom: 0,
      	contents: [
      		gh,
      		new addBtn({}),
      	]
      }),

// Add greenhous button
let addBtn = Container.template($ => ({
    height: 50, active: true,
    
    behavior: Behavior({
                stroke: "black",
                stroke: "black",
			application.distribute("updateDrawer");
			application.add(ghAroundScreen);
			
    contents: [
        style: regularW, string: "Add" })

export var ghAroundScreen = new Greenhouses(); 