const questions = [
    {
        _id: '1',
        question: "What's the best Starcraft 2 race?",
        answers: [
            {
                _id: '1',
                text: 'Zerg, of course.',
                correct: true,
                motivation: 'Zerg is a swarm!'
            },
            {
                _id: '2',
                text: 'Terran, are the best.',
                motivation: 'Terrans are slow and boring!'
            },
            {
                _id: '3',
                text: "Protoss, there's no question about it.",
                motivation: 'Protoss are slow and annoying!'
            },
        ]
    },
    {
        _id: '2',
        question: "What's the best programming language?",
        answers: [
            {
                _id: '1',
                text: 'Java',
                motivation: 'Java is bloated'
            },
            {
                _id: '2',
                text: 'Javascript',
                correct: true,
                motivation: 'It is in your browser and it does not bother you'
            },
            {
                _id: '3',
                text: "Cobol",
                motivation: 'Yeah! Maybe in the 70s...'
            },
        ]
    },
    {
        _id: '3',
        question: "What is love?",
        answers: [
            {
                _id: '1',
                text: 'Baby don\'t hurt me, don\'t hurt me...',
                motivation: 'No more...',
                correct: true
            },
            {
                _id: '2',
                text: 'A disease',
                motivation: 'Oh, you downer...'
            },
            {
                _id: '3',
                text: "It's the best",
                motivation: 'Not every time'
            },
        ]
    }
]

let counter = 0

export async function randomQuestion() {
    counter = (counter +1) % questions.length
    return questions[counter]
}