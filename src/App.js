import React, { useState } from "react";
import Nav from "./comp/nav";
import { BrowserRouter } from "react-router-dom";
import Rout from "./comp/rout";
import Footer from "./comp/footer";
import Homeproduct from "./comp/home_product";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  // Add To cart
  const [cart, setCart] = useState([]);
  //Shop Page product
  const [shop, setShop] = useState(Homeproduct);
  //Shop Search Filter
  const [search, setSearch] = useState("");
  //Shop category filter
  const Filter = (x) => {
    const catefilter = Homeproduct.filter((product) => {
      return product.cat === x;
    });
    setShop(catefilter);
  };
  const allcatefilter = () => {
    setShop(Homeproduct);
  };
  //Shop Search Filter
  const searchlength = (search || []).length === 0;
  const searchproduct = () => {
    if (searchlength) {
      toast.warning("Please Search Something !");
      // alert("Please Search Something !");
      setShop(Homeproduct);
    } else {
      const searchfilter = Homeproduct.filter((x) => {
        return x.cat === search;
      });
      setShop(searchfilter);
    }
  };
  //Add To cart
  const addtocart = (product) => {
    const exist = cart.find((x) => {
      return x.id === product.id;
    });
    if (exist) {
      toast.error("This product is aleardy added in cart");
      // alert("This product is alleardy added in cart");
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
      toast.success("Addet To cart");
      // alert("Added To cart");
    }
  };
  console.log(cart);
  return (
    <>
      <BrowserRouter>
        <Nav
          search={search}
          setSearch={setSearch}
          searchproduct={searchproduct}
        />
        <Rout
          setCart={setCart}
          cart={cart}
          shop={shop}
          Filter={Filter}
          allcatefilter={allcatefilter}
          addtocart={addtocart}
        />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
