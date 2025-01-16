import { useState } from 'react'
import './App.css'

function App() {
  const [advice, setAdvice] = useState("Click the button to get a advice");
  const [count,setCount] = useState(0);
  const [loading,setLoading] = useState(false);

  async function getAdvice(){
    try{
      setLoading(true);
      const api = await fetch("https://api.adviceslip.com/advice");
      if(!api.ok) throw new Error("Failed to fetch");
      // console.log(api);
      const res = await api.json();
      setAdvice(res.slip.advice);
      setCount(count+1);
      // console.log(res);
    }
    catch(e){
        console.log(e);
        setAdvice("could not fetch advice. Please try again later");
    }
    finally{
      setLoading(false);
    }
    
  }

  return (
    <>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>{loading?"Loading...":"Get Advice"}</button>
      <h3 style={{color:'white'}}>Today you got <span>{count}</span> advice</h3>
    </>
  )
}

export default App
