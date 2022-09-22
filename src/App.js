import React from 'react';
import {useEffect, useState} from 'react';

import Article from './components/Article';

const App = () => {
	const [articles, setArticles] = useState([]);
	const [subReddit, setSubReddit] = useState('cats');

	function handleChange() {
		setSubReddit(document.getElementById('search-bar').value);
	}

	async function fetchHandler() {
		fetch("https://www.reddit.com/r/" + subReddit + ".json")
		.then(response => {
			if (response.status !== 200) {
				response.json()
				.then(data => {
					if (data.message === 'Forbidden') {
						alert("FAILED: The subreddit you are looking for is private");
					} else {
						alert("FAILED: The subreddit you are looking for does not exist");
					}
				})
				return;
			}

			response.json()
			.then(data => {
				if (data !== null) {
					console.log(data)
					setArticles(data.data.children);
				}
			});
		})
		.catch(e => {
			console.log(e);
			alert('FAILED: Error. Failed to fetch. Please try another subreddit')
		});
	}

	useEffect(() => {
		if (subReddit === "") {
			console.log("Empty Search Bar");
			setArticles([]);
		} else {
			fetchHandler();
		}
	}, [subReddit])

	
	return (
		<div>
			<header>
				<h1>Search for Subreddit</h1>
				<div className="form">
					<input type='text' defaultValue='cats' id="search-bar"></input>
					<button onClick={handleChange}>Search</button>
				</div>
			</header>
			{(articles !== null) ? articles.map((article, index) => <Article key={index} article={article.data}></Article>) : ""}
		</div>
	)
}

export default App;
