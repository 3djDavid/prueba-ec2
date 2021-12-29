const bcrypt= require('bcrypt');

const encriptarPass = async(textPlain)=>{
    const hash= await bcrypt.hash(textPlain,10)
    return hash
}


const compararPass = async (passwordPlain, hashPassword)=>{
    return await bcrypt.compare(passwordPlain, hashPassword)
}

module.exports= {encriptarPass, compararPass};