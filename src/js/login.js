class login{
    constructor(){
        this.li = $('.auth-body li');
        this.login_box = $('.login_box');
        this.inp = this.login_box.eq(1).find('input');
        this.msg = $('.msg');
        this.btn = $('.login-btn');
        this.arr = [false,false];
        this.addEvt();
    }
    addEvt(){
        this.li.eq(1).click(()=>{
            this.li.eq(1).css('color', '#161619');
            this.li.eq(0).css('color','#999');
            this.login_box.eq(0).css('display','none');
            this.login_box.eq(1).css('display','block');
            console.log(this.inp.length);
        })
        this.li.eq(0).click(()=>{
            this.li.eq(0).css('color', '#161619');
            this.li.eq(1).css('color','#999');
            this.login_box.eq(1).css('display','none');
            this.login_box.eq(0).css('display','block');
        })
        this.inp.eq(0).blur(()=>{
            let re =/^\d{11}$/
            let str =this.inp.eq(0).val();
            this.msg.css('display','none');
            if(re.test(str)){
                this.arr[0] = true;
                // this.msg.css('display','none');
            }else{
                this.msg.text('请输入正确的手机号！')
                this.msg.css({'display':'block','color':'red','fontSize':12});
            }
            this.inp.eq(1).blur(()=>{
                let re =/(\d|\w){6,}/
                let str = this.inp.eq(1).val();
                this.msg.css('display','none');
                if(re.test(str)){
                    this.arr[1] = true;
                }else{
                    this.msg.text('密码必须为不少于6的字母或者数字！')
                    this.msg.css({'display':'block','color':'red','fontSize':12});
                }
            })
        })
        this.btn.click(()=>{
            if(this.arr.indexOf(false) !== -1){
                alert('请输入正确的手机号和密码格式！');
            }else{
                // alert('注册成功！');
                let uname = this.inp.eq(0).val();
               //当前密码
               let upwd = this.inp.eq(1).val();
               let $ = new Tool();
               let cookie_str = $.getCookie('users') ? $.getCookie('users') : '';
                let cookie_obj = $.convertStrToObj(cookie_str);
                //判断当前用户是否存在
                if(uname in cookie_obj){
                    if(cookie_obj[uname] === upwd){
                        alert('登录成功');
                        location.href = '../index.html';
                    }else{
                        alert('密码错误');
                    }
                }else{
                    alert('用户名不存在！');
                }
            }
        })
    }
}

new login();