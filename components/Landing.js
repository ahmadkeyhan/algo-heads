import Head from 'next/head'
import Image from 'next/image'
import narrowStyles from '../styles/landing.module.css'
import wideStyles from '../styles/landingWide.module.css'
import { useState, useEffect } from 'react'
import * as MdIcons from 'react-icons/md'
import * as SiIcon from 'react-icons/si'
import * as BsIcons from 'react-icons/bs'
import * as CgIcons from 'react-icons/cg'
import { motion, useAnimation } from "framer-motion"
import { useRouter } from 'next/router'
import { lightColorPalette, darkColorPalette } from '../components/colorPalette'
import { arrowPalette, buyBannerPalette } from './Assets'
import Link from 'next/link'
import MyAlgoConnect from '@randlabs/myalgo-connect'
import algosdk from 'algosdk'

function Landing() {

  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme)
  const inactiveTheme = activeTheme === "light" ? "dark" : "light"

  useEffect(() => {
    document.body.dataset.theme = activeTheme
    window.localStorage.setItem("theme", activeTheme)
  }, [activeTheme])

  const [colorCode, setColorCode] = useState(3)

  // true: shuffles, false: auctions
  const [shufflesOrAuctions, setShufflesOrAuctions] = useState(false)

  // read and react to shuffle object(s)
  // const [shuffles, setShuffles] = useState()
  // const [shufflesArray, setShufflesArray] = useState([])
  // const [shufflesLoading, setShufflesLoading] = useState()
  // const [shuffleIndex, setShuffleIndex] = useState(0)
  // const [shuffleHours, setShuffleHours] = useState()
  // const [shuffleMins, setShuffleMins] = useState()
  // const [shuffleSecs, setShuffleSecs] = useState()
  // const [registeryArray, setRegisteryArray] = useState([])
  // useEffect(() => {
  //   setShufflesLoading(true)
  //   console.log('shuffles are loading...')
  //   fetch('api/mongodb/shuffles')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       var now = new Date()
  //       data.message[0].UTC = new Date(data.message[0].UTC)
  //       if (now < data.message[0].UTC) {
  //         console.log(data.message)
  //         data.message[0].lifeCycle = 0
  //         setShuffleHours(0)
  //         setShuffleMins(0)
  //         setShuffleSecs(0)
  //         for (var i = 1; i < 99999; i++) {
  //           clearInterval(i)
  //         }
  //         setInterval(() => {
  //           var now = new Date()  
  //           if (now < data.message[0].UTC) {
  //             setShuffleHours(Math.floor((data.message[0].UTC - now)/3600000))
  //           setShuffleMins(Math.floor((data.message[0].UTC - now)%3600000/60000))
  //           setShuffleSecs(Math.floor((data.message[0].UTC - now)%60000/1000))
  //           }
  //         },1000)
  //       } else {
  //         data.message[0].lifeCycle = 1
  //       }

  //       data.message[0].registery.map((registerant) => {
  //         for (var i=0; i<registerant.points; i++) {
  //           registeryArray.push(registerant.sholder)
  //         }
  //       })
  //       setShuffles(data.message)
  //       shufflesArray.push(data.message[0])
  //       console.log(registeryArray)
  //       setShufflesLoading(false)
  //     })    
  // }, [])

  // read and react to auction object(s)
  const [auctions, setAuctions] = useState()
  const [auctionsArray, setAuctionsArray] = useState([])
  const [aucsLoading, setAucsLoading] = useState()
  const [auctionIndex, setAuctionIndex] = useState(0)
  const [aucHours, setAucHours] = useState(0)
  const [aucMins, setAucMins] = useState(0)
  const [aucSecs, setAucSecs] = useState(0)
  useEffect(() => {
    setAucsLoading(true)
    fetch('api/mongodb/auctions')
      .then((res) => res.json())
      .then((data) => {
        data.message.reverse().map((auction) => {
          var now = new Date()
          auction.UTCStart = new Date(auction.UTCStart)
          auction.UTCEnd = new Date(auction.UTCEnd)
          auction.lifeCycle = 0
          console.log(now-auction.UTCStart)
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
          fetch(`api/algoexplorer/escrowTxns/?wallet=${auction.escrowWallet}`)
            .then((res) => res.json())
            .then((data) => {
              data.message.sort((txna, txnb) => txna["confirmed-round"] - txnb["confirmed-round"])
              // console.log(data.message)
              auction.bidHistory = []
              data.message.map((txn, index) => {
                index && auction.bidHistory.push({bid: txn["payment-transaction"].amount, bidder: txn.sender})
              })
              fetch('api/mongodb/auctions' , {
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
  // reset the auction timer every time auctionIndex changes
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
        
        if (now >= auctionsArray[auctionIndex].UTCStart) {
          setAucHours(Math.floor((auctionsArray[auctionIndex].UTCEnd - now)/3600000))
          setAucMins(Math.floor((auctionsArray[auctionIndex].UTCEnd - now)%3600000/60000))
          setAucSecs(Math.floor((auctionsArray[auctionIndex].UTCEnd - now)%60000/1000))
        }
      },1000)
    }
  }, [auctionIndex])

  // read and react to sholders
  const [sholdersArray, setSholdersArray]=useState([])
  const [sholders, setSholders] = useState()
  const [sholdersLoading, setSholdersLoading] = useState()
  const [sholderIndex, setSholderIndex] = useState()
  useEffect(() => {
    setSholdersLoading(true)
    fetch('/api/mongodb/sholders')
      .then((res) => res.json())
      .then((data) => {
        data.message.sort((a,b) => b.heads.length - a.heads.length)
        setSholders(data.message)
        data.message.map((sholder) => {
          sholdersArray.push(sholder)
        })
        console.log(sholdersArray)
        setSholdersLoading(false)
      })
  },[])

  // handle connection and auth
  const myAlgoConnect = new MyAlgoConnect({ disableLedgerNano: false })
  const settings = {
    shouldSelectOneAccount: true,
    openManager: true
  }

  const [account, setAccount] = useState()
  const [avatar, setAvatar] = useState()
  const [authLevel, setAuthLevel] = useState(0)
  const [registered, setRegistered] = useState(false)

  const connectWallet = async () => {
    try {
      let fetchedAccount = await myAlgoConnect.connect(settings).then((fetchedAccount) => {
        setAccount(fetchedAccount)
        setAuthLevel(1)
        sholdersArray.map((sholder, index) => {
          if(sholder.address == fetchedAccount[0].address) {
            setSholderIndex(index)
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
        shuffles[0].registery.map((registerant) => {
          if (registerant.sholder == fetchedAccount[0].address) {
            setRegistered(true)
          }
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  //handle transaction

  
  const signTxn = async () => {
    const algodClient = new algosdk.Algodv2("", 'https://node.algoexplorerapi.io', '')
    const params = await algodClient.getTransactionParams().do()
  
    const txn1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      suggestedParams: {
        ...params,
      },
      from: account[0].address,
      to: '37XZFQ3R7XOQ5KRPIDOK3BK5O2N5UNFJOV6H3LAZA6R4KFRHQGKXE45DM4',
      amount: 50000000,
      note: new Uint8Array(2)
    })
    const myAlgoConnectTxn = new MyAlgoConnect()
    let signedTxn = await myAlgoConnectTxn.signTransaction(txn.toByte()).then((txn) => {
      algodClient.sendRawTransaction(txn.blob).do()
      // console.log(txn)
    })

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

  // handle style in response to device metrics 
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const [normalizedwidth, setNormalizedWidth] = useState()
  const [styles, setStyles] = useState(narrowStyles)
  useEffect(() => {
    setWidth(window.visualViewport.width)
    setHeight(window.visualViewport.height)
    if (window.visualViewport.height > window.visualViewport.width) {
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

  //handle registery 
  function registerSholder(sholder) {
    shuffles[0].registery.push({sholder: sholder, points: authLevel-1})
    fetch('api/mongodb/shuffles' , {
      method: 'POST',
      body: JSON.stringify(shuffles[0])
    }).then((res) => res.json())
    .then(() => {
      for (var i=0; i< authLevel-1; i++) {
        registeryArray.push(sholder)
      }
      setRegistered(true)
    })
  }

  const [possibleWinners, setPossibleWinners] = useState()
  const [unAuthRoll, setUnAuthRoll] = useState(false)
  function diceRoller() {
    for (var i = 0; i < 5; i++) {
      var winnerIndex = Math.floor(Math.random()*registeryArray.length)
      var winner = registeryArray.splice(winnerIndex,1)
      shuffles[0].assets[i].winner = winner[0]
    }
    fetch('api/mongodb/shuffles', {
      method: 'POST',
      body: JSON.stringify(shuffles[0])
    })
  }

  if(auctions) {
    return (
      <div className={styles.landing}
        style={{height: '100vh',
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
                  style={{width:window.visualViewport.height > window.visualViewport.width ? '32vw' : '18vh',
                    height:window.visualViewport.height > window.visualViewport.width ? '32vw' : '18vh',
                    top:window.visualViewport.height > window.visualViewport.width ? '88vw' : '49.5vh',
                    left: window.visualViewport.height > window.visualViewport.width ? '27vw' : '15.19vh'}}>
                  <Image className={styles.head}
                    src={shufflesArray[0].assets[shuffleIndex].src}
                    layout='fill' />
                </motion.div>
                <motion.div className={styles.headCard}
                  style={{top:window.visualViewport.height > window.visualViewport.width ? '92vw' : '51.75vh',
                    left: window.visualViewport.height > window.visualViewport.width ? '27vw' : '15.19vh',
                    borderBottom: `2px solid ${shufflesArray[0].assets[shuffleIndex].color}`}}>
                  <p>
                    AlgoHead{shufflesArray[0].assets[shuffleIndex].src.slice(9,12)}
                  </p>
                </motion.div>
                <motion.div className={styles.headHolder}
                  style={{top:window.visualViewport.height > window.visualViewport.width ? '84vw' : '47.25vh',
                    left: window.visualViewport.height > window.visualViewport.width ? '60vw' : '33.75vh'}}
                  onClick={() => setShuffleIndex((shuffleIndex+1)%5)}>
                  <Image className={styles.head}
                    src={shufflesArray[0].assets[(shuffleIndex+1)%5].src}
                    layout='fill' />
                </motion.div>
                <motion.div className={styles.headCard}
                  style={{top:window.visualViewport.height > window.visualViewport.width ? '84vw' : '47.25vh',
                    left: window.visualViewport.height > window.visualViewport.width ? '60vw' : '33.75vh'}}>
                  <p>
                    AH{shufflesArray[0].assets[(shuffleIndex+1)%5].src.slice(9,12)}
                  </p>
                </motion.div>
                <motion.div className={styles.headHolder}
                  style={{top:window.visualViewport.height > window.visualViewport.width ? '60vw' : '33.75vh',
                    left:window.visualViewport.height > window.visualViewport.width ? '84vw' : '47.25vh'}}
                  onClick={() => setShuffleIndex((shuffleIndex+2)%5)}>
                  <Image className={styles.head}
                    src={shufflesArray[0].assets[(shuffleIndex+2)%5].src}
                    layout='fill' />
                </motion.div>
                <motion.div className={styles.headCard}
                  style={{top:window.visualViewport.height > window.visualViewport.width ? '60vw' : '33.75vh',
                    left:window.visualViewport.height > window.visualViewport.width ? '84vw' : '47.25vh'}}>
                  <p>
                    AH{shufflesArray[0].assets[(shuffleIndex+2)%5].src.slice(9,12)}
                  </p>
                </motion.div>
              </> : 
              <>
                <motion.div className={styles.headHolder}
                  style={{width:window.visualViewport.height > window.visualViewport.width ? '32vw' : '18vh',
                    height:window.visualViewport.height > window.visualViewport.width ? '32vw' : '18vh',
                    top:window.visualViewport.height > window.visualViewport.width ? '88vw' : '49.5vh',
                    left: window.visualViewport.height > window.visualViewport.width ? '27vw' : '15.19vh'}}>
                  <Image className={styles.head}
                    src={auctionsArray[auctionIndex].asset}
                    layout='fill' />
                </motion.div>
                <motion.div className={styles.headCard}
                  style={{top:window.visualViewport.height > window.visualViewport.width ? '92vw' : '51.75vh',
                    left: window.visualViewport.height > window.visualViewport.width ? '27vw' : '15.19vh',
                    borderBottom: `2px solid ${auctionsArray[auctionIndex].color}`}}>
                  <p>
                    AlgoHead{auctionsArray[auctionIndex].asset.slice(9,12)}
                  </p>
                </motion.div>
                <motion.div className={styles.headHolder}
                  style={{top:window.visualViewport.height > window.visualViewport.width ? '84vw' : '47.25vh',
                    left: window.visualViewport.height > window.visualViewport.width ? '60vw' : '33.75vh'}}
                  onClick={() => setAuctionIndex((auctionIndex+1)%4)}>
                  <Image className={styles.head}
                    src={auctionsArray[(auctionIndex+1)%4].asset}
                    layout='fill' />
                </motion.div>
                <motion.div className={styles.headCard}
                  style={{top:window.visualViewport.height > window.visualViewport.width ? '84vw' : '47.25vh',
                    left: window.visualViewport.height > window.visualViewport.width ? '60vw' : '33.75vh'}}>
                  <p>
                    AH{auctionsArray[(auctionIndex+1)%4].asset.slice(9,12)}
                  </p>
                  <motion.div className={styles.highBid}>
                  <p>{auctionsArray[(auctionIndex+1)%4].bidHistory.length>0 ? auctionsArray[(auctionIndex+1)%4].bidHistory[auctionsArray[(auctionIndex+1)%4].bidHistory.length-1].bid/1000000 : '50'}</p>
                  <motion.div className={styles.algoLogo}>
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
                        19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
                        19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
                        8.8453L18.0006 19.0109Z" fill={auctionsArray[(auctionIndex+1)%4].color} />
                    </svg>
                  </motion.div>
                </motion.div>
                </motion.div>
                <motion.div className={styles.headHolder}
                  style={{top:window.visualViewport.height > window.visualViewport.width ? '60vw' : '33.75vh',
                    left:window.visualViewport.height > window.visualViewport.width ? '84vw' : '47.25vh'}}
                  onClick={() => setAuctionIndex((auctionIndex+2)%4)}>
                  <Image className={styles.head}
                    src={auctionsArray[(auctionIndex+2)%4].asset}
                    layout='fill' />
                </motion.div>
                <motion.div className={styles.headCard}
                  style={{top:window.visualViewport.height > window.visualViewport.width ? '60vw' : '33.75vh',
                    left:window.visualViewport.height > window.visualViewport.width ? '84vw' : '47.25vh'}}>
                  <p>
                    AH{auctionsArray[(auctionIndex+2)%4].asset.slice(9,12)}
                  </p>
                  <motion.div className={styles.highBid}>
                  <p>{auctionsArray[(auctionIndex+2)%4].bidHistory.length ? auctionsArray[(auctionIndex+2)%4].bidHistory[auctionsArray[(auctionIndex+2)%4].bidHistory.length-1].bid/1000000 : '50'}</p>
                  <motion.div className={styles.algoLogo}>
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
                        19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
                        19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
                        8.8453L18.0006 19.0109Z" fill={auctionsArray[(auctionIndex+2)%4].color} />
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
            {shufflesOrAuctions ? 
            <>
              <motion.div className={styles.headHolder}
                style={{top:window.visualViewport.height > window.visualViewport.width ? '60vw' : '33.75vh',
                 left:window.visualViewport.height > window.visualViewport.width ? '4vw' : '2.25vh'}}
                onClick={() => setShuffleIndex((shuffleIndex+3)%5)}>
                <Image className={styles.head}
                  src={shufflesArray[0].assets[(shuffleIndex+3)%5].src}
                  layout='fill' />
              </motion.div>
              <motion.div className={styles.headCard}
                style={{top:window.visualViewport.height > window.visualViewport.width ? '60vw' : '33.75vh',
                 left:window.visualViewport.height > window.visualViewport.width ? '4vw' : '2.25vh'}}>
                <p>
                  AH{shufflesArray[0].assets[(shuffleIndex+3)%5].src.slice(9,12)}
                </p>
              </motion.div>
              <motion.div className={styles.headHolder}
                style={{top:window.visualViewport.height > window.visualViewport.width ? '84vw' : '47.25vh',
                 left:window.visualViewport.height > window.visualViewport.width ? '27vw' : '15.19vh'}}
                onClick={() => setShuffleIndex((shuffleIndex+4)%5)}>
                <Image className={styles.head}
                  src={shufflesArray[0].assets[(shuffleIndex+4)%5].src}
                  layout='fill' />
              </motion.div>
              <motion.div className={styles.headCard}
                style={{top:window.visualViewport.height > window.visualViewport.width ? '84vw' : '47.25vh',
                 left:window.visualViewport.height > window.visualViewport.width ? '27vw' : '15.19vh'}}>
                <p>
                  AH{shufflesArray[0].assets[(shuffleIndex+4)%5].src.slice(9,12)}
                </p>
              </motion.div>
            </> :
            <>
              <motion.div className={styles.headHolder}
                style={{top:window.visualViewport.height > window.visualViewport.width ? '60vw' : '33.75vh',
                 left:window.visualViewport.height > window.visualViewport.width ? '4vw' : '2.25vh'}}
                onClick={() => setAuctionIndex((auctionIndex+3)%4)}>
                <Image className={styles.head}
                  src={auctionsArray[(auctionIndex+3)%4].asset}
                  layout='fill' />
              </motion.div>
              <motion.div className={styles.headCard}
                style={{top:window.visualViewport.height > window.visualViewport.width ? '60vw' : '33.75vh',
                 left:window.visualViewport.height > window.visualViewport.width ? '4vw' : '2.25vh'}}>
                <p>
                  AH{auctionsArray[(auctionIndex+3)%4].asset.slice(9,12)}
                </p>
                <motion.div className={styles.highBid}>
                  <p>{auctionsArray[(auctionIndex+3)%4].bidHistory.length ? auctionsArray[(auctionIndex+3)%4].bidHistory[auctionsArray[(auctionIndex+3)%4].bidHistory.length-1].bid/1000000 : '50'}</p>
                  <motion.div className={styles.algoLogo}>
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
                        19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
                        19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
                        8.8453L18.0006 19.0109Z" fill={auctionsArray[(auctionIndex+3)%4].color} />
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div className={styles.headHolder}
                style={{top:window.visualViewport.height > window.visualViewport.width ? '84vw' : '47.25vh',
                 left:window.visualViewport.height > window.visualViewport.width ? '27vw' : '15.19vh'}}
                onClick={() => setAuctionIndex((auctionIndex+4)%4)}>
                <Image className={styles.head}
                  src={auctionsArray[(auctionIndex+4)%4].asset}
                  layout='fill' />
              </motion.div>
              <motion.div className={styles.headCard}
                style={{top:window.visualViewport.height > window.visualViewport.width ? '84vw' : '47.25vh',
                 left:window.visualViewport.height > window.visualViewport.width ? '27vw' : '15.19vh'}}>
                <p>
                  AH{auctionsArray[(auctionIndex+4)%4].asset.slice(9,12)}
                </p>
                <motion.div className={styles.highBid}>
                  <p>{auctionsArray[(auctionIndex+4)%4].bidHistory.length ? auctionsArray[(auctionIndex+4)%4].bidHistory[auctionsArray[(auctionIndex+4)%4].bidHistory.length-1].bid/1000000 : '50'}</p>
                  <motion.div className={styles.algoLogo}>
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
                        19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
                        19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
                        8.8453L18.0006 19.0109Z" fill={auctionsArray[(auctionIndex+4)%4].color} />
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.div>
            </>
            }
            <motion.div className={styles.social}>
              {!account ? 
                <motion.div className={styles.wallet}>
                  <motion.button onClick={() => sholders && connectWallet()}
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
              <motion.div className={styles.startingBid}
                style={{borderBottom: `2px solid ${shufflesArray[0].assets[shuffleIndex].color}`}}>
                <p>shuffle price : {shufflesArray[0].price/1000000}</p>
                <motion.div className={styles.algoLogo}>
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
                      19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
                      19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
                      8.8453L18.0006 19.0109Z" fill={shufflesArray[0].assets[shuffleIndex].color} />
                  </svg>
                </motion.div>
              </motion.div>
              <motion.div className={styles.winner}>
                <p>winner : {shufflesArray[0].lifeCycle == 1 ? `${shufflesArray[0].assets[shuffleIndex].winner.slice(0,9)}...` : 'not determined'}</p>
              </motion.div>
              {shufflesArray[0].lifeCycle == 0 ? 
                <motion.div className={styles.winners}
                  onClick={() => setPossibleWinners(!possibleWinners)}
                  style={{border: `2px solid ${shufflesArray[0].assets[shuffleIndex].color}`}}
                  animate={possibleWinners ? {height:window.visualViewport.height > window.visualViewport.width ? '28vw' : '15.75vh'} :
                    {height:window.visualViewport.height > window.visualViewport.width ? '8vw' : '4.5vh'}}>
                  <motion.div className={styles.possibleWinners}
                    style={{position: 'fixed',
                      margin: window.visualViewport.height > window.visualViewport.width ? '-7.11vw 0 0 0' : '-4vh 0 0 0'}}>
                    <CgIcons.CgTrophy style={{fontSize : '1rem', color: shufflesArray[0].assets[shuffleIndex].color }} />
                    <p>{possibleWinners ? 'chance' :'Possible winners'}</p>
                  </motion.div>
                  {possibleWinners && shufflesArray[0].registery.map((registerant, index) => {
                    return (
                    <motion.div key={index} className={styles.possibleWinners}>
                      <p>{registerant.sholder.slice(0,9)}...</p>
                      <p>{registerant.points}</p>
                    </motion.div>
                    )
                  })}
                </motion.div> : null
              }
              {shufflesArray[0].lifeCycle == 0 ? 
                <motion.div className={styles.shuffleCountDown}>
                  <MdIcons.MdTimer style={{fontSize : '1rem', color: shufflesArray[0].assets[shuffleIndex].color }} />
                  <p>{shuffleHours} h</p>
                  <p>{shuffleMins} m</p>
                  <p>{shuffleSecs} s</p>
                </motion.div> : 
                <motion.div className={styles.shuffleCountDown}>
                  <MdIcons.MdTimerOff style={{fontSize : '1rem', color: shufflesArray[0].assets[shuffleIndex].color }} />
                  <p>Shuffle ended!</p>
                </motion.div>
              }
              {shufflesArray[0].lifeCycle == 0 && !account ?
                <motion.div className={styles.mainAuction} 
                  style={{backgroundColor: shufflesArray[0].assets[shuffleIndex].color}}>
                  <div className={styles.auctionType}>
                    <MdIcons.MdShuffle />
                  </div>
                  <div className={styles.auctionCard}>
                    <div className={styles.mainCountDown}>
                        <p>
                          connect your wallet first!
                        </p>
                    </div>
                  </div>
                </motion.div> :
              shufflesArray[0].lifeCycle == 0 && !registered && account ?
                <motion.div className={styles.mainAuction} 
                  style={{backgroundColor: shufflesArray[0].assets[shuffleIndex].color}}
                  onClick={() => sholderIndex && registerSholder(sholdersArray[sholderIndex].address)}>
                  <div className={styles.auctionType}>
                    <MdIcons.MdShuffle />
                  </div>
                  <div className={styles.auctionCard}>
                    <div className={styles.mainCountDown}>
                        <p>
                          register with the chance of {authLevel-1} / {authLevel-1 + registeryArray.length}
                        </p>
                    </div>
                  </div>
                </motion.div> :
              shufflesArray[0].lifeCycle == 0 && registered && account ?
                <motion.div className={styles.mainAuction} 
                  style={{backgroundColor: shufflesArray[0].assets[shuffleIndex].color}}>
                  <div className={styles.auctionType}>
                    <MdIcons.MdShuffle />
                  </div>
                  <div className={styles.auctionCard}>
                    <div className={styles.mainCountDown}>
                        <p>
                          your chance of winning is {authLevel-1}/{registeryArray.length}
                        </p>
                    </div>
                  </div>
                </motion.div> : null
              }
              <motion.div className={styles.dice}
                onClick={() => {
                if (account) {
                  if (account[0].address == 'E6CH4SDDEROE4BGBWQUM66Y3XR7FDLSL32PILSYMGVVIWJLF6XHU5XW6YA') {
                    diceRoller()
                  } else {
                    setUnAuthRoll(!unAuthRoll)
                  }
                } else {
                    setUnAuthRoll(!unAuthRoll)
                  }
                }}
                style={{backgroundColor: shufflesArray[0].assets[(shuffleIndex+1)%5].color}}>
                        <BsIcons.BsDice3Fill />
              </motion.div>
              <motion.div className={styles.rollRule}
              animate={{opacity: unAuthRoll ? 1 : 0}}>
                <p>Only the codeHead can roll the dice!</p>
              </motion.div>
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
                </motion.div>
              }
              {auctionsArray[auctionIndex].lifeCycle == 1 ?
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
                </Link> : null
              } 
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
                  <motion.button onClick={() => sholders && connectWallet()}
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