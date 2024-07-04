let goUp=document.querySelector(".up");

window.onscroll=function(){
    this.scrollY>=400?goUp.classList.add("show"):goUp.classList.remove("show");
}

goUp.onclick=function(){
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}
