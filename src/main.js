const Koa = require('koa');
const {APP_POST} = require('./config/config.default');

const app = new Koa();

// 中间件
app.use((ctx,next)=>{
    ctx.body ='hello 哈哈哈'
})

app.listen(APP_POST,()=>{
    console.log(`server listening on http://localhost:${APP_POST}`);
})