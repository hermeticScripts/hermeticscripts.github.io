// Add event listener for DOMContentLoaded (fires when document is fully loaded)
document.addEventListener("DOMContentLoaded", hermesInit);

function hermesInit() {
	let memoryHeap = [{
			type: "function",
			name: "hermesInit",
			preview: "() {...}",
			event: "DOMContentLoaded",
			log: "Hermes has already initialized the DOM."
		},
		{
			type: "function",
			name: "whatDoWeBuild",
			preview: "() {...}",
			event: "click",
			log: "Web Apps, APIs, and automation scripts."
		},
		{
			type: "function",
			name: "envsUsed",
			preview: "() {...}",
			event: "click",
			log: "We've used AWS, GCP, Browser Extensions & Wordpress."
		},
		{
			type: "function",
			name: "whoIsHermes",
			preview: "() {...}",
			event: "click",
			log: "He who created speech."
		},
		{
			type: "function",
			name: "whatIsSpeech",
			preview: "() {...}",
			event: "click",
			log: "Speech is in all things, is twofold, both true and false."
		}];
	var heapObjPos = ["start", "center", "end"];
	var stackCol = document.querySelector(".stack .list-group");
	var queueCol = document.querySelector(".queue .list-group");
	var heapCol = document.querySelector(".heap");
	var message = document.getElementById("message");
	var stack = "";
	var heap = "";
	var events = "";
	
	memoryHeap.forEach((el, i) => {
		if(i === 0){
			stack += `<li class="list-group-item stack-item" data-link="${el.name}"> ${el.name}</li>`;
		}
		heap += `<div class="row justify-content-${getRandomArrItem(heapObjPos)}" data-link="${el.name}"><div class="card heap-card col-4"><div class="card-body"><span class="${el.type}">${el.type}</span> <span class="name">${el.name}</span>${el.preview}</div></div></div>`;
	});

	stackCol.innerHTML = stack;
	heapCol.innerHTML = heap;

	setTimeout(() => {
		stackCol.innerHTML = "";
		queueCol.innerHTML = ""
	}, 2500);
	



	const allInstancesOfFunc = document.querySelectorAll("[data-link]");
	for (const funcs of allInstancesOfFunc) {
  		funcs.addEventListener('click', (event) => {
			let link = funcs.dataset.link;
			let msg = memoryHeap.find(el => el.name === link);
			message.innerText = `"${msg.log}"`;
    			simulateDomEvent(stackCol, queueCol, msg);
			// go to bottom of page to see Hermes message
			window.scrollTo(0, document.body.scrollHeight);

  		})
	}
	function simulateDomEvent(stackCol, queueCol, data){
		stackCol.innerHTML = getStackColHTML(data);
		queueCol.innerHTML = getQueueColHTML(data);
		setTimeout(() => {
			stackCol.innerHTML = "";
			queueCol.innerHTML = "";
		}, 2500);
	}
	function getQueueColHTML(data){
		return `<li class="list-group-item event">${data.event}</li>`;
	}
	function getStackColHTML(data){
		return `<li class="list-group-item stack-item" data-link="${data.name}"> ${data.name}</li>`;
	}
	function getRandomArrItem(arr){
		return arr[Math.floor(Math.random()* arr.length)];
	}
}