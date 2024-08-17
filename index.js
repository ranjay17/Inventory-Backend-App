import express from 'express'
import {productController} from './src/controllers/product.controller.js';
import path from 'path';
import validationMiddleware from './src/middleware/validation.middleware.js';
import ejsLayouts from 'express-ejs-layouts';
import { uploadFile } from './src/middleware/file-upload.middleware.js';
import userController from './src/controllers/user.controller.js';
import session from 'express-session';
import { auth } from './src/middleware/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middleware/lastVisit.middleware.js';
const port = 3400;
const server = express();


server.use(express.static('public'));
server.use(cookieParser());
server.use(setLastVisit);
server.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {secure : false}
    //cookie secure false as our communication is happening on HTTP protocol and HTTP protocol by default is not 
    //secure. for security we use HTTP S protocol. when sending id to unsecured network can specified
    //secure: false.
}))
// PARSE FORM DATA otherwise it will not post the new product
server.use(express.urlencoded({extended: true}));

// setup the view engine
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(),"src","views"))

server.use(ejsLayouts);

//creating instance of class productController
const productControllers = new productController();
const userControllers = new userController()

server.get('/register', userControllers.getRegister)
server.get('/login', userControllers.getLogin)
server.post('/register', userControllers.postRegister)
server.post('/login', userControllers.postLogin);
server.get('/logout', userControllers.logout)
server.get('/',auth,productControllers.getProducts)
server.get('/new',auth,productControllers.getAddForm)
server.get('/update-product/:id', auth ,productControllers.getUpdateProduct)
server.post('/update-product',auth, productControllers.postUpdateProduct);
server.post('/delete-product/:id',auth, productControllers.deleteProduct)
server.post('/', 
uploadFile.single('imageUrl'),
validationMiddleware ,auth,
productControllers.addNewProduct
);


server.use(express.static('src/views'))

server.listen(port, function(err){
    if(err){
        console.log('Error:',err);
    }else{
        console.log(`server is running on port: ${port}`);
    }
})

// view engine or template egine allow you to add dynamic content to your html files
// we can access js variables into html directly with the help of view engine