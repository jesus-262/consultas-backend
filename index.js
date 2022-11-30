const app = require('./app');


//configuracion

//inicar servidor
async function main(){
        await app.listen(app.get('port'));
        console.log("inicio servidor "+ app.get('port'));
}
main();


