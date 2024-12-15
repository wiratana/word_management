var m = require("mithril")
var Word = require("../models/Word")
var processState = require("../configs/ProcessState")

module.exports = {
    view: function () {
        if(Word.state == processState.InProcess){
            return m(".loading", "loading...")
        }

        if(Word.filtered_list.length === 0){
            return m("empty", "empty data...")
        }
        
        return m(".word-list", Word.filtered_list.map((word) => {
            return m(".word-list-item", [
                m(".word", word.word),
                m(".language", `Language : ${word.language}`),
                m(".difficulty", `Difficulty : ${word.difficulty}`),
                m(".description", `${word.description}`),
                word.packages ?
                m(".packages", word.packages.map((package)=>{
                    return m(".package", package)
                })) : 
                m(".empty-package", "doesnt have any package"),
                m('button', {onclick: function () {
                    Word.delete(word.id)
                }}, "Delete")
            ])
        }))
    }
}