#!/bin/sh

# check for root usage
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

INSTALL=true
UNINSTALL=false

## functions
# parse input

function usage()
{
    echo "Usage: deploy.sh {params}"
    echo "      -h  --help          :Display this dialog"
    echo "      -ni --no-install    :Don't install new packages using apt"
    echo "      -u  --uninstall     :Delete every folders/files from previous installations"
    echo ""
}
## 

while [ "$1" != "" ]; do
    PARAM=`echo $1 | awk -F= '{print $1}'`
    VALUE=`echo $1 | awk -F= '{print $2}'`
    case $PARAM in
        -h | --help)
            usage
            exit 0
            ;;
        -ni | --no-install)
            INSTALL=false
            ;;
        -u | --uninstall)
            UNINSTALL=true
            ;;
    esac
    shift
done

# constants definition

NGINX_ROOT="/var/www/space-citizen"
NGINX_WEBSITE_ROOT="/var/www/space-citizen/website"
NGINX_GAME_ROOT="/var/www/space-citizen/game"
NGINX_STATIC="/var/www/space-citizen/static"
SERVERS_ROOT="/root/space-citizen"

# uninstall if asked

if [ "$UNINSTALL" = true ]; then
    echo "Uninstalling everything";
    rm -rf $NGINX_ROOT
    rm -rf $SERVERS_ROOT
    echo "Killing the screens"
    screen -ls | grep Detached | cut -d. -f1 | awk '{print $1}' | xargs kill
    exit 0;
fi

# get env variables
echo "Checking environment variables";

if [ -z "$SPACE_CITIZEN_DB_URL" ]; then
    echo "Variable SPACE_CITIZEN_DB_URL not found"
    exit 1
fi

if [ -z "$SPACE_CITIZEN_JWT_PASSWORD" ]; then
    echo "Variable SPACE_CITIZEN_JWT_PASSWORD not found"
    exit 1
fi

if [ -z "$SPACE_CITIZEN_DB_USERNAME" ]; then
    echo "Variable SPACE_CITIZEN_DB_USERNAME not found"
    exit 1
fi

if [ -z "$SPACE_CITIZEN_DB_PASSWORD" ]; then
    echo "Variable SPACE_CITIZEN_DB_PASSWORD not found"
    exit 1
fi

if [ -z "$SPACE_CITIZEN_API_URL" ]; then
    echo "Variable SPACE_CITIZEN_API_URL not found"
    exit 1
fi


# folder creation

mkdir -p $NGINX_WEBSITE_ROOT
mkdir -p $NGINX_GAME_ROOT
mkdir -p $NGINX_STATIC
mkdir -p $SERVERS_ROOT


## install packages

if [ "$INSTALL" = true ]; then

    echo "Installing Nodejs";
    
    # node
    curl -sL https://deb.nodesource.com/setup_11.x | bash -
    apt-get install -y nodejs

    # nginx

    echo "Installing nginx";

    apt install nginx

fi
## deploy website

echo "Deploying the website";

# move to website's folder
cd ../website

echo "Install node dependencies";
# install dependencies
npm i

# build react
echo "Build react";
npm run build

# change static folder location
sed -i 's/\/static\//\/static\/website\//g' ./build/index.html
sed -i 's/\/static\/website\/api/\/static\/api\//g' ./build/index.html
mkdir -p "$NGINX_STATIC/website"
cp -rf ./build/static/* "$NGINX_STATIC/website/"
cp -rf ./build/images "$NGINX_STATIC/website/"
# copy build files to the website's destination
echo "copy build files to the website's destination";
cp -rf ./build/* $NGINX_WEBSITE_ROOT

# return to root folder
cd ..


## deploy api
echo "Deploying the api";

# move to api's folder
cd api

# install dependencies
echo "Install node dependencies";
npm i

# copy the server to the servers location
mkdir -p  "$SERVERS_ROOT/api"
cp -rf ./* "$SERVERS_ROOT/api"

# copy static content
mkdir -p "$NGINX_STATIC/api"
cp -rf ./common "$NGINX_STATIC/api/"

# return to root folder
cd ..


## deploy message_service
echo "Deploying the message service";

# move to api's folder
cd message_service

# install dependencies
echo "Install node dependencies";
npm i

# copy the server to the servers location
mkdir -p  "$SERVERS_ROOT/message_service"
cp -rf ./* "$SERVERS_ROOT/message_service"

# return to root folder
cd ..


## deploy game server
echo "Deploying the game server";

# move to api's folder
cd game

# install dependencies
echo "Install node dependencies";
npm i

# copy the server to the servers location
mkdir -p  "$SERVERS_ROOT/game"
cp -rf ./* "$SERVERS_ROOT/game"

# return to root folder
cd ..


## deploy game front
echo "Deploying the game front";

# move to api's folder
cd game

# copy the server to the servers location
cp -rf ./client/* "$NGINX_GAME_ROOT/"

# copy the ressources to the static location
mkdir -p "$NGINX_STATIC/game"
cp -rf ./res ./common "$NGINX_STATIC/game/"

# return to root folder
cd ..

echo "Starting the servers"
cd $SERVERS_ROOT

# start api
echo "Starting the api"
screen node ./api/index.js

# start message service
echo "Starting the message service"
screen node ./message_service/index.js

# start game
echo "Starting the game"
screen node ./game/server/server.js
