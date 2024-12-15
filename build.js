const esbuild = require('esbuild')
const dotenv = require('dotenv')
const define = {}

dotenv.config()

for(const k in process.env){
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k)) {
        define[`process.env.${k}`] = JSON.stringify(process.env[k]);
    }
}

esbuild.build({
    entryPoints: ["src/index.js"],
    bundle: true,
    outfile: "bin/app.js",
    define: define
})
    .then(() => { console.log("build completed") })
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })