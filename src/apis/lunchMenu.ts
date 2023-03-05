import { CollectionReference, DocumentReference, QueryFieldFilterConstraint, addDoc, collection, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { firestore } from "../libs/firebase";
import TLunchMenu from '../models/TLunchMenu';

// Models
type TLunchMenuQueryConstraints = Partial<TLunchMenu>;

// Collections References
const lunchMenuDBRef = collection(firestore, 'lunch-menu-DB') as CollectionReference<TLunchMenu>;

// APIs
export async function getAllMenus() {
    try {
        const res = await getDocs(lunchMenuDBRef);
        return res;
    } catch (err) {
        const errMsg = `Error: function getAllMenus() occured error\n`;
        console.error(errMsg + err);
        throw new Error(errMsg);
    }
}

export async function getOneDocByConstraints<T extends TLunchMenuQueryConstraints>(constraints: T) {
    let queryFilterList: QueryFieldFilterConstraint[] = [];
    for (let key in constraints) {
        queryFilterList.push(where(key, '==', constraints[key]));
    }
    try {
        const firebaseQuery = query(lunchMenuDBRef, ...queryFilterList, orderBy('idx', 'asc'));
        const res = (await getDocs(firebaseQuery)).docs[0];
        return res;

    } catch (err) {
        const errMsg = `Error: function getOneMenuByConstraints(constraints) occured error\n`;
        console.error(errMsg + err);
        throw new Error(errMsg);
    }
}

export async function getOneMenuByConstraints<T extends TLunchMenuQueryConstraints>(constraints: T) {
    let queryFilterList: QueryFieldFilterConstraint[] = [];
    for (let key in constraints) {
        queryFilterList.push(where(key, '==', constraints[key]));
    }
    try {
        const firebaseQuery = query(lunchMenuDBRef, ...queryFilterList, orderBy('idx', 'asc'));
        const res = (await getDocs(firebaseQuery)).docs[0].data();
        return res;

    } catch (err) {
        const errMsg = `Error: function getOneMenuByConstraints(constraints) occured error\n`;
        console.error(errMsg + err);
        throw new Error(errMsg);
    }
}

export async function getMenusByConstraints<T extends TLunchMenuQueryConstraints>(constraints: T) {
    let queryFilterList: QueryFieldFilterConstraint[] = [];
    for (let key in constraints) {
        queryFilterList.push(where(key, '==', constraints[key]));
    }

    try {
        const firebaseQuery = query(lunchMenuDBRef, ...queryFilterList, orderBy('idx', 'asc'));
        const res = await getDocs(firebaseQuery);
        return res;

    } catch (err) {
        const errMsg = `Error: function getMenuByConstraints(constraints) occured error\n`;
        console.error(errMsg + err);
        throw new Error(errMsg);
    }
}

export async function addMenu(lunchMenu: TLunchMenu) {
    try {
        const res = await addDoc(lunchMenuDBRef, lunchMenu);
        return res;
    } catch (err) {
        const errMsg = `Error: function addMenu(lunchMenu) occured error\n`;
        console.error(errMsg + err);
        throw new Error(errMsg);
    }
}

export async function modifyMenu<T extends TLunchMenuQueryConstraints>(constraints: T, lunchMenu: TLunchMenu) {
    try {
        const queryResult = await getOneDocByConstraints(constraints);
        const docId: string = queryResult.id;
        const docRef = await doc(firestore, 'lunch-menu-db', docId) as DocumentReference<TLunchMenu>;

        const res = await updateDoc(docRef, lunchMenu);
        return res;
    } catch (err) {
        return err as Error;
    }
}

export async function deleteMenu<T extends TLunchMenuQueryConstraints>(constraints: T, lunchMenu: TLunchMenu) {
    try {
        const queryResult = await getOneDocByConstraints(constraints);
        const docId: string = queryResult.id;
        const docRef = await doc(firestore, 'lunch-menu-db', docId) as DocumentReference<TLunchMenu>;

        const res = await updateDoc(docRef, lunchMenu);
        return res;
    } catch (err) {
        return err as Error;
    }
}

