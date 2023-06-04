import "./Home.scss";
import Banner from "./Banner/Banner";
import Category from "../Home/Category/Category";
import Products from "../Products/Products";
import { useContext, useEffect } from "react";

import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";

const Home = () => {
  const { categories, setCategories, products, setProducts } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      await getProducts();
      await getCategories();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategories = async () => {
    const res = await fetchDataFromApi("/api/categories?populate=*");
    setCategories(res);
  };

  const getProducts = async () => {
    const res = await fetchDataFromApi("/api/products?populate=*");
    setProducts(res);
  };

  return (
    <div>
      <Banner />
      <div className="main-content">
        <div className="layout">
          <Category categories={categories} />
          <Products products={products} headingText="Popular Products" />
        </div>
      </div>
    </div>
  );
};

export default Home;
