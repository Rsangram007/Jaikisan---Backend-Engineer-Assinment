const CoustomerModel = require("../Model/CoustomerModel");

  const CreateUser= async function (req, res) {
    try {
      let Data = req.body
      let SaveData = await CoustomerModel.create(Data);
      return res.status(201).send({ data: SaveData });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  }


  const getuser=async(req,res)=>{
    try {
      let getdata=await CoustomerModel.find({status:"ACTIVE"})
      if(getdata.length==0)return res.status(404).send({status: false,message:"There is NO DATA FOUND IN ACTIVE"})
      return res.status(200).send({status:true,message: `Data successfully fetched!`,data:getdata})
      
    } catch (e) {
     return res.status(500).send({ status: false, message: e.message  })
      
    }
  }



const deleteuser=async(req,res)=>{
  try {
   
    let deleteuser=await CoustomerModel.findByIdAndUpdate(
      req.params.userId,
      { $set: { status: 'INACTIVE' } },
      { new: true }
    )
    if(!deleteuser) return res.status(400).send({status: true,message:"There is already deleted"})
    return res.status(200).json({status:true,message:"successfully deleted"})
  
    
  } catch (e) {
    return res.status(500).send({ status: false, message: e.message  })
  }

}


  module.exports={CreateUser,getuser,deleteuser}

        
       



