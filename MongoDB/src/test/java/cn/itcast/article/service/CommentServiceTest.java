package cn.itcast.article.service;


import cn.itcast.article.po.Comment;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CommentServiceTest {

    @Autowired
    private CommentService commentService;

    @Test
    public void testFindCommentList() {
        System.out.println("Testing Find CommentList");
        List<Comment> commentList = commentService.findCommentList();
        System.out.println(commentList);
    }

    @Test
    public void testFindCommentById() {
        System.out.println("Testing Find Comment By Id");
        Comment comment = commentService.findCommentById("1");
        System.out.println(comment);
    }

    @Test
    public void testSaveComment() {
        Comment comment = new Comment();
        comment.setId("3");
        comment.setArticleid("1010");
        comment.setContent("test_2");

        commentService.saveComment(comment);
    }

    @Test
    public void testFindCommentListByParentid() {
        Page<List<Comment>> page = commentService.findCommentListByParentid("3", 2, 2);
        System.out.println(page);
    }

    @Test
    public void testUpdateCommentLikenum() {
        commentService.updateCommentLikenum("1");
    }
}
