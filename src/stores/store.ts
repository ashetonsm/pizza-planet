import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { db, firebaseAuth } from '../firebase';
import { arrayUnion, collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { Item, Order } from './Item';
import { useCollection, useDocument } from 'vuefire';

export const useMenuStore = defineStore('menuItems', {
    state: (): State => {
        return {
            menuItems: [],
            currentBasket: [],
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
            if (this.getAdminStatus == true) {
                console.log('Displaying all orders for an admin account.')
                this.orders = useCollection(collection(db, 'orders'))
                console.log(await this.orders)
            } else {
                console.log('Displaying only orders by logged in non-admin user.')
                this.orders = useDocument(doc(collection(db, 'orders'), this.currentUser!.uid))
            }
        },
        async setAdminsRef() {
            this.admins = useCollection(collection(db, 'admins'))
        },
        async setCurrentBasket(newItems: Item) {
            this.currentBasket.push(newItems)
        },
        async clearCurrentBasket() {
            this.currentBasket = []
        },
        async setAdminStatus() {
            this.admins.forEach((a: { uid: string | undefined; }) => {
                if (a.uid == this.currentUser?.uid) {
                    console.log('Logged in user IS an admin')
                    return this.admin = true;
                }
            });
        },
        // Creates a new order
        async addOrder(submitted: Item, payment: { cardNumber: string; cvv: string; expMonth: string; expYear: string; }, delivery: { street: string; city: string; state: string; zip: string; }, billing: { street: string; city: string; state: string; zip: string; }) {
            console.log(await this.orders)
            if (await this.orders.length < 1) {
                setDoc(doc(db, 'orders', this.currentUser!.uid), {
                    orders: [{
                        basket: { items: submitted },
                        date: new Date,
                        user: this.currentUser === null ? '' : this.currentUser?.uid,
                        paymentInformation: payment,
                        deliveryAddress: delivery,
                        billingAddress: billing
                    }]
                })
            } else {
                console.log(await this.orders)
                await updateDoc(doc(db, 'orders', this.currentUser!.uid), {
                    orders: arrayUnion({
                        basket: { items: submitted },
                        date: new Date,
                        user: this.currentUser === null ? '' : this.currentUser?.uid,
                        paymentInformation: payment,
                        deliveryAddress: delivery,
                        billingAddress: billing
                    })
                })
            }
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
                    alert('Order deleted.')
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
                .then(async () => {
                    await this.setAdminStatus()
                })
                .then(async () => {
                    await this.setOrdersRef()
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
                this.orders = []
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
    currentBasket: any,
    orders: any,
    currentUser: User | null
    admin: boolean
    admins: any
}