import { Product } from './../types/Product';

const BASE_URL = "https://6812aab0129f6313e20f36c5.mockapi.io/products/products";

export const getProducts = async () : Promise<{data?: Product[]; errorFetch?: string}> => {
    try{
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error (`Error: ${res.status}`);
        const data : Product[] = await res.json();
        return {data};
    }catch(error : any){
        return {errorFetch: error.message || "Error al obtener los productos"}
    }
}

export const createProduct = async (productNew : Omit<Product, "id">): Promise<{product?: Product; errorFetch?: string}> => {
    try{
        const res = await fetch (BASE_URL , {
            method: "POST",
            headers: { "Content-Type" : "application/json"  },
            body: JSON.stringify(productNew),
        });
        if (!res.ok) throw new Error (`Error: ${res.status}`);
        return {product : await res.json()};
    }catch(error : any){
        return {errorFetch: error.message || "Error al crear el producto"};
    }
}

export const updateProduct = async (id:string, productUpdate: Partial<Product>): Promise<{product?: Product; errorFetch?: string}> =>{
    try{
        const res = await fetch (`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(productUpdate),
        })
        if (!res.ok) throw new Error (`Error: ${res.status}`);
        return {product : await res.json()};
    }catch(error:any){
        return({errorFetch: error.message || "Error al querer actualizar el producto"})
    }
}

export const deleteProduct = async (id:string): Promise<{success: boolean; errorFetch?: string}> =>{
    try{
        const res = await fetch (`${BASE_URL}/${id}`, {
            method: "DELETE",
        })
        if (!res.ok) throw new Error (`Error: ${res.status}`);
        return {success : true};
    }catch(error:any){
        return({
            success : false,
            errorFetch: error.message || "Error al querer borrar el producto"
        })
    }
}