const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'assets', 'M desktop.png'),
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL('http://localhost:3001')
}

app.whenReady().then(createWindow)