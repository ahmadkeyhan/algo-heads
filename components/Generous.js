import Image from 'next/image'
import narrowStyles from '../styles/generous.module.css'
import wideStyles from '../styles/generousWide.module.css'
import { useState, useEffect } from 'react'
import { motion, useAnimation } from "framer-motion"
import { useRouter } from 'next/router'
import Link from 'next/link'
import * as BsIcons from 'react-icons/bs'
import * as MdIcons from 'react-icons/md'
import * as HiIcons from 'react-icons/hi'
import * as FaIcons from 'react-icons/fa'
import * as CgIcons from 'react-icons/cg'
import * as BiIcons from 'react-icons/bi'
import { lightColorPalette, darkColorPalette } from '../components/colorPalette'
import { arrowPalette, linkArrowPalette, scrollArrowPalette } from './Assets'
import MyAlgoConnect from '@randlabs/myalgo-connect'
import { connect } from 'react-redux'

function Generous() {

    // handle style in response to device metrics 
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    const [normalizedwidth, setNormalizedWidth] = useState()
    const [styles, setStyles] = useState(narrowStyles)
    useEffect(() => {
      setWidth(window.visualViewport.width)
      setHeight(window.visualViewport.height)
      if (window.visualViewport.height/window.visualViewport.width >= 16/9) {
        setNormalizedWidth(100)
      } else {
        setNormalizedWidth((window.visualViewport.height*900)/(16*window.visualViewport.width))
        setStyles(wideStyles)
      }
    }, [])

    const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme)
    const inactiveTheme = activeTheme === "light" ? "dark" : "light"
    useEffect(() => {
      document.body.dataset.theme = activeTheme
      window.localStorage.setItem("theme", activeTheme)
    }, [activeTheme])

    //fetch frens from api
    const [frenArray, setFrenArray]= useState([])
    const [frensArray, setFrensArray]= useState([])
    const[frenIndex, setFrenIndex] = useState(-1)
    const[frensIndex, setFrensIndex] = useState(-1)
    const [frens, setFrens] = useState()
    const [frensLoading, setFrensLoading] = useState()
    useEffect(() => {
      setFrensLoading(true)
      fetch('/api/nftxHolder?collectionId=mostly-frens')
        .then((res) => res.json())
        .then((data) => {
          data.message.sort((a,b) => b.asaIds.length - a.asaIds.length)
          setFrens(data.message)
          data.message.map((fren) => {
            fren.asaIds.length < 3 && setFrenArray(oldArray => [...oldArray, fren])
            fren.asaIds.length >= 3 && setFrensArray(oldArray => [...oldArray, fren])
            fren.address === 'E6CH4SDDEROE4BGBWQUM66Y3XR7FDLSL32PILSYMGVVIWJLF6XHU5XW6YA' && console.log('here I am!')
          })
          setFrensLoading(false)
        })
    },[])

    //fetch sholders from api
    const [sholderArray, setSholderArray]= useState([])
    const[sholderIndex, setSholderIndex] = useState(-1)
    const [sholders, setSholders] = useState()
    const [sholdersLoading, setSholdersLoading] = useState()
    useEffect(() => {
      setSholdersLoading(true)
      fetch('/api/nftxHolder?collectionId=algo-heads')
        .then((res) => res.json())
        .then((data) => {
          data.message.sort((a,b) => b.asaIds.length - a.asaIds.length)
          setSholders(data.message)
          data.message.map((sholder) => {
            setSholderArray(oldArray => [...oldArray, sholder])
          })
          console.log(sholderArray)
          setSholdersLoading(false)
        })
    },[])

    // handle connection
    const [address, setAddress] = useState()
    const [name, setName] = useState()
    const [sholderLvl, setSholderLvl] = useState(0)
    const [frenLvl, setFrenLvl] = useState(0)
    const myAlgoConnect = new MyAlgoConnect({ disableLedgerNano: false })
    const settings = {
      shouldSelectOneAccount: true,
      openManager: true
    }
    const connectWallet = async () => {
      try {
        let fetchedAccount = await myAlgoConnect.connect(settings).then((fetchedAccount) => {
          setAddress(fetchedAccount[0].address)
          setName(fetchedAccount[0].name)
          frenArray.map((fren, index) => {
            if (fren.address === fetchedAccount[0].address)  {
              setFrenIndex(index)
              setFrenLvl(fren.asaIds.length)
            }
          })
          frensArray.map((fren, index) => {
            if (fren.address === fetchedAccount[0].address) {
              setFrensIndex(index)
              setFrenLvl(fren.asaIds.length)
            }
          })
          sholderArray.map((sholder, index) => {
            if (sholder.address === fetchedAccount[0].address)  {
              setSholderIndex(index)
              setSholderLvl(sholder.asaIds.length)
            }
          })
          giveAwaysArray.map((giveAway, index) => {
            if (giveAway.registerants.indexOf(fetchedAccount[0].address) > -1) {
              if (index === 0) {
                setFrenRegistered(true)
              } else if (index === 1) {
                setFrensRegistered(true)
              } else {
                setSholderRegistered(true)
              }
            }
          }) 
        })
      } catch (error) {
        console.log(error)
      }
    }

    //handle registery
    const [frenRegistered, setFrenRegistered]= useState(false)
    const [frenRegisterants, setFrenRegisterants]= useState([])
    function frenRegister(address) {
      giveAwaysArray[0].registerants.push(address)
      fetch('api/giveAways' , {
        method: 'POST',
        body: JSON.stringify(giveAwaysArray[0])
      }).then((res) => res.json())
      .then(() => {
        setFrenRegistered(true)
        setFrenRegisterants(giveAwaysArray[0].registerants)
        console.log('registered')
      })
    }

    const [frensRegistered, setFrensRegistered]= useState(false)
    const [frensRegisterants, setFrensRegisterants]= useState([])
    function frensRegister(address) {
      giveAwaysArray[1].registerants.push(address)
      fetch('api/giveAways' , {
        method: 'POST',
        body: JSON.stringify(giveAwaysArray[1])
      }).then((res) => res.json())
      .then(() => {
        setFrensRegistered(true)
        setFrensRegisterants(giveAwaysArray[1].registerants)
        console.log('registered')
      })
    }

    const [sholderRegistered, setSholderRegistered]= useState(false)
    const [sholderRegisterants, setSholderRegisterants]= useState([])
    function sholderRegister(address) {
      giveAwaysArray[2].registerants.push(address)
      fetch('api/giveAways' , {
        method: 'POST',
        body: JSON.stringify(giveAwaysArray[2])
      }).then((res) => res.json())
      .then(() => {
        setSholderRegistered(true)
        setSholderRegisterants(giveAwaysArray[2].registerants)
        console.log('registered')
      })
    }

    // getting and filtering the giveAways
    const [giveAways, setGiveAways] = useState()
    const [giveAwaysArray, setGiveAwaysArray] = useState([])
    const [pendingGiveAwaysArray, setPendingGiveAwaysArray] = useState([])
    const [loadingGiveAways, setLoadingGiveAways] = useState()
    const [gaHours, setGaHours] = useState([])
    const [gaMins, setGaMins] = useState([])
    const [gaSecs, setGaSecs] = useState([])
    useEffect(() => {
      setLoadingGiveAways(true)
      fetch('api/giveAways')
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          var now = new Date()
          data.message.map((giveAway,index) => {
            giveAway.rollingTime =new Date(giveAway.rollingTime)
            index===0 && setFrenRegisterants(giveAway.registerants)
            index===1 && setFrensRegisterants(giveAway.registerants)
            index===2 && setSholderRegisterants(giveAway.registerants)
            if (now < giveAway.rollingTime) {
              setInterval(() => {
                var now = new Date()
                
                if (now < giveAway.rollingTime) {

                  setGaHours(oldArray => [...oldArray,Math.floor((giveAway.rollingTime - now)/3600000)])
                  setGaMins(oldArray => [...oldArray,Math.floor((giveAway.rollingTime - now)%3600000/60000)])
                  
                }
              },1000)
            }
            if (giveAway.verified) giveAwaysArray.push(giveAway)
            else pendingGiveAwaysArray.push(giveAway)
          })
          setGiveAways(data.message)
        })
      setLoadingGiveAways(false)
    },[])

    function GiveAwayHolder({top, left, index}) {
      if (index === 0) {
        return (
          <motion.div className={styles.giveAwayCard}
              style={{backgroundColor: lightColorPalette[giveAwaysArray[index].colorCode],
                color: darkColorPalette[giveAwaysArray[index].colorCode],
              top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                `${top}vw` : `${top*9/16}vh`,
              left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                `${left}vw` : `${left*9/16}vh`}}>
            <motion.div className={styles.ticketHolder}>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '-2vw' : '-1.13vh',
                    left:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '17vw' : '9.56vh',
                    width:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '4vw' : '2.25vh',
                    height:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '4vw' : '2.25vh',
                    borderRadius:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '3vw' : '1.69vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '18.5vw' : '10.4vh',
                    width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    height: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    borderRadius: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '6.6vw' : '3.71vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '18.5vw' : '10.4vh',
                    width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    height: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    borderRadius: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '10.2vw' : '5.74vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '18.5vw' : '10.4vh',
                    width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    height: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    borderRadius: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '13.8vw' : '7.77vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '18.5vw' : '10.4vh',
                    width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    height: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    borderRadius: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '17.4vw' : '9.8vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '18.5vw' : '10.4vh',
                    width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    height: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    borderRadius: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '21vw' : '11.83vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '18.5vw' : '10.4vh',
                    width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    height: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    borderRadius: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '24vw' : '13.5vh',
                    left:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '17vw' : '9.56vh',
                    width:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '4vw' : '2.25vh',
                    height:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '4vw' : '2.25vh',
                    borderRadius:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
            </motion.div>
            {
              !address ?
              <motion.button className={styles.getTicket}
                onClick={() => connectWallet()}
                style={{color: lightColorPalette[giveAwaysArray[index].colorCode],
                  backgroundColor: darkColorPalette[giveAwaysArray[index].colorCode]}}>
                <MdIcons.MdAccountBalanceWallet style={{fontSize: '1rem'}} />
              </motion.button> :
              address === giveAwaysArray[index].diceRoller ?
              <motion.button className={styles.getTicket}
                // onClick={() => connectWallet()}
                style={{color: lightColorPalette[giveAwaysArray[index].colorCode],
                  backgroundColor: darkColorPalette[giveAwaysArray[index].colorCode]}}>
                <BsIcons.BsDice3Fill style={{fontSize: '1rem'}} />
              </motion.button> :
              frenRegistered ? 
              <motion.button className={styles.getTicket}
                style={{color: lightColorPalette[giveAwaysArray[index].colorCode],
                  backgroundColor: darkColorPalette[giveAwaysArray[index].colorCode]}}>
                <HiIcons.HiTicket style={{transform: 'scaleX(-1)'}} />
                <MdIcons.MdCheck style={{position: 'absolute', fontSize: '0.6rem', color: darkColorPalette[giveAwaysArray[index].colorCode]}} />
              </motion.button> :
              <motion.button className={styles.getTicket}
              onClick={() => frenIndex > -1 && frenRegister(address)}
                style={{color: lightColorPalette[giveAwaysArray[index].colorCode],
                  backgroundColor: darkColorPalette[giveAwaysArray[index].colorCode]}}>
                <HiIcons.HiOutlineTicket style={{transform: 'scaleX(-1)'}} />
              </motion.button>
            }
            <motion.div className={styles.prizeImg}>
                <Image src={giveAwaysArray[index].prize.url} layout='fill' />
            </motion.div>
            <motion.div className={styles.prizeName}>
                <p>{giveAwaysArray[index].prize.unitName}</p>
            </motion.div>
            <motion.div className={styles.giveAwayRow}>
                <FaIcons.FaKeybase style={{color: '#f3f8f2',fontSize: '1.2rem', marginLeft: '-0.1rem'}} />
                <h1 style={{borderBottom: `2px solid ${darkColorPalette[giveAwaysArray[index].colorCode]}`}}>{giveAwaysArray[index].diceRoller.slice(0,8)+'...'}</h1>
            </motion.div>
            <motion.div className={styles.giveAwayRow}>
                <BiIcons.BiKey style={{color: '#f3f8f2'}} />
                <h1>{giveAwaysArray[index].barrier.amount+' '+giveAwaysArray[index].barrier.collection}</h1>
            </motion.div>
            <motion.div className={styles.giveAwayRow}>
                <HiIcons.HiOutlineTicket style={{transform: 'scaleX(-1)',color: '#f3f8f2'}} />
                <h1>{frenRegisterants.length} <span style={{color: '#f3f8f2'}}>/</span> {frenArray.length}</h1>
            </motion.div>
            <motion.div className={styles.giveAwayRow}>
                <MdIcons.MdTimer style={{color: '#f3f8f2'}} />
                <h1>{gaHours[index]}<span style={{color: '#f3f8f2'}}> h </span>{gaMins[index]}<span style={{color: '#f3f8f2'}}> m</span></h1>
            </motion.div>
          </motion.div>
        )
      } else if (index === 1) {
        return (
          <motion.div className={styles.giveAwayCard}
              style={{backgroundColor: lightColorPalette[giveAwaysArray[index].colorCode],
                color: darkColorPalette[giveAwaysArray[index].colorCode],
              top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                `${top}vw` : `${top*9/16}vh`,
              left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                `${left}vw` : `${left*9/16}vh`}}>
            <motion.div className={styles.ticketHolder}>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '-2vw' : '-1.13vh',
                    left:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '17vw' : '9.56vh',
                    width:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '4vw' : '2.25vh',
                    height:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '4vw' : '2.25vh',
                    borderRadius:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '3vw' : '1.69vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '18.5vw' : '10.4vh',
                    width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    height: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    borderRadius: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '6.6vw' : '3.71vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '18.5vw' : '10.4vh',
                    width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    height: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    borderRadius: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '10.2vw' : '5.74vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '18.5vw' : '10.4vh',
                    width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    height: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    borderRadius: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '13.8vw' : '7.77vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '18.5vw' : '10.4vh',
                    width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    height: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    borderRadius: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '17.4vw' : '9.8vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '18.5vw' : '10.4vh',
                    width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    height: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    borderRadius: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '21vw' : '11.83vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '18.5vw' : '10.4vh',
                    width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    height: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    borderRadius: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '24vw' : '13.5vh',
                    left:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '17vw' : '9.56vh',
                    width:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '4vw' : '2.25vh',
                    height:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '4vw' : '2.25vh',
                    borderRadius:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
            </motion.div>
            {
              !address ?
              <motion.button className={styles.getTicket}
                onClick={() => connectWallet()}
                style={{color: lightColorPalette[giveAwaysArray[index].colorCode],
                  backgroundColor: darkColorPalette[giveAwaysArray[index].colorCode]}}>
                <MdIcons.MdAccountBalanceWallet style={{fontSize: '1rem'}} />
              </motion.button> :
              address === giveAwaysArray[index].diceRoller ?
              <motion.button className={styles.getTicket}
                // onClick={() => connectWallet()}
                style={{color: lightColorPalette[giveAwaysArray[index].colorCode],
                  backgroundColor: darkColorPalette[giveAwaysArray[index].colorCode]}}>
                <BsIcons.BsDice3Fill style={{fontSize: '1rem'}} />
              </motion.button> :
              frensRegistered && address ? 
              <motion.button className={styles.getTicket}
                style={{color: lightColorPalette[giveAwaysArray[index].colorCode],
                  backgroundColor: darkColorPalette[giveAwaysArray[index].colorCode]}}>
                <HiIcons.HiTicket style={{transform: 'scaleX(-1)'}} />
                <MdIcons.MdCheck style={{position: 'absolute', fontSize: '0.6rem', color: darkColorPalette[giveAwaysArray[index].colorCode]}} />
              </motion.button> :
              <motion.button className={styles.getTicket}
              onClick={() => frensIndex > -1 && frensRegister(address)}
                style={{color: lightColorPalette[giveAwaysArray[index].colorCode],
                  backgroundColor: darkColorPalette[giveAwaysArray[index].colorCode]}}>
                <HiIcons.HiOutlineTicket style={{transform: 'scaleX(-1)'}} />
              </motion.button>}
            <motion.div className={styles.prizeImg}>
                <Image src={giveAwaysArray[index].prize.url} layout='fill' />
            </motion.div>
            <motion.div className={styles.prizeName}>
                <p>{giveAwaysArray[index].prize.unitName}</p>
            </motion.div>
            <motion.div className={styles.giveAwayRow}>
                <FaIcons.FaKeybase style={{color: '#f3f8f2',fontSize: '1.2rem', marginLeft: '-0.1rem'}} />
                <h1 style={{borderBottom: `2px solid ${darkColorPalette[giveAwaysArray[index].colorCode]}`}}>{giveAwaysArray[index].diceRoller.slice(0,8)+'...'}</h1>
            </motion.div>
            <motion.div className={styles.giveAwayRow}>
                <BiIcons.BiKey style={{color: '#f3f8f2'}} />
                <h1>{giveAwaysArray[index].barrier.amount+' '+giveAwaysArray[index].barrier.collection}</h1>
            </motion.div>
            <motion.div className={styles.giveAwayRow}>
                <HiIcons.HiOutlineTicket style={{transform: 'scaleX(-1)',color: '#f3f8f2'}} />
                <h1>{frensRegisterants.length} <span style={{color: '#f3f8f2'}}>/</span> {frensArray.length}</h1>
            </motion.div>
            <motion.div className={styles.giveAwayRow}>
                <MdIcons.MdTimer style={{color: '#f3f8f2'}} />
                <h1>{gaHours[index]}<span style={{color: '#f3f8f2'}}> h </span>{gaMins[index]}<span style={{color: '#f3f8f2'}}> m</span></h1>
            </motion.div>
          </motion.div>
        )
      } else {
        return (
          <motion.div className={styles.giveAwayCard}
              style={{backgroundColor: lightColorPalette[giveAwaysArray[index].colorCode],
                color: darkColorPalette[giveAwaysArray[index].colorCode],
              top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                `${top}vw` : `${top*9/16}vh`,
              left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                `${left}vw` : `${left*9/16}vh`}}>
            <motion.div className={styles.ticketHolder}>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '-2vw' : '-1.13vh',
                    left:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '17vw' : '9.56vh',
                    width:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '4vw' : '2.25vh',
                    height:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '4vw' : '2.25vh',
                    borderRadius:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '3vw' : '1.69vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '18.5vw' : '10.4vh',
                    width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    height: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    borderRadius: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '6.6vw' : '3.71vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '18.5vw' : '10.4vh',
                    width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    height: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    borderRadius: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '10.2vw' : '5.74vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '18.5vw' : '10.4vh',
                    width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    height: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    borderRadius: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '13.8vw' : '7.77vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '18.5vw' : '10.4vh',
                    width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    height: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    borderRadius: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '17.4vw' : '9.8vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '18.5vw' : '10.4vh',
                    width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    height: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    borderRadius: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '21vw' : '11.83vh',
                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '18.5vw' : '10.4vh',
                    width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    height: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    borderRadius: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '1vw' : '0.56vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
                <motion.div className={styles.punch}
                  style={{position: 'absolute',
                    top:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '24vw' : '13.5vh',
                    left:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '17vw' : '9.56vh',
                    width:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '4vw' : '2.25vh',
                    height:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '4vw' : '2.25vh',
                    borderRadius:window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                     '2vw' : '1.13vh',
                    backgroundColor: 'var(--color-bg-primary)'}}>
                </motion.div>
            </motion.div>
            {
              !address ?
              <motion.button className={styles.getTicket}
                onClick={() => connectWallet()}
                style={{color: lightColorPalette[giveAwaysArray[index].colorCode],
                  backgroundColor: darkColorPalette[giveAwaysArray[index].colorCode]}}>
                <MdIcons.MdAccountBalanceWallet style={{fontSize: '1rem'}} />
              </motion.button> :
              address === giveAwaysArray[index].diceRoller ?
              <motion.button className={styles.getTicket}
                // onClick={() => connectWallet()}
                style={{color: lightColorPalette[giveAwaysArray[index].colorCode],
                  backgroundColor: darkColorPalette[giveAwaysArray[index].colorCode]}}>
                <BsIcons.BsDice3Fill style={{fontSize: '1rem'}} />
              </motion.button> :
              sholderRegistered && address ? 
              <motion.button className={styles.getTicket}
                style={{color: lightColorPalette[giveAwaysArray[index].colorCode],
                  backgroundColor: darkColorPalette[giveAwaysArray[index].colorCode]}}>
                <HiIcons.HiTicket style={{transform: 'scaleX(-1)'}} />
                <MdIcons.MdCheck style={{position: 'absolute', fontSize: '0.6rem', color: darkColorPalette[giveAwaysArray[index].colorCode]}} />
              </motion.button> :
              <motion.button className={styles.getTicket}
              onClick={() => sholderIndex > -1 && sholderRegister(address)}
                style={{color: lightColorPalette[giveAwaysArray[index].colorCode],
                  backgroundColor: darkColorPalette[giveAwaysArray[index].colorCode]}}>
                <HiIcons.HiOutlineTicket style={{transform: 'scaleX(-1)'}} />
              </motion.button>}
            <motion.div className={styles.prizeImg}>
                <Image src={giveAwaysArray[index].prize.url} layout='fill' />
            </motion.div>
            <motion.div className={styles.prizeName}>
                <p>{giveAwaysArray[index].prize.unitName}</p>
            </motion.div>
            <motion.div className={styles.giveAwayRow}>
                <FaIcons.FaKeybase style={{color: '#f3f8f2',fontSize: '1.2rem', marginLeft: '-0.1rem'}} />
                <h1 style={{borderBottom: `2px solid ${darkColorPalette[giveAwaysArray[index].colorCode]}`}}>{giveAwaysArray[index].diceRoller.slice(0,8)+'...'}</h1>
            </motion.div>
            <motion.div className={styles.giveAwayRow}>
                <BiIcons.BiKey style={{color: '#f3f8f2'}} />
                <h1>{giveAwaysArray[index].barrier.amount+' '+giveAwaysArray[index].barrier.collection}</h1>
            </motion.div>
            <motion.div className={styles.giveAwayRow}>
                <HiIcons.HiOutlineTicket style={{transform: 'scaleX(-1)',color: '#f3f8f2'}} />
                <h1>{sholderRegisterants.length} <span style={{color: '#f3f8f2'}}>/</span> {sholderArray.length}</h1>
            </motion.div>
            <motion.div className={styles.giveAwayRow}>
                <MdIcons.MdTimer style={{color: '#f3f8f2'}} />
                <h1>{gaHours[index]}<span style={{color: '#f3f8f2'}}> h </span>{gaMins[index]}<span style={{color: '#f3f8f2'}}> m</span></h1>
            </motion.div>
          </motion.div>
        )
      }
    }

    // handle creating a giveaway
    // const createGiveAway = async event => {
    //   event.preventDefault()
    //   fetch(`/api/algoXasset/?assetId=${event.target.prizeId.value}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data)
    //     var giveAway = {
    //       rollingTime: event.target.rollingTime.value,
    //       diceRoller: roller,
    //       prize: {assetId: event.target.prizeId.value,
    //         amount: event.target.prizeAmount.value,
    //         url: data.message.url[0] == 'h' ? data.message.url : `https://ipfs.io/ipfs/${data.message.url.slice(7)}` ,
    //         unitName: data.message['unit-name']},
    //       barrier: {collection: event.target.barrierCollection.value,
    //         amount: event.target.barrierAmount.value},
    //       registerants: [],
    //       winner: '',
    //       verified: false,
    //       colorCode: event.target.colorCode.value * 1
    //     }
    //     // giveAway.prize.url = data.url
    //     fetch('api/giveAways' , {
    //       method: 'POST',
    //       body: JSON.stringify(giveAway)
    //     }).then((res) => res.json())
    //     .then((data) => console.log(data.message))
    //   })
    // }

    if (giveAways && sholders && frens && address) {
      return (
        <div className={styles.generous}
          style={{height: `${normalizedwidth*16/9}vw`,
          width: `${normalizedwidth}vw`}}>
          <div className={styles.wheelHolder}>
            <div className={styles.wheelOne}>
              <div className={styles.logoHolder}>
                <Image className={styles.logo} src={activeTheme==='light'? '/logo.png' : '/darkLogo.png'} layout='fill' />
              </div>
              <div className={styles.walletRow}>
                {name? <p>{name}</p> : <p>connect</p>}
                <button className={styles.wallet}
                  onClick={() => connectWallet()}
                  style={{backgroundColor: lightColorPalette[5],
                    color: darkColorPalette[5]}}>
                  <MdIcons.MdAccountBalanceWallet />
                </button>
              </div>
              <div className={styles.sholderRow}
                style={{color: darkColorPalette[0]}}>
                <p>{sholderLvl}{sholderLvl == 1 ? ' head' : ' heads'}</p>
                <div className={styles.sholder}
                  style={{backgroundColor: lightColorPalette[0]}}>
                  <CgIcons.CgTrophy />
                </div>
              </div>
              <div className={styles.frenRow}
                style={{color: darkColorPalette[5]}}>
                <p>{frenLvl}{frenLvl == 1 ? ' fren' : ' frens'}</p>
                <div className={styles.fren}>
                  <Image className={styles.frenLogo} src='/frensIcon.png' layout='fill' />
                </div>
              </div>
            </div>
            <div className={styles.wheelTwo}>
              <motion.div className={styles.counterArrowHolder}>
                <Image className={styles.counterArrows} src={activeTheme === 'light' ? scrollArrowPalette[5] : scrollArrowPalette[7]} layout='fill' />
              </motion.div>
            </div>
            <div className={styles.wheelThree}>
                <motion.div className={styles.mainArrowHolder}>
                  <Image className={styles.arrows} src={activeTheme === 'light' ? arrowPalette[5] : arrowPalette[7]} layout='fill' />
                </motion.div>
                <motion.div className={styles.topTitle}>
                  <BsIcons.BsDice3Fill style={{color: lightColorPalette[5]}} />
                  <h1>Generous Give Aways</h1>
                </motion.div>
                <GiveAwayHolder top={-11} left={46} index={0} />
                <GiveAwayHolder top={17} left={70} index={1} />
                <GiveAwayHolder top={45} left={70} index={2} />
                {/* <GiveAwayHolder top={73} left={46} index={2} /> */}
            </div>
            <div className={styles.wheelFour}>
              <motion.div className={styles.arrowHolder}>
                <Image className={styles.lastArrows} src={activeTheme === 'light' ? scrollArrowPalette[5] : scrollArrowPalette[7]} layout='fill' />
              </motion.div>
            </div>
          </div>
        </div>
      )
    }

    if (giveAways && sholders && frens) {
      return (
        <div className={styles.generous}
          style={{height: `${normalizedwidth*16/9}vw`,
          width: `${normalizedwidth}vw`}}>
          <div className={styles.wheelHolder}>
            <div className={styles.wheelOne}>
              <div className={styles.logoHolder}>
                <Image className={styles.logo} src={activeTheme==='light'? '/logo.png' : '/darkLogo.png'} layout='fill' />
              </div>
              <div className={styles.walletRow}>
                {name? <p>{name}</p> : <p>connect</p>}
                <button className={styles.wallet}
                onClick={() => connectWallet()}
                style={{backgroundColor: lightColorPalette[5],
                  color: darkColorPalette[5]}}>
                <MdIcons.MdAccountBalanceWallet />
              </button>
              </div>
            </div>
            <div className={styles.wheelTwo}>
              <motion.div className={styles.counterArrowHolder}>
                <Image className={styles.counterArrows} src={activeTheme === 'light' ? scrollArrowPalette[5] : scrollArrowPalette[7]} layout='fill' />
              </motion.div>
            </div>
            <div className={styles.wheelThree}>
                <motion.div className={styles.mainArrowHolder}>
                  <Image className={styles.arrows} src={activeTheme === 'light' ? arrowPalette[5] : arrowPalette[7]} layout='fill' />
                </motion.div>
                <motion.div className={styles.topTitle}>
                  <BsIcons.BsDice3Fill style={{color: lightColorPalette[5]}} />
                  <h1>Generous Give Aways</h1>
                </motion.div>
                <GiveAwayHolder top={-11} left={46} index={0} />
                <GiveAwayHolder top={17} left={70} index={1} />
                <GiveAwayHolder top={45} left={70} index={2} />
                {/* <GiveAwayHolder top={73} left={46} index={2} /> */}
            </div>
            <div className={styles.wheelFour}>
              <motion.div className={styles.arrowHolder}>
                <Image className={styles.lastArrows} src={activeTheme === 'light' ? scrollArrowPalette[5] : scrollArrowPalette[7]} layout='fill' />
              </motion.div>
            </div>
          </div>
        </div>
      )
    }

  
  //   return (
  //   <form onSubmit={createGiveAway} className={styles.form}>
  //     <div className={styles.formRow}>
  //       <div className={styles.formCol}>
  //         <label htmlFor='rollingTime' className={styles.label}>rolling time</label>
  //         <input name='rollingTime' id='rollingTime' type='datetime-local' className={styles.input} required />
  //       </div>
  //     </div>
  //     <div className={styles.formRow}>
  //       <div className={styles.formCol}>
  //         <label htmlFor='prizeId' className={styles.label}>prize asset id</label>
  //         <input name='prizeId' id='prizeId' type='text' className={styles.input} required />
  //       </div>
  //       <div className={styles.formCol}>
  //         <label htmlFor='prizeAmount' className={styles.label}>amount</label>
  //         <input name='prizeAmount' id='prizeAmount' type='number' className={styles.input} required />
  //       </div>
  //     </div>
  //     <div className={styles.formRow}>
  //       <div className={styles.formCol}>
  //         <label htmlFor='barrierCollection' className={styles.label}>for holders of</label>
  //         <select name='barrierCollection' id='barrierCollection' className={styles.input} required>
  //           <option value='mostlyFrens'>mostly frens</option>
  //           <option value='algoHeads'>algo heads</option>
  //         </select>
  //       </div>
  //       <div className={styles.formCol}>
  //         <label htmlFor='barrierAmount' className={styles.label}>amount</label>
  //         <input name='barrierAmount' id='barrierAmount' type='number' className={styles.input} required />
  //       </div>
  //     </div>
  //     <div className={styles.formRow}>
  //       <div className={styles.formCol}>
  //         <label htmlFor='colorCode' className={styles.label}>color code</label>
  //         <select name='colorCode' id='colorCode' className={styles.input} required>
  //           <option value='0'>blue</option>
  //           <option value={1}>green</option>
  //           <option value={2}>yellow</option>
  //           <option value={3}>grey</option>
  //           <option value={4}>red</option>
  //           <option value={5}>purple</option>
  //           <option value={6}>orange</option>
  //           <option value={7}>pearl white</option>
  //         </select>
  //       </div>
  //     </div>
  //     {roller && <button type='submit' className={styles.submit}>submit</button>}
  //     <div onClick={() => connectWallet()} className={styles.submit}>connect</div>
  //   </form>
  // )

}

export default Generous