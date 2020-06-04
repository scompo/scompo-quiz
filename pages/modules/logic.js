export async function setTotals(tots, ui) {
    ui.totals.right.innerText = tots.right
    ui.totals.wrong.innerText = tots.wrong
    ui.totals.played.innerText = tots.played
    ui.totals.skipped.innerText = tots.skipped
}

export async function setQuestion(q, ui) {
    ui.question.innerText = q.question
}
