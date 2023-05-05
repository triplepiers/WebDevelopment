import React from "react";
import Header from "./components/Header";
import Cards from "./components/Cards";
import Waterfall from "./components/Waterfall";
import logoImage from "./assets/logo.png";

export default class App extends React.Component {
  render() {
    return(
      <div className="app">
        <Header/>
        <Waterfall/>
        <Cards/>
        {/* 吸底按钮 */}
        <div className="button-wrapper">
          <img src={logoImage} alt="logo" />
          <a href="https://www.bilibili.com/" target="_blank" rel="noreferrer">
            <div className="btn">APP 内打开</div>
          </a>
        </div>
      </div>
      )
  }
}