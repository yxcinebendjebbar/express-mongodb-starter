#!/usr/bin/env node

const { execSync, exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const simpleGit = require("simple-git");

const git = simpleGit();

const projectName = process.argv[2];

if (!projectName) {
  console.error("Please provide a project name");
  process.exit(1);
}

const projectPath = path.join(process.cwd(), projectName);

if (fs.existsSync(projectPath)) {
  console.error("A directory with this name already exists!");
  process.exit(1);
}

const repoUrl =
  "https://github.com/yxcinebendjebbar/express-mongodb-template.git";

git
  .clone(repoUrl, projectPath)
  .then(() => {
    console.log("Template cloned successfully.");

    process.chdir(projectPath);

    execSync("npm install", { stdio: "inherit" });

    console.log("Dependencies installed successfully.");
    console.log("Your project is ready to go!");
    console.log("To get started:");
    console.log(`cd ${projectName}`);
    console.log("npm run dev");
  })
  .catch((err) => console.error("Failed to clone the template", err));
