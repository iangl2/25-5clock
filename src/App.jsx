import { useState} from 'react'
import { useEffect } from 'react';
import './App.css'
import './font-awesome-4.7.0/css/font-awesome.css'
import sound from "./assets/audio.mp3";

const defaultBreakTime = 5 * 60;
const defaultSessionTime = 25 * 60;
const interval= 60;
const max= 60*60;
const min=60;

function App() {
  const [timeBreak,setBreak]=useState(defaultBreakTime);
  const [timeSession,setSession]=useState(defaultSessionTime);
  const [timeLeft, setTime]=useState(timeSession);
  const [startStopIcon,setStartStopIcon]=useState('fa fa-play fa-2x');
  const [timeRunning, setTimeRunning]=useState(false);
  const [sessionBreak,setSessionBreak]=useState('Session');
 
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes.toString() : minutes.toString()}:${seconds < 10 ? "0" + seconds.toString() : seconds.toString()}`;
  };
  


  useEffect(() => {
   let timerID;
    if (!timeRunning) return;
    if (timeRunning) {
       timerID= setInterval(() => {
        setTime(timeLeft => timeLeft  -1);
      }, 1000);
    }
    return () => {
      clearInterval(timerID);
      console.log("OFF");
    };
  }, [timeRunning]);

  useEffect(() => {
    if (timeLeft < 0) {
      document.getElementById('beep').play();
      if(sessionBreak==='Session'){
        setSessionBreak('Break');
        setTime(timeBreak);
      }
      else{
        setSessionBreak('Session');
        setTime(timeSession);
      }
     
    }
  }, [timeLeft, timeBreak, timeSession,sessionBreak]);
  
  const manageTriangles= (type) => {
    if(!timeRunning){
      if(timeSession>min&&type==='session-decrement'){
        setSession(timeSession-interval);
        setTime(timeSession-interval);
      }
      else if(timeBreak>min&&type==='break-decrement'){
        setBreak(timeBreak-interval);
      }
      else if(timeSession<max&&type==='session-increment'){
        setSession(timeSession+interval);
        setTime(timeSession+interval);
      }
      else if(timeBreak<max&&type==='break-increment'){
        setBreak(timeBreak+interval);
      }
    }
   
    
    
   

  };  




  const reset = () => {
    setBreak(defaultBreakTime);
    setSession(defaultSessionTime);
    setTime(defaultSessionTime);
    setStartStopIcon('fa fa-play fa-2x');
    setSessionBreak('Session');
    setTimeRunning(false);
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
    
  }
  const manageStartStop = () =>{
    if(timeRunning){
      setStartStopIcon('fa fa-play fa-2x');
      setTimeRunning(false);
    }
    else{
      setStartStopIcon('fa fa-pause fa-2x');
      setTimeRunning(true);
   
        }
    
  }


  return (
    <>
   <div className='clock'>
    <div className='setter'>
   <div id='break-div'>
     <div className='controls'>
     
     <div className='up-down'>
    <div id='break-increment' className='increment' onClick={(e)=>manageTriangles(e.target.id)}></div>
    <div id='break-decrement' className='decrement' onClick={(e)=>manageTriangles(e.target.id)}></div>
    </div>

    <h3 id='break-label'>Break Length</h3>
   
    </div>

    <h2 id='break-length'>{timeBreak/interval}</h2>
    </div>
    <div id='session-div'>
    <div className='controls'>
    
    <div className='up-down'>
    <div id='session-increment' className='increment'  onClick={(e)=>manageTriangles(e.target.id)}></div>
    <div id='session-decrement'className='decrement' onClick={(e)=>manageTriangles(e.target.id)}></div>
    </div>

    <h3 id='session-label'>Session Length</h3>
    
   
    </div>
    <h2 id='session-length'>{timeSession/interval}</h2>
    </div>
    </div>
    
    <h3 id='timer-label'>{sessionBreak}</h3>
   
    <h2 id='time-left'>{formatTime(timeLeft)}</h2>
   
   <div id='control-timer'className='controls'>
    <div id="start_stop">
      <i className={startStopIcon} onClick={manageStartStop}></i>
    </div>
    <div id="reset" onClick={reset}><i className="fa fa-refresh fa-2x" ></i></div>
    </div>

    <audio id="beep" src={sound} />

    </div>
    </>
  )
}

export default App
