const axios = require('axios')
const URL = 'https://swapi.co/api/people'

async function obterPessoas (nome){
    const url = `${URL}/?serach=${nome}&format=json`
    const response = await axios.get(url)
    return response.data
}

// obterPessoas('leia Organa')
//     .then(function(resultado){
//         console.log('resultado',resultado)
//     })
//     .catch(function(error){
//         console.error('DEU RUIM',error)
//     })

module.exports ={
    obterPessoas : obterPessoas
}