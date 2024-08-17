import path from 'path';
import productModel from '../models/product.models.js';

export default class productController{
    getProducts(req,res,next){
        let products = productModel.get();
        console.log(products)
        console.log(path.resolve())
        res.render('products',{products, userEmail: req.session.userEmail})
       // return res.sendFile(path.join(path.resolve(),"src","views",'product.html'));
    }

    getAddForm(req,res,next){
        return res.render('new-product', {errorMessage: null, userEmail: req.session.userEmail});
    }

    addNewProduct(req,res,next){
        //to access data from forms
        console.log(req.body)
        const {name, desc, price} = req.body;
        const imageUrl = 'images/' + req.file.filename
        productModel.add(name, desc, price, imageUrl)
        let products = productModel.get();
        return res.render('products',{products , userEmail: req.session.userEmail})
    }

    getUpdateProduct(req,res,next){
        //if product exist return view
        const id = req.params.id;
        const productFound = productModel.getById(id);

        if (productFound){
            console.log(productFound);
            res.render('update-product',
            {product: productFound, 
            errorMessage: null, userEmail: req.session.userEmail});
            //return error
        }else{
            res.status(401).send('product not found');
        }
        
    }

    postUpdateProduct(req,res){
        productModel.update(req.body)
        let products = productModel.get();
        res.render('products',{products})
    }
    deleteProduct(req,res){
        const id = req.params.id;
        
        const productFound = productModel.getById(id);
        if (!productFound){
            return res.status(401).send('product not found');
        }
        productModel.delete(id)
        var products = productModel.get();
        res.render('products',{products})
    }
    
}

export{productController};