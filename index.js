const Maindiv = document.querySelector(".card-container");
const TopCommentsBtn = document.querySelector(".top-comments");
const LatestCommentBtn = document.querySelector(".latest-comments");


// top 10 comments
TopCommentsBtn.addEventListener("click",()=>{
	const top_comments = new Promise((res,rej)=> {
		fetch("https://jsonmock.hackerrank.com/api/articles")
		.then((res)=> {return res.json()})
        .then((datas)=> {return datas.data.sort((a,b)=> b.num_comments - a.num_comments)})
		.then((data)=> {
			if(data){
				res(data);
			}
			else{
				rej("something went wrong");
			}
		})
	});

	top_comments.then((res)=> DisplayData(res))
	.catch((error)=> console.log(error));
})




// top 10 Latest comments.

LatestCommentBtn.addEventListener("click", ()=> {
	const latest_comments = new Promise((res,rej)=> {
		fetch("https://jsonmock.hackerrank.com/api/articles")
		.then((res)=> {return res.json()})
        .then((datas)=> {return datas.data.sort((a,b)=> b.created_at - a.created_at)})
		.then((data)=> {
			if(data){
				res(data);
			}
			else{
				rej("something went wrong");
			}
		})
	});

	latest_comments.then((res)=> DisplayData(res))
	.catch((error)=> console.log(error));
})




function DisplayData(items){
	const htmlItemCard = items.map((item)=>{
		return `
		<div class="item-main-div">
		<div class="image-holder-div">
		<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU" />
		<p class="author-name-para">${item.author.toUpperCase()}</p>
		</div>
		<div>
		<p class="title-div">${item.title}</p>
		</div>
		<div class="article-link-div">
		<p>${item.num_comments}</p>
		<a href=${item.url} target="_blank">Go to Article</a>
		</div>
		</div>
		`
	})
	.join("");
	Maindiv.innerHTML = htmlItemCard;
}