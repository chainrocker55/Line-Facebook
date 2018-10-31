const express = require('express')
const app = express()
const line = require('@line/bot-sdk')
const port = 3001
var bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.options('*', cors());

// /is root url

const config = {
    channelAccessToken: "w0oapH5vEPL2xO2kSKiMWo9rZ+PcYQIlfwxjiV7eNTOkcrZg1eM96+kEcLPsW8Qp9oRwbQZk5c3LMPnzcZP7a2SCG5hwfn1+ODLotAnlDxDmIprsbZvyfjhkeQ7KGAzycYuoKzNrA6q/F41e6OmsCwdB04t89/1O/w1cDnyilFU=",
    channelSecret: "cb6f4c16b82e4eb8a7eb36fa915a8710"
}
const client = new line.Client(config)


app.get('/', (req, res) => {
    res.send("Hello world")
})
 app.post('/', line.middleware(config), (req, res) => {
   
     Promise.all(req.body.events.map(handleEvent)).then((result)=>res.json(result))
    
 })
var sender = `Uc5527e90cf3cab8c540dd8f41d70aec1`
// app.post('/alert/login/facebook',bodyParser.json(), (req, res) => {
//     console.log('LOGIN')
//     var text = req.body.events[0].message.text
    
//     var replyToken = req.body.events[0].replyToken
//     console.log(sender)
//     //console.log(text, sender, replyToken)
//     //console.log(typeof sender, typeof text)
//     // console.log(req.body.events[0])
   
//         sendText(sender)
    
//     res.sendStatus(200)
//   })
app.post('/alert/login/facebook',bodyParser.json(), async(req, res) =>{
    console.log(req.body);
    client.pushMessage(req.body.id,{
        type:"image",
        originalContentUrl:req.body.img,
        previewImageUrl:req.body.img,
    }),
    client.pushMessage(req.body.id,{
        type:"text",
        originalContentUrl:req.body.img,
        previewImageUrl:req.body.img,
        text:"User : " +req.body.name +" Email : "+req.body.email,
     })
     ,
    client.pushMessage(req.body.id,{
        type:"text",
        text:req.body.token,
    })

})
function handleEvent(event) {
    if (event.message.type == 'text' ){
        return client.replyMessage(event.replyToken, {
            type: 'text',
            text: event.message.text
        })
    }else if( event.message.type == 'sticker' ){
        return client.replyMessage(event.replyToken, {
            type:'sticker',
            packageId:'1',
            stickerId:'131'
            //  type: 'text',
            //  text: event.message.text
        })
       
    }
    return client.replyMessage(event.replyToken, {
          type: 'text',
         text: "อะไรหรอ ?"
    })
    //return Promise.resolve("อะไร ไม่รู้เรื่อง")

}
app.listen(port, () => console.log(`App running ${port}`))