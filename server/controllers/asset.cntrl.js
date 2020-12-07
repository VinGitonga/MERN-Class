const Asset = require('../models/asset.model')
const Mall = require('../models/mall.model')


exports.create = async(req,res)=>{
  const asset = new Asset(req.body)

  try{
    const data = await asset.save()
    res.status(201).send(data)
  } catch(err){
    res.status(500).json(err.message)
  }
}

exports.searchAssets = async(req,res)=>{
  const {q, cat} = req.body

  const regex = new RegExp(q || '', 'i')

  console.log(`Searching Assets by ${cat}, query=${q} .........`)

  try{
    let data
    switch(cat){
      case "name":
         data = await Asset.find({name: regex})
                        .populate('mall','name')
        break
      case "location":
      
    }
  }
}
