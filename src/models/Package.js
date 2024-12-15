var m = require("mithril")
var firestore = require("firebase/firestore")
var db = require("../configs/Firebase")
var processState = require("../configs/ProcessState")

var Package = {
    state: processState.Ready,

    list: [],
    loadList: async function(){
        Package.state = processState.InProcess
        await firestore.getDocs(firestore.collection(db, "packages"))
            .then((querySnapshot)=>{
                querySnapshot.forEach(doc => {
                    const data = doc.data()
                    data["id"] = doc.id
                    Package.list.push(data)
                })
            })
            .catch((e)=>console.log(e))
            .finally(()=>{
                Package.state = processState.Ready
                m.redraw()
            })
    }
}

module.exports = Package