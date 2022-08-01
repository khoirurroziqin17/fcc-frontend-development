import React from "react";

const bankPad = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const DrumPad = ({ item, setDisplay }) => {
  const audioRef = React.useRef();
  const { keyCode, keyTrigger, id, url } = item;

  return (
    <div
      className="drum-pad"
      style={{
        width: 100,
        height: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ddd",
        borderRadius: 16,
        fontWeight: "bolder",
        fontSize: 28,
        color: "#333",
        cursor: "pointer",
      }}
      onClick={() => {
        audioRef.current.play();
        setDisplay(id);
        setTimeout(() => {
          setDisplay(null);
        }, 500);
      }}
    >
      <audio ref={audioRef} id={keyTrigger} src={url} className="clip" />
      {keyTrigger}
    </div>
  );
};

function DrumpadMachine() {
  const [display, setDisplay] = React.useState(null);

  function renderDisplay() {
    return (
      <div
        id="display"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          backgroundColor: "#eee",
          marginBottom: 16,
          borderRadius: 16,
        }}
      >
        <h2
          style={{
            color: "#333",
          }}
        >
          {display}
        </h2>
      </div>
    );
  }

  function renderDrumPad() {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {bankPad.map((item, index) => (
          <DrumPad
            item={item}
            key={index}
            setDisplay={(val) => setDisplay(val)}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <div
        id="drum-machine"
        style={{
          width: 300 + 8 * 6,
          backgroundColor: "teal",
          padding: 16,
          borderRadius: 20,
        }}
      >
        {/* Display */}
        {renderDisplay()}

        {/* Drum Pad */}
        {renderDrumPad()}
      </div>
    </div>
  );
}

export default DrumpadMachine;
