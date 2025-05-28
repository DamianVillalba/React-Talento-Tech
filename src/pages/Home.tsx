import ProductList from "../components/ProductList"

const Home = () => {
    return (
        <section>
           <h1 className="text-3xl text-center font-bold m-4">Bienvenido a nuestra tienda</h1>
            <ProductList />
        </section>
    )
}

export default Home