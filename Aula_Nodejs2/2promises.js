
//importamos um moculo interno do node.js

const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(){
//Agora é retornado um objeto promise
//REJECT -> quando algo der errado, o erro sera tratado automaticamnete => reject(ERRO)
//RESOLVE -> chamado quando tudo da certo
    return new Promise(function resolvePromise(resolve,reject){
        setTimeout(function (){
//momento em q o promisse é retornado para o resolve (não é necessario o null pois todos os erros são tratados automaticamente pelo reject)
            return resolve({
                id:1,
                nome:'Cesar',
                nascimento: new Date()
            })
        },1000)
    })
}

//tiramos o callback
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


const usuarioPromise = obterUsuario();
//Para manipular o sucesso usamos .then
//Para manipular erro, usamos .catch
//usuario -> telefone-> telefone
usuarioPromise
    .then(function (usuario){
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(resultado){
            return{
                usuario:{
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: resultado
            }
        })
    })
    .then(function (resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result){
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado){
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua},${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `)
    })
    .catch(function(error){
        console.error('DEU RUIM',error)
    })




// obterUsuario(function resolverUsuario(error,usuario){

//     if(error){
//         console.error('DEU RUIM NO USUARIO',error)
//         return;
//     }

//     obterTelefone(usuario.id, function resolverTelefone(error1,telefone){
//         if(error1){
//             console.error('DEU RUIM NO TELEFONE',error)
//             return;
//         }
//         obterEndereco(usuario.id, function resolverEndereco(error2,endereco){
//             if(error2){
//                 console.error('DEU RUIM NO ENDEREÇO',error)
//                 return;
//             } 
            
//             console.log(`
//                 Nome: ${usuario.nome}
//                 Endereço: ${endereco.rua},${endereco.numero}
//                 Telefone: (${telefone.ddd})${telefone.telefone}
//             `)
        
//         })
//     })
// })