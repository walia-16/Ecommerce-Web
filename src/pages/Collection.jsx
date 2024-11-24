import React, { useContext, useEffect, useReducer } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const initialState = {
  showFilter: false,
  filterProducts: [],
  category: [],
  subCategory: [],
  sortType: "relevant",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FILTER":
      return { ...state, showFilter: !state.showFilter };
    case "TOGGLE_OPTION":
      return {
        ...state,
        [action.field]: state[action.field].includes(action.payload)
          ? state[action.field].filter((item) => item !== action.payload)
          : [...state[action.field], action.payload],
      };
    case "SET_SORT_TYPE":
      return { ...state, sortType: action.payload };
    case "SET_FILTERED_PRODUCTS":
      return { ...state, filterProducts: action.payload };
    default:
      return state;
  }
};

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const applyFilter = () => {
    const filtered = products.filter((item) => {
      const matchesSearch =
        showSearch && search
          ? item.name.toLowerCase().includes(search.toLowerCase())
          : true;

      const matchesCategory = state.category.length
        ? state.category.includes(item.category)
        : true;

      const matchesSubCategory = state.subCategory.length
        ? state.subCategory.includes(item.subCategory)
        : true;

      return matchesSearch && matchesCategory && matchesSubCategory;
    });

    dispatch({ type: "SET_FILTERED_PRODUCTS", payload: filtered });
  };

  const sortProduct = () => {
    const sortedProducts = [...state.filterProducts];
    switch (state.sortType) {
      case "low-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return;
    }
    dispatch({ type: "SET_FILTERED_PRODUCTS", payload: sortedProducts });
  };

  useEffect(() => {
    applyFilter();
  }, [state.category, state.subCategory, search, showSearch, products ]);

  useEffect(() => {
    sortProduct();
  }, [state.sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => dispatch({ type: "TOGGLE_FILTER" })}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${state.showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            state.showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          {["Men", "Women", "Kids"].map((category) => (
            <p key={category} className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={category}
                onChange={() =>
                  dispatch({
                    type: "TOGGLE_OPTION",
                    field: "category",
                    payload: category,
                  })
                }
              />{" "}
              {category}
            </p>
          ))}
        </div>

        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            state.showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
            <p key={type} className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={type}
                onChange={() =>
                  dispatch({
                    type: "TOGGLE_OPTION",
                    field: "subCategory",
                    payload: type,
                  })
                }
              />{" "}
              {type}
            </p>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            onChange={(e) =>
              dispatch({ type: "SET_SORT_TYPE", payload: e.target.value })
            }
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {state.filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
