class Postheader {
  constructor (obj) {
    this.PostId = obj.PostId
    this.PostType = obj.PostType
    this.Tag = obj.Tag
    this.BBSAreaId = obj.BBSAreaId
    this.BBSAreaName = obj.BBSAreaName
    this.PostTitle = obj.PostTitle
    this.PostTopBody = obj.PostTopBody
    this.PostTopBodyAttachment = obj.PostTopBodyAttachment
    this.CreateDate = obj.CreateDate
    this.CreateName = obj.CreateName
    this.LastResponseDate = obj.LastResponseDate
    this.ResponseCount = obj.ResponseCount
    this.RowCount = obj.RowCount
    this.PostTopImage = obj.PostTopImage
  }
}

export default Postheader
