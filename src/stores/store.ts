import { defineStore } from 'pinia'
import { signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { db, firebaseAuth } from '../firebase';
import { dbMenuRef } from '../firebase';
import { collection, CollectionReference, doc, getDoc, getDocs, type DocumentData } from 'firebase/firestore';

export const useMenuStore = defineStore('menuItems', {
    state: (): State => {
        return {
            menuItems: [],
            orders: [],
            currentUser: null
        }
    },
    getters: {
        getMenuItems: state => state.menuItems,
        getNumberOfOrders: state => state.orders.length,
        getCurrentUser: state => state.currentUser?.email
    },
    actions: {
        async setMenuRef() {
            const querySnapshot = await getDocs(collection(db, "menu"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                this.menuItems.push(doc.data()[0])
            });
            console.log('Menu Items:')
            console.log(this.menuItems)
        },
        addOrder(basket: Item) {
            this.orders.push(basket)
        },
        userStatus(user: User | null) {
            user === null ? this.currentUser = null : this.currentUser = user
        },
        async signIn(username: string, password: string) {
            signInWithEmailAndPassword(firebaseAuth, username, password)
                .then((userCredential) => {
                    //Signed in
                    const user = userCredential.user;
                    alert('Welcome, ' + user.email);
                    this.currentUser = user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert('Error Code: ' + errorCode + '--- Error Message: ' + errorMessage);
                })
        },
        async signOut() {
            signOut(firebaseAuth).then(() => {
                // Sign-out successful.
                alert('You have been signed out. Goodbye!');
                this.userStatus(null)
            }).catch((error) => {
                // An error occurred.
                alert(`Sign out error: ${error}`);
            })

        }
    }
})
interface State {
    menuItems: Item[],
    orders: Item[],
    currentUser: User | null
}

interface Item {
    name: string;
    description: string;
    quantity: number;
    options: {
        size: number;
        price: number;
    }[]
}

function useFirestore(arg0: CollectionReference<DocumentData, DocumentData>) {
    throw new Error('Function not implemented.');
}
