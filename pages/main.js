import run from './modules/app.js'
import {setupUi} from './modules/ui.js'

async function main() {
    return setupUi(document)
        .then(run)
}

window.addEventListener('DOMContentLoaded', () => {
    return main()
        .then(console.log)
        .catch(console.error)
})