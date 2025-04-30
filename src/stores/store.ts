import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { db, firebaseAuth } from '../firebase';
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Item, type Order } from './Item';
import { useCollection } from 'vuefire';

export const useMenuStore = defineStore('menuItems', {
    state: (): State => {
        return {
            menuItems: [],
            orders: [],
            currentUser: null,
            admins: [],
            admin: false
        }
    },

    getters: {
        getMenuItems: state => state.menuItems,
        getNumberOfOrders: state => state.orders.length,
        getCurrentUser: state => state.currentUser,
        getAdminStatus: state => state.admin
    },
    actions: {
        async setMenuRef() {
            this.menuItems = useCollection(collection(db, 'menu'))
        },
        async setOrdersRef() {
            this.orders = useCollection(collection(db, 'orders'))
        },
        async setAdminsRef() {
            this.admins = useCollection(collection(db, 'admins'))
        },
        async setAdminStatus() {
            console.log(this.admins)
            this.admins.forEach((a: { uid: string | undefined; }) => {
                console.log(a.uid)
                console.log(this.currentUser)
                if (a.uid == this.currentUser?.uid) {
                    this.admin = true;
                }
            });
        },
        // Creates a new order
        async addOrder(submitted: Item) {
            addDoc(collection(db, "orders"), { basket: { items: submitted, date: new Date } })
        },
        // Adds or updates a doc with the same ref. setDoc() requires an id (i.name above)
        async addNewMenuItem(i: Item) {
            setDoc(doc(db, 'menu', i.name), {
                name: i.name,
                description: i.description,
                quantity: i.quantity,
                options: i.options
            })
        },
        async removeItem(item: Item) {
            await deleteDoc(doc(db, "menu", item.name))
                .then(() => {
                    alert(item.name + ' deleted from menu.')
                })
        },
        async removeOrder(ordered: Order) {
            await deleteDoc(doc(db, 'orders', ordered.id))
                .then(() => {
                    alert('Order deleted from menu.')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert('Error Code: ' + errorCode + '--- Error Message: ' + errorMessage);
                })
        },
        userStatus(user: User | null) {
            user === null ? this.currentUser = null : this.currentUser = user
        },
        async createUser(email: string, password: string) {
            createUserWithEmailAndPassword(firebaseAuth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log('Successfully created new user:', userCredential.user.uid);
                    alert('Welcome, ' + user.email);
                    this.currentUser = user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert('Error Code: ' + errorCode + '--- Error Message: ' + errorMessage);
                })
        },
        async signIn(username: string, password: string) {
            signInWithEmailAndPassword(firebaseAuth, username, password)
                .then((userCredential) => {
                    //Signed in
                    const user = userCredential.user;
                    alert('Welcome, ' + user.email);
                    this.currentUser = user;
                })
                .then(() => {
                    this.setAdminStatus()
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
                this.admin = false
            }).catch((error) => {
                // An error occurred.
                alert(`Sign out error: ${error}`);
            })
        }
    }
})
interface State {
    menuItems: any,
    orders: any,
    currentUser: User | null
    admin: boolean
    admins: any
}