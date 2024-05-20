import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const cartContext = createContext()
export default function CartContextProvider({ children }) {
    const [cartCount, setCartcount] = useState({})

    async function getLogedCart() {
        try {

            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })

            setCartcount(data)
            console.log(data.data)

        } catch (error) {

            console.log(error)
        }
    }
    useEffect(() => {
        getLogedCart()
    }, [])
    return <cartContext.Provider value={{ cartCount, setCartcount }}>
        {children}

    </cartContext.Provider>
}


