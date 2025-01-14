const renderSignup =async(req,res)=>{
    res.render("signup")
}
const renderLogin =async(req,res)=>{
    res.render("login")
}

module.exports ={renderSignup,renderLogin}