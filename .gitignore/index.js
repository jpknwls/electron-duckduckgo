"use strict";

const electron = require('electron');
const webContents = electron.webContents;
const path = require('path');
const fs = require('fs');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow = null;
let mainWebContents = null;



var newWindowOffset = 25;

const home = 'https://duckduckgo.com'



app.on('ready', () => {
  openApp();
});

app.on('window-all-closed', () => {
  mainWebContents = null;
});



function createOptions() {
    const {width: screenWidth, height: screenHeight} = electron.screen.getPrimaryDisplay().workAreaSize;
    const space = 50;
    const x = space;
    const y = space;
    const width = screenWidth - space * 2;
    const height = screenHeight - space * 2;
    const opts = {
        show: true,
        x: x,
        y: y,
        width: width,
        height: height,
          };

    return opts;
}

function openApp() {

  let opts = createOptions();
  mainWindow = createNewWindow(opts);
  mainWindow.loadURL(home);
  mainWebContents = mainWindow.webContents

}


function createNewWindow(opts) {

    let newWindow = new BrowserWindow(opts);
    let webContents = newWindow.webContents;



    // set navigagtion rules to not open window if still on duckduckgo.com
    webContents.on('will-navigate', (event, url) => {

        //if we are on duckduckgo, don't open new window
        if (url.indexOf(home) <= -1) {
            event.preventDefault();

            let opt = createOptions();
            const pos = BrowserWindow.getFocusedWindow().getPosition();
            Object.assign(opt, {
              x: pos[0] + newWindowOffset,
              y: pos[1] + newWindowOffset,
     
            });

          
            let window = new BrowserWindow(opt);
            window.loadURL(url);
        }
    });

  return newWindow;


}
