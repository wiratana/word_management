var m = require("mithril")
const Word = require("../models/Word")

module.exports = {
    pattern: "",
    view: function () {
        return m(".search-word", [
            m("input.input[type=text]", {
                placeholder: "Find Word",
                oninput: (e)=>{
                    this.pattern = e.target.value
                    Word.find_by_word(this.pattern)
                },
                value: this.pattern
            }),
        ])
    }   
}