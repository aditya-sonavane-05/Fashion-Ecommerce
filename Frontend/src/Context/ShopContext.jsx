
import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:4000/allproduct')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                return response.json();
            })
            .then((data) => setAll_Product(data))
            .catch((error) => console.error('Error:', error));

            if (localStorage.getItem('auth-token')) {
                fetch('http://localhost:4000/getcart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/form-data',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json',
                    },
                    body: "",
                })
                .then((response) => response.json())
                .then((data) => setCartItems(data));
            }
        
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev, [itemId]: prev[itemId] + 1 };
            return updatedCart;
        });

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add item to cart');
                }
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.error('Error:', error));
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add item to cart');
                }
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((error) => console.error('Error:', error));
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let item_info = all_product.find((product) => product.id === Number(item))
                totalAmount += item_info.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
