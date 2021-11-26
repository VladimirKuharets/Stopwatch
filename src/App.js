import React, {useState, useRef, useEffect} from "react";
import DisplayComponents from './DisplayComponents'
import './App.css';
import { fromEvent,  } from 'rxjs'; 
import { map, buffer, debounceTime, filter } from 'rxjs/operators';


function App() {

  const [time,setTime] = useState(3598);
  const [timer,setTimer] = useState();
  const [status,setStatus] = useState(0);
  
  const start = () => {
    setStatus(1);
    setTimer(setInterval(run, 1000));
  }
  
  const run = () => {
    setTime(time => time + 1);
  }

  const stop = () => {
    clearInterval(timer);
    setStatus(0);
    setTime(0);
  }

  const wait = () => {
    clearInterval(timer);
    setStatus(0);
  }

  const reset = () => {
    clearInterval(timer);
    setTime(0);
    start()
  }
  
  const WaitBtnRef = useRef(null);

    
  
    useEffect(() => {
      const mouse$ = fromEvent(WaitBtnRef.current, 'click');
    
      const buff$ = mouse$.pipe(
        debounceTime(300),
      )
      
      const click$ = mouse$.pipe(
        buffer(buff$),
        map(list => {
          return list.length;
        }),
        filter(x => x === 2),
      )
      
      click$.subscribe(() => {
        wait()
      })
    });

  let startStopButton;
  if (status === 0) {
      startStopButton = <button className="stopwatch-btn stopwatch-btn-gre"
      onClick={start}
      >Start</button> 
  } else {
      startStopButton = <button className="stopwatch-btn stopwatch-btn-gre"
      onClick={stop}
      >Stop</button> 
  }
 
  return (
    <div className="main-section">
      <div className = 'clock-holder'>
        <div className = 'stopwatch'>
          <DisplayComponents time = {time}/>
          <div>
            {startStopButton}
            <button className="stopwatch-btn stopwatch-btn-yel double-click" ref={WaitBtnRef}>Wait</button>
            <button className="stopwatch-btn stopwatch-btn-red" onClick = {reset}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
