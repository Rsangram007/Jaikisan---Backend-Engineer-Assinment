const cardModel=require("../Model/CardModel")
const coustmer=require("../Model/CoustomerModel")
const count=require("../Model/Counter")

const cretecard=async(req,res)=>{
    try {
        const data = req.body
        const { cardType, customerName, status, vision, customerID } = data
        const checkCustomerID = await coustmer.findOne({ _id: customerID, })
        if (!checkCustomerID) return res.status(404).send({ status: false, message: `This CustomerID: '${customerID}' is not exist! ` })
       
        const couter = await count.findOneAndUpdate( {},
            { $inc: { seq: 1 } } )
            const seq = couter.seq;
            const cardNumber = "C" + ("000" + seq).slice(-3);

        const cardCreation = await cardModel.create({ cardNumber: cardNumber, cardType, customerName, status, vision, customerID })

        return res.status(201).send({ status: true, message: `Your card data successfully created!`, data: cardCreation })
    } catch (e) {
        return res.status(500).send({message:e.message,status:false})
        
    }
}
const fetchCard = async (req, res) => {

    try {

        const getCard = await cardModel.find()

        if (getCard.length == 0) return res.status(404).send({ status: false, message: "No card data exist!" })

        return res.status(200).send({ status: true, message: `Data successfully fetched!`, data: getCard })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports={cretecard,fetchCard}