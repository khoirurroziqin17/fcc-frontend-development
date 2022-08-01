import React from "react";
import RandomQuote from "./pages/RandomQuote";
import MarkdownPreviewer from "./pages/MarkdownPreviewer";
import DrumpadMachine from "./pages/DrumpadMachine";
import Calculator from "./pages/Calculator";
import Clock255 from "./pages/25+5Clock";
import "./App.css";

function App() {
  const QUOTES = "quotes";
  const MARKDOWN = "markdown";
  const DRUM = "drum";
  const CALCULATOR = "calculator";
  const CLOCK = "clock";

  const [active, setActive] = React.useState(QUOTES);

  return (
    <div className="container">
      <ul>
        <li onClick={() => setActive(QUOTES)}>Random Quotes Machine</li>
        <li onClick={() => setActive(MARKDOWN)}>Markdown Previewer</li>
        <li onClick={() => setActive(DRUM)}>Drum Machine</li>
        <li onClick={() => setActive(CALCULATOR)}>Calculator</li>
        <li onClick={() => setActive(CLOCK)}>25 + 5 Clock</li>
      </ul>
      {active == QUOTES && <RandomQuote />}
      {active == MARKDOWN && <MarkdownPreviewer />}
      {active == DRUM && <DrumpadMachine />}
      {active == CALCULATOR && <Calculator />}
      {active == CLOCK && <Clock255 />}
    </div>
  );
}

export default App;
