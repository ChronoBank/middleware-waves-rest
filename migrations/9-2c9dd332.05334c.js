
module.exports.id = '9.2c9dd332.05334c';

const _ = require('lodash'),
  config = require('../config');

/**
 * @description flow 2c9dd332.05334c update
 * @param done
 */
   

module.exports.up = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.update({"path":"2c9dd332.05334c","type":"flows"}, {
    $set: {"path":"2c9dd332.05334c","body":[{"id":"27b27b8e.9827a4","type":"mongo","z":"2c9dd332.05334c","model":"EthAccount","request":"{}","options":"","name":"mongo create addr","mode":"1","requestType":"1","dbAlias":"primary.accounts","x":850,"y":180,"wires":[["10b75c3d.f32764"]]},{"id":"7c68e0a0.c140d","type":"mongo","z":"2c9dd332.05334c","model":"EthAccount","request":"{}","options":"","name":"mongo","mode":"1","requestType":"2","dbAlias":"primary.accounts","x":770,"y":420,"wires":[["e7d143e1.bb6ec"]]},{"id":"316484c0.63001c","type":"function","z":"2c9dd332.05334c","name":"transform params","func":"const prefix = global.get('settings.mongo.accountPrefix');\n\nmsg.address = msg.payload.address;\n\nmsg.payload = {\n    model: `${prefix}Account`, \n    request: [{\n       address: msg.address\n   }, {isActive: false}]\n};\n\nreturn msg;","outputs":1,"noerr":0,"x":590,"y":420,"wires":[["7c68e0a0.c140d"]]},{"id":"468de3dc.eb162c","type":"http in","z":"2c9dd332.05334c","name":"balance","url":"/addr/:addr/balance","method":"get","upload":false,"swaggerDoc":"","x":50,"y":940,"wires":[["83f847e6.918bf8"]]},{"id":"6731d0f7.68fb4","type":"function","z":"2c9dd332.05334c","name":"transform params","func":"const prefix = global.get('settings.mongo.accountPrefix');\n\nmsg.payload = {\n    model: `${prefix}Account`, \n    request: {\n       address: msg.req.params.addr\n   }\n};\n\nreturn msg;","outputs":1,"noerr":0,"x":530,"y":940,"wires":[["a66b89d5.08b868"]]},{"id":"a66b89d5.08b868","type":"mongo","z":"2c9dd332.05334c","model":"EthAccount","request":"{}","options":"","name":"mongo","mode":"1","requestType":"0","dbAlias":"primary.accounts","x":710,"y":940,"wires":[["36a27ede.06cd52"]]},{"id":"36a27ede.06cd52","type":"function","z":"2c9dd332.05334c","name":"transform output","func":"\nconst _ = global.get('_');\n\nmsg.payload = {\n  balance: _.get(msg.payload, '0.balance', 0),\n  assets: _.get(msg.payload, '0.assets', {})\n}\n\nreturn msg;","outputs":1,"noerr":0,"x":900,"y":940,"wires":[["6e227f25.b210e"]]},{"id":"6e227f25.b210e","type":"http response","z":"2c9dd332.05334c","name":"","statusCode":"","x":1111.250007629395,"y":939.99999904632,"wires":[]},{"id":"e859d127.685df","type":"catch","z":"2c9dd332.05334c","name":"","scope":["564cd86a.7d34d8","468de3dc.eb162c","5a35929d.0a716c","3b167e6c.86e5e2","3a6a58b4.444e28","6e227f25.b210e","2e2f80ee.29994","d8755eab.f3e54","6738b594.b1247c","e4822e75.693fd","d0426981.27e8a8","e164e510.1bd768","191feca2.b31993","67c7ccc.0094834","7c68e0a0.c140d","89650827.b33e98","a66b89d5.08b868","aa22bc0a.a85cf","3a688a79.929cb6","8eb922da.30d21","96bcd2ae.c0006","57d1ce3.87e913","65927d71.4e8c44","ab703d2f.3a52f","788b81cd.854b9","70c0d489.250b1c","46a7901e.31b49","d47923c.db3aae","fb5fada6.0738e","8ab75856.970bb8","36a27ede.06cd52","48b8b6ef.8ac958","15bc7bed.f70844","3e8c8bed.c94f44","cdd0bdcd.24b59","316484c0.63001c","6731d0f7.68fb4","4ce9b6d1.fbf3f8","7b1a621c.9f0d5c","2d4e82d1.1d6b1e","d4152e22.23fbb"],"x":80,"y":1120,"wires":[["d47923c.db3aae","82a83666.a276e8"]]},{"id":"2e2f80ee.29994","type":"http response","z":"2c9dd332.05334c","name":"","statusCode":"","x":710,"y":1100,"wires":[]},{"id":"d47923c.db3aae","type":"function","z":"2c9dd332.05334c","name":"transform","func":"\nlet factories = global.get(\"factories\"); \nlet error = msg.error.message;\ntry {\n    error = JSON.parse(error);\n}catch(e){}\n\nmsg.payload = error && error.code === 11000 ? \nfactories.messages.address.existAddress :\nfactories.messages.generic.fail;\n\nif (msg.statusCode == '401')\n    msg.payload = factories.messages.generic.failAuth;\n\n   \nreturn msg;","outputs":1,"noerr":0,"x":320,"y":1120,"wires":[["692906ce.c34228"]]},{"id":"edc524a.f0b1ed8","type":"catch","z":"2c9dd332.05334c","name":"","scope":["27b27b8e.9827a4"],"x":620,"y":80,"wires":[["46a7901e.31b49"]]},{"id":"46a7901e.31b49","type":"function","z":"2c9dd332.05334c","name":"transform","func":"\nlet error = msg.error.message;\ntry {\n    error = JSON.parse(error);\n}catch(e){}\n\nif(error.code !== 11000)\nthrow new Error(msg.error.message);\n\nconst prefix = global.get('settings.mongo.accountPrefix');\nmsg.payload = {\n    model: `${prefix}Account`, \n    request: [\n        {address: msg.payload.request.address}, \n        {$set:{ \n            isActive: true\n        }}\n        ]\n   \n};\n\nreturn msg;","outputs":1,"noerr":0,"x":820,"y":80,"wires":[["8eb922da.30d21"]]},{"id":"8eb922da.30d21","type":"mongo","z":"2c9dd332.05334c","model":"EthAccount","request":"{}","options":"","name":"mongo","mode":"1","requestType":"2","dbAlias":"primary.accounts","x":1030,"y":80,"wires":[[]]},{"id":"623d7287.8bfe9c","type":"async-function","z":"2c9dd332.05334c","name":"calc balance","func":"const _ = global.get('_');\nconst prefix = global.get('settings.mongo.accountPrefix');\n\nmsg.address = msg.payload.address\nlet assets = _.chain(msg.payload.assets)\n    .transform((acc, addr) => {\n        acc[addr] = 0;\n        }, {})\n    .value();\n    node.warn(msg.payload.address);\nmsg.payload = {\n    model: `${prefix}Account`, \n    request: {\n       address: msg.payload.address,\n       balance: 0,\n       assets,\n       isActive: true\n    }\n};\n\nreturn msg;","outputs":1,"noerr":0,"x":649.9999542236328,"y":177.99998950958252,"wires":[["27b27b8e.9827a4","3802c430.79c60c"]]},{"id":"66d9378b.b5ca68","type":"amqp in","z":"2c9dd332.05334c","name":"post addresses","topic":"${config.rabbit.serviceName}.account.create","iotype":"3","ioname":"events","noack":"0","durablequeue":"1","durableexchange":"0","server":"","servermode":"1","x":120.00000762939453,"y":258.00001525878906,"wires":[["e63736fc.ecaf58"]]},{"id":"10b75c3d.f32764","type":"function","z":"2c9dd332.05334c","name":"parse","func":"\nif(msg.amqpMessage)\n    msg.amqpMessage.ackMsg();\n\nmsg.payload = JSON.stringify({address: msg.address})\n\nreturn msg;","outputs":1,"noerr":0,"x":1110,"y":180,"wires":[["e69e2f39.1956d","8bd2010a.334c7"]]},{"id":"e63736fc.ecaf58","type":"function","z":"2c9dd332.05334c","name":"parse","func":"\nmsg.payload = JSON.parse(msg.payload);\n\nreturn msg;","outputs":1,"noerr":0,"x":330,"y":260,"wires":[["623d7287.8bfe9c"]]},{"id":"e69e2f39.1956d","type":"amqp out","z":"2c9dd332.05334c","name":"","topic":"${config.rabbit.serviceName}.account.created","iotype":"3","ioname":"events","server":"","servermode":"1","x":1270,"y":140,"wires":[]},{"id":"63ec21e7.0aa9b","type":"amqp in","z":"2c9dd332.05334c","name":"delete addresses","topic":"${config.rabbit.serviceName}.account.delete","iotype":"3","ioname":"events","noack":"0","durablequeue":"1","durableexchange":"0","server":"","servermode":"1","x":120,"y":460,"wires":[["9966b6dc.782878"]]},{"id":"9966b6dc.782878","type":"function","z":"2c9dd332.05334c","name":"parse","func":"\nmsg.payload = JSON.parse(msg.payload);\n\nreturn msg;","outputs":1,"noerr":0,"x":330,"y":460,"wires":[["316484c0.63001c"]]},{"id":"e7d143e1.bb6ec","type":"function","z":"2c9dd332.05334c","name":"parse","func":"\nif(msg.amqpMessage)\n    msg.amqpMessage.ackMsg();\n\nmsg.payload = JSON.stringify({address: msg.address})\n\nreturn msg;","outputs":1,"noerr":0,"x":970,"y":420,"wires":[["9cbed3f4.973d1"]]},{"id":"9cbed3f4.973d1","type":"amqp out","z":"2c9dd332.05334c","name":"","topic":"${config.rabbit.serviceName}.account.deleted","iotype":"3","ioname":"events","server":"","servermode":"1","x":1110,"y":420,"wires":[]},{"id":"692906ce.c34228","type":"switch","z":"2c9dd332.05334c","name":"","property":"amqpMessage","propertyType":"msg","rules":[{"t":"null"},{"t":"nnull"}],"checkall":"true","outputs":2,"x":490,"y":1120,"wires":[["2e2f80ee.29994"],["20e2bac.5686746","71f5d41.f7d1d2c"]]},{"id":"20e2bac.5686746","type":"async-function","z":"2c9dd332.05334c","name":"parseEnd","func":"if(msg.error.message.includes('CONNECTION ERROR')){\n    await Promise.delay(5000);\n    await msg.amqpMessage.nackMsg();\n}else{\n    await msg.amqpMessage.ackMsg();\n}\n    \nmsg.payload = typeof msg.error.message;    \n    \nreturn msg;","outputs":1,"noerr":6,"x":720,"y":1160,"wires":[[]]},{"id":"71f5d41.f7d1d2c","type":"debug","z":"2c9dd332.05334c","name":"","active":true,"console":"false","complete":"error","x":719.0729522705078,"y":1205.895881652832,"wires":[]},{"id":"82a83666.a276e8","type":"debug","z":"2c9dd332.05334c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","x":253.0833282470703,"y":1274.9063186645508,"wires":[]},{"id":"8bd2010a.334c7","type":"amqp out","z":"2c9dd332.05334c","name":"","topic":"${config.rabbit.serviceName}_user.created","iotype":"3","ioname":"internal","server":"","servermode":"1","x":1280,"y":200,"wires":[]},{"id":"ae15fd51.beb4c","type":"amqp in","z":"2c9dd332.05334c","name":"post addresses","topic":"address.created","iotype":"3","ioname":"profile","noack":"0","durablequeue":"1","durableexchange":"0","server":"","servermode":"1","x":80,"y":160,"wires":[["c8784e2b.f2ce4","43c9e995.61a078"]]},{"id":"e3fd9d43.42e5e","type":"amqp in","z":"2c9dd332.05334c","name":"delete addresses","topic":"address.deleted","iotype":"3","ioname":"profile","noack":"0","durablequeue":"1","durableexchange":"0","server":"","servermode":"1","x":120,"y":360,"wires":[["61122196.55e1"]]},{"id":"83f847e6.918bf8","type":"laborx_auth","z":"2c9dd332.05334c","name":"laborx_auth","configprovider":"1","providerpath":"http://localhost:3001","x":230,"y":940,"wires":[["6731d0f7.68fb4"]]},{"id":"61122196.55e1","type":"switch","z":"2c9dd332.05334c","name":"isWaves?","property":"payload['waves-address']","propertyType":"msg","rules":[{"t":"nnull"}],"checkall":"true","repair":false,"outputs":1,"x":280,"y":360,"wires":[["4ee078f5.761d18"]]},{"id":"4ee078f5.761d18","type":"function","z":"2c9dd332.05334c","name":"parse","func":"\nmsg.payload.address = msg.payload['waves-address'];\nreturn msg;","outputs":1,"noerr":0,"x":410,"y":360,"wires":[["316484c0.63001c"]]},{"id":"c8784e2b.f2ce4","type":"laborx_get_addr","z":"2c9dd332.05334c","addr":"waves-address","name":"laborx_get_addr","x":340,"y":160,"wires":[["623d7287.8bfe9c","e2b56743.2f2558"]]},{"id":"43c9e995.61a078","type":"debug","z":"2c9dd332.05334c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":240,"y":100,"wires":[]},{"id":"e2b56743.2f2558","type":"debug","z":"2c9dd332.05334c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":480,"y":100,"wires":[]},{"id":"3802c430.79c60c","type":"debug","z":"2c9dd332.05334c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":780,"y":280,"wires":[]}]}
  }, {upsert: true}, done);
};

module.exports.down = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.remove({"path":"2c9dd332.05334c","type":"flows"}, done);
};
