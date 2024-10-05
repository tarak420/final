import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const categories = [
  { id: 1, name: 'Fruits', image: 'image/cat-1.png' },
  { id: 2, name: 'Vegetables', image: 'image/cat-2.png' },
  { id: 3, name: 'Dairy Products', image: 'image/cat-3.png' },
  { id: 4, name: 'Bakery', image: 'image/cat-4.png' },
];

const ProductCategory = ({categoryRef}) => {
  return (
    <section className="categories" id="categories" ref={categoryRef}>
        <h1 className="heading">Product <span>Categories</span></h1>

        <div className="box-container">
            <div className="box">
                <img src="image/cat-1.png"/>
                <h3>Vegetables</h3>
                <p>Upto 45% Off</p>
                <a href="#" className="btn">Shop Now</a>
            </div>

            <div className="box">
                <img src="image/cat-2.png"/>
                <h3>Freash Fruits</h3>
                <p>Upto 45% Off</p>
                <a href="#" className="btn">Shop Now</a>
            </div>

            <div className="box">
                <img src="image/cat-3.png"/>
                <h3>Dairy Products</h3>
                <p>Upto 45% Off</p>
                <a href="#" className="btn">Shop Now</a>
            </div>

            <div className="box">
                <img src="image/cat-4.png"/>
                <h3>Freash Meat</h3>
                <p>Upto 45% Off</p>
                <a href="#" className="btn">Shop Now</a>
            </div>
        </div>
    </section>
  );
};

export default ProductCategory;
