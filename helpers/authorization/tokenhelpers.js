const sendJwttoTocken =(user,res)=>{
    
    const {JWT_COOKIE} = process.env;
    const token = user.generateJwtFromUser();
    console.log(token);
    return res.status(200).cookie("access_token",token,{
        httpOnly:true,
        expiresIn:new Date(Date.now+ parseInt(JWT_COOKIE)*1000*60),
        secure:false
    }).json({
        success:true,
        access_token: token,
        data:{
            name:user.name,
            profile:user.profile,
            email:user.email,
        }
    })
}
const isTockenIncluded = req=> req.headers.authorization && req.headers.authorization.startsWith("Bearer");

const AuthorizationControlTokenFromHeader = req =>{
    const authorization = req.headers.authorization;
    const access_token = authorization.split(" ")[1];
    return access_token
}

export{
    sendJwttoTocken,
    isTockenIncluded,
    AuthorizationControlTokenFromHeader
}