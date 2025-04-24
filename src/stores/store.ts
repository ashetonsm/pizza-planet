import { defineStore } from 'pinia'
import { signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { db, firebaseAuth } from '../firebase';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { Item, menuItemConverter } from './Item';

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
            const ref = query(collection(db, "cities"));

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
        addOrder(basket: Item) {
            this.orders.push(basket)
        },
        async addNewPizza(pizza: Item) {
            // Set with menuItemConverter
            console.log(pizza)
            const ref = doc(db, "menu", pizza.name).withConverter(menuItemConverter);
            console.log(ref)
            await setDoc(ref, new Item(pizza.name, pizza.description, pizza.quantity, pizza.options))
                .then(() => {
                    this.setMenuRef()
                }
                )
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