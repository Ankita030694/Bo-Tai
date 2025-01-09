import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa"; // Social icons
import logo from "../../assets/logo.svg";
import { useNavigate, Link } from "react-router-dom";

const navi = useNavigate;
const bananaAnimation = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { type: "spring", stiffness: 50, damping: 20 },
};

const Footer = () => {
  const quickLinks = [
    { text: "Home", href: "/" },
    { text: "About", href: "/about" },
    { text: "Reservation", href: "/reservation" },
    { text: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { text: "Privacy Policy", href: "#privacy" },
    { text: "Terms & Conditions", href: "#terms" },
    { text: "Refund Policy", href: "#refund" },
  ];

  const socialLinks = [
    {
      icon: <FaInstagram />,
      href: "https://www.instagram.com/_botai?igsh=bWZsYzFkZmVnZG53",
    },
    {
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/share/1CbPaXgv33/?mibextid=wwXIfr",
    },
  ];

  return (
    <footer className="bg-brown text-white pb-12">
      <div className="container mx-auto px-5">
        <div className="flex flex-wrap justify-around">
          {/* Logo and Description */}
          <motion.div
            initial={bananaAnimation.initial}
            whileInView={bananaAnimation.animate}
            viewport={{ once: true }}
            transition={{ ...bananaAnimation.transition, delay: 0.2 }}
            className=" w-full md:w-1/3 text-center md:text-left"
          >
            <a href="/">
              <img
                src={logo}
                alt="Bo-Tai Logo"
                className="h-32 mx-auto md:mx-0 mb-4"
              />
            </a>
            <p className="text-brown-100 mb-8">
              A Modern Thai bar & Grill concept blending cosmopolitan Italian
              design with the vibrance of Thai hues.
            </p>


            {/* Social Media Links */}
            <motion.div
              initial={bananaAnimation.initial}
              whileInView={bananaAnimation.animate}
              viewport={{ once: true }}
              transition={{ ...bananaAnimation.transition, delay: 1 }}
              className="flex gap-4 mt-7 justify-center md:justify-start ml-0"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="text-brown-100 hover:text-orange-100 transition-colors text-2xl"
                  aria-label={link.icon}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={bananaAnimation.initial}
            whileInView={bananaAnimation.animate}
            viewport={{ once: true }}
            transition={{ ...bananaAnimation.transition, delay: 0.4 }}
            className="my-8 w-full md:w-1/4 text-center md:text-left"
          >
            <h3 className="text-lg font-semibold mb-4 text-orange-100">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.text}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-brown-100 hover:text-orange-100 transition-colors"
                  >
                    {link.text}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={bananaAnimation.initial}
            whileInView={bananaAnimation.animate}
            viewport={{ once: true }}
            transition={{ ...bananaAnimation.transition, delay: 0.6 }}
            className="my-8 mb-8 w-full md:w-1/4 text-center md:text-left"
          >
            <h3 className="text-lg font-semibold mb-4 text-orange-100">
              Legal
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <motion.li
                  key={link.text}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-brown-100 hover:text-orange-100 transition-colors"
                  >
                    {link.text}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
