package cn.itcast.article.dao;


import cn.itcast.article.po.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


// 评论的持久层接口
public interface CommentRepository extends MongoRepository<Comment, String> {

    // 根据 parentid 分页查询评论
    Page<List<Comment>> findByParentid(String parentid, Pageable pageable);
}
