var m = require('mithril')
var Package = require('../models/Package')
var Word = require('../models/Word')

module.exports = {
    view: function () {
        return m(".input-package", [
            m("label.label", "Category"),
            m("input.input[type=text][name=package]", {
                oninput:(e)=>{
                    Word.current.packages = e.target.value.replace(/\s/g, "").split(',')
                },
                value: Word.current.packages ? Word.current.packages.join(',') : ""
            }),
            // Package.list ?
            // m(".recommendation-packages", Package.list.map((package)=>{
            //     return m(".package-item", package.id)
            // })) : 
            // m(".empty-recomendation-packages", "nothing to recomend.."),
            Word.current.packages ?
            m(".list-pacakages", Word.current.packages.map((package) => {
                return m(".package-item", package)
            })) :
            m(".empty-list-packages", "nothing to display..")
        ])
    }
}