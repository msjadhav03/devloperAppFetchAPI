const express = require('express')
const chalk = require('chalk')
const MongoClient = require('mongodb').MongoClient
var length = 0
const client = new MongoClient('mongodb://localhost:27017',{useNewUrlParser: true},(err)=>
{
    if(err)
    {
        console.error(err)
    }
})

const fetchDevices = async(req,res,next)=>
{
    await client.connect()
    const db = client.db('fetchAPIS')
    const collection = db.collection('fetchDevicesCollection')
    
    console.log(chalk.green.inverse('Database Connection Successful'))

    const page = await req.body.page
    const limit = await req.body.limit

   /* if(page <= 0)
    {
       await res.json({
            error : "Incorrect page value"
        })
    }

    if(limit <= 0)
    {
        await res.json(
            {
                error : "Incorrect limit value"
            }
        )
    }
*/
    const results = {}
    const startIndex = (page - 1) * limit
    const endIndex = (page * limit)
    
   
    await collection.countDocuments().then((result) =>
    {
        console.log("****************")
        length = result
    })
    console.log(length)
    if(startIndex > 0)
    {
        return results.previous =
        {
            page : page - 1,
            limit : limit
        }
    }
    if(endIndex < length)
    {
        results.next = 
        {
            page : page + 1,
            limit : limit
        }
    }

    let data = await collection.find({}).limit(limit).skip(startIndex)
    results.docResult = await data.toArray()
    res.json(results)


}

module.exports = fetchDevices