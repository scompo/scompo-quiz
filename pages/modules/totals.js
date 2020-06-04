export async function setTotals(tots, ui) {
    ui.right.innerText = tots.right
    ui.wrong.innerText = tots.wrong
    ui.played.innerText = tots.played
    ui.skipped.innerText = tots.skipped
}
