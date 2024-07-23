import { app, BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import { updateElectronApp } from 'update-electron-app';
import registerIPCCallbacks from './ipcHandlers';
import { downloadYamlFile } from '@lib/util/helpers/YAML/fileHandler';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

registerIPCCallbacks(ipcMain)

updateElectronApp()

downloadYamlFile('gh:ChristopherJTrent/magian_launcherv2@master/exampleRepo.yaml').then((v) => {
  console.log(v)
})

const createWindow = () => {
  const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets')
  
const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths)
}

  
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 550,
    height: 800,
    icon: getAssetPath('favicon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    titleBarStyle:"hidden",
    titleBarOverlay: {
      color: '#282C37',
      symbolColor: '#FFF',
      height: 30,
    },
    resizable: false,
    maximizable: false
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  if(!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
};



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

if (!app.isPackaged) {
  // This is broken and terrible, but it works.
  // Most likely a breaking change with the update to typescript 5.5
  // The below @ts-ignore lines are required, but I adcknowledge that they are a code smell.
  app.whenReady().then(() => {
    import('electron-devtools-installer').then((edi) => {
      // @ts-expect-error electron-devtools-installer is malformed, double default is required.
      const install = edi.default.default
      const {REDUX_DEVTOOLS} = edi
      install(REDUX_DEVTOOLS)
        .then((name:string) => console.log("added extension: ", name))
        .catch((err:string) => console.log('an error occurred: ', err))
    }).catch(err => console.log(err))
  }).catch((err) => {console.log(err)})
}


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
