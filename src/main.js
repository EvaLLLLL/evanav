const $siteList = $('.siteList')
const $lastList = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [{
    logo: 'A',
    url: 'https://www.acfun.cn/'
},
    {
        logo: 'B',
        url: 'https://www.bilibili.com/'
    },
]

// 简化网址
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //删除/开头的内容
}

const render = () => {
    $siteList.find('li:not(.last)').remove() // 遍历前清空
    hashMap.forEach((node, index) => {
        const $li = $(`
        <li>
            <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
            </div>
            </div>
    </li>
        `).insertBefore($lastList)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            console.log(hashMap);
            console.log(index);
            hashMap.splice(index, 1) // 删除点中的信息
            render()
        })
    })
}

hashMap.forEach(node => {
    const $li = $(`
    <li>
    <a href="${node.url}">
        <div class="site">
            <div class="logo">${node.logo[0]}</div>
            <div class="link">${node.url}</div>
        </div>
    </a>
</li>
    `).insertBefore($lastList)
})

render()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问你要添加的网址是啥？')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({
            logo: simplifyUrl(url)[0],
            url: url,
        })
        render()
    })

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    // const key = e.key
    const {key} = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})