var fontFamily=document.getElementById("select-family")//设置字体
var fontSize=document.getElementById("select-size")//设置字号
var colorCollection=document.getElementsByClassName("color-collection")[0]//设置颜色
var fontColor=colorCollection.getElementsByTagName("span")
fontColor=[].slice.call(fontColor)

var colorList=document.getElementsByClassName("color-list")[0]//颜色列表
var selectColor=document.getElementById("select-color")

var autoColor=document.getElementById("auto-color")
var autoShowColor=document.getElementsByClassName("auto-show-color")[0]

var styleBold=document.getElementsByClassName("style-bold")[0]//设置加粗
var styleItalic=document.getElementsByClassName("style-italic")[0]//设置斜体
var styleUnderline=document.getElementsByClassName("style-underline")[0]//设置下划线

// 文本
var text=document.getElementById("text")
// 编辑状态
var edit=document.getElementById("edit")
// 展示
var show=document.getElementById("show")
// 编辑元素
var editContent=document.getElementsByClassName("edit-content")[0]

editContent.onclick=function(){
    edit.style.display="block"
    show.style.display="none"
}
// 选中文本时候的文本状态
document.onmouseup=function(){
    if(show.style.display!="none") return;

    // 选择文本时候，取消其他文本的选中状态
    styleBold.classList.remove("active")
    styleItalic.classList.remove("active")
    styleUnderline.classList.remove("active")
    fontFamily.value=fontFamily[0].value
    fontSize.value=fontSize[0].value

    var selObj = window.getSelection();
    var range  = selObj.getRangeAt(0);
    var commonContainer=range.commonAncestorContainer
    commonContainer=commonContainer.nodeType=="1"?commonContainer:commonContainer.parentNode;//包含选区的最深的节点
    var parent=commonContainer
    while(isChildOf(parent,text)){
        if(parent.nodeType==1){
            if(parent.nodeName=="B"){
                styleBold.classList.add("active")
            }else if(parent.nodeName=="I"){
                styleItalic.classList.add("active")
            }else if(parent.nodeName=="U"){
                styleUnderline.classList.add("active")
            }else{
                if(parent.face)
                    fontFamily.value=parent.face
                if(parent.size)
                    fontSize.value=parent.size
            }
            parent=parent.parentNode
        }
    }
}

//设置字体
fontFamily.onchange=function(){
    setFocus()
    document.execCommand("FontName",false,this.value);
}
fontFamily.onmouseup=function(e){
    e.stopPropagation()
}
//设置字号
fontSize.onchange=function(){
    setFocus()
    document.execCommand("FontSize",false,this.value+"px");
}
fontSize.onmouseup=function(e){
    e.stopPropagation()
}
//设置颜色
selectColor.onclick=function(){
    colorList.style.display="block"
}
document.onclick=function(event){
    console.log(colorList)
    if(event.target!=selectColor)
        colorList.style.display="none"
}
fontColor.forEach(function(dom,index){
    dom.onclick=function(event){
        event.stopPropagation()
        autoColor.style.backgroundColor=this.style.backgroundColor
        autoShowColor.style.backgroundColor=this.style.backgroundColor
        document.execCommand("ForeColor",false,this.style.backgroundColor)
    }
})

//设置加粗
styleBold.onclick=function(){
    setFocus()
    var className=this.className;//获取类名
    // 判断类名是否存在
    if(className.match(/\bactive\b/)){
        this.className=this.className.replace(/\bactive\b/," ")
        document.execCommand("Bold",false,"normal");
    }else{
        this.className=this.className+" active"
        document.execCommand("Bold",false,null);
    }
    // this.classList.toggle("active")
    
    // if(this.classList.contains("active"))
    //     document.execCommand("Bold",false,null);
    // else
    //     document.execCommand("Bold",false,"normal");
}
//设置斜体
styleItalic.onclick=function(){
    setFocus()
    var className=this.className;//获取类名
    // 判断类名是否存在
    if(className.match(/\bactive\b/)){
        this.className=this.className.replace(/\bactive\b/," ")
        document.execCommand("Italic",false,"normal");
    }else{
        this.className=this.className+" active"
        document.execCommand("Italic",false,null);
    }
}
//设置下划线
styleUnderline.onclick=function(){
    setFocus()
    var className=this.className;//获取类名
    // 判断类名是否存在
    if(className.match(/\bactive\b/)){
        this.className=this.className.replace(/\bactive\b/," ")
        document.execCommand("Underline",false,"none");
    }else{
        this.className=this.className+" active"
        document.execCommand("Underline",false,null);
    }
}
styleBold.onmouseup=function(e){
    e.stopPropagation()
}
styleItalic.onmouseup=function(e){
    e.stopPropagation()
}
styleUnderline.onmouseup=function(e){
    e.stopPropagation()
}
// 判断是否包含子节点
function isChildOf(child, parent) {
    var parentNode;
    if(child && parent) {
        parentNode = child.parentNode;
        while(parentNode) {
            if(parent === parentNode) {
                return true;
            }
            parentNode = parentNode.parentNode;
        }
    }
    return false;
}

// 设置光标位置
function setFocus(){
    var selObj = window.getSelection();
    var range  = selObj.getRangeAt(0);
    var commonContainer=range.commonAncestorContainer
    if(isChildOf(commonContainer, text)){
        text.focus()
    }else{
        text.focus()
        var selObj = window.getSelection();
        var range  = selObj.getRangeAt(0);
        var commonContainer=range.commonAncestorContainer
        range.collapse(false);
        range.setStart(commonContainer,commonContainer.length)
    }
}