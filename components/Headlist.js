import Image from 'next/image'
import narrowStyles from '../styles/headlist.module.css'
import wideStyles from '../styles/headlistWide.module.css'
import { useState, useEffect } from 'react'
import * as MdIcons from 'react-icons/md'
import { motion } from "framer-motion"
import { useRouter } from 'next/router'
import { lightColorPalette, darkColorPalette } from './colorPalette'
import {arrowPalette, scrollArrowPalette} from './Assets'
import Link from 'next/link'

function Headlist() {
  const [activeTheme, setActiveTheme] = useState('light')

  const router = useRouter()

  //  const [sortedHeads, setSortedHeads] = useState([{sholder: {address: '', name: ''}, assetId: '761630099', src: '/algoHead001.png',bgColorCode: 6,price: 0},
  //                                                  {sholder: {address: '4Y3V3EEKIKPH6XKN7KTIQGM5NHNZXPEWIMNFZYBVMKQGZWRXIKPNQJEZG4', name: ''}, assetId: '761631219', src: '/algoHead002.png',bgColorCode: 0,price: 25},
  //                                                  {sholder: {address: '', name: ''}, assetId: '761633300', src: '/algoHead003.png',bgColorCode: 4,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '761637294', src: '/algoHead004.png',bgColorCode: 5,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '761639053', src: '/algoHead005.png',bgColorCode: 0,price: 0},
  //                                                  {sholder: {address: 'CHN4PTDRFF2IKB6R7JIMR2ATS6TYUW6K7KEAOFR23G4MCKTKWXG6DHPGMU', name: ''}, assetId: '761639913', src: '/algoHead006.png',bgColorCode: 1,price: 25},
  //                                                  {sholder: {address: '', name: 'WK6MB5Z7CD5XS6BKUYQWGVB5JZCBSIUQRFBAICI3H6B2WHUI5SG4EVUGSU'}, assetId: '761641826', src: '/algoHead007.png',bgColorCode: 1,price: 25},
  //                                                  {sholder: {address: '', name: ''}, assetId: '761643188', src: '/algoHead008.png',bgColorCode: 5,price: 0},
  //                                                  {sholder: {address: '4Y3V3EEKIKPH6XKN7KTIQGM5NHNZXPEWIMNFZYBVMKQGZWRXIKPNQJEZG4', name: ''}, assetId: '761644808', src: '/algoHead009.png',bgColorCode: 0,price: 25},
  //                                                  {sholder: {address: '', name: ''}, assetId: '761645819', src: '/algoHead010.png',bgColorCode: 4,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '761646569', src: '/algoHead011.png',bgColorCode: 1,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '761647328', src: '/algoHead012.png',bgColorCode: 2,price: 0},
  //                                                  {sholder: {address: '4Y3V3EEKIKPH6XKN7KTIQGM5NHNZXPEWIMNFZYBVMKQGZWRXIKPNQJEZG4', name: ''}, assetId: '761648256', src: '/algoHead013.png',bgColorCode: 2,price: 25},
  //                                                  {sholder: {address: '4Y3V3EEKIKPH6XKN7KTIQGM5NHNZXPEWIMNFZYBVMKQGZWRXIKPNQJEZG4', name: ''}, assetId: '761649296', src: '/algoHead014.png',bgColorCode: 3,price: 25},
  //                                                  {sholder: {address: '', name: ''}, assetId: '761650042', src: '/algoHead015.png',bgColorCode: 2,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '773795933', src: '/algoHead016.png',bgColorCode: 0,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '773796455', src: '/algoHead017.png',bgColorCode: 5,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '773797150', src: '/algoHead018.png',bgColorCode: 4,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '773797594', src: '/algoHead019.png',bgColorCode: 0,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '773798196', src: '/algoHead020.png',bgColorCode: 1,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '773798650', src: '/algoHead021.png',bgColorCode: 5,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '773799175', src: '/algoHead022.png',bgColorCode: 6,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '773799589', src: '/algoHead023.png',bgColorCode: 3,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '773800011', src: '/algoHead024.png',bgColorCode: 6,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '773800369', src: '/algoHead025.png',bgColorCode: 3,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '773801040', src: '/algoHead026.png',bgColorCode: 3,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '773802119', src: '/algoHead027.png',bgColorCode: 4,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '773802712', src: '/algoHead028.png',bgColorCode: 6,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '773803162', src: '/algoHead029.png',bgColorCode: 6,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '773803473', src: '/algoHead030.png',bgColorCode: 1,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782758921', src: '/algoHead031.png',bgColorCode: 3,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782759850', src: '/algoHead032.png',bgColorCode: 4,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782760897', src: '/algoHead033.png',bgColorCode: 2,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782761932', src: '/algoHead034.png',bgColorCode: 0,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782762652', src: '/algoHead035.png',bgColorCode: 6,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782763248', src: '/algoHead036.png',bgColorCode: 1,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782763916', src: '/algoHead037.png',bgColorCode: 0,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782764731', src: '/algoHead038.png',bgColorCode: 6,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782767151', src: '/algoHead039.png',bgColorCode: 4,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782768049', src: '/algoHead040.png',bgColorCode: 6,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782768648', src: '/algoHead041.png',bgColorCode: 1,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782770201', src: '/algoHead042.png',bgColorCode: 0,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782771050', src: '/algoHead043.png',bgColorCode: 5,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782771834', src: '/algoHead044.png',bgColorCode: 1,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782772896', src: '/algoHead045.png',bgColorCode: 3,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782773804', src: '/algoHead046.png',bgColorCode: -1,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782774811', src: '/algoHead047.png',bgColorCode: -1,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782775838', src: '/algoHead048.png',bgColorCode: -1,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782776751', src: '/algoHead049.png',bgColorCode: -1,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '782777139', src: '/algoHead050.png',bgColorCode: -1,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '789735191', src: '/algoHead051.png',bgColorCode: 6,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '789735711', src: '/algoHead052.png',bgColorCode: 1,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '789736702', src: '/algoHead053.png',bgColorCode: 3,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '789737124', src: '/algoHead054.png',bgColorCode: 5,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '789737572', src: '/algoHead055.png',bgColorCode: 0,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '789738005', src: '/algoHead056.png',bgColorCode: 4,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '789738430', src: '/algoHead057.png',bgColorCode: 1,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '789739185', src: '/algoHead058.png',bgColorCode: 0,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '789741401', src: '/algoHead059.png',bgColorCode: 2,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '789743150', src: '/algoHead060.png',bgColorCode: 5,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '786307589', src: '/algoHead121.png',bgColorCode: 6,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '786308097', src: '/algoHead122.png',bgColorCode: 5,price: 0},
  //                                                  {sholder: {address: '', name: ''}, assetId: '786308637', src: '/algoHead123.png',bgColorCode: 0,price: 0},
  //                                               ])

  const [sortedHeads, setSortedHeads] = useState()
  const [listedHeads, setlistedHeads] = useState([])
  const [isLoading, setLoading] = useState()
  const [sholders, setSholders] = useState([])

//   useEffect(() => {
//     setLoading(true)
//     fetch('api/headlist')
//     .then((res) => res.json())
//     .then((headData) => {
//       headData.message.sort((a,b) => a.assetId-b.assetId)
//       setSortedHeads(headData.message)
//       headData.message.map((head) => {
//         listedHeads.push(head)
//         fetch(`api/algoXasset/?id=${head.assetId}`).then((res) => res.json())
//         .then((data) => {
//           if (sholders.indexOf(data.message) === -1) {
//             sholders.push(data.message)
//           }
//         })
//       })
      
      
//       console.log(sholders)

//     })
    
// }, [])

  useEffect(() => {
      setLoading(true)
      fetch('api/headlist')
      .then((res) => res.json())
      .then((headData) => {
        headData.message.sort((a,b) => a.assetId-b.assetId)
        setSortedHeads(headData.message)
        headData.message.map((head) => listedHeads.push(head))
        console.log(listedHeads, sortedHeads)
        fetch('api/nftx')
        .then((res) => res.json())
        .then((data) => {
          if (data.message.nextToken) {
            setTimeout(fetch(`api/nftx?token=${data.message.nextToken}`)
            .then((res) => res.json())
            .then((nextData) => {
              console.log(nextData)
              nextData.message.sales.map((sale) => data.message.sales.push(sale))
              if (nextData.message.nextToken) {
                console.log(nextData.message.nextToken)
                setTimeout(fetch(`api/nftx?token=${nextData.message.nextToken}`)
                .then((res) => res.json())
                .then((lastData) => {
                  lastData.message.sales.map((sale) => data.message.sales.push(sale))
                }),1500)
              }
            }), 1500)
          }
          console.log(data)
          data.message.sales.reverse()
          for (var j=0; j < data.message.sales.length; j++) {
            for (var i=0; i < listedHeads.length; i++) {
              if (data.message.sales[j].asset == listedHeads[i].assetId) {
                listedHeads[i].price = data.message.sales[j].ualgos/1000000
                listedHeads[i].sholder.address = data.message.sales[j].receiver
              }
            }
          }
          listedHeads.map((head) => {
            var sholderCatcher = 0
            sholders.map((sholder) => {
              if (head.sholder.address === sholder.address) {
                sholder.heads.push({assetId: head.assetId, bgColorCode: head.bgColorCode, src: head.src})
                sholderCatcher += 1
              }
            })
            if (!sholderCatcher) {
              sholders.push({address: head.sholder.address, heads: [{assetId: head.assetId, bgColorCode: head.bgColorCode, src: head.src}]})
            }
            fetch('api/headlist' , {
              method: 'POST',
              body: JSON.stringify(head)
            }).then((res) => res.json())
          })
          setLoading(false)
          sholders.map((sholder) => {
            fetch('api/sholders', {
              method: 'POST',
              body: JSON.stringify(sholder)
            }).then((res) => res.json())
          })
        })
        console.log(sholders)

      })
      
  }, [])

  const [sortBy, setSortBy] = useState(true)
  const [sortDirection, setSortDirection] = useState(true)

  const [step, setStep] = useState(0)
  // const position = [[145, 83,4, 22.5], //0
  //                   [122, 59,4, 22.5], //1
  //                   [122, 26,4, 22.5], //2
  //                   [145,  3,4, 22.5], //3
  //                   [ 88, 26,3, 22.5], //4
  //                   [ 65,  2,3, 22.5], //5
  //                   [ 65,-31,3, 22.5]] //6

  // // const shadowPosition = [[ 70, 46,2, 22.5], //5
  // //                         [ 70, 13,2, 22.5], //6
  // //                         [ 46,-10,2, 22.5], //7
  // //                         [-10, 13,2, 22.5], //8
  // //                         [ 70, 46,1, 22.5], //9
  // //                         [ 70, 13,1, 22.5], //10
  // //                         [ 46,-10,1, 22.5]] //11

  const [colorCode, setColorCode] = useState()

  useEffect(() => {
    sortedHeads ?
      setColorCode(sortedHeads[step].bgColorCode !== -1 ? sortedHeads[step].bgColorCode : 5) :
      setColorCode(6)
  })
  
  const [width, setWidth] = useState(360)
  const [height, setHeight] = useState(640)
  const [normalizedwidth, setNormalizedWidth] = useState(100)
  const [styles, setStyles] = useState(narrowStyles)

  useEffect(() => {
    setActiveTheme(document.body.dataset.theme)
    setWidth(window.visualViewport.width)
    setHeight(window.visualViewport.height)
    if (window.visualViewport.height/window.visualViewport.width < 16/9) {
      setNormalizedWidth((window.visualViewport.height*900)/(16*window.visualViewport.width))
      setStyles(wideStyles)
    }
  }, [])

  function HeadHolder({top, left, rank, rotation}) {
    if (rank != step-1 && rank < sortedHeads.length) {
      return (
        <motion.div className={styles.headHolder}
          style={{color: activeTheme==='light' && sortedHeads[rank].bgColorCode !== -1 ? darkColorPalette[sortedHeads[rank].bgColorCode] : activeTheme === 'light' && sortedHeads[rank].bgColorCode === -1 ? lightColorPalette[5] : null,
          top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${top}vw` : `${top*9/16}vh`,
          left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${left}vw` : `${left*9/16}vh`}}>
          <motion.div style={{borderColor: sortedHeads[rank].bgColorCode !== -1 ? lightColorPalette[sortedHeads[rank].bgColorCode] : '#ffa7ff'}} className={rank == step ? styles.firstPriceTag : styles.priceTag}>
            <p className={styles.price}>{sortedHeads[rank].price}</p>
            <motion.div className={styles.algoLogo}>
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
                  19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
                  19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
                  8.8453L18.0006 19.0109Z" fill={sortedHeads[rank].bgColorCode !== -1 ? lightColorPalette[sortedHeads[rank].bgColorCode] : '#ffa7ff'} />
              </svg>
            </motion.div>
          </motion.div>
          <motion.div className={rank == step ? styles.firstRank : styles.rank}
           style={{borderColor: sortedHeads[rank].bgColorCode !== -1 ? lightColorPalette[sortedHeads[rank].bgColorCode] : '#ffa7ff'}}>
            <p>{rank + 1}</p>
          </motion.div>
          <motion.div
            style={{backgroundColor: sortedHeads[rank].bgColorCode !== -1 ? lightColorPalette[sortedHeads[rank].bgColorCode] : '#ffa7ff', transform: `rotate(${rotation}deg)`,
                    }}
            onClick={() => setStep(rank)}
            className={rank == step ? styles.bigFrame : styles.frame}>
            <Image style={{transform: `rotate(${rotation*-1}deg)`}} src={sortedHeads[rank].src} alt={sortedHeads[rank].src.slice(1,12)} layout='fill' />
          </motion.div>
          <motion.div style={rank == step ? {fontSize: '0.8rem', top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? '28vw' : '15.75vh'} : null} className={styles.headCard}>
            <p>{sortedHeads[rank].src.slice(1,12)}</p>
          </motion.div>
        </motion.div>
      )
    } else if(rank == step-1) {
      if (sortedHeads[rank+1].price == 0) {
        return (
          <motion.div className={styles.bigHeadHolder}
            style={{color: sortedHeads[rank+1].bgColorCode !== -1 ? darkColorPalette[sortedHeads[rank+1].bgColorCode] : lightColorPalette[5],
            top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${top}vw` : `${top*9/16}vh`,
            left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${left}vw` : `${left*9/16}vh`}}>
            <motion.div
              style={{marginLeft: window.visualViewport.height/window.visualViewport.width >= 16/9 ? '1vw' : '0.56vh',
              border: `0.125rem solid ${sortedHeads[rank+1].bgColorCode !== -1 ? lightColorPalette[sortedHeads[rank+1].bgColorCode] : '#ffa7ff'}`}}
              className={styles.nftxLink}>
              <p>Not sold!</p>
            </motion.div>
            <motion.div className={styles.rank}
             style={sortedHeads[rank+1].bgColorCode !== -1 ?{color: darkColorPalette[sortedHeads[rank+1].bgColorCode], borderColor: lightColorPalette[sortedHeads[rank+1].bgColorCode]}: {color:lightColorPalette[5], borderColor: '#ffa7ff'}}>
              <p>{rank + 2}</p>
            </motion.div>
            <motion.div
              style={{backgroundColor: sortedHeads[rank+1].bgColorCode !== -1 ? darkColorPalette[sortedHeads[rank+1].bgColorCode] : lightColorPalette[5],
                      transform: `rotate(${rotation}deg)`}}
              className={styles.frame}>
                <motion.div className={styles.secondFrame}></motion.div>
            </motion.div>
          </motion.div>
        )
      } else {
        return (
          <motion.div className={styles.bigHeadHolder}
            style={{color: activeTheme==='light' && sortedHeads[rank+1].bgColorCode !== -1 ? darkColorPalette[sortedHeads[rank+1].bgColorCode] : activeTheme==='light' && sortedHeads[rank+1].bgColorCode === -1 ? lightColorPalette[5] : null,
            top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${top}vw` : `${top*9/16}vh`,
            left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${left}vw` : `${left*9/16}vh`}}>
            <motion.div className={styles.bigPriceTag}>
              <p>Last sold:</p>
              <div>
                <p className={styles.price}>{sortedHeads[rank+1].price}</p>
                <motion.div className={styles.algoLogo}>
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
                      19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
                      19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
                      8.8453L18.0006 19.0109Z" fill={sortedHeads[rank+1].bgColorCode !== -1 ?lightColorPalette[sortedHeads[rank+1].bgColorCode]: '#ffa7ff'} />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
            <motion.div className={styles.sholderTag}>
              <p>Sholder: </p>
              <Link href={`/sholders/${sortedHeads[rank+1].sholder.address}`} passHref>
                <a>
                  <p className={styles.price}>{sortedHeads[rank+1].sholder.address.slice(0,5)}...</p>
                </a>
              </Link>
            </motion.div>
            <motion.div className={styles.nftxLink}
              style={{color: activeTheme==='light' && sortedHeads[rank+1].bgColorCode !== -1 ? null : activeTheme=== 'dark' && sortedHeads[rank+1].bgColorCode !== -1 ? lightColorPalette[sortedHeads[rank+1].bgColorCode] : '#ffa7ff',
                border: `0.125rem solid ${activeTheme==='light' && sortedHeads[rank+1].bgColorCode === -1 ? '#ffa7ff' : activeTheme==='light' && sortedHeads[rank+1].bgColorCode !== -1 ? lightColorPalette[sortedHeads[rank+1].bgColorCode] : sortedHeads[rank+1].bgColorCode !== -1 ? darkColorPalette[sortedHeads[rank+1].bgColorCode] : lightColorPalette[5]}`}}>
              <Link href={'https://www.nftexplorer.app/asset/'+sortedHeads[rank+1].assetId} passHref>
                <a target='_blank'>
                  <p>see more</p>
                </a>
              </Link>
            </motion.div>
            <motion.div className={styles.rank}
              style={{color: activeTheme==='light' && sortedHeads[rank+1].bgColorCode !== -1 ?
                  darkColorPalette[sortedHeads[rank+1].bgColorCode]: 
                  activeTheme==='light' && sortedHeads[rank+1].bg === -1 ? '#ffa7ff' :
                  sortedHeads[rank+1].bgColorCode !== -1 ?
                  lightColorPalette[sortedHeads[rank+1].bgColorCode] : '#ffa7ff',
                borderColor: activeTheme==='light' && sortedHeads[rank+1].bgColorCode !== -1 ?
                  lightColorPalette[sortedHeads[rank+1].bgColorCode] :
                  activeTheme==='light' && sortedHeads[rank+1].bgColorCode === -1 ? '#ffa7ff' :
                  sortedHeads[rank+1].bgColorCode !== -1 ?
                  darkColorPalette[sortedHeads[rank+1].bgColorCode] : '#ffa7ff'
              }}>
              <p>{rank + 2}</p>
            </motion.div>
            <motion.div
              style={{backgroundColor: activeTheme==='light' && sortedHeads[rank+1].bgColorCode !== -1 ?
                  lightColorPalette[sortedHeads[rank+1].bgColorCode] :
                  activeTheme==='light' && sortedHeads[rank+1].bgColorCode === -1 ? '#ffa7ff' :
                  sortedHeads[rank+1].bgColorCode !== -1 ?
                  darkColorPalette[sortedHeads[rank+1].bgColorCode] : lightColorPalette[5],
                transform: `rotate(${rotation}deg)`}}
              className={styles.frame}>
                <motion.div className={styles.secondFrame} />
            </motion.div>
          </motion.div>
        )
      }
    } else {
      return (
        <motion.div className={styles.headHolder}
          style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${top}vw` : `${top*9/16}vh`,
          left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${left}vw` : `${left*9/16}vh`}}>
          <motion.div
            style={rank == sortedHeads.length && activeTheme === 'light' ?
              {color: darkColorPalette[colorCode],backgroundColor: lightColorPalette[colorCode], transform: `rotate(${rotation}deg)`} : 
              rank == sortedHeads.length && activeTheme === 'dark' ?
              {border: `2px solid #dfdfdf`,color: lightColorPalette[colorCode],transform: `rotate(${rotation}deg)`} : {display: 'none'}}
            onClick={() => setStep(0)}
            className={styles.frame}>
            <p className={styles.goBack}
              style={rank == sortedHeads.length ? {transform: `rotate(${-rotation}deg)`} : {display: 'none'}}>Go back top!</p>
          </motion.div>          
        </motion.div>
      )
    }
  }

  if(sortedHeads) {
    return (
      <div className={styles.headList}
        style={{height: `${normalizedwidth*16/9}vw`,
        width: `${normalizedwidth}vw`}}>
        <motion.div className={styles.wheelHolder}>
          <motion.div className={styles.wheelFive}>
          {step == 0 ?          
            <motion.div style={window.visualViewport.width > 900 ? {display: 'none'} : null} className={styles.arrowHolder}>
              <motion.div
                onClick={() => router.push('/')}
                className={styles.scrollButton}>
                <MdIcons.MdHomeFilled style={{fontSize: '1rem'}} />
                Tap to go home!
              </motion.div>
              <Image style={{transform: 'rotate(-135deg) scaleX(-1)'}} src={activeTheme==='light'? scrollArrowPalette[colorCode] : scrollArrowPalette[7]} alt="" layout='fill' />
            </motion.div> : 
            <motion.div className={styles.nextStepsTitle}>
              <motion.div className={styles.title}>
                <h1 style={{color:activeTheme==='light'? darkColorPalette[colorCode]: lightColorPalette[colorCode]}}>Homosapien heads</h1>
              </motion.div>
              <motion.div className={styles.stepCounter}>
                <p>( Phase 1 )</p>
                <p>( Heads {step+1} to {Math.min(step+10, sortedHeads.length)} )</p>
              </motion.div>
            </motion.div>
          }
            <HeadHolder top={47} left={6} rank={step - 1} rotation={67.5} />
            <HeadHolder top={70} left={13} rank={step + 0} rotation={67.5} borderRadius={[14,5,14,14]} />
            <HeadHolder top={70} left={46} rank={step + 1} rotation={157.5} borderRadius={[5,14,14,14]} />
            <HeadHolder top={46} left={70} rank={step + 2} rotation={202.5} borderRadius={[14,14,5,14]} />
          </motion.div>
          <motion.div className={styles.wheelSix}>
            {step != 0 ? 
              <motion.div className={styles.arrowHolder}>
                <motion.div className={styles.stepsBackward}>
                  <motion.div
                    style={activeTheme==='light'?
                      {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]} :
                      {color: lightColorPalette[colorCode], border: `2px solid ${darkColorPalette[colorCode]}`}}
                    onClick={() => setStep(step-10)}
                    animate={step > 9 ? null : {display: 'none'}}
                    className={styles.step}>
                    <p>-<span>10</span></p>
                  </motion.div>
                  <motion.div
                    style={activeTheme==='light'?
                      {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]} :
                      {color: lightColorPalette[colorCode], border: `2px solid ${darkColorPalette[colorCode]}`}}
                    onClick={() => setStep(step-5)}
                    animate={step > 4 ? null : {display: 'none'}}
                    className={styles.step}>
                    <p>-<span>5</span></p>
                  </motion.div>
                  <motion.div
                    style={activeTheme==='light'?
                      {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]} :
                      {color: lightColorPalette[colorCode]}}
                    onClick={() => setStep(0)}
                    animate={step > 4 ? {display: 'none'} : null}
                    className={styles.step}>
                    <span>Go back</span>
                  </motion.div>
                  <motion.div
                    style={activeTheme==='light'?
                      {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]} :
                      {color: lightColorPalette[colorCode]}}
                    onClick={() => setStep(0)}
                    animate={step > 4 ? {display: 'none'} : null}
                    className={styles.step}>
                    <span>To top</span>
                  </motion.div>
                </motion.div>
                <Image className={styles.counterArrows} src={activeTheme==='light'? arrowPalette[colorCode] : arrowPalette[7]} alt="" layout='fill' />
              </motion.div> :
              <motion.div className={styles.firstStepTitle}>
                <h1 style={{color:activeTheme==='light'? darkColorPalette[colorCode] : lightColorPalette[colorCode]}} >Homosapien heads</h1>
                <h2>( Phase 1 )</h2>
                <motion.div style={{border: 'none', marginRight: '-2rem'}} className={styles.stepCounter}>
                  <p>{step+1} to {step+10}</p>
                </motion.div>
              </motion.div>
            }
            <HeadHolder top={46} left={-10} rank={step + 3} rotation={112.5} borderRadius={[14,5,14,14]} />
            <HeadHolder top={70} left={13} rank={step + 4} rotation={67.5} borderRadius={[14,5,14,14]} />
          </motion.div>
          <motion.div className={styles.wheelSeven}>
            <motion.div animate={step+5 < sortedHeads.length ? null : {display: 'none'}} className={styles.arrowHolder}>
              <motion.div className={styles.stepsForward}>
                <motion.div
                  style={activeTheme==='light'?
                    {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]} :
                    {color: lightColorPalette[colorCode], border: `2px solid ${darkColorPalette[colorCode]}`}}
                  animate={step+5 < sortedHeads.length ? null : {display: 'none'}}
                  onClick={() => setStep(step+5)}
                  className={styles.step}>
                  <p>+<span>5</span></p>
                </motion.div>
                <motion.div
                  style={activeTheme==='light'?
                    {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]} :
                    {color: lightColorPalette[colorCode], border: `2px solid ${darkColorPalette[colorCode]}`}}
                  animate={step+10 < sortedHeads.length ? null : {display: 'none'}}
                  onClick={() => setStep(step+10)}
                  className={styles.step}>
                  <p>+<span>10</span></p>
                </motion.div>
              </motion.div>
              <Image style={{transform: 'rotate(315deg)'}} className={styles.counterArrows} src={activeTheme==='light'? arrowPalette[colorCode]: arrowPalette[7]} alt="" layout='fill' />
            </motion.div>
            <HeadHolder top={-10} left={46} rank={step + 5} rotation={-102.5} borderRadius={[14,14,14,5]} />
            <HeadHolder top={13} left={70} rank={step + 6} rotation={-67.5} borderRadius={[14,14,14,5]} />
          </motion.div>
          <motion.div className={styles.wheelEight}>
            <motion.div className={styles.sortWheel}>
              <motion.div style={activeTheme==='light' ? {color:darkColorPalette[colorCode]} : null} className={styles.sortDirection}>
                <motion.div className={styles.sortDirections}>
                  {sortBy ?
                    <p style={sortDirection ? {opacity: 1} :{opacity: 0.4}}>earliest</p> :
                    <p style={sortDirection ? {opacity: 1} : {opacity: 0.4}}>highest</p>
                  }
                  {sortBy ?
                    <p style={!sortDirection ? {opacity: 1} : {opacity: 0.4}}>latest</p> :
                    <p style={!sortDirection ? {opacity: 1} : {opacity: 0.4}}>lowest</p>
                  }
                </motion.div>
                <motion.div
                  style={{borderColor: darkColorPalette[colorCode]}}
                  animate={sortDirection ? {justifyContent: 'flex-start'} : {justifyContent: 'flex-end'}}
                  className={styles.sortDirectionSlider}>
                  <motion.div
                    style={{borderColor: darkColorPalette[colorCode], backgroundColor: lightColorPalette[colorCode]}}
                    className={styles.sortDirectionCatcher}
                    onClick={() => {
                      setSortDirection(!sortDirection)
                      setSortedHeads(sortedHeads.reverse())
                    }} />
                </motion.div>
              </motion.div>
              <motion.div className={styles.sortBy}>
                <motion.div className={styles.sortBys}>
                  <p style={sortBy ? {opacity: 1} : {opacity: 0.4}}>released</p>
                  <p style={!sortBy ? {opacity: 1} : {opacity: 0.4}}>priced</p>
                </motion.div>
                <motion.div
                  style={{borderColor: darkColorPalette[colorCode]}}
                  animate={sortBy ? {justifyContent: 'flex-start'} : {justifyContent: 'flex-end'}}
                  className={styles.sortBySlider}>
                  <motion.div
                    style={{borderColor: darkColorPalette[colorCode], backgroundColor: lightColorPalette[colorCode]}}
                    className={styles.sortByCatcher}
                    onClick={() => {
                      setSortBy(!sortBy)
                      sortedHeads.sort((a,b) => {
                        if (sortBy && sortDirection) return b.price - a.price
                        else if (sortBy && ! sortDirection) return a.price - b.price
                        else if (!sortBy && sortDirection) return a.assetId*1 - b.assetId*1
                        else return b.assetId*1 - a.assetId*1
                      })
                    }} />
                </motion.div>
              </motion.div>
              <p>head first</p>
            </motion.div>
            <motion.div className={styles.nftxCollection}>
              <p><span style={{color: lightColorPalette[colorCode]}}>*</span>
                Data is fetched from <a style={{borderBottom: `2px solid ${lightColorPalette[colorCode]}`}} href='https://www.nftexplorer.app/collection/algo-heads' target='_blank' rel="noreferrer">
                  nfte
                  <span style={{color: lightColorPalette[colorCode]}}>X</span>
                  plorer
                </a>
              </p>
            </motion.div>
            <HeadHolder top={13} left={-10} rank={step + 7} rotation={22.5} borderRadius={[5,14,14,14]} />
            <HeadHolder top={-10} left={13} rank={step + 8} rotation={-22.5} borderRadius={[14,14,5,14]} />
            <HeadHolder top={-10} left={46} rank={step + 9} rotation={-112.5} borderRadius={[14,14,14,5]} />
          </motion.div>
        </motion.div>
      </div>
    )
  } else {
    return (
      <div className={styles.headList}
        style={{height: `${normalizedwidth*16/9}vw`,
        width: `${normalizedwidth}vw`}}>
        <motion.div className={styles.wheelHolder}>
          <motion.div className={styles.wheelFive}>
          {step == 0 ?          
            <motion.div style={window.visualViewport.width > 900 ? {display: 'none'} : null} className={styles.arrowHolder}>
              <motion.div
                onClick={() => router.push('/')}
                className={styles.scrollButton}>
                <MdIcons.MdHomeFilled style={{fontSize: '1rem'}} />
                Tap to go home!
              </motion.div>
              {/* <Image style={{transform: 'rotate(-135deg) scaleX(-1)'}} src={activeTheme==='light'? scrollArrowPalette[colorCode] : scrollArrowPalette[7]} alt="" layout='fill' /> */}
            </motion.div> : 
            <motion.div className={styles.nextStepsTitle}>
              <motion.div className={styles.title}>
                <h1 style={{color:activeTheme==='light'? darkColorPalette[colorCode]: lightColorPalette[colorCode]}}>Homosapien heads</h1>
              </motion.div>
              <motion.div className={styles.stepCounter}>
                <p>( Phase 1 )</p>
                <p>( Heads {step+1} to {Math.min(step+10, sortedHeads.length)} )</p>
              </motion.div>
            </motion.div>
          }
          </motion.div>
          <motion.div className={styles.wheelSix}>
            {step != 0 ? 
              <motion.div className={styles.arrowHolder}>
                <motion.div className={styles.stepsBackward}>
                  <motion.div
                    style={activeTheme==='light'?
                      {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]} :
                      {color: lightColorPalette[colorCode], border: `2px solid ${darkColorPalette[colorCode]}`}}
                    onClick={() => setStep(step-10)}
                    animate={step > 9 ? null : {display: 'none'}}
                    className={styles.step}>
                    <p>-<span>10</span></p>
                  </motion.div>
                  <motion.div
                    style={activeTheme==='light'?
                      {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]} :
                      {color: lightColorPalette[colorCode], border: `2px solid ${darkColorPalette[colorCode]}`}}
                    onClick={() => setStep(step-5)}
                    animate={step > 4 ? null : {display: 'none'}}
                    className={styles.step}>
                    <p>-<span>5</span></p>
                  </motion.div>
                  <motion.div
                    style={activeTheme==='light'?
                      {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]} :
                      {color: lightColorPalette[colorCode]}}
                    onClick={() => setStep(0)}
                    animate={step > 4 ? {display: 'none'} : null}
                    className={styles.step}>
                    <span>Go back</span>
                  </motion.div>
                  <motion.div
                    style={activeTheme==='light'?
                      {backgroundColor: lightColorPalette[colorCode], color: darkColorPalette[colorCode]} :
                      {color: lightColorPalette[colorCode]}}
                    onClick={() => setStep(0)}
                    animate={step > 4 ? {display: 'none'} : null}
                    className={styles.step}>
                    <span>To top</span>
                  </motion.div>
                </motion.div>
                {/* <Image className={styles.counterArrows} src={activeTheme==='light'? arrowPalette[colorCode] : arrowPalette[7]} alt="" layout='fill' /> */}
              </motion.div> :
              <motion.div className={styles.firstStepTitle}>
                <h1 style={{color:activeTheme==='light'? darkColorPalette[colorCode] : lightColorPalette[colorCode]}} >Homosapien heads</h1>
                <h2>( Phase 1 )</h2>
                <motion.div style={{border: 'none', marginRight: '-2rem'}} className={styles.stepCounter}>
                  <p>{step+1} to {step+10}</p>
                </motion.div>
              </motion.div>
            }
          </motion.div>
          <motion.div className={styles.wheelSeven}>
          </motion.div>
          <motion.div className={styles.wheelEight}>
            <motion.div className={styles.sortWheel}>
              <motion.div style={activeTheme==='light' ? {color:darkColorPalette[colorCode]} : null} className={styles.sortDirection}>
                <motion.div className={styles.sortDirections}>
                  {sortBy ?
                    <p style={sortDirection ? {opacity: 1} :{opacity: 0.4}}>earliest</p> :
                    <p style={sortDirection ? {opacity: 1} : {opacity: 0.4}}>highest</p>
                  }
                  {sortBy ?
                    <p style={!sortDirection ? {opacity: 1} : {opacity: 0.4}}>latest</p> :
                    <p style={!sortDirection ? {opacity: 1} : {opacity: 0.4}}>lowest</p>
                  }
                </motion.div>
                <motion.div
                  style={{borderColor: darkColorPalette[colorCode]}}
                  animate={sortDirection ? {justifyContent: 'flex-start'} : {justifyContent: 'flex-end'}}
                  className={styles.sortDirectionSlider}>
                  <motion.div
                    style={{borderColor: darkColorPalette[colorCode], backgroundColor: lightColorPalette[colorCode]}}
                    className={styles.sortDirectionCatcher}
                    onClick={() => {
                      setSortDirection(!sortDirection)
                      setSortedHeads(sortedHeads.reverse())
                    }} />
                </motion.div>
              </motion.div>
              <motion.div className={styles.sortBy}>
                <motion.div className={styles.sortBys}>
                  <p style={sortBy ? {opacity: 1} : {opacity: 0.4}}>released</p>
                  <p style={!sortBy ? {opacity: 1} : {opacity: 0.4}}>priced</p>
                </motion.div>
                <motion.div
                  style={{borderColor: darkColorPalette[colorCode]}}
                  animate={sortBy ? {justifyContent: 'flex-start'} : {justifyContent: 'flex-end'}}
                  className={styles.sortBySlider}>
                  <motion.div
                    style={{borderColor: darkColorPalette[colorCode], backgroundColor: lightColorPalette[colorCode]}}
                    className={styles.sortByCatcher}
                    onClick={() => {
                      setSortBy(!sortBy)
                      sortedHeads.sort((a,b) => {
                        if (sortBy && sortDirection) return b.price - a.price
                        else if (sortBy && ! sortDirection) return a.price - b.price
                        else if (!sortBy && sortDirection) return a.assetId*1 - b.assetId*1
                        else return b.assetId*1 - a.assetId*1
                      })
                    }} />
                </motion.div>
              </motion.div>
              <p>head first</p>
            </motion.div>
            <motion.div className={styles.nftxCollection}>
              <p><span style={{color: lightColorPalette[colorCode]}}>*</span>
                Data is fetched from <a style={{borderBottom: `2px solid ${lightColorPalette[colorCode]}`}} href='https://www.nftexplorer.app/collection/algo-heads' target='_blank' rel="noreferrer">
                  nfte
                  <span style={{color: lightColorPalette[colorCode]}}>X</span>
                  plorer
                </a>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    )
  }
}

export default Headlist