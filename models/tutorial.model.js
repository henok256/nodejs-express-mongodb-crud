


module.exports = mongoose=>{
    var schema = mongoose.Schema(
            {
                title:String,
                description:String,
                published:Boolean
            },
            {
                timeStamps:true
            }
        );
        schema.method("toJSON", function(){
            const {__v, _id, ...Object}= this.toObject();
            Object.id =_id;
            return Object;
        });
        const Tutorial= mongoose.model("tutorial", schema);
        return Tutorial;
   
}