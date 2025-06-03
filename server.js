import app from './src/app';

const port = process.env.PORT;
app.listen(port, () =>{
        console.log('Serividor rodando na porta: ', port);
})