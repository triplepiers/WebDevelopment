# Mongo DB 后端项目

## Preparation

### 基本功能

- 实现评论的增删改查 API
- 根据 articleId 查询 comment
- comment 点赞功能

### Table 结构
> - database = `articledb`
> - table = `comment`

| key |     type      | description     |
|:---:|:-------------:|-----------------|
|`_id`| Object/String | ID，主键           |
|`articleid`|    String     | 文章ID            |
|`content`|    String     | 评论内容            |
|`userid`|    String     | 用户ID            |
|`nickname`|    String     | 用户昵称            |
|`createdatetime`|     Date      | 评论时间            |
|`likenum`|     Int32     | 点赞数             |
|`replynum`|     Int32     | 文章回复数           |
|`state`|    String     | 可见状态：0-不可见，1-可见 |
|`parentid`|    String     | ==0 则为顶级评论      |

### 技术栈

- `mongodb-driver` 类似于 JDBC
- `SpringDateMongoDB` [官网](https://spring.io/projects/spring-data-mongodb)

   用于操作 Mongo DB 的持久层框架，对 `mongodb-driver` 进行了封装

### 项目搭建

1. 在 `pom.xml` 中声明依赖
2. 创建 `src/main/resources/application.yml` 配置数据库连接
3. 创建启动类 `cn.itcast.article.ArticleApplication`
4. 创建实体类 `cn.itcast.article.po.Comment`

#### 注意事项

1. 配置文件中

    - 使用 JDK-20 时，采用 3.0.5 版本的 `spring-boot-starter-parent` 可以顺利执行
    - 使用 2.1.6-RELEASE 会报 `Failed to read candidate component class` 的错误

2. 启动类中

   - `SpringApplication.run` 是 `org.springframework.boot.SpringApplication` 中的函数，在 IDEA 中错误使用 `@` 将报“找不到方法”的错误。

3. 实体类中

   - 可以通过 `代码-生成-...` 选项，让 IDEA 批量生成 getter & setter

4. 初始化数据

    - Compass 无论直接输入还是从文件导入都无法使用 `new Date()` -> 导入字符串再手动修改为 `Date` 类型

## 1 实现基本增删改查

1. 创建数据访问接口 `cn.itcast.article.dao.CommentRepository`
2. 创建业务逻辑类 `cn.itcast.article.service.CommentService`
3. 创建测试类 `cn.itcast.article.service.CommmentServiceTest`

   - 运行 Test 类即可进行测试
   - 打印结果和老师的略有区别（老师打印了返回的具体信息，这边只返回了内存地址）
   - 插入测试成功了：但多了一个 `_class` 属性（似乎是正常操作）

## 2 根据 parentid 分页查询评论

1. 为 `CommentRepository` 新增方法定义 `Page<Comment> findByParentid(String parentid, Pageable pageable)`
2. 在 `CommentService` 中实现该方法
3. 在测试类中添加对 `findByParentid` 方法的测试

## 3 实现评论点赞功能

首先来看一个十分简单（但低效）的实现方式：
```java
public void updateCommentThumbupToIncrementOld(String id) {
    Comment comment = commentRepository.findById(id).get();
    comment.setLikenum(comment.getLikenum() + 1);
    commentRepository.save(comment);
}
```
因为 Mongo DB 的原因，此处我们更新了记录中的**所有**字段。

---

下面尝试使用 `MongoTemplate` 实现只对 `likenum` 字段进行重置：

1. 在 `CommentService` 中注入 `MongoTemplate`
   
   - 不使用 `@Autowired(required = false)` 会报错：“找不到 bean”

2. 实现 `upadateCommentLikenum`
3. 编写测试（从 Campass 的反应来看应该是能用）