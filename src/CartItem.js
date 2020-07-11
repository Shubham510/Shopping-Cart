import React from 'react';

class CartItem extends React.Component {
    constructor () {
        super();
        this.state = {
            price: 999,
            title: 'Phone',
            qty: 1,
            img: ''
        }
    }
    increaseQuantity = () => {
        // this.state.qty++;
        // console.log(this.state.qty);
        // setState form 1
        // this.setState({
        //     qty: this.state.qty + 1
        // });

        // setState form 2 - if prevState required
        this.setState((prevState) =>{
            return {
                qty: prevState.qty + 1
            }
        });
    }

    decreaseQuantity = () => {
        const { qty} = this.state;

        if (qty === 0){
            return;
        }
        
        this.setState((prevState) =>{
            return {
                qty: prevState.qty - 1
            }
        });
    }
    render () {
        const { price, title, qty} = this.state;
        return(
            <div className="cart-item">
                <div className="left-block">
                    <img style={styles.image}/>
                </div>
                <div className="right-block">
                    <div style={{ fontSize: 25}}>{title}</div>
                    <div style={{ color: '#777'}}>Rs. {price}</div>
                    <div style={{ color: '#777'}}>Qty: {qty}</div>
                    <div className="cart-item-actions">
                        {/* Buttons */}
                        <img 
                            alt="increase" 
                            className= "action-icons" 
                            src="https://image.flaticon.com/icons/svg/992/992651.svg" 
                            onClick= {this.increaseQuantity}    
                        />
                        <img 
                            alt="decrease" 
                            className= "action-icons" 
                            src="https://image.flaticon.com/icons/svg/992/992683.svg" 
                            onClick= {this.decreaseQuantity} 
                        />
                        <img 
                            alt="delete" 
                            className= "action-icons" 
                            src="https://image.flaticon.com/icons/svg/1345/1345874.svg" 
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    image: {
        height: 100,
        width: 100,
        borderRadius: 4
    }
}

export default CartItem;