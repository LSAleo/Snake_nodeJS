/*
const express = require('express');

const app = express();
const port = 3000 

*/

const {app, BrowserWindow} = require('electron')

function createWindow(){
    const win = new BrowserWindow({
        width : 1000,
        height : 800,
        webPreferences : {
            nodeIntegration : true
        }
    })

    win.loadFile('./index.hml')
    win = null
}