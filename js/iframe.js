(function () {
    // 检查当前页面是否在 iframe 中加载
    if (window.top === window.self) {
        // 如果页面是直接在浏览器中加载，动态引入CSS文件
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "../css/index.css"; // 引入CSS文件
        document.head.appendChild(link); // 把样式文件加到head中

        // 创建要插入的HTML结构
        var htmlContent = `
            <div class="layui-layout layui-layout-admin">
                <div class="layui-header header">
                    <div class="layui-main mag0">
                        <a href="/" class="logo">PTECore练习</a>
                        <ul class="layui-nav mobileTopLevelMenus" mobile>
                            <li class="layui-nav-item" data-menu="contentManagement">
                                <a href="/"><i class="layui-icon" data-icon=""></i><cite>首页</cite></a>
                            </li>
                        </ul>
                        <ul class="layui-nav topLevelMenus" pc>
                            <li class="layui-nav-item" data-menu="contentManagement">
                                <a href="/"><i class="layui-icon" data-icon=""></i><cite>首页</cite></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        // 插入HTML到body的最前面
        var body = document.body;
        body.insertAdjacentHTML('afterbegin', htmlContent);
    }
})();