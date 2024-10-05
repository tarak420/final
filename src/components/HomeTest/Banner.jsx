import { Link } from 'react-router-dom';


const Banner = ({homeRef}) => {
    return (
      <section className="home mt-[5em]" id="home" ref={homeRef}>
        <div className="content">
          <h1>Fresh And <span>Organic</span> Products For You</h1>
          <p>Embrace the purity of nature with our organic products. Nourish your body and mind with sustainable chemical-free goodness.</p>
          <Link to="#" className="btn mb-8">Shop Now</Link>
        </div>
      </section>
    );
  };
  
  export default Banner;
  