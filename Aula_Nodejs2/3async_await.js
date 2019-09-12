


const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(){

    return new Promise(function resolvePromise(resolve,reject){
        setTimeout(function (){

            return resolve({
                id:1,
                nome:'Cesar',
                nascimento: new Date()
            })
        },1000)
    })
}


function obterTelefone(idUsuario){
    return new Promise(function resolvePromise(resolve,reject){
        setTimeout(()=>{
            return resolve({
                telefone:'9787812',
                ddd:11
            })
        },2000)
    })
}

function obterEndereco(idUsuario,callback){
    setTimeout(()=>{
        return callback(null,{
            rua:'rua dos bobos',
            numero:0
        })
    },2000)

}

function resolverUsuario(erro, usuario){
    console.log('usuario',usuario)

    if(error){
        console.log('DEU RUIM NO USUARIO',error)
        return;
    }
}

//1 passo - adicionar a palavra async a função (assim a função automaticamente retornara uma promise)
async function main(){
    try{
        console.time('medida-promise')
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const endereco = resultado[1]
        const telefone = resultado[0]
//como telefone e endereço não dependem da resposta da função usuario podem ser executadas em segundo plano assyncronamente
        console.log(`
            Nome: ${usuario.nome}
            Telefone:(${telefone.ddd}) ${telefone.telefone}
            Endereço:${endereco.rua}, ${endereco.numero}
        `)
        console.timeEnd('medida-promise')
    }
    catch(error){
        console.error('DEU RUIM',error)
    }
}

main()