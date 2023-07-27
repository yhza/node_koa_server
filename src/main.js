const Koa = require('koa');

const app = new Koa();

// 中间件
app.use((ctx,next)=>{
    ctx.body ='hello api'
})

app.listen(3000,()=>{
    console.log('server listening on http://localhost:3000');
})