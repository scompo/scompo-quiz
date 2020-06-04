import { randomQuestion } from './data.js'
import { setTotals } from './totals.js'
import { setQuestion } from './question.js'
import { setAnswers, validate } from './answers.js'

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