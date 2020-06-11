class Mynote {
    constructor(obj) {
        this.Id = obj.Id;
        this.UserCode = obj.UserCode;
        this.Seq = obj.Seq;
        this.Note = obj.Note;
        this.CreateDate = obj.CreateDate;
        this.IsDelete = obj.IsDelete;
        this.Good = obj.Good;
        this.Bad = obj.Bad;
    }
}

module.exports = Mynote;