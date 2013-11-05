  var siteurl = "http://192.168.7.109/novel/test/";
  var sitedynamicurl = "http://a.qtshu.com/";
  var homeurl = "http://192.168.7.109/novel/test/";
  var memberurl = "http://a.qtshu.com/";
  var jieqi_res_url = "http://s.qtshu.com";
  var theme_res_url = "http://s.qtshu.com/v4";
  var load_transform = true;
  var load_jiaThisButton = true;
  var load_history = true;

/**
*jquery ui plugin
*by awen
*email awen1983@live.cn
*/
(function ($) {
    /**浏览器常量*/
    var isIECore = ! -[1, ],
		isWebkitCore = (/webkit/i).test(navigator.userAgent),
		is360 = (/360SE/i).test(navigator.userAgent),
		isSogou = (/MetaSr/i).test(navigator.userAgent),
		isQQ = navigator.userAgent.indexOf("QQBrowser") > -1, 	/**邪门这里用正则无效*/
    /**遨游判断这里有点郁闷呢，否则，《有些~》ie8 window.external.max_version 这句话直接报错！而不是undefined，难道跟跟更新包有关系？*/
		isMaxthon = (function () {
		    if (window.external) {
		        try {
		            if (window.external.max_version) {
		                return window.external.max_version.substr(0, 1) > 0;
		            }
		        } catch (e) { }
		        return false;
		    }
		    return false;
		})(),
		isMaxthonHightModen = isMaxthon && ((/Maxthon/i).test(navigator.appVersion)),
		isOpera = window.opera ? true : false,
		isIE = isIECore && !isMaxthon && !isSogou && !isQQ, /**排除搜狗和遨游浏览器，360就不用排除了基本根ie一样，所以就当ie了*/
		isIE6 = isIE && (/MSIE 6.0/i).test(navigator.appVersion),
		isIE7 = isIE && (/MSIE 7.0/i).test(navigator.appVersion),
		isFirefox = (/Firefox/i).test(navigator.userAgent),
		isSafari = (/Safari/.test(navigator.userAgent)) && (!(/Chrome/.test(navigator.userAgent))),
		isChrome = (/Chrome/i).test(navigator.userAgent) && !isSogou && !isMaxthon && !isQQ;

    /**获取url的diomain主域*/
    function getUrlMainDomain(url) {
        if (/localhost/i.test(url)) {
            return "localhost";
        }
        var patt = /\w+[\.]?(com|net|org|gov|cc|biz|info|cn|tk)(\.(cn|hk))?/i;
        var arr = url.match(patt);
        if (arr.length > 0) return arr[0];
        else return false;
    }
    /**
    *在全局中增加设置标记信息
    *@param hashkey 要增加唯一标志，
    *@return  如果以前曾经设置过该标志，false else true
    */
    function addConfig(hashkey) {
        if (!window.cczwConfig) {
            window.cczwConfig = {};
        }
        if (!cczwConfig[hashkey]) {
            cczwConfig[hashkey] = true;
            return true;
        }
        return false;
    }



    function tabs(setting) {
        var tabs = $(setting.selector).children("[data-for]");
        var curshowidx = setting.showidx || 0;
        var onClass = setting.onClass;
        var offClass = setting.offClass;
        var waiting = setting.loading ? setting.loading : false;
        var funtype = setting.type ? setting.type : "mouseover";
        var rollback = setting.rollback ? setting.rollback : false;
        //如果curshowidx为-1 ,则搜索当前显示id
        if (curshowidx == -1) {
            for (var i = tabs.length - 1; i >= 0; i--) {
                if (tabs[i].className == onClass) {
                    curshowidx = i;
                }
            };
        }

        var showids = [];
        for (var i = 0; i < tabs.length; i++) {
            tabs[i] = $(tabs[i]);
            var datafor = tabs[i].attr("data-for");
            showids[i] = datafor ? datafor : false;
            tabs[i].bind(funtype, showids, function (o) {
                var curforid = $(this).attr("data-for");
                changeShowTab(o.data, curforid);
            });
        }

        //显示默认tab	
        changeShowTab(showids, showids[curshowidx]);

        //是否回滚
        if (rollback) {
            //监控鼠标状态
            $(setting.selector).parent().bind("mouseout",
 				function (event) {
 				    var box = $(this).getBox();
 				    if (!(box.left < event.clientX && event.clientX < box.right) || !(box.top < event.clientY && event.clientY < box.bottom)) {
 				        setTimeout(function () { changeShowTab(showids, showids[curshowidx]) }, 500);
 				    }
 				}
 			);
        }
        //tab切换
        function changeShowTab(ids, curid) {
            //tabs
            tabs.each(function (i) {
                var showid = $(this).attr("data-for");
                if (showid == curid) {
                    if (offClass) { $(this).removeClass(offClass); }
                    if (onClass) { $(this).addClass(onClass); }
                } else {
                    if (onClass) { $(this).removeClass(onClass); }
                    if (offClass) { $(this).addClass(offClass); }
                }
            });
            //shows
            for (var i = 0, len = ids.length; i < len; i++) {
                if (curid == ids[i]) {
                    $(ids[i]).css("display", "block");
                    //判断是否需要加载数据
                    var dataurl = $(curid).attr("data-url");
                    if (dataurl) {
                        if (waiting) { $(curid).html(waiting) };
                        //火狐默认的xhtml的doctype 获取回来的居然是xml，所以定义类型为html
                        $.get(dataurl, function (data) {
                            $(curid).html(data);
                            $(curid).removeAttr("data-url");
                        }, "html");
                    }
                } else {
                    $(ids[i]).css("display", "none");
                }
            }
        }
    }


    function efloat(setting) {
        if (!setting || !setting.selector) {
            alert("对象不能为空");
        }
        var mobj = $(setting.selector);
        var htype = setting.htype ? setting.htype : "center";
        var vtype = setting.vtype ? setting.vtype : "middle";
        var offsetx = setting.offsetx ? setting.offsetx : 0;
        var offsety = setting.offsety ? setting.offsety : 0;
        var floatcondition = setting.condition ? setting.condition : "always";
        var basebox = mobj.getBox();
        var canfixed = !$.browsers.isIE6;
        var border_top = parseInt(mobj.css("borderTopWidth"));
        var border_left = parseInt(mobj.css("borderLeftWidth"));

        if (floatcondition == "over") {
            var placeholder = mobj.clone(true, true).css("display", "none");
            placeholder.insertBefore(mobj);
            $(window).bind("scroll resize", { "base": mobj, "place": placeholder }, function (e) {
                //判断是否滚动显示
                var curbox = e.data.base.getBox();
                if (curbox.top <= 0) {
                    e.data.place.css("display", "block");
                } else {
                    e.data.place.css("display", "none");
                }
            });
            keeppos(placeholder);
        } else {
            keeppos(mobj);
        }

        function keeppos(jelement) {
            jelement.css("position", canfixed ? "fixed" : "absolute");
            setpos(jelement);
            if (!canfixed || htype == "center" || vtype == "middle" || vtype == "fixed" || htype == "fixed") {
                $(window).bind("scroll resize", jelement, function (e) {
                    setpos(e.data);
                });
            }
        }
        function setpos(jelement) {
            var win = $.getWinBox();
            var obox = jelement.getBox();
            var scrollLeft = $(window).scrollLeft();
            var scrollTop = $(window).scrollTop();
            var pos = {};
            switch (htype) {
                case "left":
                    pos.left = canfixed ? 0 : scrollLeft;
                    break;
                case "right":
                    if (canfixed) {
                        pos.right = 0;
                    } else {
                        pos.left = win.browser.width + scrollLeft - obox.width;
                    }
                    break;
                case "self":
                    pos.left = canfixed ? basebox.left : basebox.left + scrollLeft - border_left;
                    break;
                case "fixed":
                    pos.left = canfixed ? basebox.left - scrollLeft : basebox.left - border_left;
                    break;
                case "center":
                default:
                    pos.left = (win.browser.width - obox.width) / 2;
                    pos.left = canfixed ? pos.left : pos.left + scrollLeft;
                    break;
            }
            switch (vtype) {
                case "top":
                    pos.top = canfixed ? 0 : scrollTop;
                    break;
                case "bottom":
                    if (canfixed) {
                        pos.bottom = 0;
                    } else {
                        pos.top = win.browser.height + scrollTop - obox.height;
                    }
                    break;
                case "self":
                    pos.top = canfixed ? basebox.top : basebox.top + scrollTop - border_top;
                    break;
                case "fixed":
                    pos.top = canfixed ? basebox.top - scrollTop : basebox.top - border_top;
                    break;
                case "middle":
                default:
                    pos.top = (win.browser.height - obox.height) / 2;
                    pos.top = canfixed ? pos.top : pos.top + scrollTop;
                    break;
            }
            if (pos.top != undefined) { pos.top += offsety; }
            if (pos.bottom != undefined) { pos.bottom -= offsety; }
            if (pos.left != undefined) { pos.left += offsetx; }
            if (pos.right != undefined) { pos.right -= offsetx; }
            jelement.css(pos);
        }
    }
    function tips(setting) {
        var mobj = $(setting.selector);
        var info = setting.info ? setting.info : "";
        var condition = setting.condition ? setting.condition : "over";
        var dataurl = setting.dataurl ? setting.dataurl : false;
        var loadonce = setting.loadonce != undefined ? setting.loadonce : true;
        var classname = setting.classname ? setting.classname : "";
        var mode = setting.mode ? setting.mode : "border";
        var keep = setting.keep != undefined ? setting.keep : false;
        var hasbar = setting.hasbar != undefined ? setting.hasbar : false;
        var title = setting.title != undefined ? setting.title : "";

        var tipobj = $("<div>").css({ "position": "absolute", "display": "none" }).appendTo($(document.body));
        if (classname == "") {
            tipobj.css({ "borderWidth": "8px 10px 15px 5px", "borderColor": "#0f0", "borderStyle": "solid", "backgroundColor": "#fff" });
        } else {
            tipobj.addClass(classname);
        }

        if (hasbar) {
            var titlebar = $("<dl>").css({ "margin": 0, "padding": 0, "position": "relative", "height": "30px", "line-height": "30px", "background-color": "rgb(251,237,187)" });
            var title = $("<dt>").css({ "margin": 0, "padding": 0, "float": "left", "margin-left": "10px", "color": "rgb(235,110,0)", "font-weight": "bold", "font-size": "15px" }).html(title);
            var closebtn = $("<dd>").css({ "wdith": "20px", "height": "20px", "line-height": "20px", "float": "right", "position": "absolute", "top": "5px", "right": "5px", "text-align": "center", "vertical-align": "middle", "font-size": "18px", "cursor": "pointer", "background-color": "rgb(235,110,0)", "color": "#fff" }).html("×").click(function (e) {
                tipobj.hide();
            });
            title.appendTo(titlebar);
            closebtn.appendTo(titlebar);
            titlebar.appendTo(tipobj);
        }
        tipobj.append(info);
        var contentobj = $("<div>").css("line-height", "20px").appendTo(tipobj);

        if (dataurl) { tipobj.attr("data-url", dataurl) }
        switch (condition) {
            case "click":
                mobj.click(
					function (e) {
					    tipobj.toggle();
					    gethtml();
					    setpos();
					}
				);
                break;
            case "over":
            default:
                mobj.hover(
					function (e) {
					    tipobj.show();
					    gethtml();
					    setpos();
					}, function (e) {
					    tipobj.hide();
					}
				);
                break;
        }
        if (keep) {
            $(window).bind("resize scroll", function () {
                setpos();
            });
        }

        function gethtml() {
            if (tipobj.attr("data-url")) {
                $.get(tipobj.attr("data-url"), function (s) {
                    contentobj.html(s);
                    setpos();
                    tipobj.css({ width: tipobj.width(), height: tipobj.height() });
                    if (loadonce) { tipobj.removeAttr("data-url"); }
                });
            }
        }
        function setpos() {
            var pos = getRoundPos(mobj, tipobj, setting.vtype, setting.htype, mode);
            tipobj.css(pos);
        }
    }


    //获取元素环绕另外对象元素周边显示的位置，返回left top  json数据
    function getRoundPos(baseobj, tipobj, vtype, htype, mode) {
        htype = htype ? htype : "center";
        vtype = vtype ? vtype : "middle";

        var obox = baseobj.getBox();
        var scrollLeft = $(window).scrollLeft();
        var scrollTop = $(window).scrollTop();
        var border_top = parseInt(baseobj.css("borderTopWidth")) || 0;
        var border_left = parseInt(baseobj.css("borderLeftWidth")) || 0;
        var border_bottom = parseInt(baseobj.css("borderBottomWidth")) || 0;
        var border_right = parseInt(baseobj.css("borderRightWidth")) || 0;

        var tip_left = parseInt(tipobj.css("borderLeftWidth")) || 0;
        var tip_right = parseInt(tipobj.css("borderRightWidth")) || 0;
        var tip_top = parseInt(tipobj.css("borderTopWidth")) || 0;
        var tip_bottom = parseInt(tipobj.css("borderBottomWidth")) || 0;

        var oleft = otop = 0;
        switch (htype) {
            case "left":
                oleft = obox.left;
                oleft = mode == "content" ? oleft - tip_left + border_left : oleft;
                oleft = $.browsers.isIE6 ? oleft - 2 : oleft;
                break;
            case "right":
                oleft = obox.right - tipobj.width() - tip_left - tip_right;
                oleft = mode == "content" ? oleft + tip_left - border_right : oleft;
                oleft = $.browsers.isIE6 ? oleft - 2 : oleft;
                break;
            case "out_left":
                oleft = obox.left - tipobj.width() - tip_left - tip_right;
                oleft = mode == "content" ? oleft + tip_left + border_left : oleft;
                oleft = $.browsers.isIE6 ? oleft - 2 : oleft;
                break;
            case "out_right":
                oleft = obox.right;
                oleft = mode == "content" ? oleft - tip_left - border_right : oleft;
                oleft = $.browsers.isIE6 ? oleft - 2 : oleft;
                break;
            case "center":
            default:
                oleft = obox.left + (obox.width - tipobj.width()) / 2 - tip_left;
                break;
        }
        switch (vtype) {
            case "top":
                otop = obox.top;
                otop = mode == "content" ? otop - tip_top + border_top : otop;
                otop = $.browsers.isIE6 ? otop - 2 : otop;
                break;
            case "bottom":
                otop = obox.bottom - tipobj.height() - tip_top - tip_bottom;
                otop = mode == "content" ? otop + tip_top - border_bottom : otop;
                otop = $.browsers.isIE6 ? otop - 2 : otop;
                break;
            case "out_top":
                otop = obox.top - tipobj.height() - tip_top - tip_bottom;
                otop = mode == "content" ? otop + tip_top + border_top : otop;
                otop = $.browsers.isIE6 ? otop - 2 : otop;
                break;
            case "out_bottom":
                otop = obox.bottom;
                otop = mode == "content" ? otop - tip_top - border_bottom : otop;
                otop = $.browsers.isIE6 ? otop - 2 : otop;
                break;
            case "middle":
            default:
                otop = obox.top + (obox.height - tipobj.height()) / 2 - tip_top;
                break;
        }
        return { "left": oleft + scrollLeft, "top": otop + scrollTop };
    }

    function edialog(sets) {
        var title = sets.title || "";
        var boxwidth = sets.width == undefined ? 360 : parseInt(sets.width);
        var boxheight = sets.height == undefined ? 250 : parseInt(sets.height);
        var closepic = sets.closepic;
        var content = sets.content;

        var boxid = 'cczw_dialog_id';
        var boxborder = 10;

        //总box
        var mbox = $("<div id='" + boxid + "'></div>");
        mbox.css({ "width": boxwidth + "px", "height": boxheight + "px", "zIndex": 100 });
        //透明背景
        var alphabox = $("<div></div>").css({ "position": "absolute", "top": "0px", "left": "0px", "width": boxwidth + "px", "height": boxheight + "px", "backgroundColor": "#333", "opacity": "0.2" }).appendTo(mbox);
        //mainbox
        var mainbox = $("<div></div>").css({ "position": "absolute", "top": boxborder + "px", "left": boxborder + "px", "width": (boxwidth - boxborder * 2) + "px", "height": (boxheight - boxborder * 2) + "px", "backgroundColor": "#fff" }).appendTo(mbox);

        //titlebar
        var mtitlebar = $("<dl></dl>").css({ "margin": "0px", "height": "37px", "line-height": "37px", "background": "#F2F2F2", "border-bottom": "1px solid #dedede" }).appendTo(mainbox);
        //title
        var title = $("<dt>" + title + "</dt>").css({ "float": "left", "margin-left": "10px", "font-size": "14px", "color": "#f33b3b" }).appendTo(mtitlebar);
        //closebtn
        var btnhtml = closepic ? "<img src='" + closepic + "' stlye=‘border:#none’ />" : "×";
        var closebtn = $("<dd>" + btnhtml + "</dd>").css({ "float": "right", "margin-top": "5px", "margin-right": "5px", "cursor": "pointer" }).bind("click", mbox, function (event) {
            event.data.remove();
        }).appendTo(mtitlebar);

        //内容部分
        var mcontent = $("<div></div>").appendTo(mainbox);
        if (content) { mcontent.append(content); }

        mbox.appendTo("body");

        return { box: mbox, title: title, content: mcontent };
    }

    var eventFunction = [];
    /**************************************扩展jQuery对象本身***************************************/
    jQuery.extend({
        browsers: {
            isIE: isIE, /**排除搜狗和遨游和qq浏览器，360就不用排除了基本根ie一样，所以就当ie了，方便统一兼容*/
            isIE6: isIE6,
            isFirefox: isFirefox,
            isOpera: isOpera,
            isSafari: isSafari,
            isChrome: isChrome,
            isQQ: isQQ,
            is360: is360,
            isSogou: isSogou,
            isMaxthon: isMaxthon,
            isMaxthonHightModen: isMaxthonHightModen,
            isIECore: isIECore,
            isWebkitCore: isWebkitCore,
            basedomain: document.domain,
            getMainDomain: getUrlMainDomain
        },
        /**小图标*/
        icons: ["●", "○", "□", "■", "◆", "◇", "▲", "?", "▼", "?", "△", "?", "?", "▽", "★", "☆", "?", "?", "?", "?", "→", "←", "↑", "↓", "?", "↘", "↖", "↗", "↙", "♁", "⊙", "⊿", "?", "⊥", "?", "÷", "×", "=", "+"],
        /**获取窗口的大小信息*/
        getWinBox: function () {
            var mbrower = { width: 0, height: 0 };
            var bodybox;
            if ($.browser.msie) {
                mbrower.height = $.support.boxModel ? document.documentElement.clientHeight : document.body.clientHeight;
                mbrower.width = $.support.boxModel ? document.documentElement.clientWidth : document.body.clientWidth;
                var box = $.support.boxModel ? document.body.getBoundingClientRect() : document.documentElement.getBoundingClientRect();
            }
            else {
                mbrower.width = self.innerWidth;
                mbrower.height = self.innerHeight;
                mbody = document.documentElement.getBoundingClientRect();
            }
            mbody = ($.support.boxModel && $.browser.msie) ? document.body : document.documentElement;
            return { browser: mbrower, body: $(mbody).getBox() };
        },
        //cookie操作类
        cookie: {
            get: function getCookie(key) {
                var tmp = document.cookie.match((new RegExp(key + '=[a-zA-Z0-9.()=|%/_]+($|;)', 'm')));
                if (!tmp || !tmp[0]) return "";
                else return decodeURI(tmp[0].substring(key.length + 1, tmp[0].length).replace(';', '')) || "";
            },
            set: function setCookie(name, value) {
                var argv = arguments;
                var argc = argv.length;
                var expires = (argc > 2) ? argv[2] : null;
                var path = (argc > 3) ? argv[3] : null;
                var domain = (argc > 4) ? argv[4] : null;
                var secure = (argc > 5) ? argv[5] : false;
                document.cookie = name + "=" + escape(value) +
				((expires == null) ? "" : ("; expires=" + expires.toUTCString())) +
				((path == null) ? "" : ("; path=" + path)) +
				((domain == null) ? "" : ("; domain=" + domain)) +
				((secure == true) ? "; secure" : "");
            }
        },
        /**
        *说明:对话框
        @param setting json格式参数 详情如下:
        {
        title: 		标题，
        width: 		dialog宽度,
        height: 	dialog的高度
        closepic:   关闭按钮图片地址，默认x
        content:    content内容部分的jquery dom节点
        }
        */
        edialog: function (setting) {
            setting = setting ? setting : {};
            return edialog(setting);
        },
        
        addLoadFunc: function (func) {
            if (typeof (func) == 'function') {
                eventFunction[eventFunction.length] = func;
            }
        },
        initPage:function() {
            if (eventFunction.length > 0) {
                for (var i = 0; i < eventFunction.length; i++) {
                    var func = eventFunction[i];
                    func();
                }
            }
        }
    });
    /*********************************扩展 jQuery 元素集来提供新的方法*****************************/
    jQuery.fn.extend({
        /**获取当前元素的盒模型信息，left，top,width,height,right,bottom， 不同于jquery原生计算函数,边框被计算在内，*/
        getBox: function () {
            var box = $(this).get(0).getBoundingClientRect();
            var mbox = {};
            mbox.left = box.left;
            mbox.right = box.right;
            mbox.top = box.top;
            mbox.bottom = box.bottom;
            mbox.width = box.right - box.left;
            mbox.height = box.bottom - box.top;
            return mbox;
        },
        /** ajax tabs
        * @param setting  json形式的参数 详情如下:
        {
        showidx	:			//初始化显示的tab索引   -1的时候不做任何操作
        onClass				//当前tab的样式
        offClass			//其它tab的样式
        loading				//ajax的loading等待html
        rollback 			//鼠标离开后是否回滚，默认false, （当前检测只是鼠标如果在当前selector的父容器区域，不是很通用）
        }
        */
        tabs: function (setting) {
            setting = setting ? setting : {};
            setting.selector = this;
            tabs(setting);
        },

        /**
        *	浮动
        * @param setting  json形式的参数 详情如下:
        {
        htype  			水平浮动类型:left,center(默认),right, self(当前元素的水平位置值),fixed（保持在当前的页面布局水平位置）
        vtype   			垂直浮动类型:top,middle(默认),bottom, self(当前元素的水平位置值)，fixed（保持在当前的页面布局垂直位置）
        offsetx			附加的水平偏移量  默认0
        offsety			附加的垂直偏移量  默认0
        condition			浮动条件always(默认)总是浮动,over当该元素将被卷起时浮动
        }
        */
        efloat: function (setting) {
            setting = setting ? setting : {};
            setting.selector = this;
            efloat(setting);
        },
        /**
        *	提示
        * @param setting  json形式的参数 详情如下:
        {
        htype  			水平浮动类型:left,center(默认),right
        vtype   			垂直浮动类型:top,middle(默认),bottom
        info:				显示的内容
        dataurl:			ajax内容获取地址	
        loadonce:			内容是否只自动加载一次 默认true		
        condition			over(默认)，click点击
        classname     		提示框的样式
        moden				对齐模式content依据内容区域对齐（默认），border依据边框对齐
        hasbar				是否包含默认的toolbar 关闭按钮
        keep				是否根据滚动和窗口改变实时刷新，默认false，如果根元素不是浮动元素，请不要设置该项
        title				title内容
        }
        */
        tips: function (setting) {
            setting = setting ? setting : {};
            setting.selector = this;
            tips(setting);
        },
        getStyle: function (name) {
            var obj = $(this)[0];
            if (obj.style[name])
                return obj.style[name];
            else if (obj.currentStyle)
                return obj.currentStyle[name];
            else if (document.defaultView && document.defaultView.getComputedStyle) {
                name = name.replace(/([A-Z])/g, "-$1").toLowerCase();
                var s = document.defaultView.getComputedStyle(obj, "");
                return s && s.getPropertyValue(name);
            }
            else return null;
        },
        getPosition : function(){
            var e = $(this)[0];
            var t=e.offsetTop; 
            var l=e.offsetLeft; 
            while(e=e.offsetParent){
            if($(e).getStyle('position') == 'absolute' || $(e).getStyle('position') == 'relative') 
            break;
            t+=e.offsetTop;
            l+=e.offsetLeft;
            } 
            return {x:l, y:t};
        }
		
    });

})(jQuery);

