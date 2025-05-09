import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

// Update the test:e2e script to use our mock server
packageJson.scripts["test:e2e"] = "start-server-and-test mock:server http://localhost:3001 'cypress run'";
// Update the main test script to use our mock server for e2e tests
packageJson.scripts.test = "cypress run --component && start-server-and-test mock:server http://localhost:3001 'cypress run'";

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));