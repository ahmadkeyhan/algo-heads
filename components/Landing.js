import Head from 'next/head'
import Image from 'next/image'
import narrowStyles from '../styles/landing.module.css'
import wideStyles from '../styles/landingWide.module.css'
import { useState, useEffect, useRef } from 'react'
import * as MdIcons from 'react-icons/md'
import * as SiIcon from 'react-icons/si'
import * as BsIcons from 'react-icons/bs'
import * as RiIcons from 'react-icons/ri'
import { motion, useAnimation } from "framer-motion"
import { useRouter } from 'next/router'
import { lightColorPalette, darkColorPalette } from '../components/colorPalette'
import { arrowPalette, buyBannerPalette } from './Assets'
import Link from 'next/link'
import { myAlgoConnect, settings } from './Connect'
import { CgTrophy } from 'react-icons/cg'

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
  const [selectedSuffle, setSelectedShuffle] = useState(0)
  const [shuffleLive, setShuffleLive] = useState(false)
  const [sholdOut, setSholdOut] = useState(false)
  const [shuffleDays, setShuffleDays] = useState()
  const [shuffleHours, setShuffleHours] = useState()
  const [shuffleMinutes, setShuffleMinutes] = useState()
  const [colorCode, setColorCode] = useState(3)
  const [male, setMale] = useState(false)
  const [maleHeads, setMaleHeads] = useState() 
  const [femaleHeads, setFemaleHeads] = useState()
  const [heads, setHeads] = useState() 
  const [authLevel, setAuthLevel] = useState(0)

  useEffect(() => {
    setShuffleLoading(true)
    console.log('loading')
    fetch('api/shuffles')
      .then((res) => res.json())
      .then((data) => {
        setMaleHeads(data.message[selectedSuffle].maleAssets)
        setFemaleHeads(data.message[selectedSuffle].femaleAssets)
        setHeads(male? maleHeads : femaleHeads)
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

        // setColorCode(shufflesArray[selectedSuffle].colorCode)

        setLoading(false)
        console.log(shufflesArray, maleHeads)
      })    
  }, [])

  useEffect(() => {
    if (shuffles) {
      setShuffleDays(0)
      setShuffleHours(0)
      setShuffleMinutes(0)
      for (var i = 1; i < 99999; i++) {
        clearInterval(i)
      }
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
  
      setMaleHeads(shufflesArray[selectedSuffle].maleAssets)
      setFemaleHeads(shufflesArray[selectedSuffle].femaleAssets)
      setHeads(male? maleHeads : femaleHeads)
  
      // setColorCode(shufflesArray[selectedSuffle].colorCode)
    }
  }, [selectedSuffle])

  useEffect(() => {
    setHeads(male ? maleHeads : femaleHeads)
  }, [male])

  const [auctions, setAuctions] = useState()
  const [auctionsArray, setAuctionsArray] = useState([])
  const [aucsLoading, setAucsLoading] = useState()
  const [shufflesOrAuctions, setShufflesOrAuctions] = useState(false)
  const [auctionIndex, setAuctionIndex] = useState(0)
  const [aucHours, setAucHours] = useState(0)
  const [aucMins, setAucMins] = useState(0)
  const [aucSecs, setAucSecs] = useState(0)

  useEffect(() => {
    setAucsLoading(true)
    fetch('api/auctions')
      .then((res) => res.json())
      .then((data) => {
        data.message.map((auction) => {
          var now = new Date()
          auction.UTCStart = new Date(auction.UTCStart)
          auction.UTCEnd = new Date(auction.UTCEnd)
          auction.lifeCycle = 0
          if (now > auction.UTCStart) {
            auction.lifeCycle = 1
            setAucHours(0)
            setAucMins(0)
            setAucSecs(0)
            for (var i = 1; i < 99999; i++) {
              clearInterval(i)
            }
            setInterval(() => {
              var now = new Date()
              
              if (now >= auctionsArray[0].UTCStart) {
                setAucHours(Math.floor((auctionsArray[0].UTCEnd - now)/3600000))
                setAucMins(Math.floor((auctionsArray[0].UTCEnd - now)%3600000/60000))
                setAucSecs(Math.floor((auctionsArray[0].UTCEnd - now)%60000/1000))
              }
            },1000)
          }
          if (now > auction.UTCEnd) {
            auction.lifeCycle = 2
          }
          fetch(`api/escrowTxns/?wallet=${auction.escrowWallet}`)
            .then((res) => res.json())
            .then((data) => {
              data.message.sort((txna, txnb) => txna["confirmed-round"] - txnb["confirmed-round"])
              console.log(data.message)
              auction.bidHistory = []
              data.message.map((txn, index) => {
                index && auction.bidHistory.push({bid: txn["payment-transaction"].amount, bidder: txn.sender})
              })
              fetch('api/auctions' , {
                method: 'POST',
                body: JSON.stringify(auction)
              }).then((res) => res.json())
            })
          auctionsArray.push(auction)
        })
        setAuctions(data.message)
        setAucsLoading(false)
        console.log(auctionsArray)
      })
  }, [])

  useEffect(() => {
    if (auctions) {
      setAucHours(0)
      setAucMins(0)
      setAucSecs(0)
      for (var i = 1; i < 99999; i++) {
        clearInterval(i)
      }
      setInterval(() => {
        var now = new Date()
        
        if (now >= auctionsArray[0].UTCStart) {
          setAucHours(Math.floor((auctionsArray[0].UTCEnd - now)/3600000))
          setAucMins(Math.floor((auctionsArray[0].UTCEnd - now)%3600000/60000))
          setAucSecs(Math.floor((auctionsArray[0].UTCEnd - now)%60000/1000))
        }
      },1000)
    }
  }, [auctionIndex])


  const [sholders, setSholders]=useState([])
  const [sholderRank, setSholderRank] = useState(-1)
  const [fetchedsholders, setFetchedsholders] = useState()
  const [isLoading, setLoading] = useState()

  useEffect(() => {
    setLoading(true)
    fetch('/api/sholders')
      .then((res) => res.json())
      .then((data) => {
        data.message.sort((a,b) => b.heads.length - a.heads.length)
        setFetchedsholders(data.message)
        data.message.map((sholder) => {
          sholders.push(sholder)
        })
        console.log(sholders)
        setLoading(false)
      })
  },[])

  const [account, setAccount] = useState()
  const [avatar, setAvatar] = useState()

  const [totalEntries, setTotalEntries] = useState(0)
  const [shuffleArray, setShuffleArray] = useState([])

  const connectWallet = async () => {
    try {
      let fetchedAccount = await myAlgoConnect.connect(settings).then(fetchedAccount => {
        setAccount(fetchedAccount)
        setAuthLevel(1)
        sholders.map((sholder, index) => {
          if(sholder.address == fetchedAccount[0].address) {
            setSholderRank(index)
            setAuthLevel(2)
            setAvatar(sholder.heads[sholder.heads.length-1].src)
            if (sholder.heads.length >= 5) {
              setAuthLevel(3)
            } 
            if (sholder.heads.length >= 8) {
              setAuthLevel(4)
            }
            if (sholder.heads.length >= 16) {
              setAuthLevel(5)
            }
            
          }
        })
        fetch('api/shuffleEntry')
        .then((res) => res.json())
        .then((data) => {
          data.message.map((participant) => {
            for (var i = 0; i < participant.points; i++) {
              shuffleArray.push(participant.sholder)
            }
            setTotalEntries(totalEntries + participant.points)
            console.log(shuffleArray)
          })
        })
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

  const [registered, setRegistered] = useState(false)
  const [loadingEntries, setLoadingEntries] = useState(false)

  function registerSholder({sholder, points}) {
    setLoadingEntries(true)
    fetch('api/shuffleEntry' , {
      method: 'POST',
      body: JSON.stringify({sholder: sholder, points: points})
    }).then((res) => res.json())
    .then(() => {
      setRegistered(true)
      setLoadingEntries(false)
    })
  }

  const [winners, setWinners] = useState()

  function getWinners() {
    fetch('api/winners')
    .then((res) => res.json())
    .then((data) => {
      setWinners(data.message)
    })
  }

  if(shuffles && auctions) {
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
            {shufflesOrAuctions ? 
              <>
                <motion.div className={styles.headHolder}
                  animate={control5}>
                  <Image className={styles.head}
                    src={male && shufflesArray[selectedSuffle].maleAssets[1] ? 
                      '/algoHead'+shufflesArray[selectedSuffle].maleAssets[1].assetName.slice(2,5)+'.gif' :
                      !male && shufflesArray[selectedSuffle].femaleAssets[1] && shufflesArray[selectedSuffle].femaleAssets[1].rank ?
                      '/algoHead'+shufflesArray[selectedSuffle].femaleAssets[1].assetName.slice(2,5)+'.gif' :
                      !male && shufflesArray[selectedSuffle].femaleAssets[1] && !shufflesArray[selectedSuffle].femaleAssets[1].rank ?
                      '/algoHead'+shufflesArray[selectedSuffle].femaleAssets[1].assetName.slice(2,5)+'.gif' :
                      activeTheme=== 'light' ? '/HappyPride!.png' : '/darkSphere.png'}
                    layout='fill' />
                </motion.div>
                <motion.div className={styles.headCard}
                  animate={control5}>
                  <p>
                    {male && shufflesArray[selectedSuffle].maleAssets[1] ?
                      shufflesArray[selectedSuffle].maleAssets[1].assetName :
                      !male && shufflesArray[selectedSuffle].femaleAssets[1] ? 
                      shufflesArray[selectedSuffle].femaleAssets[1].assetName : null }
                  </p>
                </motion.div>
                <motion.div className={styles.headHolder}
                  animate={control6}>
                  <Image className={styles.head}
                    src={male && shufflesArray[selectedSuffle].maleAssets[3] ? 
                      '/algoHead'+shufflesArray[selectedSuffle].maleAssets[3].assetName.slice(2,5)+'.gif' :
                      !male && shufflesArray[selectedSuffle].femaleAssets[3] ?
                      '/algoHead'+shufflesArray[selectedSuffle].femaleAssets[3].assetName.slice(2,5)+'.gif' :
                      activeTheme=== 'light' ? '/HappyPride!.png' : '/darkSphere.png'}
                    layout='fill' />
                </motion.div>
                <motion.div className={styles.headCard}
                  animate={control6}>
                  <p>
                    {male && shufflesArray[selectedSuffle].maleAssets[3] ?
                      shufflesArray[selectedSuffle].maleAssets[3].assetName :
                      !male && shufflesArray[selectedSuffle].femaleAssets[3] ? 
                      shufflesArray[selectedSuffle].femaleAssets[3].assetName : null }
                  </p>
                </motion.div>
                <motion.div className={styles.headHolder}
                  animate={control7}>
                  <Image className={styles.head}
                    src={male && shufflesArray[selectedSuffle].maleAssets[5] ? 
                      '/algoHead'+shufflesArray[selectedSuffle].maleAssets[5].assetName.slice(2,5)+'.gif' :
                      !male && shufflesArray[selectedSuffle].femaleAssets[5] ?
                      '/algoHead'+shufflesArray[selectedSuffle].femaleAssets[5].assetName.slice(2,5)+'.gif' :
                      activeTheme=== 'light' ? '/HappyPride!.png' : '/darkSphere.png'}
                    layout='fill' />
                </motion.div>
                <motion.div className={styles.headCard}
                  animate={control7}>
                  <p>
                    {male && shufflesArray[selectedSuffle].maleAssets[5] ?
                      shufflesArray[selectedSuffle].maleAssets[5].assetName :
                      !male && shufflesArray[selectedSuffle].femaleAssets[5] ? 
                      shufflesArray[selectedSuffle].femaleAssets[5].assetName : null }
                  </p>
                </motion.div>
                <motion.div className={styles.headHolder}
                  animate={control8}>
                  <Image className={styles.head}
                    src={male && shufflesArray[selectedSuffle].maleAssets[7] ? 
                      '/algoHead'+shufflesArray[selectedSuffle].maleAssets[7].assetName.slice(2,5)+'.gif' :
                      !male && shufflesArray[selectedSuffle].femaleAssets[7] ?
                      '/algoHead'+shufflesArray[selectedSuffle].femaleAssets[7].assetName.slice(2,5)+'.gif' :
                      activeTheme=== 'light' ? '/HappyPride!.png' : '/darkSphere.png'}
                    layout='fill' />
                </motion.div>
                <motion.div className={styles.headCard}
                  animate={control8}>
                  <p>
                    {male && shufflesArray[selectedSuffle].maleAssets[7] ?
                      shufflesArray[selectedSuffle].maleAssets[7].assetName :
                      !male && shufflesArray[selectedSuffle].femaleAssets[7] ? 
                      shufflesArray[selectedSuffle].femaleAssets[7].assetName : null }
                  </p>
                </motion.div>
              </> : 
              <>
                <motion.div className={styles.headHolder}
                  style={{width:window.visualViewport.height/window.visualViewport.width >= 16/9 ? '32vw' : '18vh',
                    height:window.visualViewport.height/window.visualViewport.width >= 16/9 ? '32vw' : '18vh',
                    top:window.visualViewport.height/window.visualViewport.width >= 16/9 ? '88vw' : '49.5vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? '27vw' : '15.19vh'}}>
                  <Image className={styles.head}
                    src={auctionsArray[auctionIndex].asset}
                    layout='fill' />
                </motion.div>
                <motion.div className={styles.headCard}
                  style={{top:window.visualViewport.height/window.visualViewport.width >= 16/9 ? '92vw' : '51.75vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? '27vw' : '15.19vh',
                    borderBottom: `2px solid ${auctionsArray[auctionIndex].color}`}}>
                  <p>
                    AlgoHead{auctionsArray[auctionIndex].asset.slice(9,12)}
                  </p>
                </motion.div>
                <motion.div className={styles.headHolder}
                  style={{top:window.visualViewport.height/window.visualViewport.width >= 16/9 ? '84vw' : '47.25vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? '60vw' : '33.75vh'}}
                  onClick={() => setAuctionIndex((auctionIndex+1)%5)}>
                  <Image className={styles.head}
                    src={auctionsArray[(auctionIndex+1)%5].asset}
                    layout='fill' />
                </motion.div>
                <motion.div className={styles.headCard}
                  style={{top:window.visualViewport.height/window.visualViewport.width >= 16/9 ? '84vw' : '47.25vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? '60vw' : '33.75vh'}}>
                  <p>
                    AH{auctionsArray[(auctionIndex+1)%5].asset.slice(9,12)}
                  </p>
                  <motion.div className={styles.highBid}>
                  <p>{auctionsArray[(auctionIndex+1)%5].bidHistory.length>0 ? auctionsArray[(auctionIndex+1)%5].bidHistory[auctionsArray[(auctionIndex+1)%5].bidHistory.length-1].bid/1000000 : '50'}</p>
                  <motion.div className={styles.algoLogo}>
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
                        19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
                        19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
                        8.8453L18.0006 19.0109Z" fill={auctionsArray[(auctionIndex+1)%5].color} />
                    </svg>
                  </motion.div>
                </motion.div>
                </motion.div>
                <motion.div className={styles.headHolder}
                  style={{top:window.visualViewport.height/window.visualViewport.width >= 16/9 ? '60vw' : '33.75vh',
                    left:window.visualViewport.height/window.visualViewport.width >= 16/9 ? '84vw' : '47.25vh'}}
                  onClick={() => setAuctionIndex((auctionIndex+2)%5)}>
                  <Image className={styles.head}
                    src={auctionsArray[(auctionIndex+2)%5].asset}
                    layout='fill' />
                </motion.div>
                <motion.div className={styles.headCard}
                  style={{top:window.visualViewport.height/window.visualViewport.width >= 16/9 ? '60vw' : '33.75vh',
                    left:window.visualViewport.height/window.visualViewport.width >= 16/9 ? '84vw' : '47.25vh'}}>
                  <p>
                    AH{auctionsArray[(auctionIndex+2)%5].asset.slice(9,12)}
                  </p>
                  <motion.div className={styles.highBid}>
                  <p>{auctionsArray[(auctionIndex+2)%5].bidHistory.length ? auctionsArray[(auctionIndex+2)%5].bidHistory[auctionsArray[(auctionIndex+2)%5].bidHistory.length-1].bid/1000000 : '50'}</p>
                  <motion.div className={styles.algoLogo}>
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
                        19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
                        19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
                        8.8453L18.0006 19.0109Z" fill={auctionsArray[(auctionIndex+2)%5].color} />
                    </svg>
                  </motion.div>
                </motion.div>
                </motion.div>
              </>
            }
          </div>
          <div className={styles.wheelTwo}>
            <motion.div animate={control9} className={styles.arrowHolder}>
              <Image className={styles.arrows} src={activeTheme === 'light' ? arrowPalette[colorCode] : arrowPalette[7]} layout='fill' />
            </motion.div>
            {shufflesOrAuctions ? 
              <>
                <h2 className={styles.title}
                  style={{color:activeTheme === 'light' ? darkColorPalette[colorCode]: null}}>
                  Watch the  <span style={{marginLeft: male ? '0.5rem' : '0.1rem',color: lightColorPalette[colorCode]}}>{male ? 'male' : 'female '}</span> heads spin!
                </h2>
                <motion.div className={styles.subTitle}>
                  <h2 style={{color: lightColorPalette[colorCode]}}>on Algorand blockchain</h2>
                  <motion.div className={styles.mintPrice}>
                  <p style={{color:activeTheme === 'light' ? darkColorPalette[colorCode]: null}}>
                    Mint price: <span>{shufflesArray[selectedSuffle].price/1000000}</span>
                  </p>
                  <motion.div className={styles.algoLogo}>
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
                        19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
                        19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
                        8.8453L18.0006 19.0109Z" fill={lightColorPalette[colorCode]} />
                    </svg>
                  </motion.div>
                  </motion.div>
                </motion.div>
                <motion.div className={styles.genderSlider}
                  style={{backgroundColor: darkColorPalette[3]}}>
                  <div className={styles.genderBearing}
                    onClick={() => setMale(!male)}>
                    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <motion.rect x="6" y="28" width="6" height="2" rx="1" fill={lightColorPalette[colorCode]}
                        animate={male ? 
                          {rotate: '-135deg', originX:0.5, originY: '17px', x: 14, y:0} :
                          {rotate: 0, x: 0, y:0}}
                          transition={{duration: 0.3, ease:'backInOut'}} />
                      <motion.rect x="8" y="25" width="2" height="7" rx="1" fill={lightColorPalette[colorCode]}
                        animate={male ? 
                          {rotate: '-135deg', originX:0.5, originY: '17px', x: 14, y:0} :
                          {rotate: 0, x: 0, y:0}}
                          transition={{duration: 0.2, ease:'backInOut'}} />
      
                      <motion.circle cx='9' cy="17" r="7" fill={lightColorPalette[colorCode]}
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
                <motion.div className={styles.themeSlider}
                  style={{backgroundColor: darkColorPalette[3]}}>
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
                <motion.div className={styles.headHolder}
                  animate={control1}>
                  <Image className={styles.head}
                    src={male && shufflesArray[selectedSuffle].maleAssets[0] ? 
                      '/algoHead'+shufflesArray[selectedSuffle].maleAssets[0].assetName.slice(2,5)+'.gif' :
                      !male && shufflesArray[selectedSuffle].femaleAssets[0] ?
                      '/algoHead'+shufflesArray[selectedSuffle].femaleAssets[0].assetName.slice(2,5)+'.gif' :
                      activeTheme=== 'light' ? '/HappyPride!.png' : '/darkSphere.png'}
                    layout='fill' />
                </motion.div>
                <motion.div className={styles.headCard}
                  animate={control1}>
                  <p>
                    {male && shufflesArray[selectedSuffle].maleAssets[0] ?
                      shufflesArray[selectedSuffle].maleAssets[0].assetName :
                      !male && shufflesArray[selectedSuffle].femaleAssets[0] ? 
                      shufflesArray[selectedSuffle].femaleAssets[0].assetName : null }
                  </p>
                </motion.div>
                <motion.div className={styles.headHolder}
                  animate={control2}>
                  <Image className={styles.head}
                    src={male && shufflesArray[selectedSuffle].maleAssets[2] && shufflesArray[selectedSuffle].maleAssets[2].rank ? 
                      '/algoHead'+shufflesArray[selectedSuffle].maleAssets[2].assetName.slice(2,5)+'.gif' :
                      male && shufflesArray[selectedSuffle].maleAssets[2] && !shufflesArray[selectedSuffle].maleAssets[2].rank ? 
                      '/algoHead'+shufflesArray[selectedSuffle].maleAssets[2].assetName.slice(2,5)+'.gif' :
                      !male && shufflesArray[selectedSuffle].femaleAssets[2] ?
                      '/algoHead'+shufflesArray[selectedSuffle].femaleAssets[2].assetName.slice(2,5)+'.gif' :
                      activeTheme=== 'light' ? '/HappyPride!.png' : '/darkSphere.png'}
                    layout='fill' />
                </motion.div>
                <motion.div className={styles.headCard}
                  animate={control2}>
                  <p>
                    {male && shufflesArray[selectedSuffle].maleAssets[2] ?
                      shufflesArray[selectedSuffle].maleAssets[2].assetName :
                      !male && shufflesArray[selectedSuffle].femaleAssets[2] ? 
                      shufflesArray[selectedSuffle].femaleAssets[2].assetName : null }
                  </p>
                </motion.div>
                <motion.div className={styles.headHolder}
                  animate={control3}>
                  <Image className={styles.head}
                    src={male && shufflesArray[selectedSuffle].maleAssets[4] ? 
                      '/algoHead'+shufflesArray[selectedSuffle].maleAssets[4].assetName.slice(2,5)+'.gif' :
                      !male && shufflesArray[selectedSuffle].femaleAssets[4] ?
                      '/algoHead'+shufflesArray[selectedSuffle].femaleAssets[4].assetName.slice(2,5)+'.gif' :
                      activeTheme=== 'light' ? '/HappyPride!.png' : '/darkSphere.png'}
                    layout='fill' />
                </motion.div>
                <motion.div className={styles.headCard}
                  animate={control3}>
                  <p>
                    {male && shufflesArray[selectedSuffle].maleAssets[4] ?
                      shufflesArray[selectedSuffle].maleAssets[4].assetName :
                      !male && shufflesArray[selectedSuffle].femaleAssets[4] ? 
                      shufflesArray[selectedSuffle].femaleAssets[4].assetName : null }
                  </p>
                </motion.div>
                <motion.div className={styles.headHolder}
                  animate={control4}>
                  <Image className={styles.head}
                    src={male && shufflesArray[selectedSuffle].maleAssets[6] ? 
                      '/algoHead'+shufflesArray[selectedSuffle].maleAssets[6].assetName.slice(2,5)+'.gif' :
                      !male && shufflesArray[selectedSuffle].femaleAssets[6] ?
                      '/algoHead'+shufflesArray[selectedSuffle].femaleAssets[6].assetName.slice(2,5)+'.gif' :
                      activeTheme=== 'light' ? '/HappyPride!.png' : '/darkSphere.png'}
                    layout='fill' />
                </motion.div>
                <motion.div className={styles.headCard}
                  animate={control4}>
                  <p>
                    {male && shufflesArray[selectedSuffle].maleAssets[6] ?
                      shufflesArray[selectedSuffle].maleAssets[6].assetName :
                      !male && shufflesArray[selectedSuffle].femaleAssets[6] ? 
                      shufflesArray[selectedSuffle].femaleAssets[6].assetName : null }
                  </p>
                </motion.div>
            </> :
            <>
                            <motion.div className={styles.themeSlider}
                  style={{backgroundColor: darkColorPalette[3]}}>
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
              <motion.div className={styles.headHolder}
                style={{top:window.visualViewport.height/window.visualViewport.width >= 16/9 ? '60vw' : '33.75vh',
                 left:window.visualViewport.height/window.visualViewport.width >= 16/9 ? '4vw' : '2.25vh'}}
                onClick={() => setAuctionIndex((auctionIndex+3)%5)}>
                <Image className={styles.head}
                  src={auctionsArray[(auctionIndex+3)%5].asset}
                  layout='fill' />
              </motion.div>
              <motion.div className={styles.headCard}
                style={{top:window.visualViewport.height/window.visualViewport.width >= 16/9 ? '60vw' : '33.75vh',
                 left:window.visualViewport.height/window.visualViewport.width >= 16/9 ? '4vw' : '2.25vh'}}>
                <p>
                  AH{auctionsArray[(auctionIndex+3)%5].asset.slice(9,12)}
                </p>
                <motion.div className={styles.highBid}>
                  <p>{auctionsArray[(auctionIndex+3)%5].bidHistory.length ? auctionsArray[(auctionIndex+3)%5].bidHistory[auctionsArray[(auctionIndex+3)%5].bidHistory.length-1].bid/1000000 : '50'}</p>
                  <motion.div className={styles.algoLogo}>
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
                        19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
                        19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
                        8.8453L18.0006 19.0109Z" fill={auctionsArray[(auctionIndex+3)%5].color} />
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div className={styles.headHolder}
                style={{top:window.visualViewport.height/window.visualViewport.width >= 16/9 ? '84vw' : '47.25vh',
                 left:window.visualViewport.height/window.visualViewport.width >= 16/9 ? '27vw' : '15.19vh'}}
                onClick={() => setAuctionIndex((auctionIndex+4)%5)}>
                <Image className={styles.head}
                  src={auctionsArray[(auctionIndex+4)%5].asset}
                  layout='fill' />
              </motion.div>
              <motion.div className={styles.headCard}
                style={{top:window.visualViewport.height/window.visualViewport.width >= 16/9 ? '84vw' : '47.25vh',
                 left:window.visualViewport.height/window.visualViewport.width >= 16/9 ? '27vw' : '15.19vh'}}>
                <p>
                  AH{auctionsArray[(auctionIndex+4)%5].asset.slice(9,12)}
                </p>
                <motion.div className={styles.highBid}>
                  <p>{auctionsArray[(auctionIndex+4)%5].bidHistory.length ? auctionsArray[(auctionIndex+4)%5].bidHistory[auctionsArray[(auctionIndex+4)%5].bidHistory.length-1].bid/1000000 : '50'}</p>
                  <motion.div className={styles.algoLogo}>
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
                        19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
                        19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
                        8.8453L18.0006 19.0109Z" fill={auctionsArray[(auctionIndex+4)%5].color} />
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.div>
            </>
            }
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
                </motion.div> : authLevel > 1 ?
                <motion.div className={styles.wallet} onClick={() => router.push(`/sholders/${account[0].address}`)}>
                  <motion.button className={styles.avatar}
                    style={{backgroundColor: activeTheme==='light' ? lightColorPalette[6-colorCode]: null,
                    color:activeTheme==='light' ? darkColorPalette[6-colorCode]: lightColorPalette[6-colorCode],
                    fontSize: '1.2rem'}}>
                    <Image src={avatar} layout='fill' />
                  </motion.button> 
                  <p style={{color:activeTheme==='light' ? darkColorPalette[6-colorCode] : null}}>
                    {account[0].name.length > 8 ? account[0].name.slice(0,7)+'...' : account[0].name}
                    {/* {authLevel} */}
                    </p>
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
            {shufflesOrAuctions ?
            <>
              <motion.div className={styles.mainShuffle} 
                style={{backgroundColor: lightColorPalette[colorCode]}}>
                <div className={styles.shuffleType}>
                  {shufflesArray[selectedSuffle].auth == 2 ? <CgTrophy /> :
                  shufflesArray[selectedSuffle].auth == 3 ? 
                    <>
                      <motion.div className={styles.spin}
                        animate={{rotate: [0,-360,-360]}}
                        transition={{ease: 'backInOut' ,duration: 2, repeat: Infinity, times: [0,0.75,1]}} />
                      <CgTrophy />
                    </> :
                    <MdIcons.MdShuffle />}
                </div>
                <div className={styles.countDownCard}>
                  {!shuffleLive && shufflesArray[selectedSuffle].auth <= authLevel ?
                    <>
                      <p>
                        Shuffle starts in
                      </p>
                      <p><span>{shuffleDays}</span> d <span>{shuffleHours}</span> h <span>{shuffleMinutes}</span> m</p>
                    </> :
                  !shuffleLive && shufflesArray[selectedSuffle].auth > authLevel && shufflesArray[selectedSuffle].auth==2 ?
                    <p>
                      Sholders only!
                    </p> :
                  !shuffleLive && shufflesArray[selectedSuffle].auth > authLevel && shufflesArray[selectedSuffle].auth==3 ?
                    <p>
                      Spin sholders only!
                    </p> :
                  !shuffleLive && shufflesArray[selectedSuffle].auth > authLevel ?
                    <p>
                      Connect your wallet first!
                    </p> :
                  shuffleLive && !shufflesArray[selectedSuffle].sholdOut && shufflesArray[selectedSuffle].auth <= authLevel && !registered ?       
                    <div onClick={() => registerSholder({sholder: sholders[sholderRank].address, points: authLevel-1})}>
                      <p>
                        Register at shuffle!
                      </p>
                    </div> :
                  shuffleLive && !shufflesArray[selectedSuffle].sholdOut && shufflesArray[selectedSuffle].auth <= authLevel && loadingEntries ?       
                    <div>
                      <p>
                        Please wait...
                      </p>
                    </div> :
                  shuffleLive && !shufflesArray[selectedSuffle].sholdOut && shufflesArray[selectedSuffle].auth <= authLevel && registered && totalEntries ?       
                    <div>
                      <p>
                        Registered with {((authLevel-1)/totalEntries)*100}% chance!
                      </p>
                    </div> :
                  shuffleLive && !shufflesArray[selectedSuffle].sholdOut && shufflesArray[selectedSuffle].auth > authLevel ?
                    <>
                      <p>
                        Sholders only!
                      </p>
                    </> :
                  <div
                    style={{backgroundColor: lightColorPalette[colorCode]}}
                    className={styles.mainCountDown}>
                      <p>
                        Shold out!
                      </p>
                  </div>}
                </div>
              </motion.div>
              <motion.div className={styles.shuffle2} 
                // onClick={() => setSelectedShuffle((selectedSuffle+1)%shufflesArray.length)}
                onClick={() => getWinners()}
                style={{backgroundColor: lightColorPalette[shufflesArray[(selectedSuffle+1)%shufflesArray.length].colorCode]}}>
                <div className={styles.shuffleType}>
                  <MdIcons.MdInfoOutline />
                </div>
              </motion.div>
              {winners && <motion.ul className={styles.winners} style={{backgroundColor: lightColorPalette[colorCode]}}>
                  {winners.map((winner, index) => {
                    return (
                      <li key={index}>
                        AH10{index+1} goes to {winner.winner[0].slice(0,8)}...
                      </li>
                    )
                  })}
              </motion.ul>}
            </> :
            <>
              <motion.div className={styles.startingBid}
                style={{borderBottom: `2px solid ${auctionsArray[auctionIndex].color}`}}>
                <p>starting bid : {auctionsArray[auctionIndex].startingBid/1000000}</p>
                <motion.div className={styles.algoLogo}>
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
                      19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
                      19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
                      8.8453L18.0006 19.0109Z" fill={auctionsArray[auctionIndex].color} />
                  </svg>
                </motion.div>
              </motion.div>
              <motion.div className={styles.highestBid}>
                <p>highest bid : {auctionsArray[auctionIndex].bidHistory.length ? auctionsArray[auctionIndex].bidHistory[auctionsArray[auctionIndex].bidHistory.length-1].bid/1000000 : '-'}</p>
                <motion.div className={styles.algoLogo}>
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
                      19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
                      19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
                      8.8453L18.0006 19.0109Z" fill={auctionsArray[auctionIndex].color} />
                  </svg>
                </motion.div>
              </motion.div>
              <motion.div className={styles.highestBidder}
                style={{borderBottom: `2px solid ${auctionsArray[auctionIndex].color}`}}>
                <p>bidder : {auctionsArray[auctionIndex].bidHistory.length ? auctionsArray[auctionIndex].bidHistory[auctionsArray[auctionIndex].bidHistory.length-1].bidder.slice(0,9) : ''}...</p>
              </motion.div>
                  {auctionsArray[auctionIndex].lifeCycle < 2 ? 
                    <motion.div className={styles.auctionCountDown}>
                      <MdIcons.MdTimer style={{fontSize : '1rem', color: auctionsArray[auctionIndex].color }} />
                      <p>{aucHours} h</p>
                      <p>{aucMins} m</p>
                      <p>{aucSecs} s</p>
                    </motion.div> : 
                    <motion.div className={styles.auctionCountDown}>
                      <MdIcons.MdTimerOff style={{fontSize : '1rem', color: auctionsArray[auctionIndex].color }} />
                      <p>Auction ended!</p>
                    </motion.div>}
              <Link href={auctionsArray[auctionIndex].link} passHref>
                <motion.a className={styles.mainAuction} 
                  target="_blank"
                  style={{backgroundColor: auctionsArray[auctionIndex].color}}>
                  <div className={styles.auctionType}>
                    <MdIcons.MdGavel />
                  </div>
                  <div className={styles.auctionCard}>
                    <div className={styles.mainCountDown}>
                        <p>
                          Bid on AH{auctionsArray[auctionIndex].asset.slice(9,12)}
                        </p>
                    </div>
                  </div>
                </motion.a>
              </Link>
            </>
            }
            <motion.div className={styles.shuffleBubble1} 
              style={{scale: 0.5}}>
                <Image src={activeTheme==='light' ? '/HappyPride!.png' : '/darkSphere.png'} layout='fill' />
            </motion.div>
            <motion.div className={styles.shuffleBubble2} 
              style={{scale: 1/3}}>
                <Image src={activeTheme==='light' ? '/HappyPride!.png' : '/darkSphere.png'} layout='fill' />
            </motion.div>
          </div>
          <div className={styles.wheelFour}>
          </div>
        </div>
      </div>
      )
  } else {
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
              <Image className={styles.head}
                src={activeTheme=== 'light' ? '/HappyPride!.png' : '/darkSphere.png'}
                layout='fill' />
            </motion.div>
            <motion.div
              animate={control5}
              className={styles.headCard}>
            </motion.div>
            <motion.div 
              className={styles.headHolder}
              animate={control6}>
              <Image className={styles.head}
                src={activeTheme=== 'light' ? '/HappyPride!.png' : '/darkSphere.png'}
                layout='fill' />
            </motion.div>
            <motion.div
              animate={control6}
              className={styles.headCard}>
            </motion.div>
            <motion.div 
              className={styles.headHolder}
              animate={control7}>
              <Image className={styles.head}
                src={activeTheme=== 'light' ? '/HappyPride!.png' : '/darkSphere.png'}
                layout='fill' />
            </motion.div>
            <motion.div
              animate={control7}
              className={styles.headCard}>
            </motion.div>
            <motion.div 
              className={styles.headHolder}
              animate={control8}>
              <Image className={styles.head}
                src={activeTheme=== 'light' ? '/HappyPride!.png' : '/darkSphere.png'}
                layout='fill' />
            </motion.div>
            <motion.div
              animate={control8}
              className={styles.headCard}>
            </motion.div>
          </div>
          <div className={styles.wheelTwo}>
            <motion.div animate={control9} className={styles.arrowHolder}>
              <Image className={styles.arrows} src={activeTheme === 'light' ? arrowPalette[colorCode] : arrowPalette[7]} layout='fill' />
            </motion.div>
            <h2 style={{color:activeTheme === 'light' ? darkColorPalette[6-colorCode]: null}} className={styles.title}>
              Wait till the heads are heavy!
            </h2>
            <motion.div className={styles.subTitle}>
              <h2 style={{color: lightColorPalette[2-colorCode]}}>
                on Algorand blockchain
              </h2>
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
              <Image className={styles.head}
                src={activeTheme=== 'light' ? '/HappyPride!.png' : '/darkSphere.png'}
                layout='fill' />
            </motion.div>
            <motion.div
              animate={control1}
              className={styles.headCard}>
            </motion.div>
            <motion.div 
              className={styles.headHolder}
              animate={control2}>
              <Image className={styles.head}
                src={activeTheme=== 'light' ? '/HappyPride!.png' : '/darkSphere.png'}
                layout='fill' />
            </motion.div>
            <motion.div
              animate={control2}
              className={styles.headCard}>
            </motion.div>
            <motion.div 
              className={styles.headHolder}
              animate={control3}>
              <Image className={styles.head}
                src={activeTheme=== 'light' ? '/HappyPride!.png' : '/darkSphere.png'}
                layout='fill' />
            </motion.div>
            <motion.div
              animate={control3}
              className={styles.headCard}>
            </motion.div>
            <motion.div 
              className={styles.headHolder}
              animate={control4}>
              <Image className={styles.head}
                src={activeTheme=== 'light' ? '/HappyPride!.png' : '/darkSphere.png'}
                layout='fill' />
            </motion.div>
            <motion.div
              animate={control4}
              className={styles.headCard}>
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
                </motion.div> : authLevel >= 2 ?
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
          </div>
          <div className={styles.wheelFour}>
          </div>
        </div>
      </div>
      )
  }
 }
 
 export default Landing