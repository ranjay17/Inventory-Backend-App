import userModel from "../models/user.model.js";
import productModel from "../models/product.models.js";

export default class UserController{
    getRegister(req,res){
        res.render('register')
    }
    getLogin(req,res){
        res.render('login', {errorMessage: null});
    }
    postRegister(req,res){
        const{name,email,password} = req.body
        userModel.add(name,email,password)
        res.render('login', {errorMessage: null})
    }
    postLogin(req,res){
        const {email, password} = req.body;
        const user = userModel.isValidUser(email, password);
        if (!user){
            return res.render('login',{
                errorMessage: "Invalid Credentials"
            })
        }
        req.session.userEmail = email;
        let products = productModel.get();
        return res.render('products',{products, userEmail: req.session.userEmail})
    }
    
    logout(req,res){
        //on logout destroy the sessions
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/login');
            }
        })
        res.clearCookie('lastVisit')
    }
}
