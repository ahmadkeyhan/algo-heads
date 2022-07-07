import Head from 'next/head'
import Image from 'next/image'
import narrowStyles from '../styles/landing.module.css'
import wideStyles from '../styles/landingWide.module.css'
import { useState, useEffect } from 'react'
import * as MdIcons from 'react-icons/md'
import * as SiIcon from 'react-icons/si'
import * as BsIcons from 'react-icons/bs'
import { motion, useAnimation } from "framer-motion"
import NavSlider from './NavSlider'
import { useRouter } from 'next/router'
import { maleHeads } from './MaleHeads'
import { femaleHeads } from './FemaleHeads'
import {proudHeads } from './ProudHeads'
import { lightColorPalette, darkColorPalette } from '../components/colorPalette'
import { arrowPalette, buyBannerPalette, linkArrowPalette, scrollArrowPalette } from './Assets'
import Link from 'next/link'
import { myAlgoConnect, settings } from './Connect'

function Landing() {

  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme)
  const inactiveTheme = activeTheme === "light" ? "dark" : "light"

  useEffect(() => {
    document.body.dataset.theme = activeTheme
    window.localStorage.setItem("theme", activeTheme)
  }, [activeTheme])

  const [sholders, setSholders]=useState(['HFI4MIFJEV6X35EJRGLI3XGYH42ZQBNR4ZRBARAUVCSJN6EMKIJWGCTEGA','5DYIZMX7N4SAB44HLVRUGLYBPSN4UMPDZVTX7V73AIRMJQA3LKTENTLFZ4','DS6WZQE5S5SACIUW33DFTFMGI3NBTQZF6KCJUUYZLED66E4NLIT6N7TX7I'])
  const [avatarBook, setAvatarBook]=useState(['/algoHead010.png','/algoHead015.png','/algoHead013.png'])
  const [fetchedsholders, setFetchedsholders] = useState()
  const [isLoading, setLoading] = useState()

  useEffect(() => {
    setLoading(true)
    fetch('/api/sholders')
      .then((res) => res.json())
      .then((data) => {
        setFetchedsholders(data.message)
        data.message.map((sholder) => {
          if (sholders.indexOf(sholder.address) == -1) {
            sholders.push(sholder.address)
            avatarBook.push(sholder.heads[0].src)
          }
        })
        setLoading(false)
        console.log(sholders,avatarBook)
      })
  },[])

  
  

  const [account, setAccount] = useState()
  const [avatar, setAvatar] = useState()
  const [sholderOrNot, setSholderOrNot] = useState(false)

  const connectWallet = async () => {
    try {
      let fetchedAccount = await myAlgoConnect.connect(settings).then(fetchedAccount => {
        setAccount(fetchedAccount)
        // let sholderOrNot = true
        if (sholders.indexOf(fetchedAccount[0].address) !== -1) {
          setSholderOrNot(true)
          setSholderShuffleOrNot(true)
          setAvatar(avatarBook[sholders.indexOf(fetchedAccount[0].address)])
          console.log(avatar)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   headlist.map((head) => {
  //     if (head.sholder.address === account[0].address) {
  //       head.sholder.name = account[0].name
  //       console.log('found head')
  //       // setAvatar(head.src)
  //       fetch('api/headlist' , {
  //         method: 'POST',
  //         body: JSON.stringify(head)
  //       }).then((res) => {
  //         res.json()
  //       })
  //     }
  //   })
  // }, [account])


  var shuffleDate = new Date('Fri Jul 8 2022 19:30:00')
  var sholderShuffleDate = new Date('Thu Jul 7 2022 19:30:00')

  const router = useRouter()

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

  const [soldOut, setSoldOut] = useState(true)
  const [sholdOut, setSholdOut] = useState(true)

  const [sholderShuffleOrNot, setSholderShuffleOrNot] = useState(false)

  const [shuffleDays, setShuffleDays] = useState()
  const [shuffleHours, setShuffleHours] = useState()
  const [shuffleMinutes, setShuffleMinutes] = useState()

  const [sholderShuffleDays, setSholderShuffleDays] = useState()
  const [sholderShuffleHours, setSholderShuffleHours] = useState()
  const [sholderShuffleMinutes, setSholderShuffleMinutes] = useState()


  const [colorCode, setColorCode] = useState(2)
  
  const [colorSliderOpen, setColorSliderOpen] = useState(false)
  const [tout, setTout] = useState(null)

  const [arrows, setArrows] = useState(arrowPalette[0])
  const [buyBanner, setBuyBanner] = useState(buyBannerPalette[6])
  const [linkArrows, setLinkArrows] = useState(linkArrowPalette[6])
  const [scrollArrows, setScrollArrows] = useState(scrollArrowPalette[0])

  const [male, setMale] = useState(true)
  const [heads, setHeads] = useState(maleHeads)

  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const [normalizedwidth, setNormalizedWidth] = useState()
  const [styles, setStyles] = useState(narrowStyles)
   
  useEffect(() => {

    setShuffleDays(0)
    setShuffleHours(0)
    setShuffleMinutes(0)

    setSholderShuffleDays(0)
    setSholderShuffleHours(0)
    setSholderShuffleMinutes(0)

    setInterval(() => {
      var now = new Date()
      var nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds())
      if (nowUTC >= shuffleDate) {
        setSoldOut(false)
      } else {
        setShuffleDays(Math.floor((shuffleDate- nowUTC)/(3600000*24)))
        setShuffleHours(Math.floor((shuffleDate - nowUTC)%(3600000*24)/3600000))
        setShuffleMinutes(Math.floor((shuffleDate - nowUTC)%3600000/60000))
      }
      if (nowUTC >= sholderShuffleDate) {
        setSholdOut(false)
      } else {
        setSholderShuffleDays(Math.floor((sholderShuffleDate- nowUTC)/(3600000*24)))
        setSholderShuffleHours(Math.floor((sholderShuffleDate - nowUTC)%(3600000*24)/3600000))
        setSholderShuffleMinutes(Math.floor((sholderShuffleDate - nowUTC)%3600000/60000))
      }
    },1000)

    setWidth(window.visualViewport.width)
    setHeight(window.visualViewport.height)

    if (window.visualViewport.height/window.visualViewport.width >= 16/9) {
      setNormalizedWidth(100)
      control1.start({
        left: ['27vw', '27vw', '27vw', '27vw',
              '60vw', '60vw', '60vw', '60vw',
              '27vw', '27vw', '4vw', '4vw',
              '4vw', '4vw', '4vw','4vw', '27vw'],
        top: ['84vw','84vw', '84vw','84vw',
              '84vw', '84vw', '3vw','3vw',
              '3vw', '3vw', '27vw','27vw',
              '60vw', '60vw', '60vw','60vw', '84vw'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375, 0.5,
            0.5625, 0.625,0.6875, 0.75,
            0.8125, 0.875,0.9375, 1]}
      })
      control2.start({
        left: ['4vw','4vw', '4vw', '4vw',
          '27vw','27vw', '27vw', '27vw',
          '60vw', '60vw', '60vw', '60vw',
          '27vw','27vw', '4vw', '4vw', '4vw'],
        top: ['60vw', '60vw','60vw', '60vw',
          '84vw', '84vw', '84vw', '84vw',
          '84vw', '84vw', '3vw', '3vw',
          '3vw', '3vw', '27vw', '27vw', '60vw'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
      control3.start({
        left: ['27vw','27vw', '4vw', '4vw',
        '4vw','4vw', '4vw', '4vw',
        '27vw','27vw', '27vw', '27vw',
        '60vw', '60vw', '60vw', '60vw', '27vw'],
        top: ['3vw','3vw', '27vw','27vw',
        '60vw', '60vw','60vw', '60vw',
        '84vw', '84vw', '84vw', '84vw',
        '84vw', '84vw', '3vw', '3vw', '3vw'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
      control4.start({
        left: ['60vw','60vw', '60vw', '60vw',
        '27vw','27vw', '4vw', '4vw',
        '4vw','4vw', '4vw', '4vw',
        '27vw','27vw', '27vw', '27vw', '60vw'],
        top: ['84vw','84vw', '3vw', '3vw',
        '3vw','3vw', '27vw','27vw',
        '60vw', '60vw','60vw', '60vw',
        '84vw', '84vw', '84vw', '84vw', '84vw'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
      control5.start({
        left: ['27vw','27vw', '4vw', '4vw',
          '4vw', '4vw', '84vw', '84vw',
          '84vw', '84vw', '84vw', '84vw',
          '60vw','60vw', '27vw', '27vw', '27vw'],
        top: ['84vw','84vw', '27vw', '27vw',
          '27vw', '27vw', '27vw', '27vw',
          '27vw', '27vw', '60vw', '60vw',
          '84vw', '84vw', '84vw', '84vw', '84vw'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
      control6.start({
        left: ['60vw','60vw', '27vw', '27vw',
        '27vw','27vw', '4vw', '4vw',
        '4vw', '4vw', '84vw', '84vw',
        '84vw', '84vw', '84vw', '84vw','60vw'],
        top: ['84vw', '84vw', '84vw', '84vw',
        '84vw','84vw', '27vw', '27vw',
        '27vw', '27vw', '27vw', '27vw',
        '27vw', '27vw', '60vw', '60vw', '84vw'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
      control7.start({
        left: ['84vw', '84vw', '84vw', '84vw',
        '60vw','60vw', '27vw', '27vw',
        '27vw','27vw', '4vw', '4vw',
        '4vw', '4vw', '84vw', '84vw', '84vw'],
        top: ['27vw', '27vw', '60vw', '60vw',
        '84vw', '84vw', '84vw', '84vw',
        '84vw','84vw', '27vw', '27vw',
        '27vw', '27vw', '27vw', '27vw', '27vw'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
      control8.start({
        left: ['4vw', '4vw', '84vw', '84vw',
        '84vw', '84vw', '84vw', '84vw',
        '60vw','60vw', '27vw', '27vw',
        '27vw','27vw', '4vw', '4vw', '4vw'],
        top: ['27vw', '27vw', '27vw', '27vw',
        '27vw', '27vw', '60vw', '60vw',
        '84vw', '84vw', '84vw', '84vw',
        '84vw','84vw', '27vw', '27vw', '27vw'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
    } else {
      setNormalizedWidth((window.visualViewport.height*900)/(16*window.visualViewport.width))
      setStyles(wideStyles)
      control1.start({
        left: ['15.19vh', '15.19vh', '15.19vh', '15.19vh',
              '33.75vh', '33.75vh', '33.75vh', '33.75vh',
              '15.19vh', '15.19vh', '2.25vh', '2.25vh',
              '2.25vh', '2.25vh', '2.25vh','2.25vh', '15.19vh'],
        top: ['47.25vh','47.25vh', '47.25vh','47.25vh',
              '47.25vh', '47.25vh', '1.69vh','1.69vh',
              '1.69vh', '1.69vh', '15.19vh','15.19vh',
              '33.75vh', '33.75vh', '33.75vh','33.75vh', '47.25vh'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375, 0.5,
            0.5625, 0.625,0.6875, 0.75,
            0.8125, 0.875,0.9375, 1]}
      })
      control2.start({
        left: ['2.25vh','2.25vh', '2.25vh', '2.25vh',
          '15.19vh','15.19vh', '15.19vh', '15.19vh',
          '33.75vh', '33.75vh', '33.75vh', '33.75vh',
          '15.19vh','15.19vh', '2.25vh', '2.25vh', '2.25vh'],
        top: ['33.75vh', '33.75vh','33.75vh', '33.75vh',
          '47.25vh', '47.25vh', '47.25vh', '47.25vh',
          '47.25vh', '47.25vh', '1.69vh', '1.69vh',
          '1.69vh', '1.69vh', '15.19vh', '15.19vh', '33.75vh'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
      control3.start({
        left: ['15.19vh','15.19vh', '2.25vh', '2.25vh',
        '2.25vh','2.25vh', '2.25vh', '2.25vh',
        '15.19vh','15.19vh', '15.19vh', '15.19vh',
        '33.75vh', '33.75vh', '33.75vh', '33.75vh', '15.19vh'],
        top: ['1.69vh','1.69vh', '15.19vh','15.19vh',
        '33.75vh', '33.75vh','33.75vh', '33.75vh',
        '47.25vh', '47.25vh', '47.25vh', '47.25vh',
        '47.25vh', '47.25vh', '1.69vh', '1.69vh', '1.69vh'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
      control4.start({
        left: ['33.75vh','33.75vh', '33.75vh', '33.75vh',
        '15.19vh','15.19vh', '2.25vh', '2.25vh',
        '2.25vh','2.25vh', '2.25vh', '2.25vh',
        '15.19vh','15.19vh', '15.19vh', '15.19vh', '33.75vh'],
        top: ['47.25vh','47.25vh', '1.69vh', '1.69vh',
        '1.69vh','1.69vh', '15.19vh','15.19vh',
        '33.75vh', '33.75vh','33.75vh', '33.75vh',
        '47.25vh', '47.25vh', '47.25vh', '47.25vh', '47.25vh'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
      control5.start({
        left: ['15.19vh','15.19vh', '2.25vh', '2.25vh',
          '2.25vh', '2.25vh', '47.25vh', '47.25vh',
          '47.25vh', '47.25vh', '47.25vh', '47.25vh',
          '33.75vh','33.75vh', '15.19vh', '15.19vh', '15.19vh'],
        top: ['47.25vh','47.25vh', '15.19vh', '15.19vh',
          '15.19vh', '15.19vh', '15.19vh', '15.19vh',
          '15.19vh', '15.19vh', '33.75vh', '33.75vh',
          '47.25vh', '47.25vh', '47.25vh', '47.25vh', '47.25vh'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
      control6.start({
        left: ['33.75vh','33.75vh', '15.19vh', '15.19vh',
        '15.19vh','15.19vh', '2.25vh', '2.25vh',
        '2.25vh', '2.25vh', '47.25vh', '47.25vh',
        '47.25vh', '47.25vh', '47.25vh', '47.25vh','33.75vh'],
        top: ['47.25vh', '47.25vh', '47.25vh', '47.25vh',
        '47.25vh','47.25vh', '15.19vh', '15.19vh',
        '15.19vh', '15.19vh', '15.19vh', '15.19vh',
        '15.19vh', '15.19vh', '33.75vh', '33.75vh', '47.25vh'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
      control7.start({
        left: ['47.25vh', '47.25vh', '47.25vh', '47.25vh',
        '33.75vh','33.75vh', '15.19vh', '15.19vh',
        '15.19vh','15.19vh', '2.25vh', '2.25vh',
        '2.25vh', '2.25vh', '47.25vh', '47.25vh', '47.25vh'],
        top: ['15.19vh', '15.19vh', '33.75vh', '33.75vh',
        '47.25vh', '47.25vh', '47.25vh', '47.25vh',
        '47.25vh','47.25vh', '15.19vh', '15.19vh',
        '15.19vh', '15.19vh', '15.19vh', '15.19vh', '15.19vh'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
      control8.start({
        left: ['2.25vh', '2.25vh', '47.25vh', '47.25vh',
        '47.25vh', '47.25vh', '47.25vh', '47.25vh',
        '33.75vh','33.75vh', '15.19vh', '15.19vh',
        '15.19vh','15.19vh', '2.25vh', '2.25vh', '2.25vh'],
        top: ['15.19vh', '15.19vh', '15.19vh', '15.19vh',
        '15.19vh', '15.19vh', '33.75vh', '33.75vh',
        '47.25vh', '47.25vh', '47.25vh', '47.25vh',
        '47.25vh','47.25vh', '15.19vh', '15.19vh', '15.19vh'],
        transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
          times: [0, 0.0625, 0.125, 0.1875,
            0.25,0.3125, 0.375,0.4375,
            0.5,0.5625, 0.625,0.6875,
            0.75,0.8125, 0.875,0.9375, 1]}
      })
    }
    
    control9.start({
      rotate: [-5, -5, -5, -5,
        -185, -185, -185, -185,
        -365, -365, -365, -365,
        -545, -545, -545, -545, -725],
      transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })
    control10.start({
      rotate: [95, 95, 275, 275,
        275, 275, 455, 455,
        455, 455, 635, 635,
        635, 635, 815, 815, 815],
      transition: {ease: 'backInOut',repeat:Infinity, delay: 1, duration: 16,
        times: [0, 0.0625, 0.125, 0.1875,
          0.25,0.3125, 0.375,0.4375,
          0.5,0.5625, 0.625,0.6875,
          0.75,0.8125, 0.875,0.9375, 1]}
    })  
    
    if (colorSliderOpen) {
      setTout(setTimeout(() => setColorSliderOpen(false),5000))
    } 
  },[])
    
  useEffect(() => {
    clearTimeout(tout)
    setTout(setTimeout(() => setColorSliderOpen(false),5000))
  },[colorCode])
  
  useEffect(() => {
    setHeads(male ? maleHeads : femaleHeads)
  }, [male])

  useEffect(() => {
    setHeads(sholderShuffleOrNot ? proudHeads : maleHeads)
  }, [sholderShuffleOrNot])
  
  function ColorSlide(x) {
    setColorCode(x)
    setArrows(arrowPalette[x])
    setLinkArrows(linkArrowPalette[6 - x])
    setScrollArrows(scrollArrowPalette[x])
    setBuyBanner(buyBannerPalette[6 - x])
  }

  return (
    <div className={styles.landing}
      style={{height: `${normalizedwidth*16/9}vw`,
      width: `${normalizedwidth}vw`}}>
      <div className={styles.wheelHolder}>
      <div className={styles.wheelOne}>
          <motion.div animate={control10} className={styles.arrowHolder}>
            <Image className={styles.counterArrows} src={activeTheme === 'light' ? arrowPalette[colorCode] : arrowPalette[7]} layout='fill' />
          </motion.div>
          <div className={styles.logoHolder}>
            <Image className={styles.logo} src={activeTheme==='light'? '/logo.png' : '/darkLogo.png'} layout='fill' />
          </div>
          <motion.div 
            className={styles.headHolder}
            animate={control5}>
            <Image className={styles.head} src={heads[1]} layout='fill' />
          </motion.div>
          <motion.div
            style={{color:activeTheme === 'light' ? darkColorPalette[colorCode]: lightColorPalette[colorCode]}}
            animate={control5}
            className={styles.headCard}>
            <p>{heads[1][1] === 'a' ? heads[1].slice(1,12) : null}</p>
          </motion.div>
          <motion.div 
            className={styles.headHolder}
            animate={control6}>
            <Image className={styles.head} src={heads[3]} layout='fill' />
          </motion.div>
          <motion.div
            style={{color:activeTheme === 'light' ? darkColorPalette[colorCode]: lightColorPalette[colorCode]}}
            animate={control6}
            className={styles.headCard}>
            <p>{heads[3][1] === 'a' ? heads[3].slice(1,12) : null}</p>
          </motion.div>
          <motion.div 
            className={styles.headHolder}
            animate={control7}>
            <Image className={styles.head} src={heads[5]} layout='fill' />
          </motion.div>
          <motion.div
            style={{color:activeTheme === 'light' ? darkColorPalette[colorCode]: lightColorPalette[colorCode]}}
            animate={control7}
            className={styles.headCard}>
            <p>{heads[5][1] === 'a' ? heads[5].slice(1,12) : null}</p>
          </motion.div>
          <motion.div 
            className={styles.headHolder}
            animate={control8}>
            <Image className={styles.head} src={heads[7]} layout='fill' />
          </motion.div>
          <motion.div
            style={{color:activeTheme === 'light' ? darkColorPalette[colorCode]: lightColorPalette[colorCode]}}
            animate={control8}
            className={styles.headCard}>
            <p>{heads[7][1] === 'a' ? heads[7].slice(1,12) : null}</p>
          </motion.div>
        </div>
        <div className={styles.wheelTwo}>
          <motion.div animate={control9} className={styles.arrowHolder}>
            <Image className={styles.arrows} src={activeTheme === 'light' ? arrowPalette[colorCode] : arrowPalette[7]} layout='fill' />
          </motion.div>
          <h2 style={{color:activeTheme === 'light' ? darkColorPalette[6-colorCode]: null}} className={styles.title}>
            Watch the  <span style={{marginLeft: male ? '0.5rem' : '0.1rem',color: sholderShuffleOrNot ? lightColorPalette[2-colorCode] : lightColorPalette[6-colorCode]}}>{sholderShuffleOrNot ? 'fresh' : male ? 'male' : 'female '}</span> heads spin!
          </h2>
          <motion.div className={styles.subTitle}>
            <h2 style={{color: activeTheme==='light' ? darkColorPalette[6-colorCode]: lightColorPalette[2-colorCode]}}>on Algorand blockchain</h2>
            <motion.div className={styles.mintPrice}>
            <p style={{color:activeTheme === 'light' ? darkColorPalette[6-colorCode]: null}}>Mint price: 25</p>
            <motion.div className={styles.algoLogo}>
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
                  19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
                  19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
                  8.8453L18.0006 19.0109Z" fill={sholderShuffleOrNot ? lightColorPalette[2-colorCode] : lightColorPalette[6-colorCode]} />
              </svg>
            </motion.div>
            </motion.div>
          </motion.div>
          {!sholderShuffleOrNot ? 
                <motion.div className={styles.genderSlider}>
                  <div className={styles.genderBearing} onClick={() => setMale(!male)}>
                    <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.00195 28.0015C8.44967 28.0015 8.00195 27.5538 8.00195 27.0015V20.0015L10.002 20.0015V27.0015C10.002 27.5538 9.55424 28.0015 9.00195 28.0015Z" fill={activeTheme==='light' ? darkColorPalette[6-colorCode] : '#dfdfdf'} opacity={male ? 0.3 : 1} />
                      <path d="M7.00195 26.0015C6.44967 26.0015 6.00195 25.5538 6.00195 25.0015C6.00195 24.4492 6.44967 24.0015 7.00195 24.0015H11.002C11.5542 24.0015 12.002 24.4492 12.002 25.0015C12.002 25.5538 11.5542 26.0015 11.002 26.0015H7.00195Z" fill={activeTheme==='light' ? darkColorPalette[6-colorCode] : '#dfdfdf'} opacity={male ? 0.3 : 1} />
                      <path d="M33.6068 2.39346C33.9973 2.78398 33.9973 3.41714 33.6068 3.80767L28.6571 8.75742L27.2429 7.3432L32.1926 2.39346C32.5831 2.00293 33.2163 2.00293 33.6068 2.39346Z" fill={activeTheme==='light' ? darkColorPalette[6-colorCode] : '#fdfdfd'} opacity={!male ? 0.3 : 1} />
                      <path d="M33.6068 5.22188C33.9973 5.61241 33.9973 6.24557 33.6068 6.6361C33.2163 7.02662 32.5831 7.02662 32.1926 6.6361L29.3642 3.80767C28.9737 3.41715 28.9737 2.78398 29.3642 2.39346C29.7547 2.00293 30.3879 2.00293 30.7784 2.39346L33.6068 5.22188Z" fill={activeTheme==='light' ? darkColorPalette[6-colorCode] : '#fdfdfd'} opacity={!male ? 0.3 : 1} />
                      <rect x="1" y="5" width="30" height="16" rx="8" stroke={activeTheme === 'light' ? darkColorPalette[6-colorCode] : '#dfdfdf'} fill={activeTheme === 'light' ? darkColorPalette[6-colorCode] : '#dfdfdf'} strokeWidth="0.125rem" />
                    </svg>
                  </div>
                  <motion.div 
                  animate={{left: !male ? '-0.125rem' : '0.75rem'}}
                  style={{borderColor:activeTheme === 'light' ? darkColorPalette[6-colorCode] : null,
                    backgroundColor: lightColorPalette[6-colorCode]}}
                  className={styles.genderCatcher}
                  onClick={() => setMale(!male)} />
                </motion.div> : 
                null
        }
          {/* <motion.div className={styles.colorSlider}
            style={{borderColor: darkColorPalette[colorCode]}}
            animate={colorSliderOpen ? {height: '7.875rem'}: {height: 0, opacity:0}}>
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
            animate={colorSliderOpen? {left: '26vw'} : null}
            className={styles.wheelButtons}>
            <button
              style={activeTheme==='light' ? {backgroundColor: lightColorPalette[colorCode]} : {border: `2px solid ${darkColorPalette[colorCode]}`}}
              className={styles.wheelButton} onClick={()=> setColorSliderOpen(true)}>
              <MdIcons.MdColorize
                style={{color: activeTheme==='light' ? darkColorPalette[colorCode]: lightColorPalette[colorCode]}}/>
            </button>
          </motion.div> */}
          <motion.div className={styles.themeSlider}>
            <div className={styles.themeBearing}
              onClick={() => setActiveTheme(activeTheme === "light" ? "dark" : "light")}
              aria-label={`Change to ${inactiveTheme} mode`}
              title={`Change to ${inactiveTheme} mode`}>
              <svg width="36" height="26" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4.00098" y="3.99939" width="32" height="18" rx="9" fill={darkColorPalette[3]} />
                <rect y="11.9999" width="4" height="2" rx="1" fill={darkColorPalette[3]} opacity={activeTheme==='light' ? 1 : 0} />
                <rect x="12" width="2" height="4" rx="1" fill={darkColorPalette[3]} opacity={activeTheme==='light' ? 1 : 0} />
                <rect x="12" y="22" width="2" height="4" rx="1" fill={darkColorPalette[3]} opacity={activeTheme==='light' ? 1 : 0} />
                <rect x="22" y="11.9999" width="4" height="2" rx="1" fill={lightColorPalette[colorCode]} opacity={activeTheme==='light' ? 1 : 0} />
                <rect x="4.93164" y="19.0702" width="2" height="2" rx="1" fill={darkColorPalette[3]} opacity={activeTheme==='light' ? 1 : 0} />
                <rect x="4.93262" y="4.93005" width="2" height="2" rx="1" fill={darkColorPalette[3]} opacity={activeTheme==='light' ? 1 : 0} />
                <rect x="19.0713" y="19.0705" width="2" height="2" rx="1" fill={lightColorPalette[colorCode]} opacity={activeTheme==='light' ? 1 : 0} />
                <rect x="19.0713" y="4.92889" width="2" height="2" rx="1" fill={lightColorPalette[colorCode]} opacity={activeTheme==='light' ? 1 : 0} />
              </svg>
            </div>
            <motion.div className={styles.themeCatcher}
              style={{borderColor: darkColorPalette[3],backgroundColor: lightColorPalette[colorCode]}}
              animate={activeTheme === "light" ? {left:'0.125rem'} : {left: '1rem'}}
              onClick={() => setActiveTheme(activeTheme === "light" ? "dark" : "light")}>
              <motion.div 
                animate={activeTheme === "light" ? {left:'-1.13rem', top: '-1.13rem'} : null}
                style={{backgroundColor: darkColorPalette[3]}}
                className={styles.shadowCatcher} />
            </motion.div>
          </motion.div>
          <motion.div
            className={styles.headHolder}
            animate={control1}>
            <Image className={styles.head} src={heads[0]} layout='fill' />
          </motion.div>
          <motion.div
            style={{color:activeTheme === 'light' ? darkColorPalette[colorCode]: lightColorPalette[colorCode]}}
            animate={control1}
            className={styles.headCard}>
            <p>{heads[0][1] === 'a' ? heads[0].slice(1,12) : null}</p>
          </motion.div>
          <motion.div 
            className={styles.headHolder}
            animate={control2}>
            <Image className={styles.head} src={heads[2]} layout='fill' />
          </motion.div>
          <motion.div
            style={{color:activeTheme === 'light' ? darkColorPalette[colorCode]: lightColorPalette[colorCode]}}
            animate={control2}
            className={styles.headCard}>
            <p>{heads[2][1] === 'a' ? heads[2].slice(1,12) : null}</p>
          </motion.div>
          <motion.div 
            className={styles.headHolder}
            animate={control3}>
            <Image className={styles.head} src={heads[4]} layout='fill' />
          </motion.div>
          <motion.div
            style={{color:activeTheme === 'light' ? darkColorPalette[colorCode]: lightColorPalette[colorCode]}}
            animate={control3}
            className={styles.headCard}>
            <p>{heads[4][1] === 'a' ? heads[4].slice(1,12) : null}</p>
          </motion.div>
          <motion.div 
            className={styles.headHolder}
            animate={control4}>
            <Image className={styles.head} src={heads[6]} layout='fill' />
          </motion.div>
          <motion.div
            style={{color:activeTheme === 'light' ? darkColorPalette[colorCode]: lightColorPalette[colorCode]}}
            animate={control4}
            className={styles.headCard}>
            <p>{heads[6][1] === 'a' ? heads[6].slice(1,12) : null}</p>
          </motion.div>
          <motion.div className={styles.social}>
            <Link href='https://discord.gg/NECZgDreUq'>
              <motion.button style={activeTheme==='light' ? {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]} : {color: lightColorPalette[colorCode], border: `2px solid ${darkColorPalette[colorCode]}`}} className={styles.socialButton}>
                <SiIcon.SiDiscord />
              </motion.button>
            </Link>
            <Link href='https://twitter.com/algoheads'>
              <motion.button style={activeTheme==='light' ? {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]} : {color: lightColorPalette[colorCode], border: `2px solid ${darkColorPalette[colorCode]}`}} className={styles.socialButton}>
                <SiIcon.SiTwitter />
              </motion.button>
            </Link>
            {!account ? 
              <motion.div className={styles.wallet}>
                <motion.button onClick={() => fetchedsholders && connectWallet()}
                  style={{backgroundColor: activeTheme==='light' ? lightColorPalette[6-colorCode]: null,
                  color:activeTheme==='light' ? darkColorPalette[6-colorCode]: lightColorPalette[6-colorCode],
                  fontSize: '1.2rem',
                  border: activeTheme==='light' ? null:`2px solid ${darkColorPalette[6-colorCode]}`}}
                  className={styles.walletButton}>
                  <MdIcons.MdAccountBalanceWallet />
                </motion.button>
                <p style={{color: activeTheme==='light' ? darkColorPalette[6-colorCode] : lightColorPalette[6-colorCode]}}>Connect</p>
              </motion.div> : sholderOrNot ?
              <motion.div className={styles.wallet} onClick={() => router.push(`/sholders/${account[0].address}`)}>
                <motion.button className={styles.avatar}
                  style={{backgroundColor: activeTheme==='light' ? lightColorPalette[6-colorCode]: null,
                  color:activeTheme==='light' ? darkColorPalette[6-colorCode]: lightColorPalette[6-colorCode],
                  fontSize: '1.2rem'}}>
                  <Image src={avatar} layout='fill' />
                </motion.button> 
                <p style={{color:activeTheme==='light' ? darkColorPalette[6-colorCode] : null}}>{account[0].name.length > 8 ? account[0].name.slice(0,7)+'...' : account[0].name}</p>
              </motion.div> :
              <motion.div className={styles.wallet} onClick={() => router.push('https://www.nftexplorer.app/sellers/algo-heads')}>
                <motion.button className={styles.walletButton}
                  style={{backgroundColor: activeTheme==='light' ? lightColorPalette[6-colorCode]: null,
                  color:activeTheme==='light' ? darkColorPalette[6-colorCode]: lightColorPalette[6-colorCode],
                  fontSize: '1.2rem',
                  border: activeTheme==='light' ? null:`2px solid ${darkColorPalette[6-colorCode]}`}}>
                  <BsIcons.BsFillEmojiDizzyFill />
                </motion.button> 
                <p style={{color:activeTheme==='light' ? darkColorPalette[6-colorCode] : lightColorPalette[6-colorCode]}}>Become a sholder!</p>
              </motion.div>
            }
          </motion.div>
        </div>
        <div className={styles.wheelThree}>
          <div className={styles.bannerHolder}>
            <Image className={styles.buyBanner} src={activeTheme === 'dark' ? buyBannerPalette[7] : buyBannerPalette[6]} layout='fill' />
          </div>
          <motion.div className={styles.shuffleButtons}>
          {sholdOut && sholderOrNot ?
            <div
              style={{backgroundColor: lightColorPalette[2-colorCode]}}
              onClick={() => setSholderShuffleOrNot(true)}
              className={sholderShuffleOrNot ? styles.mainCountDown : styles.secondaryCountDown}>
              <p>Sholder shuffle in <span>{sholderShuffleDays}</span> d <span>{sholderShuffleHours}</span> h <span>{sholderShuffleMinutes}</span> m</p>
            </div> : !sholdOut && sholderOrNot ?
            <Link href={process.env.NEXT_PUBLIC_SHOLDER_SHUFFLE_LINK}>          
              <button
                style={{backgroundColor: lightColorPalette[2-colorCode]}}
                className={sholderShuffleOrNot ? styles.mainButton : styles.secondaryButton}>
                <p>Enter shuffle!</p>
              </button>
            </Link> : null
          }
          {soldOut ?
            <div
              style={{backgroundColor: lightColorPalette[6 - colorCode]}}
              onClick={() => setSholderShuffleOrNot(false)}
              className={sholderShuffleOrNot && sholderOrNot ?  styles.secondaryCountDown : styles.mainCountDown}>
              <p>
                Public shuffle in : <span>{shuffleDays}</span> d <span>{shuffleHours}</span> h <span>{shuffleMinutes}</span> m
              </p>
            </div> :  
            <Link href={process.env.NEXT_PUBLIC_SHUFFLE_LINK}>          
              <button
                style={{backgroundColor: lightColorPalette[6 - colorCode]}}
                className={sholderShuffleOrNot ? styles.secondaryButton : styles.mainButton}>
                Enter shuffle!
              </button>
            </Link>
          }
          </motion.div>
        </div>
        <div className={styles.wheelFour}>
            {/* <motion.div
              className={styles.scrollArrowHolder}>
              <Image className={styles.counterScrollArrows} src={activeTheme === 'light' ? scrollArrowPalette[colorCode] : scrollArrowPalette[7]} layout='fill' />
            </motion.div>
            <button
              style={{color: darkColorPalette[colorCode]}}
              className={styles.scrollButton}
              onClick={() => router.push('/headlist')}>
              <MdIcons.MdFace
                style={{fontSize: '1rem', color: lightColorPalette[colorCode]}}/>
                <p>Tap to see minted heads!</p>
            </button> */}
        </div>
      </div>
    </div>
    )
 }
 
 export default Landing