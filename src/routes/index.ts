import { Router } from "express";
import admin from 'firebase-admin'

export const router = Router()
admin.initializeApp({
    credential: admin.credential.cert('admin-key-firebase.json')
})

router.post('/products', async (req, res) => {
    const data = req.body;
    admin.firestore()
    .collection('produtos')
    .add(data).then(() =>{
    console.log('produto adicionado com sucesso')
    })
})