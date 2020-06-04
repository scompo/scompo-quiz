import { randomQuestion } from './data.js'
import { setTotals, setQuestion, disableSelection } from './logic.js'

function response(ui, ans, cb, ctx) {
    return () => {
        cb().then(() => {
            ctx.pageData.selected = {
                answer: ans,
                ui
            }
            ui.classList.add('selected')
        })
    }
}

async function setAnswer(ui, ans, cb, ctx) {
    ui.innerText = ans.text
    ui.dataset.id = ans._id
    ui.onclick = response(ui, ans, cb, ctx)
    ui.classList.remove('selected')
}

function resetSelection(ctx) {
    return async () => {
        for (const key in ctx.ui.answers) {
            if (ctx.ui.answers.hasOwnProperty(key)) {
                const element = ctx.ui.answers[key];
                element.classList.remove('selected')
                element.classList.remove('correct')
                element.classList.remove('wrong')
            }
        }
        ctx.pageData.selected = undefined
    }
}

async function setAnswers(ctx) {
    resetSelection(ctx)()
        .then(() => {
            return Promise.all([
                setAnswer(ctx.ui.answers.ans1, ctx.q.answers[0], resetSelection(ctx), ctx),
                setAnswer(ctx.ui.answers.ans2, ctx.q.answers[1], resetSelection(ctx), ctx),
                setAnswer(ctx.ui.answers.ans3, ctx.q.answers[2], resetSelection(ctx), ctx)
            ])
        })
}

function skip(ctx) {
    return function () {

        ctx.pageData.totals.played = ctx.pageData.totals.played + 1

        if (!ctx.pageData.ended) {
            ctx.pageData.totals.skipped = ctx.pageData.totals.skipped + 1
        }

        return randomQuestion()
            .then(q => {
                ctx.q = q
                return setupPage(ctx)
            })
    }
}

async function setupNextButton(ctx) {
    ctx.ui.next.onclick = skip(ctx)
}

function validate(ctx) {
    return function () {
        if (ctx.pageData.selected) {
            return disableSelection(ctx.ui)
                .then(() => {
                    if (ctx.pageData.selected.answer.correct) {
                        ctx.pageData.totals.right = ctx.pageData.totals.right + 1
                        ctx.pageData.selected.ui.classList.remove('selected')
                        ctx.pageData.selected.ui.classList.add('correct')
                    } else {
                        ctx.pageData.totals.wrong = ctx.pageData.totals.wrong + 1
                        ctx.pageData.selected.ui.classList.remove('selected')
                        ctx.pageData.selected.ui.classList.add('wrong')
                    }
                    ctx.ui.output.text.innerText = ctx.pageData.selected.answer.motivation
                    ctx.ui.output.container.classList.remove('hidden')
                    ctx.ui.answer.classList.add('hidden')
                    ctx.pageData.ended = true
                })
        }
    }
}

async function setupAnswerButton(ctx) {
    ctx.ui.answer.classList.remove('hidden')
    ctx.ui.answer.onclick = validate(ctx)
}

async function resetOuptut(ui) {
    ui.output.container.classList.add('hidden')
    ui.output.text.innerText = ''
}

async function setupPage(ctx) {
    ctx.pageData.ended = false
    return Promise.all([
        setTotals(ctx.pageData.totals, ctx.ui.totals),
        setQuestion(ctx.q, ctx.ui),
        setAnswers(ctx),
        setupNextButton(ctx),
        setupAnswerButton(ctx),
        resetOuptut(ctx.ui)
    ])
}

export default async function (ui) {
    const pageData = {
        totals: {
            right: 0,
            wrong: 0,
            skipped: 0,
            played: 0
        }
    }

    return randomQuestion()
        .then(q => setupPage({
            pageData,
            q,
            ui
        }))
}