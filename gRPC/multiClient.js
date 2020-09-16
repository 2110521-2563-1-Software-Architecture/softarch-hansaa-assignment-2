const util = require('util')
const cp = require('child_process')
const call = util.promisify(cp.exec)

async function runService(cmd) {
    await call(cmd)
}

async function run(count) {
    var start = new Date()
    funcs = ['list', 'get', 'insertmt']
    for (i = 0; i < count; i++) {
        var nItem = Math.floor(Math.random() * 100) + 1
        var funcsIdx = Math.floor(Math.random() * 3)
        console.log(funcs[funcsIdx])
        if (funcsIdx == 0)
            await runService(`node client.js list`)
        else if (funcsIdx == 1)
            await runService(`node client.js get 123`)
        else if (funcsIdx == 2)
            await runService(`node client.js insertmt ${nItem}`)
    }
    var responseTime = new Date() - start
    console.log('response time:', responseTime)
}

run(process.argv[2]).catch(err => console.error(err))