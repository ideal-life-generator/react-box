import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
// import fallback from 'express-history-api-fallback'
import session from 'express-session'
import connectRedis from 'connect-redis'
import graphql from 'express-graphql'
import { blue } from 'chalk'
import ytdl from 'ytdl-core'
import schema from './graphql'
import { SERVER_PORT } from './config'

const app = express()

const RedisSession = connectRedis(session)

app.use(cookieParser())
app.use(bodyParser.json())
app.use(session({
  store: new RedisSession(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(express.static('./'))

// app.use(fallback('index.html', { root: 'localhost:3000' }))

app.use('/graphql', graphql(req => ({
  schema,
  context: { session: req.session },
  graphiql: true
})))

// const getMp3 = id => new Promise((resolve, reject) => {
//   const youtubeDl = spawn(resolvePath('youtube-dl.exe'), [
//     '--extract-audio',
//     '--audio-format=mp3',
//     id,
//   ])

//   let result = ''

//   youtubeDl.stdout.on('data', data => {
//     result += data.toString()
//   })

//   youtubeDl.on('close', () => {
//     resolve(result)
//   })
// })

app.get('/youtube/mp3/:id', (req, res) => {
  const { params: { id } } = req

  // const mp3 = await getMp3(id)

  // console.log(mp3)

  ytdl(id).pipe(res)
})

app.get('*', (ctx) => {
  ctx.body = 'Koa server'
})

app.listen(SERVER_PORT, () => console.info(blue(`Server is listening on ${SERVER_PORT} port`)))
