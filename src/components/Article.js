import React from 'react';

const Article = ({article}) => {
	return (
		<article>
			<h3>{article.title}</h3>
			<img src={article.thumbnail} alt=""></img>
			<a href={"https://www.reddit.com" + article.permalink} target="_blank" rel="noreferrer">Link to Post</a>
		</article>
	);
}

export default Article;
