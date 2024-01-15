const {mongoose} =require('mongoose')
const { Schema } = mongoose;

const userNotes = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true,
  },
  tags:{
    type:String,
    default:"General"
  },
  Date:{
    type:Date,
    default:Date.now
  },
});
module.exports=mongoose.model('Notes',userNotes);