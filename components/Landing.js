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

  const [shuffles, setShuffles] = useState()
  const [shufflesArray, setShufflesArray] = useState([])
  const [shuffleLoading, setShuffleLoading] = useState()
  const [selectedSuffle, setSelectedShuffle] = useState(2)
  const [shuffleLive, setShuffleLive] = useState(false)
  const [sholdOut, setSholdOut] = useState(false)
  const [shuffleDays, setShuffleDays] = useState()
  const [shuffleHours, setShuffleHours] = useState()
  const [shuffleMinutes, setShuffleMinutes] = useState()

  useEffect(() => {
      setShuffleLoading(true)
      console.log('loading')
      fetch('api/shuffles')
        .then((res) => res.json())
        .then((data) => {
          setShuffles(data.message)
          data.message.map((shuffle, index) => {
            shufflesArray.push(shuffle)
            shufflesArray[index].date = new Date(shufflesArray[index].date)
            shufflesArray[index].date = new Date(shufflesArray[index].date.getUTCFullYear(),
            shufflesArray[index].date.getUTCMonth(),
            shufflesArray[index].date.getUTCDate(),
            shufflesArray[index].date.getUTCHours(),
            shufflesArray[index].date.getUTCMinutes(),
            shufflesArray[index].date.getUTCSeconds())
          })
          setShuffleDays(0)
          setShuffleHours(0)
          setShuffleMinutes(0)
        
          setInterval(() => {
            var now = new Date()
            var nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds())
            
            if (nowUTC >= shufflesArray[selectedSuffle].date) {
              setShuffleLive(true)
            } else {
              setShuffleDays(Math.floor((shufflesArray[selectedSuffle].date- nowUTC)/(3600000*24)))
              setShuffleHours(Math.floor((shufflesArray[selectedSuffle].date - nowUTC)%(3600000*24)/3600000))
              setShuffleMinutes(Math.floor((shufflesArray[selectedSuffle].date - nowUTC)%3600000/60000))
            }
          },1000)
          setLoading(false)
          console.log(shufflesArray)
        })
  }, [])

  useEffect(() => {
    setShuffleDays(0)
    setShuffleHours(0)
    setShuffleMinutes(0)
  
    setInterval(() => {
      var now = new Date()
      var nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds())
      
      if (nowUTC >= shufflesArray[selectedSuffle].date) {
        setShuffleLive(true)
      } else {
        setShuffleDays(Math.floor((shufflesArray[selectedSuffle].date- nowUTC)/(3600000*24)))
        setShuffleHours(Math.floor((shufflesArray[selectedSuffle].date - nowUTC)%(3600000*24)/3600000))
        setShuffleMinutes(Math.floor((shufflesArray[selectedSuffle].date - nowUTC)%3600000/60000))
      }
    },1000)
  }, [selectedSuffle])

  const [sholders, setSholders]=useState([
    'RZN4HMWEEFBLFFJDCKXNDTEMXJIBBCGAJE5Y3BLSZTCXGT3PBZFHKQVES4',
    'E6MGXZ52LDGHNU65AMFH6UQSFWANT5GJJ77WFYTHNJUSOD66G3BGTPYJQM',
    'CMO4APSCJFHWI6O42OBDZ4M7OESBYOQIR7FLIP5DYX2CLSYBA4QVRJYAZE',
    'HFI4MIFJEV6X35EJRGLI3XGYH42ZQBNR4ZRBARAUVCSJN6EMKIJWGCTEGA',
    '5DYIZMX7N4SAB44HLVRUGLYBPSN4UMPDZVTX7V73AIRMJQA3LKTENTLFZ4',
    'DS6WZQE5S5SACIUW33DFTFMGI3NBTQZF6KCJUUYZLED66E4NLIT6N7TX7I'])
  const [avatarBook, setAvatarBook]=useState([
    '/algoHead051.png',
    '/algoHead052.png',
    '/algoHead053.png',
    '/algoHead010.png',
    '/algoHead015.png',
    '/algoHead013.png'])
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
      })
  },[])

  const [account, setAccount] = useState()
  const [avatar, setAvatar] = useState()
  const [sholderOrNot, setSholderOrNot] = useState(false)

  const connectWallet = async () => {
    try {
      let fetchedAccount = await myAlgoConnect.connect(settings).then(fetchedAccount => {
        setAccount(fetchedAccount)
        if (sholders.indexOf(fetchedAccount[0].address) !== -1) {
          setSholderOrNot(true)
          setAvatar(avatarBook[sholders.indexOf(fetchedAccount[0].address)])
          console.log(avatar)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

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

  const [colorCode, setColorCode] = useState(2)
  const [male, setMale] = useState(true) 
  const [heads, setHeads] = useState(maleHeads) //has to change

  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const [normalizedwidth, setNormalizedWidth] = useState()
  const [styles, setStyles] = useState(narrowStyles)

   
  useEffect(() => {

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
    
  },[])
  
  useEffect(() => {
    setHeads(male ? maleHeads : femaleHeads)
  }, [male])

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
            Watch the  <span style={{marginLeft: male ? '0.5rem' : '0.1rem',color: lightColorPalette[2-colorCode]}}>{male ? 'male' : 'female '}</span> heads spin!
          </h2>
          <motion.div className={styles.subTitle}>
            <h2 style={{color: lightColorPalette[2-colorCode]}}>on Algorand blockchain</h2>
            <motion.div className={styles.mintPrice}>
            <p style={{color:activeTheme === 'light' ? darkColorPalette[6-colorCode]: null}}>Mint price: 25</p>
            <motion.div className={styles.algoLogo}>
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
                  19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
                  19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
                  8.8453L18.0006 19.0109Z" fill={lightColorPalette[2-colorCode]} />
              </svg>
            </motion.div>
            </motion.div>
          </motion.div>
          <motion.div className={styles.genderSlider}
            style={{backgroundColor: darkColorPalette[3]}}>
            <div className={styles.genderBearing}
              onClick={() => setMale(!male)}>
              <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.rect x="6" y="28" width="6" height="2" rx="1" fill={lightColorPalette[4]}
                  animate={male ? 
                    {rotate: '-135deg', originX:0.5, originY: '17px', x: 14, y:0} :
                    {rotate: 0, x: 0, y:0}}
                    transition={{duration: 0.3, ease:'backInOut'}} />
                <motion.rect x="8" y="25" width="2" height="7" rx="1" fill={lightColorPalette[4]}
                  animate={male ? 
                    {rotate: '-135deg', originX:0.5, originY: '17px', x: 14, y:0} :
                    {rotate: 0, x: 0, y:0}}
                    transition={{duration: 0.2, ease:'backInOut'}} />

                <motion.circle cx='9' cy="17" r="7" fill={lightColorPalette[4]}
                  animate={male ? 
                    {x: 14, y: 0} :
                    {x: 0, y: 0}}
                      transition={{duration: 0.2, ease:'easeIn'}} />
                <motion.circle cx='9' cy="17" r="5" fill={darkColorPalette[3]}
                  animate={male ? 
                    {x: 14, y: 0} :
                    {x: 0, y: 0}}
                      transition={{duration: 0.3, ease:'easeIn'}} />
              </svg>
            </div>
          </motion.div>
          <motion.div
            style={{backgroundColor: darkColorPalette[3]}} 
            className={styles.themeSlider}>
            <motion.div className={styles.themeBearing}
              animate={{marginLeft: activeTheme==='light' ? '-4px' : '10px'}}
              transition={{ease: 'easeInOut', duration: 0.2}}
              onClick={() => setActiveTheme(activeTheme === "light" ? "dark" : "light")}
              aria-label={`Change to ${inactiveTheme} mode`}
              title={`Change to ${inactiveTheme} mode`}>
              <motion.svg width="40" height="26" viewBox="0 0 40 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.circle cx='13' cy="13" r="7" fill="#FCDA50"
                  animate={activeTheme==='light' ? 
                    {fill: "#FCDA50"} : {fill: "#fefefe"}}
                  transition={{ease: 'linear', duration:0.2}} />
                <motion.rect x="0.18457" y="15.3987" fill="#FCDA50" 
                  animate={activeTheme==='light' ? 
                    {rx: 1, width: 4, height: 2,opacity: 1, x: 0, y: 0, rotate: '-15deg', fill: '#fcda50'} :
                    {rx: 2.5, width: 5, height: 5,opacity: 1, x: 7, y: -7, ratate: 0, fill: '#cccccc'}}
                  transition={{ease: 'backInOut', duration:0.3}} />
                <motion.rect x="8.66895" y="0.701782" fill="#FCDA50" 
                  animate={activeTheme==='light' ? 
                    {rx: 1, width: 2, height: 4,opacity: 1, x: 0, y: 0, rotate: '-15deg', fill: '#fcda50'} :
                    {rx: 1.5, width: 3, height: 3,opacity: 1, x: 6, y: 11, rotate: '-90deg', fill: '#cccccc'}}
                  transition={{ease: 'backInOut', duration:0.3}} />
                <motion.rect x="14.3633" y="21.9521" fill="#FCDA50" 
                  animate={activeTheme==='light' ? 
                    {rx: 1, width: 2, height: 4, opacity: 1, x: 0, y: 0, rotate: '-15deg', fill: '#fcda50'} :
                    {rx: 1.5, width: 3, height: 3, opacity: 1, x: -3.5, y: -3, rotate: '-90deg', fill: '#cccccc'}}
                  transition={{ease: 'backInOut', duration:0.3}} />
                <motion.rect x="21.4346" y="9.70465" fill="#FCDA50" 
                  animate={activeTheme==='light' ? 
                    {rx: 1, width: 4, height: 2, opacity: 1, x: 0, y: 0, rotate: '-15deg', fill: '#fcda50'} :
                    {rx: 1.5, width: 3, height: 3, opacity: 1, x: -7, y: 5, ratate: '-15eg', fill: '#cccccc'}}
                  transition={{ease: 'backInOut', duration:0.3}} />
                <motion.rect x="6.13379" y="22.8923" width="2" height="2" rx="1" fill="#FCDA50" 
                  animate={activeTheme==='light' ? 
                    {opacity: 1, x: 0, y: 0, rotate: '-15deg', fill: '#fcda50'} :
                    {opacity: 1, x: 2, y: -8, ratate: '-15deg', fill: '#cccccc'}}
                  transition={{ease: 'backInOut', duration:0.3}} />
                <motion.rect x="2.10742" y="7.86603" width="2" height="2" rx="1" fill="#FCDA50" 
                  animate={activeTheme==='light' ? 
                    {opacity: 1, x: 0, y: 0, rotate: '-15deg', fill: '#fcda50'} :
                    {opacity: 1, x: 10, y: -1, ratate: '-15deg', fill: '#cccccc'}}
                  transition={{ease: 'backInOut', duration:0.3}} />
                <motion.rect x="21.1602" y="18.866" width="2" height="2" rx="1" fill="#FCDA50" 
                  animate={activeTheme==='light' ? 
                    {opacity: 1, x: 0, y: 0, rotate: '-15deg', fill: '#fcda50'} :
                    {opacity: 1, x: -8, y: -7, ratate: '-15deg', fill: '#cccccc'}}
                  transition={{ease: 'backInOut', duration:0.3}} />
                <motion.rect x="17.1338" y="3.83966" width="2" height="2" rx="1" fill="#FCDA50" 
                  animate={activeTheme==='light' ? 
                    {opacity: 1, x: 0, y: 0, rotate: '-15deg', fill: '#fcda50'} :
                    {opacity: 1, x: 0, y: 8, ratate: '-15deg', fill: '#cccccc'}}
                  transition={{ease: 'backInOut', duration:0.3}} />
              </motion.svg>
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
          </motion.div>
        </div>
        <div className={styles.wheelThree}>
          <div className={styles.bannerHolder}>
            <Image className={styles.buyBanner} src={activeTheme === 'dark' ? buyBannerPalette[7] : buyBannerPalette[6]} layout='fill' />
          </div>
          <motion.div className={styles.shuffleButtons}>
          {!shuffleLive ?
            <div
              style={{backgroundColor: lightColorPalette[6 - colorCode]}}
              onClick={() => setSholderShuffleOrNot(false)}
              className={styles.mainCountDown}>
              <p>
                Public shuffle in : <span>{shuffleDays}</span> d <span>{shuffleHours}</span> h <span>{shuffleMinutes}</span> m
              </p>
            </div> :  
          shuffleLive && !sholdOut ?
            <Link href={process.env.NEXT_PUBLIC_SHUFFLE_LINK}>          
              <button
                style={{backgroundColor: lightColorPalette[6 - colorCode]}}
                className={styles.mainButton}>
                Public shuffle!
              </button>
            </Link> :
            <div
              onClick={() => setSholderShuffleOrNot(false)}
              style={{backgroundColor: lightColorPalette[6 - colorCode]}}
              className={styles.mainCountDown}>
              <p>
                Shold out!
              </p>
            </div>
          }
          </motion.div>
        </div>
        <div className={styles.wheelFour}>
        </div>
      </div>
    </div>
    )

  if(shuffles) {
    console.log(shuffles)


  }
 }
 
 export default Landing