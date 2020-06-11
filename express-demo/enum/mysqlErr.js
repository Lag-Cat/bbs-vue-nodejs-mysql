module.exports={
  getMsg:(code)=>{
    return mysqlErr[code]?mysqlErr[code].msg:"未知名错误"
  },
  getCustMsg:(code,custMsg)=>{
    return mysqlErr[code]?mysqlErr[code].custMsg[custMsg]:"未知名错误";
  }
}

const mysqlErr={
  ER_DUP_ENTRY:{
    no:"1062",
    msg:"已存在重复键值",
    custMsg:{
      ERR_REGISTER:"已存在该用户"
    }
  }
}

