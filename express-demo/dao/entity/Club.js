class Club{
  constructor(obj){
      this.Id=obj.Id;
      this.Name=obj.Name;
      this.Tag=obj.Tag;
      this.Type=obj.Type;
      this.IconId=obj.IconId;
      this.CreateDate=obj.CreateDate;
      this.CreateName=obj.CreateName;
      this.IsDelete=obj.IsDelete;
  }
}

module.exports=Club;