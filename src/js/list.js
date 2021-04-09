class List{
    constructor(){
        this.list = $('.product-display-wrap');
        this.getjson();
    }
    addEvt(data){
        // console.log(data);
        data.forEach((value)=>{
            $(`<a href="http://localhost/catwalknet/dist/pages/detail.html">
                <img src="${value.src}"alt="">
                <div class="point">${value.point}</div>
                <div class="name">${value.name}</div>
                <div class="price">${value.price}</div>
            </a>`).appendTo(this.list);
        })
    }
    getjson(){
        $.get('../json/list.json',(data)=>{
            this.addEvt(data);
        })
    }
}
new List();
// console.log(1);