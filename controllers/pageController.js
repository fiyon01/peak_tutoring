const renderHome =async(req,res)=>{
    res.render("index")
}
const renderAbout =async(req,res)=>{
    res.send("aboutpage")
}
const renderContact =async(req,res)=>{
    res.render("contact")
}
const renderMaterials =async(req,res)=>{
    res.render("downloads")
}
const renderQuizes =async(req,res)=>{
    res.render("quizes")
}
const renderCheckout =async(req,res)=>{
    res.render("checkout")
}

module.exports ={renderHome,renderAbout,renderContact,renderMaterials,renderQuizes,renderCheckout}