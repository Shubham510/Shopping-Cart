import React from 'react';
import Navbar from './Navbar';
import Cart from './Cart';
import * as firebase from 'firebase'

class App extends React.Component {
  constructor () {
    super();
    this.state = {
        products: []
    }
    this.db= firebase.firestore();
  }

  componentDidMount () {
    // firebase
    //   .firestore()
    //   .collection('products')
    //   .get()
    //   .then((snapshot) => {


    //     const products = snapshot.docs.map((doc) => {
    //       const data = doc.data();
    //       data['id'] = doc.id;
    //       return data;
    //     })

    //     this.setState({
    //       products
    //     })
    //   })

    this.db
      .collection('products')
      //.where('price','==',9999)
      .orderBy('price','desc')
      .onSnapshot((snapshot) => {


        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        })

        this.setState({
          products
        })
      })
  }
  handleIncreaseQuantity = (product) => {
      const {products} = this.state;
      const index = products.indexOf(product);

      // products[index].qty++;

      // this.setState({
      //     products
      // })

      const docRef = this.db.collection('products').doc(products[index].id);

      docRef
        .update({
          qty: products[index].qty + 1
        })
        .then(() =>{
          console.log('Updated Successfully')
        })
        .catch((error) => {
          console.log('Error: ', error);
        })
  }
  handleDecreaseQuantity = (product) => {
      const {products} = this.state;
      const index = products.indexOf(product);

      if(products[index].qty === 0)
      {
          return;
      }
      // products[index].qty--;

      // this.setState({
      //     products
      // })

      const docRef = this.db.collection('products').doc(products[index].id);

      docRef
        .update({
          qty: products[index].qty - 1
        })
        .then(() =>{
          console.log('Updated Successfully')
        })
        .catch((error) => {
          console.log('Error: ', error);
        })
  }
  handleDeleteProduct = (id) => {
      const {products} = this.state;

      // const items = products.filter((item) => item.id !== id);

      // this.setState({
      //     products: items
      // }).

      const docRef = this.db.collection('products').doc(id);

      docRef
        .delete()
        .then(() =>{
          console.log('Updated Successfully')
        })
        .catch((error) => {
          console.log('Error: ', error);
        })
  }

  getCartCount = () => {
    const {products} = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    });

    return count;
  }

  getCartTotal=() => {
    const {products} = this.state;

    let cartTotal = 0;

    products.map((product) => {
      cartTotal = cartTotal + product.qty * product.price;
    })
    return cartTotal;
  }

  addProduct = () => {
    this.db
      .collection('products')
      .add({
        img:'',
        price: 14999,
        qty: 3,
        title: 'Wasing Machine'
      })
      .then((docRef) => {
        console.log('Product has been added', docRef);
      })
      .catch((error) => {
        console.log('Error : ', error);
      })
  }

  render () {
    const {products} = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/* <button onClick={this.addProduct}>Add a Product</button> */}
        <Cart 
          products={products}
          onIncreaseQuantity = {this.handleIncreaseQuantity}
          onDecreaseQuantity = {this.handleDecreaseQuantity}
          onDeleteProduct = {this.handleDeleteProduct}
        />
        <div style={{ padding: 10, fontSize: 20}}>TOTAL: {this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
