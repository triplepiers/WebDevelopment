import React from "react";
import "./waterfall.css";
import cartoonImage from "../../assets/cartoon.jpg";
import foodImage from "../../assets/food.jpg";
import movieImage from "../../assets/movie.png";
import lifeImage from "../../assets/life.jpg";

export default class Waterfall extends React.Component {
  // 监听窗口滚动
  componentDidMount() {
    const _this = this;
    window.onscroll = function() {
      // 判定是否出现底栏(超过 section2 都出现)
      if(document.querySelector(".tabs").getBoundingClientRect().top === 0) {
        document.querySelector(".button-wrapper").classList.add("show")
      } else if(document.querySelector(".tabs").getBoundingClientRect().top > 0) {
        document.querySelector(".button-wrapper").classList.remove("show")
      }
      // 判定当前活跃的 tab
      const sections = document.querySelectorAll(".section");
      for(let i = 0; i < sections.length; i++) {
        // top 是相对[视口]的距离
        const {top} = sections[i].getBoundingClientRect();
        if(top >= 0 && top <= 56) {
          _this.setState({
            activeTab: sections[i].getAttribute('data-id')
          })
        }
      }
    }
  }

  state = {
    tabs: [
      {
        key: 'cartoon',
        title: '动画',
        img: cartoonImage
      },
      {
        key: 'food',
        title: '美食',
        img: foodImage
      },
      {
        key: 'movie',
        title: '电影',
        img: movieImage
      },
      {
        key: 'life',
        title: '生活',
        img: lifeImage
      },
    ],
    activeTab:"cartoon"
  }

  handleTabClick = function(tabKey) {
    this.setState({
      activeTab: tabKey
    })
    this.scrollToContent(tabKey)
  }

  scrollToContent = function(tabKey) {
    // Plan A: 硬算绝对滚动位置
    // 56px 是 tabs 的高度（防止遮挡 -> 减，不是加）
    // const dist = this.refs[tabKey].offsetTop - 56;
    // window.scrollTo({
    //   top: dist,
    //   behavior: 'smooth'
    // });

    // Plan B: + scroll-margin
    const tabContent = document.querySelector(`[data-id=${tabKey}]`)
    tabContent.scrollIntoView({behavior:'smooth'})
  }

  render() {
    const {tabs, activeTab} = this.state;
    return(
      <div className="waterfall">
        <div className="tabs" ref="tabs">
          {
            tabs.map(tab => (
              <div 
                className={activeTab===tab.key?"tab-item active":"tab-item"}
                key={tab.key}
                onClick={(e) => this.handleTabClick(tab.key)}
              >
                <span>{tab.title}</span>
                <span className="line"></span>
              </div>
            ))
          }
        </div>
        <div className="tab-content">
          {
            tabs.map(tab => (
              <div className="section" key={tab.key} data-id={tab.key}
               ref={tab.key}>
                <h2>{tab.title}</h2>
                <img src={tab.img} alt={tab.key} />
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}