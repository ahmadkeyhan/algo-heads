import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/wheels.module.css'
import { useState, useEffect } from 'react'
import * as MdIcons from 'react-icons/md'
import { motion, useAnimation } from "framer-motion"
import NavSlider from './NavSlider'
import { useRouter } from 'next/router'

export default function Wheels() {

  const router = useRouter()
  
  const [animationRunning, setAnimationRunning] = useState(true)
  const control1 = useAnimation()
  const control2 = useAnimation()
  const control3 = useAnimation()
  const control4 = useAnimation()
  const control5 = useAnimation()
  const control6 = useAnimation()
  const control7 = useAnimation()
  const control8 = useAnimation()
  const control9 = useAnimation()
  const control10 = useAnimation()
  const control11 = useAnimation()
  const control12 = useAnimation()

  // const randomColorCode = Math.floor(Math.random()*7);
  const randomColorCode = router.query.colorCode ? parseInt(router.query.colorCode) : 0
  const [colorCode, setColorCode] = useState(router.query.colorCode ? parseInt(router.query.colorCode) : randomColorCode);
  const lightColorPalette = ['#6BDFCA','#E9F178','#FFE474','#FFBC76','#FF9977','#D273DB','#BAB9B3'];
  const darkColorPalette = ['#25685c','#787c3e','#8d7e40','#a77c4e','#965a46','#7a4380','#6a6a6a']
  const [colorSliderOpen, setColorSliderOpen] = useState(false);
  const [tout, setTout] = useState(null);
  // useEffect(() => {
  //   router.push({
  //     pathname: '/',
  //     query: {colorCode: colorCode}
  //   })
  // },[colorCode])
  useEffect(() => {
    setColorCode(parseInt(router.query.colorCode))
  }, [router])
  console.log(parseInt(router.query.colorCode),colorCode)
  
  const arrowPalette = ['/tealArrows.png',
                        '/yellowArrows.png',
                        '/amberArrows.png',
                        '/orangeArrows.png',
                        '/redArrows.png',
                        '/purpleArrows.png',
                        '/greyArrows.png'];
  const [arrows, setArrows] = useState(arrowPalette[router.query.colorCode ? parseInt(router.query.colorCode) : randomColorCode]);

  const buyBannerPalette = ['/buyBannerTeal.png',
                            '/buyBannerYellow.png',
                            '/buyBannerAmber.png',
                            '/buyBannerOrange.png',
                            '/buyBannerRed.png',
                            '/buyBannerPurple.png',
                            '/buyBannerGrey.png']
  const [buyBanner, setBuyBanner] = useState(buyBannerPalette[6])

  const scrollArrowPalette = ['/tealScrollArrows.png',
    '/yellowScrollArrows.png',
    '/amberScrollArrows.png',
    '/orangeScrollArrows.png',
    '/redScrollArrows.png',
    '/purpleScrollArrows.png',
    '/greyScrollArrows.png'];
  const [scrollArrows, setScrollArrows] = useState([scrollArrowPalette[router.query.colorCode ? parseInt(router.query.colorCode) : randomColorCode], scrollArrowPalette[router.query.colorCode ? parseInt(router.query.colorCode) : randomColorCode]]);

  const maleHeadPalette = [['/baldHeadTeal.png',
                        '/coconutHeadTeal.png',
                        '/gmHeadTeal.png',
                        '/leilaHeadTeal.png',
                        '/keyhansaHeadTeal.png',
                        '/lincolnHeadTeal.png',
                        '/mohawkHeadTeal.png',
                        '/potatoHeadTeal.png'],
                        ['/baldHeadYellow.png',
                        '/coconutHeadYellow.png',
                        '/gmHeadYellow.png',
                        '/leilaHeadYellow.png',
                        '/keyhansaHeadYellow.png',
                        '/lincolnHeadYellow.png',
                        '/mohawkHeadYellow.png',
                        '/potatoHeadYellow.png'],
                        ['/baldHeadAmber.png',
                        '/coconutHeadAmber.png',
                        '/gmHeadAmber.png',
                        '/leilaHeadAmber.png',
                        '/keyhansaHeadAmber.png',
                        '/lincolnHeadAmber.png',
                        '/mohawkHeadAmber.png',
                        '/potatoHeadAmber.png'],
                        ['/baldHeadOrange.png',
                        '/coconutHeadOrange.png',
                        '/gmHeadOrange.png',
                        '/leilaHeadOrange.png',
                        '/keyhansaHeadOrange.png',
                        '/lincolnHeadOrange.png',
                        '/mohawkHeadOrange.png',
                        '/potatoHeadOrange.png'],
                        ['/baldHeadRed.png',
                        '/coconutHeadRed.png',
                        '/gmHeadRed.png',
                        '/leilaHeadRed.png',
                        '/keyhansaHeadRed.png',
                        '/lincolnHeadRed.png',
                        '/mohawkHeadRed.png',
                        '/potatoHeadRed.png'],
                        ['/baldHeadPurple.png',
                        '/coconutHeadPurple.png',
                        '/gmHeadPurple.png',
                        '/leilaHeadPurple.png',
                        '/keyhansaHeadPurple.png',
                        '/lincolnHeadPurple.png',
                        '/mohawkHeadPurple.png',
                        '/potatoHeadPurple.png'],
                        ['/baldHeadGrey.png',
                        '/coconutHeadGrey.png',
                        '/gmHeadGrey.png',
                        '/leilaHeadGrey.png',
                        '/keyhansaHeadGrey.png',
                        '/lincolnHeadGrey.png',
                        '/mohawkHeadGrey.png',
                        '/potatoHeadGrey.png']];
  const maleEyes = [['/maleEyes1.png', 3],
                    ['/maleEyes2.png', 3],
                    ['/maleEyes3.png', 3],
                    ['/maleEyes4.png', 12],
                    ['/maleEyes5.png', 3],
                    ['/maleEyes6.png', 12],
                    ['/maleEyes7.png', 12],
                    ['/maleEyes8.png', 12],
                    ['/maleEyes9.png', 1],
                    ['/maleEyes10.png', 3],
                    ['/maleEyes11.png', 12],
                    ['/maleEyes12.png', 12],
                    ['/maleEyes13.png', 12],
                    ['/maleEyes14.png', 12],
                    ['/maleEyes15.png', 12],
                    ['/maleEyes16.png', 12],
                    ['/maleEyes17.png', 12],
                    ['/maleEyes18.png', 1],
                    ['/maleEyes19.png', 12],
                    ['/maleEyes20.png', 12],
                    ['/maleEyes21.png', 12],
                    ['/maleEyes22.png', 12],
                    ['/maleEyes23.png', 12],
                    ['/maleEyes24.png', 12],
                    ['/maleEyes25.png', 12],
                    ['/maleEyes26.png', 12],
                    ['/maleEyes27.png', 12],
                    ['/maleEyes28.png', 3],
                    ['/maleEyes29.png', 12],
                    ['/maleEyes30.png', 12],
                    ['/maleEyes31.png', 12],
                    ['/maleEyes32.png', 12]]
  const [maleEyesLot, setMaleEyesLot] = useState([])
  const [eyes, setEyes] = useState(['/maleEyes4.png',
                                    '/maleEyes8.png',
                                    '/maleEyes11.png',
                                    '/maleEyes13.png',
                                    '/maleEyes17.png',
                                    '/maleEyes24.png',
                                    '/maleEyes28.png',
                                    '/maleEyes10.png'])
  const [eyesRarity, setEyesRarity] = useState([144/308, 144/308,
                                                144/308, 144/308,
                                                144/308, 144/308,
                                                9/308, 9/308])
  const [sortedEyes, setSortedEyes] = useState([])
  const [sortedEyesRarity, setSortedEyesRarity] = useState([])
                                    
  const maleMouthes = [['/maleMouth1.png', 7],
                       ['/maleMouth2.png', 7],
                       ['/maleMouth3.png', 7],
                       ['/maleMouth4.png', 7],
                       ['/maleMouth5.png', 1],
                       ['/maleMouth6.png', 1],
                       ['/maleMouth7.png', 7],
                       ['/maleMouth8.png', 7],
                       ['/maleMouth9.png', 1],
                       ['/maleMouth10.png', 1],
                       ['/maleMouth11.png', 7],
                       ['/maleMouth12.png', 7],
                       ['/maleMouth13.png', 7],
                       ['/maleMouth14.png', 7],
                       ['/maleMouth15.png', 7],
                       ['/maleMouth16.png', 7],
                       ['/maleMouth17.png', 7],
                       ['/maleMouth18.png', 7]]
  const [maleMouthesLot, setMaleMouthesLot] = useState([])
  const [mouthes, setMouthes] = useState(['/maleMouth1.png',
                                    '/maleMouth2.png',
                                    '/maleMouth3.png',
                                    '/maleMouth4.png',
                                    '/maleMouth10.png',
                                    '/maleMouth13.png',
                                    '/maleMouth16.png',
                                    '/maleMouth18.png'])
  const [mouthesRarity, setMouthesRarity] = useState([49/102, 49/102,
                                                      49/102, 49/102,
                                                      1/102, 49/102,
                                                      49/102, 49/102])
  const [sortedMouthes, setSortedMouthes] = useState([])
  const [sortedMouthesRarity, setSortedMouthesRarity] = useState([])
  
  const maleNoses = [['/maleNose1.png',8],
                    ['/maleNose2.png',8],
                    ['/maleNose3.png',8],
                    ['/maleNose4.png',8],
                    ['/maleNose5.png',2],
                    ['/maleNose6.png',8],
                    ['/maleNose7.png',8],
                    ['/maleNose8.png',8],
                    ['/maleNose9.png',1],
                    ['/maleNose10.png',1],
                    ['/maleNose11.png',8],
                    ['/maleNose12.png',8],
                    ['/maleNose13.png',8],
                    ['/maleNose14.png',8],
                    ['/maleNose15.png',8],
                    ['/maleNose16.png',8],
                    ['/maleNose17.png',8],
                    ['/maleNose18.png',8],
                    ['/maleNose19.png',8],]
  const [maleNosesLot, setMaleNosesLot] = useState([])
  const [noses, setNoses] = useState(['/maleNose1.png',
                                    '/maleNose2.png',
                                    '/maleNose3.png',
                                    '/maleNose7.png',
                                    '/maleNose10.png',
                                    '/maleNose13.png',
                                    '/maleNose16.png',
                                    '/maleNose18.png'])
  const [nosesRarity, setNosesRarity] = useState([64/134, 64/134,
                                                  64/134, 64/134,
                                                  1/134, 64/134,
                                                  64/134, 64/134])                                  
  const [sortedNoses, setSortedNoses] = useState([])
  const [sortedNosesRarity, setSortedNosesRarity] = useState([])

  const femaleHeadPalette = [['/minaHeadTeal.png',
                        '/aHeadTeal.png',
                        '/bHeadTeal.png',
                        '/cHeadTeal.png',
                        '/dHeadTeal.png',
                        '/eHeadTeal.png',
                        '/fHeadTeal.png',
                        '/cHeadTeal.png'],
                        ['/minaHeadYellow.png',
                        '/aHeadYellow.png',
                        '/bHeadYellow.png',
                        '/cHeadYellow.png',
                        '/dHeadYellow.png',
                        '/eHeadYellow.png',
                        '/fHeadYellow.png',
                        '/cHeadYellow.png'],
                        ['/minaHeadAmber.png',
                        '/aHeadAmber.png',
                        '/bHeadAmber.png',
                        '/cHeadAmber.png',
                        '/dHeadAmber.png',
                        '/eHeadAmber.png',
                        '/fHeadAmber.png',
                        '/cHeadAmber.png'],
                        ['/minaHeadOrange.png',
                        '/aHeadOrange.png',
                        '/bHeadOrange.png',
                        '/cHeadOrange.png',
                        '/dHeadOrange.png',
                        '/eHeadOrange.png',
                        '/fHeadOrange.png',
                        '/cHeadOrange.png'],
                        ['/minaHeadRed.png',
                        '/aHeadRed.png',
                        '/bHeadRed.png',
                        '/cHeadRed.png',
                        '/dHeadRed.png',
                        '/eHeadRed.png',
                        '/fHeadRed.png',
                        '/cHeadRed.png'],
                        ['/minaHeadPurple.png',
                        '/aHeadPurple.png',
                        '/bHeadPurple.png',
                        '/cHeadPurple.png',
                        '/dHeadPurple.png',
                        '/eHeadPurple.png',
                        '/fHeadPurple.png',
                        '/cHeadPurple.png'],
                        ['/minaHeadGrey.png',
                        '/aHeadGrey.png',
                        '/bHeadGrey.png',
                        '/cHeadGrey.png',
                        '/dHeadGrey.png',
                        '/eHeadGrey.png',
                        '/fHeadGrey.png',
                        '/cHeadGrey.png']];

  const [male, setMale] = useState(true);
  const headPalette = male ? maleHeadPalette : femaleHeadPalette;
  const [heads, setHeads] = useState(headPalette[6]);
  // const [sortedHeads, setSortedHeads] = useState([]);

  const [width, setWidth] = useState(null)
  const [height, setHeight] = useState (null)

 
  useEffect(() => {

    setWidth(window.innerWidth)
    setHeight(window.innerHeight)

    setColorCode(router.query.colorCode ? parseInt(router.query.colorCode) : randomColorCode)
    setHeads(headPalette[randomColorCode])
    setArrows(arrowPalette[randomColorCode])
    setScrollArrows([scrollArrowPalette[(randomColorCode+3)%7], scrollArrowPalette[randomColorCode]])
    setBuyBanner(buyBannerPalette[(randomColorCode+3)%7])
    
    for (var i=0; i< maleEyes.length; i++) {
      for (var j=0; j< maleEyes[i][1]; j++) {
        maleEyesLot.push([maleEyes[i][0], maleEyes[i][1]])
      }
    }

    for (var i=0; i< maleMouthes.length; i++) {
      for (var j=0; j< maleMouthes[i][1]; j++) {
        maleMouthesLot.push([maleMouthes[i][0], maleMouthes[i][1]])
      }
    }

    for (var i=0; i< maleNoses.length; i++) {
      for (var j=0; j< maleNoses[i][1]; j++) {
        maleNosesLot.push([maleNoses[i][0], maleNoses[i][1]])
      }
    }
    
    control1.start({
      left: ['50vw', '50vw', '50vw', '50vw',
            '85.35vw', '85.35vw', '85.35vw', '85.35vw',
            '14.65vw', '14.65vw', '0vw', '0vw',
            '14.65vw', '14.65vw', '14.65vw','14.65vw', '50vw'],
      top: ['100vw','100vw', '100vw','100vw',
            '85.35vw', '85.35vw', '-14.65vw','-14.65vw',
            '14.65vw', '14.65vw', '50vw','50vw',
            '85.35vw', '85.35vw', '85.35vw','85.35vw', '100vw'],
      transition: {ease:'backInOut', repeat:Infinity, delay: 1, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375, 0.5,
          0.5625, 0.625,0.6875, 0.75,
          0.8125, 0.875,0.9375, 1]}
    })
    control2.start({
      left: ['14.65vw','14.65vw', '14.65vw', '14.65vw',
        '50vw','50vw', '50vw', '50vw',
        '85.35vw', '85.35vw', '85.35vw', '85.35vw',
        '14.65vw','14.65vw', '0vw', '0vw', '14.65vw'],
      top: ['85.35vw', '85.35vw','85.35vw', '85.35vw',
        '100vw', '100vw', '100vw', '100vw',
        '85.35vw', '85.35vw', '-14.65vw', '-14.65vw',
        '14.65vw', '14.65vw', '50vw', '50vw', '85.35vw'],
      transition: {ease:'backInOut', repeat:Infinity, delay: 1, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })
    control3.start({
      left: ['14.65vw','14.65vw', '0vw', '0vw',
        '14.65vw', '14.65vw', '14.65vw', '14.65vw',
        '50vw', '50vw','50vw', '50vw',
        '85.35vw', '85.35vw', '85.35vw', '85.35vw', '14.65vw'],
      top: ['14.65vw','14.65vw', '50vw','50vw',
        '85.35vw', '85.35vw','85.35vw', '85.35vw',
        '100vw', '100vw', '100vw', '100vw',
        '85.35vw', '85.35vw', '-14.65vw', '-14.65vw', '14.65vw'],
      transition: {ease:'backInOut', repeat:Infinity, delay: 1, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })
    control4.start({
      left: ['85.35vw','85.35vw', '85.35vw', '85.35vw',
        '14.65vw', '14.65vw', '0vw', '0vw',
        '14.65vw', '14.65vw', '14.65vw', '14.65vw',
        '50vw', '50vw','50vw', '50vw', '85.35vw'],
      top: ['85.35vw','85.35vw', '-14.65vw', '-14.65vw',
        '14.65vw', '14.65vw', '50vw', '50vw',
        '85.35vw', '85.35vw', '85.35vw', '85.35vw',
        '100vw', '100vw', '100vw', '100vw', '85.35vw'],
      transition: {ease:'backInOut', repeat:Infinity, delay: 1, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })
    control5.start({
      left: ['50vw','50vw', '14.65vw', '14.65vw',
        '14.65vw', '14.65vw', '85.35vw', '85.35vw',
        '85.35vw', '85.35vw', '100vw', '100vw',
        '85.35vw','85.35vw', '50vw', '50vw', '50vw'],
      top: ['100vw','100vw', '85.35vw', '85.35vw',
        '14.65vw', '14.65vw', '14.65vw', '14.65vw',
        '14.65vw', '14.65vw', '50vw', '50vw',
        '85.35vw', '85.35vw', '100vw', '100vw', '100vw'],
      transition: {ease:'backInOut', repeat:Infinity, delay: 1, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })
    control6.start({
      left: ['85.35vw', '85.35vw', '50vw', '50vw',
        '50vw', '50vw', '14.65vw', '14.65vw',
        '14.65vw', '14.65vw', '85.35vw', '85.35vw',
        '85.35vw', '85.35vw', '100vw', '100vw','85.35vw'],
      top: ['85.35vw', '85.35vw', '100vw', '100vw',
        '100vw', '100vw', '85.35vw','85.35vw',
        '14.65vw', '14.65vw', '14.65vw', '14.65vw',
        '14.65vw', '14.65vw', '50vw','50vw', '85.35vw'],
      transition: {ease:'backInOut', repeat:Infinity, delay: 1, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })
    control7.start({
      left: ['85.35vw', '85.35vw', '100vw', '100vw',
        '85.35vw', '85.35vw', '50vw', '50vw',
        '50vw', '50vw', '14.65vw', '14.65vw',
        '14.65vw', '14.65vw', '85.35vw', '85.35vw', '85.35vw'],
      top: ['14.65vw', '14.65vw', '50vw', '50vw',
        '85.35vw', '85.35vw', '100vw', '100vw',
        '100vw', '100vw', '85.35vw', '85.35vw',
        '14.65vw', '14.65vw', '14.65vw', '14.65vw', '14.65vw'],
      transition: {ease:'backInOut', repeat:Infinity, delay: 1, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })
    control8.start({
      left: ['14.65vw', '14.65vw', '85.35vw', '85.35vw',
        '85.35vw', '85.35vw', '100vw', '100vw',
        '85.35vw', '85.35vw', '50vw', '50vw',
        '50vw', '50vw', '14.65vw', '14.65vw', '14.65vw'],
      top: ['14.65vw', '14.65vw', '14.65vw', '14.65vw',
        '14.65vw', '14.65vw', '50vw', '50vw',
        '85.35vw', '85.35vw', '100vw', '100vw',
        '100vw', '100vw', '85.35vw', '85.35vw', '14.65vw'],
      transition: {ease:'backInOut', repeat:Infinity, delay: 1, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })
    control9.start({
      rotate: [-15, -15, -15, -15,
        -195, -195, -195, -195,
        -375, -375, -375, -375,
        -555, -555, -555, -555, -735],
      transition: {ease:'backInOut', repeat:Infinity, delay: 1, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })
    control10.start({
      rotate: [15, 15, 195, 195,
        195, 195, 375, 375,
        375, 375, 555, 555,
        555, 555, 735, 735, 735],
      transition: {ease:'backInOut', repeat:Infinity, delay: 1, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })

    control11.start({
      rotate: [0,-45,-225,-360],
      opacity: [1, 0, 0, 1],
      transition: {ease:'backInOut', repeat: Infinity, delay: 3, duration: 3, repeatDelay:3}
    })

    control12.start({
      rotate: [30,75,255,390],
      opacity: [1, 0, 0, 1],
      transition: {ease:'backInOut', repeat: Infinity, delay: 3, duration: 2, repeatDelay:4 }
    })    
  }, [])

  useEffect(() => {
    if (colorSliderOpen) {
      setTout(setTimeout(() => setColorSliderOpen(false),5000))
    }
  },[colorSliderOpen])

  useEffect(() => {
    clearTimeout(tout)
    setTout(setTimeout(() => setColorSliderOpen(false),5000))
  },[colorCode])

  useEffect(() => {
    setHeads(headPalette[colorCode])
  }, [male])

  function Shuffle() {
    // for (var i = 8; i>0; i--) {
    //   let x = Math.floor(Math.random()*i)
    //   sortedHeads.push(heads[x])
    //   heads.splice(x,1)
    // }
    // setHeads(sortedHeads)
    // setSortedHeads([])

    for (var i = 8; i>0; i--) {
      var x = Math.floor(Math.random()*maleEyesLot.length)
      sortedEyes.push(maleEyesLot[x][0])
      sortedEyesRarity.push(maleEyesLot[x][1]*maleEyesLot[x][1]/308)
    }
    setEyes(sortedEyes)
    setEyesRarity(sortedEyesRarity)
    setSortedEyes([])
    setSortedEyesRarity([])

    for (var i = 8; i>0; i--) {
      var x = Math.floor(Math.random()*maleMouthesLot.length)
      sortedMouthes.push(maleMouthesLot[x][0])
      sortedMouthesRarity.push(maleMouthesLot[x][1]*maleMouthesLot[x][1]/102)
    }
    setMouthes(sortedMouthes)
    setMouthesRarity(sortedMouthesRarity)
    setSortedMouthes([])
    setSortedMouthesRarity([])

    for (var i = 8; i>0; i--) {
      var x = Math.floor(Math.random()*maleNosesLot.length)
      sortedNoses.push(maleNosesLot[x][0])
      sortedNosesRarity.push(maleNosesLot[x][1]*maleNosesLot[x][1]/134)
    }
    setNoses(sortedNoses)
    setNosesRarity(sortedNosesRarity)
    setSortedNoses([])
    setSortedNosesRarity([])
  }

  function AnimationStop() {
      setAnimationRunning(!animationRunning)
      control1.stop()
      control2.stop()
      control3.stop()
      control4.stop()
      control5.stop()
      control6.stop()
      control7.stop()
      control8.stop()
      control9.stop()
      control10.stop()
  }

  function AnimationStart() {
    setAnimationRunning(!animationRunning)
    Shuffle()
    control1.start({
      left: ['50vw', '50vw', '50vw', '50vw',
            '85.35vw', '85.35vw', '85.35vw', '85.35vw',
            '14.65vw', '14.65vw', '0vw', '0vw',
            '14.65vw', '14.65vw', '14.65vw','14.65vw', '50vw'],
      top: ['100vw','100vw', '100vw','100vw',
            '85.35vw', '85.35vw', '-14.65vw','-14.65vw',
            '14.65vw', '14.65vw', '50vw','50vw',
            '85.35vw', '85.35vw', '85.35vw','85.35vw', '100vw'],
      transition: {ease:'backInOut', repeat:Infinity, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375, 0.5,
          0.5625, 0.625,0.6875, 0.75,
          0.8125, 0.875,0.9375, 1]}
    })
    control2.start({
      left: ['14.65vw','14.65vw', '14.65vw', '14.65vw',
        '50vw','50vw', '50vw', '50vw',
        '85.35vw', '85.35vw', '85.35vw', '85.35vw',
        '14.65vw','14.65vw', '0vw', '0vw', '14.65vw'],
      top: ['85.35vw', '85.35vw','85.35vw', '85.35vw',
        '100vw', '100vw', '100vw', '100vw',
        '85.35vw', '85.35vw', '-14.65vw', '-14.65vw',
        '14.65vw', '14.65vw', '50vw', '50vw', '85.35vw'],
      transition: {ease:'backInOut', repeat:Infinity, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })
    control3.start({
      left: ['14.65vw','14.65vw', '0vw', '0vw',
        '14.65vw', '14.65vw', '14.65vw', '14.65vw',
        '50vw', '50vw','50vw', '50vw',
        '85.35vw', '85.35vw', '85.35vw', '85.35vw', '14.65vw'],
      top: ['14.65vw','14.65vw', '50vw','50vw',
        '85.35vw', '85.35vw','85.35vw', '85.35vw',
        '100vw', '100vw', '100vw', '100vw',
        '85.35vw', '85.35vw', '-14.65vw', '-14.65vw', '14.65vw'],
      transition: {ease:'backInOut', repeat:Infinity, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })
    control4.start({
      left: ['85.35vw','85.35vw', '85.35vw', '85.35vw',
        '14.65vw', '14.65vw', '0vw', '0vw',
        '14.65vw', '14.65vw', '14.65vw', '14.65vw',
        '50vw', '50vw','50vw', '50vw', '85.35vw'],
      top: ['85.35vw','85.35vw', '-14.65vw', '-14.65vw',
        '14.65vw', '14.65vw', '50vw', '50vw',
        '85.35vw', '85.35vw', '85.35vw', '85.35vw',
        '100vw', '100vw', '100vw', '100vw', '85.35vw'],
      transition: {ease:'backInOut', repeat:Infinity, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })
    control5.start({
      left: ['50vw','50vw', '14.65vw', '14.65vw',
        '14.65vw', '14.65vw', '85.35vw', '85.35vw',
        '85.35vw', '85.35vw', '100vw', '100vw',
        '85.35vw','85.35vw', '50vw', '50vw', '50vw'],
      top: ['100vw','100vw', '85.35vw', '85.35vw',
        '14.65vw', '14.65vw', '14.65vw', '14.65vw',
        '14.65vw', '14.65vw', '50vw', '50vw',
        '85.35vw', '85.35vw', '100vw', '100vw', '100vw'],
      transition: {ease:'backInOut', repeat:Infinity, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })
    control6.start({
      left: ['85.35vw', '85.35vw', '50vw', '50vw',
        '50vw', '50vw', '14.65vw', '14.65vw',
        '14.65vw', '14.65vw', '85.35vw', '85.35vw',
        '85.35vw', '85.35vw', '100vw', '100vw','85.35vw'],
      top: ['85.35vw', '85.35vw', '100vw', '100vw',
        '100vw', '100vw', '85.35vw','85.35vw',
        '14.65vw', '14.65vw', '14.65vw', '14.65vw',
        '14.65vw', '14.65vw', '50vw','50vw', '85.35vw'],
      transition: {ease:'backInOut', repeat:Infinity, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })
    control7.start({
      left: ['85.35vw', '85.35vw', '100vw', '100vw',
        '85.35vw', '85.35vw', '50vw', '50vw',
        '50vw', '50vw', '14.65vw', '14.65vw',
        '14.65vw', '14.65vw', '85.35vw', '85.35vw', '85.35vw'],
      top: ['14.65vw', '14.65vw', '50vw', '50vw',
        '85.35vw', '85.35vw', '100vw', '100vw',
        '100vw', '100vw', '85.35vw', '85.35vw',
        '14.65vw', '14.65vw', '14.65vw', '14.65vw', '14.65vw'],
      transition: {ease:'backInOut', repeat:Infinity, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })
    control8.start({
      left: ['14.65vw', '14.65vw', '85.35vw', '85.35vw',
        '85.35vw', '85.35vw', '100vw', '100vw',
        '85.35vw', '85.35vw', '50vw', '50vw',
        '50vw', '50vw', '14.65vw', '14.65vw', '14.65vw'],
      top: ['14.65vw', '14.65vw', '14.65vw', '14.65vw',
        '14.65vw', '14.65vw', '50vw', '50vw',
        '85.35vw', '85.35vw', '100vw', '100vw',
        '100vw', '100vw', '85.35vw', '85.35vw', '14.65vw'],
      transition: {ease:'backInOut', repeat:Infinity, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })
    control9.start({
      rotate: [-15, -15, -15, -15,
        -195, -195, -195, -195,
        -375, -375, -375, -375,
        -555, -555, -555, -555, -735],
      transition: {ease:'backInOut', repeat:Infinity, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })
    control10.start({
      rotate: [15, 15, 195, 195,
        195, 195, 375, 375,
        375, 375, 555, 555,
        555, 555, 735, 735, 735],
      transition: {ease:'backInOut', repeat:Infinity, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })
  }

  function ColorSlide(x) {
    setColorCode(x)
    setHeads(headPalette[x])
    setArrows(arrowPalette[x])
    setScrollArrows([scrollArrowPalette[(x+3)%7], scrollArrowPalette[x]])
    setBuyBanner(buyBannerPalette[(x+3)%7])
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div 
        style={{borderColor: darkColorPalette[colorCode]}}
        animate={colorSliderOpen ? {height: '7.875rem'}: {height: 0, opacity:0}}
        className={styles.colorSlider}
        // onClick={() => setColorSliderOpen(true)}
      >
        <motion.div
          animate={{borderColor: darkColorPalette[colorCode],
            backgroundColor: lightColorPalette[colorCode],
            top: colorSliderOpen? `${colorCode*1.125 - 0.125}rem` : '-0.125rem'}} 
          className={styles.colorCatcher} />
        <button 
            style={{backgroundColor: lightColorPalette[0]}}
            className={styles.colorSlide} onClick={()=> ColorSlide(0)}/>
        <button 
            style={{backgroundColor: lightColorPalette[1]}}
            className={styles.colorSlide} onClick={()=> ColorSlide(1)}/>
        <button 
            style={{backgroundColor: lightColorPalette[2]}}
            className={styles.colorSlide} onClick={()=> ColorSlide(2)}/>
        <button 
            style={{backgroundColor: lightColorPalette[3]}}
            className={styles.colorSlide} onClick={()=> ColorSlide(3)}/>
        <button 
            style={{backgroundColor: lightColorPalette[4]}}
            className={styles.colorSlide} onClick={()=> ColorSlide(4)}/>
        <button 
            style={{backgroundColor: lightColorPalette[5]}}
            className={styles.colorSlide} onClick={()=> ColorSlide(5)}/>
        <button 
            style={{backgroundColor: lightColorPalette[6]}}
            className={styles.colorSlide} onClick={()=> ColorSlide(6)}/>
      </motion.div>
      <motion.div
        animate={colorSliderOpen ? {right: '2.7rem'} : {right: '1rem'}}
        style={{borderColor: darkColorPalette[colorCode]}}
        className={styles.genderSlider}>
        <div className={styles.genderBearing} onClick={() => setMale(!male)}>
          <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.00195 28.0015C8.44967 28.0015 8.00195 27.5538 8.00195 27.0015V20.0015L10.002 20.0015V27.0015C10.002 27.5538 9.55424 28.0015 9.00195 28.0015Z" fill={male ? lightColorPalette[colorCode] : darkColorPalette[colorCode]} opacity={male ? 0.5 : 1} />
            <path d="M7.00195 26.0015C6.44967 26.0015 6.00195 25.5538 6.00195 25.0015C6.00195 24.4492 6.44967 24.0015 7.00195 24.0015H11.002C11.5542 24.0015 12.002 24.4492 12.002 25.0015C12.002 25.5538 11.5542 26.0015 11.002 26.0015H7.00195Z" fill={male ? lightColorPalette[colorCode] : darkColorPalette[colorCode]} opacity={male ? 0.5 : 1} />
            <path d="M33.6068 2.39346C33.9973 2.78398 33.9973 3.41714 33.6068 3.80767L28.6571 8.75742L27.2429 7.3432L32.1926 2.39346C32.5831 2.00293 33.2163 2.00293 33.6068 2.39346Z" fill={!male ? lightColorPalette[colorCode] : darkColorPalette[colorCode]} opacity={!male ? 0.5 : 1} />
            <path d="M33.6068 5.22188C33.9973 5.61241 33.9973 6.24557 33.6068 6.6361C33.2163 7.02662 32.5831 7.02662 32.1926 6.6361L29.3642 3.80767C28.9737 3.41715 28.9737 2.78398 29.3642 2.39346C29.7547 2.00293 30.3879 2.00293 30.7784 2.39346L33.6068 5.22188Z" fill={!male ? lightColorPalette[colorCode] : darkColorPalette[colorCode]} opacity={!male ? 0.5 : 1} />
            <rect x="1" y="5" width="30" height="16" rx="8" stroke={darkColorPalette[colorCode]} strokeWidth="0.125rem"/>
          </svg>
        </div>
        <motion.div 
          animate={{left: !male ? '-0.125rem' : '0.75rem'}}
          style={{borderColor: darkColorPalette[colorCode],
            backgroundColor: lightColorPalette[colorCode]}}
          className={styles.genderCatcher}
          onClick={() => setMale(!male)} />
      </motion.div>
      <div className={styles.landing}>
        <div className={styles.wheelHolder}>
          <div className={styles.wheelOne}>
            <motion.div animate={control9} className={styles.arrowHolder}>
              <Image className={styles.arrows} src={arrows} layout='fill' />
            </motion.div>
            {/* <svg viewBox="0 0 544 544" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.circle 
                animate={control9}
                cx="272" cy="272" r="271"
                stroke={lightColorPalette[colorCode]}
                stroke-width="2" stroke-linecap="round" stroke-dasharray="8 28"/>
            </svg> */}
            <div className={styles.colorWheel}>
              <h2 className={styles.title}>
                Watch the <span style={{color: darkColorPalette[colorCode]}}>
                     {colorCode == 1 ? 'yellow' : 
                      colorCode == 2 ? 'amber' :
                      colorCode == 3 ? 'orange' :
                      colorCode == 4 ? 'red' :
                      colorCode == 5 ? 'purple' :
                      colorCode == 6 ? 'grey' : 'teal'}</span> heads spin!
              </h2>
              <motion.div 
                animate={colorSliderOpen? {left: 0} : null}
                className={styles.wheelButtons}>
                <button
                  style={{borderColor: darkColorPalette[colorCode]}}
                  className={styles.wheelButton} onClick={()=> Shuffle()}>
                  <MdIcons.MdShuffle
                    style={{color: darkColorPalette[colorCode]}}/>
                </button>
                {animationRunning ?
                  <button
                    style={{borderColor: darkColorPalette[colorCode]}}
                    className={styles.wheelButton}
                    onClick={()=> AnimationStop()}>
                    <MdIcons.MdPause
                      style={{color: darkColorPalette[colorCode]}}/>
                  </button> :
                  <button
                    style={{borderColor: darkColorPalette[colorCode]}}
                    className={styles.wheelButton}
                    onClick={()=> AnimationStart()}>
                    <MdIcons.MdPlayArrow
                      style={{color: darkColorPalette[colorCode]}}/>
                  </button>
                }
                {colorSliderOpen ? null :
                  <button
                    style={{borderColor: darkColorPalette[colorCode], backgroundColor: lightColorPalette[colorCode]}}
                    className={styles.wheelButton} onClick={()=> setColorSliderOpen(true)}>
                    <MdIcons.MdColorize
                      style={{color: darkColorPalette[colorCode]}}/>
                  </button>
                }
              </motion.div>
              {/* <svg viewBox="0 0 272 272" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M164.729 243.218C168.302 256.554 160.359 270.511 146.594
                  271.587C129.782 272.9 112.797 271.081 96.5213 266.144C72.2304 258.775
                  50.4866 244.756 33.7498 225.671C17.013 206.586 5.95143 183.199 1.81651
                  158.154C-2.31841 133.109 0.638387 107.407 10.3524 83.9551C20.0664 60.5034
                  36.1498 40.2384 56.783 25.4529C77.4162 10.6673 101.776 1.95138 127.105
                  0.291188C152.435 -1.369 177.723 4.09282 200.11 16.0587C215.11 24.0764
                  228.406 34.7998 239.365 47.6164C248.338 58.1103 244.086 73.5964 232.129
                  80.5L181.826 109.543C172.779 114.766 161.24 110.939 152.027 106.015V106.015C146.431
                  103.023 140.109 101.658 133.776 102.073C127.444 102.488 121.354 104.667
                  116.196 108.363C111.037 112.06 107.017 117.126 104.588 122.989C102.16 128.852
                  101.42 135.277 102.454 141.538C103.488 147.8 106.253 153.647 110.437
                  158.418C114.622 163.189 120.058 166.694 126.13 168.536V168.536C136.127 171.568
                  146.992 177.021 149.695 187.112L164.729 243.218Z"
                  fill={lightColorPalette[colorCode]}
                        opacity='50%'/>
              </svg>            */}
            </div>
            <motion.div
              className={styles.headHolder}
              animate={control1}>
              <Image className={styles.head} src={heads[0]} layout='fill' />
              <div
                style={(eyesRarity[0]*mouthesRarity[0]*nosesRarity[0])**(1/3)*100 > 20 ?
                {color: darkColorPalette[colorCode]} : (eyesRarity[0]*mouthesRarity[0]*nosesRarity[0])**(1/3)*100 > 10 ?
                {color: darkColorPalette[colorCode], border: `2px solid ${lightColorPalette[colorCode]}`} :
                {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]}}
                className={styles.rarity}> 
                <p>{((eyesRarity[0]*mouthesRarity[0]*nosesRarity[0])**(1/3)*100).toFixed(1)}</p>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.58625 14.4712C4.29423 14.7633 3.82077 14.7633 3.52875
                        14.4713V14.4713C3.23673 14.1792 3.23673 13.7058 3.52875
                        13.4138L13.4138 3.52875C13.7058 3.23673 14.1792 3.23673 14.4713
                        3.52875V3.52875C14.7633 3.82077 14.7633 4.29423 14.4713
                        4.58625L4.58625 14.4712Z" fill={darkColorPalette[colorCode]} />
                  <circle cx="12.5" cy="12.5" r="2" strokeWidth='1.5' stroke={darkColorPalette[colorCode]} />
                  <circle cx="5.5" cy="5.5" r="2.5"
                    fill={(eyesRarity[0]*mouthesRarity[0]*nosesRarity[0])**(1/3)*100 > 10 ?
                      lightColorPalette[colorCode] : '#fff'} />
                </svg>
              </div>
            </motion.div>
            <motion.div
              className={styles.eyeHolder}
              animate={control1}>
              <Image className={styles.eye} src={eyes[0]} layout='fill' />
            </motion.div>
            <motion.div
              className={styles.mouthHolder}
              animate={control1}>
              <Image className={styles.mouth} src={mouthes[0]} layout='fill' />
            </motion.div>
            <motion.div
              className={styles.noseHolder}
              animate={control1}>
              <Image className={styles.nose} src={noses[0]} layout='fill' />
            </motion.div>
            <motion.div 
              className={styles.headHolder}
              animate={control2}>
              <Image className={styles.head} src={heads[2]} layout='fill' />
              <div
                style={(eyesRarity[2]*mouthesRarity[2]*nosesRarity[2])**(1/3)*100 > 20 ?
                  {color: darkColorPalette[colorCode]} : (eyesRarity[2]*mouthesRarity[2]*nosesRarity[2])**(1/3)*100 > 10 ?
                  {color: darkColorPalette[colorCode], border: `2px solid ${lightColorPalette[colorCode]}`} :
                  {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]}}
                className={styles.rarity}> 
                <p>{((eyesRarity[2]*mouthesRarity[2]*nosesRarity[2])**(1/3)*100).toFixed(1)}</p>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.58625 14.4712C4.29423 14.7633 3.82077 14.7633 3.52875
                        14.4713V14.4713C3.23673 14.1792 3.23673 13.7058 3.52875
                        13.4138L13.4138 3.52875C13.7058 3.23673 14.1792 3.23673 14.4713
                        3.52875V3.52875C14.7633 3.82077 14.7633 4.29423 14.4713
                        4.58625L4.58625 14.4712Z" fill={darkColorPalette[colorCode]} />
                  <circle cx="12.5" cy="12.5" r="2" strokeWidth='1.5' stroke={darkColorPalette[colorCode]} />
                  <circle cx="5.5" cy="5.5" r="2.5"
                    fill={(eyesRarity[2]*mouthesRarity[2]*nosesRarity[2])**(1/3)*100 > 10 ?
                      lightColorPalette[colorCode] : '#fff'} />
                </svg>
              </div>
              </motion.div>
            <motion.div
              className={styles.eyeHolder}
              animate={control2}>
              <Image className={styles.eye} src={eyes[2]} layout='fill' />
            </motion.div>
            <motion.div
              className={styles.mouthHolder}
              animate={control2}>
              <Image className={styles.mouth} src={mouthes[2]} layout='fill' />
            </motion.div>
            <motion.div
              className={styles.noseHolder}
              animate={control2}>
              <Image className={styles.nose} src={noses[2]} layout='fill' />
            </motion.div>
            <motion.div 
              className={styles.headHolder}
              animate={control3}>
              <Image className={styles.head} src={heads[4]} layout='fill' />
              <div
                style={(eyesRarity[4]*mouthesRarity[4]*nosesRarity[4])**(1/3)*100 > 20 ?
                  {color: darkColorPalette[colorCode]} : (eyesRarity[4]*mouthesRarity[4]*nosesRarity[4])**(1/3)*100 > 10 ?
                  {color: darkColorPalette[colorCode], border: `2px solid ${lightColorPalette[colorCode]}`} :
                  {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]}}
                className={styles.rarity}> 
                <p>{((eyesRarity[4]*mouthesRarity[4]*nosesRarity[4])**(1/3)*100).toFixed(1)}</p>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.58625 14.4712C4.29423 14.7633 3.82077 14.7633 3.52875
                        14.4713V14.4713C3.23673 14.1792 3.23673 13.7058 3.52875
                        13.4138L13.4138 3.52875C13.7058 3.23673 14.1792 3.23673 14.4713
                        3.52875V3.52875C14.7633 3.82077 14.7633 4.29423 14.4713
                        4.58625L4.58625 14.4712Z" fill={darkColorPalette[colorCode]} />
                  <circle cx="12.5" cy="12.5" r="2" strokeWidth='1.5' stroke={darkColorPalette[colorCode]} />
                  <circle cx="5.5" cy="5.5" r="2.5"
                    fill={(eyesRarity[4]*mouthesRarity[4]*nosesRarity[4])**(1/3)*100 > 10 ?
                      lightColorPalette[colorCode] : '#fff'} />
                </svg>
              </div>
            </motion.div>
            <motion.div
              className={styles.eyeHolder}
              animate={control3}>
              <Image className={styles.eye} src={eyes[4]} layout='fill' />
            </motion.div>
            <motion.div
              className={styles.mouthHolder}
              animate={control3}>
              <Image className={styles.mouth} src={mouthes[4]} layout='fill' />
            </motion.div>
            <motion.div
              className={styles.noseHolder}
              animate={control3}>
              <Image className={styles.nose} src={noses[4]} layout='fill' />
            </motion.div>
            <motion.div 
              className={styles.headHolder}
              animate={control4}>
              <Image className={styles.head} src={heads[6]} layout='fill' />
              <div
                style={(eyesRarity[6]*mouthesRarity[6]*nosesRarity[6])**(1/3)*100 > 20 ?
                  {color: darkColorPalette[colorCode]} : (eyesRarity[6]*mouthesRarity[6]*nosesRarity[6])**(1/3)*100 > 10 ?
                  {color: darkColorPalette[colorCode], border: `2px solid ${lightColorPalette[colorCode]}`} :
                  {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]}}
                className={styles.rarity}> 
                <p>{((eyesRarity[6]*mouthesRarity[6]*nosesRarity[6])**(1/3)*100).toFixed(1)}</p>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.58625 14.4712C4.29423 14.7633 3.82077 14.7633 3.52875
                        14.4713V14.4713C3.23673 14.1792 3.23673 13.7058 3.52875
                        13.4138L13.4138 3.52875C13.7058 3.23673 14.1792 3.23673 14.4713
                        3.52875V3.52875C14.7633 3.82077 14.7633 4.29423 14.4713
                        4.58625L4.58625 14.4712Z" fill={darkColorPalette[colorCode]} />
                  <circle cx="12.5" cy="12.5" r="2" strokeWidth='1.5' stroke={darkColorPalette[colorCode]} />
                  <circle cx="5.5" cy="5.5" r="2.5"
                    fill={(eyesRarity[6]*mouthesRarity[6]*nosesRarity[6])**(1/3)*100 > 10 ?
                      lightColorPalette[colorCode] : '#fff'} />
                </svg>
              </div>
            </motion.div>
            <motion.div
              className={styles.eyeHolder}
              animate={control4}>
              <Image className={styles.eye} src={eyes[6]} layout='fill' />
            </motion.div>
            <motion.div
              className={styles.mouthHolder}
              animate={control4}>
              <Image className={styles.mouth} src={mouthes[6]} layout='fill' />
            </motion.div>
            <motion.div
              className={styles.noseHolder}
              animate={control4}>
              <Image className={styles.nose} src={noses[6]} layout='fill' />
            </motion.div>
          </div>
          <div className={styles.wheelTwo}>
          <motion.div animate={control10} className={styles.arrowHolder}>
              <Image className={styles.counterArrows} src={arrows} layout='fill' />
            </motion.div>
            {/* <svg 
              viewBox="0 0 544 544" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.circle
                animate={control10} 
                cx="272" cy="272" r="271"
                stroke={lightColorPalette[colorCode]}
                stroke-width="2" stroke-linecap="round" stroke-dasharray="8 28"/>
            </svg> */}
            <div className={styles.colorWheel}>
              <div className={styles.logoHolder}>
                <Image className={styles.logo} src='/logo.png' layout='fill' />
              </div>
              <svg viewBox="0 0 272 272" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M232.129 80.5C244.086 73.5964 259.623 77.6571 264.225 90.6749C269.351
                105.176 272 120.499 272 136C272 159.873 265.716 183.325 253.779 204C241.843 224.675
                224.675 241.843 204 253.779C190.576 261.53 175.981 266.897 160.86 269.709C147.285
                272.233 136 260.807 136 247L136 188.291C136 178.367 144.565 170.685 153.161
                165.723C158.378 162.711 162.711 158.378 165.723 153.161C168.735 147.943 170.321 142.025
                170.321 136C170.321 126.075 172.691 114.817 181.286 109.854L232.129 80.5Z" 
                  fill={lightColorPalette[colorCode]}
                  opacity='50%'/>
              </svg>
            </div>
            <motion.div 
              className={styles.headHolder}
              animate={control5}>
              <Image className={styles.head} src={heads[1]} layout='fill' />
              <div
                style={(eyesRarity[1]*mouthesRarity[1]*nosesRarity[1])**(1/3)*100 > 20 ?
                  {color: darkColorPalette[colorCode]} : (eyesRarity[1]*mouthesRarity[1]*nosesRarity[1])**(1/3)*100 > 10 ?
                  {color: darkColorPalette[colorCode], border: `2px solid ${lightColorPalette[colorCode]}`} :
                  {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]}}
                className={styles.rarity}> 
                <p>{((eyesRarity[1]*mouthesRarity[1]*nosesRarity[1])**(1/3)*100).toFixed(1)}</p>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.58625 14.4712C4.29423 14.7633 3.82077 14.7633 3.52875
                        14.4713V14.4713C3.23673 14.1792 3.23673 13.7058 3.52875
                        13.4138L13.4138 3.52875C13.7058 3.23673 14.1792 3.23673 14.4713
                        3.52875V3.52875C14.7633 3.82077 14.7633 4.29423 14.4713
                        4.58625L4.58625 14.4712Z" fill={darkColorPalette[colorCode]} />
                  <circle cx="12.5" cy="12.5" r="2" strokeWidth='1.5' stroke={darkColorPalette[colorCode]} />
                  <circle cx="5.5" cy="5.5" r="2.5"
                    fill={(eyesRarity[1]*mouthesRarity[1]*nosesRarity[1])**(1/3)*100 > 10 ?
                      lightColorPalette[colorCode] : '#fff'} />
                </svg>
              </div>
            </motion.div>
            <motion.div
              className={styles.eyeHolder}
              animate={control5}>
              <Image className={styles.eye} src={eyes[1]} layout='fill' />
            </motion.div>
            <motion.div
              className={styles.mouthHolder}
              animate={control5}>
              <Image className={styles.mouth} src={mouthes[1]} layout='fill' />
            </motion.div>
            <motion.div
              className={styles.noseHolder}
              animate={control5}>
              <Image className={styles.nose} src={noses[1]} layout='fill' />
            </motion.div>
            <motion.div 
              className={styles.headHolder}
              animate={control6}>
              <Image className={styles.head} src={heads[3]} layout='fill' />
              <div
                style={(eyesRarity[3]*mouthesRarity[3]*nosesRarity[3])**(1/3)*100 > 20 ?
                  {color: darkColorPalette[colorCode]} : (eyesRarity[3]*mouthesRarity[3]*nosesRarity[3])**(1/3)*100 > 10 ?
                  {color: darkColorPalette[colorCode], border: `2px solid ${lightColorPalette[colorCode]}`} :
                  {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]}}
                className={styles.rarity}> 
                <p>{((eyesRarity[3]*mouthesRarity[3]*nosesRarity[3])**(1/3)*100).toFixed(1)}</p>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.58625 14.4712C4.29423 14.7633 3.82077 14.7633 3.52875
                        14.4713V14.4713C3.23673 14.1792 3.23673 13.7058 3.52875
                        13.4138L13.4138 3.52875C13.7058 3.23673 14.1792 3.23673 14.4713
                        3.52875V3.52875C14.7633 3.82077 14.7633 4.29423 14.4713
                        4.58625L4.58625 14.4712Z" fill={darkColorPalette[colorCode]} />
                  <circle cx="12.5" cy="12.5" r="2" strokeWidth='1.5' stroke={darkColorPalette[colorCode]} />
                  <circle cx="5.5" cy="5.5" r="2.5"
                    fill={(eyesRarity[3]*mouthesRarity[3]*nosesRarity[3])**(1/3)*100 > 10 ?
                      lightColorPalette[colorCode] : '#fff'} />
                </svg>
              </div>
            </motion.div>
            <motion.div
              className={styles.eyeHolder}
              animate={control6}>
              <Image className={styles.eye} src={eyes[3]} layout='fill' />
            </motion.div>
            <motion.div
              className={styles.mouthHolder}
              animate={control6}>
              <Image className={styles.mouth} src={mouthes[3]} layout='fill' />
            </motion.div>
            <motion.div
              className={styles.noseHolder}
              animate={control6}>
              <Image className={styles.nose} src={noses[3]} layout='fill' />
            </motion.div>
            <motion.div 
              className={styles.headHolder}
              animate={control7}>
              <Image className={styles.head} src={heads[5]} layout='fill' />
              <div
                style={(eyesRarity[5]*mouthesRarity[5]*nosesRarity[5])**(1/3)*100 > 20 ?
                  {color: darkColorPalette[colorCode]} : (eyesRarity[5]*mouthesRarity[5]*nosesRarity[5])**(1/3)*100 > 10 ?
                  {color: darkColorPalette[colorCode], border: `2px solid ${lightColorPalette[colorCode]}`} :
                  {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]}}
                className={styles.rarity}> 
                <p>{((eyesRarity[5]*mouthesRarity[5]*nosesRarity[5])**(1/3)*100).toFixed(1)}</p>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.58625 14.4712C4.29423 14.7633 3.82077 14.7633 3.52875
                        14.4713V14.4713C3.23673 14.1792 3.23673 13.7058 3.52875
                        13.4138L13.4138 3.52875C13.7058 3.23673 14.1792 3.23673 14.4713
                        3.52875V3.52875C14.7633 3.82077 14.7633 4.29423 14.4713
                        4.58625L4.58625 14.4712Z" fill={darkColorPalette[colorCode]} />
                  <circle cx="12.5" cy="12.5" r="2" strokeWidth='1.5' stroke={darkColorPalette[colorCode]} />
                  <circle cx="5.5" cy="5.5" r="2.5"
                    fill={(eyesRarity[5]*mouthesRarity[5]*nosesRarity[5])**(1/3)*100 > 10 ?
                      lightColorPalette[colorCode] : '#fff'} />
                </svg>
              </div>
            </motion.div>
            <motion.div
              className={styles.eyeHolder}
              animate={control7}>
              <Image className={styles.eye} src={eyes[5]} layout='fill' />
            </motion.div>
            <motion.div
              className={styles.mouthHolder}
              animate={control7}>
              <Image className={styles.mouth} src={mouthes[5]} layout='fill' />
            </motion.div>
            <motion.div
              className={styles.noseHolder}
              animate={control7}>
              <Image className={styles.nose} src={noses[5]} layout='fill' />
            </motion.div>
            <motion.div 
              className={styles.headHolder}
              animate={control8}>
              <Image className={styles.head} src={heads[7]} layout='fill' />
              <div
                style={(eyesRarity[7]*mouthesRarity[7]*nosesRarity[7])**(1/3)*100 > 20 ?
                  {color: darkColorPalette[colorCode]} : (eyesRarity[7]*mouthesRarity[7]*nosesRarity[7])**(1/3)*100 > 10 ?
                  {color: darkColorPalette[colorCode], border: `2px solid ${lightColorPalette[colorCode]}`} :
                  {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]}}
                className={styles.rarity}> 
                <p>{((eyesRarity[7]*mouthesRarity[7]*nosesRarity[7])**(1/3)*100).toFixed(1)}</p>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.58625 14.4712C4.29423 14.7633 3.82077 14.7633 3.52875
                        14.4713V14.4713C3.23673 14.1792 3.23673 13.7058 3.52875
                        13.4138L13.4138 3.52875C13.7058 3.23673 14.1792 3.23673 14.4713
                        3.52875V3.52875C14.7633 3.82077 14.7633 4.29423 14.4713
                        4.58625L4.58625 14.4712Z" fill={darkColorPalette[colorCode]} />
                  <circle cx="12.5" cy="12.5" r="2" strokeWidth='1.5' stroke={darkColorPalette[colorCode]} />
                  <circle cx="5.5" cy="5.5" r="2.5"
                    fill={(eyesRarity[7]*mouthesRarity[7]*nosesRarity[7])**(1/3)*100 > 10 ?
                      lightColorPalette[colorCode] : '#fff'} />
                </svg>
              </div>
            </motion.div>
            <motion.div
              className={styles.eyeHolder}
              animate={control8}>
              <Image className={styles.eye} src={eyes[7]} layout='fill' />
            </motion.div>
            <motion.div
              className={styles.mouthHolder}
              animate={control8}>
              <Image className={styles.mouth} src={mouthes[7]} layout='fill' />
            </motion.div>
            <motion.div
              className={styles.noseHolder}
              animate={control8}>
              <Image className={styles.nose} src={noses[7]} layout='fill' />
            </motion.div>
          </div>
          <div
            style={{bottom: `${(height/width - 17/9)*60 - 25.3}vw`}}
            className={styles.wheelFour}>
              <motion.div animate={control12} className={styles.scrollArrowHolder}>
                <Image className={styles.counterScrollArrows} src={scrollArrows[1]} layout='fill' />
              </motion.div>
              <NavSlider colorCode={colorCode} aspectRatio={height/width} />
              <button
                style={{color: darkColorPalette[colorCode],
                  bottom: `calc(${(height/width - 17/9)*60+ 10}vw + 7rem)`}}
                className={styles.scrollButton}
                onClick={() => router.push({
                  pathname: '/showcase',
                  query: {colorCode: colorCode}
                })}>
                <MdIcons.MdArrowDropUp
                  style={{fontSize: '1rem'}}/>
                  Scroll to see more heads!
              </button>
          </div>
          <div
            style={{bottom: `${(height/width - 17/9)*60}vw`}}
            className={styles.wheelThree}>
              <div className={styles.bannerHolder}>
              <Image className={styles.buyBanner} src={buyBannerPalette[6]} layout='fill' />
            </div>
            <div className={styles.colorWheel}>
              <button
                style={{ borderColor: darkColorPalette[(colorCode+3)%7], backgroundColor: lightColorPalette[(colorCode+3)%7] }}
                className={styles.mainButton}>
                <div className={styles.eyeCatcher}>
                <Image className={styles.eyesOnYou} src='/eyeCatcher.png' layout='fill' />
              </div>
                Collect your head!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
