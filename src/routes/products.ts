import { Router } from "express";
import admin from 'firebase-admin'

export const productsRouter = Router()
admin.initializeApp({
    credential: admin.credential.cert('admin-key-firebase.json')
})


    // POST /products/cervejas/tiposCervejas
    productsRouter.post('/produtos/cervejas/tiposCervejas', async (req, res) => {
        try {
          const data = req.body;
          const docRef = await admin.firestore().collection('produtos').doc('cervejas').collection('tiposCervejas').add(data);
          const doc = await docRef.get();
      
          res.status(201).json({
            id: doc.id,
            data: doc.data(),
          });
        } catch (e: any) {
          res.status(500).json({ e: 'Erro ao adicionar produto' });
        }
      });
    
    // GET /products/cervejas/tiposCervejas
    productsRouter.get('/produtos/cervejas/tiposCervejas', async (req, res) => {
        try {
            const snapshot = await admin.firestore().collection('produtos').doc('cervejas').collection('tiposCervejas').get()
            const cervejas: any[] = []
            snapshot.forEach((doc) => {
                cervejas.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            res.status(200).json(cervejas)
        } catch (e: any) {
            res.status(500).json({
                e: 'Erro ao buscar o produto !'
            })
        }
    })

    // GET /products/cervejas/tiposCervejas/:id
    productsRouter.get('/produtos/cervejas/tiposCervejas/:id', async (req, res) => {
        try {
            const id = String(req.params)
            const doc = await admin.firestore().collection('produtos').doc('cervejas').collection('tiposCervejas').doc(id).get()

            if (!doc.exists) {
                return res.status(404).json({
                    error: 'Produto não encontrado'
                })
            }
            res.status(200).json({
                id: doc.id,
                data: doc.data()
            })
        } catch (e: any) {
            res.status(500).json({
                e: 'Erro ao buscar produto !'
            })
        }
    })


    // PUT /products/cervejas/tiposCervejas/:id
    productsRouter.put('/produtos/cervejas/tiposCervejas/:id', async (req, res) => {
        try {
            const id = String(req.params)
            const newData = req.body

            await admin.firestore().collection('produtos').doc('cervejas').collection('tiposCervejas').doc(id).update(newData)
            res.sendStatus(200);
        } catch (e: any) {
            res.status(500).json({
                e: 'Erro ao editar o produto'
            })
        }
    })
    

    // DELETE /products/cervejas/tiposCervejas/:id
    productsRouter.delete ('/produtos/cervejas/tiposCervejas/:id', async (req, res) => {
        try {
            const id = String(req.params)
            await admin.firestore().collection('produtos').doc('cervejas').collection('tiposCervejas').doc(id).delete()
            res.sendStatus(200);
        } catch (e: any) {
            res.status(500).json({
                e: 'Erro ao deletar o produto'
            })
        }
    })