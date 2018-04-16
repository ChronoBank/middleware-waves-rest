
module.exports.id = '26.e415e43d.f10178';

const _ = require('lodash'),
  config = require('../config');

/**
 * @description flow e415e43d.f10178 update
 * @param done
 */
   

module.exports.up = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.update({"path":"e415e43d.f10178","type":"flows"}, {
    $set: {"path":"e415e43d.f10178","body":[{"id":"6b2f3912.a09f08","type":"http response","z":"e415e43d.f10178","name":"","statusCode":"","x":907.500019073486,"y":395.5000133514401,"wires":[]},{"id":"12413869.ddc528","type":"http in","z":"e415e43d.f10178","name":"tx","url":"/tx/:hash","method":"get","upload":false,"swaggerDoc":"","x":288.75,"y":395.5,"wires":[["92a80432.496758"]]},{"id":"b68ffffb.8e49e","type":"catch","z":"e415e43d.f10178","name":"","scope":null,"x":307,"y":585,"wires":[["49075d44.432d44","cf9070d6.5ab8d"]]},{"id":"5c2fd91f.e496a8","type":"http response","z":"e415e43d.f10178","name":"","statusCode":"","x":764,"y":586,"wires":[]},{"id":"49075d44.432d44","type":"function","z":"e415e43d.f10178","name":"transform","func":"\nlet factories = global.get(\"factories\"); \n\nmsg.payload = factories.messages.generic.fail;\n    \nreturn msg;","outputs":1,"noerr":0,"x":548,"y":585,"wires":[["5c2fd91f.e496a8"]]},{"id":"cf9070d6.5ab8d","type":"debug","z":"e415e43d.f10178","name":"","active":true,"console":"false","complete":"error","x":451,"y":539,"wires":[]},{"id":"cb93a20a.bb5d3","type":"http in","z":"e415e43d.f10178","name":"history","url":"/tx/:addr/history","method":"get","upload":false,"swaggerDoc":"","x":281,"y":237,"wires":[["e558bff.7e2784"]]},{"id":"e558bff.7e2784","type":"function","z":"e415e43d.f10178","name":"parse","func":"const prefix = global.get('settings.mongo.collectionPrefix');\nconst _ = global.get('_');\n\nmsg.address = msg.req.params.addr.toLowerCase();\n\n\nmsg.payload = {\n    model: `${prefix}Block`, \n    request: [\n  {\n    $match: {\n      $or: [\n        {'transactions.recipient': msg.address},\n        {'transactions.sender': msg.address}\n      ]\n    }\n  },\n\n  {\n    $project: {\n        number: { in: '$number' },\n        hash: {in: '$hash' },\n      transactions: {\n        $map: {\n          input: '$transactions',\n          as: 'transactions',\n          in: {\n            timestamp: {$cond: ['$timestamp', '$timestamp' ,Date.now()]},\n            recipient: '$$transactions.recipient',\n            sender: '$$transactions.sender',\n            hash: '$$transactions.hash'\n          }\n        }\n      }\n    }\n  },\n  {$unwind:'$transactions'},\n  {$match: {\n      $or: [\n        {'transactions.recipient':  msg.address},\n        {'transactions.sender':  msg.address}\n      ]\n        }},\n        \n  {$group: {_id: 'a', transactions: {$push: '$transactions'}}},\n  {\n    $project: {\n      unconfirmed: {\n        $filter: {\n          input: \"$number\",\n          cond: {$eq: ['$number', -1]}\n        }\n      },\n      confirmed: {\n        $filter: {\n          input: \"$number\",\n          cond: {$gt: ['$number', -1]}\n        }\n      },\n\n    }\n  },\n  {\n    $project: {\n      transactions: {$setUnion: ['$unconfirmed', '$confirmed']}\n    }\n},\n{$unwind: '$transactions'},\n{$sort:{'transactions.timestamp':-1}},\n{$skip: parseInt(msg.req.query.skip) || 0},\n{$limit:  parseInt(msg.req.query.limit) || 100},\n{$group: {_id: 'a', transactions: {$push: '$transactions'}}}\n]\n}\n\nreturn msg;","outputs":1,"noerr":0,"x":425.0000534057617,"y":238.00000429153442,"wires":[["45ab2beb.917bc4","2d683b6e.b00f64"]]},{"id":"45ab2beb.917bc4","type":"mongo","z":"e415e43d.f10178","model":"","request":"{}","options":"{}","name":"mongo","mode":"1","requestType":"4","dbAlias":"primary.data","x":603,"y":237,"wires":[["6c4319f3.a9a028"]]},{"id":"ab0df8ed.00d388","type":"http response","z":"e415e43d.f10178","name":"","statusCode":"","x":909,"y":236,"wires":[]},{"id":"6c4319f3.a9a028","type":"function","z":"e415e43d.f10178","name":"parse","func":"const _ = global.get('_');\n\n\nconst arr0 = _.get(msg, 'payload.0.0.transactions', []);\nconst arr1 = _.get(msg, 'payload.1.0.transactions', []);\n\n\n\nmsg.payload = _.get(msg.payload, '0.transactions');\n\n\nreturn msg;","outputs":1,"noerr":0,"x":749,"y":236,"wires":[["ab0df8ed.00d388"]]},{"id":"92a80432.496758","type":"async-function","z":"e415e43d.f10178","name":"requestTx","func":"const requests = global.get('requests');\nrequests.setNodeConfig(global.get('nodeConfig'));\nmsg.payload = await requests.getBlockByHash(msg.req.params.hash);\nreturn msg;\n","outputs":1,"noerr":1,"x":499.96533203125,"y":387.54169273376465,"wires":[["6b2f3912.a09f08"]]},{"id":"2d683b6e.b00f64","type":"debug","z":"e415e43d.f10178","name":"","active":true,"console":"false","complete":"false","x":573.8577346801758,"y":101.56945991516113,"wires":[]}]}
  }, {upsert: true}, done);
};

module.exports.down = function (done) {
  let coll = this.db.collection(`${_.get(config, 'nodered.mongo.collectionPrefix', '')}noderedstorages`);
  coll.remove({"path":"e415e43d.f10178","type":"flows"}, done);
};