
![Header](/documentation/images/Header.png)


### What is IN42?
Intra Native 42 is a mobile app developed for students at 42 schools around the world. It is available for Android and iOS.
The project itself is developed in React Native together with Expo.

![NodeJS](https://img.shields.io/badge/Supported-NodeJS-green?style=flat) ![Supported](https://img.shields.io/badge/Supported-TypeScript-blue?style=flat) ![Built with](https://img.shields.io/badge/Built%20with-React%20Native-lightblue?style=flat) ![Using](https://img.shields.io/badge/Using-Expo-white?style=flat)
![App views](/documentation/images/AppViewPresentation.png)

# Resources

- React Native https://reactnative.dev/docs/environment-setup <br>
- Expo https://docs.expo.dev/get-started/installation/ <br>
- Intra App https://api.intra.42.fr/apidoc/guides/getting_started <br>
- Build Process https://github.com/in42developers/in42/blob/master/documentation/buildProcess.md<br>

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

<br>
Android Studio

#### Installing & Setting up Android Studio

<br>

> [!NOTE]
> Android Studio has a big filesize. We recommend to install it in Folders or Drives where you have a bit more space available.

<br>

_Reference: https://operavps.com/docs/install-android-studio-on-linux/_ <br>

<br>

Start by downloading and extracting Android Studio <br>

`wget https://redirector.gvt1.com/edgedl/android/studio/ide-zips/2021.1.1.22/android-studio-2021.1.1.22-linux.tar.gz`
`tar -xvzf android-studio-*-linux.tar.gz`

<br>

Add some Paths to your environment to be able to start the android emulator directly from your terminal. <br>

`export ANDROID_SDK=$HOME/Android/Sdk/` <br>
`export PATH=${PATH}:$ANDROID_SDK/tools:$ANDROID_SDK/platform-tools` <br>

<br>

_Write it into your .bashrc file - you don't have to setup it again!_

#

<br>

## Set up a virtual device (Your emulator that you use to test the project)

After it has completed installing you should be able to run "make android". It opens the Android Studio wizard. If you manually installed it somewhere else, just find the studio.sh file and run it.

> ./android-studio/bin/studio.sh
Install it with the standard settings<br>

create a virtual device https://developer.android.com/studio/run/managing-avds?utm_source=android-studio<br>
doesnt really matter which one at this point. Its your working device, you will later install different versions anyways<br>
<br>

## Create an Expo EAS account
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
