function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function isLocalStorageSupport(){
    try {
        var isSupport = 'localStorage' in window && window['localStorage'] !== null;
        if (isSupport) {
            localStorage.setItem('__test', '1');
            localStorage.removeItem('__test');
        }
        return isSupport;
    } catch (e) {
        layer.open({content: '隐私/无痕模式效果会不太好哦!请切换到正常模式'});
        return false;
    }
}

function isMobile() {
    let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    return flag;
}