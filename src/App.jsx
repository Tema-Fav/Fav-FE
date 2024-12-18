import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { mainRoutes } from "./routers/main-router";

function renderRoutes(routesObj) {
  return routesObj.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} index={route.index} element={route.element}>
          {route.children ? renderRoutes(route.children) : null}
        </Route>
      );
    }
    return <Route key={route.path} path={route.path} index={route.index} element={route.element} />;
  });
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>{renderRoutes(mainRoutes)}</Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
