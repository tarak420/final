import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, ShoppingBag } from 'lucide-react';

const Footer = () => {
  return (
    <section className="footer">
        <div className="box-container">
            <div className="box">
                <h3>Grocery <i className="fa fa-shopping-basket"></i></h3>
                <p>Feel Free Follow Us On Our Social Media Handlers All The Links Are Given Below</p>

                <div className="share">
                    <i className="fa-brands fa-facebook"></i>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-linkedin"></i>
                </div>
            </div>

            <div className="box">
                <h3>Contact Info</h3>
                <a href="#" className="links"><i className="fa fa-phone"></i> +880 1790798183</a>
                <a href="#" className="links"><i className="fa fa-envelope"></i> tarek@gmail.com</a>
                <a href="#" className="links"><i className="fa fa-map-marker"></i> Mirpur-6, Dhaka</a>
            </div>

            <div className="box">
                <h3>Quick Links</h3>
                <a href="#" className="links"><i className="fa fa-arrow-right"></i>Home</a>
                <a href="#" className="links"><i className="fa fa-arrow-right"></i>Features</a>
                <a href="#" className="links"><i className="fa fa-arrow-right"></i>Products</a>
                <a href="#" className="links"><i className="fa fa-arrow-right"></i>Categories</a>
                <a href="#" className="links"><i className="fa fa-arrow-right"></i>Review</a>
                <a href="#" className="links"><i className="fa fa-arrow-right"></i>Blogs</a>
            </div>


            <div className="box">
                <h3>Newsletter</h3>
                <p>Subscribe For Latest Updates</p>
                <input type="email" placeholder="your email" className="email"/>
                <input type="submit" value="Subscribe" className="btn"/>
                <img src="image/payment.png" className="payment-img"/>
            </div>
        </div>

        <div className="credit">Copyright All Rights Reserved@2024</div>
    </section>
    
  );
};

export default Footer;
