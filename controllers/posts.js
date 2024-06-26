const cloudinary = require('../middleware/cloudinary')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const Like = require('../models/like')

module.exports = {
    getProfile: async (req, res) => {
        try {
            const posts = await Post.find({ user: req.user.id });
            res.render("profile.ejs", { posts: posts, user: req.user });
        } catch (error) {
            console.log(err);
        }
    },
    getFeed: async (req, res) => {
        try {
            const posts = await Post.find().sort({ createdAt: 'desc' }).populate('user').lean();
            res.render("feed.ejs", { posts: posts });
        } catch (error) {
            console.log(err);
        }
    },
    getPosts: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: "asc" }).lean();
            post.likes = await Like.countDocuments({ post: req.params.id })
            res.render("post.ejs", { post: post, user: req.user, comments: comments })
        } catch (error) {
            console.log(error)
        }
    },
    createPost: async (req, res) => {
        try {
            //uplode image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            await Post.create({
                title: req.body.title,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                caption: req.body.caption,
                likes: 0,
                user: req.user.id,
            });
            console.log("Post has been added!")
        } catch (error) {
            console.log(err)
        }
    },
    likePost: async (req, res) => {
        try {
            const postId = req.params.id;
            await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } }, { new: true });
            console.log("Likes +1");
            res.redirect(`/post/${postId}`);
        } catch (error) {
            console.log(error);
            res.redirect(`/post/${req.params.id}?error=${error}`);
        }
    },
    deletePost: async (req, res) => {
        try {
            //Find post by id
            let post = await Post.findById({ _id: req.params.id });
            //delte image by cloudinary
            await cloudinary.uploader.destroy(post.cloudinaryId);
            //delte post from db
            await Post.remove({ _id: req.params.id });
            console.log("Delete Post")
            res.redirect('/profile');
        } catch (error) {
            res.redirect('/profile')
        }
    }
}