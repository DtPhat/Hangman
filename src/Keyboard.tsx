import { useState } from "react"

//Roll new randomized key sets that have all letters in the word //feature: create a history panel that show all wrong guessed letter
interface KeyboardProps {
    activeLetters: string[]
    inactiveLetters: string[]
    addGuessedLetters: (letter: string) => void
    allDisabled?: boolean
    wordToGuess: string
    setChances: React.Dispatch<React.SetStateAction<number>>
}
const deafultKeys: string[] = []
for (let i = 97; i < 123; i++) {
    deafultKeys.push(String.fromCharCode(i))
}
function Keyboard(
    {
        activeLetters,
        inactiveLetters,
        addGuessedLetters,
        allDisabled,
        wordToGuess,
        setChances,
    }: KeyboardProps) {
    const [keyboard, setKeyboard] = useState<string[]>(deafultKeys)
    const randomizeKeys = () => {
        const word = wordToGuess.split('')
        const newKeys: string[] = []
        word.forEach(letter => newKeys.push(letter))
        for (let i = 0; i < 26 - word.length; i++) {
            newKeys.push(String.fromCharCode(97 + Math.floor(Math.random() * (26))))
        }
        shuffleArray(newKeys)
        setChances(prevChances => prevChances - 1)
        setKeyboard(newKeys)
    }
    return (
        <div className="p-6">
            <div className="my-4 w-full flex justify-end">
                <button
                    className="border-2 border-neutral-700 bg-neutral-400 p-1 rounded-lg flex items-center"
                    onClick={randomizeKeys}
                    disabled={allDisabled}>
                    <span className="pr-2 text-lg font-semibold">Reroll keys</span>
                    <ReRollIcon />
                </button>
            </div>

            <div className="grid grid-cols-autofit gap-3 w-full">
                {keyboard.map((key, index) => {
                    const active = activeLetters.includes(key)
                    const inactive = inactiveLetters.includes(key)
                    return (
                        <button
                            onClick={() => addGuessedLetters(key)}
                            className={`capitalize border-2 border-gray-700 rounded-md text-2xl w-12 h-12 font-semibold bg-zinc-400 ${active && 'bg-midnightblue text-babyblue border-darkblue'} ${inactive && 'bg-gray-500 text-neutral-400 border-stone-700'}`}
                            key={index}
                            disabled={active || inactive || allDisabled}
                        >
                            {key}
                        </button>
                    )
                })}
            </div>
        </div>

    );
}
const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const ReRollIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
        </svg>
    )
}

export default Keyboard;