import React from "react";
import "./header.css";
import bannerImage from "../../assets/banner.jpg";

export default class Header extends React.Component {
  render() {
    return(
      <div className="header">
        <img src={bannerImage} alt="Banner" />
      </div>
    )
  }
}