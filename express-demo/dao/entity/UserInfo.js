class UserInfo {
  constructor(obj) {
    this.UserId = obj.UserId;
    this.UserCode = obj.UserCode;
    this.UserName = obj.UserName;
    this.Email = obj.Email;
    this.Phone = obj.Phone;
    this.Address = obj.Address;
    this.Inactived = obj.Inactived;
    this.CreateTime = obj.CreateTime;
    this.ModifyTime = obj.ModifyTime;
    this.Password = obj.Password;
    this.Md5Passord = obj.Md5Passord;
    this.Status = obj.Status;
    this.Photo = obj.Photo;
    this.Sex = obj.Sex;
  }
}

module.exports = UserInfo