# react-native-demo
react native demo for intermediate programmer

## Initializing package .json
In your application folder, type
`npm init`

## Installing an NPM Module:
`npm install lite-server --save-dev`

Install an NPM module, lite-server, that allows you to run a Node.js based development web server and serve up your project files. To do this, type the following at the prompt:
For more information about lite-server documention, check [Github pages](https://github.com/johnpapa/lite-server )

## Getting started with React Native
### Install yarn
- Yarn is another package manager like NPM, but is better suited and faster to work with for React applications. So let us install yarn and use it for building our React applications.
- To install Yarn, you can find the instructions for your specific platform at https://yarnpkg.com/en/docs/install.

Setting up the create-create-native-app, at promopt type:
- OS: ` yarn global add create-react-native-app@1.0.0` 
- Windows： `npm install -g create-react-native-app@1.0.0`

Generating and Serving a react project using create-react-app
- At a convenient location on your computer, create a folder named ReactNative and move into that folder.
- Then type the following at the prompt to create a new React Native application named confusion:
`create-react-native-app confusion`
For windows user, install ReactJs is slightly different, refer to [Install ReactJs](https://makandracards.com/reactjs-quick/52419-install-reactjs-windows)

- This should create a new folder named confusion within your ReactNative folder and create the React Native application in that folder.
- Move to the confusion folder and type the following at the prompt: `yarn start`

## To run the simulator Android in windows
- download Android studio
- Java environment
- Android studio SDK & AVD
To run the simulator, run `npm start` first, then run `npx react-native run-android`

## To start your simulator from command line
- Open cmd & cd to %ANDORID_HOME%/Sdk
- `emulator -list-avds` list all your current AVDs
- `emulator -avd Pixel_XL_API_29` run specific AVDs in your laptop

## Component
https://reactnative.dev/docs/components-and-apis.html

### Using React Native Elements
- InstallReact Native Elements into your project in order in order to make use of the UI components that is supported by:
`yarn add react-native-elements@beta`

### Installing React Navigation
- Install React Naviagtion into your project by typing the following at the promopt:
 `yarn add react-navigation@2.0.1`

## Setting up Redux
`yarn add redux@4.0.0
yarn add react-redux@5.0.7
yarn add redux-thunk@2.2.0
yarn add redux-logger@3.0.6`

## Setting up json-server
- ` npm install json-server -g` install json-server globally
- create a folder named public, unzip json-server db zip file in repo, put images file inside public folder, and put db.json file out of public folder.
- ` json-server --watch db.json -p 3001 -d 2000` configuring the Server

## Debugging
- Setup and use the standalone react-devtools
- Debug JS remotely in a chrome. `npm i -g react-devtools@3`
- Open devtools in terminal `react-devtool`

## Adding a Form
`yarn install react-native-datepicker@1.7.2`

## Swipe gesture
`yarn add react-native-swipeout@2.3.3`

## Using react-native-animatable
- First install react-native-animatable in your app by typing the following at the prompt:
`yarn add react-native-animatable@1.2.4`


## Using redux-persist
`yarn add redux-persist@5.9.1`
Redux Persist takes your Redux state object and saves it to persisted storage. Then on app launch it retrieves this persisted state and saves it back to redux.


## Expo SecureStore 
- Go to check the documenetaton of Expo SecureStore
- `expo install expo-secure-store`
- import * as SecureStore from 'expo-secure-store';

## Notification
- Configure your app to use notification support from Expo SDK
- Generate local notifications in your app

## Social Sharing
- Use Expo SDK MailComposer to enable sending email using the native email application
- Enable sharing of information to social media sites using the React Native Share API
- `expo install expo-mail-composer`

## Picking an image
- Use the ImagePicker API from Expo SDK
- Enable your application to obtain an image from the camera
- `expo install expo-image-picker`
- `expo install expo-image-manipulator`
- `expo install expo-asset`