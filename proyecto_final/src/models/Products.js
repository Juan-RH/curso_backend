import {db} from "./Firebase.js";
import {collection, getDocs, getDoc, doc, addDoc, deleteDoc, setDoc} from "firebase/firestore";

const productsCollection = collection(db, "products")


export const getProduct = async () => {
    try{
        const snapshot = await getDocs(productsCollection);
        console.log(snapshot)
        return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    }catch(error){
        return {error: error}}
    
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
        const docRef = await addDoc(productsCollection, prod);
        
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
        return {error: error}
    }
}
export const updateProduct = async (id, prodData) => {
    try {
        const ref = doc(productsCollection, id);
        const snap = await getDoc(ref);
        
        if(!snap.exists()){
            return false;
        }
        
        await setDoc(ref, prodData);
        return {id ,...prodData};
    } catch (error) {
        return {error: error}
    }
}

export const updatePatchProduct = async (id, prodData) => {
    try {
        const ref = doc(productsCollection, id);
        const snap = await getDoc(ref);
        
        if(!snap.exists()){
            return false;
        }

        await setDoc(ref, prodData, {merge: true});
        return {id ,...snap.data() ,...prodData};
    } catch (error) {
        return {error: error}
    }
}