F_SETUP=buildSetup
F_ANDROIDSTUDIO=androidStudios

install:
	bash setup.sh  

android:
	./$(F_SETUP)/$(F_ANDROIDSTUDIO)/android-studio/bin/studio.sh

start:
	npx expo start

tstart:
	npx expo start --tunnel

clean:
	@echo "cleaning wasted space"

delete:
	@echo "deleting initially installed files"
	rm -rf ./$(F_SETUP)/$(F_ANDROIDSTUDIO)
	rm -rf ~/.nvm
	rm -rf ./$(F_SETUP)/nvm
	rm -rf ./$(F_SETUP)
	rm -rf ${HOME}/Android


# -------- Creating Local Builds ------------------ #
buildImages:
	docker compose -f ./build/docker-compose.yml build 

buildAndroidAPK:
	@docker compose -f ./build/docker-compose.yml up -d androidapk --build

buildAndroidAAB:
	@docker compose -f ./build/docker-compose.yml up -d androidaab --build

buildIos:
	@docker compose -f ./build/docker-compose.yml up -d iosEMUL --build

# create new Container for ios builds 

