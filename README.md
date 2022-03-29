## Generate app icons by running:

./node_modules/.bin/electron-icon-builder --input=./src/assets/logos/logo.png --output=./src/assets

<img alt="Electron" src="https://img.shields.io/badge/electron%20-%2320232a.svg?&style=for-the-badge&logo=electron&logoColor=white"/> <img alt="React" src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img alt="TypeScript" src="https://img.shields.io/badge/typescript%20-%2320232a.svg?&style=for-the-badge&logo=typescript&logoColor=#3178c6"/> <img alt="Webpack" src="https://img.shields.io/badge/webpack%20-%2320232a.svg?&style=for-the-badge&logo=webpack&logoColor=#5299c7"/>

## Getting started

### Installing

```bash
$ yarn install
```

### Run

You can either start the project with:

```bash
$ yarn start
```

## Development guidelines

### Main process development

After doing changes on the main process files, the server needs to be restarted to take effect.

### Packages

- webpack
- eslint
- prettier
- husky
- dotenv

### Generate the build

```bash
$ yarn make:windows
```

### Upload build to update server (OTA updates)

```bash
$ yarn forge:publish
```
