# COMPS Project: GroceryCheck+

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Open [https://cassgtz.github.io/comps-code/](https://cassgtz.github.io/comps-code/) to view it in your browser.

## Replication Instructions

1. You must enable Node >= 14.0.0 and npm >= 5.6 to run this app. Install it here: [https://nodejs.dev/en/download/](https://nodejs.dev/en/download/)
2. Clone this repository to your machine
3. Replace the Edamam food database API credentials in src/components/MissingNutrients.js:
    * Sign up for credentials here: [https://developer.edamam.com/food-database-api](https://developer.edamam.com/food-database-api)
4. Replace the Scandit SDK liscense key in src/components/StartPage.js:
    * Sign up for a free trial here: [https://ssl.scandit.com/dashboard/sign-up?p=test&source=websdk](https://ssl.scandit.com/dashboard/sign-up?p=test&source=websdk)
5. Save both of the edited files.
6. In the project directory, run `npm -force install` to install required packages

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make any changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

Deploys the app to GitHub Pages (a hosting tool). It creates a branch named `gh-pages` that hosts the app.\
To do this, you MUST have a github account & create a PUBLIC repository for the project. In line 2 of package.json, replace the homepage value with:

`http://<YOUR GITHUB USER NAME>.github.io/<YOUR REPOSITORY NAME>`

Add, commit, and push your changes. Open https://`<YOUR GITHUB USER NAME>`.github.io/`<YOUR REPO NAME>`/ to view it in your browser.

To learn more about GitHub Pages, go to [https://pages.github.com](https://pages.github.com).

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Code Architecture Overview

The code is compromised of the following major components: 
* StartPage Component:
   * Allows users to adjust settings (do/don’t check for all vitamins, sex) & contains the scan button 
   * Clicking the scan button opens the barcode scanner & ‘done’ button
   * Clicking the done button returns the MissingNutrients component if a barcode was scanned. If nothing was scanned, clicking the done button will return initial setting options.
* MissingNutrients Component:
   * Gets the micro nutrient data for each scanned barcode using Edamam food database API
   * Handles calculations of total micronutrients for all scanned food items & generates the list of micronutrients that the user is missing
   * Returns the ListContainer component.
* ListContainer Component:
   * Stores each micronutrient's description of benefits & a list of its food sources as a JSON object
   * Returns a list of the missing micronutrients and a collapsible list of its food sources + benefits
 
 Every component's file in this project contains comments throughout for more details & explanation.
 
 The app functions as follows: 
 
 ![](Overview.pgn)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
