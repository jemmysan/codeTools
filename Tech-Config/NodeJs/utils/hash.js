import bcrypt from 'bcryptjs';

export const doHash = async (value, saltValue) =>{
    return  await  bcrypt . compare ( value, saltValue) ;
} 

export const doHashValidation = async (value, hashedValue) =>{
    return  await  bcrypt . compare ( value, hashedValue) ;
}

