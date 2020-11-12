import React from "react";
import Navigation from "./Navigation";
import { BrowserRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// import Header from "./Header";
toast.configure()
class MyApp extends React.Component {
  render() {
    return (
      <div className="MyApp">
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </div>
    );
  }
}
export default MyApp;
