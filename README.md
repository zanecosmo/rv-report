# Rv Inspection Report
This is an app created for my dad's RV Inspection business. It provides two versions of inspection templates (both editable), allows the saving of customers and report information on the users computer, and enables the saving of reports as PDF.

My purpose of this software:
- Give the user an editable template so that they don't have to create one from scratch very time, and it can change as their needs change.
- Save customer info in the computer in one easy to access place.
- Create new reports based on the type of RV, and associate them with a given customer.
- Save report information such that it can be altered later.
- Allow the saving of reports as PDF files so they can be handled and printed from the user's computer.

#### Possible Features:
- UI improvements, keyboard shortcuts for navigating more quickly.
- Separate data entity for RVs, just in case that info ends up needing to be stored independently of a report in the future.
- Possible re-write using a lighter framework than Electron.
- Add features that would enable the software to print forms of many kinds, not just RV Inspections Reports, and release it as a package or app.

## How it Works
Because this was only for my dad, I packaged it into an executable and sent it to him for his personal use. In the event that the app is expanded into a more generic tool for making and saving forms, I might release it on the app store, or refactor the code and release some of the functionality as an NPM package.

## About
This project uses ElectronJS, a framework which enables web technologies to be used to make desktop applications. The main-process uses NodeJS, and the render-process uses Chromium. I used ReactJS as my front end framework, and for storage employed simple JSON files (utilizing the NodeJS File System).
