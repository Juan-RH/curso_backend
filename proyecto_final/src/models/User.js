import {db} from "./Firebase.js";
import { addDoc,
         collection,
         doc,
         query,
         where,
         getDocs } from "firebase/firestore";

const usersCollection = collection(db, "users")

export const createUser = async (email, pwHash) => {
    try {
        const ref = await addDoc(usersCollection, {email,password:pwHash});
        return {id: ref.id, ...email};
    } catch (error) {
        return {error: error};
    }
}

export const findUserByEmail = async (email) =>  {
    try {
        const q = query(usersCollection, where("email", "==", email));
        const snap = await getDocs(q);

        if(!snap.empty){
            const doc = snap.docs[0];
            return {id: doc.id, ...doc.data()};
        }else{
            return null;
        }
    } catch (error) {
        return {error: error};
    }
}