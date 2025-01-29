# Cypress Project cypress using Behavior Drivent development
This project uses Cypress for end-to-end testing, with support for the Cucumber preprocessor and reporting.

## Installation

- To get started, you need to install the necessary dependencies. Run the following commands in your terminal:
    ```bash
    npm install cypress --save-dev
    npm install cypress @badeball/cypress-cucumber-preprocessor --save-dev
    npm install @bahmutov/cypress-esbuild-preprocessor --save-dev
    npm install --save-dev cypress-mochawesome-reporter @badeball/cypress-cucumber-preprocessor mochawesome
    ```

## Refference :

    https://www.youtube.com/watch?v=5AGXK9cL2fs

## Single HTML Report

### Configuration

Create a `.cypress-cucumber-preprocessorrc.json` file with the following content:

    ```
    .cypress-cucumber-preprocessorrc.json
    {
        "json": {
        "enabled": true,
        "output": "cypress/reports/cucumber-json/report.json",
        "formatter": "cucumber-json-formatter.exe"
        },
        "messages": {
        "enabled": true,
        "output": "cypress/reports/cucumber-json/messages.ndjson"
        },
        "html": {
        "enabled": true,
        "output": "cypress/reports/cucumber-html/cucumber-html-report.html"
        },
        "stepDefinitions": [
        "cypress/e2e/step_definitions/*.{js,ts}"
        ]
    }


    const { defineConfig } = require("cypress");
    const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
    const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
    const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

    module.exports = defineConfig({
    e2e: {
        async setupNodeEvents(on, config) {
        await addCucumberPreprocessorPlugin(on, config);

        on(
            "file:preprocessor",
            createBundler({
            plugins: [createEsbuildPlugin(config)],
            })
        );

        return config;
        },
        screenshotsFolder: "cypress/screenshots",
        specPattern: "cypress/e2e/**/*.feature",
        baseUrl: "https://opensource-demo.orangehrmlive.com",
        screenshotOnRunFailure: true,
        reporterOptions: {
        charts: true,
        reportPageTitle: 'report-cypress',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
        },
    },
    });

    "scripts": {
        "generate-report": "npx multiple-cucumber-html-reporter --reportDir cypress/reports --jsonDir cypress/cucumber-json",
        }
```


## Multiple HTML Report

### Configuration

```
    {  
    "name": "aljazari-template",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
        
    "devDependencies": {
        "@badeball/cypress-cucumber-preprocessor": "^22.0.0",
        "@bahmutov/cypress-esbuild-preprocessor": "^2.2.4",
        "@shelex/cypress-allure-plugin": "^2.40.2",
        "allure-commandline": "^2.32.0",
        "cucumber-json-report-formatter": "^0.1.4",
        "cypress": "^14.0.0",
        "moment": "^2.30.1",
        "multiple-cucumber-html-reporter": "^3.9.0"
    },
    "cypress-cucumber-preprocessor": {
        "nonGlobalStepDefinitions": true,
        "filterSpecs": true,
        "omitSource": true,
        "stepDefinitions": "cypress/e2e/**/*.{js,ts}",
        "json": {
        "enabled": true,
        "output": "cypress/reports/cucumber-json/report.json",
        "formatter": "cucumber-json-report-formatter",
        "filePrefix": "",
        "fileSuffix": ".cucumber"
        }
    },
    "scripts": {
        "generate-report": "node generate-html-report.js"
    }
    }


    //////////////////////////////////////////////////////////////////////////////


    const { defineConfig } = require("cypress");
    const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
    const {
    addCucumberPreprocessorPlugin,
    } = require("@badeball/cypress-cucumber-preprocessor");
    const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

    module.exports = defineConfig({
    e2e: {
        async setupNodeEvents(on, config) {
        await addCucumberPreprocessorPlugin(on, config, {
            // Enable JSON output for Cucumber
            json: {
            enabled: true,
            output: "cypress/cucumber-json/report.json", // Explicit output path
            },
        });

        on(
            "file:preprocessor",
            createBundler({
            plugins: [createEsbuildPlugin(config)],
            })
        );

        return config;
        },
        specPattern: "cypress/e2e/**/*.feature",
        baseUrl: "https://opensource-demo.orangehrmlive.com",
    },
    });

```
