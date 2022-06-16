import HomePage from "pages/HomePage";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  const [isAuth, setAuth] = useState<Boolean>(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage isAuth={isAuth} />} />
          <Route path="/login" element={<LoginPage setAuth={setAuth} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
