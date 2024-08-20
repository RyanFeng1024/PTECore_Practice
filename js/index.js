var $,tab,dataStr,layer;
layui.config({
	base : "js/"
}).extend({
	"bodyTab" : "bodyTab"
})
layui.use(['bodyTab','form','element','layer','jquery'],function(){
	var form = layui.form,
		element = layui.element;
		$ = layui.$;
    	layer = parent.layer === undefined ? layui.layer : top.layer;
		var lang = window.localStorage.getItem("lang");
		var jsonUrl = lang == "en" ? "/json/navs_en.json" : "/json/navs.json";
		tab = layui.bodyTab({
			openTabNum : "50",  //最大可打开窗口数量
			url : jsonUrl //获取菜单json地址
		});

	if(isMobile()) { 
		var lang = window.localStorage.getItem("lang");
		if (lang == "en") {
			layer.open({title: 'Info', btn: ['OK'], content: 'For a better experience, please use computer to access.'});
		} else {
			layer.open({content: '为了更好的体验，请使用电脑访问本站点。'});
		}
	}

	//通过顶部菜单获取左侧二三级菜单   注：此处只做演示之用，实际开发中通过接口传参的方式获取导航数据
	function getData(json){
		$.getJSON(tab.tabConfig.url,function(data){
			if(json == "contentManagement"){
				dataStr = data.contentManagement;
				tab.render();
			}else if(json == "memberCenter"){
				dataStr = data.memberCenter;
				tab.render();
			}else if(json == "systemeSttings"){
				dataStr = data.systemeSttings;
				tab.render();
			}else if(json == "seraphApi"){
                dataStr = data.seraphApi;
                tab.render();
            }
		})
	}
	$(".topLevelMenus li,.mobileTopLevelMenus dd").click(function(){
		if($(this).parents(".mobileTopLevelMenus").length != "0"){
			$(".topLevelMenus li").eq($(this).index()).addClass("layui-this").siblings().removeClass("layui-this");
		}else{
			$(".mobileTopLevelMenus dd").eq($(this).index()).addClass("layui-this").siblings().removeClass("layui-this");
		}
		$(".layui-layout-admin").removeClass("showMenu");
		$("body").addClass("site-mobile");
		getData($(this).data("menu"));
		tab.tabMove();
	})

	$(".hideMenu").click(function(){
		if($(".topLevelMenus li.layui-this a").data("url")){
			layer.msg("此栏目状态下左侧菜单不可展开");
			return false;
		}
		$(".layui-layout-admin").toggleClass("showMenu");
		tab.tabMove();
	})

	getData("contentManagement");

    $('.site-tree-mobile').on('click', function(){
		$('body').addClass('site-mobile');
	});
    $('.site-mobile-shade').on('click', function(){
		$('body').removeClass('site-mobile');
	});

	$("body").on("click",".layui-nav .layui-nav-item a:not('.mobileTopLevelMenus .layui-nav-item a')",function(){
		if($(this).siblings().length == 0){
			addTab($(this));
			$('body').removeClass('site-mobile');
		}
		$(this).parent("li").siblings().removeClass("layui-nav-itemed");
	})

	$(".clearCache").click(function(){
		window.sessionStorage.clear();
        window.localStorage.clear();
        var index = layer.msg('清除缓存中，请稍候',{icon: 16,time:false,shade:0.8});
        setTimeout(function(){
            layer.close(index);
            layer.msg("缓存清除成功！");
        },1000);
    })

    if(cacheStr == "true") {
        if (window.sessionStorage.getItem("menu") != null) {
            menu = JSON.parse(window.sessionStorage.getItem("menu"));
            curmenu = window.sessionStorage.getItem("curmenu");
            var openTitle = '';
            for (var i = 0; i < menu.length; i++) {
                openTitle = '';
                if (menu[i].icon) {
                    if (menu[i].icon.split("-")[0] == 'icon') {
                        openTitle += '<i class="seraph ' + menu[i].icon + '"></i>';
                    } else {
                        openTitle += '<i class="layui-icon">' + menu[i].icon + '</i>';
                    }
                }
                openTitle += '<cite>' + menu[i].title + '</cite>';
                openTitle += '<i class="layui-icon layui-unselect layui-tab-close" data-id="' + menu[i].layId + '">&#x1006;</i>';
                element.tabAdd("bodyTab", {
                    title: openTitle,
                    content: "<iframe src='" + menu[i].href + "' data-id='" + menu[i].layId + "'></frame>",
                    id: menu[i].layId
                })
                if (curmenu != "undefined") {
                    if (curmenu == '' || curmenu == "null") {
                        element.tabChange("bodyTab", '');
                    } else if (JSON.parse(curmenu).title == menu[i].title) {
                        element.tabChange("bodyTab", menu[i].layId);
                    }
                } else {
                    element.tabChange("bodyTab", menu[menu.length - 1].layId);
                }
            }
            tab.tabMove();
        }
    }else{
		window.sessionStorage.removeItem("menu");
		window.sessionStorage.removeItem("curmenu");
	}
})

function addTab(_this){
	tab.tabAdd(_this);
}

//捐赠弹窗
function donation() {
	var lang = window.localStorage.getItem("lang");
	var alipay = "支付宝";
	var wechatpay = "微信";
	if (lang == "en") {
		alipay = "Alipay";
		wechatpay = "WeChatPay";
	}
	layer.tab({
		area : ['460px', '650px'],
		tab : [{
			title : wechatpay,
			content : "<div style='padding:30px;overflow:hidden;background:#d2d0d0;'><img src='images/wechat.jpg' style='width:400px;'></div>"
		},{
			title : alipay,
			content : "<div style='padding:30px;overflow:hidden;background:#d2d0d0;'><img src='images/alipay.jpg' style='width:400px;'></div>"
		},{
			title : "USDT",
			content : "<div style='padding:30px;overflow:hidden;background:#d2d0d0;'><img src='images/usdt.jpg' style='width:400px;'></div>"
		},{
			title : "PayPal",
			content : "<div style='padding:30px;overflow:hidden;background:#d2d0d0;'><img src='images/paypal.jpg' style='width:400px;'></div>"
		}]
	})
}

function showImg(){
    $.getJSON('/json/RO.json', function(json){
        var res = json;
        layer.photos({
            photos: res,
            anim: 5
        });
    });
}