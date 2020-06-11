class PostResponse{
  constructor(obj){
    this.ResponseId=obj.ResponseId;
    this.RowNumber=obj.RowNumber;
    this.PostId=obj.PostId;
    this.ResponseText=obj.ResponseText;
    this.CreateName=obj.CreateName;
    this.CreateDate=obj.CreateDate;
    this.To=obj.To;
    this.IsDelete=obj.IsDelete;
  }
}

module.exports=PostResponse