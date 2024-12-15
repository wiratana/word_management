var m = require("mithril")
var Package = require("../models/Package")
var Word = require("../models/Word")
const processState = require("../configs/ProcessState")

module.exports = {
    view: function(){
        if(Package.state == processState.InProcess){
            return m(".loading", "loading...")
        }

        if(Package.list.length === 0){
            return m("empty", "empty data...")
        }

        return m(".package-search", [
            m('select.input[name=package]', {
                onchange: (e)=>{
                    Word.filtered_list = []
                    Word.list.forEach((word)=>{
                        if(word.packages && word.packages.includes(e.target.value)){
                            Word.filtered_list.push(word)
                        }
                    })
                }
            }, Package.list.map((package)=>{
                return m("option", {
                    value: package.id,
                }, package.id)
            }))
        ])
    }
}