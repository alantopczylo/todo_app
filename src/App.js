import React from "react";
import { Toaster } from "react-hot-toast";
import Content from "./components/Content";
import Header from "./components/Header";
import PageTitle from "./components/PageTitle";

const App = () => {
  return (
    <>
      <div className="container">
        <PageTitle>Task It</PageTitle>
        <Header />
        <Content />
      </div>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "20px",
          },
        }}
      />
    </>
  );
};

export default App;
