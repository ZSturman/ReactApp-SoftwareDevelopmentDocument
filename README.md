# Project Name

## Description

This project is a React application written in TypeScript. It uses json-server to mock a backend API.

## Installation

1. Clone the repository:
```sh
git clone https://github.com/ZSturman/ReactApp-SoftwareDevelopmentDocument.git
```

2. Install the dependencies:
```sh
npm install
```

### Running the Application
Start the json-server:
```sh
npx json-server --watch server/data/defaultData.json --port 8000
```

This will start the json-server on http://localhost:8000.

In a new terminal window, start the application:
```sh
npm run dev
```
This will start the application on http://localhost:3000.

### Using the Application
#### Main components:

* DocumentList: This component displays a list of all documents. It has a deleted documents area which holds onto the deleted documents for 30 days before permanently deleting them.

* DocumentForm: This component allows you to create new documents. This contains a form with fields for the document title, logo and contributors.

* The ChapterForm, SectionForm and ContentForm components are used to create new chapters, sections and content respectively. There can be dragged and dropped to reorder them. They also contain a delete button to delete them.

* Preview: This component shows a preview of the current document in realtime.

#### Utilities

* checkChapterHeight: this checks the height of the current preview window and updates the document pages accordingly to provide the correct page breaks as well as the correct page numbers.
* createDocument: this function creates a new document with the given title and contributors.
* updateTheme: this function updates the theme of the application. Currently it just provides a PDF preview of the page.

#### Managers
*  docDataManager: this class manages the data of the documents. It contains functions to get, create, update and delete documents.
* docPreviewManager: this class manages the preview of the documents. It contains functions to update the preview and the theme.

#### Contexts
* DocumentContext: this context provides the data of the documents to the components.
* PreviewContext: this context provides the preview of the documents to the components.


#### Defaults
* The defaultData.json file in the server/data folder contains the default data for the application. This is used by the json-server to mock a backend API.


### License
This project is licensed under the MIT License 