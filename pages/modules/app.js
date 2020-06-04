import {randomQuestion} from './data.js'

let pageData = {
    totals: {
        right: 0,
        wrong: 0,
        skipped: 0,
        played: 0
    }
}

async function setTotals(tots, ui) {
    ui.totals.right.innerText = tots.right
    ui.totals.wrong.innerText = tots.wrong
    ui.totals.played.innerText = tots.played
    ui.totals.skipped.innerText = tots.skipped
}

async function setQuestion(q, ui) {
    ui.question.innerText = q.question
}

function response(ui, ans, cb) {
    return () => {
        cb().then(() => {
            pageData.selected = {
                answer: ans,
                ui
            }
            ui.classList.add('selected')
        })
    }
}

async function setAnswer(ui, ans, cb) {
    ui.innerText = ans.text
    ui.dataset.id = ans._id
    ui.onclick = response(ui, ans, cb)
    ui.classList.remove('selected')
}

function resetSelection(ui) {
    return async () => {
        for (const key in ui.answers) {
            if (ui.answers.hasOwnProperty(key)) {
                const element = ui.answers[key];
                element.classList.remove('selected')
                element.classList.remove('correct')
                element.classList.remove('wrong')
            }
        }
        pageData.selected = undefined
    }
}

async function disableSelection(ui) {
    for (const key in ui.answers) {
        if (ui.answers.hasOwnProperty(key)) {
            const element = ui.answers[key];
            element.onclick = undefined
        }
    }
}

async function setAnswers(q, ui) {
    resetSelection(ui)()
        .then(() => {
            return Promise.all([
                setAnswer(ui.answers.ans1, q.answers[0], resetSelection(ui)),
                setAnswer(ui.answers.ans2, q.answers[1], resetSelection(ui)),
                setAnswer(ui.answers.ans3, q.answers[2], resetSelection(ui))
            ])
        })
}

function skip(ui) {
    return function () {
        if (!pageData.ended) {
            pageData.totals.skipped = pageData.totals.skipped + 1
        }
        return randomQuestion()
            .then(q => setupPage(q, ui))
    }
}

async function setupNextButton(ui) {
    ui.next.onclick = skip(ui)
}

function validate(ui) {
    return function () {
        if (pageData.selected) {
            return disableSelection(ui)
                .then(() => {
                    if (pageData.selected.answer.correct) {
                        pageData.totals.right = pageData.totals.right + 1
                        pageData.selected.ui.classList.remove('selected')
                        pageData.selected.ui.classList.add('correct')
                    } else {
                        pageData.totals.wrong = pageData.totals.wrong + 1
                        pageData.selected.ui.classList.remove('selected')
                        pageData.selected.ui.classList.add('wrong')
                    }
                    ui.output.text.innerText = pageData.selected.answer.motivation
                    ui.output.container.classList.remove('hidden')
                    ui.answer.classList.add('hidden')
                    pageData.ended = true
                })
                .then(() => console.log('after cliccking', pageData))
        }
    }
}

async function setupAnswerButton(q, ui) {
    ui.answer.classList.remove('hidden')
    ui.answer.onclick = validate(ui)
}

async function resetOuptut(ui) {
    ui.output.container.classList.add('hidden')
    ui.output.text.innerText = ''
}

async function setupPage(q, ui) {
    pageData.totals.played = pageData.totals.played + 1
    pageData.ended = false
    return Promise.all([
        setTotals(pageData.totals, ui),
        setQuestion(q, ui),
        setAnswers(q, ui),
        setupNextButton(ui),
        setupAnswerButton(q, ui),
        resetOuptut(ui)
    ])
}

export default async function (ui) {
    return randomQuestion()
        .then(q => setupPage(q, ui))
}