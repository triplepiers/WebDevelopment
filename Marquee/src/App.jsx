import React, { Component } from 'react'
import './App.css'
import Marquee from './Marquee/Marquee';

export default class App extends Component {
  state = {
    imgLoaded: 0,
    imgList: [
      './img/turn1.jpg',
      './img/turn2.jpg',
      './img/turn3.jpg',
      './img/turn4.jpg',
      './img/turn5.png'
    ],
    textList: [
      '你好世界',
      'Hello World',
      'こんにちは世界',
      'Ciao mondo',
      '헬로 월드',
      'Hello Mundo',
      'Hallo Welt',
      'สวัสดีชาวโลก',
      'Molo Lizwe',
      'Chào thế giới',
      'مرحبا بالعالم'
    ]
  }
  
  // 处理图片加载
  imgLoad() {
    // 确保正确累加（使用一般写法会被异步更新合并优化）
    this.setState( prevState => ({
      imgLoaded: prevState.imgLoaded+1
    }))
  }

  render() {
    const {imgLoaded, imgList, textList} = this.state;

    return (
      <div className='app'>
        <h1>React Marquee</h1>
        <p>轻量级 React 跑马灯组件（JSX 版本）</p>

        <h2>鸣谢</h2>
        <Marquee className='marquee' 
                 speed='60'  startPlay={imgLoaded === imgList.length*2} recalc={true}
                 gradientColor='#F8FBFD' direction='left' pauseOnHover='t'>
        <div className="list">
        {
          imgList.map((item, idx) => {
            return <img src={item} key={idx} alt='img' onLoad={() => this.imgLoad()}/>
          })
        }
        </div>
        </Marquee>       
        
        <h2>支持多语言</h2>
        <Marquee className='marquee' 
                 speed='20'
                 gradientColor='#F8FBFD' direction='right' pauseOnHover={true}>
          <div className='list'>
            {
              textList.map(text => (
                <div key={text} className='textItem'>
                  <span>{text}</span>
                </div>
              ))
            }
          </div>
        </Marquee>
      </div>
    )
  }
}
