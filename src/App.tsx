import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
// import uuid from 'uuid/v4'
// import * as uuid from "uuid";
// import { v4 as uuidv4 } from "uuid";

function App() {
	const [data, setData] = useState([]);
	const [data2, setData2] = useState(null);

	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		// fetch("/api/posts")
		//     .then((res) => res.json())
		//     .then((data) => setData(data));
	}, []);

	const createNewPost = () => {
		console.log(title, author, content);
		fetch("https://server-posts-men.herokuapp.com/api/posts", {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: title,
				author: author,
				content: content,
			}),
		});
		uploadPosts();
		setContent("");
		setAuthor("");
		setTitle("");
	};

	const uploadPosts = () => {
		fetch("https://server-posts-men.herokuapp.com/api/posts")
			.then((res) => res.json())
			.then((data) => setData(data));
	};

	const deletePost = (id: string) => {
		fetch("https://server-posts-men.herokuapp.com/api/posts/" + id, {
			method: "delete", // *GET, POST, PUT, DELETE, etc.
		});
		uploadPosts();
	};
	const editPost = (item: any) => {
		fetch("https://server-posts-men.herokuapp.com/api/posts/", {
			method: "PUT", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				_id: item._id,
				author: author,
				title: title,
				content: content,
				picture: item.picture,
				__v: item.__v,
			}),
		});
		uploadPosts();
	};

	const random = (min: any, max: any) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	return (
		<div className="App">
			<div className="inputs">
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="input"
					type="text"
					placeholder="Title..."
				/>
				<input
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
					className="input"
					type="text"
					placeholder="Author..."
				/>
				<input
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="input"
					type="text"
					placeholder="Content..."
				/>
				<button onClick={createNewPost} className="button">
					Add new
				</button>
				<button onClick={uploadPosts} className="button">
					Upload posts
				</button>
			</div>
			<div>
				{data.map((item: any) => (
					<div key={random(0, 100000000)} className="post_item">
						<h3>{item.title ? item.title : "empty"}</h3>
						<h5>Author: {item.author ? item.author : "empty"}</h5>
						<p>{item.content ? item.content : "empty"}</p>
						<button
							onClick={() => deletePost(item._id)}
							className="button"
						>
							Delete
						</button>
						<button
							onClick={() => editPost(item)}
							className="button"
						>
							Edit
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
