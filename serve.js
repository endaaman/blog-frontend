import fs from 'fs'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { handler } from './build/handler.js'


const app = express()

const proxy = createProxyMiddleware({
  target: process.env.UPSTREAM_HOST,
  changeOrigin: true,
})

console.log(`PROXY TO: "${process.env.UPSTREAM_HOST}"`, )

const port = process.env.PORT || 8000

app.use('/api/*', proxy)
app.use('/static/*', proxy)
app.use(handler)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
