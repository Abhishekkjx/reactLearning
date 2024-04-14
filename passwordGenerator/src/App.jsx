import React, { useCallback, useEffect, useRef, useState } from "react";
// import './App.css'

const App = () => {
  const [length, setLength] = useState(1)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGen = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     if(numberAllowed) str+= "0123456789"
     if(charAllowed) str+= "!@#$%^&*()-_+=[]{}~`"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0, 10)
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(()=>{
    passwordGen()
  },[length,numberAllowed,charAllowed,passwordGen])

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          for="inputField"
        >
          Generated password
        </label>
        <div className="flex">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-white"
            id="inputField"
            type="text"
            value={password}
            placeholder="Enter text..."
            readOnly
            ref={passwordRef}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          for="lengthRange"
        >
          Length: {length}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="lengthRange"
          type="range"
          min={1}
          max={100}
          value={length}
          onChange={(e)=> {setLength(e.target.value)}}
        />
      </div>

      <div className="mb-6">
        <input
          className="mr-2 leading-tight"
          type="checkbox"
          id="checkboxNumber"
          defaultChecked={numberAllowed}
          onChange={()=> setNumberAllowed((prev) => !prev)}
        />
        <label className="text-sm text-black" for="checkboxNumber">
          Number
        </label>
        <input
          className="ml-4 mr-2 leading-tight"
          type="checkbox"
          id="checkboxCharacter"
          defaultChecked={charAllowed}
          onChange={()=> setCharAllowed((prev) => !prev)}
        />
        <label className="text-sm text-black" for="checkboxCharacter">
          Character
        </label>
      </div>
    </div>
  );
};

export default App;
