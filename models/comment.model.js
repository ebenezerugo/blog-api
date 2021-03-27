module.exports = mongoose => {
    return mongoose.model(
        'comment',
        mongoose.Schema(
            {
                postId: String,
                name: String,
                email: String,
                body: String
            },
            {timestamps: true}
        )
    );
}
