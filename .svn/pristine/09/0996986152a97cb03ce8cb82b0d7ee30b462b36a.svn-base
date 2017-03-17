storage.sync = {
    // sync方法的名字必须和所存数据的key完全相同
    // 方法接受的参数为一整个object，所有参数从object中解构取出
    // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。


    /** 用户唯一标识id*/
    //由于不加id的全局storage默认为永久存在，故暂用单个id标识所有数据*/
    userId(params){
        let {resolve, reject} = params;
        console.log('【用户唯一标识id】默认给1000');
        resolve && resolve('1000');
    },


    /** 若没有登录信息或登录信息过期则强制重新登录*/
    isLogged(params){
        let {id, resolve, reject} = params;
        console.log('【强制重新登录】没有登录信息或登录信息过期');
        resolve && resolve(false);
    },

    /** 第一次进入登陆页面不记住用户名*/
    isRememberUserName(params){
        let {resolve, reject} = params;
        console.log('【不记住用户名】第一次进入登陆页面不记住用户名');
        resolve && resolve(false);
    },

    /** 第一次进入登陆页面不记住用户名*/
    rememberUserName(params){
        let {resolve, reject} = params;
        console.log('【置空记住用户名】第一次进入登陆页面置空记住的用户名')
        resolve && resolve('');
    }
};