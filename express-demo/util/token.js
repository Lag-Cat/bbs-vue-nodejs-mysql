const path=require('path')
const jwt=require('jsonwebtoken')
module.exports={
  encrypt:function(data,time){
    return jwt.sign(data,'token',{expiresIn:time});
  },
  decrypt:function(token){
    try{
      let data=jwt.verify(token,'token');
      return {
        token:true,
        id:data.id
      }
    }catch(e){
      return{
        token:false,
        data:e
      }
    }
  }
}