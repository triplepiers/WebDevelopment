// 无限跑马灯组件 Marquee

import React, { Component } from 'react'
import classNames from 'classnames'
import './Marquee.css'

export default class Marquee extends Component {
  state = {
    contentWidth: 0
  }

  componentDidMount() {
    this.setState({
      contentWidth: this.contentRef.clientWidth
    })
  }

  render() {
    // 接受插槽数据
    var { gradientColor, gradientWidth, 
          direction, delay,
          pauseOnHover,
          speed, recalc=false,
          startPlay=true,
          children, className, ...restProps} = this.props;

    var { contentWidth } = this.state;

    if(recalc && startPlay) {
      contentWidth = this.contentRef.clientWidth;
    }

    // 默认速度 20
    speed = speed || 20;
    var duration = contentWidth / speed;

    // 默认遮罩：20% 白色
    gradientColor = gradientColor || '#fff';
    gradientWidth = gradientWidth || '20%';

    // 传入的内容样式
    var contentStyles = {
      animationDelay: delay,
      animationDirection: direction === 'right' ? 'reverse' : undefined,
      animationDuration: duration + 's'
    }

    console.log(contentStyles)
    // 传入的遮罩样式
    const leftOverlayStyles = {
      width: gradientWidth,
      backgroundImage: 'linear-gradient(to right,' + gradientColor + ', transparent)'
    }
    const rightOverlayStyles = {
      width: gradientWidth,
      backgroundImage: 'linear-gradient(to left,' + gradientColor + ', transparent)'
    }

    return (
      // 合并类名
      <div className={classNames('marquee', className, pauseOnHover?'pauseOnHover':'', startPlay?'':'stop')} {...restProps}>
        {/* 复制一遍插槽内容 */}
        <div ref={c => this.contentRef=c} className='content' style={contentStyles}>
          {children}
        </div>
        <div className='content' style={contentStyles}>
          {children}
        </div>

        {/* 遮罩层 */}
        <div className="overlay leftOverlay"  style={leftOverlayStyles}></div>
        <div className="overlay rightOverlay" style={rightOverlayStyles}></div>
      </div>
    )
  }
}