/**
*jquery ui plugin  applay for  msc  only 非通用 依托于jqueryEui.js
*by awen
*email awen1983@live.cn
*/
(function ($) {

    /**
    *说明：对话框
    @param  types  对话框类型 login,
    */
    function dialog(types,callback) {
        var closebtnpic = jieqi_res_url + "/v3/images/close.jpg";
        var title = "";
        var width = 0;
        var height = 0;

        switch (types) {
            case "login":
                title = "欢迎回家";
                width = 455;
                height = 260;
                break;
            case "logout":
                title = "注销";
                width = 355;
                height = 150;
                break;
            case "report":
                title = "章节有错？更新慢了？我要报告";
                width = 455;
                height = 260;
                break;
        }
        var edialog = $.edialog({ title: title, closepic: closebtnpic, width: width, height: height });
        edialog.box.efloat();
        //之所以分开写两遍是为了方便对话框动态控制本对话框
        var content = null;
        switch (types) {
            case "login":
                logindialog(edialog);
                break;
            case "logout":
                logoutdialog(edialog);
                break;
            case "report":
                reportdialog(edialog);
                break;
        }
        //////funcs
        //登录
        function logindialog(instance) {
            var logurl = memberurl + 'loginajax.php';
            var regurl = memberurl + 'register.php';
            var getpassurl = memberurl + 'getpass.php';
            var wrap = $("<div></div>").css({ "position": "relative", "padding-top": "10px", "color": "#6E6E6E", "font-size": "12px", "width": "429px" });
            var left = $("<div></div>").css({ "width": "240px", "float": "left", "padding-left": "30px" });
            var right = $("<div></div>").css({ "width": "135px", "float": "left", "text-align": "left", "padding-top": "5px", "border-left": "1px dotted #ccc", "padding-left": "20px" }).html("<span style='color:#6E6E6E;'>还没有账号？</span><br><a id='msregid'  href='" + regurl + "' style='background:url(" + jieqi_res_url + "/v3/images/freeregist.gif) no-repeat; float:left; margin-top:5px;width:90px; height:30px; display:block;'> </a><br><br><a href='" + getpassurl + "' style=' float:left;color:#2C629E;clear:both'>忘记密码？</a>" +
            //"<br><br><br><div style='color:#6E6E6E'>用合作网站账号登陆：</div><div>" +
            //"<a title=\"用qq帐号登录\" href=\""+memberurl+"/app/qq/login.php\"><img style='border:none;' src=\"" + jieqi_res_url + "/v3/images/qq_mini.gif\"></a>" +
            //"<a style='margin-left:8px;' title=\"用sina微博登录\" href=\""+memberurl+"/app/sinav2/login.php\"><img style='border:none;' src=\"" + jieqi_res_url + "/v3/images/sina_mini.gif\"></a>" +
            //"<a style='margin-left:8px;' title=\"用淘宝帐号登录\" href=\""+memberurl+"/app/taobao/login.php\"><img style='border:none;' src=\"" + jieqi_res_url + "/v3/images/taobao_mini.gif\"></a>" +
            //"<a style='margin-left:8px;' title=\"用豆瓣帐号登录\" href=\""+memberurl+"/app/douban/login.php\"><img style='border:none;' src=\"" + jieqi_res_url + "/v3/images/douban_mini.gif\"></a>" +
            //"</div>"+
                "");


            var _div_1 = $("<div></div>").css({ "width": "220px", "float": "left", "text-align": "left", "height": "50px", "font-size": "12px", "line-height": "25px" }).html("用户名：<br>").appendTo(left);
            var _div_2 = $("<div></div>").css({ "width": "220px", "padding-top": "10px", "float": "left", "text-align": "left", "height": "50px", "font-size": "12px", "line-height": "25px" }).html("密<span style=color:#fff>__</span>码：<br>").appendTo(left);
            var _div_3 = $("<div></div>").css({ "width": "220px", "float": "left", "height": "30px", "padding-top": "5px" }).html("<input type=checkbox name=cookietime id=cookietime value=315360000 checked=checked>记住我(下次自动登录)").appendTo(left);
            var _div_4 = $("<div></div>").css({ "width": "220px", "float": "left", "height": "32px", "line-height": "32px" }).appendTo(left);

            var _inputname = $("<input/>").css({ "height": "20px", "line-height": "20px", "width": "180px" }).attr({ "name": "username" }).appendTo(_div_1);
            var _inputpass = $("<input/>").css({ "height": "20px", "line-height": "20px", "width": "180px" }).attr({ "name": "password", "type": "password" }).appendTo(_div_2);
            var _a = $("<a></a>").css({ "margin-left": "23px", "color": "#2c629e", "text-decoration": "none" }).attr("href", getpassurl).appendTo(_div_3);
            var _btna = $("<div></div>").css({ "float": "left", "width": "90px", "height": "30px", "cursor": "pointer", "color": "#CE4300", "font-size": "14px", "font-weight": "bold", "background": "url(" + jieqi_res_url + "/v3/images/lilogin.gif)" })
                .bind("click", function (event) {
                    var host = document.location.hostname;

                    var pos = host.indexOf('.');
                    var host2 = host.substr(pos + 1);
                    var host_home = 'home.' + host2;

                    if (_inputname.val() == "" || _inputpass.val() == "") {
                        alert("用户名或者密码不能为空！");
                        return false;
                    } else {
                        var url = logurl;
                        var data = { "username": _inputname.val(), "password": _inputpass.val(), "usecookie": 0, "action": "login" };
                        var o = $("#cookietime");
                        if (o && o.is(":checked"))
                            data["usecookie"] = o.val();

                        $.ajax({
                            type: 'get',
                            url: url,
                            dataType: 'jsonp',
                            data: data,
                            jsonpCallback: 'login_callback_login',
                            success: function (data) {
                                if (data) {
                                    if (data.islogin) {
                                        var pagea = $("<a></a>").css({ "text-align": "center", "font-size": "12px", "display": "block", "height": "100px", "line-height": "100px" }).html("登陆成功…").bind("click", function () {
                                            instance.box.remove();
                                        });
                                        instance.title.html("操作成功");
                                        instance.content.empty();
                                        instance.content.append(pagea);
                                        $('#top_login_area').html(data.html);
                                        $('#article_page_login').hide();
                                        $('#article_page_logout').show();
                                        setTimeout(function () {
                                            instance.box.remove();
                                        }, 1000);
                                        if(typeof(callback)=='function'){
                                        	callback(data);
                                        }
                                    } else if (data.msg) {
                                        alert(data.msg);
                                    } else {
                                        alert("登陆失败,用户名或密码错误！");
                                    }

                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                alert('登陆失败');
                            }
                        });

                    }
                }).appendTo(_div_4);

            var _zhucea = $("<a></a>").attr({ "href": regurl, "title": "" }).css({ "float": "left", "padding-left": "20px", "color": "#4ca703", "text-decoration": "none" }).appendTo(_div_4);
            var _line = $("<span></span>").html("").css({ "float": "left", "padding-left": "5px", "padding-right": "5px" }).appendTo(_div_4);
            var _movea = $("<a></a>").css({ "float": "left", "color": "#666666", "text-decoration": "none" }).attr({ "title": "", "href": "#" }).html("").appendTo(_div_4);

            wrap.append(left);
            wrap.append(right);

            instance.content.append(wrap);
        }

        //登录
        function logoutdialog(instance) {
            var logurl = memberurl + 'loginajax.php';

            var url = logurl;
            $.ajax({
                type: 'get',
                url: url,
                dataType: 'jsonp',
                data: { "action": 'logout' },
                jsonpCallback: 'login_callback_logout',
                success: function (data) {
                    if (data) {
                        if (data.html) {
                            var pagea = $("<a></a>").css({ "text-align": "center", "font-size": "12px", "display": "block", "height": "100px", "line-height": "100px" })
                            .html("注销成功…").bind("click", function () {
                                instance.box.remove();
                                window.location.reload();
                            });
                            instance.title.html("操作成功");
                            instance.content.empty();
                            instance.content.append(pagea);
                            $('#top_login_area').html(data.html);
                            $('#article_page_login').show();
                            $('#article_page_logout').hide();

                            setTimeout(function () {
                                instance.box.remove();
                                window.location.reload();
                            }, 1000);

                            if(typeof(callback)=='function'){
                            	callback(data);
                            }
                        } else if (data.msg) {
                            alert(data.msg);
                        } else {
                            alert("注销失败");
                        }

                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('注销失败');
                }
            });

        }

        function reportdialog(instance) {
            var newmessageurl = memberurl + 'newmessagejsonp.php?do=submit';
            var getpassurl = '';
            var wrap = $("<div></div>").css({ "position": "relative", "padding-top": "10px", "color": "#6E6E6E", "font-size": "12px", "width": "429px" });
            var left = $("<div></div>").css({ "width": "auto", "float": "left", "padding-left": "30px" });



            var _div_1 = $("<div></div>").css({ "width": "auto", "text-align": "left", "height": "50px", "font-size": "12px", "line-height": "25px" }).html("标题：<br>").appendTo(left);
            var _div_2 = $("<div></div>").css({ "width": "auto", "padding-top": "10px", "float": "left", "text-align": "left", "height": "90px", "font-size": "12px", "line-height": "25px" }).html("内容：<br>").appendTo(left);
            var _div_4 = $("<div></div>").css({ "width": "auto", "float": "right", "height": "32px", "line-height": "32px" }).appendTo(left);

            var _inputname = $("<input id=\"report_title\"/>").css({ "height": "20px", "line-height": "20px", "width": "387px" ,"border":"1px solid #999"}).attr({ "name": "title" }).appendTo(_div_1);
            var _inputpass = $("<textarea id=\"report_content\"></textarea>").css({ "height": "54px", "line-height": "20px", "width": "387px", "border": "1px solid #999" }).attr({ "name": "content" }).appendTo(_div_2);
            var _inputch = $("<textarea id=\"report_content_hide\"></textarea>").css({ "display": "none" }).appendTo(_div_2);
            //var _a = $("<a></a>").css({ "margin-left": "23px", "color": "#2c629e", "text-decoration": "none" }).attr("href", getpassurl).appendTo(_div_3);
            
            var _btna = $("<div>确  定</div>").css({ "float": "left","cursor":"pointer","text-shadow":"0 1px 0 #fff", "border":"1px solid #cccccc","text-align":"center","width": "90px", "height": "30px", "color": "#CE4300", "font-size": "14px", "font-weight": "bold", "background": "#e6e6e6" })
                .bind("click", function (event) {
                    var host = document.location.hostname;

                    var pos = host.indexOf('.');
                    var host2 = host.substr(pos + 1);
                    var host_home = 'home.' + host2;

                    if (_inputname.val() == "" || _inputpass.val() == "") {
                        alert("标题或者内容不能为空！");
                        return false;
                    } else {
                        var data = { "title": _inputname.val(), "content": _inputch.val()+_inputpass.val(), "tosys": "1", "action": "newmessage" };

                        $.ajax({
                            type: 'get',
                            url: newmessageurl,
                            dataType: 'jsonp',
                            data: data,
                            jsonpCallback: 'login_callback_login',
                            success: function (data) {
                                if (data.status==1) {
                                    alert("提交成功，感谢您的支持！");
                                    instance.box.remove();
                                } else if (data.msg) {
                                    alert(data.msg);
                                } else {
                                    alert("提交失败！");
                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                alert('提交失败,请先登陆！');
                            }
                        });

                    }
                }).appendTo(_div_4);

            //var _zhucea = $("<a></a>").attr({ "href": regurl, "title": "" }).css({ "float": "left", "padding-left": "20px", "color": "#4ca703", "text-decoration": "none" }).appendTo(_div_4);
            var _line = $("<span></span>").html("").css({ "float": "left", "padding-left": "5px", "padding-right": "5px" }).appendTo(_div_4);
            var _movea = $("<a></a>").css({ "float": "left", "color": "#666666", "text-decoration": "none" }).attr({ "title": "", "href": "#" }).html("").appendTo(_div_4);

            wrap.append(left);

            instance.content.append(wrap);
        }


    }

    /*********************************闭包*****************************/
    window.msc = $.extend(window.msc || {}, {
        dialog: dialog
    });
})(jQuery);

(function ($) {
    //浮动栏目
    var login = function login(url, callback) {
    	
    	//星期六、日不验证登陆,减轻服务器压力
    	if(article_id && typeof(chapter_id)!='undefined'/* && new Date().getDay()==0||new Date().getDay()==6*/){
    		var html = '<a href="'+memberurl +'userdetail.php" title="用户中心" style="margin-right:5px" target="_blank" rel="nofollow">用户中心</a>'+
    		'<a href="'+memberurl +'/modules/article/bookcase.php" target="_blank" style="margin-right:5px" rel="nofollow">我的书架</a>'+
    		'<em class="pipe">┊</em>';
    		$('#top_login_area').html(html);
    		return;
    	}
    	
        $.ajax({
            type: 'get',
            url: url,
            dataType: 'jsonp',
            success: function (data) {

                if (data && data.islogin) {
                    msc.userislogin = true;
                }
                if (typeof (callback) == 'function')
                    callback(data);
                else {
                    if (data) {
                        if (data.html) {
                            $('#top_login_area').html(data.html);
                        } else if (data.msg)
                            $('#top_login_area').html(data.msg);

                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //function(){alert(this.response.replace(/<br[^<>]*>/g,'\n'));}
                //alert('推荐失败，请检查是否登陆！')
            }
        });

    }

    var logout = function login(url) {
        if (memberurl) {
            msc.dialog('logout');
            return false;
        }
    }
    window.msc = $.extend(window.msc || {}, {
        login: login,
        logout: logout,
        userislogin : false
    });
})(jQuery);


	


(function ($) {
    var DropMenus = {
        collection: [], init: function (a) {
            if (this.area = document.getElementById(a)) this.find(), this.bind()
        }
	    , find: function () {
	        for (var a = this.area.getElementsByTagName("div"), b = 0;
		    b < a.length;
		    b++) {
	            var c = a[b];
	            if (c.className && "dropmenu" == c.className) {
	                for (var d = c, f = null, e = null, c = c.getElementsByTagName("div"),
				    g = 0;
				    g < c.length;
				    g++) {
	                    var h = c[g];
	                    if (h.className && ("handle" == h.className && (f = h), "panel" == h.className)) {
	                        e = h;
	                        break
	                    }
	                }
	                f && e && this.collection.push({
	                    dom: d, handle: f, panel: e, status: "hide"
	                })
	            }
	        }
	    }
	    , bind: function () {
	        function a(b) {
	            return "DIV" == b.tagName && b.className && "handle" == b.className || !b ? b : a(b.parentNode)
	        }
	        for (var b = this, c = 0; c < this.collection.length; c++) {
	            var d = this.collection[c];
	            d.dom.setAttribute("index", c);
	            this._addEvent(d.handle, "click", function (c) {
	                b._cancleBubble(c);
	                c = (this == window ? a(event.srcElement) : this).parentNode;
	                c = parseInt(c.getAttribute("index"));
	                b.hideother(c);
	                b.toggle(c)
	            });
	            this._addEvent(d.dom, "click", function (a) {
	               // b._cancleBubble(a)
	            });
	            this._addEvent(document.body, "click", function () {
	                //b.hideall()
	            })
	        }
	    }
	    , _addEvent: function (a, b, c) {
	        if (window.addEventListener) if ("mouseenter" == b || "mouseleave" == b) {
	            var d = function (a) {
	                var b = a.currentTarget, g = a.relatedTarget, d;
	                try {
	                    d = b.contains ? b != g && b.contains(g) : !!(b.compareDocumentPosition(g) & 16)
	                }
	                catch (j) { } !d && b != g && c.call(a.currentTarget, a)
	            };
	            "mouseenter" == b ? a.addEventListener("mouseover",
			    d, !1) : a.addEventListener("mouseout", d, !1)
	        }
	        else a.addEventListener(b, c, !1);
	        else window.attachEvent && a.attachEvent("on" + b, c)
	    }
	    , _cancleBubble: function (a) {
	        a = window.event || a;
	        a.preventDefault ? (a.preventDefault(), a.stopPropagation()) : (a.cancelBubble = !0, a.returnValue = !1)
	    }
	    , show: function (a) {
	        if ((a = this.collection[a]) && "hide" == a.status) {
	            a.status = "show";
	            var b = a.dom.getElementsByTagName("iframe")[0];
	            if (!b) b = document.createElement("iframe"), b.className = "mask", b.frameBorder = "0", b.scrolling = "no", a.dom.appendChild(b);
	            b.style.width = a.panel.offsetWidth + "px";
	            b.style.height = a.panel.offsetHeight + "px";
	            a.dom.className = "dropmenu dropmenu_expand"
	        }
	    }
	    , hide: function (a) {
	        if ((a = this.collection[a]) && "show" == a.status) a.status = "hide", a.dom.className = "dropmenu"
	    }
	    , toggle: function (a) {
	        if (this.collection[a]) {
	            if ("show" == this.collection[a].status) {
	                this.hide(a);
	            }
	            else {
	                this.show(a);
	            }
	        }
	    }
	    , hideother: function (a) {
	        for (var b = 0; b < this.collection.length; b++) a != b && this.hide(b)
	    }
	    , hideall: function () {
	        for (var a = 0; a < this.collection.length; a++) this.hide(a)
	    }
    }
    window.msc = $.extend(window.msc || {}, {
        DropMenus : DropMenus
    });

})(jQuery);
$(function () {
    if (!$('#watching').is('.pageWatching')) {
        msc.DropMenus.init('watching');
    }
});

(function ($) {
    var History = {
        inited: false,
        historyname: '_history1',
        ArrayDel: function (_array, n) {  //n表示第几项，从0开始算起。
            //prototype为对象原型，注意这里为对象增加自定义方法的方法。
            if (n < 0)  //如果n<0，则不进行任何操作。
                return _array;
            else
                return _array.slice(0, n).concat(_array.slice(n + 1, _array.length));
            /*
            concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
       　　　　　　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
      　　　　　　组成的新数组，这中间，刚好少了第n项。
            slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
            */
        },
        add: function (atitle, title, article_id, chapter_id, uri, next) {
            if (!chapter_id || chapter_id == "0") return;
            stringCookie = Cookie.Get(this.historyname);
            var stringHistory = stringCookie && "" != stringCookie ? stringCookie : "{\"" + this.historyname + "\":[]}";
            var json = JSON.parse(stringHistory);
            var e = { "atitle": atitle, "title": title, "article_id": article_id, "chapter_id": chapter_id, "uri": uri, "next": next };
            var history = json[this.historyname];
            if (history) {
                for (i = 0; i < history.length; i++) {
                    if (history[i]['article_id'] == article_id) {
                        json[this.historyname] = this.ArrayDel(json[this.historyname], i);
                        break;
                    }
                }
                if (history.length > 5) {
                    for (i = 0; i < history.length - 5; i++) {
                        json[this.historyname] = this.ArrayDel(json[this.historyname], i);
                    }
                }
            }
            json[this.historyname].push(e); //添加一个新的记录
            Cookie.Set(this.historyname, JSON.stringify(json), 3600 * 24 * 30);

            if (chapter_id) {
                chapternum = Cookie.Get('chapternum');
                chapternumstr = Cookie.Get('chapternumstr');

                if (chapternum) chapternum = parseInt(chapternum, 10);
                else chapternum = 0;
                if (chapternum > 15) {
                    Cookie.Set('chapternumstr', '', 3600 * 24 * 30);
                } else {
                    var addc = true;
                    if (!chapternumstr) {
                        chapternumstr = ',' + chapter_id + ',';
                        chapternum = 0;
                    }
                    else {
                        if (chapternumstr.indexOf(',' + chapter_id + ',') >= 0) {
                            addc = false;
                        }
                        else {
                            chapternumstr += chapter_id + ',';
                        }
                    }
                    if (addc) {
                        chapternum += 1;
                        Cookie.Set('chapternumstr', chapternumstr, 3600 * 24 * 30);
                        Cookie.Set('chapternum', chapternum, 3600 * 24 * 30);
                    }
                }
            }
        },

        chapterlen: function () {
            chapternum = Cookie.Get('chapternum');
            if (chapternum) chapternum = parseInt(chapternum, 10);
            else chapternum = 0;
            return chapternum;
        },
        length: function () {
            var stringCookie = Cookie.Get(this.historyname);
            var historyJSON = stringCookie && "" != stringCookie ? stringCookie : "{\"" + this.historyname + "\":[]}";
            var json = JSON.parse(historyJSON);
            return json[this.historyname].length;
        },
        clear: function () {
            Cookie.Set(this.historyname, '');
            this.display();
        },
        del: function (i) {
            var stringCookie = Cookie.Get(this.historyname);
            var historyJSON = stringCookie && "" != stringCookie ? stringCookie : "{\"" + this.historyname + "\":[]}";
            var json = JSON.parse(historyJSON);
            json[this.historyname] = this.ArrayDel(json[this.historyname], i);
            Cookie.Set(this.historyname, JSON.stringify(json), 3600 * 24 * 30);
            this.display();
        },
        //显示历史记录
        display: function () {
            if (!document.getElementById('watching')) return;
            var showlist_div = document.getElementById('showlist');
            var showlist_ul = document.getElementById('showlist_ul');
            var showlist_recTip = $('.recTip', showlist_div)[0];
            showlist_recTip.style.display = 'none';
            var showlist_loading = $('.loading', showlist_div)[0];
            var stringCookie = Cookie.Get(this.historyname);
            var historyJSON = stringCookie && "" != stringCookie ? stringCookie : "{\"" + this.historyname + "\":[]}";
            try {
                var json = JSON.parse(historyJSON);
            }
            catch (e) {
                return;
            }
            if (json[this.historyname] == null || json[this.historyname].length == 0) {
                showlist_div.className = 'recordnull';
                showlist_loading.style.display = 'none';
                showlist_ul.style.display = 'none';
                document.getElementById('showlist_recordnull').style.display = 'block';
                return;
            } else {
                showlist_div.className = 'list';
                showlist_ul.style.display = 'none';
                showlist_loading.style.display = 'block';
                document.getElementById('showlist_recordnull').style.display = 'none';
            }
            var displayNum = 6;
            history_html = '';


            for (i = json[this.historyname].length - 1; i >= 0; i--) {
                if (i == json[this.historyname].length - 1)
                    history_html += this.addLi(i, json[this.historyname][i]['atitle'], json[this.historyname][i]['title'], json[this.historyname][i]['uri'], json[this.historyname][i]['next']);
                else
                    history_html += this.addLi(i, json[this.historyname][i]['atitle'], json[this.historyname][i]['title'], json[this.historyname][i]['uri'], '');

                displayNum--;
                if (displayNum == 0) { break; }
            }
            document.getElementById('playlist_count').innerHTML = json[this.historyname].length;
            showlist_loading.style.display = 'none';
            showlist_ul.innerHTML = history_html;
            showlist_ul.style.display = 'block';
        },

        initpanel: function () {
            var html = '<ul class="tab" id="watch_tabs">' +
                       '<li class="current" data-for="#showlist" _to="showlist"><a href="javascript:;">阅读历史</a></li>' +
                       '<li data-for="#watchlist" _to="watchlist"><a href="javascript:;">推荐小说</a></li> ' +
                   '</ul>  ' +
                   '<div class="list" id="watchlist" style="display:none;">' +
                   '<ul id="watchlist_ul">' +
                   '</ul></div>  ' +
                    '<div class="list" id="showlist" style="overflow-y:hidden;">' +
                   '     <div class="loading" id="watch_loading"><div class="ico__loading_16"></div></div>' +
                   '     <div class="recTip watchtip" id="watch_rectip" style="display:none;"><a data-command="dologin" class="blu">登录</a>后将为您永久保存播放记录，还能得成长值拿红包哦，赶快<a href="#" target="_blank" class="blu">注册</a>吧。<i title="历史记录">&nbsp;</i><a class="del" data-command="delTip" title="删除">×</a></div>' +
                   '     <ul id="showlist_ul" style="display:none;"></ul>' +
                   '     <div id="showlist_recordnull" style="overflow-y:hidden;display:none;">' +
                   '         <span>您最近没有阅读过小说</span><br />' +
                   '         <span>精彩小说推荐</span>' +
                   '         <ul id="recordnull_ul"> 	' +
                   '         </ul>' +
                   '     </div>' +
                   ' </div>' +
                   ' <div id="recordaction" class="action" style="display:none;"> 		' +
                   '     <!--<a id="recordmore" class="extand" href="#" target="_blank">更多</a>--> 		' +
                   '     <a id="clearlist" class="clearlist" href="javascript:;" onclick="msc.History.clear();return false;">清空全部记录</a> ' +
                   ' </div> ' +
                   ' <div class="om" id="playlist_om"> 	<span class="data">历史记录中有<span class="num" id="playlist_count">0</span>本阅读过的小说</span><span id="om_play" class="play"> 	</span> </div>';


            var mini_panel = $('#mini_panel');
            if (mini_panel.length == 0) return;
            mini_panel.html(html);

            $('#watch_tabs').tabs({ onClass: 'current', type: 'click' });
            $('.recTip .del').bind('click', function () {
                //$(this).parent().slideUp("fast");
                $(this).parent().fadeOut("slow");
            })


            $.ajax({
                url: siteurl + 'history.json',
                type: "get",
                dataType: "jsonp",
                jsonpCallback: "success_jsonpCallback", //callback的function名称  
                error: function () { },
                success: function (data) {
                    if (data) {
                        if (data.articlerows) {
                            var recordnull_ul = '';var watchlist_ul = '';
                            $.each(data.articlerows, function (i, row) {
                                var tmp = '<li class="history_vote' + (i + 1) + '"><em>' + (i + 1) + '</em>&nbsp;&nbsp;<a class="c_title" href="' + row.articleurl + '" title="' + row.articlename + '" target="_blank">' + row.articlename + '</a></li>';
                                watchlist_ul += tmp;
                                if (i <= 5)
                                    recordnull_ul += tmp;
                            });
                            $('#watchlist_ul').html(watchlist_ul);
                            $('#recordnull_ul').html(recordnull_ul);
                            if ($('#chapter_web_hot').length > 0) {
                                $('#chapter_web_hot ul').html("" + watchlist_ul + '<div class="clear"></div> ');
                            }
                        }
                    }
                }
            });
        },

        //添加一个li元素
        addLi: function (i, arttitle, title, uri, next, pid) {
            if (next == '')
                var li_str = '<span class="c_stat">' + arttitle + '</span><li id="show_history_' + i + '" class=""> 			<a class="c_title" href="' + uri + '" title="' + title + '" target="_blank">' + title + '</a> 			<span class="c_stat">已在电脑看过<span class="c_action"><a href="' + uri + '" target="_blank">继续阅读</a></span></span> 			<span class="c_close" onclick="msc.History.del(' + i + ');return false;"><em>删除</em></span> 			<span class="c_split"><em>分割线</em></span> 		</li> ';
            else
                var li_str = '<span class="c_stat">' + arttitle + '</span><li id="show_history_' + i + '" class=""> 			<a class="c_title" href="' + uri + '" title="' + title + '" target="_blank">' + title + '</a> 			<span class="c_stat">已在电脑看过<span class="c_action"><a href="' + uri + '" target="_blank">继续阅读</a><span>|</span><a href="' + next + '" target="_blank">下一章</a></span></span> 			<span class="c_close" onclick="msc.History.del(' + i + ');return false;"><em>删除</em></span> 			<span class="c_split"><em>分割线</em></span> 		</li> ';
            return li_str;
        },

        init: function (modulename, articlename, chaptername, articleid, chapterid, nextpage) {
            if (this.inited) return;
            this.inited = true;
            if (typeof modulename == 'undefined' || !modulename) modulename = 'article';
            this.historyname = modulename + '_history2';
            this.initpanel();
            if (typeof articleid != 'undefined' && articleid) {
                var wu_urlName = window.location.href; //必须采用href获取路径，如果采用window.location获取url的话，后面就会报错
                // var wu_nopar = wu_url.split("?")[0].split("/");
                //var wu_urlName = wu_nopar[wu_nopar.length - 1]; //文件名 
                this.add(articlename, chaptername, articleid, chapterid, wu_urlName, nextpage);
                this.display();
            }
            else {
                this.display();
            }
        }
    }
    window.msc = $.extend(window.msc || {}, {
        History: History
    });
})(jQuery);

var module_name = article_id = chapter_id = next_page = articlename = chaptername = null;
$(function () {
    msc.History.init(module_name,articlename,chaptername, article_id , chapter_id , next_page );
});


/**
*jquery ui plugin  applay for  msc  only 非通用 依托于jqueryEui.js
*by awen
*email awen1983@live.cn
*/
(function ($) {
    if (!window.showads) window.showads = function () { };
    function CopyInBoard(share_input) {
        document.getElementById(share_input).select();
        window.clipboardData.setData('text', document.getElementById(share_input).value)
        alert('网址复制完成，您可以通过QQ、MSN、邮件等方式发送给您的好友，共同分享阅读的快乐！');
    }

    function GetRandomNum() {
        var Rand = Math.random();
        return (Math.round(Rand * 1000));
    }
    function addLoadEvent(func) {
        $(func);
    }

    function LoadJs(url, success) {
        jQuery.getScript(url, success);
    }

    function IncludeJS(fileUrl, source) {
        if (source != null || fileUrl) {
            var oHead = document.getElementsByTagName('HEAD').item(0);
            var oScript = document.createElement("script");
            oScript.language = "javascript";
            oScript.type = "text/javascript";
            //oScript.id = sId;
            if (source != null) {
                oScript.defer = true;
                oScript.text = source;
            } else {
                oScript.src = fileUrl;
            }
            oHead.appendChild(oScript);
        }
    }

    //加入收藏函数
    function bookmarkit(siteurl1, sitename1) {
        if (document.all) {
            try
          { window.external.addFavorite(siteurl1, sitename1); }
            catch (e)
          { alert("您的浏览器不支持此功能。您可以按 Ctrl+D 试一下。"); }
        }
        else if (window.sidebar) {
            try
          { window.sidebar.addPanel(sitename1, siteurl1, ""); }
            catch (e)
          { alert("您的浏览器不支持此功能。您可以按 Ctrl+D 试一下。"); }
        }
        else
        { alert("您的浏览器不支持此功能。您可以按 Ctrl+D 试一下。"); }
    }

    //设为首页函数
    function setHomepage(pageURL) {
        if (document.all) {
            document.body.style.behavior = 'url(#default#homepage)';
            document.body.setHomePage(pageURL);
        }
        else if (window.sidebar) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                }
                catch (e) {
                    alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true");
                }
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', pageURL);
        }
    }

    function KeyDown() {
        var event = document.all ? window.event : arguments[0];

        if (!event) return;
        if (event.keyCode == 37) document.location = preview_page;
        if (event.keyCode == 39) document.location = next_page;
        if (event.keyCode == 13) document.location = index_page;
    }

    /*********************************闭包*****************************/
    window.msc = $.extend(window.msc || {}, {
        CopyInBoard: CopyInBoard,
        IncludeJS: IncludeJS,
        bookmarkit: bookmarkit,
        setHomepage: setHomepage,
        KeyDown: KeyDown
    });
})(jQuery);

var Cookie = {
    Set: function () {
        var name = arguments[0], value = escape(arguments[1]),
                days = (arguments.length > 2) ? arguments[2] : 365,
                path = (arguments.length > 3) ? arguments[3] : "/";
        with (new Date()) {
            setDate(getDate() + days);
            days = toUTCString();
        }
        document.cookie = "{0}={1};expires={2};path={3}".format(name, value, days, path);
    },
    Get: function (key) {
        var returnValue = document.cookie.match(new RegExp("[\b\^;]?" + key + "=([^;]*)(?=;|\b|$)", "i"));
        return returnValue ? unescape(returnValue[1]) : returnValue;
    },
    Delete: function () {
        var name = arguments[0];
        document.cookie = name + "=1 ; expires=Fri, 31 Dec 1900 23:59:59 GMT;";
    }
}

function showBottomScript(pagetag, adpath, statname) {

}

function show_runme() { }
String.prototype.format = function () {
    var s = this;
    for (var i = 0, j = arguments.length; i < j; i++)
        s = s.replace("{" + (i) + "}", arguments[i]);
    return (s);
}




$(function () {
    //document.oncontextmenu = function (e) {
    //    return false;
    //}
   // document.onpaste = function (e) {
   //     return false;
    //}
    //document.oncopy = function (e) {
    //    return false;
    //}
    //document.oncut = function (e) {
   //     return false;
    //}
    //document.onselectstart = function (e) {
    //    return false;
    //}

//    if (typeof load_history != 'undefined' && load_history) {
    //        msc.IncludeJS(jieqi_res_url + "/v2/js/History.js");
//    }

//    if (typeof load_jiaThisButton != 'undefined' && load_jiaThisButton) {
        //$('body').append('<script type="text/javascript" id="bdshare_js" data="type=button&amp;uid=6448280" ></script>');
        //$('body').append('<script type="text/javascript" id="bdshell_js"></script>');
        //$("bdshare").data = '{\'url\':\'' + bds_config.bdUrl + '\'}';
        //$("bdshare").setAttribute("data", '{\'url\':\'' + bds_config.bdUrl + '\'}');
        //$('bdshell_js').src = "http://share.baidu.com/static/js/shell_v2.js?cdnversion=" + new Date().getHours();
        //$('bdshell_js').src = "http://v3.jiathis.com/code/jia.js?uid=892552";
        
//    }


});




function showads(adid) {
if (adid == 'pageheader1') {

/*谷歌横幅1 728x90(内页)*/
document.writeln("<!--article_pageheader1-->\r\n<div class=\"myad_wrap adcomp_gg\">\r\n<script type=\"text/javascript\"><!--\ngoogle_ad_client = \"ca-pub-9046430709022222\";\n/* 内页横幅1 */\ngoogle_ad_slot = \"3489730002\";\ngoogle_ad_width = 728;\ngoogle_ad_height = 90;\n//-->\n</script>\n<script type=\"text/javascript\"\nsrc=\"http://pagead2.googlesyndication.com/pagead/show_ads.js\">\n</script>\r\n</div>");
}
else if (adid == 'footerad') {

/*谷歌横幅2 728x90(内页)*/
document.writeln("<!--article_footerad-->\r\n<div class=\"myad_wrap adcomp_gg\">\r\n<script type=\"text/javascript\"><!--\ngoogle_ad_client = \"ca-pub-9046430709022222\";\n/* 内页横幅2 */\ngoogle_ad_slot = \"2749843332\";\ngoogle_ad_width = 728;\ngoogle_ad_height = 90;\n//-->\n</script>\n<script type=\"text/javascript\"\nsrc=\"http://pagead2.googlesyndication.com/pagead/show_ads.js\">\n</script>\r\n</div>");
}
}

function showstat() {
document.writeln("<!--default--><script>\nvar _hmt = _hmt || [];\n(function() {\n  var hm = document.createElement(\"script\");\n  hm.src = \"//hm.baidu.com/hm.js?726dafde1ca84e6b92a2710cddc694c1\";\n  var s = document.getElementsByTagName(\"script\")[0]; \n  s.parentNode.insertBefore(hm, s);\n})();\n</script>\n");
}


