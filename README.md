
![Header](/docs/images/Header.png)

> [!IMPORTANT]
> We shut down the app development of IN42 on November 7, 2024. Feel free to fork the project and develop it further. For that, we have updated our License and Docs.

### What is IN42?
IN42 (Intra Native 42) is here to help students at 42 worldwide (50+ campus). The 42 Learning Platform (Intra) has all features in-house to help Students using their desktop devices. With IN42 we will bring features from it to both iOS and Android.

Native on iOS and Android, cross-platform and super easy to use - this is IN42.

![NodeJS](https://img.shields.io/badge/Supported-NodeJS-green?style=flat) ![Supported](https://img.shields.io/badge/Supported-TypeScript-blue?style=flat) ![Built with](https://img.shields.io/badge/Built%20with-React%20Native-lightblue?style=flat) ![Using](https://img.shields.io/badge/Using-Expo-white?style=flat)
![App views](/docs/images/AppViewPresentation.png)

# Resources

- React Native https://reactnative.dev/docs/environment-setup <br>
- Expo https://docs.expo.dev/get-started/installation/ <br>
- Intra App https://api.intra.42.fr/apidoc/guides/getting_started <br>
- Build Process https://github.com/in42developers/in42/blob/master/docs/buildProcess.md<br>

<br>

# Setting up your environment

### Automatic Installation
You will find a Makefile which should handle the basic setup for you. Use the makefile.

`make install` <br>

### Manual Installation

_If the automatic setup worked for you, just proceed to the next step._

#### Fundamentals

- Installing NodeJS
- Installing Android Studio
- Installing Expo CLI <br>

# 

<br>
NodeJS

#### Installing NodeJS on your own device<br>
If you want to develop at home or you are not using an school computer just follow **these** steps.

<br>

```
npm update
npm install
npm install nvm
npm update n
```

<br>

Please check if you have the latest nvm version installed<br>
`nvm --version` <br>

<br>

If you want to update your version we recommend using this command<br>
`nvm install --lts` <br>

<br>

#### Installing NodeJS on a school computer

Most likely you don't have sufficient permissions at school workstations. Hence we use an different approach.<br>

_Reference: https://codedamn.com/news/nodejs/nvm-installation-setup-guide_

<br>

Let's start by downloading the install script.

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`

<br>

Check if it worked (it may ask you to restart your terminal) <br>

`nvm --version`

<br>

You may have a very old version. To keep everything up-to-date, let's update to an current version.<br>

`nvm install --lts`

# 

<br>
Expo CLI

#### Installing the Expo Commandline Interface (Expo CLI)

<br>

Depending on your situation you may use one of these commands. It is used to later start our local server for testing.<br>

<br>

`install expo cli` <br>
`npm install expo cli` <br>
`npx expo install` <br>

<br>
It can happen that some packages will not work anymore in the latest version - of course, we can manually fix it.<br>

`npx expo install --fix`

#

#### Android Studio

For the Prototyping & Building process of an Android App, you <ins>need</ins> to use Android Studio for this project.

Of course, we are nice enough to give you a small guide which contains the downloading and unzip part.
#

**Reference: https://operavps.com/docs/install-android-studio-on-linux/**


Always make sure that you have enough space available. Let's start with downloading our target file.



`wget`
https://redirector.gvt1.com/edgedl/android/studio/ide-zips/2021.1.1.22/android-studio-2021.1.1.22-linux.tar.gz

That worked! After you know your version of Android Studio, continue with extracting your file.

`tar -xvzf android-studio-*-linux.tar.gz`

Hint: Add following Paths to your environment to be able to start the Android emulator directly from your terminal. How convenient!<br>

`export`
ANDROID_SDK=$HOME/Android/Sdk/

`export` PATH=${PATH}:$ANDROID_SDK/tools:$ANDROID_SDK/platform-tools <br>

**Use Terminal or the .bashrc/.zshrc file:** Both works and you never have to setup it again!


### Set up a virtual device

After the installation had been successful, you should be able to run `make android`. This will open the Android Studio wizard.

If you manually installed it somewhere else, just find the studio.sh file and run it.

> ./android-studio/bin/studio.sh

Install it with common settings, you should be fine.

#### Creating a virtual device
Follow this Guide:

`https://developer.android.com/studio/run/managing-avds?utm_source=android-studio<br>`

> At this point, it doesn't really matter which model you select. It's your working device, you will later install different versions anyways!
<br>

## Create a Expo EAS account
Expo is the service that we use to locally install and run our app on the emulator. It will also be used later for the building process. Its important that you do this step as it will change the redirecto URL from "anonymous" to "your account name", which you need for for creating your Intra APP in the next step. <br>

> https://expo.dev/signup

## Create your own Intra App
> [!NOTE]
> A live environment doesn't exist anymore, since we shut down the app in November 7, 2024.

If you're locally testing your changes, you should therefore create your own Application on Intra. We don't really want to disturb the live app when testing functionality. There is only one field that is important, the "Redirect URI".<br>

> https://profile.intra.42.fr/oauth/applications/new

In order to get the Redirect URI from Expo, simple start the project. Either use the Makefile, or manually start the Development server. <br>

`make start`

`npx expo start --tunnel`

When you start your server, you should see something like "Metro waiting on 'RedirectURI'":

![Redirect Uri](/docs/images/RedirectURI.png)

## Setting up your .env file

Congrats! You made it until the last step. Create and configure a .env file locally in the root directory, with the following key-value pairs:<br>

<br>

> CLIENT_ID=u-s4t2ud-someverylonghashnumbers

> CLIENT_SECRET=s-s4t2ud-someverylonghashnumbers

> REDIRECT_URI=exp://bryezl4.mrm0lten.8081.exp.direct (this is an example, yours will be different)

> [!CAUTION]
> Needless to say the CLIENT_ID and CLIENT_SECRET are sensitive information. Don't share them with anyone.<br>

## Start developing!
Our development environment is ready, and the app should be too!

Let's use these commands, to spoil up the engines and get the App running in DEV MODE.

`make start`

`npx expo start --tunnel`

If your emulator is not open already, simply press "a" on the terminal to open up the Android device.

It will start downloading Expo and install the project and it dependencies.

You may have to reload the app (with "r") to update it properly.<br>

>You should be able to see the app :)




## Visual Studio Code

Working with JavaScript, TypeScript and JSX can be a pain without certain extensions.

Feel free to install what you want. However, it is recommended to use the following extensions:

> ES7+ React/Redux/React-Native snippets

> Prettier - Code formatter

> npm install -g eslint

Use your Terminal and type in this command first, BEFORE installing the ESLint extension, to make sure that it will run how it should. Easy, or isn't it?

> ESLint

#

<br>

Thanks for reading until here. It was sure quite a ride!
We hope that you continue what we did and make IN42 as awesome as it can be.

Copyright 2024, IN42.