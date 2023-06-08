import bcrypt from "bcrypt";
const checkRegisterInput = (email,password) =>{

    return email && password

}
const comparePassword = (password,hashedPassword) =>{
   
    return bcrypt.compareSync(password,hashedPassword);
}
export {
    checkRegisterInput,
    comparePassword,
}