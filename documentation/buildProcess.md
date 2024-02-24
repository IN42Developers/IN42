# [WIP]The build Process

Since we coupled our process with Expo, we can use the eas flow to create our builds. There are essentially 2 options
- Let expo handle the build process
- build it locally ourselves

Since the 'free queue' build process with eas takes ~80min its obvious that we build it ourselves.<br>

For building the project we use Docker.<br>

> https://www.docker.com/

Its helpful if you have an understand of how Docker works, but its not required to build this project.<br>

Everything is setup in the ./build directory<br>

The only thing you have to setup manually is EXPO_TOKEN<br>

Since we want to automate the process as much as possible EAS allows us to create a token, so we don't have to login for each build. Simply go to this page and setup your token<br>

> https://expo.dev/settings/access-tokens

You should have an account by now, if not create one<br>

Next, setup a .env file within the /build directory with a single key-value pair

> EXPO_TOKEN='yourExpoToken'

You should be all setup, now simply run<br>

> make localBuild

It will generate a docker image that can be reused to create builds afterwards. Keep in mind that you only need to do this ONCE, unless the build process changes<br>

Every subsequent build you can simply reuse the created image<br>

With this flow a build should take between 5-10min max. Each build will be saved in a Docker volume. The location depends on your distribution system and Docker installation location<br>

Each build should come in this format:<br>
-timestamp_githubHash (root folder)
---githubHash.extention (the actual build)
---log.txt (a log of the build process)

## limitations

As this process is still work in progress there are a few things to keep in mind<br>

- Building this image will use your local .ssh private and public key. (It is currently slightly broken as i worked mainly on windows.) You need to adjust the file to copy your .ssh configuration into the right place. This will obviously change in the future...
- The build process is currently hardcoded to only generate .apk files. Its a format for android to quickly install and test without using a store. In the future it should handle all platforms and extensions.
- For obvious reasons, this will not upload a build to the app stores. Thats still a manual process, but can be automated later



