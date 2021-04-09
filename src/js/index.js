
class Nav{
    constructor(){
        this.sm_ul_list = $('.sm_nav_ul .listname')
        this.ul = $('.list ul');
        this.getjson();
        this.addEvt();
    }
    // 完善页面插入列表
    init(data){
        $(data.grirl_coat.sp1).each((index,value)=>{
            $(`<li>${value}</li>`).appendTo(this.ul.eq(0));
        })
        $(data.grirl_coat.sp2).each((index,value)=>{
            $(`<li>${value}</li>`).appendTo(this.ul.eq(1));
        })
        $(data.grirl_coat.sp3).each((index,value)=>{
            $(`<li>${value}</li>`).appendTo(this.ul.eq(2));
        })
        $(data.grirl_coat.sp4).each((index,value)=>{
            $(`<li>${value}</li>`).appendTo(this.ul.eq(3));
        })
        $(data.grirl_coat.sp5).each((index,value)=>{
            $(`<li>${value}</li>`).appendTo(this.ul.eq(4));
        })
        $(data.grirl_coat.sp6).each((index,value)=>{
            $(`<li>${value}</li>`).appendTo(this.ul.eq(5));
        })
        $(data.grirl_coat.sp7).each((index,value)=>{
            $(`<li>${value}</li>`).appendTo(this.ul.eq(6));
        })
    }
    // 添加事件
    addEvt(){
        this.sm_ul_list.each((index,value)=>{
            $(value).hover(function(){
              $(this).css('background','white');
              $(this).children().css('display','none');
              $(this).children().stop();
              $(this).children().show(100);
            },function(){
                $(this).css('background','transparent');
                $(this).children().hide(100);
              })
        })
    }
//  获取json数据
    getjson(){
        // Json(this.init())
        $.get('json/index.json',(data)=>{
            this.init(data);
        })
    }
}

// banner部分
class banner{
    constructor(){
        this.ban = $('.banner');
        this.getjson();
    }
    init(data){
        // console.log(data.banner);
        $(`<img src="${data.banner.src}">` ).appendTo(this.ban);
    }
    getjson(){
        $.get('json/index.json',(data)=>{
            this.init(data);
        })
    }
}

// section部分
class Section{  
    constructor(){
        // this.section_one = $('.section_img_one');
        // this.section_two = $('.section_img_two');
        this.section_one = $('.one');
        this.section_two = $('.two');
        this.section_three = $('.three');
        this.getjson();
        // this.imgs = this.section_one.find('.imgs');
    }
    init(data){
        // console.log(data.section_img_one.img);
        this.data = data;
        $(data.section_img_one.img).each((index,value)=>{
            // console.log( this.section_one );
            // $(`<div class="imgs"></div>`).appendTo(this.section_one);
            $(`<div class="imgs imgs${index}"><img src="${value}"></div>`).appendTo(this.section_one);
            // $(`<img src="${value}">`).appendTo(`.imgs${index}`);            
        })
        $(data.section_img_two.img).each((index,value)=>{
            $(`<img src="${value}">`).appendTo(this.section_two);
        })
        $(data.section_img_three.img).each((index,value)=>{
            $(`<img src="${value}">`).appendTo(this.section_three);
        })
        // console.log(this.section_two.text());
        this.imgs_one= this.section_one.find('.imgs img');
        this.imgs_two= this.section_two.find('img');
        this.imgs_three = this.section_three.find('img');
        this.imgs_three.each((index,value)=>{
            $(value).each(()=>{
                $(value).wrap($('<a href="javascript:;"></a>'));
            })
        })
        this.three_a = this.section_three.children('a');
        // console.log(data.section_img_two.img);
        this.addEvt();
    }
    getjson(){
        $.get('json/index.json',(data)=>{
            this.init(data);
            // console.log(data.items);
        })
    }
    addEvt(){
       this.imgs_one.each((index,value)=>{
            $(value).wrap($(`<a href=""></a>`));
            $(value).hover(()=>{
                $(value).animate({padding:0,width:400,height:290},300);
            },()=>{
                $(value).animate({width:390,padding:5,height:280},300);
            })
        })
        this.imgs_two.each((index,value)=>{
            $(value).wrap($(`<a href=""></a>`));
            $(value).hover(()=>{
                $(value).animate({padding:0,width:600,height:290},300);
            },()=>{
                $(value).animate({padding:0,width:570,height:270},300);
            })
        })
        this.three_a.each((index,value)=>{
            $(`<div class="item point">${this.data.items[index].point}</div>`).appendTo(this.three_a.eq(index));
            $(`<div class="item name">${this.data.items[index].name}</div>`).appendTo(this.three_a.eq(index));
            $(`<div class="item price">${this.data.items[index].price}</div>`).appendTo(this.three_a.eq(index));
        })
    }
}
new Nav();
new banner();
new Section();