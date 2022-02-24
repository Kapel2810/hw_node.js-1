import express from "express"
import generalSettings from "./config.js"
import { espressoClubCoffee } from "./database.js"

// console.log(generalSettings)
const app= express()
app.use(express.json()) 


app.get(`${generalSettings.baseUrl}`, (req,res)=> {
    res.send("main")
})

app.get(`${generalSettings.baseUrl}/coffee`, (req,res)=> {
    res.send(espressoClubCoffee)
})

app.get(`${generalSettings.baseUrl}/coffee/:id`, (req,res)=> {
    let id = +req.params.id
    const requestedCoffeeType = 
    espressoClubCoffee.find(coffeeT => coffeeT.id === id)
    res.send(requestedCoffeeType)
   
})

app.post(`${generalSettings.baseUrl}/coffee`, (req,res)=> {
    const coffeeTypeToAdd = req.body
    const lastId = espressoClubCoffee[espressoClubCoffee.length -1].id
    let newCoffeeType = {
        ...coffeeTypeToAdd,
        id: lastId+1
    }

    espressoClubCoffee.push(newCoffeeType)
    res.send(newCoffeeType)
})


app.listen(5001)
console.log("server is running on port 5001")
