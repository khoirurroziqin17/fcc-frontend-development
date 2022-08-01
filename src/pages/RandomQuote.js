import React from "react";
import { FaTwitter, FaRandom } from "react-icons/fa";

function RandomQuote() {
  const [qouteData, setQuoteData] = React.useState(null);

  function getQuote() {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((qoute) => setQuoteData(qoute));
  }

  React.useEffect(() => {
    getQuote();
  }, []);

  return (
    <div
      style={{
        height: "75vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!qouteData ? (
        <div>Loading...</div>
      ) : (
        <div
          id="qoute-box"
          style={{
            maxWidth: "80vw",
          }}
        >
          <h3 id="text">"{qouteData.content}"</h3>
          <p
            id="author"
            style={{
              textAlign: "center",
            }}
          >
            - {qouteData.author} -
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <a href="https://www.twitter.com/intent/tweet">
              <FaTwitter color="#333" />
            </a>
            <button
              id="new-quote"
              style={{
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => getQuote()}
            >
              <FaRandom />
              <span
                style={{
                  marginLeft: 4,
                }}
              >
                Random Quote
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RandomQuote;
