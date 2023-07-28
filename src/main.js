const  app = require('./app/index')

const {APP_POST} = require('./config/config.default');

app.listen(APP_POST,()=>{
    console.log(`server listening on http://localhost:${APP_POST}`);
})