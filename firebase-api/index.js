const express = require('express');
const { initializeApp, getApps, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore'); // make sure to install firebase-admin
const credentials = require('./credentials.json');

const app = express();
app.use(express.json())

// const PORT = process.env.PORT || 3000;

//connect to FireBase services
initializeApp({
    credential: cert(credentials)
});

function connectToFirestore() {
    if(!getApps().length) {
      initializeApp({
        credential: cert(credentials)
      });
    }
    return getFirestore();
}

// const db = getFirestore()


app.post('/pl-products', (request,response) => {
    const db = connectToFirestore()
    db.collection('pl-products')
    .add(request.body)
    .then(() => response.send("Products created!"))
    .catch(console.error)
})

app.get('/pl-products', (req, res) => {
    const db = connectToFirestore();
    db.collection('pl-products').get()
      .then(snapshot => {
        const products = snapshot.docs.map(doc => {
          let product = doc.data();
          product.id = doc.id;
          return product
        });
        res.status(200).send(products);
      })
      .catch(console.error);
})

app.post('/pl-customers', (request,response) => {
  const db = connectToFirestore()
  db.collection('pl-customers')
  .add(request.body)
  .then(() => response.send("Customers created!"))
  .catch(console.error)
})

app.get('/pl-customers', (req, res) => {
  const db = connectToFirestore();
  db.collection('pl-customers').get()
    .then(snapshot => {
      const products = snapshot.docs.map(doc => {
        let product = doc.data();
        product.id = doc.id;
        return product
      });
      res.status(200).send(products);
    })
    .catch(console.error);
})

app.post('/pl-orders', (request,response) => {
  const db = connectToFirestore()
  db.collection('pl-orders')
  .add(request.body)
  .then(() => response.send("Orders created!"))
  .catch(console.error)
})

app.get('/pl-orders', (req, res) => {
  const db = connectToFirestore();
  db.collection('pl-orders').get()
    .then(snapshot => {
      const products = snapshot.docs.map(doc => {
        let product = doc.data();
        product.id = doc.id;
        return product
      });
      res.status(200).send(products);
    })
    .catch(console.error);
})


// read one document
app.get('/pl-orders/:id', (req, res) => {
  const db = connectToFirestore();
  const { id } = req.params
  db.collection('pl-orders').doc(id).get()
    .then(doc => {
      res.send(doc)
    })
    .catch(console.error);
})

// update a doc
// app.post('/pl-orders/:id', (request,response) => {
//   const db = connectToFirestore()
//   const { id } = req.params
//   db.collection('pl-orders').doc(request.body).update()
//   .then(() => response.send("Orders updated!"))
//   .catch(console.error)
// })

app.patch('/pl-orders', (request,response) => {

  const { id } = request.body
  const db = connectToFirestore()
  
  db.collection('pl-orders')
  .doc(id)
  .update()
  //.add(request.body)
  .then(() => response.send("Order updated"))
  .catch(console.error)
})

app.listen(3000, () => {
    console.log("API listening on port 3000");
  });