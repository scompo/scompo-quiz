export async function setTotals(tots, ui) {
    ui.right.innerText = tots.right
    ui.wrong.innerText = tots.wrong
    ui.played.innerText = tots.played
    ui.skipped.innerText = tots.skipped
}

export function update(val, ui) {
    ui.innerText = val
}

export async function init(ui) {
    return {
        right: {
            ui: ui.totals.right,
            count: 0
        },
        wrong: {
            ui: ui.totals.wrong,
            count: 0
        },
        skipped: {
            ui: ui.totals.skipped,
            count: 0
        },
        played: {
            ui: ui.totals.played,
            count: 0
        },
        increment: function (template) {
            if (template.right) {
                this.right.count = this.right.count + template.right
            }
            if (template.wrong) {
                this.wrong.count = this.wrong.count + template.wrong
            }
            if (template.skipped) {
                this.skipped.count = this.skipped.count + template.skipped
            }
            if (template.played) {
                this.played.count = this.played.count + template.played
            }
            this.updateValues()
        },
        updateValues: function () {
            update(this.right.count, this.right.ui)
            update(this.wrong.count, this.wrong.ui)
            update(this.skipped.count, this.skipped.ui)
            update(this.played.count, this.played.ui)
        }
    }
}
