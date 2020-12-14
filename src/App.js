import React, { useEffect, useState } from 'react'
import {getQueryVariable,formentTime, getPlane} from './assets/js/util'
import './assets/css/home.styl'
import Lottie from 'react-lottie'
import * as animationData from './assets/lottie/animation_bg.json'
import * as goData from './assets/lottie/btn_go.json'
import i18n from 'i18next'
import { useTranslation, initReactI18next } from 'react-i18next'
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them)
    resources: {
      en: {
        translation: {
          go: 'GO',
          open: 'Open time'
        }
      },
      ar: {
        translation: {
          go: 'انطلق',
          open: 'وقت مفتوح'
        }
      },
      tr: {
        translation: {
          go: 'GİT',
          open: 'Çalışma saati'
        }
      },
      es: {
        translation: {
          go: 'IR',
          open: 'Tiempo abierto'
        }
      },
      in: {
        translation: {
          go: 'AYO',
          open: 'Waktu buka'
        }
      },
      id: {
        translation: {
          go: 'AYO',
          open: 'Waktu buka'
        }
      },
      hi: {
        translation: {
          go: 'जाओ',
          open: 'खुलने का समय'
        }
      },
      de: {
        translation: {
          go: 'LOS',
          open: 'खुलने का समय'
        }
      },
      fr: {
        translation: {
          go: 'ALLER',
          open: 'Temps ouvert'
        }
      },
      ja: {
        translation: {
          go: '行く',
          open: 'オープン時間'
        }
      },
      zh_TW: {
        translation: {
          go: '前往',
          open: '開放時間'
        }
      },
      zh: {
        translation: {
          go: '前往',
          open: '開放時間'
        }
      },
      'zh-Hant': {
        translation: {
          go: '前往',
          open: '開放時間'
        }
      },
      ko: {
        translation: {
          go: '이동',
          open: '오픈 시간'
        }
      }
    },
    lng: getQueryVariable('lang') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })
function App(props) {
  const [btnAnimate, setBtn] = useState('btn') //设置按钮类
  const [goBtn, setGo] = useState('go') //设置按钮文字类
  const [time, setTime] = useState('') //设置时间
  const { t } = useTranslation()
  
  const [myPhone, setMyPhone] = useState(false)
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
    const isIphone5 = () => {
      const events = navigator.userAgent
      if (events.indexOf('iPhone') > -1) {
        if (window.screen.height === 568 && window.screen.width === 320) {
          setMyPhone(true)
          return
        }
        setMyPhone(false)
      } else {
        setMyPhone(false)
      }
    }
    const startTs=formentTime(getQueryVariable('startTs'))
    const endTs=formentTime(getQueryVariable('endTs'))
    isIphone5()
    setTime({
      startTs:startTs,
      endTs:endTs
    })
  },[])
  
  const goJump = () => {
    if (getPlane()) {
      try {
        window.webkit.messageHandlers.goJump.postMessage({ name: '' })
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        window.clientWindow.goJump()
      } catch (error) {
        console.log(error)
      }
    }
  }
  // 客户端调用时间
  useEffect(() => {
    
    if (btnAnimate === 'btn' && !myPhone) {
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
  }, [btnAnimate,myPhone])
  
  
  const Btn = () => {
    if (myPhone) {
      return (
        <button className="iphoneGo" onClick={goJump}>
          {t('go')} 
        </button>
      )
    } else {
      return (
        <button className={goBtn} onClick={goJump}>
          {t('go')}
        </button>
      )
    }
  }
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
        <div className="flex-justify-center flex-items flex-column time">
          <span className="fs-14 bold">{t('open')}</span>
          <span className="fs-24 bold mt-4">{time.startTs}-{time.endTs}</span>
        </div>
        {/* <button className={goBtn} onClick={goJump}>GO</button> */}
        <Btn />
      </div>
    </div>
  )
}
export default App
