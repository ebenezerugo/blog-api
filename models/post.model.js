module.exports = mongoose => {
    return mongoose.model(
        "post",
        mongoose.Schema(
            {
                userId: String,
                title: String,
                body: String
            },
            {timestamps: true}
        )
    );
};
