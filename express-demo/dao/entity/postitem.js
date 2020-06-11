class Postitem{
  constructor(obj){
    this.PostId=obj.PostId;
    this.RowNumber=obj.RowNumber;
    this.PostItemBody=obj.PostItemBody;
    this.PostItemAttachment=obj.PostItemAttachment;
    this.CreateDate=obj.CreateDate;
    this.CreateName=obj.CreateName;
    this.ResponseDate=obj.ResponseDate;
    this.ResponseName=obj.ResponseName;
    this.ParentPostItemId=obj.ParentPostItemId;
    this.Good=obj.Good;
    this.Bad=obj.Bad;
    this.IsDelete=obj.IsDelete;
    this.Site=obj.Site;
    this.Host=obj.Host;
    this.Platform=obj.Platform;
    this.HostArea=obj.HostArea;
  }
}

module.exports=Postitem;