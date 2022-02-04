const express = require('express');
const orders = require('./Orders.json');
const products = require('./Products.json')
const customers = require('./Customers.json');

const { initializeApp, getApps, cert } = require('firebase-admin/app');//were bringing in getApps to check in see if its already conected
const { getFirestore } = require('firebase-admin/firestore');

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000;

const credentials = require('./credentials.json');




function connectToFirestore() {
    if(!getApps().length) {
        //check and see if its already connect and if NOT then connect, but still connect to firestore
      initializeApp({
        credential: cert(credentials)
      });
    }
    return getFirestore();
  }


// const db = getFirestore();

// const orderRef = db.collection('bs-orders');
// const prodRef = db.collection('bs-products') //added this on the app.get 
// const custRef = db.collection('bs-customers');

//Update the documents
// db.collection('customers').doc('hvPeQ7Xn7zYdVp9dG2fi').update({customerId: "hvPeQ7Xn7zYdVp9dG2fi"})
// .then(doc => {
//     console.log('updated customers info')
// })
// .catch(err => {
//     console.error(err); 
// });


// app.get('/customer', async (request, response) => {
//     const db = connectToFirestore();
//     console.log("calling customers")
//     const snapshot = await custRef.get()
//     const customers = snapshot.docs.map(doc =>{ //THIS IS DARIES WAY 
//             return doc.data() //or let customer = doc.data();
//             //customer.id = doc.id;
//             // return customer
//     })
//     response.send(customers)
//   })

  
app.get('/customer', (req, res) => {
    const db = connectToFirestore();
    db.collection('bs-customers').get()
    .then(snapshot => {
        const customers = snapshot.docs.map(doc => { //
            let customer = doc.data();
            customer.id = doc.id
            return customer
        })
        res.status(200).send(customers)
    })
    .catch(console.end);
})

app.get('/order', (req, res) => {
    const db = connectToFirestore();
    db.collection('bs-orders').get()
    .then(snapshot => {
        const orders = snapshot.docs.map(doc => { //
            let order = doc.data();
            order.id = doc.id
            return order
        })
        res.status(200).send(orders)
    })
    .catch(console.end);
})
app.get('/product', (req, res) => {
    const db = connectToFirestore();
    db.collection('bs-products').get()
    .then(snapshot => {
        const products = snapshot.docs.map(doc => { //
            let product = doc.data();
            product.id = doc.id
            return product
        })
        res.status(200).send(products)
    })
    .catch(console.end);
})
  

  
app.post('/customer', (request,response) => {
    const db = connectToFirestore()
    db.collection('bs-customers')
    .add(request.body)
    .then(() => response.send("customer created"))
    .catch(console.error)
})


  
  app.listen(3000, () => {
    console.log('API listening on port 3000')
  })