import { findArticle } from '../../controller/crud';

aysnc function loadArticle(id) {
    let article = await findArticle(id);
    $(".article > h2").text(article.headline);
    $(".article > p").text(article.article);
    // $(".comments").tex
}