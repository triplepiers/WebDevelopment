package cn.itcast.article.service;


import cn.itcast.article.dao.CommentRepository;
import cn.itcast.article.po.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;


import java.util.List;


// 评论的业务层
@Service
public class CommentService {
    // 注入 dao
    @Autowired
    private CommentRepository commentRepository;
    // 注入 MongoTemplate
    @Autowired(required = false)
    private MongoTemplate mongoTemplate;

    // 保存一条评论
    public void saveComment(Comment comment) {
        // 调用 dao
        commentRepository.save(comment);
    }

    // 更新一条评论
    public void updateComment(Comment comment) {
        // 调用 dao
        commentRepository.save(comment);
    }

    // 根据 id 删除评论
    public void deleteCommentById(String id) {
        // 调用 dao
        commentRepository.deleteById(id);
    }

    // 查询所有评论
    public List<Comment> findCommentList() {
        // 调用 dao
        return commentRepository.findAll();
    }

    // 根据 id 查询评论
    public Comment findCommentById(String id) {
        // 调用 dao
        return commentRepository.findById(id).get();
    }

    // 根据 parentid 分页查询评论
    public Page<List<Comment>> findCommentListByParentid(String parentid, int page, int size) {
        return commentRepository.findByParentid(parentid, PageRequest.of(page-1, size));
    }

    // 根据 id 更新评论点赞数
    public void updateCommentLikenum(String id) {
        // 查询条件
        Query query = Query.query(Criteria.where("_id").is(id));
        // 更新条件 - 局部更新，递增 likenum
        Update update = new Update();
        update.inc("likenum");
        // 更新
        mongoTemplate.updateFirst(query, update, "comment");
    }
}
