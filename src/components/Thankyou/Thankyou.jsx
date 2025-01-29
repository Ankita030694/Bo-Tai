import React from "react";
import reserve from "../../assets/formbg.png";
import NavbarTwo from "../Navbar/navbar2";
import Footer from "../Footer/footer";
import { Link } from "react-router-dom";

const Thankyou = () => {
  const containerStyle = {
    backgroundImage: `url('${reserve}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  };
  return (
    <div>
      <NavbarTwo />
      <div
        style={containerStyle}
        className="flex items-center justify-center w-full"
      >
        <div className="w-full max-w-2xl mx-4 bg-brown-300 bg-opacity-opacity-100 rounded-lg shadow-lg p-16 text-center">
          <h2 className="text-3xl font-bold text-[#4A3427] -100 mb-4">
            Thank You!
          </h2>
          <p className="text-[#4A3427]  font-medium mb-6">
            Your reservation has been successfully submitted.
          </p>
          <Link to="/reservation">
            <button
              // onClick={() => setShowThankYou(false)}
              className="bg-orange-100 hover:bg-brown-400 hover:text-orange-100 text-[#4A3427]  font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Make Another Reservation
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Thankyou;
