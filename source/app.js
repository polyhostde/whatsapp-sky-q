//WHATSAPP
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();
const SkyQ = require('sky-q');
const SkyRemote = require('sky-remote');

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.once('ready', () => {
    console.log('Client is ready!');
});

//SKY
const config = require('../config.json');
const secure_pin = config.secure_pin
const ip = config.ip
const box = new SkyQ({ip:ip})
var remoteControl = new SkyRemote(ip);



client.on('message', async (message) => {
    if(message.body === secure_pin + "!sky power") {

        await box.getPowerState().then(isOn=>{
            if (isOn) {
              console.log("Die Box wird ausgeschaltet.")
            } else {
              console.log("Die Box wird angeschaltet.")
            }
          }).catch(err=>{
            message.reply("Fehler ist aufgetreten.")
            console.error("Perhaps looking at this error will help you figure out why", err)
          })

          remoteControl.press('power');

        

    }
})

client.initialize();