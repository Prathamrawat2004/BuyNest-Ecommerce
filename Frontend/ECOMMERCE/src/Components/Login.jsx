import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { BsGift } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import { GoGift } from "react-icons/go";
import { FaRegSun } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "https://buynest-ecommerce-backend-27.onrender.com/User/login",
        userInfo
      );
      console.log(res.data);
      if (res.data) {
        toast.success("Login successfull");
        setTimeout(() => {
          window.location.reload();
          // setting up to localstorage in order to protect "add"
          localStorage.setItem("Users", JSON.stringify(res.data.user));
        }, 2000);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // theme changing
  const [darkmode, setdarkmode] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = darkmode ? "black" : "white";
  }, [darkmode]);

  const toggleTheme = () => {
    setdarkmode(!darkmode);
  };

  // modal opening function
  const [isModal, setisModal] = useState(false);

  const modalOpen = () => {
    setisModal(!isModal);
  };

  // sticky navbar
  const [isSticky, setSticky] = useState(false);

  // Function to handle scroll event and toggle sticky class
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  // event listner is a sideeffect
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // login
  const [isLogin, setIsLogin] = useState(false);

  const openLogin = () => {
    setIsLogin(true);
  };

  return (
    <>
      {/* navbar */}
      <div
        className={`my-3 row   ${
          isSticky
            ? darkmode
              ? "sticky black"
              : "sticky bg-white alligner"
            : ""
        }`}
      >
        <div className="nav-items d-flex justify-content-between align-items-center">
          <Link to="/" className="no-underline">
            <div className="logo topper">
              <h3>BuyNest</h3>
            </div>
          </Link>

          <div className="categories topper " onClick={modalOpen}>
            <div className={`d-flex ${darkmode ? "text-white" : ""}`}>
              <RxHamburgerMenu className="hamburg" />
              <span className="mx-1 CATEGORIES">Categories</span>
            </div>
          </div>
          {isModal && (
            <div
              className={`box ${
                darkmode ? "text-white bg-dark" : "text-white bg-dark"
              }`}
            >
              <div className="content">
                <ul className="list-unstyled">
                  <li>Accessories</li>
                  <li>Art & Collectibles</li>
                  <li>Baby</li>
                  <li>Bags & Purses</li>
                  <li>Bath & Beautify</li>
                  <li>Books, Films & Music</li>
                  <li>Clothing</li>
                  <li>Craft Supplies & Tools</li>
                  <li>Electronics & Accessories</li>
                  <li>Gifts</li>
                  <li>Home & Living</li>
                  <li>Jewellery</li>
                  <li>Paper & Party Supplies</li>
                  <li>Pet Supplies</li>
                  <li>Shoes</li>
                  <li>Toys & Games</li>
                  <li>Weddings</li>
                </ul>
              </div>
            </div>
          )}

          <div className="search" onClick={handleButtonClick}>
            {/* both if the user clicks on enter or if the user clicks on the icon */}
            <form className="input-group form" onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control rounded-5 input"
                  placeholder="Search for anything"
                  aria-label="Search"
                  aria-describedby="search-icon"
                  value={searchTerm}
                  onChange={(e) => setsearchTerm(e.target.value)}
                />
              </div>
              <div className="icon">
                <CiSearch onClick={handleSearch} />
              </div>
            </form>
          </div>

          {authUser ? (
            <Logout dark={darkmode} />
          ) : (
            <Link to="/login" className="no-underline text-black">
              <div
                className={`${
                  darkmode ? "text-white" : "UserLogin content"
                } topper topper-1`}
              >
                <span>Login</span>
              </div>
            </Link>
          )}
          <div className="d-flex justify-content-between align-items-center items-2 topper topper-1 same">
            <div className="flag content">
              <img src="/img/Flag.jfif" height={15} alt="indian flag" />
            </div>

            <div className="theme content" onClick={toggleTheme}>
              {darkmode ? (
                <FaRegSun className={`${darkmode ? "text-white" : ""}`} />
              ) : (
                <FaRegMoon />
              )}
            </div>

            <div className="giftIcon content">
              <BsGift className={`${darkmode ? "text-white" : ""}`} />
            </div>

            <div className="kart content" onClick={handleButtonClick}>
              <Link to="/cart" className="cart-decoration">
                <BsCart className={`${darkmode ? "text-white" : ""}`} />
              </Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div
            className={`items d-flex justify-content-center my-2 mb-3  ${
              darkmode ? "text-white" : ""
            }`}
          >
            <li>
              <span>
                <GoGift />
              </span>{" "}
              Gift Mode
            </li>
            <li>Shop Birthday Gifts</li>
            <li>Home Favourites</li>
            <li>Fashion Finds</li>
            <li>Registry</li>
          </div>
        </div>
        <hr className={`${darkmode ? "text-white" : ""} line`} />
      </div>
      <div className="container border shadow rounded d-flex flex-column justify-content-center align-items-center col-md-4 mt-5 login">
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`${darkmode ? "text-white" : ""}`}>
              <h1 className="mb-3 login1" id="exampleModalLabel">
                Login
              </h1>
            </div>
            <div
              className={`mb-2 ${
                darkmode ? "text-white" : ""
              }  d-flex flex-column`}
            >
              <span className="mx-1 mb-1 email">Email</span>
              <input
                type="email"
                className="mx-3"
                placeholder="enter your email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="red">This field is required</span>
              )}
            </div>
            <div
              className={`mb-2 ${
                darkmode ? "text-white" : ""
              }  d-flex flex-column`}
            >
              <span className="mx-1 mb-1 password">Password</span>
              <input
                type="password"
                className="mx-3"
                placeholder="enter your password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="red">This field is required</span>
              )}
            </div>
            <div
              className={`d-flex justify-content-center mb-2 ${
                darkmode ? "text-white" : ""
              }`}
            >
              <button className="btn btn-danger">Login</button>
            </div>

            <div className="d-flex justify-content-between">
              <h6 className={`${darkmode ? "text-white" : ""}`}>
                Create new account?
              </h6>
              <h6>
                {" "}
                <Link to="/signup">Signup</Link>
              </h6>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
