Version 3 of my [personal website and portfolio](http://maxcmiller.com).

## Development
1. ```git clone https://github.com/einkelflugle/maxcmiller-v3.git```
1. ```cd maxcmiller-v3```
1. ```npm install```
1. ```npm run dev``` which builds the site for development and starts a static server with BrowserSync on [localhost:8980](localhost:8980) and BrowserSync UI on [localhost:8981](localhost:8981).
1. Change files as needed and watch the local site update in real time.
1. (Run ```gulp serve``` to start a BrowserSync server without building the site.)
1. (Run ```gulp clean``` to restore to original cloned state, removes site directory.)

## Building for deployment

1. Run ```git clone https://github.com/einkelflugle/maxcmiller-v3.git``` locally
1. ```cd maxcmiller-v3```
1. ```npm install```
1. ```npm run build```
1. Copy the newly created ```site``` directory to the HTML root of the webserver via SFTP/whatever.
1. Done!
