import axios from '../config/httpConfig.js'
const club={
  searchClub:(clubName)=>{
    return new Promise((resolve,reject)=>{
      axios.get("/post/searchClubList?clubName="+clubName).then(
        res=>{
          resolve(res);
        },
        err=>{
          reject();
        }
      )
    })
  },
  // searchClub:(id,clubName,tag,type)=>{
  //   return new Promise((resolve,reject)=>{
  //     axios.get("/post/getClubList?clubId="+id+"&clubName="+clubName+"&tag="+tag+"&type="+type).then(
  //       res=>{
  //         resolve(res);
  //       },
  //       err=>{
  //         reject();
  //       }
  //     )
  //   })
  // },
  getFocusClub:()=>{
    return new Promise((resolve,reject)=>{
      axios.get("/post/getFocusClubList").then(
        res=>{
          resolve(res);
        },
        err=>{
          reject();
        }
      )
    })
  },
  getClubById:(id)=>{
    return new Promise((resolve,reject)=>{
      axios.get("/post/getClubById?id="+id).then(
        res=>{
          resolve(res);
        },
        err=>{
          reject();
        }
      )
    })
  },
  focusClub:(clubId)=>{
    return new Promise((resolve,reject)=>{
      axios.post("/post/focusClub",{clubId:clubId}).then(res=>{
        resolve();
      },err=>{
        reject();
      })
    })
  },
  cancelFocusClub:(clubId)=>{
    return new Promise((resolve,reject)=>{
      axios.post("/post/cancelFocusClub",{clubId:clubId}).then(res=>{
        resolve();
      },err=>{
        reject();
      })
    })
  }
}

export default club;