import React from "react";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";
import { BsPlay, BsPause, BsArrowRepeat } from "react-icons/bs";

const BREAK = "break";
const SESSION = "session";
const INCREMENT = "increment";
const DECREMENT = "decrement";

function Clock255() {
  const audioRef = React.useRef();
  const [clockState, setClockState] = React.useState(SESSION);
  const [isRunCount, setIsRunCount] = React.useState(false);
  const [breakLength, setBreakLength] = React.useState(1);
  const [sessionLength, setSessionLength] = React.useState(3);
  const [timer, setTimer] = React.useState(30); // 25 menit
  const [intervalId, setIntervalId] = React.useState(0);

  if (timer < 0) {
    switchClock();
  }

  function switchClock() {
    if (clockState == SESSION) {
      setClockState(BREAK);
      setTimer(breakLength * 10);
      audioRef.current.play();
    } else if (clockState == BREAK) {
      setClockState(SESSION);
      setTimer(sessionLength * 10);
      audioRef.current.play();
    }
  }

  function runStopCounter() {
    setIsRunCount(!isRunCount);

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }

    const newInvervalId = setInterval(() => {
      setTimer((timer) => {
        let cd = timer - 1;

        return cd;
      });
    }, 1000);

    setIntervalId(newInvervalId);
  }

  function reset() {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    }

    setIsRunCount(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimer(1500);
  }

  function changeTimer(clockType, changing) {
    switch (true) {
      case clockType == BREAK && changing == DECREMENT:
        setTimer((breakLength - 1) * 60);
        break;
      case clockType == BREAK && changing == INCREMENT:
        setTimer((breakLength + 1) * 60);
        break;
      case clockType == SESSION && changing == DECREMENT:
        setTimer((sessionLength - 1) * 60);
        break;
      case clockType == SESSION && changing == INCREMENT:
        setTimer((sessionLength + 1) * 60);
        break;
    }
  }

  function decrement(type) {
    if (!isRunCount) {
      if ((type == BREAK) & (breakLength > 1)) {
        setBreakLength((breakLength) => breakLength - 1);
        changeTimer(BREAK, DECREMENT);
      } else if ((type == SESSION) & (sessionLength > 1)) {
        setSessionLength((sessionLength) => sessionLength - 1);
        changeTimer(SESSION, DECREMENT);
      }
    }
  }

  function increment(type) {
    if (!isRunCount) {
      if ((type == BREAK) & (breakLength < 60)) {
        setBreakLength((breakLength) => breakLength + 1);
        changeTimer(BREAK, INCREMENT);
      } else if ((type == SESSION) & (sessionLength < 60)) {
        setSessionLength((sessionLength) => sessionLength + 1);
        changeTimer(SESSION, INCREMENT);
      }
    }
  }

  function clockify(times) {
    const minutes = Math.floor(times / 60);
    const seconds = times - minutes * 60;

    const time = `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;

    return time;
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>25 + 5 Clock</h2>
      <div
        style={{
          display: "flex",
          gap: 16,
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h3 id="break-label">Break Length</h3>
          <div>
            <HiArrowDown
              id="break-decrement"
              onClick={() => decrement(BREAK)}
            />

            <span id="break-length">{breakLength}</span>
            <HiArrowUp id="break-increment" onClick={() => increment(BREAK)} />
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h3 id="session-label">Session Length</h3>
          <div>
            <HiArrowDown
              id="session-decrement"
              onClick={() => decrement(SESSION)}
            />
            <span id="session-length">{sessionLength}</span>
            <HiArrowUp
              id="session-increment"
              onClick={() => increment(SESSION)}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
        }}
      >
        <h3 id="time-label">{clockState.toUpperCase()}</h3>
        <span id="time-left">{clockify(timer)}</span>
        <div>
          {isRunCount ? (
            <BsPause id="start_stop" onClick={runStopCounter} />
          ) : (
            <BsPlay id="start_stop" onClick={runStopCounter} />
          )}
          <BsArrowRepeat id="reset" onClick={reset} />
        </div>
      </div>

      <audio
        id="beep"
        preload="auto"
        ref={audioRef}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

export default Clock255;
