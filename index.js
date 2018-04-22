const API = require('./lib/api').API


var api = new API()

api.get('/heatingCircuits/hc1/manualRoomSetpoint')
