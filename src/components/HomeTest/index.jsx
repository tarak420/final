
import Features from "./Features";
import Footer from "./Footer";
import Banner from "./Banner";
import ProductCategory from "./ProductCategory";
import ProductSlider from "./ProductSection";
import ReviewSection from "./ReviewSection";
import "./style.css"
import Header from "../shared/Header";
import { useEffect, useRef, useState } from "react";
import { loadCart } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const HomeTest = ()=>{
    const dispatch = useDispatch();
    const featureRef = useRef(null);
    const reviewRef = useRef(null);
    const categoryRef = useRef(null);
    const homeRef = useRef(null);
 

    const scrollToSection = (ref)=>{
        console.log("click ref ",ref);
        ref.current?.scrollIntoView({behaviour:'smooth'});
      };

    useEffect(() => {
        dispatch(loadCart());
      }, [dispatch]);
    
   

    return(
        <div>
            <Header
             scrollToSection={scrollToSection}
             featureRef={featureRef} 
             reviewRef={reviewRef}
             homeRef={homeRef}
     
            />
            <div className="pt-5 mt-5 mx-auto px-4 ">
                <Banner homeRef={homeRef} />
                <Features featureRef={featureRef} />
                <ProductSlider/>
                <ProductCategory categoryRef={categoryRef}/>
                <ReviewSection reviewRef={reviewRef}/>
                <Footer/>
            </div>
        </div>
    );
}

export default HomeTest;