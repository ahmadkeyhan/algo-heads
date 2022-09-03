import Image from 'next/image'
import Link from 'next/link'
import narrowStyles from '../styles/head.module.css'
import wideStyles from '../styles/headWide.module.css'
import { useState, useEffect } from 'react'
import { motion, useAnimation } from "framer-motion"
import { useRouter } from 'next/router'
import { lightColorPalette, darkColorPalette } from '../components/colorPalette'
import { arrowPalette, linkArrowPalette } from './Assets'

function Head() {
  const router = useRouter()
  const { head } = router.query

  const [activeTheme, setActiveTheme] = useState(document.body.dataset.theme)
  const inactiveTheme = activeTheme === "light" ? "dark" : "light"

  useEffect(() => {
    document.body.dataset.theme = activeTheme
    window.localStorage.setItem("theme", activeTheme)
  }, [activeTheme])

  const [headIndex, setHeadIndex] = useState(-1)
  const [fetchedHeads, setFetchedHeads] = useState()
  const [isLoading, setLoading] = useState()
  const [headArray, setHeadArray] = useState([])
  const [colorCode, setColorCode] = useState(3)

  const [metaData, setMetaData] = useState()

  useEffect(() => {
    setLoading(true)
    fetch('api/mongodb/headlist')
      .then((res) => res.json())
      .then((data) => {
        data.message.sort((a,b) => a.assetId*1 - b.assetId*1)
        setFetchedHeads(data.message)
        console.log(head, headIndex)
        data.message.map((h, index) => {
          headArray.push(h)
          if (head == h.assetId) {
            setHeadIndex(index)
            console.log(headIndex)
            setColorCode(h.bgColorCode > -1 ? h.bgColorCode : 5)
            fetch(`/api/nftx/asset/?assetId=${h.assetId}`)
              .then((res) => res.json())
              .then((data) => {
                setMetaData(data.message)
                console.log(data.message)
              })
          }
        })
        setLoading(false)
      })
  },[])

  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const [normalizedwidth, setNormalizedWidth] = useState()
  const [styles, setStyles] = useState(narrowStyles)
   
  useEffect(() => {
    setWidth(window.visualViewport.width)
    setHeight(window.visualViewport.height)

    if (window.visualViewport.height > window.visualViewport.width) {
      setNormalizedWidth(100) 

    } else {
      setNormalizedWidth((window.visualViewport.height*900)/(16*window.visualViewport.width))
      setStyles(wideStyles)
    } 
  },[])


  function HeadHolder({top, left}) {
    return (
      <motion.div className={styles.headHolder}
        style={{top: `${top}vw`, left: `${left}vw`}}>
        <motion.div className={styles.headFrame}
        style={{backgroundColor: lightColorPalette[colorCode]}}>
          <Image className={styles.head} src={fetchedHeads[headIndex].src} layout='fill' />
        </motion.div>
        <motion.div className={styles.headCard}
          style={{
            color:activeTheme === 'light' ? darkColorPalette[colorCode]: null}}>
          <p>{metaData.name}</p>
        </motion.div>
      </motion.div>
    )
  }


  if( fetchedHeads && metaData) {
    if(headIndex !== -1) {
      return (
        <div className={styles.headlist}
          style={{height: '100vh',
          width: `${normalizedwidth}vw`}}>
          <div className={styles.wheelHolder}>
            <div className={styles.wheelOne}>
              <HeadHolder top={16} left={14} />
            </div>
          </div>
          <div className={styles.wheelTwo}>
            <motion.div className={styles.infoRect}
              style={{borderColor: lightColorPalette[colorCode],
                top: '4vw',
                right: '26vw',
                width: '50vw'}}>
              <p>Asset id: <span>{metaData.assetId}</span></p>
            </motion.div>
            <motion.div className={styles.infoRect}
              style={{borderColor: lightColorPalette[colorCode],
                top: '17vw',
                right: '10vw',
                width: '46vw'}}>
              <p>Unit name: <span>{metaData.unitName}</span></p>
            </motion.div>
            </div>
        </div>
        )
    } else {
      router.push('/headlist')
    }
    
  } else {
    console.log('loading')
    return (
      <div className={styles.headlist}
        style={{height: '100vh',
        width: `${normalizedwidth}vw`}}>
        <div className={styles.wheelHolder}>
        </div>
      </div>
      )
  }

}

export default Head