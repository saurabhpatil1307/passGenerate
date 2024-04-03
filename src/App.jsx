import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  
  const passRef = useRef(null);
  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) {
      str += "0123456789";
    }
    if (charAllow) {
      str += "`!@#$%^&*()_+{}[]|:;'<>,.?";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(char);
    }
    setPassword(pass);
  }, [charAllow, numberAllow, length, setPassword]);
  const copy1= useCallback(()=>{
    passRef.current?.select()
    passRef.current?.setSelectRange(0,99)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGen()
  },[length, numberAllow, charAllow, passwordGen])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            ref={passRef}
            readOnly
          />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={copy1}>
            Copy
          </button>
        </div>
        <div></div>
        <div className="flex text-sm gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="coursor-pointer"
            onChange={(e) => {
              setlength(e.target.value);
            }}
          />
          <label htmlFor="">Length: {length}</label>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllow}
              id="ch1"
              onChange={() => {
                setNumberAllow((prev) => !prev);
              }}
            />
            <label htmlFor="ch1">Number</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllow}
              id="ch2"
              onChange={() => {
                setCharAllow((prev) => !prev);
              }}
            />
            <label htmlFor="ch2">Special Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
