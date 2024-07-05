export interface quiz {
    question:string
    quiz_choix: Array<response> 
    active:boolean
}

interface response {
    text:string ,
    isCorrect:boolean
}