# Magian Launcher

### A note on Analytics
This application uses Aptabase for analytics.
The only event we track is the initial load of the app, and data is stored in Virginia (USA).
We receive the following information:
* App Version
* Time of application load
* Location (Region and Country)
* Operating System version

## Installation
* Make sure you have a working version of Final Fantasy XI Online installed.
    > For private servers, follow their game client installation instructions.  
* Download the most recent installer from the [releases](https://github.com/ChristopherJTrent/magian_launcherv2/releases) page.  
* Run the installer.

## Features
* Manages an [Ashita v4](https://github.com/AshitaXI/Ashita-v4Beta) installation.
* Generates the appropriate configuration files
* Manages profiles (no more having separate shortcuts for private and retail servers)

### Planned features
* Downloads new addons and plugins from online repositories
* Interfaces with Ashita through a plugin, allowing for in-game addon and plugin management.

## Building
### Requirements
* NodeJS
* `yarn`

### Steps
1) Clone the repository to your computer
2) run `yarn install`
3) run `yarn start`

