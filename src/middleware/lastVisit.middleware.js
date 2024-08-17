export const setLastVisit = (req,res,next)=>{
    //if cookie is set, then add a local variable with last visit time data ,  whatever data will have in cookies
    //we will store that in local variables and that variable value will be render on our views.
    if(req.cookies.lastVisit){
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString()
    }
    res.cookie("lastVisit", new Date().toISOString(),{
        maxAge: 2 * 24 * 60 * 60 * 1000
    })
    next();
}