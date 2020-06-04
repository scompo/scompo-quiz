
export function resetSelection(ctx) {
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

export async function disableSelection(ui) {
    for (const key in ui.answers) {
        if (ui.answers.hasOwnProperty(key)) {
            const element = ui.answers[key];
            element.onclick = undefined
        }
    }
}

export function response(ui, ans, cb, ctx) {
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

export async function setAnswer(ui, ans, cb, ctx) {
    ui.innerText = ans.text
    ui.dataset.id = ans._id
    ui.onclick = response(ui, ans, cb, ctx)
    ui.classList.remove('selected')
}

export async function setAnswers(ctx) {
    resetSelection(ctx)()
        .then(() => {
            return Promise.all([
                setAnswer(ctx.ui.answers.ans1, ctx.q.answers[0], resetSelection(ctx), ctx),
                setAnswer(ctx.ui.answers.ans2, ctx.q.answers[1], resetSelection(ctx), ctx),
                setAnswer(ctx.ui.answers.ans3, ctx.q.answers[2], resetSelection(ctx), ctx)
            ])
        })
}

export function validate(ctx) {
    return function () {
        if (ctx.pageData.selected) {
            return disableSelection(ctx.ui)
                .then(() => {
                    if (ctx.pageData.selected.answer.correct) {
                        ctx.totals.increment({ right: 1 })
                        ctx.pageData.selected.ui.classList.remove('selected')
                        ctx.pageData.selected.ui.classList.add('correct')
                    } else {
                        ctx.totals.increment({ wrong: 1 })
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

export async function resetOuptut(output) {
    output.container.classList.add('hidden')
    output.text.innerText = ''
}
