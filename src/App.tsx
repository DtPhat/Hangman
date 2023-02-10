import { useState, useEffect, useCallback } from 'react'
import Keyboard from './Keyboard';
import Word from './Word';
import Picture from './Picture';
function App() {
  const [wordToGuess, setWordToGuess] = useState<string>("")
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [chances, setChances] = useState<number>(5)
  const [playAgain, setPlayAain] = useState(false)
  useEffect(() => {
    const getRandomWord = () => {
      fetch("https://random-word-api.herokuapp.com/word")
        .then(res => res.json())
        .then(data => { setWordToGuess(data[0]) })
    }
    getRandomWord()
  }, [playAgain]);

  useEffect(() => {
    const keyPressHandler = (e: KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) return
      e.preventDefault()
      addGuessedLetters(key)
    }
    document.addEventListener("keypress", keyPressHandler)
    return () => {
      document.removeEventListener("keypress", keyPressHandler)
    }
  }, [guessedLetters, wordToGuess]);

  console.log(wordToGuess)

  const activeLetters = guessedLetters.filter(letter => wordToGuess.includes(letter))
  const inactiveLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))
  const isWinner = wordToGuess && wordToGuess.split('').every(letter => guessedLetters.includes(letter))
  const isLoser = chances <= 0


  const addGuessedLetters = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return
    if (wordToGuess.includes(letter)) {
      setChances(preChances => {
        if (preChances >= 15) return 15
        return (preChances + 1)
      })
    } else {
      setChances(preChances => preChances - 1)
    }
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, wordToGuess])

  return (
    <div className='flex justify-center items-center pt-6 bg-forestshore min-h-screen'>
      {wordToGuess &&
        <div className='bg-neutral-300 rounded-3xl py-6 max-w-[54rem] w-full flex flex-col space-y-6 relative border-4 border-neutral-500 bg-drearylake bg-cover'>
          {(!isWinner && !isLoser)&&
            <button className='invisible md:visible absolute flex flex-col items-center top-0 right-0 active:blur-sm '
              onClick={() => setChances(0)}>
              <img src="/mrhang.jpg" className='w-16 h-20 rounded-bl-2xl rounded-tr-2xl' alt="" width={56} />
              <span className='text-xs font-semibold absolute text-neutral-300 bottom-1'>🏳️Give up</span>
            </button>
          }
          <h1 className='text-center text-3xl font-bold font-serif uppercase text-zinc-700'>
            {`${(!isWinner && !isLoser) ? "Let's hang with Mr. Incredible!" : ""}
              ${isWinner ? "You make Mr. Incredible proud" : ""}
              ${isLoser ? "You make Mr. Incredible depressed" : ""}`
            }
          </h1>
          <div>
            <Picture chances={chances} />
          </div>
          {
            (isWinner || isLoser) ?
              <div className='mx-auto'>
                <span className='text-4xl hidden sm:inline'>The word is: </span>
                <a className='text-5xl uppercase font-bold' href={`https://dictionary.cambridge.org/vi/dictionary/english/${wordToGuess}`} target='_blank'>
                  {wordToGuess}
                </a>
                <div className='absolute left-6 sm:left-[40%] '>
                  <button className='text-2xl font-semibold border-2 mt-4 px-3 pb-1 border-neutral-800 rounded-full'
                    onClick={() => {
                      setWordToGuess("")
                      setGuessedLetters([])
                      setChances(5)
                      setPlayAain(!playAgain)
                    }}>Hang again?</button>
                </div>
              </div> :
              <div className='m-2'>
                <Word
                  wordToGuess={wordToGuess}
                  guessedLetters={guessedLetters} />
              </div>
          }
          <div>
            <Keyboard
              wordToGuess={wordToGuess}
              addGuessedLetters={addGuessedLetters}
              activeLetters={activeLetters}
              inactiveLetters={inactiveLetters}
              setChances={setChances}
              allDisabled={isWinner || isLoser} />
          </div>
        </div>
      }
    </div >
  )
}

export default App
