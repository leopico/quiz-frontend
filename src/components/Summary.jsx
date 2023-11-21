
const Summary = ({ quizCount, summary }) => {
    const { wrong, correct } = summary;

    const reload = () => {
        window.location.reload();
    };

    return (
        <div className="flex flex-col justify-center items-center space-y-3">
            <div>
                {
                    quizCount === correct && (
                        <span className="text-lg font-bold text-orange-400">
                            Wow! All of your answers are correct 😲
                        </span>
                    )
                }
            </div>
            <div className="flex flex-col justify-center items-center space-y-3">
                {
                    wrong > 0 && (
                        <>
                            <span className="text-lg font-bold text-orange-400">
                                Sad! {correct} are right and {wrong} are wrong 😭
                            </span>
                            <span
                                onClick={reload}
                                className="bg-green-600 px-3 py-2 rounded text-gray-200 font-bold cursor-pointer"
                            >
                                Try Again!
                            </span>
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default Summary