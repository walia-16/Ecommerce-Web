import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { products, currency, cartItems, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    // Transform cartItems to an array of items with id, size, and quantity
    const updatedCartData = Object.entries(cartItems)
      .flatMap(([productId, sizes]) =>
        Object.entries(sizes)
          .filter(([, quantity]) => quantity > 0) // Only include items with quantity > 0
          .map(([size, quantity]) => ({
            _id: productId,
            size,
            quantity,
          }))
      );
  
    // Update the state with the transformed cart data
    setCartData(updatedCartData);
  }, [cartItems]);
  

  return (
    <div className="border-t pt-14">
      {/* Title Section */}
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Cart Items */}
      <div>
        {cartData.map(({ _id, size, quantity }, index) => {
          const productData = products.find((product) => product._id === _id);

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              {/* Product Image and Info */}
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt={productData.name}
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {size}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <input
                type="number"
                min={1}
                defaultValue={quantity}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value && value !== "0")
                    updateQuantity(_id, size, Number(value));
                }}
              />

              {/* Remove Item Icon */}
              <img
                src={assets.bin_icon}
                alt="Remove"
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                onClick={() => updateQuantity(_id, size, 0)}
              />
            </div>
          );
        })}
      </div>

      {/* Cart Total and Checkout Button */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
