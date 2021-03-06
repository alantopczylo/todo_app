import React from "react";
import { Toaster } from "react-hot-toast";
import Content from "./components/Content";
import Header from "./components/Header";
import Hero from "./components/Hero";
// import NavBar from "./components/NavBar";
import PageTitle from "./components/PageTitle";
import "./styles/GlobalStyles.css";

const App = () => {
  return (
    <>
      {/* <NavBar>Made by Alan Topczylo</NavBar> */}

      <div className="container">
        {/* <PageTitle>
          Task It.
        </PageTitle> */}
        <Hero/>
        <section className="appflex">
          <div className="border"></div>
          <div className="app">
            
            <Header />

            <Content />
          </div>
          <h3 className="madeby">made with love by<a href="https://www.linkedin.com/in/alan-topczylo/" target="__blank" className="link"> Alan Topczylo</a></h3>
        </section>
        
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
