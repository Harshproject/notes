const mongoose =require('mongoose');
// const URI="mongodb+srv://harsh:inotebook@cluster0.9tkw1p4.mongodb.net/?retryWrites=true&w=majority";
const URI="mongodb+srv://harshmohitmail2001:notebook@cluster0.rjnwrkq.mongodb.net/?retryWrites=true&w=majority"
const connectToMongo=()=>{
    mongoose.connect(URI).then(()=>{
        console.log("connected to mongo");
    })
}
module.exports=connectToMongo;