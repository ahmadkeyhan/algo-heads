import narrowStyles from '../styles/roadmap.module.css'
import wideStyles from '../styles/roadmapWide.module.css'
import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import {lightColorPalette, darkColorPalette} from '../components/colorPalette'
import Image from 'next/image'

function Roadmap() {
    const [activeTheme, setActiveTheme] = useState('light')

    const [step, setStep] = useState(1)

    const [tasks, setTasks] = useState()
    const [isLoading, setLoading] = useState()
    useEffect(() => {
        setLoading(true)
        console.log('loading')
        fetch('api/tasks')
          .then((res) => res.json())
          .then((data) => {
            setTasks(data.message)
            setLoading(false)
            console.log('done loading')
          })
    }, [])

    var now = new Date()

    const colorCode = 4
    
    const angles = [0,1,2,3,4,5,6]
    const moreAngles = [0,1,2,3,4,5,6,7]

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


    if (!tasks) {
        var weekStart = new Date('Sat Jun 04 2022 00:00:00')
        return (
            <div className={styles.roadmap}
                style={{height: `${normalizedwidth*16/9}vw`,
                width: `${normalizedwidth}vw`
                }}>
                <motion.div className={styles.wheelHolder}>
                    <motion.div className={styles.wheel1}>
                        <motion.div
                            style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*Math.sin(Math.PI/10)}vw` : `${24.47*Math.sin(Math.PI/10)}vh`,
                                left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1+Math.cos(Math.PI/10))}vw` : `${24.47*(1+Math.cos(Math.PI/10))}vh`,
                                borderColor: darkColorPalette[colorCode],
                                color: activeTheme==='light'? darkColorPalette[colorCode] : lightColorPalette[colorCode]}}
                            className={styles.phaseHolder}>
                            <h2>Week {step*3+1}</h2>
                        </motion.div>
                        {angles.map((index) => {
                            var date = new Date(weekStart*1 + (6+step*23-index)*24*3600000)
                            return(
                                <motion.div key={index}
                                    style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*Math.sin(Math.PI/8+(Math.PI/12)*(index+1))}vw` : `${24.47*Math.sin(Math.PI/8+(Math.PI/12)*(index+1))}vh`,
                                        left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1+Math.cos(Math.PI/8+(Math.PI/12)*(index+1)))}vw` : `${24.47*(1+Math.cos(Math.PI/8+(Math.PI/12)*(index+1)))}vh`,
                                        color: date.getDate()==now.getUTCDate() && date.getMonth()==now.getUTCMonth() ? '#fff' : activeTheme==='light'? darkColorPalette[colorCode] : '#dfdfdf',
                                        backgroundColor: date.getDate()==now.getUTCDate() && date.getMonth()==now.getUTCMonth() ? lightColorPalette[colorCode] : null}}
                                    className={styles.dateHolder}>
                                    <p>{date.getDate()}</p>
                                </motion.div>
                            )
                        })}
                        {step==0 && <h3 style={{color: lightColorPalette[colorCode]}}>June</h3>}
                    </motion.div>
                    <motion.div className={styles.wheel2}>
                        <motion.div
                            style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1+Math.cos(Math.PI/10+Math.PI/12))}vw` : `${24.47*(1+Math.cos(Math.PI/10+Math.PI/12))}vh`,
                                left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1-Math.sin(Math.PI/10+Math.PI/12))}vw` : `${24.47*(1-Math.sin(Math.PI/10+Math.PI/12))}vh`,
                                borderColor: darkColorPalette[colorCode],
                                color: activeTheme==='light'? darkColorPalette[colorCode] : lightColorPalette[colorCode]}}
                            className={styles.phaseHolder}>
                            <h2>Week {2+step*3}</h2>
                        </motion.div>
                        {moreAngles.map((index) => {
                            var date = new Date(weekStart*1 + (14+step*23-index)*24*3600000)
                            return(
                                <motion.div key={index}
                                    style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1+Math.cos(Math.PI/8+(Math.PI/12)*(index+2)))}vw` : `${24.47*(1+Math.cos(Math.PI/8+(Math.PI/12)*(index+2)))}vh`,
                                        left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1-Math.sin(Math.PI/8+(Math.PI/12)*(index+2)))}vw` : `${24.47*(1-Math.sin(Math.PI/8+(Math.PI/12)*(index+2)))}vh`,
                                        color: date.getDate()==now.getUTCDate() && date.getMonth()==now.getUTCMonth() ? '#fff' : activeTheme==='light'? darkColorPalette[colorCode] : '#dfdfdf',
                                        backgroundColor: date.getDate()==now.getUTCDate() && date.getMonth()==now.getUTCMonth() ? lightColorPalette[colorCode] : null}}
                                    className={styles.dateHolder}>
                                    <p>{date.getDate()}</p>
                                </motion.div>
                            )
                        })}
                        {step == 1 && <h3 style={{color: lightColorPalette[colorCode]}}>July</h3>}
                    </motion.div>
                    {step != 2 ?
                        <motion.div className={styles.wheel3}>
                            
                            <motion.div
                                style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1-Math.cos(Math.PI/10+Math.PI/12))}vw` : `${24.47*(1-Math.cos(Math.PI/10+Math.PI/12))}vh`,
                                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*Math.sin(Math.PI/10+Math.PI/12)}vw` : `${24.47*Math.sin(Math.PI/10+Math.PI/12)}vh`,
                                    borderColor: darkColorPalette[colorCode],
                                    color: activeTheme==='light'? darkColorPalette[colorCode] : lightColorPalette[colorCode]}}
                                className={styles.phaseHolder}>
                                <h2 >Week {3+step*3}</h2>
                            </motion.div>
                            {moreAngles.map((index) => {
                                average = 0
                                var date = new Date(weekStart*1 + (index+15+step*23)*24*3600000)
                                return(
                                    <motion.div key={index}
                                        style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1-Math.cos(Math.PI/8+(Math.PI/12)*(index+2)))}vw` : `${24.47*(1-Math.cos(Math.PI/8+(Math.PI/12)*(index+2)))}vh`,
                                            left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*Math.sin(Math.PI/8+(Math.PI/12)*(index+2))}vw` : `${24.47*Math.sin(Math.PI/8+(Math.PI/12)*(index+2))}vh`,
                                            color: date.getDate()==now.getUTCDate() && date.getMonth()==now.getUTCMonth() ? '#fff' : activeTheme==='light'? darkColorPalette[colorCode] : '#dfdfdf',
                                            backgroundColor: date.getDate()==now.getUTCDate() && date.getMonth()==now.getUTCMonth() ? lightColorPalette[colorCode] : null}}
                                        className={styles.dateHolder}>
                                        <p>{date.getDate()}</p>
                                    </motion.div>
                                )
                            })}
                        </motion.div> : 
                        <motion.div className={styles.wheel3}>
                            <motion.div
                                style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                                        `${43.5*(1-Math.cos(Math.PI/10+10.5*Math.PI/12))}vw` :
                                        `${24.47*(1-Math.cos(Math.PI/10+10.5*Math.PI/12))}vh`,
                                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                                        `${43.5*Math.sin(Math.PI/10+10.5*Math.PI/12)}vw` :
                                        `${24.47*Math.sin(Math.PI/10+10.5*Math.PI/12)}vh`,
                                    border: 'none',
                                    color: activeTheme==='light'?
                                        darkColorPalette[colorCode] : lightColorPalette[colorCode]}}
                                className={styles.phaseHolder}>
                                <h1>Vision</h1>
                            </motion.div>
                            {moreAngles.map((index) => {
                                average = 0
                                var date = new Date(weekStart*1 + (index+15+step*23)*24*3600000)
                                if (index<4) {
                                    return(
                                        <motion.div key={index}
                                            style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1-Math.cos(Math.PI/8+(Math.PI/12)*(index+2)))}vw` : `${24.47*(1-Math.cos(Math.PI/8+(Math.PI/12)*(index+2)))}vh`,
                                                left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*Math.sin(Math.PI/8+(Math.PI/12)*(index+2))}vw` : `${24.47*Math.sin(Math.PI/8+(Math.PI/12)*(index+2))}vh`,
                                                color: date.getDate()==now.getUTCDate() && date.getMonth()==now.getUTCMonth() ? '#fff' : activeTheme==='light'? darkColorPalette[colorCode] : '#dfdfdf',}}
                                            className={styles.dateHolder}>
                                            <p>{date.getDate()}</p>
                                        </motion.div>
                                    )
                                } else {
                                    return(
                                        <motion.div key={index}
                                            style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1-Math.cos(Math.PI/8+(Math.PI/12)*(index+2)))}vw` : `${24.47*(1-Math.cos(Math.PI/8+(Math.PI/12)*(index+2)))}vh`,
                                                left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*Math.sin(Math.PI/8+(Math.PI/12)*(index+2))}vw` : `${24.47*Math.sin(Math.PI/8+(Math.PI/12)*(index+2))}vh`,
                                                color: date.getDate()==now.getUTCDate() && date.getMonth()==now.getUTCMonth() ? '#fff' : activeTheme==='light'? darkColorPalette[colorCode] : '#dfdfdf',
                                                backgroundColor: date.getDate()==now.getUTCDate() && date.getMonth()==now.getUTCMonth() ? lightColorPalette[colorCode] : null}}
                                            className={styles.dateHolder}>
                                            <p>{'AHS!'[index-4]}</p>
                                        </motion.div>
                                    )
                                }
                            })}
                            <h3 style={{color: lightColorPalette[colorCode]}}>August</h3>
                        </motion.div>
                    }
                    <motion.div className={styles.wheel4}>
                        <motion.div className={styles.loadHolder}
                            style={{color: lightColorPalette[colorCode]}}>
                            <h3>wait...</h3>
                            <Image src='/headSpinDemo.gif' layout='fill'/>
                            <p>till the head is gettin' heavy!</p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
    )}
    
    var average = 0
    if (tasks) {
        var weekStart = new Date('Sat Jun 04 2022 01:00:00')
        tasks.map((task) => {
            var date = new Date(task.date)  
            task.date = Math.floor((date - weekStart)/(24*3600000))      
        })
        tasks.sort(function(a,b) {
            return b.date - a.date
        })
        return (
            <div className={styles.roadmap}
                style={{height: `${normalizedwidth*16/9}vw`,
                width: `${normalizedwidth}vw`
                }}>
                <motion.div className={styles.wheelHolder}>
                    <motion.div className={styles.wheel1}>
                        {tasks.filter((task) => task.date < 7 + 23*step && task.date > 23*step - 1).map((task) => {
                            average += task.done/3
                            return(
                                <motion.div key={task.id} className={styles.task}>
                                    <h2 style={{color: lightColorPalette[(colorCode+task.type+1)%7]}}>
                                        {task.title}
                                    </h2>
                                    <p style={{color: activeTheme==='light'? darkColorPalette[(colorCode+task.type+1)%7] : '#dfdfdf'}}>
                                        {task.brief}
                                    </p>
                                    <motion.div className={styles.done}>
                                        <p style={{color: lightColorPalette[(colorCode+task.type+1)%7]}}>
                                            {!task.done ? '~' : task.done < 100 ? `${task.done}%` : '✓✓'}
                                        </p>
                                        <motion.div className={styles.doneSlider}
                                            style={task.done%100==0 ? {display: 'none'}:{borderColor: lightColorPalette[(colorCode+task.type+1)%7]}}>
                                            <motion.div
                                                className={styles.doneSlide} 
                                                style={{width: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${task.done*0.1}vw` : `${task.done*0.06}vh` ,
                                                backgroundColor: lightColorPalette[(colorCode+task.type+1)%7]}} />
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            )
                        })}
                        {tasks.filter(task => task.date < 7 + 23*step && task.date > 23*step - 1).map((task) => {
                            if(task.type != 2) {
                                return(
                                    <motion.div key={task.id} className={styles.dateCatcher}
                                        style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                                                `${43.5*Math.sin(Math.PI/8+(Math.PI/12)*(7+23*step-task.date))}vw` :
                                                `${24.47*Math.sin(Math.PI/8+(Math.PI/12)*(7+23*step-task.date))}vh`,
                                            left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                                                `${43.5*(1+Math.cos(Math.PI/8+(Math.PI/12)*(7+23*step-task.date)))}vw` :
                                                `${24.47*(1+Math.cos(Math.PI/8+(Math.PI/12)*(7+23*step-task.date)))}vh`,
                                            borderColor: lightColorPalette[colorCode+task.type+1]}}>
                                    </motion.div>
                                )
                            }
                        })}
                        <motion.div
                            style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*Math.sin(Math.PI/10)}vw` : `${24.47*Math.sin(Math.PI/10)}vh`,
                                left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1+Math.cos(Math.PI/10))}vw` : `${24.47*(1+Math.cos(Math.PI/10))}vh`,
                                borderColor: darkColorPalette[colorCode],
                                color: activeTheme==='light'? darkColorPalette[colorCode] : lightColorPalette[colorCode]}}
                            className={styles.phaseHolder}>
                            <h2>Week {1+step*3}</h2>
                            <motion.div className={styles.doneAverage}>
                                <motion.div className={styles.doneSlider}
                                    style={Math.floor(average)==0 ? {display: 'none'}:{borderColor: lightColorPalette[(colorCode)%7]}}>
                                    <motion.div
                                        className={styles.doneSlide}
                                        style={{width:  window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${average*0.1}vw` : `${average*0.06}vh`,
                                        backgroundColor: lightColorPalette[(colorCode)%7]}} />
                                </motion.div>
                                <p style={{color:activeTheme==='light'? darkColorPalette[colorCode] : lightColorPalette[colorCode]}}>
                                    {!average ? '~' : average < 100 ? `${Math.floor(average)}%` : '✓✓'}
                                </p>
                            </motion.div>
                        </motion.div>
                        {angles.map((index) => {
                            average = 0
                            var date = new Date(weekStart*1 + (6 + step*23 - index)*24*3600000)
                            return(
                                <motion.div key={index}
                                    style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*Math.sin(Math.PI/8+(Math.PI/12)*(index+1))}vw` : `${24.47*Math.sin(Math.PI/8+(Math.PI/12)*(index+1))}vh`,
                                        left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1+Math.cos(Math.PI/8+(Math.PI/12)*(index+1)))}vw` : `${24.47*(1+Math.cos(Math.PI/8+(Math.PI/12)*(index+1)))}vh`,
                                        color: date.getDate()==now.getUTCDate() && date.getMonth()==now.getUTCMonth() ? '#fff' : activeTheme==='light'? darkColorPalette[colorCode] : '#dfdfdf',
                                        backgroundColor: date.getDate()==now.getUTCDate() && date.getMonth()==now.getUTCMonth() ? lightColorPalette[colorCode] : null}}
                                    className={styles.dateHolder}>
                                    <p>{date.getDate()}</p>
                                </motion.div>
                            )
                        })}
                        {step===0 && <h3 style={{color: lightColorPalette[colorCode]}}>June</h3>}
                    </motion.div>
                    <motion.div className={styles.wheel2}>
                        {tasks.filter(task => task.date < 15 + step*23 && task.date > 6 + step*23).map((task) => {
                            average += task.done/3
                                return(
                                    <motion.div key={task.id} className={styles.task}>
                                        <h2 style={{color: lightColorPalette[(colorCode+task.type+1)%7]}}>
                                            {task.title}
                                        </h2>
                                        <p style={{color: activeTheme==='light'? darkColorPalette[(colorCode+task.type+1)%7] : '#dfdfdf'}}>
                                            {task.brief}
                                        </p>
                                        <motion.div className={styles.done}>
                                            <p style={{color: lightColorPalette[(colorCode+task.type+1)%7]}}>
                                                {!task.done ? '~' : task.done < 100 ? `${task.done}%` : '✓✓'}
                                            </p>
                                            <motion.div className={styles.doneSlider}
                                                style={task.done%100==0 ? {display: 'none'}:{borderColor: lightColorPalette[(colorCode+task.type+1)%7]}}>
                                                <motion.div
                                                    style={{width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?  `${task.done*0.1}vw` : `${task.done*0.06}vh`,
                                                    backgroundColor: lightColorPalette[(colorCode+task.type+1)%7]}}
                                                    className={styles.doneSlide} />
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                )
                        })}
                        {tasks.filter(task => task.date < 15 + step*23 && task.date > 6 + step*23).map((task) => {
                            if (task.type != 2) {
                                return(
                                    <motion.div key={task.id} className={styles.dateCatcher}
                                        style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                                                `${43.5*(1+Math.cos(Math.PI/8+(Math.PI/12)*(16+step*23-task.date)))}vw` :
                                                `${24.47*(1+Math.cos(Math.PI/8+(Math.PI/12)*(16+step*23-task.date)))}vh`,
                                            left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                                                `${43.5*(1-Math.sin(Math.PI/8+(Math.PI/12)*(16+step*23-task.date)))}vw` :
                                                `${24.47*(1-Math.sin(Math.PI/8+(Math.PI/12)*(16+step*23-task.date)))}vh`,
                                            borderColor: lightColorPalette[colorCode+task.type+1]}}>
                                    </motion.div>
                                )
                            }
                        })}
                        <motion.div
                            style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1+Math.cos(Math.PI/10+Math.PI/12))}vw` : `${24.47*(1+Math.cos(Math.PI/10+Math.PI/12))}vh`,
                                left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1-Math.sin(Math.PI/10+Math.PI/12))}vw` : `${24.47*(1-Math.sin(Math.PI/10+Math.PI/12))}vh`,
                                borderColor: darkColorPalette[colorCode],
                                color: activeTheme==='light'? darkColorPalette[colorCode] : lightColorPalette[colorCode]}}
                            className={styles.phaseHolder}>
                            <h2>Week {2+step*3}</h2>
                            <motion.div className={styles.doneAverage}>
                                <motion.div className={styles.doneSlider}
                                    style={average==0 ? {display: 'none'}:{borderColor: lightColorPalette[(colorCode)%7]}}>
                                    <motion.div
                                        style={{width: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${average*0.1}vw` : `${average*0.06}vh`,
                                        backgroundColor: lightColorPalette[(colorCode)%7]}}
                                        className={styles.doneSlide} />
                                </motion.div>
                                <p style={{color:activeTheme==='light'? darkColorPalette[colorCode]: lightColorPalette[colorCode]}}>
                                    {!average ? '~' : average < 100 ? `${Math.floor(average)}%` : '✓✓'}
                                </p>
                            </motion.div>
                        </motion.div>
                        {moreAngles.map((index) => {
                            average = 0
                            var date = new Date(weekStart*1 + (14+step*23-index)*24*3600000)
                            return(
                                <motion.div key={index}
                                    style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1+Math.cos(Math.PI/8+(Math.PI/12)*(index+2)))}vw` : `${24.47*(1+Math.cos(Math.PI/8+(Math.PI/12)*(index+2)))}vh`,
                                        left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1-Math.sin(Math.PI/8+(Math.PI/12)*(index+2)))}vw` : `${24.47*(1-Math.sin(Math.PI/8+(Math.PI/12)*(index+2)))}vh`,
                                        color: date.getDate()==now.getUTCDate() && date.getMonth()==now.getUTCMonth() ? '#fff' : activeTheme==='light'? darkColorPalette[colorCode] : '#dfdfdf',
                                        backgroundColor: date.getDate()==now.getUTCDate() && date.getMonth()==now.getUTCMonth() ? lightColorPalette[colorCode] : null}}
                                    className={styles.dateHolder}>
                                    <p>{date.getDate()}</p>
                                </motion.div>
                            )
                        })}
                        {step===1 && <h3 style={{color: lightColorPalette[colorCode]}}>July</h3>}
                    </motion.div>
                    {step != 2 ?
                        <motion.div className={styles.wheel3}>
                            {tasks.filter(task => task.date < 23 + step*23 && task.date > 14 + step*23).map((task) => {
                                average += task.done/3
                                    return(
                                        <motion.div key={task.id} className={styles.task}>
                                            <h2 style={{color: lightColorPalette[(colorCode+task.type+1)%7]}}>
                                                {task.title}
                                            </h2>
                                            <p style={{color: activeTheme==='light'? darkColorPalette[(colorCode+task.type+1)%7] : '#dfdfdf'}}>
                                                {task.brief}
                                            </p>
                                            <motion.div className={styles.done}>
                                                <p style={{color: lightColorPalette[(colorCode+task.type+1)%7]}}>
                                                    {!task.done ? '~' : task.done < 100 ? `${task.done}%` : '✓✓'}
                                                </p>
                                                <motion.div className={styles.doneSlider}
                                                    style={task.done%100==0 ? {display: 'none'}:{borderColor: lightColorPalette[(colorCode+task.type+1)%7]}}>
                                                    <motion.div
                                                        style={{width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?  `${task.done*0.1}vw` : `${task.done*0.06}vh`,
                                                        backgroundColor: lightColorPalette[(colorCode+task.type+1)%7]}}
                                                        className={styles.doneSlide} />
                                                </motion.div>
                                            </motion.div>
                                        </motion.div>
                                    )
                            })}
                            {tasks.filter(task => task.date < 23 + step*23 && task.date > 14 + step*23).map((task) => {
                                if (task.type != 2) {
                                    return(
                                        <motion.div key={task.id} className={styles.dateCatcher}
                                            style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                                                    `${43.5*(1-Math.cos(Math.PI/8+(Math.PI/12)*(task.date-(13+step*23))))}vw` :
                                                    `${24.47*(1-Math.cos(Math.PI/8+(Math.PI/12)*(task.date-(13+step*23))))}vh`,
                                                left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                                                    `${43.5*Math.sin(Math.PI/8+(Math.PI/12)*(task.date-(13+step*23)))}vw` :
                                                    `${24.47*Math.sin(Math.PI/8+(Math.PI/12)*(task.date-(13+step*23)))}vh`,
                                                borderColor: lightColorPalette[colorCode+task.type+1]}}>
                                        </motion.div>
                                    )
                                }
                            })}
                            <motion.div
                                style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1-Math.cos(Math.PI/10+Math.PI/12))}vw` : `${24.47*(1-Math.cos(Math.PI/10+Math.PI/12))}vh`,
                                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*Math.sin(Math.PI/10+Math.PI/12)}vw` : `${24.47*Math.sin(Math.PI/10+Math.PI/12)}vh`,
                                    borderColor: darkColorPalette[colorCode],
                                    color: activeTheme==='light'? darkColorPalette[colorCode] : lightColorPalette[colorCode]}}
                                className={styles.phaseHolder}>
                                <h2 >Week {3+step*3}</h2>
                                <motion.div className={styles.doneAverage}>
                                    <motion.div className={styles.doneSlider}
                                        style={average==0 ? {display: 'none'}:{borderColor: lightColorPalette[colorCode]}}>
                                        <motion.div
                                            style={{width: window.visualViewport.height/window.visualViewport.width >= 16/9 ?  `${average*0.1}vw` : `${average*0.06}vh`,
                                            backgroundColor: lightColorPalette[(colorCode)%7]}}
                                            className={styles.doneSlide} />
                                    </motion.div>
                                    <p style={{color: activeTheme==='light'? darkColorPalette[colorCode] : lightColorPalette[colorCode]}}>
                                        {!average ? '~' : average < 100 ? `${Math.floor(average)}%` : '✓✓'}
                                    </p>
                                </motion.div>
                            </motion.div>
                            {moreAngles.map((index) => {
                                average = 0
                                var date = new Date(weekStart*1 + (index+15+step*23)*24*3600000)
                                return(
                                    <motion.div key={index}
                                        style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1-Math.cos(Math.PI/8+(Math.PI/12)*(index+2)))}vw` : `${24.47*(1-Math.cos(Math.PI/8+(Math.PI/12)*(index+2)))}vh`,
                                            left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*Math.sin(Math.PI/8+(Math.PI/12)*(index+2))}vw` : `${24.47*Math.sin(Math.PI/8+(Math.PI/12)*(index+2))}vh`,
                                            color: date.getDate()==now.getUTCDate() && date.getMonth()==now.getUTCMonth() ? '#fff' : activeTheme==='light'? darkColorPalette[colorCode] : '#dfdfdf',
                                            backgroundColor: date.getDate()==now.getUTCDate() && date.getMonth()==now.getUTCMonth() ? lightColorPalette[colorCode] : null}}
                                        className={styles.dateHolder}>
                                        <p>{date.getDate()}</p>
                                    </motion.div>
                                )
                            })}
                        </motion.div> : 
                        <motion.div className={styles.wheel3}>
                            <motion.div
                                style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                                        `${43.5*(1-Math.cos(Math.PI/10+10.5*Math.PI/12))}vw` :
                                        `${24.47*(1-Math.cos(Math.PI/10+10.5*Math.PI/12))}vh`,
                                    left: window.visualViewport.height/window.visualViewport.width >= 16/9 ?
                                        `${43.5*Math.sin(Math.PI/10+10.5*Math.PI/12)}vw` :
                                        `${24.47*Math.sin(Math.PI/10+10.5*Math.PI/12)}vh`,
                                    border: 'none',
                                    color: activeTheme==='light'?
                                        darkColorPalette[colorCode] : lightColorPalette[colorCode]}}
                                className={styles.phaseHolder}>
                                <h1>Vision</h1>
                            </motion.div>
                            {moreAngles.map((index) => {
                                average = 0
                                var date = new Date(weekStart*1 + (index+15+step*23)*24*3600000)
                                if (index<4) {
                                    return(
                                        <motion.div key={index}
                                            style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1-Math.cos(Math.PI/8+(Math.PI/12)*(index+2)))}vw` : `${24.47*(1-Math.cos(Math.PI/8+(Math.PI/12)*(index+2)))}vh`,
                                                left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*Math.sin(Math.PI/8+(Math.PI/12)*(index+2))}vw` : `${24.47*Math.sin(Math.PI/8+(Math.PI/12)*(index+2))}vh`,
                                                color: date.getDate()==now.getUTCDate() && date.getMonth()==now.getUTCMonth() ? '#fff' : activeTheme==='light'? darkColorPalette[colorCode] : '#dfdfdf',}}
                                            className={styles.dateHolder}>
                                            <p>{date.getDate()}</p>
                                        </motion.div>
                                    )
                                } else {
                                    return(
                                        <motion.div key={index}
                                            style={{top: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*(1-Math.cos(Math.PI/8+(Math.PI/12)*(index+2)))}vw` : `${24.47*(1-Math.cos(Math.PI/8+(Math.PI/12)*(index+2)))}vh`,
                                                left: window.visualViewport.height/window.visualViewport.width >= 16/9 ? `${43.5*Math.sin(Math.PI/8+(Math.PI/12)*(index+2))}vw` : `${24.47*Math.sin(Math.PI/8+(Math.PI/12)*(index+2))}vh`,
                                                color: date.getDate()==now.getUTCDate() && date.getMonth()==now.getUTCMonth() ? '#fff' : activeTheme==='light'? darkColorPalette[colorCode] : '#dfdfdf',
                                                backgroundColor: date.getDate()==now.getUTCDate() && date.getMonth()==now.getUTCMonth() ? lightColorPalette[colorCode] : null}}
                                            className={styles.dateHolder}>
                                            <p>{'AHS!'[index-4]}</p>
                                        </motion.div>
                                    )
                                }
                            })}
                            <h3 style={{color: lightColorPalette[colorCode]}}>August</h3>
                        </motion.div>
                    }
                </motion.div>
            </div>
    )
}
}

export default Roadmap