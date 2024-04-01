const Comment = require('../models/Comment');

module.exports = {
    postComment: async (req, res) => {
        try {
            await Comment.create({
                comment:req.body.comment,
                likes:0,
                post:req.params.id,
                createdBy:req.user.username,
                createdById:req.user.id
            });
            console.log('Comment added');
            res.redirect("/post/"+req.params.id);
        } catch (err) {
            console.error(err);
            res.render('error/500');
        }
    },
    deleteComment:async(req,res)=>{
        try{
            await Comment.deleteOne({_id:req.params.id});
            res.redirect("/post/"+req.params.postid);
        }catch(err){
            console.log(err);
        }
    }
}
