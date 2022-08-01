import React from "react";

const padSize = 80;

function Calculator() {
  const [input, setInput] = React.useState([0]);
  const [disabled, setDisabled] = React.useState(false);
  const [disabledEquals, setDisabledEquals] = React.useState(false);
  const [parentheses, setParentheses] = React.useState(false);
  const [result, setResult] = React.useState(false);
  const [chainInput, setChainInput] = React.useState([]);

  React.useEffect(() => {
    if (parentheses) {
      setDisabledEquals(true);
    }
  }, [input, parentheses]);

  function renderDisplay() {
    return (
      <div
        id="display"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          backgroundColor: "#ddd",
          marginBottom: 2,
          paddingRight: 16,
          borderRadius: 4,
          fontSize: 20,
          border: `2px solid #ccc`,
        }}
      >
        <span style={{ paddingTop: 6, paddingBottom: 6 }}>{chainInput}</span>
        <span style={{ paddingTop: 6, paddingBottom: 6 }}>{input}</span>
      </div>
    );
  }

  function keypadPress(item) {
    // Clear Perhitungan
    if (result) {
      if (item.id == "clear") {
        setInput([0]);
        setChainInput([]);
      } else {
        setInput([item.label]);
        setChainInput([...input, item.label]);
      }
      setResult(false);
    } else if (item.id == "clear") {
      setInput([0]);
      setChainInput([]);
      setParentheses(false);
      setDisabledEquals(false);

      // Hasil Perhitungan
    } else if (item.id == "equals") {
      // Jika belum ada perhutingan
      if (chainInput.length <= 0) {
        setInput("tidak ada perhitungan");
        setDisabled(true);
        setDisabledEquals(true);
        setTimeout(() => {
          setInput([0]);
          setDisabled(false);
          setDisabledEquals(false);
        }, 1000);
      } else {
        const chainInputStr = chainInput.join("");
        const hasil = Function(`return ${chainInputStr}`)();
        setInput([hasil]);
        setChainInput([...chainInput, "=", hasil]);
        setResult(true);
      }

      // Jika mengklik dot ketika sudah ada
    } else if ((item.id == "decimal") & chainInput.includes(".")) {
      console.log("ada decimal");

      // Angka pertama Nol
    } else if ([0].includes(input[0])) {
      // Jika mengklik dot
      if (item.id == "decimal") {
        setInput(["0", "."]);
        console.log("decimal");
        setChainInput([...chainInput, "0", item.label]);
      } else if (input.length <= 1) {
        // Jika mengklik angka Nol ketika sudah ada Nol
        if (item.id == "zero") {
          console.log("angka 0");

          // Jika Operasi hitung diawal
        } else if (
          ["add", "subtract", "multiply", "divide"].includes(item.id)
        ) {
          console.log("operasi hitung tidak boleh diawal");
        } else {
          setInput([item.label]);
          setChainInput([...chainInput, item.label]);
        }
      }

      // Mengklik operasi hitung
    } else if (["add", "subtract", "multiply", "divide"].includes(item.id)) {
      if (["-"].includes(input[0])) {
        if ((item.label == "-") & !parentheses) {
          setInput([item.label]);
          setChainInput([...chainInput, "(", item.label]);
          setParentheses(true);
        } else {
          console.log("operasi tidak bisa digunakan");
        }
      } else {
        if (parentheses) {
          setChainInput([...chainInput, ")", item.label]);
          setParentheses(false);
        } else {
          setChainInput([...chainInput, item.label]);
        }
        setInput([item.label]);
      }
      setDisabledEquals(true);

      // Mengklik Angka
    } else {
      if (["+", "-", "*", "/"].includes(input[0])) {
        setInput([item.label]);
      } else {
        setInput([...input, item.label]);
      }
      setChainInput([...chainInput, item.label]);
      setDisabledEquals(false);
    }
  }

  function renderKeypads() {
    return (
      <div
        style={{
          display: "grid",
          gap: 1,
          gridTemplateAreas: `
            "clear clear  divide multiply"
            "seven eight nine subtract"
            "four five six add"
            "one two three equals"
            "zero zero decimal equals"
          `,
        }}
      >
        {keyList.map((item, index) => (
          <button
            key={index}
            style={{
              display: "flex",
              gridArea: item.id,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ddd",
              height: item.id == "equals" ? padSize * 2 + 4 : padSize,
              fontSize: 24,
              fontWeight: 600,
              borderRadius: 4,
              cursor: "pointer",
              borderColor: "#ddd",
            }}
            id={item.id}
            disabled={item.label == "=" ? disabledEquals : disabled}
            onClick={() => keypadPress(item)}
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: padSize * 4 + 4 * 3,
        }}
      >
        {/* Display */}
        {renderDisplay()}

        {/* KeyPad */}
        {renderKeypads()}
      </div>
    </div>
  );
}

const keyList = [
  {
    id: "zero",
    label: 0,
  },
  {
    id: "one",
    label: 1,
  },
  {
    id: "two",
    label: 2,
  },
  {
    id: "three",
    label: 3,
  },
  {
    id: "four",
    label: 4,
  },
  {
    id: "five",
    label: 5,
  },
  {
    id: "six",
    label: 6,
  },
  {
    id: "seven",
    label: 7,
  },
  {
    id: "eight",
    label: 8,
  },
  {
    id: "nine",
    label: 9,
  },
  {
    id: "decimal",
    label: ".",
  },
  {
    id: "add",
    label: "+",
  },
  {
    id: "subtract",
    label: "-",
  },
  {
    id: "multiply",
    label: "*",
  },
  {
    id: "divide",
    label: "/",
  },
  {
    id: "equals",
    label: "=",
  },
  {
    id: "clear",
    label: "AC",
  },
];

export default Calculator;
