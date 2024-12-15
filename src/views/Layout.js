var m = require('mithril')
const WordInput = require('./WordInput')
const WordList = require('./WordList')
const WordSearch = require('./WordSearch')
const PackageFilter = require('./PackageFilter')
const Package = require('../models/Package')
const Word = require('../models/Word')

module.exports = {
    oninit: function(){
        Word.loadList()
        Package.loadList()
    },
    view: function(){
        return m("main.layout", [
            m(WordInput),
            m(".searching-feature", [
                m(WordSearch),
                m(PackageFilter),
            ]),
            m(WordList)
        ])
    }
}