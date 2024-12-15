var m = require("mithril")
var db = require("../configs/Firebase")
var firestore = require("firebase/firestore")
var uuid = require('uuid')
var processState = require('../configs/ProcessState')
const Package = require("./Package")

var Word = {
    state: processState.Ready,

    list: [],
    filtered_list: [],
    loadList: async function () {
        Word.state = processState.InProcess
        await firestore.getDocs(firestore.collection(db, "words"))
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data()
                    data["id"] = doc.id
                    Word.list.push(data)
                })
                Word.filtered_list = Word.list
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                Word.state = processState.Ready
                m.redraw()
            })
    },

    find_by_word: function (pattern) {
        Word.state = processState.InProcess
        Word.filtered_list = []
        var regex = new RegExp(`${pattern}`, "i")
        Word.list.forEach((word) => {
            if (regex.test(word.word)) {
                Word.filtered_list.push(word)
            }
        })
        Word.state = processState.Ready
        m.redraw()
    },

    current: {},

    save: async function (word) {
        Word.state = processState.InProcess
        const doc_id = uuid.v4()

        const batch = firestore.writeBatch(db) 
        batch.set(firestore.doc(db, "words", doc_id), word)

        word.packages.forEach(async (package) => {
            if(package){
                batch.set(firestore.doc(db, "packages", package), {
                    created_at: Date.now()
                })
            }
        })

        await batch.commit()
            .then(()=>{
                const data = word
                data["id"] = doc_id
                Word.list.push(data)
                Word.filtered_list = Word.list

                for (let i = 0; i < word.packages.length; i++) {
                    var is_duplicate = false
                    Package.list.forEach((package) => {
                        if (package === word.packages[i]) {
                            is_duplicate = true
                        }
                    })
                    if (!is_duplicate) {
                        Package.list.push(word.packages[i])
                    }
                }
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                Word.state = processState.Ready
                m.redraw()
            })
    },

    delete: async function (doc_id) {
        Word.state = processState.InProcess
        await firestore.deleteDoc(firestore.doc(db, "words", doc_id))
            .then(() => {
                for (let i = 0; i < Word.list.length; i++) {
                    if (Word.list[i].id == doc_id) {
                        Word.list.splice(i, 1)
                    }
                }
                Word.filtered_list = Word.list
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                Word.state = processState.Ready
                m.redraw()
            })
    }
};

module.exports = Word;