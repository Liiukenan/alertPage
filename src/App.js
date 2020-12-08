import React, { useEffect, useState } from 'react'
import {getQueryVariable,formentTime} from './assets/js/util'
import './assets/css/home.styl'
import Lottie from 'react-lottie'
import * as animationData from './assets/lottie/animation_bg.json'
import * as goData from './assets/lottie/btn_go.json'
function App(props) {
  const [btnAnimate, setBtn] = useState('btn') //设置按钮类
  const [goBtn, setGo] = useState('go') //设置按钮文字类
  const [time, setTime] = useState('') //设置时间

  //lottie 动画设置
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  const goOptions = {
    loop: true,
    autoplay: true,
    animationData: goData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  useEffect(()=>{
    const startTs=formentTime(getQueryVariable('startTs'))
    const endTs=formentTime(getQueryVariable('endTs'))
    setTime({
      startTs:startTs,
      endTs:endTs
    })
  },[])
  
  const goJump=()=>{
    try {
      window.webkit.messageHandlers.goJump.postMessage({name:''});
    } catch (error) {
      console.log(error)
    }
    // if(getPlane()){
    //   try {
    //     window.webkit.messageHandlers.goJump.postMessage()
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    
  }
  // 客户端调用时间
  useEffect(() => {
    if (btnAnimate === 'btn') {
      setTimeout(() => {
        setBtn('btn btn-animate')
        setGo('go btn-animate')
      }, 1000)
    } else {
      setTimeout(() => {
        setBtn('btn')
        setGo('go')
      }, 1000)
    }
  }, [btnAnimate])
  return (
    <div className="main">
      <div className="home">
        <div className="dancer">
          <Lottie
            options={defaultOptions}
            height={'100%'}
            width={'100%'}
            isStopped={props.loadingFlag}
          />
        </div>
        <div className={btnAnimate}>
          <Lottie
            options={goOptions}
            height={'100%'}
            width={'100%'}
            isStopped={props.loadingFlag}
          />
        </div>
        <div className="flex-justify flex-items flex-column time">
          <span className="fs-14">Activity time</span>
          <span className="fs-24 bold">{time.startTs}-{time.endTs}</span>
        </div>
        <button className={goBtn} onClick={goJump}>GO</button>
      </div>
    </div>
  )
}
export default App
