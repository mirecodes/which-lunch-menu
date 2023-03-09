import { CollectionReference, DocumentReference, QueryFieldFilterConstraint, addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { firestore } from "../libs/firebase";
import { TLunchMenu, TPublicData } from '../models/LunchMenuDB';

// Models
type TLunchMenuConstraints = Partial<TLunchMenu>;

// Collections & Docs References
const lmCollRef = collection(firestore, 'lunch-menu-DB');
const userDocRef = doc(lmCollRef, 'USER_DEV');
const userLmCollRef = collection(userDocRef, 'LUNCH_MENUS') as CollectionReference<TLunchMenu>;
const userIntlDataRef = collection(userDocRef, 'INTERNAL_DATA');
const userPvtDataDocRef = doc(userIntlDataRef, 'PRIVATE_DATA');
const userPubDataDocRef = doc(userIntlDataRef, 'PUBLIC_DATA') as DocumentReference<TPublicData>;

// APIs

// Auxiliary APIs
export async function getLmIndex() {
    try {
        const res = await getDoc(userPubDataDocRef);
        const idx = (res.data() as TPublicData).idx;
        await updateDoc(userPubDataDocRef, { idx: idx + 1 });
        return idx;
    } catch (err) {
        const errMsg = `Error: function getLmIndex() occured error\n`;
        console.error(errMsg + err);
        throw err;
    }
}

export async function getOneDocRef(constraints: TLunchMenuConstraints) {
    let queryFilterList: QueryFieldFilterConstraint[] = [];
    let key: keyof TLunchMenuConstraints;
    for (key in constraints) {
        queryFilterList.push(where(key, '==', constraints[key]));
    }
    try {
        const firebaseQuery = query(userLmCollRef, ...queryFilterList);
        const res = (await getDocs(firebaseQuery)).docs[0];
        return res;
    } catch (err) {
        const errMsg = `Error: function getOneMenuByConstraints(constraints) occured error\n`;
        console.error(errMsg + err);
        throw new Error(errMsg);
    }
}

// Primary APIs
export async function getAllMenus() {
    try {
        const res = await getDocs(userLmCollRef);
        let lunchMenus: TLunchMenu[] = [];
        res.forEach(lunchMenu => lunchMenus.push(lunchMenu.data()))
        return lunchMenus;
    } catch (err) {
        const errMsg = `Error: function getAllMenus() occured error\n`;
        console.error(errMsg + err);
        throw new Error(errMsg);
    }
}

export async function getOneMenu(constraints: TLunchMenuConstraints) {
    let queryFilterList: QueryFieldFilterConstraint[] = [];
    let key: keyof TLunchMenuConstraints
    for (key in constraints) {
        queryFilterList.push(where(key, '==', constraints[key]));
    }
    try {
        const firebaseQuery = query(userLmCollRef, ...queryFilterList);
        const res = [(await getDocs(firebaseQuery)).docs[0].data()];
        return res;
    } catch (err) {
        const errMsg = `Error: function getOneMenuByConstraints(constraints) occured error\n`;
        console.error(errMsg + err);
        throw new Error(errMsg);
    }
}

export async function getMenus(constraints: TLunchMenuConstraints) {
    let queryFilterList: QueryFieldFilterConstraint[] = [];
    let key: keyof TLunchMenuConstraints
    for (key in constraints) {
        queryFilterList.push(where(key, '==', constraints[key]));
    }
    try {
        const firebaseQuery = query(userLmCollRef, ...queryFilterList);
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
        Object.values(lunchMenu).forEach(menu => { if (!menu) { throw new Error('Warning: Received insufficient data to add Menu') } });
        const index = await getLmIndex();
        lunchMenu.idx = index;
        const docRef = await addDoc(userLmCollRef, lunchMenu);
        const res = [(await getDoc(docRef)).data() as TLunchMenu];
        return res;
    } catch (err) {
        const errMsg = `Error: function addMenu(lunchMenu) occured error\n`;
        console.error(errMsg + err);
        throw new Error(errMsg);
    }
}

export async function modifyMenu(constraints: TLunchMenuConstraints, lunchMenu: TLunchMenu) {
    try {
        const queryRes = await getOneDocRef(constraints);
        const docId = queryRes.id;
        const docRef = await doc(userLmCollRef, docId) as DocumentReference<TLunchMenu>;
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
        const queryRes = await getOneDocRef(constraints);
        const docId = queryRes.id;
        const docRef = await doc(userLmCollRef, docId) as DocumentReference<TLunchMenu>;
        const res = [((await getDoc(docRef)).data()) as TLunchMenu];
        await deleteDoc(docRef);
        return res;
    } catch (err) {
        const errMsg = `Error: function deleteMenu(constraints) occured error\n`;
        console.error(errMsg + err);
        throw new Error(errMsg);
    }
}

