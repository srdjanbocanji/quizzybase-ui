

const Table = ({questions}) => {
    return (
        <table>
            <tbody>
                {
                    questions.map(question => (<tr>{question.question}</tr>))
                }
            </tbody>

        </table>
    )
}

export default Table