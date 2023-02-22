import { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'
// import https from 'https'

export default (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  const proxy = httpProxyMiddleware(req, res, {
    target: process.env.API_ORIGIN,
    changeOrigin: true,
    headers: {
    },
    pathRewrite: [{
      patternStr: '^/api',
      replaceStr: ''
    }],
    // agent:new https.Agent({
    //   rejectUnauthorized: false
    // })
  })
  return proxy
}
