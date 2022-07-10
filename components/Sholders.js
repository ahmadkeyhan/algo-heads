import Head from 'next/head'
import Image from 'next/image'
import narrowStyles from '../styles/sholders.module.css'
import wideStyles from '../styles/sholdersWide.module.css'
import { useState, useEffect, useRef } from 'react'
import * as MdIcons from 'react-icons/md'
import * as SiIcon from 'react-icons/si'
import * as BsIcons from 'react-icons/bs'
import * as CgIcons from 'react-icons/cg'
import { motion, useAnimation } from "framer-motion"
import { useRouter } from 'next/router'
import { lightColorPalette, darkColorPalette } from '../components/colorPalette'
import { arrowPalette, linkArrowPalette, scrollArrowPalette } from './Assets'
import Link from 'next/link'

function Sholders() {
    const router = useRouter()

  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme)
  const inactiveTheme = activeTheme === "light" ? "dark" : "light"

  useEffect(() => {
    document.body.dataset.theme = activeTheme
    window.localStorage.setItem("theme", activeTheme)
  }, [activeTheme])

  const [step, setStep] = useState(0)

  const [validAddress, setValidAddress] = useState(false)
  const [inputAddress, setInputAddress] = useState('')
  const input = useRef(null)

  useEffect(() => {
    setValidAddress(inputAddress.length === 58)
  }, [inputAddress])

  const [sholders, setSholders] = useState()
  const [isLoading, setLoading] = useState()

  useEffect(() => {
    setLoading(true)
    fetch('api/sholders')
      .then((res) => res.json())
      .then((data) => {
        data.message.sort((a,b) => b.heads.length - a.heads.length)
        setSholders(data.message)
        setLoading(false)
      })
  },[])

  const [colorCode, setColorCode] = useState(0)

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
  },[])

  function SholderHolder({top, left, rank}) {
    return (
        <motion.div className={styles.sholderCard}
            style={{color: activeTheme==='light' ? darkColorPalette[sholders[rank].heads[0].bgColorCode] : null,
            backgroundColor: lightColorPalette[sholders[rank].heads[0].bgColorCode],
            top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${top}vw` : `${top*9/16}vh`,
            left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${left}vw` : `${left*9/16}vh`}}
            onClick={() => router.push(`/sholders/${sholders[rank].address}`)}>
            <motion.div className={styles.sholderHolder}>
                <Image src={sholders[rank].heads[0].src} layout='fill' />
            </motion.div>
            <motion.div className={styles.sholderCol}>
                <p>Sholder:</p>
                <h1>{sholders[rank].address.slice(0,8)+'...'}</h1>
            </motion.div>
            <motion.div className={styles.sholderCol}>
                <p>carrying:</p>
                <h1>{sholders[rank].heads.length} <span>{sholders[rank].heads.length>1 ? 'heads' : 'head'}</span></h1>
            </motion.div>
            <motion.div className={styles.rank}
                style={{borderColor: lightColorPalette[sholders[rank].heads[0].bgColorCode],
                color: activeTheme==='light'? darkColorPalette[sholders[rank].heads[0].bgColorCode] : lightColorPalette[sholders[rank].heads[0].bgColorCode]}}>
                <p>{rank + 1}</p>
            </motion.div>
        </motion.div>
      )
  }

  if(sholders) {
    return (
        <div className={styles.landing}
          style={{height: `${normalizedwidth*16/9}vw`,
          width: `${normalizedwidth}vw`}}>
          <div className={styles.wheelHolder}>
            <div className={styles.wheelOne}>
              <motion.div style={{color: validAddress? lightColorPalette[colorCode] : null,
                borderColor: validAddress? lightColorPalette[colorCode] : null,
                fontSize: '1.1rem'}} className={styles.searchBox}>
                <input ref={input}
                    value={inputAddress}
                    onChange={(e) => setInputAddress(e.target.value)}
                    className={styles.addressBar} placeholder='Paste a valid algo wallet...'>
                </input>
                <motion.div onClick={() => router.push(`/sholders/${inputAddress}`)}>
                    <MdIcons.MdCheck style={validAddress ? null:{display: 'none'}} />
                    <MdIcons.MdSearch />
                </motion.div>
              </motion.div>
              <div className={styles.logoHolder}>
                <Image className={styles.logo} src={activeTheme==='light'? '/logo.png' : '/darkLogo.png'} layout='fill' />
              </div>
            </div>
            <div className={styles.wheelThree}>
                <motion.div className={styles.arrowHolder}>
                <Image className={styles.arrows} src={activeTheme === 'light' ? arrowPalette[colorCode] : arrowPalette[7]} layout='fill' />
                <motion.div className={styles.stepsForward}>
                    <motion.div
                        style={activeTheme==='light'?
                        {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]} :
                        {color: lightColorPalette[colorCode], border: `2px solid ${darkColorPalette[colorCode]}`}}
                        animate={step+4 < sholders.length ? null : {display: 'none'}}
                        onClick={() => setStep(step+1)}
                        className={styles.step}>
                        <p>+<span>1</span></p>
                    </motion.div>
                    <motion.div
                        style={activeTheme==='light'?
                        {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]} :
                        {color: lightColorPalette[colorCode], border: `2px solid ${darkColorPalette[colorCode]}`}}
                        animate={step+7 < sholders.length ? null : {display: 'none'}}
                        onClick={() => setStep(step+4)}
                        className={styles.step}>
                        <p>+<span>4</span></p>
                    </motion.div>
                </motion.div>
                </motion.div>
                <motion.div className={styles.counterArrowHolder}>
                <Image className={styles.counterArrows} src={activeTheme === 'light' ? scrollArrowPalette[colorCode] : scrollArrowPalette[7]} layout='fill' />
                <motion.div className={styles.stepsBackward}>
                    <motion.div
                        style={activeTheme==='light'?
                        {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]} :
                        {color: lightColorPalette[colorCode], border: `2px solid ${darkColorPalette[colorCode]}`}}
                        animate={step > 0 ? null : {display: 'none'}}
                        onClick={() => setStep(step-1)}
                        className={styles.step}>
                        <p>-<span>1</span></p>
                    </motion.div>
                    <motion.div
                        style={activeTheme==='light'?
                        {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]} :
                        {color: lightColorPalette[colorCode], border: `2px solid ${darkColorPalette[colorCode]}`}}
                        animate={step > 3 ? null : {display: 'none'}}
                        onClick={() => setStep(step-4)}
                        className={styles.step}>
                        <p>-<span>4</span></p>
                    </motion.div>
                </motion.div>
                </motion.div>
                <motion.div className={styles.topTitle}>
                    <h1><span style={{color: lightColorPalette[colorCode]}}><CgIcons.CgTrophy /></span> Top Sholders</h1>
                </motion.div>
                <SholderHolder top={-11} left={46} rank={step} />
                <SholderHolder top={16} left={70} rank={1+step} />
                <SholderHolder top={43} left={70} rank={2+step} />
                <SholderHolder top={70} left={46} rank={3+step} />
            </div>
            <div className={styles.wheelFour}>
            <motion.div className={styles.arrowHolder}>
                <Image className={styles.lastArrows} src={activeTheme === 'light' ? scrollArrowPalette[colorCode] : scrollArrowPalette[7]} layout='fill' />
              </motion.div>
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
              <motion.div style={{color: validAddress? lightColorPalette[colorCode] : null,
                borderColor: validAddress? lightColorPalette[colorCode] : null,
                fontSize: '1.1rem'}} className={styles.searchBox}>
                <input ref={input}
                    value={inputAddress}
                    onChange={(e) => setInputAddress(e.target.value)}
                    className={styles.addressBar} placeholder='Paste a valid algo wallet...'>
                </input>
                <motion.div onClick={() => router.push(`/sholders/${inputAddress}`)}>
                    <MdIcons.MdCheck style={validAddress ? null:{display: 'none'}} />
                    <MdIcons.MdSearch />
                </motion.div>
              </motion.div>
              <div className={styles.logoHolder}>
                <Image className={styles.logo} src={activeTheme==='light'? '/logo.png' : '/darkLogo.png'} layout='fill' />
              </div>
            </div>
            <div className={styles.wheelThree}>
                <motion.div className={styles.arrowHolder}>
                <Image className={styles.arrows} src={activeTheme === 'light' ? arrowPalette[colorCode] : arrowPalette[7]} layout='fill' />
                </motion.div>
                <motion.div className={styles.counterArrowHolder}>
                <Image className={styles.counterArrows} src={activeTheme === 'light' ? scrollArrowPalette[colorCode] : scrollArrowPalette[7]} layout='fill' />
                
                </motion.div>
                <motion.div className={styles.topTitle}>
                    <h1><span style={{color: lightColorPalette[colorCode]}}><CgIcons.CgTrophy /></span> Top Sholders</h1>
                </motion.div>
            </div>
            <div className={styles.wheelFour}>
            <motion.div className={styles.arrowHolder}>
                <Image className={styles.lastArrows} src={activeTheme === 'light' ? scrollArrowPalette[colorCode] : scrollArrowPalette[7]} layout='fill' />
              </motion.div>
            </div>
          </div>
        </div>
        )
  }
 }
 
 export default Sholders