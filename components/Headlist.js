import Image from 'next/image'
import styles from '../styles/headlist.module.css'
import { useState, useEffect } from 'react'
import * as MdIcons from 'react-icons/md'
import { motion } from "framer-motion"
import NavSlider from './NavSlider'
import { useRouter } from 'next/router'
import { lightColorPalette, darkColorPalette } from './colorPalette'
import {arrowPalette, scrollArrowPalette} from './Assets'
import Link from 'next/link'

function Headlist() {
   const [sortedHeads, setSortedHeads] = useState([{sholder: '', assetId: '761630099', src: '/algoHead001.png',bgColorCode: 6,price: 0},
                                                   {sholder: '', assetId: '761631219', src: '/algoHead002.png',bgColorCode: 0,price: 0},
                                                   {sholder: '', assetId: '761633300', src: '/algoHead003.png',bgColorCode: 4,price: 0},
                                                   {sholder: '', assetId: '761637294', src: '/algoHead004.png',bgColorCode: 5,price: 0},
                                                   {sholder: '', assetId: '761639053', src: '/algoHead005.png',bgColorCode: 0,price: 0},
                                                   {sholder: '', assetId: '761639913', src: '/algoHead006.png',bgColorCode: 1,price: 0},
                                                   {sholder: '', assetId: '761641826', src: '/algoHead007.png',bgColorCode: 1,price: 0},
                                                   {sholder: '', assetId: '761643188', src: '/algoHead008.png',bgColorCode: 5,price: 0},
                                                   {sholder: '', assetId: '761644808', src: '/algoHead009.png',bgColorCode: 0,price: 0},
                                                   {sholder: '', assetId: '761645819', src: '/algoHead010.png',bgColorCode: 4,price: 0},
                                                   {sholder: '', assetId: '761646569', src: '/algoHead011.png',bgColorCode: 1,price: 0},
                                                   {sholder: '', assetId: '761647328', src: '/algoHead012.png',bgColorCode: 2,price: 0},
                                                   {sholder: '', assetId: '761648256', src: '/algoHead013.png',bgColorCode: 2,price: 0},
                                                   {sholder: '', assetId: '761649296', src: '/algoHead014.png',bgColorCode: 3,price: 0},
                                                   {sholder: '', assetId: '761650042', src: '/algoHead015.png',bgColorCode: 2,price: 0},
                                                   {sholder: '', assetId: '773795933', src: '/algoHead016.png',bgColorCode: 0,price: 0},
                                                   {sholder: '', assetId: '773796455', src: '/algoHead017.png',bgColorCode: 5,price: 0},
                                                   {sholder: '', assetId: '773797150', src: '/algoHead018.png',bgColorCode: 4,price: 0},
                                                   {sholder: '', assetId: '773797594', src: '/algoHead019.png',bgColorCode: 0,price: 0},
                                                   {sholder: '', assetId: '773798196', src: '/algoHead020.png',bgColorCode: 1,price: 0},
                                                   {sholder: '', assetId: '773798650', src: '/algoHead021.png',bgColorCode: 5,price: 0},
                                                   {sholder: '', assetId: '773799175', src: '/algoHead022.png',bgColorCode: 6,price: 0},
                                                   {sholder: '', assetId: '773799589', src: '/algoHead023.png',bgColorCode: 3,price: 0},
                                                   {sholder: '', assetId: '773800011', src: '/algoHead024.png',bgColorCode: 6,price: 0},
                                                   {sholder: '', assetId: '773800369', src: '/algoHead025.png',bgColorCode: 3,price: 0},
                                                   {sholder: '', assetId: '773801040', src: '/algoHead026.png',bgColorCode: 3,price: 0},
                                                   {sholder: '', assetId: '773802119', src: '/algoHead027.png',bgColorCode: 4,price: 0},
                                                   {sholder: '', assetId: '773802712', src: '/algoHead028.png',bgColorCode: 6,price: 0},
                                                   {sholder: '', assetId: '773803162', src: '/algoHead029.png',bgColorCode: 6,price: 0},
                                                   {sholder: '', assetId: '773803473', src: '/algoHead030.png',bgColorCode: 1,price: 0},
                                                ])

  const [isLoading, setLoading] = useState()
  
  const router = useRouter()

  useEffect(() => {
      if (router.route == '/headlist') {
        setLoading(true)
      fetch('api/nftx')
        .then((res) => res.json())
        .then((data) => {
          data.message.sales.reverse()
          for (var j=0; j < data.message.sales.length; j++) {
            for (var i=0; i < sortedHeads.length; i++) {
              if (data.message.sales[j].nftxUrl.slice(30)*1 == sortedHeads[i].assetId) {
                sortedHeads[i].price = data.message.sales[j].ualgos/1000000
                sortedHeads[i].sholder = data.message.sales[j].receiver
              }
            }
          }
          setLoading(false)
        })
      }
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



  const [colorCode, setColorCode] = useState(sortedHeads[step].bgColorCode)

  useEffect(() => {
    setColorCode(sortedHeads[step].bgColorCode)
  })
  
  const [width, setWidth] = useState(360)
  const [height, setHeight] = useState(640)
  const [normalizedwidth, setNormalizedWidth] = useState(100)

  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
    if (window.innerHeight/window.innerWidth >= 16/9) {
      setNormalizedWidth(100)
    } else {
      setNormalizedWidth((window.innerHeight*900)/(16*window.innerWidth))
    }
  }, [])

  function HeadHolder({top, left, rank, rotation}) {
    if (rank != step-1 && rank < sortedHeads.length) {
      return (
        <motion.div className={styles.headHolder}
          style={{color: darkColorPalette[sortedHeads[rank].bgColorCode],
          top: window.innerHeight/window.innerWidth >= 16/9 ? `${top}vw` : `${top*9/16}vh`,
          left: window.innerHeight/window.innerWidth >= 16/9 ? `${left}vw` : `${left*9/16}vh`}}>
          <motion.div className={rank == step ? styles.firstPriceTag : styles.priceTag}>
            <p className={styles.price}>{sortedHeads[rank].price}</p>
            <motion.div className={styles.algoLogo}>
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
                  19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
                  19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
                  8.8453L18.0006 19.0109Z" fill={lightColorPalette[sortedHeads[rank].bgColorCode]} />
              </svg>
            </motion.div>
          </motion.div>
          <motion.div className={rank == step ? styles.firstRank : styles.rank}
           style={{borderColor: lightColorPalette[sortedHeads[rank].bgColorCode]}}>
            <p>{rank + 1}</p>
          </motion.div>
          <motion.div
            style={{backgroundColor: lightColorPalette[sortedHeads[rank].bgColorCode], transform: `rotate(${rotation}deg)`,
                    }}
            onClick={() => setStep(rank)}
            className={rank == step ? styles.bigFrame : styles.frame}>
            <Image style={{transform: `rotate(${rotation*-1}deg)`}} src={sortedHeads[rank].src} alt={sortedHeads[rank].src.slice(1,12)} layout='fill' />
          </motion.div>
          <motion.div style={rank == step ? {fontSize: '0.8rem', top: window.innerHeight/window.innerWidth >= 16/9 ? '28vw' : '15.75vh'} : null} className={styles.headCard}>
            <p>{sortedHeads[rank].src.slice(1,12)}</p>
          </motion.div>
        </motion.div>
      )
    } else if(rank == step-1) {
      if (sortedHeads[rank+1].price == 0) {
        return (
          <motion.div className={styles.bigHeadHolder}
            style={{color: darkColorPalette[sortedHeads[rank+1].bgColorCode],
            top: window.innerHeight/window.innerWidth >= 16/9 ? `${top}vw` : `${top*9/16}vh`,
            left: window.innerHeight/window.innerWidth >= 16/9 ? `${left}vw` : `${left*9/16}vh`}}>
            <motion.div
              style={{marginLeft: window.innerHeight/window.innerWidth >= 16/9 ? '1vw' : '0.56vh',
              border: `0.125rem solid ${lightColorPalette[sortedHeads[rank+1].bgColorCode]}`}}
              className={styles.nftxLink}>
              <p>Not sold!</p>
            </motion.div>
            <motion.div className={styles.rank}
             style={{color: darkColorPalette[sortedHeads[rank+1].bgColorCode], borderColor: lightColorPalette[sortedHeads[rank+1].bgColorCode]}}>
              <p>{rank + 2}</p>
            </motion.div>
            <motion.div
              style={{backgroundColor: lightColorPalette[sortedHeads[rank+1].bgColorCode] ,
                      transform: `rotate(${rotation}deg)`}}
              className={styles.frame}>
                <motion.div className={styles.secondFrame}></motion.div>
            </motion.div>
          </motion.div>
        )
      } else {
        return (
          <motion.div className={styles.bigHeadHolder}
            style={{color: darkColorPalette[sortedHeads[rank+1].bgColorCode],
            top: window.innerHeight/window.innerWidth >= 16/9 ? `${top}vw` : `${top*9/16}vh`,
            left: window.innerHeight/window.innerWidth >= 16/9 ? `${left}vw` : `${left*9/16}vh`}}>
            <motion.div className={styles.bigPriceTag}>
              <p>Last sold:</p>
              <div>
                <p className={styles.price}>{sortedHeads[rank+1].price}</p>
                <motion.div className={styles.algoLogo}>
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
                      19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
                      19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
                      8.8453L18.0006 19.0109Z" fill={lightColorPalette[sortedHeads[rank+1].bgColorCode]} />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
            <motion.div className={styles.sholderTag}>
              <p>Sholder: </p>
              <Link href={`https://algoexplorer.io/address/${sortedHeads[rank+1].sholder}`} passHref>
                <a target="_blank">
                  <p className={styles.price}>{sortedHeads[rank+1].sholder.slice(0,5)}...</p>
                </a>
              </Link>
            </motion.div>
            <motion.div style={{border: `0.125rem solid ${lightColorPalette[sortedHeads[rank+1].bgColorCode]}`}} className={styles.nftxLink}>
              <Link href={'https://www.nftexplorer.app/asset/'+sortedHeads[rank+1].assetId} passHref>
                <a target='_blank'>
                  <p>see more</p>
                </a>
              </Link>
            </motion.div>
            <motion.div className={styles.rank}
             style={{color: darkColorPalette[sortedHeads[rank+1].bgColorCode], borderColor: lightColorPalette[sortedHeads[rank+1].bgColorCode]}}>
              <p>{rank + 2}</p>
            </motion.div>
            <motion.div
              style={{backgroundColor: lightColorPalette[sortedHeads[rank+1].bgColorCode] ,
                      transform: `rotate(${rotation}deg)`}}
              className={styles.frame}>
                <motion.div className={styles.secondFrame}></motion.div>
            </motion.div>
          </motion.div>
        )
      }
    } else {
      return (
        <motion.div className={styles.headHolder}
          style={{top: window.innerHeight/window.innerWidth >= 16/9 ? `${top}vw` : `${top*9/16}vh`,
          left: window.innerHeight/window.innerWidth >= 16/9 ? `${left}vw` : `${left*9/16}vh`}}>
          <motion.div
            style={rank == sortedHeads.length ?
              {backgroundColor: lightColorPalette[colorCode],
                transform: `rotate(${rotation}deg)`} : {display: 'none'}}
            onClick={() => setStep(0)}
            className={styles.frame}>
            <p className={styles.goBack}
              style={rank == sortedHeads.length ? {color: darkColorPalette[colorCode],transform: `rotate(${-rotation}deg)`} : {display: 'none'}}>Go back top!</p>
          </motion.div>          
        </motion.div>
      )
    }
  }

  // function Shoulder({top, left, shoulder, rank, rotation}) {
  //   const shoulders = [styles.wheelFive, styles.wheelSix, styles.wheelSeven, styles.wheelEight]
  //   return (
  //       <motion.div className={styles.headHolder}
  //         animate={{top: `${rank - step < 4 ? position[6][0] :
  //                           rank - step <= 10 ? position[10 - rank + step][0] :
  //                                              position[0][0]}vw`,
  //                   left: `${rank - step < 4 ? position[6][1] :
  //                           rank - step <= 10 ? position[10 - rank + step][1] :
  //                                             position[0][1]}vw`}}>
  //         <div className={styles.priceTag}>
  //           <p className={styles.price}>{sortedHeads[rank].price}</p>
  //           <div className={styles.algoLogo}>
  //             <motion.svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  //               <path d="M18.0006 19.0109H15.1785L13.3456 12.193L9.40508
  //                 19.0116H6.25445L12.345 8.45714L11.3648 4.79298L3.15215
  //                 19.0139H0L10.408 0.986084H13.1674L14.3757 5.46509H17.2228L15.2789
  //                 8.8453L18.0006 19.0109Z" fill={lightColorPalette[sortedHeads[rank].bgColorCode]} />
  //             </motion.svg>
  //           </div>
  //         </div>
  //         <motion.div animate={{borderColor: lightColorPalette[sortedHeads[rank].bgColorCode]}} className={styles.rank}>
  //           <p>{rank + 1}</p>
  //         </motion.div>
  //         <motion.div
  //           animate={{backgroundColor: lightColorPalette[sortedHeads[rank].bgColorCode],
  //             transform: `rotate(${rank - step < 4 ? position[6][3] :
  //                                 rank - step <= 10 ? position[10 - rank + step][3] :
  //                                                   position[0][3]}deg)`}}
  //           className={styles.frame}>
  //           <Image style={{margin: '2vw',
  //                   transform: `rotate(${rank - step < 4 ? position[6][3]* -1 :
  //                                       rank - step <= 10 ? position[10 - rank + step][3] * -1 :
  //                                                         position[0][3] * -1}deg)`}} src={heads[rank].src} alt={sortedHeads[rank].src.slice(1, 12)} layout='fill' />
  //         </motion.div>
  //         <div className={styles.headCard}>
  //           <p>{sortedHeads[rank].src.slice(1, 12)}</p>
  //         </div>
  //       </motion.div>
  //   )
  // }

  return (
    <div className={styles.headList}
      style={{height: `${normalizedwidth*16/9}vw`,
      width: `${normalizedwidth}vw`}}>
      <motion.div className={styles.navSliderFrame}>
        <NavSlider colorCode={colorCode} />
      </motion.div>
      <motion.div className={styles.wheelHolder}>
        <motion.div className={styles.wheelFive}>
        {step == 0 ?          
          <motion.div style={window.innerWidth > 900 ? {display: 'none'} : null} className={styles.arrowHolder}>
            <motion.div
              onClick={() => router.push('/')}
              className={styles.scrollButton}>
              <MdIcons.MdHomeFilled style={{fontSize: '1rem'}} />
              Tap to go home!
            </motion.div>
            <Image style={{transform: 'rotate(-135deg) scaleX(-1)'}} src={scrollArrowPalette[colorCode]} alt="" layout='fill' />
          </motion.div> : 
          <motion.div className={styles.nextStepsTitle}>
            <motion.div className={styles.title}>
              <h1 style={{color: darkColorPalette[colorCode]}}>Homosapien heads</h1>
            </motion.div>
            <motion.div className={styles.stepCounter}>
              <p>( Phase 1 )</p>
              <p>( Heads {step+1} to {step+10} )</p>
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
                  style={{borderColor: lightColorPalette[colorCode], color: lightColorPalette[colorCode]}}
                  onClick={() => setStep(step-10)}
                  animate={step > 9 ? null : {display: 'none'}}
                  className={styles.step}>
                  <MdIcons.MdOutlineDoubleArrow style={{transform: 'rotate(-90deg)'}} />
                </motion.div>
                <motion.div
                  style={{borderColor: lightColorPalette[colorCode], color: lightColorPalette[colorCode]}}
                  onClick={() => setStep(step-1)}
                  className={styles.step}>
                  <MdIcons.MdPlayArrow style={{fontSize: '0.9rem' ,transform: 'rotate(-90deg)'}} />
                </motion.div>
              </motion.div>
              <Image className={styles.counterArrows} src={arrowPalette[colorCode]} alt="" layout='fill' />
            </motion.div> :
            <motion.div className={styles.firstStepTitle}>
              <h1 style={{color: darkColorPalette[colorCode]}} >Homosapien heads</h1>
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
          <motion.div className={styles.arrowHolder}>
            <motion.div className={styles.stepsForward}>
              <motion.div
                style={{borderColor: lightColorPalette[colorCode], color: lightColorPalette[colorCode]}}
                animate={step+1 < sortedHeads.length ? null : {display: 'none'}}
                onClick={() => setStep(step+1)}
                className={styles.step}>
                <MdIcons.MdPlayArrow style={{fontSize: '0.9rem',transform: 'rotate(90deg)'}} />
              </motion.div>
              <motion.div
                style={{borderColor: lightColorPalette[colorCode], color: lightColorPalette[colorCode]}}
                animate={step+10 < sortedHeads.length ? null : {display: 'none'}}
                onClick={() => setStep(step+10)}
                className={styles.step}>
                <MdIcons.MdOutlineDoubleArrow style={{transform: 'rotate(90deg)'}} />
              </motion.div>
            </motion.div>
            <Image style={{transform: 'rotate(315deg)'}} className={styles.counterArrows} src={arrowPalette[colorCode]} alt="" layout='fill' />
          </motion.div>
          <HeadHolder top={-10} left={46} rank={step + 5} rotation={-102.5} borderRadius={[14,14,14,5]} />
          <HeadHolder top={13} left={70} rank={step + 6} rotation={-67.5} borderRadius={[14,14,14,5]} />
        </motion.div>
        <motion.div className={styles.wheelEight}>
          <motion.div className={styles.sortWheel}>
            <motion.div className={styles.sortDirection}>
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
              Data is fetched from <a style={{borderBottom: `2px solid ${lightColorPalette[colorCode]}`}} href='https://www.nftexplorer.app/collection/algo-heads' target='_blank'>
                nft
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
}

export default Headlist