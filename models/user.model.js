module.exports = mongoose => {
    return mongoose.model(
        "user",
        mongoose.Schema(
            {
                name: String,
                email: String,
                password: String
            },
            {timestamps: true}
        )
    );
};
