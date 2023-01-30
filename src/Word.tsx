interface GuessingWordProps {
    wordToGuess: string
    guessedLetters: string[]
}
function GuessingWord({
    wordToGuess,
    guessedLetters,
}: GuessingWordProps) {
    const letters: string[] = wordToGuess.split("")
    return (
        <div className="flex w-full justify-center">
            {letters.map((letter, index) => {
                return (
                    <div className="sm:mr-4 border-b-8 border-neutral-800 w-12 flex" key={index}>
                        <span className={`${guessedLetters.includes(letter) ? 'visible' : 'invisible'} mx-auto text-2xl sm:text-5xl uppercase font-bold text-gray-700`}>{letter}</span>
                    </div>
                )
            })}
        </div>
    );
}

export default GuessingWord;