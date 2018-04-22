
const rp = require('request-promise-native')
const Encryption = require('./encryption');
const config = require('config')


let sequenceNo = 1
class API {
  constructor() {
    console.log("Config", config.get('api.serialNumber'), config.get('api.accessKey'), config.get('api.password'))
    this.encryption = Encryption(
      config.get('api.serialNumber'),
      config.get('api.accessKey'),
      config.get('api.password')
    );
  }

  get(path) {
    var url = config.get('api.host') + path
    var opts = {
      url: url,
      headers: {
        "User-Agent": "TeleHeater",
        "Seq-No": sequenceNo++,
        "Accept": "application/json"
      }
    }
    rp(opts)
      .then((body) => {
        body = body.trim()
        console.log("==== Response ====")
        console.log(body)

        var decrypted = this.encryption.decrypt(body).replace(/\0*$/g, '');
        console.log("==== Decrypted ====")
        console.log(decrypted)
      })
      .catch(function (err) {
        console.error("Error: " + err)
      })
  }
}

exports.API = API
