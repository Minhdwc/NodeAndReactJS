module.exports = {
    mutipleMongooseToObject: function (mongooseArrays) {
        return mongooseArrays.map((mongooseArray) => mongooseArray.toObject());
    },
    mongooseToObject: function (monngoose) {
        return monngoose ? monngoose.toObject() : monngoose;
    },
};