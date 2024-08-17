//models is just a class with some property

export default class productModel{
    
    constructor(_id,_name,_desc,_price,_imageUrl){
        this.id = _id;
        this.name = _name;
        this.desc = _desc;
        this.price = _price;
        this.imageUrl = _imageUrl;


    }
    static get(){
        return product
    }
    static add(name,desc,price, imageUrl){
      let newProduct = new productModel(
        product.length+1, 
        name,
        desc,
        price,
        imageUrl
        );
      product.push(newProduct);
    }

    static getById(id){
      return product.find((p)=>p.id == id);
    }

    static update(productObj){
      const index = product.findIndex(
        (p) => p.id == productObj.id
        );
        product[index] = productObj;
    }
    static delete(id){
      const index = product.findIndex(
        (p)=> p.id == id
      );
      if (index !== -1) {
        product.splice(index, 1);
    }
    }
}



var product = [
    new productModel(
      1,
      'Apple iPhone 15 (256 GB)',
      `DYNAMIC ISLAND COMES TO IPHONE 15`,
      '₹80,490',
      'https://m.media-amazon.com/images/I/71d7rfSl0wL._SX679_.jpg',
    ),
    new productModel(
      2,
      'Stainless Steel Cricket Kit',
      'Cricket Kit Includes:Bat, Ball, Wicket, Gloves etc',
      '₹2,799',
      'https://m.media-amazon.com/images/I/61zl7S1YaBL._SX679_.jpg',
    ),
    new productModel(
      3,
      'Fire-Boltt Phoenix Pro 1.39',
      'Full Touch Screen and a 240*240 Pixel High Resolution',
      ' ₹1,349',
      'https://m.media-amazon.com/images/I/71QBKlOMCAL._SX679_.jpg',
    ),
  ]

//static method are the method which we can call directly with the help of class name