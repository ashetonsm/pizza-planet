# pizza-planet

A TypeScript version of a full stack Firebase application. Based on a tutorial by [Chris Dixon](https://www.skillshare.com/en/classes/vue-js-build-a-full-stack-app-with-firebase-vuex-and-vue-router/1654744071).

## Features:
* Create and delete menu items
* Create and delete orders
* Secure admin area
* 404 page

## Technology

* Vue.js (Vite, Pinia)
* TypeScript
* Firebase
* Prettier

### To do:
- [x] Basic Firebase create/read/write/delete
- [x] Finish styling
    - [x] Add dark/light mode  
    - [x] Create footer
    - [ ] Finish mobile responsiveness
- [x] Add customer user functionality
- [x] Add customer order history
- [x] Prevent unauthorized users from deleting and deleting data via Firestore rules.
- [ ] Simulate order progress
- [ ] Fix login/log out issues:
    - [ ] Fix admin view not loading until navigating back to /account on sign in
    - [ ] Fix order disappearing but not redirecting the user on sign out.