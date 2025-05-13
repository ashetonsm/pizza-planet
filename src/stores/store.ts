import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { db, firebaseAuth } from '../firebase';
import { arrayRemove, arrayUnion, collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { Item } from './Item';
import { useCollection, useDocument } from 'vuefire';
import { ref, type Ref } from 'vue';

export const useMenuStore = defineStore('menuItems', {
    state: (): State => {
        return {
            menuItems: [],
            currentBasket: [],
            orders: [],
            admins: [],
            admin: false,
            theme: ref('dark')
        }
    },

    getters: {
        getMenuItems: state => state.menuItems,
        getNumberOfOrders: state => state.orders.length,
        getAdminStatus: state => state.admin,
        getTheme: state => state.theme
    },
    actions: {
        async setMenuRef() {
            this.menuItems = useCollection(collection(db, 'menu'), { once: true })
        },
        async setOrdersRef(userUID: string) {
            if (this.getAdminStatus == true) {
                console.log('Displaying all orders for an admin account.')
                this.orders = useCollection(collection(db, 'orders'))
            } else {
                console.log('Displaying only orders by logged in non-admin user.')
                this.orders = useDocument(doc(collection(db, 'orders'), userUID))
            }
        },
        async setAdminsRef() {
            this.admins = useCollection(collection(db, 'admins'), { once: true })
        },
        async setThemeRef() {
            this.theme = ref('dark').value
        },
        setTheme() {
            console.log(this.theme)
            if (this.theme == 'light') {
                this.theme = 'dark'
            } else {
                this.theme = 'light'
            }
        },
        async setCurrentBasket(newItems: Item) {
            this.currentBasket.push(newItems)
        },
        async clearCurrentBasket() {
            this.currentBasket = []
        },
        async clearOrders() {
            this.orders = []
        },
        async setAdminStatus() {
            this.admins.forEach((a: { uid: string | undefined; }) => {
                if (a.uid == firebaseAuth.currentUser!.uid) {
                    console.log('Logged in user IS an admin')
                    return this.admin = true;
                }
            });
        },
        // Creates a new order
        async addOrder(submitted: Item,
            payment: { name: string; cardNumber: string; cvv: string; expMonth: string; expYear: string; },
            delivery: { name: string; street: string; city: string; state: string; zip: string; },
            billing: { name: string; street: string; city: string; state: string; zip: string; }) {
            if (this.orders == null) {
                setDoc(doc(db, 'orders', firebaseAuth.currentUser!.uid), {
                    orders: [{
                        basket: { items: submitted },
                        date: new Date,
                        uid: firebaseAuth.currentUser!.uid,
                        userEmail: firebaseAuth.currentUser!.email,
                        paymentInformation: payment,
                        deliveryAddress: delivery,
                        billingAddress: billing,
                        orderStatus: 0
                    }]
                })
            } else if (await this.orders.length < 1) {
                setDoc(doc(db, 'orders', firebaseAuth.currentUser!.uid), {
                    orders: [{
                        basket: { items: submitted },
                        date: new Date,
                        uid: firebaseAuth.currentUser!.uid,
                        userEmail: firebaseAuth.currentUser!.email,
                        paymentInformation: payment,
                        deliveryAddress: delivery,
                        billingAddress: billing,
                        orderStatus: 0
                    }]
                })
            } else {
                await updateDoc(doc(db, 'orders', firebaseAuth.currentUser!.uid), {
                    orders: arrayUnion({
                        basket: { items: submitted },
                        date: new Date,
                        uid: firebaseAuth.currentUser!.uid,
                        userEmail: firebaseAuth.currentUser!.email,
                        paymentInformation: payment,
                        deliveryAddress: delivery,
                        billingAddress: billing,
                        orderStatus: 0
                    })
                })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        alert('Error Code: ' + errorCode + '--- Error Message: ' + errorMessage);
                        setDoc(doc(db, 'orders', firebaseAuth.currentUser!.uid), {
                            orders: [{
                                basket: { items: submitted },
                                date: new Date,
                                uid: firebaseAuth.currentUser!.uid,
                                userEmail: firebaseAuth.currentUser!.email,
                                paymentInformation: payment,
                                deliveryAddress: delivery,
                                billingAddress: billing,
                                orderStatus: 0
                            }]
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
        async removeOrder(submitted: any) {
            await updateDoc(doc(db, 'orders', firebaseAuth.currentUser!.uid), {
                orders: arrayRemove(submitted)
            })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert('Error Code: ' + errorCode + '--- Error Message: ' + errorMessage);
                })
        },
        async createUser(email: string, password: string) {
            createUserWithEmailAndPassword(firebaseAuth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log('Successfully created new user:', userCredential.user.uid);
                    alert('Welcome, ' + user.email);
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
                })
                .then(async () => {
                    await this.setAdminStatus()
                })
                .then(async () => {
                    await this.setOrdersRef(firebaseAuth.currentUser!.uid)
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
                this.clearOrders()
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
    admin: boolean
    admins: any
    theme: Ref<string, string> | undefined
}