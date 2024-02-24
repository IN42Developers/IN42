
![Header](/documentation/images/Header.png)


### What is IN42?
Intra Native 42 is a mobile app developed for students at 42 schools around the world. It is available for Android and iOS.
The project itself is developed in React Native together with Expo.

![NodeJS](https://img.shields.io/badge/Supported-NodeJS-green?style=flat) ![Supported](https://img.shields.io/badge/Supported-TypeScript-blue?style=flat) ![Built with](https://img.shields.io/badge/Built%20with-React%20Native-lightblue?style=flat) ![Using](https://img.shields.io/badge/Using-Expo-white?style=flat)

![App views](/documentation/images/AppViewPresentation.png)

![Resources](/documentation/images/Resources.png)

- React Native https://reactnative.dev/docs/environment-setup <br>
- Expo https://docs.expo.dev/get-started/installation/ <br>
- Intra App https://api.intra.42.fr/apidoc/guides/getting_started <br>

- Build Process https://github.com/in42developers/in42/blob/master/documentation/buildProcess.md

![Getting Started](/documentation/images/GettingStarted.png)

## Basic Setup
### Automatic Installation
You will find a Makefile which should handle the basic setup for you. Use the makefile.
> make install
### Manual Installation
*If the automatic setup worked for you proceed to the next step*

The goal of this setup is the following:<br>
- install Node
- get Android studio
- install Expo cli

If you are not on a school PC you may be able to just use npm. With npm you can install nvm which has node

> npm update
>
> npm install n
>
> npm install nvm
>
> npm update n
<br>
check if you have the lastest node version.If not you are likely using a PC at school, where you cant easily update node. Hence we use a different approach<br>
reference: https://codedamn.com/news/nodejs/nvm-installation-setup-guide

> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

check if it worked (it may ask you to restart your terminal) <br>

> nvm --version

You may have a very old version, so just install the latest stable version with:<br>

> nvm install --lts

Next we want to install the expo cli. Depending on your situation you may use one of these commands. Its used to later start our local server for testing<br>

> install expo cli
> 
> npm install expo cli
> 
> npx expo install

<br>
some packages may not work with the lastest, so just manually fix it for the right version: <br>

> npx expo install --fix

<br>
setting up android studios https://operavps.com/docs/install-android-studio-on-linux/ <br>
Be careful, Android studios is big, you may want to make sure to install it in the right folders <br>

> wget https://redirector.gvt1.com/edgedl/android/studio/ide-zips/2021.1.1.22/android-studio-2021.1.1.22-linux.tar.gz
> 
> tar -xvzf android-studio-*-linux.tar.gz

<br>
To later easily start the emulator from the terminal add the paths to your environment. (I suggest you add them to your .bashrc file) 

> export ANDROID_SDK=$HOME/Android/Sdk/
> 
> export PATH=${PATH}:$ANDROID_SDK/tools:$ANDROID_SDK/platform-tools


## Set up a virtual device (Your emulator that you use to test the project)

After it has completed installing you should be able to run "make android". It opens the Android studio wizard. If you manually installed it somewhere else, just find the studio.sh file and run it.

> ./android-studio/bin/studio.sh
Install it with the standard settings<br>

create a virtual device https://developer.android.com/studio/run/managing-avds?utm_source=android-studio<br>
doesnt really matter which one at this point. Its your working device, you will later install different versions anyways<br>
<br>

## Create an eas Expo account
Expo is the service that we use to locally install and run our app on the emulator. It will also be used later for the building process. Its important that you do this step as it will change the redirecto URL from "anonymous" to "your account name", which you need for for creating your Intra APP in the next step. <br>

> https://expo.dev/signup

## Create your own Intra App
For locally testing changes its worth to create your own Intra App, since we don't want to disturb the live app when testing functionality. There is only one field that is important, the "redirect URI".<br>

> https://profile.intra.42.fr/oauth/applications/new

In order to get the redirect URI from expo simple start the project. Either use the makefile, or manually start the dev server <br>

> make start
>
> npx expo start --tunnel

When you start your server you see something like "Metro waiting on 'RedirectURI'"
![Redirect Uri](/documentation/images/RedirectURI.png)

## Setting up your .env file
Last step. Create and configure a .env file locally in the root directory with the following key-value pairs<br>
The variables required are: <br>
<br>
> CLIENT_ID=u-s4t2ud-someverylonghashnumbers
> 
> CLIENT_SECRET=s-s4t2ud-someverylonghashnumbers
> 
> REDIRECT_URI=exp://bryezl4.mrm0lten.8081.exp.direct (this is an example, yours will be different)
> 
<br>
Needless to say the CLIENT_ID and CLIENT_SECRET are sensitive information. Don't share this with anyone<br>

## Start developing!
As explained in a previous step to start the dev server simply by using  one of 2 commands:<br>

> make start
>
> npx expo start --tunnel

If you don't have the emulator open already, simply press "a" on the terminal to open the android device. It will start downloading expo and install the project<br>
you may have to reload(with "r") the app to it update properly.<br>
<br>
You should be able to see the app :)<br>




![Setting up vs code](/documentation/images/SettingUpVsCode.png)

Working with javascript,typescript and jsx can be a pain without certain extensions. You are free to install what you want but its recommended to use these 3:<br>
ES7+ React/Redux/React-Native snippets<br>
Prettier - Code formatter<br>
npm install -g eslint (type this command in your terminal before installing the extension)<br>
ESLint<br>
