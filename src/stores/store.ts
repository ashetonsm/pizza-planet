import { defineStore } from 'pinia'
import { signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { db, firebaseAuth } from '../firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { Item, menuItemConverter, orderConverter, type Order } from './Item';

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
            const querySnapshot = await getDocs(collection(db, "menu").withConverter(menuItemConverter));

            querySnapshot.forEach(async (doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.data());
                const pizzaExists = await (this.menuItems).find(
                    pizza => pizza.name === doc.data().name
                )

                if (pizzaExists) {
                    return
                } else {
                    this.menuItems.push(doc.data())
                }

            });
            console.log('Menu Items:')
            console.log(this.menuItems)
        },
        async setOrdersRef() {
            const querySnapshot = await getDocs(collection(db, "orders"));

            // Clear the local orders list
            this.orders = [];
            querySnapshot.forEach(async (doc) => {
                // Orders is an array of Basket[]
                // Each Basket contains an array of Items[] from the menu
                // Each Item from the menu is an {Item} object

                this.orders.push(doc.data().basket)


            });
            console.log('Orders:')
            console.log(this.orders)
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
        async addNewPizza(pizza: Item) {
            // Set with menuItemConverter
            console.log(pizza)
            const ref = doc(db, "menu", pizza.name).withConverter(menuItemConverter);
            console.log(ref)
            // Adds or updates a doc with the same ref. setDoc() requires an id (pizza.name above)
            await setDoc(ref, new Item(pizza.name, pizza.description, pizza.quantity, pizza.options))
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
                    const filteredArray = this.menuItems.filter(function (mi) {
                        return mi !== item
                    })
                    this.menuItems = filteredArray;
                })
            alert(item.name + ' deleted from menu.')
            console.log(this.menuItems)

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
    orders: Order[],
    currentUser: User | null
}