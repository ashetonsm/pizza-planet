import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { firebaseAuth } from '../firebase';
export const useMenuStore = defineStore('menuItems', {
    state: (): State => {
        return {
            menuItems:
                [{
                    name: 'Margherita',
                    description: 'A delicious tomato based pizza topped with mozzarella',
                    quantity: 1,
                    options: [{
                        size: 9,
                        price: 6.95
                    }, {
                        size: 12,
                        price: 10.95
                    }]
                },
                {
                    name: 'Pepperoni',
                    description: 'A delicious tomato based pizza topped with mozzarella and pepperoni',
                    quantity: 1,
                    options: [{
                        size: 9,
                        price: 7.95
                    }, {
                        size: 12,
                        price: 12.95
                    }]
                },
                {
                    name: 'Ham and Pineapple',
                    description: 'A delicious tomato based pizza topped with mozzarella, ham and pineapple',
                    quantity: 1,
                    options: [{
                        size: 9,
                        price: 7.95
                    }, {
                        size: 12,
                        price: 12.95
                    }]
                }

                ],
            orders: [],
            currentUser: null
        }
    },
    getters: {
        getMenuItems: state => state.menuItems,
        numberOfOrders: state => state.orders,
        getCurrentUser: state => state.currentUser?.email
    },
    actions: {
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