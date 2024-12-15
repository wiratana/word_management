var m = require('mithril')
const Word = require('../models/Word')
const PackageInput = require('../views/PackageInput')

module.exports = {
    view: function(){
        const available_language = ["english", "indonesian", "balinese", "javanese"]
        const available_difficulty = ["easy", "normal", "hard"]
        
        return m(".word-form", [
            m(".group-input", [
                m("label.label", "Word"),
                m("input.input[type=text][placeholder=word]", {
                    oninput: (e) => {
                        Word.current.word = e.target.value
                    },
                    value: Word.current.word 
                }),
            ]),
            m(".group-input", [
                m("label.label", "Choose a Language"),
                m("select.input", {
                    name: "language",
                    oninit: () => Word.current.language = Word.current.language || available_language[0],
                    onchange: (e)=>{
                        Word.current.language = e.target.value
                    },
                    value: Word.current.language || available_language[0]
                }, available_language.map((lang)=>{
                    return m("option", {value:lang}, lang)
                })),
            ]),
            m(".group-input", [
                m("label.label", "Choose a Difficulty"),
                m("select.input", {
                    name: "difficulty",
                    oninit: () => Word.current.difficulty = Word.current.difficulty || available_difficulty[0],
                    onchange: (e)=>{
                        Word.current.difficulty = e.target.value
                    },
                    value: Word.current.difficulty || available_difficulty[0]
                }, available_difficulty.map((difficulty)=>{
                    return m("option", {value:difficulty}, difficulty)
                })),
            ]),
            m(".group-input", [
                m("label.label", "Description"),
                m("textarea.input", {
                    oninput: (e) => {
                        Word.current.description = e.target.value
                    },
                    value: Word.current.description
                })
            ]),
            m(PackageInput),
            m(".group-input", [
                m("button", {
                    onclick: ()=>{
                        Word.save(Word.current)
                    }
                }, "Submit")
            ])            
        ])
    }
}