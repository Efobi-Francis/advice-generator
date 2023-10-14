import { useEffect, useState } from 'react'
import './App.css'

import pattern_divider_mobile from '/assets/images/pattern-divider-mobile.svg'
import icon_dice from '/assets/images/icon-dice.svg'

function App() {
  const [advices, setAdvices] = useState([]);
  const [error, setError] = useState('')

  const generateAdviceBtn = async () => {
    
    try {
      const response = await fetch('https://api.adviceslip.com/advice');

      if (!response.ok) {
        throw new Error('Request Failed')
      }

      const data = await response.json()
      
      const newAdvice = {
        id: data.slip.id,
        advice: data.slip.advice
      };

      setAdvices(newAdvice);

    } catch (error) {
      setError('Unable to get advice')
    }
  }

  useEffect( ()=> {
    generateAdviceBtn()
  }, [])

  return (
    <>
      <div className=' bg-[hsl(218,23%,16%)] h-screen text-white px-3 flex items-center text-[28px]'>
        <div className=' bg-[hsl(217,19%,24%)] w-full h-1/2 relative flex flex-col items-center justify-between px-4 pt-4 pb-16 rounded-lg'>
          <p className=' uppercase text-sm pt-3 tracking-[0.2em] text-[hsl(150,100%,66%)]'>{`Advice #${advices.id}`}</p>
          <p className=' text-center font-manrope py-2 text-[hsl(193,38%,86%)]'>{`"${advices.advice} ${error}"`}</p>

          <img src={pattern_divider_mobile} alt="divider-mobile" className=' w-full' />

          <button onClick={generateAdviceBtn} className=' absolute -bottom-8 w-16 h-16 rounded-full bg-[hsl(150,100%,66%)] flex justify-center items-center'>
            <img src={icon_dice} alt="icon-dice" />
          </button>
        </div>
      </div>

      <div class="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="#">Efobi Francis</a>.
      </div>
    </>
  )
}

export default App
