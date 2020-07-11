import React from 'react';
import Navbar from './Navbar';
import Cart from './Cart';

class App extends React.Component {
  constructor () {
    super();
    this.state = {
        products: [
            {
                id: 2,
                price: 999,
                title: 'Phone',
                qty: 1,
                img: 'https://images.unsplash.com/photo-1525598912003-663126343e1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
            },
            {
                id: 4,
                price: 99,
                title: 'Watch',
                qty: 2,
                img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
            },
            {
                id: 6,
                price: 99999,
                title: 'Laptop',
                qty: 1,
                img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80'
            }
        ]
        
    }
  }
  handleIncreaseQuantity = (product) => {
      const {products} = this.state;
      const index = products.indexOf(product);

      products[index].qty++;

      this.setState({
          products
      })
  }
  handleDecreaseQuantity = (product) => {
      const {products} = this.state;
      const index = products.indexOf(product);

      if(products[index].qty === 0)
      {
          return;
      }
      products[index].qty--;

      this.setState({
          products
      })
  }
  handleDeleteProduct = (id) => {
      const {products} = this.state;

      const items = products.filter((item) => item.id !== id);

      this.setState({
          products: items
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
  render () {
    const {products} = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
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
