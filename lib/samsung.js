const Samsung = require('samsung-tv-control').default
const keysProvider = require('./keys.js').provideKeys;

function registerNodes(RED) {

    function configNode(config) {

        const apiConfig = {
            name: 'Node-red',
            token: config.token,
            ip: config.ip,
            mac: '123456789ABC'
        }

        RED.nodes.createNode(this, config)

        this.remote = new Samsung(apiConfig)
        this.remote.turnOn()
    }

    function isAliveNode(config) {

        RED.nodes.createNode(this, config)

        const node = this

        node.on('input', function (msg) {
            const device = RED.nodes.getNode(config.device)
            device.remote.isAvailable()
                .then(() => node.send([null, msg]))
                .catch(e => node.send([msg, null]))
        })
    }

    function sendNode(config) {

        RED.nodes.createNode(this, config)

        this.on('input', function (msg) {

            const device = RED.nodes.getNode(config.device)

            var key = config.key ? config.key : msg.payload

            if (!key) {
                this.error('No key given. Specify either in the config or via msg.payload!')
                return;
            }



            device.remote.isAvaliable()
                .then(() => device.remote.sendKey(String(key), function (err, res) {
                    if (err) {
                        throw new Error(err)
                    } else {
                        console.log(res)
                    }
                }))
                .catch(err => {
                    throw new Error(err)
                })
        })
    }

    RED.nodes.registerType("samsung-tv", configNode)
    RED.nodes.registerType("samsung-tv-send", sendNode)
    RED.nodes.registerType("samsung-tv-isalive", isAliveNode)

    keysProvider(RED)
}

module.exports = registerNodes;