import * as fs from 'fs'

fs.readFile(__dirname + '/../sample.dat', (e, buf) =>{
    console.log(buf.toString())
})

