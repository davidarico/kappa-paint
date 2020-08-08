const exec = require('child_process').exec

console.log('running run_express script')
const expressScript = exec('sh run_express.sh')

expressScript.stdout.on('data', (data)=>{
    console.log(data); 
})

expressScript.stderr.on('data', (data)=>{
    console.error(data)
});