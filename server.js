import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())


// Criar usuário
app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)

})

// Listar usuários
app.get('/usuarios', async (req, res) => {

    let users = []

    if(req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else {

    }

    res.status(200).json(users)
})

// Alterar usuário
app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where:{
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)

})

// Deletar usuário

app.delete('/usuarios/:id', async(req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message: "Usuário deletado."})
})



app.listen(3000)


/* 

   Feitos do código : 


   1 - Tipo de Rota / Método HTTP
   2- Endereço

   Criação da API de Usuários

   - Criar um usuário
   - Listar todos os usuários
   - Deletar um usuário
   

*/