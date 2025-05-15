import Footer from "../components/Footer"
import Header from "../components/Header"
import Main, { MainProps } from "../components/Main"
import Nav from "../components/Nav"

interface HomeProps extends MainProps {
}

const Home = ({cart, scriptAddToCart} : HomeProps) => {
    return (
        <>
            <Header/>
            <Nav />
            <Main cart = {cart} scriptAddToCart = {scriptAddToCart}/>
            <Footer/>
        </>
    )
}

export default Home