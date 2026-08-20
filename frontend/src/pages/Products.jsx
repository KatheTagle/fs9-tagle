import GuideShop from "../components/GuideShop";
import ProductList from "../components/Productlist";

const Products = () => {
    return (
        <div>
        <GuideShop />
        <ProductList showAll={true} />
        </div> )
};

export default Products;
