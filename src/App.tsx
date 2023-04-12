import React from "react";
import logo from "./logo.svg";
import "antd/dist/reset.css";
import "./App.css";
import Index from "./pages/Index";
import Customers from "./pages/Customer/Customers";
import Employee from "./pages/Employee/Employee";
import Products from "./pages/Products/Products";
import Supplier from "./pages/Supplier/Supplier";

function App() {
  return (
    <div>
      {/* <Index /> */}
      {/* <Customers /> */}
      {/* <Employee/> */}
      <Products />
      {/* <Supplier/> */}
    </div>
  );
}

export default App;
