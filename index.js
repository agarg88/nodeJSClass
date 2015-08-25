// let http = require('http')

// http.createServer((req, res) => {
//     console.log('Request received at: ${req.url}')
//     res.end('hello world\n')
// }).listen(8000)

let http = require('http')
let request = require('request')
// let destinationUrl = '127.0.0.1:8000'

let argv = require('yargs')
    .default('host', '127.0.0.1:8000')
    .argv

let port = argv.port || (argv.host === '127.0.0.1' ? 8000 : 80)

let scheme = 'http://'
// Build the destinationUrl using the --host value
let destinationUrl = argv.url || scheme + argv.host + ':' + port

let path = require('path')
let fs = require('fs')
let logPath = argv.log && path.join(__dirname, argv.log)
let getLogStream = ()=> logPath ? fs.createWriteStream(logPath) : process.stdout

http.createServer((req, res) => {
    // Proxy code
    let options = {
        headers: req.headers,
        url: `http://${destinationUrl}${req.url}`
    }
    options.method = req.method
req.pipe(getLogStream())
}).listen(8001)
