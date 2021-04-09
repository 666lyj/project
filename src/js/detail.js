class Slide{
    constructor(){
        // 轮播
        this.span = document.querySelectorAll('.small span');
        this.big_img = document.querySelectorAll('.img img');
        this.big_pic = document.querySelectorAll('.Pic img');
        this.small_img = document.querySelectorAll('.small-slide img');
        this.big_num = this.big_img.length; 
        this.z_index = 0;
        this.index = 0;
        // 放大镜
        this.float = document.querySelector('.float_lawer');
        this.mark = document.querySelector('.mark');
        this.big_box = document.querySelector('.Pic');
        this.addEvt();
        this.slide();
        this.magnifying();
    }
    addEvt(){
        // 轮播图事件
        this.span[0].onclick = function(){
            this.index --;
            // if(当前下标 === -1){
            //     当前下标 = 长度- 1
            // }
            if(this.index === -1){
                this.index = this.big_num - 1;
            }
            // 切换图片
            this.magnifying();
            this.slide();
        }.bind(this);
        this.span[1].onclick = function(){
            this.index ++;
            if(this.index === this.big_num){
                this.index = 0;
            }; 
            this.magnifying();
            this.slide();
        }.bind(this);
        for(let i = 0;i < this.big_num; i ++){
            this.small_img[i].onmouseenter = function(){
                this.index = i;
                this.magnifying();
                this.slide();
            }.bind(this);
        }
    }
    slide(){
        // console.log( this.big_img.length);
        // console.log(this.index);
        this.big_img[this.index].style.zIndex = ++ this.z_index;
        this.big_pic[this.index].style.zIndex= ++ this.z_index;
        for (let i = 0;i < this.big_num; i ++){
        this.small_img[i].style.border = 'none';
        this.small_img[this.index].style.border = '1px solid #111';

        }
    }
    magnifying(){
        // console.log(index);
        let big_move_pic = this.big_pic[this.index];
        // console.log(big_mov_pic);
        // 放大镜事件
        // console.log(this.mark);
        this.mark.onmouseenter = function(){
            this.float.style.display = 'block';
            this.big_box.style.display = 'block';
        }.bind(this);
        this.mark.onmouseout = function(){
            this.float.style.display = 'none';
            this.big_box.style.display = 'none';
        }.bind(this);
        this.mark.onmousemove = function(evt){
            let e = evt || window.event;
            let left = e.offsetX - this.float.offsetWidth / 2;
            let top = e.offsetY - this.float.offsetHeight / 2;
            //边界
            if(left <= 0){
                left = 0;
            }else if(left >= this.mark.offsetWidth - this.float.offsetWidth){
                left = this.mark.offsetWidth - this.float.offsetWidth;
            }
            if(top <= 0){
                top = 0;
            }else if(top >= this.mark.offsetHeight - this.float.offsetHeight){
                top = this.mark.offsetHeight - this.float.offsetHeight;
            }
            this.float.style.left = left + 'px';
            this.float.style.top = top + 'px';

            // 滑块在小图范围中的移动比例
            // x_p = 滑块当前的left值 / (小图宽度 - 滑块宽度)
            let x_p = left / (this.mark.offsetWidth - this.float.offsetWidth);
            // y_p = 滑块当前的top值 / (小图高度 - 滑块高度)
            let y_p = top / (this.mark.offsetHeight - this.float.offsetHeight);

            // 大图.style.left = - (大图宽度 - 大图盒子的宽度) * x_p + 'px';
            big_move_pic.style.left = - (big_move_pic.offsetWidth - this.big_box.offsetWidth) * x_p + 'px';
            // 大图.style.top = - (大图高度- 大图盒子的高度) * y_p + 'px';
            big_move_pic.style.top = - (big_move_pic.offsetHeight - this.big_box.offsetHeight) * y_p + 'px';
        }.bind(this);
    }
 }
 class Tab{
     constructor(){
         this.li = document.querySelectorAll('.ul-label li');
         this.product_detail = document.querySelector('.product-detail');
         this.conmment = document.querySelector('.comment');
         this.addEvt();
     }
     addEvt(){
         let that = this;
         console.log(that.li.length);
         this.li[1].onclick = function(){
             this.style.color = ' #111111';
             this.style.borderBottom = ' 2px solid black';
             that.li[0].style.color = 'rgb(103, 95, 95)';
             that.li[0].style.borderBottom = ' 2px solid transparent';
             that.conmment.style.display = 'block';
             that.product_detail.style.display = 'none';
         }
         this.li[0].onclick = function(){
            this.style.color = ' #111111';
            this.style.borderBottom = '2px solid black';
            that.li[1].style.color = 'rgb(103, 95, 95)';
            that.li[1].style.borderBottom = '2px solid transparent';
            that.product_detail.style.display = 'block';
            that.conmment.style.display = 'none';
        }
     }
 }
