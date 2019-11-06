# Buddyget

1. implement the front-end
2. implement the transactions list
3. implement redux + states for transactions and front-display
4. connect to backend
5. deploy

- each user is added to a collection of it's family.
- each user is then added to a separate collection containing to/from data
- every time an item is added, the `group` field is checked, and finds similar users in the separate collection

- register user: register a family as well
- every time an item is post/put/delete, update the family collection with prices.

- toggle between register page and app page using `isAuthenticated`.

**Add user**:

- add to user collection
- add `group` to the groups collection
- push the `user` to the `group` field for list of users
- if the # of users exceeds 2, add to the transactions in `group` field

**Add item**:

- divide the price by number of users in the group
- `group`: update the `transactions` field in `group` document by the difference of the value with the divided price.
- add to

Register

1. prompt user to add family (must include more than 2 users)
2. users can be authenticated, then add/update/remove items.
3. new users can be added to the family (push to transactions the new user with existing users)

- one way embedding: since num(users) << num(items), use one way embedding where you store users in items.

user functionality:

- register user (done!)
- delete user

group functionality:

- post (make a group when registering) (done!)
- get group (get transactions) (done!)
- put (update transactions)
- put 2 (delete/add user)

item functionality:

- post: add item -> sends put request to transactions (done!)
- put: update item -> sends put request to transactions (done)
- delete: -> sends put request to transactions (done!)
- get item (ding!)
- get user's items (yay!)

transactions functionality:

- get: get all transactions (yup)
- get users transactions (yee)

### Front-end

**components**:

Transactions (1)

- total expenses (done!)
- TransactionBox (2) (done!)

ItemList (3)

- transaction button
- Item (4)

ItemModal (5)
??? UpdateItemModal

Index.js

- Nav
- Transactions
- ItemList
- (fixed) addButton
