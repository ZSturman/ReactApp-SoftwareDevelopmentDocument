import { DocDataProvider } from "./contextProvider/DocContextProvider";

import PreviewDocument from "./components/Preview/PreviewDocument";
import "./App.scss";
import Sidebar from "./components/Sidebar/Sidebar";
import "react-quill/dist/quill.snow.css"; 

// TODO: update to use React query




function App() {
  return (
      <DocDataProvider>
        <div className="app-container">
          <Sidebar />
          <PreviewDocument />
        </div>
      </DocDataProvider>
  );
}

export default App;
