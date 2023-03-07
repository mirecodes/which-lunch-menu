import { CollectionReference, DocumentReference, QueryFieldFilterConstraint, addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { firestore } from "../libs/firebase";
import TLunchMenu from '../models/TLunchMenu';

// Models
type TLunchMenuConstraints = Partial<TLunchMenu>;

// Collections References
const lunchMenuDBRef = collection(firestore, 'lunch-menu-DB') as CollectionReference<TLunchMenu>;

// APIs
export async function getAllMenus() {
    try {
        const res = await getDocs(lunchMenuDBRef);
        let lunchMenus: TLunchMenu[] = [];
        res.forEach(lunchMenu => lunchMenus.push(lunchMenu.data()))
        return lunchMenus;
    } catch (err) {
        const errMsg = `Error: function getAllMenus() occured error\n`;
        console.error(errMsg + err);
        throw new Error(errMsg);
    }
}

export async function getOneDocByConstraints<T extends TLunchMenuConstraints>(constraints: T) {
    let queryFilterList: QueryFieldFilterConstraint[] = [];
    for (let key in constraints) {
        queryFilterList.push(where(key, '==', constraints[key]));
    }
    try {
        const firebaseQuery = query(lunchMenuDBRef, ...queryFilterList);
        const res = (await getDocs(firebaseQuery)).docs[0];
        return res;

    } catch (err) {
        const errMsg = `Error: function getOneMenuByConstraints(constraints) occured error\n`;
        console.error(errMsg + err);
        throw new Error(errMsg);
    }
}

export async function getOneMenuByConstraints<T extends TLunchMenuConstraints>(constraints: T) {
    let queryFilterList: QueryFieldFilterConstraint[] = [];
    for (let key in constraints) {
        queryFilterList.push(where(key, '==', constraints[key]));
    }
    try {
        const firebaseQuery = query(lunchMenuDBRef, ...queryFilterList);
        const res = [(await getDocs(firebaseQuery)).docs[0].data()];
        return res;

    } catch (err) {
        const errMsg = `Error: function getOneMenuByConstraints(constraints) occured error\n`;
        console.error(errMsg + err);
        throw new Error(errMsg);
    }
}

export async function getMenusByConstraints<T extends TLunchMenuConstraints>(constraints: T) {
    let queryFilterList: QueryFieldFilterConstraint[] = [];
    for (let key in constraints) {
        queryFilterList.push(where(key, '==', constraints[key]));
    }

    try {
        const firebaseQuery = query(lunchMenuDBRef, ...queryFilterList);
        const res = await getDocs(firebaseQuery);
        let lunchMenus: TLunchMenu[] = [];
        res.forEach(lunchMenu => lunchMenus.push(lunchMenu.data()))
        return lunchMenus;

    } catch (err) {
        const errMsg = `Error: function getMenuByConstraints(constraints) occured error\n`;
        console.error(errMsg + err);
        throw new Error(errMsg);
    }
}

export async function addMenu(lunchMenu: TLunchMenu) {
    try {
        const docRef = await addDoc(lunchMenuDBRef, lunchMenu);
        const res = [(await getDoc(docRef)).data() as TLunchMenu];
        return res;
    } catch (err) {
        const errMsg = `Error: function addMenu(lunchMenu) occured error\n`;
        console.error(errMsg + err);
        throw new Error(errMsg);
    }
}

export async function modifyMenu<T extends TLunchMenuConstraints>(constraints: T, lunchMenu: TLunchMenu) {
    try {
        const queryResult = await getOneDocByConstraints(constraints);
        const docId: string = queryResult.id;
        const docRef = await doc(firestore, 'lunch-menu-db', docId) as DocumentReference<TLunchMenu>;
        await updateDoc(docRef, lunchMenu);
        const res = [(await getDoc(docRef)).data() as TLunchMenu];
        return res;
    } catch (err) {
        const errMsg = `Error: function modifyMenu(constraints, lunchMenu) occured error\n`;
        console.error(errMsg + err);
        throw new Error(errMsg);
    }
}

export async function deleteMenu<T extends TLunchMenuConstraints>(constraints: T) {
    try {
        const queryResult = await getOneDocByConstraints(constraints);
        const docId: string = queryResult.id;
        const docRef = await doc(firestore, 'lunch-menu-db', docId) as DocumentReference<TLunchMenu>;
        const res = [((await getDoc(docRef)).data()) as TLunchMenu];
        await deleteDoc(docRef);
        return res;
    } catch (err) {
        const errMsg = `Error: function deleteMenu(constraints) occured error\n`;
        console.error(errMsg + err);
        throw new Error(errMsg);
    }
}

