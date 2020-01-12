---
id: getting-started
title: Getting Started with Neutron JS
sidebar_label: Getting Started
---

Neutron is a <b>Command Line Interface</b> developed to help developers create new react projects with <a href="https://redux.js.org/" target="_blank">Redux</a> + <a href="https://redux-saga.js.org/" target="_blank">Redux Saga</a>, as well as providing a well-structured code organization.

This page will help you install and build your first react project using Neutron JS and it's very important to explain that to work with mobile, you must have installed the `expo-cli` in your development environment.

#### Why Expo for React Native?
We chose <a href="https://expo.io/tools" target="_blank">Expo</a> due to maturity that it's reached and because it's not necessary to configure and install SDKs, emulators and other common requirements for iOS and Android development.

> To learn more about `expo-cli`, check: <a href="https://expo.io/learn" target="_blank">Get Started With Expo</a>.


## Installation

This is simple and easy because Neutron JS is available as a package in <a href="https://www.npmjs.com/package/@neutronjs/cli" target="_blank">Node Package Manager</a>. You should write your terminal:

```shell
yarn global add @neutronjs/cli
```

After installation, you can confirm using `neutron` on your terminal or `neutron -h` to check all available commands:

```
Starts With:
  neutron create           Create new project with React

Commands:
  neutron add:component    Add new component files
  neutron add:duck         Add new duck file
  neutron add:page         Add new page files
  neutron add:saga         Add new saga and duck files

Utils:
  neutron -h               Show help information
  neutron -v               Output the version number
```

## Creating a new project

To create a new project, you must use command with this format:

```shell
neutron create <appName> <technology>
```

Available technologies:

- `--react`<small>: create a new project with <b>React JS</b></small>
- `--react-native`<small>: create a new project with <b>React Native</b></small>

#### Usage example:

```shell
neutron create my-app --react
```

After a while you will see the success message and be able to start the application with a development server using:

```shell
cd my-app && yarn start || npm run start
```
