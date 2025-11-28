import {db} from "./firebase.js";
import {collection, getDocs, getDoc, doc, addDoc, deleteDoc} from "firebase/firestore";

const productsCollection = collection(db, "products")


export const getProduct = async () => {
    try{
        const snapshot = await getDocs(productsCollection);
        console.log(snapshot)
        return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    }catch(error){console.log(error);}
    
}

export const getProductById = async (id) => {
    try {
        const ref = doc(productsCollection, id);
        const snap = await getDoc(ref);
        if (!snap.exists()) return null;
        return { id: snap.id, ...snap.data() };
    } catch (error) {
        return {error: error};
    }
}


export const createProduct = async (prod) => {
    try{
        console.log(prod)
        const docRef = await addDoc(productsCollection, prod);
        console.log(docRef.id)
        return {id: docRef.id, ...prod}
    }catch(err){

        return {error: err}
    }
    
}

export const DeleteProd = async (id) => {
    try {
        const ref = doc(productsCollection, id);
        const snap = await getDoc(ref);
        if(!snap.exists()){
            return false;
        }
        await deleteDoc(ref);
        return true;
    } catch (error) {
        return {error: err}
    }
}