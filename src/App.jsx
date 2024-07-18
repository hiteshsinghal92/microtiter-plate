// src/App.js
import React, { Suspense, lazy } from "react";
import { Container } from "react-bootstrap";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";
import { appTitle } from "./constant/application.constant";
import SpinerLoader from "./components/common/SpinerLoader";

const HomePage = lazy(() => import("./components/HomePage"));
/**
 * 
 * @description Main file to load
 */
const App = () => {
  return (
    <Container>
      <h2 className="text-center mt-4">{appTitle}</h2>
      <hr />
      <ErrorBoundary>
        <Suspense fallback={<SpinerLoader />}>
          <HomePage />
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
};

export default App;
