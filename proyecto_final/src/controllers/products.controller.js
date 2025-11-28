import * as Model from "../models/Products.js";

export const getProducts = async (req, res) => {
    const {category, price} = req.query;
    
    const all = await Model.getProduct();
    const maxPrice = price ? parseFloat(price) : undefined;
    const filtered = all.filter(p =>
        (!category || p.category === category) &&
        (!maxPrice || p.price <= maxPrice)
    );
    res.status(200).json(filtered);
    return;
}

export const getProductByID = async (req,res) => {  
    const id = req.params.id
    const prod = await Model.getProductById(id);
    if (!prod) return res.status(404).json({ error: "Not found" });
    res.json(prod);
    return;
}

export const createProduct = async (req,res) => {
    const {name, category, price, description, stock} = req.body
    
    if(!name || (!category || "") || !price  || !stock){
        return res.status(400).json({error: "Required fields are missing"});
    }

    const resp = await Model.createProduct({name, category, price, description, stock});
    res.json(resp);
}


export const deleteProduct = async (req,res) => {
    const id = req.params.id;

    const resp = await Model.DeleteProd(id);
    if(!resp){
        return res.status(404).json({error:"Producto no encontrado"})
    }

    res.status(204).send();
}