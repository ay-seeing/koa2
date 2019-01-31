const koa = require('koa')
const path = require('path')
const views = require('koa-views')    // html模板引擎中间件
// const static = require('koa-static')    // 加载静态资源中间件
const compose = require('koa-compose')    // 中间件合并
const bodyparser = require('koa-bodyparser')    // 获取post请求参数
const Router = require('koa-router')     // 路由中间件


const app = new koa()

const router = new Router()   // 初始化 koa-router 中间件


app.use(views(path.resolve(__dirname), {
    map: {html: 'ejs'}
}));


router.get('/', async (ctx, next)=>{
    console.log('one start')
    await next()
    ctx.response.status = 200
    ctx.response.type = 'text/html'
    let a = 56789;
    // ctx.response.body = ``
    await ctx.render('t.html', {a,url: ctx.request.url, requestStr: JSON.stringify(ctx.request)})
})

router.post('/', async (ctx, next)=>{
    await next()
    let postData = ctx.request.body
    ctx.body=postData
})

app
    .use(bodyparser())
    .use(router.routes())
    .use(router.allowedMethods)

// app.use(async  (ctx, next)=> {
//     console.log('one start')
//     await next()
//     ctx.response.status = 200
//     ctx.response.type = 'text/html'
//     let a = 56789;
//     if(ctx.url=='/' && ctx.method=='GET'){
//         ctx.response.body = `
//             <head>
//                 <meta charset="utf-8">
//                 <meta content="yes" name="apple-mobile-web-app-capable">
//                 <meta content="yes" name="apple-touch-fullscreen">
//                 <meta content="telephone=no,email=no" name="format-detection">
//                 <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
//                 <meta name="description" id="safarishareqq" content="一条生活馆">
//                 <link rel="apple-touch-icon" id="safarishare">
//                 <!-- <link rel="manifest" href="https://asset.yit.com/h5r/manifest.json"> -->
//                 <link rel="shortcut icon" href="https://asset.yit.com/h5r/favicon.ico">
//                 <title>我的</title>
//             </head>
//             <body>
//                 <h2>Hello World</h2>
//                 <p>${a}</p>
//                 <p>${ctx.request.url}</p>
//                 <p>${JSON.stringify(ctx.request)}</p>
//                 <p>ctx.request.query</p>
//                 <form method="POST" action="/">
//                     <input name="name" type="text" />
//                     <input name="password" type="password" />
//                     <button type="submit">提交</button>
//                 </form>
//             </body>`
//     }else if(ctx.url=='/' && ctx.method=='POST'){   // 判断post请求，打印参数
//         let postData = ctx.request.body
//         ctx.body=postData
//     }
//     console.log('one end')
// })



app.use(async (ctx, next)=>{
    console.log('two start')
    await next()
    console.log('two end')
})

async function middleware1(ctx, next){
    console.log('m1 start')
    await next()
    console.log('m1 end')
}
async function middleware2(ctx, next){
    console.log('m2 start')
    await next()
    console.log('m2 end')
}

const all = compose([middleware1, middleware2])

app.use(all)

app.listen(3000)