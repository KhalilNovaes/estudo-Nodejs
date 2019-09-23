const service = require('./service')

async function main(){
    try{
        const result = await service.obterPessoas('a')
        const names = []

//FOR

            console.time('for')
        for(let x=0; x<= result.results.length -1;x++){
            const pessoa = result.results[x]
            names.push(pessoa.name)
        }
            console.timeEnd('for')
//FORIN

            console.time('forin');
    for(let x in result.results){
        const pessoa = result.results[x]
        names.push(pessoa.name)
    }
            console.timeEnd('forin');
//FOROF

            console.time('forof');
        for (pessoa of result.results){
            names.push(pessoa.name)
        }
            console.timeEnd('forof')

        console.log(`names`,names)
}
    catch (error){
        console.error(`error interno`,error)
    }
}
main()