import { randomQuestion } from './data.js'
import { init as initTotals } from './totals.js'
import { setQuestion } from './question.js'
import { setAnswers, validate, resetOuptut } from './answers.js'

function skip(ctx, totals) {
    return function () {

        ctx.totals.increment({ played: 1 })

        if (!ctx.pageData.ended) {
            ctx.totals.increment({ skipped: 1 })
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

async function setupPage(ctx) {
    ctx.pageData.ended = false
    return Promise.all([
        ctx.totals.updateValues(),
        setQuestion(ctx.q, ctx.ui),
        setAnswers(ctx),
        setupNextButton(ctx),
        setupAnswerButton(ctx),
        resetOuptut(ctx.ui.output)
    ])
}

export default async function (ui) {
    const pageData = {}

    return Promise.all([
        randomQuestion(),
        initTotals(ui)
    ])
        .then(([q,totals]) => setupPage({
            pageData,
            totals,
            q,
            ui
        }))
}