const $siteList = $(".siteList");
const $lastList = $siteList.find("li.last");
const $searchForm = $(".searchForm")[0]
const $input = $(".input")[0]
const $se = $(".se")
const listData = localStorage.getItem("listData");
const dataObject = JSON.parse(listData);
const hashMap = dataObject || [
	{
		logo: "A",
		url: "https://www.acfun.cn/",
	},
	{
		logo: "B",
		url: "https://www.bilibili.com/",
	},
	{
		logo: "G",
		url: "https://www.github.com/",
	}
];

const simplifyUrl = (url) => {
	return url
		.replace("https://", "")
		.replace("http://", "")
		.replace("www.", "")
		.replace(/\/.*/, "");
};

const render = () => {
	$siteList.find("li:not(.last)").remove();
	hashMap.forEach((node, index) => {
		const $li = $(`
        <li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
            </div>
            </div>
    </li>
        `).insertBefore($lastList);
		$li.on("click", () => {
			window.open(node.url);
		});
		$li.on("click", ".close", (e) => {
			e.stopPropagation();
			hashMap.splice(index, 1);
			render();
		});
	});
};

hashMap.forEach((node) => {
	const $li = $(`
    <li>
        <a href="${node.url}">
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${node.url}</div>
            </div>
        </a>
    </li>
`).insertBefore($lastList);
});

render();

$(".addButton").on("click", () => {
	let url = window.prompt("请问你要添加的网址是啥？");
	if (url.indexOf("http") !== 0) {
		url = "https://" + url;
	}
	hashMap.push({
		logo: simplifyUrl(url)[0],
		url: url,
	});
	render();
});

$se.on("click", (e)=> {
	$se.find(`button.active`)[0].classList.remove('active')
	e.target.classList.add('active')
	switch (e.target.innerText){
		case "谷歌":
			$searchForm.action = "https://www.google.com/search"
			$input.name = "q"
			break
		case "百度":
			$searchForm.action = "https://www.baidu.com/s"
			$input.name = "wd"
			break
		case "搜狗":
			$searchForm.action = "https://www.sogou.com/web"
			$input.name = "query"
			break
		case "必应":
			$searchForm.action = "https://cn.bing.com/search"
			$input.name = "q"
			break
	}
})

window.onbeforeunload = () => {
	const string = JSON.stringify(hashMap);
	localStorage.setItem("listData", string);
};

$(document).on("keypress", (e) => {
	const { key } = e;
	for (let i = 0; i < hashMap.length; i++) {
		if (hashMap[i].logo.toLowerCase() === key) {
			window.open(hashMap[i].url);
		}
	}
});
