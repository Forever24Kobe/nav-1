const $wrap = $(".wrap");
const $addIcon = $wrap.find("li.add");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "Z", url: "https://www.zhihu.com" },
  { logo: "J", url: "https://juejin.cn" },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "")
    .replace(".com", "")
    .replace(".cn", "");
};
const render = () => {
  $wrap.find("li:not(.add)").remove();
  hashMap.forEach((node) => {
    const $li = $(`<li>                
                  <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                  </div>
              </li>`).insertBefore($addIcon);
    $li.on("click", ".logo", () => {
      window.open(node.url);
    });
    $li.on("click", ".link", (e) => {
      e.stopPropagation(); //阻断点击事件
      console.log(hashMap);
      hashMap.splice(delete index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入网址：");
  if (url.valueOf !== " ") {
    url = "https://" + url;
  }

  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url,
  });
  render();
});

//自动保存
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
//键盘事件
 $(document).on('keypress',(e)=>{
   const {key} = e
   for(i=0;i<hashMap.length;i++){
     if(hashMap[i].logo.toLowerCase() === key){
       window.open(hashMap[i].url)
     }
   }
 })
