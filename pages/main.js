import setup from './modules/app.js'

async function main() {
    const question = document.getElementById('question-text')
    const answer1 = document.getElementById('answer-1')
    const answer2 = document.getElementById('answer-2')
    const answer3 = document.getElementById('answer-3')
    const output = document.getElementById('output')
    const outCont = document.getElementById('res')
    const next = document.getElementById('next')
    const answer = document.getElementById('answer')
    const totPlayed = document.getElementById('tot-played')
    const totRight = document.getElementById('tot-right')
    const totWrong = document.getElementById('tot-wrong')
    const totSkipped = document.getElementById('tot-skipped')

    return setup({
        question: question,
        answers: {
            ans1: answer1,
            ans2: answer2,
            ans3: answer3
        },
        output: {
            text: output,
            container: outCont
        },
        next: next,
        answer: answer,
        totals: {
            played: totPlayed,
            right: totRight,
            wrong: totWrong,
            skipped: totSkipped
        }
    })
}

window.addEventListener('DOMContentLoaded', () => {
    return main()
        .then(console.log)
        .catch(console.error)
})