export async function setTotals(tots, ui) {
    ui.right.innerText = tots.right
    ui.wrong.innerText = tots.wrong
    ui.played.innerText = tots.played
    ui.skipped.innerText = tots.skipped
}

export async function setQuestion(q, ui) {
    ui.question.innerText = q.question
}

export async function disableSelection(ui) {
    for (const key in ui.answers) {
        if (ui.answers.hasOwnProperty(key)) {
            const element = ui.answers[key];
            element.onclick = undefined
        }
    }
}