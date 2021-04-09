class register{
    constructor(){
        this.inp =  $('input');
        this.arr =  [false,false];
        this.msg = $('.mess');
        this.aadEvt();
    }
    aadEvt(){
        this.inp.eq(0).blur(()=>{
            let re =/^\d{11}$/
            let str =this.inp.eq(0).val();
            this.msg.css('display','none');
            if(re.test(str)){
                this.arr[0] = true;
                // this.msg.css('display','none');
            }else{
                this.msg.text('请输入正确的手机号！')
                this.msg.css('display','block');
            }
        })
        this.inp.eq(3).blur(()=>{
            let re =/(\d|\w){6,}/
            let str = this.inp.eq(3).val();
            this.msg.css('display','none');
            if(re.test(str)){
                this.arr[1] = true;
            }else{
                this.msg.text('密码必须为不少于6的字母或者数字！')
                this.msg.css('display','block');
            }
        })
        this.inp.eq(5).click(()=>{
            if(this.arr.indexOf(false) !== -1){
                alert('请输入正确的手机号和密码格式！');
            }else{
                // alert('注册成功！');
                let uname = this.inp.eq(0).val();
               //当前密码
               let upwd = this.inp.eq(3).val();
               let $ = new Tool();
               let cookie_str = $.getCookie('users') ? $.getCookie('users') : '';
        
                let cookie_obj = $.convertStrToObj(cookie_str);
                //判断当前用户是否存在
                if(uname in cookie_obj){
                    alert('用户已存在！');
                    return;
                }else{
                    cookie_obj[uname] = upwd;
                    //存入cookie
                    $.cookie('users',JSON.stringify(cookie_obj),{expires : 9,path : '/'});
                    alert('注册成功!');
                } 
            }
            console.log(this.arr)
            // alert('请输入正确的手机号和密码格式！');
        })
    }
}
new register();