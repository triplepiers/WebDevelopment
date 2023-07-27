import React from "react";
import "./cards.css";
import cardImage from "../../assets/card.jpg";
import titleImage1 from "../../assets/title1.jpg";
import titleImage2 from "../../assets/title2.jpg";

export default class Cards extends React.Component {
  render() {
    return(
      <div className="cards">
        <img src={titleImage1} alt="Title 1" />
        <img src={cardImage} alt="Card" className="Card"/>
        <img src={titleImage2} alt="Title 2" />
        <img src={cardImage} alt="Card" className="Card"/>
      </div>
    )
  }
}