#!/bin/bash

setupFolder='buildSetup'
nvmFolder=$setupFolder'/nvm'
ASFolder=$setupFolder'/androidStudio'

mkdir $setupFolder;



npm update;
# echo $?
if [ $? -eq 127 ]; then
    echo -e "\033[0;31mSeems like you dont have npm, and are potentially on a school PC. Manually installing...\033[0m"
    if test -d ./$nvmFolder; then
        echo -e "\033[0;31mVM Directory exists. Skip installing nvm\033[0m"
    else
        mkdir $nvmFolder;
        wget -P ./$nvmFolder -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh;
        bash ./$nvmFolder/install.sh

        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
        nvm install --lts;
    fi
else
    npm install n;
    npm install nvm;
    npm update n;
fi

echo -e "\033[0;32mSetting up Project related things \033[0m"
npm install expo cli;
npx expo install;
npx expo install --fix;


if test -d ./$ASFolder/android-studio/; then
    echo -e "\033[0;32mDirectory exists. Skip installing android-studio \033[0m"
    echo "Directory exists. Skip installing android-studio"
else
    echo -e "\033[0;32mInstalling Android Studio \033[0m"
    mkdir $ASFolder;
    wget -P ./$ASFolder/ https://redirector.gvt1.com/edgedl/android/studio/ide-zips/2021.1.1.22/android-studio-2021.1.1.22-linux.tar.gz;
    tar -xvzf ./$ASFolder/android-studio-*-linux.tar.gz -C ./$ASFolder/;
fi

export ANDROID_HOME=$HOME/Android/Sdk/
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
