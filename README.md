## Stheory Starter App

A simple front-end template that helps you build a fast, modern mobile web app.

## Dependencies

There are two tool sets you need to install on your machine before you can build this starter app: NodeJS, NPM

## Installation

(1) Install Node

    If you aren’t sure if you have NodeJS and NPM, you can check by opening terminal (a command prompt) and running :

    node -v.


    If Node responds, check the version matches the current version on NodeJS.org.

    If you don’t get a response or have an old version then go to NodeJS.org and click on the big green Install button.
    
    NPM will be installed with NodeJS automatically.

(2) Install the starter app

    Download the ZIP, rename the folder (your-project-name) and put it somewhere relevant on your machine.

(3) Install dependencies

    Next, you need to install the dependencies for the Stheory Starter App.

    Open terminal (command prompt), navigate to your project folder and run the following npm install scripts.

    cd your-project-name
    npm install
    npm install gulp -g


That’s it! You now have everything that’s needed to use the starter app, happy coding.


## Gulp Tasks

gulp serve

The task starts a local HTTP server so you can view your site in a browser, why developing.

gulp serve:dist

The gulp serve:dist command builds a production version of the app, it starts a server, and opens the browser for you, it’s a reliable way of testing the app before deploying it.
