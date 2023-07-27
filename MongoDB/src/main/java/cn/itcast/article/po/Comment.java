package cn.itcast.article.po;

/* 文章实体类 Comment
*  将一个 java 类声明为 mongodb 的 Table（通过 collection 参数指明该类对应的 Table）
*  @Document(collection="Table_name")
*  - 未添加 @Document，将自动 save 至 类名小写（comment）映射的 Table
*  - 添加 @Document，将 save 至 collection 参数指定的 Table
*
* 若希望使用复合索引，可以添加 @CompoundIndex(def="{ 'userid':1, 'nickname':-1}")
* */

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Document(collection = "comment") // 此处可省略（指定的表恰与小写类名重名）
public class Comment implements Serializable {
    @Id // 主键标识，缺省时对应_id，属性名为 id 时可省略
    private String id; // 主键

    @Field("content") // 属性名与字段名不匹配时，可以使用注解强制指定指向的字段
    private String content; // 评论内容

    @Indexed // 为 用户ID 添加单字段索引
    private String userid; // 用户ID

    private Date publishtime; // 文章发布日期
    private String nickname; // 用户昵称
    private LocalDateTime createdatetime; // 评论时间
    private Integer likenum; // 点赞数
    private Integer replynum; // 回复数
    private String state; // 可见状态
    private String parentid; // 上级ID
    private String articleid; // 文章ID

    // getter & setter
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public Date getPublishtime() {
        return publishtime;
    }

    public void setPublishtime(Date publishtime) {
        this.publishtime = publishtime;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public LocalDateTime getCreatedatetime() {
        return createdatetime;
    }

    public void setCreatedatetime(LocalDateTime createdatetime) {
        this.createdatetime = createdatetime;
    }

    public Integer getLikenum() {
        return likenum;
    }

    public void setLikenum(Integer likenum) {
        this.likenum = likenum;
    }

    public Integer getReplynum() {
        return replynum;
    }

    public void setReplynum(Integer replynum) {
        this.replynum = replynum;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getParentid() {
        return parentid;
    }

    public void setParentid(String parentid) {
        this.parentid = parentid;
    }

    public String getArticleid() {
        return articleid;
    }

    public void setArticleid(String articleid) {
        this.articleid = articleid;
    }
}
