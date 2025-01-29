const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'cypress/reports/cucumber-json', // Path to the directory containing JSON reports
  reportPath: 'cypress/reports/cucumber-html-report', // Path to the directory where the HTML report will be saved
  reportTitle: 'Latest Execution',
  overwrite: true,
  metadata: {
    browser: {
      name: 'chrome',
      version: 'latest',
    },
    device: 'Local test machine',
    platform: {
      name: 'windows',
      version: '10',
    },
    custom: [
      { name: "Environment v.", value: "12.3" },
      { name: "Plugin v.", value: "32.1" },
      { name: "Variable set", value: "Foo" },
    ]
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'Cypress Cucumber Project' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Cycle', value: 'B11221.34321' },
      { label: 'Execution Start Time', value: new Date().toLocaleString() },
      { label: 'Execution End Time', value: new Date().toLocaleString() },
    ],
  },
  displayDuration: true, // Display the duration of each step
  openReportInBrowser: true, // Automatically open the report in the default browser
  //pageFooter: '<div><p>Custom footer text</p></div>', // Custom footer for the report
  theme: 'bootstrap', // Choose from 'bootstrap', 'hierarchy', 'foundation', 'simple'
  reportName: 'Cypress Cucumber Test Report', // Custom name for the report
  disableLog: false, // Disable log output in the console
  screenshots: {
    enabled: true,
    path: 'cypress/screenshots',
    reportPath: 'cypress/reports/cucumber-html-report/screenshots'
  },
  saveCollectedJSON: true // Save the collected JSON files in the report path
});