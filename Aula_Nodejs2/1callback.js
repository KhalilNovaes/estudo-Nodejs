/*
0- obter usuario
1- Obter o numeto de telefone do usuario a partir de um id
2- Obter o endereço a parir do ID

-- Aprendendo a lidar com callback 
--Aprendendo a sincronizar informaçoes 

FLUXO DE OPERAÇOES DO JS

*/


//setTimeout() é para simular o tempo de busca em um banco de dados
//Tudo que é executado em segundo plano precisa de uma função que seja chamada quando termina a execução 


function obterUsuario(callback){
    setTimeout(function (){
// retornando callback com primiero valor nulo para o erro e segundo com o usuario para usuario
        return callback(null,{
            id:1,
            nome:'Cesar',
            nascimento: new Date()
        })
    },1000)
}

function obterTelefone(idUsuario,callback){
    setTimeout(()=>{
        return callback(null,{
            telefone:'9787812',
            ddd:11
        })
    },2000)
}

function obterEndereco(idUsuario,callback){
    setTimeout(()=>{
        return callback(null,{
            rua:'rua dos bobos',
            numero:0
        })
    },2000)

}

//por padrão utilizamos o primiero parametro como erro, chamado padrão callback
function resolverUsuario(erro, usuario){
    console.log('usuario',usuario)

    if(error){
        console.log('DEU RUIM NO USUARIO',error)
        return;
    }
}


//assim que resolver a função obterUsuario ele vai executar o resolverUsuario sincronizando as funçoes
obterUsuario(function resolverUsuario(error,usuario){

    if(error){
        console.error('DEU RUIM NO USUARIO',error)
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(error1,telefone){
        if(error1){
            console.error('DEU RUIM NO TELEFONE',error)
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(error2,endereco){
            if(error2){
                console.error('DEU RUIM NO ENDEREÇO',error)
                return;
            } 
            
            console.log(`
                Nome: ${usuario.nome}
                Endereço: ${endereco.rua},${endereco.numero}
                Telefone: (${telefone.ddd})${telefone.telefone}
            `)
        
        })
    })
})