class Product{
    constructor(){
        this.cart_btn = document.querySelectorAll('.button-wrap .wrap-buy');
        this.num_btn = document.querySelectorAll('.change span');
        this.test = document.querySelector('.change input');
        this.addEvt();
        this.init();
    }
    init(){
        let storage = window.localStorage;
        let good_id =  document.querySelector('.product-intro').getAttribute('data-good-id');
        let storage_str = storage.getItem('carts') ? storage.getItem('carts')  : '';
            let storage_obj = this.covertstrTOobj(storage_str);
            if (good_id in storage_obj ){
                this.test.value = storage_obj[good_id].num;
            }else{
                this.test.value = 1;
            }
    }
    addEvt(){
        let that = this;
        console.log(this.num_btn.length);
        this.cart_btn[1].onclick = function(){
            // 商品id
            let good_id =  document.querySelector('.product-intro').getAttribute('data-good-id');
            // 商品缩略图
            let good_src = document.querySelectorAll('.intro-left .img img')[0].src;
            // 商品名称
            let good_name = document.querySelector('.product-name').innerText;
            // 商品信息：颜色，尺码
            let good_color =  document.querySelector('.product-color span').innerText;
            let good_size =  document.querySelector('.product-size span').innerText;
            // 商品价格：
            let good_price =(document.querySelector('.product-price').children[1].innerText);
            console.log(good_size);
            console.log(good_name);
            console.log(good_color);
            let storage = window.localStorage;
            // 转对象
            let storage_str = storage.getItem('carts') ? storage.getItem('carts')  : '';
            let storage_obj = that.covertstrTOobj(storage_str);
            if (good_id in storage_obj ){
                storage_obj[good_id].num ++;
            }else{
                storage_obj[good_id] ={
                    "src":good_src,
                    "name":good_name,
                    "color":good_color,
                    "size":good_size,
                    "price":good_price,
                    "num":1
                }
            }
            storage.setItem('carts',JSON.stringify(storage_obj));
            that.init();
        }
        this.num_btn[1].onclick = function(){
            let good_id =  document.querySelector('.product-intro').getAttribute('data-good-id');
            let good_src = document.querySelectorAll('.intro-left .img img')[0].src;
            // 商品名称
            let good_name = document.querySelector('.product-name').innerText;
            // 商品信息：颜色，尺码
            let good_color =  document.querySelector('.product-color span').innerText;
            let good_size =  document.querySelector('.product-size span').innerText;
            // 商品价格：
            let good_price =(document.querySelector('.product-price').children[1].innerText);
            // console.log(good_size);
            // console.log(good_name);
            // console.log(good_color);
            let storage = window.localStorage;
            // 转对象
            let storage_str = storage.getItem('carts') ? storage.getItem('carts')  : '';
            let storage_obj = that.covertstrTOobj(storage_str);
            that.test.value ++;
            if (good_id in storage_obj ){
                storage_obj[good_id].num ++;
            }else{
                storage_obj[good_id] ={
                    "src":good_src,
                    "name":good_name,
                    "color":good_color,
                    "size":good_size,
                    "price":good_price,
                    "num":1
                }
            }
            storage.setItem('carts',JSON.stringify(storage_obj));
        }
        this.num_btn[0].onclick = function(){
            let good_id =  document.querySelector('.product-intro').getAttribute('data-good-id');
            let good_src = document.querySelectorAll('.intro-left .img img')[0].src;
            // 商品名称
            let good_name = document.querySelector('.product-name').innerText;
            // 商品信息：颜色，尺码
            let good_color =  document.querySelector('.product-color span').innerText;
            let good_size =  document.querySelector('.product-size span').innerText;
            // 商品价格：
            let good_price =(document.querySelector('.product-price').children[1].innerText);
            // console.log(good_size);
            // console.log(good_name);
            // console.log(good_color);
            let storage = window.localStorage;
            // 转对象
            let storage_str = storage.getItem('carts') ? storage.getItem('carts')  : '';
            let storage_obj = that.covertstrTOobj(storage_str);
            that.test.value --;
            if(Number(that.test.value) <= 1){
                that.test.value = '1';
                // alert('222')
            }
            if (good_id in storage_obj ){
                storage_obj[good_id].num --;
                if(storage_obj[good_id].num < 2){
                    storage_obj[good_id].num = 1;
                }
            }else{
                storage_obj[good_id] ={
                    "src":good_src,
                    "name":good_name,
                    "color":good_color,
                    "size":good_size,
                    "price":good_price,
                    "num":1
                }
            }
            storage.setItem('carts',JSON.stringify(storage_obj));
        }
    }
    covertstrTOobj(str){
        if(!str){
            return{};
        }
        return JSON.parse(str);
    }
}
new Slide();
new Tab();
new Product();