class Attachemnt{
    constructor(obj){
        this.AttachmentId=obj.AttachemntId;
        this.AttachmentName=obj.AttachmentName;
        this.FileSize=obj.FileSize;
        this.FileHost=obj.FileHost;
        this.FilePath=obj.FilePath;
        this.CompressFileId=obj.CompressFileId;
        this.Property1=obj.Property1;
        this.Property2=obj.Property2;
        this.Property3=obj.Property3;
        this.Property4=obj.Property4;
        this.Property5=obj.Property5;
        this.Property6=obj.Property6;
        this.Memo=obj.Memo;
        this.IsDelete=obj.IsDelete;
        this.CreateDate=obj.CreateDate;
        this.CreateName=obj.CreateName;
        this.Site=obj.Site;
        this.Host=obj.Host;
        this.PlatForm=obj.PlatForm;
        this.HostArea=obj.HostArea;
    }
}

module.exports=Attachemnt;