import { defineStore } from 'pinia'
import { signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { db, firebaseAuth } from '../firebase';
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Item, menuItemConverter, orderConverter, type Order } from './Item';
import { useCollection } from 'vuefire';

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
            this.menuItems = useCollection(collection(db, 'menu'))
        },
        async setOrdersRef() {
            this.orders = useCollection(collection(db, 'orders'))
        },
        async addOrder(submitted: Item) {
            // Set with menuItemConverter
            console.log(submitted)
            const basket = {
                items: submitted,
                date: new Date,
            }

            // adds an order
            const docRef = ((await addDoc(collection(db, "orders"), { basket })).withConverter(orderConverter))
            console.log(docRef)
            this.setOrdersRef()

        },
        async addNewMenuItem(i: Item) {
            // Set with menuItemConverter
            console.log(i)
            const ref = doc(db, "menu", i.name).withConverter(menuItemConverter);
            console.log(ref)
            // Adds or updates a doc with the same ref. setDoc() requires an id (i.name above)
            await setDoc(ref, new Item(i.name, i.description, i.quantity, i.options))
                .then(() => {
                    this.setMenuRef()
                })
        },
        async removeItem(item: Item) {
            // Set with menuItemConverter
            console.log('Removing from menu:')
            console.log(item)
            await deleteDoc(doc(db, "menu", item.name))
                .then(() => {
                    const filteredArray = this.menuItems.filter(function (mi: Item) {
                        return mi !== item
                    })
                    this.menuItems = filteredArray;
                })
            alert(item.name + ' deleted from menu.')
            console.log(this.menuItems)

        },
        async removeOrder(ordered: Order) {
            // Set with menuItemConverter
            console.log('Removing from orders:')
            console.log(ordered)

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
    menuItems: any,
    orders: any,
    currentUser: User | null
}