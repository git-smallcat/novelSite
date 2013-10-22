var bdShare = bdShare || {};
(function() {
	var P = new Date().getTime();
	var N = new Date().getTime();
	var L = new Date().getTime();
	var F = window, V = document, X = V.body, R = V.documentElement, A = {}, G = "", I = V.title, h = [], O = "", C = {}, S = V
			.getElementById("bdshare_js").attributes.data, K = /MSIE 6.0/
			.test(navigator.userAgent), g = V.compatMode != "CSS1Compat", S = S.nodeValue
			.replace(/&amp;/g, "&").split("&")
			|| "";
	try {
		var Y = F.location || V.location;
		A.href = Y.href;
		A.search = Y.search;
		A.hash = Y.hash;
		A.protocol = Y.protocol;
		A.hostname = Y.hostname;
		A.pathname = Y.pathname;
		G = encodeURIComponent(A.href)
	} catch (f) {
		setTimeout(function() {
			var B = F.location || V.location;
			A.href = B.href;
			A.search = B.search;
			A.hash = B.hash;
			A.protocol = B.protocol;
			A.hostname = B.hostname;
			A.pathname = B.pathname;
			G = encodeURIComponent(A.href)
		}, 0)
	}
	for ( var c = S.length; c--;) {
		var b = S[c].split("=");
		h[b[0]] = b[1]
	}
	var Z = {
		bdPref : "bds_",
		bdNums : h.mini ? 7 : 15,
		bdMini : h.mini || false,
		bdType : h.type || "",
		bdLeft : h.pos || "right",
		bdTitle : "\u5206\u4eab\u5230",
		bdText : I,
		weiboText : "",
		bdMore : "\u66f4\u591a...",
		bdPopTitle : "\u5206\u4eab\u5230",
		bdImg : h.img || 0,
		bdImgW : 24,
		bdTop : 0,
		bdIds : "bdshare",
		bdIdsl : h.mini ? "bdshare_m" : "bdshare_l",
		bdUid : h.uid || "",
		bdPic : "",
		searchPic : h.searchPic || 0,
		bdComment : "",
		bdDesc : "",
		wbUid : "",
		tongji : "on",
		review : "on",
		render : true,
		snsKey : {},
		bdHost : "http://bdimg.share.baidu.com/static/",
		bdJump : "http://share.baidu.com/",
		bdApi : "http://api.share.baidu.com/",
		bdStatistics : "http://share.baidu.com/commit",
		bdCommit : "http://s.share.baidu.com/",
		bdMshare : "http://s.share.baidu.com/mshare",
		bdCout : "http://nsclick.baidu.com/v.gif?pid=307",
		bdWList : "([http|https]://[a-zA-Z0-9_.]+.baidu.com)",
		bdList : [ "mshare,\u4e00\u952e\u5206\u4eab,mshare",
				"qzone,QQ\u7a7a\u95f4,qqkj",
				"tsina,\u65b0\u6d6a\u5fae\u535a,xlwb",
				"baidu,\u767E\u5EA6\u4E91\u6536\u85CF,bdsc",
				"renren,\u4eba\u4eba\u7f51,rrw",
				"tqq,\u817e\u8baf\u5fae\u535a,txwb",
				"bdxc,\u767e\u5ea6\u76f8\u518c,bdxc",
				"kaixin001,\u5f00\u5fc3\u7f51,kxw",
				"tqf,\u817e\u8baf\u670b\u53cb,txpy",
				"tieba,\u767e\u5ea6\u8d34\u5427,bdtb",
				"douban,\u8c46\u74e3\u7f51,db",
				"tsohu,\u641c\u72d0\u5fae\u535a,shwb",
				"bdhome,\u767e\u5ea6\u65b0\u9996\u9875,bdhome",
				"sqq,QQ\u597D\u53CB,sqq", "thx,\u548c\u8baf\u5fae\u535a,thx",
				"qq,QQ\u6536\u85cf,qqsc",
				"taobao,\u6211\u7684\u6dd8\u5b9d,tjh",
				"hi,\u767e\u5ea6\u7a7a\u95f4,bdkj", "msn,MSN,msn",
				"sohu,\u641c\u72d0\u767d\u793e\u4f1a,shbsh",
				"t163,\u7f51\u6613\u5fae\u535a,wywb",
				"qy,\u5947\u827a\u5947\u8c08,qyqt",
				"meilishuo,\u7f8e\u4e3d\u8bf4,mls",
				"mogujie,\u8611\u83c7\u8857,mgj",
				"diandian,\u70b9\u70b9\u7f51,diandian",
				"huaban,\u82b1\u74e3,huaban", "leho,\u7231\u4e50\u6d3b,leho",
				"share189,\u624B\u673A\u5FEB\u4F20,share189",
				"duitang,\u5806\u7cd6,duitang", "hx,\u548c\u8baf,hexun",
				"tfh,\u51e4\u51f0\u5fae\u535a,fhwb", "fx,\u98de\u4fe1,feixin",
				"youdao,\u6709\u9053\u4e91\u7b14\u8bb0,youdao",
				"sdo,\u9EA6\u5E93\u8BB0\u4E8B,sdo",
				"qingbiji,\u8F7B\u7B14\u8BB0,qingbiji",
				"ifeng,\u51E4\u51F0\u5FEB\u535A,ifeng",
				"people,\u4EBA\u6C11\u5FAE\u535A,people",
				"xinhua,\u65B0\u534E\u5FAE\u535A,xinhua",
				"ff,\u996d\u5426,fanfou", "mail,\u90ae\u4ef6\u5206\u4eab,mail",
				"kanshou,\u641C\u72D0\u968F\u8EAB\u770B,kanshou",
				"isohu,\u6211\u7684\u641C\u72D0,isohu",
				"yaolan,\u6447\u7BEE\u7A7A\u95F4,yaolan",
				"wealink,\u82e5\u90bb\u7f51,wealink",
				"tuita,\u63A8\u4ED6,tuita", "xg,\u9c9c\u679c,xianguo",
				"ty,\u5929\u6daf\u793e\u533a,tianya",
				"fbook,Facebook,facebook", "twi,Twitter,twitter",
				"ms,Myspace,myspace", "deli,delicious,delicious",
				"s51,51\u6E38\u620F\u793e\u533a,51shequ",
				"s139,139\u8bf4\u5ba2,shuoke", "linkedin,linkedin,LinkedIn",
				"copy,\u590d\u5236\u7f51\u5740,kaobei",
				"print,\u6253\u5370,print" ]
	}
			|| {}, J = {
		_parseJson : function(j) {
			if (typeof j != "string") {
				return j
			}
			j = j.replace(/^\s*{|}\s*$/g, "");
			var e = j.split(",");
			var k = {};
			function D(r) {
				if (r.indexOf("{") == 0) {
					return J._parseJson(r)
				} else {
					var q = r.split(".");
					var s = window;
					for ( var p = 0, o = q.length; p < o; p++) {
						var t = q[p];
						if (typeof s == "object" && t in s) {
							s = s[t]
						} else {
							return r
						}
					}
					return s
				}
			}
			for ( var T = 0, W = e.length; T < W; T++) {
				var n = e[T];
				var U = n.indexOf(":");
				if (U) {
					var m = n.substring(0, U).replace(
							/^\s*[\'\"]?|[\"\']?\s*$/g, "");
					var B = n.substring(U + 1).replace(/^\s*/g, "");
					var l = B.charAt(0);
					if (l == "'" || l == '"') {
						do {
							var E = B.replace(/\s*$/g, "");
							if (E.substring(E.length - 1) == l) {
								break
							} else {
								B = B + "," + e[++T]
							}
						} while (T < e.length - 1);
						B = B.replace(/^\s*[\'\"]?|[\"\']?\s*$/g, "")
					} else {
						if (l == "{") {
							do {
								var E = B.replace(/\s*$/g, "");
								if (E.substring(E.length - 1) == "}") {
									break
								} else {
									B = B + "," + e[++T]
								}
							} while (T < e.length - 1);
							B = D(B)
						} else {
							if (!/^[0-9]*$/.test(B)) {
								B = D(B)
							} else {
								B = B.replace(/^\s*[\'\"]?|[\"\']?\s*$/g, "")
							}
						}
					}
					k[m] = B
				}
			}
			return k
		},
		_createScriptTag : function(D, B, E) {
			D.setAttribute("type", "text/javascript");
			E && D.setAttribute("charset", E);
			D.setAttribute("src", B);
			document.getElementsByTagName("head")[0].appendChild(D)
		},
		_removeScriptTag : function(D) {
			if (D.clearAttributes) {
				D.clearAttributes()
			} else {
				for ( var B in D) {
					if (D.hasOwnProperty(B) && "parentNode" != B) {
						delete D[B]
					}
				}
			}
			if (D && D.parentNode) {
				D.parentNode.removeChild(D)
			}
			D = null
		},
		callByBrowser : function(i, W, T) {
			var E = document.createElement("SCRIPT"), U = 0, l = T || {}, D = l.charset, k = W
					|| function() {
					}, j = l.timeOut || 0, B;
			E.onload = E.onreadystatechange = function() {
				if (U) {
					return
				}
				var e = E.readyState;
				if ("undefined" == typeof e || e == "loaded" || e == "complete") {
					U = 1;
					try {
						k();
						clearTimeout(B)
					} finally {
						E.onload = E.onreadystatechange = null;
						J._removeScriptTag(E)
					}
				}
			};
			if (j) {
				B = setTimeout(function() {
					E.onload = E.onreadystatechange = null;
					J._removeScriptTag(E);
					l.onfailure && l.onfailure()
				}, j)
			}
			J._createScriptTag(E, i, D)
		},
		on : function(E, B, D) {
			if (E.addEventListener) {
				E.addEventListener(B, D, false)
			} else {
				if (E.attachEvent) {
					E.attachEvent("on" + B, D)
				}
			}
		},
		unon : function(E, B, D) {
			if (E.removeEventListener) {
				E.removeEventListener(B, D, false)
			} else {
				if (E.detachEvent) {
					E.detachEvent("on" + B, D)
				}
			}
		},
		html : function(D, B) {
			var T = V.createElement(B || "div");
			for ( var E in D) {
				E == "style" ? T[E].cssText = D[E] : T[E] = D[E]
			}
			if (B == "link") {
				V.getElementsByTagName("head")[0].appendChild(T)
			} else {
				return X.insertBefore(T, (B == "iframe" ? X.firstChild
						: O.nextSibling))
			}
		},
		list : function(E) {
			var T = Z.bdPref, B = E.split(","), W = B[1], D = "#", U = T + B[0]
					+ " " + B[2];
			return {
				name : W,
				url : D,
				cls : U
			}
		},
		list_s : function(j) {
			var i = [], U = inner = "", W = Z, B = W.bdList, E = W.bdNums, e = (W.bdNums < B.length) ? '<li><a href="#" class="bds_more">'
					+ W.bdMore + "</a></li>"
					: "";
			while (E--) {
				U = J.list(B[E]), i.push('<a href="' + U.url + '" class="'
						+ U.cls + '">' + U.name + "</a>")
			}
			inner = '<iframe id="bdsIfr" style="position:absolute;display:none;z-index:9999;" frameborder="0"></iframe>';
			inner += '<div id="' + W.bdIdsl + '"><div id="' + W.bdIdsl
					+ '_c"><h6>' + W.bdTitle + "</h6>";
			inner += "<ul><li>"
					+ i.reverse().join("</li><li>")
					+ "</li>"
					+ e
					+ '</ul><p><a href="#" class="goWebsite">\u767e\u5ea6\u5206\u4eab</a></p></div></div>';
			if (j) {
				var T = J.html({
					id : "bdshare_s",
					innerHTML : inner,
					style : "display:none"
				});
				T.style.display = "block";
				var D = J.children(T);
				T = D[D.length - 1];
				J.on(T, "mouseover", function(p) {
					var p = p || window.event;
					var o = p.target || p.srcElement;
					var n = J.getPosition(o);
					var m = p.relatedTarget || p.fromElement;
					var l = J.getMousePos(p);
					var k = l.x - n.l;
					var q = l.y - n.t;
					o.buttontype = 1;
					o.x = k;
					o.y = q;
					if (J.contains(T, m)) {
						return
					}
					T.time = +new Date
				})
			} else {
				return inner
			}
		},
		scroll : function(B, D) {
			J
					.on(
							F,
							"scroll",
							function(W) {
								var E = J.getSize(), T = Z, U = T.bdTop;
								if (T.bdType == "slide") {
									if (K || g) {
										J.setAttr(V.getElementById(T.bdIdsl),
												"display:block");
										_bdS.style.top = (E.t + (U == 0 ? (E.h / 2 - (V
												.getElementById(T.bdIdsl).offsetHeight - 11) / 2)
												: parseInt(U)))
												+ "px"
									} else {
										if (T.bdTop != 0) {
											_bdS.style.top = parseInt(T.bdTop)
													+ "px"
										}
									}
								}
								if (D == "pop" && (K || g)) {
									B.style.top = (E.t + E.h / 2 - B.offsetHeight / 2)
											+ "px";
									J.setAttr(O, "top:" + B.style.top)
								}
							})
		},
		getSize : function() {
			return {
				t : (X.scrollTop || R.scrollTop),
				l : (X.scrollLeft || R.scrollLeft),
				w : (R.clientWidth || X.clientWidth),
				h : (F.innerHeight || R.clientHeight || X.clientHeight)
			}
		},
		getPosition : function(q) {
			var u = J.getSize(), D = q, n = {
				t : 0,
				l : 0
			}, B = /gecko/.test(navigator.userAgent), m = function(o, e) {
				n.t += o, n.l += e
			};
			if (D && D != X) {
				if (D.getBoundingClientRect) {
					var p = D.getBoundingClientRect(), r = q.ownerDocument, W = r.body, T = r.documentElement, E = T.clientTop
							|| W.clientTop || 0, k = T.clientLeft
							|| W.clientLeft || 0;
					if (p.top == p.bottom) {
						var U = D.style.display;
						D.style.display = "block";
						D.style.display = U
					}
					m(p.top + u.t - E, p.left + u.l - k)
				} else {
					var l = V.defaultView;
					while (D) {
						m(D.offsetTop, D.offsetLeft);
						var j = l.getComputedStyle(D, null);
						if (B) {
							var i = parseInt(j
									.getPropertyValue("border-left-width"), 10) || 0, t = parseInt(
									j.getPropertyValue("border-top-width"), 10) || 0;
							m(t, i);
							if (D != q
									&& j.getPropertyValue("overflow") != "visible") {
								m(t, i)
							}
						}
						D = D.offsetParent
					}
					D = q.parentNode;
					while (D && D != X) {
						m(-D.scrollTop, -D.scrollLeft);
						D = D.parentNode
					}
				}
			}
			return n
		},
		setAttr : function(E, D) {
			var T = D.split(";"), B = T.length;
			while (B--) {
				if (T[B]) {
					var U = T[B].split(":");
					if (U) {
						E.style[U[0]] = U[1]
					}
				}
			}
		},
		children : function(E) {
			for ( var B = [], D = E.firstChild; D; D = D.nextSibling) {
				if (D.nodeType == 1) {
					B.push(D)
				}
			}
			return B
		},
		generateRandom : function(U, W) {
			var B = U.length;
			var E = "";
			for ( var D = 1; D <= W; D++) {
				var T = Math.floor(B * Math.random());
				E = E + U.charAt(T)
			}
			return E
		},
		generateLinkid : function() {
			var D = (+new Date).toString(36);
			var B = J.generateRandom("0123456789abcdefghijklmnopqrstuvwxyz", 3);
			return D + B
		},
		contains : function(D, E) {
			if (!E || !D) {
				return false
			}
			if (D == E) {
				return true
			}
			var B = E.parentNode;
			while (B != null && typeof (B.tagName) != "undefind") {
				if (B == D) {
					return true
				}
				B = B.parentNode
			}
			return false
		},
		getMousePos : function(B) {
			if (B.pageX || B.pageY) {
				return {
					x : B.pageX,
					y : B.pageY
				}
			}
			if (document.documentElement && document.documentElement.scrollTop) {
				return {
					x : B.clientX + document.documentElement.scrollLeft
							- document.documentElement.clientLeft,
					y : B.clientY + document.documentElement.scrollTop
							- document.documentElement.clientTop
				}
			} else {
				if (document.body) {
					return {
						x : B.clientX + document.body.scrollLeft
								- document.body.clientLeft,
						y : B.clientY + document.body.scrollTop
								- document.body.clientTop
					}
				}
			}
		},
		_isCookieValidKey : function(B) {
			return (new RegExp(
					'^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24'))
					.test(B)
		},
		getCookieRaw : function(D) {
			if (J._isCookieValidKey(D)) {
				var E = new RegExp("(^| )" + D + "=([^;]*)(;|\x24)"), B = E
						.exec(document.cookie);
				if (B) {
					return B[2] || null
				}
			}
			return null
		},
		setCookieRaw : function(E, T, D) {
			if (!J._isCookieValidKey(E)) {
				return
			}
			D = D || {};
			var B = D.expires;
			if ("number" == typeof D.expires) {
				B = new Date();
				B.setTime(B.getTime() + D.expires)
			}
			document.cookie = E + "=" + T + (D.path ? "; path=" + D.path : "")
					+ (B ? "; expires=" + B.toGMTString() : "")
					+ (D.domain ? "; domain=" + D.domain : "")
					+ (D.secure ? "; secure" : "")
		},
		getCookie : function(B) {
			var D = J.getCookieRaw(B);
			if ("string" == typeof D) {
				D = decodeURIComponent(D);
				return D
			}
			return null
		},
		setCookie : function(D, E, B) {
			J.setCookieRaw(D, encodeURIComponent(E), B)
		},
		log : (function() {
			var B = [];
			return function(D) {
				var T = "bdsharelog__" + (new Date()).getTime(), E = B[T] = new Image();
				E.onload = (E.onerror = function() {
					B[T] = null
				});
				E.src = D;
				E = null
			}
		})()
	}, M = function(B) {
		var D = V.createElement("link");
		bdShare.velocity = bdShare.velocity || {};
		bdShare.velocity.cssLoadStart = +new Date();
		D.onload = function() {
			bdShare.velocity.cssLoadEnd = +new Date()
		};
		D.href = Z.bdHost + "css/bdsstyle.css?cdnversion=20130704";
		D.rel = "stylesheet";
		D.type = "text/css";
		V.getElementsByTagName("head")[0].appendChild(D);
		O = O || J.html({
			style : "display:none;" + (B || ""),
			frameBorder : 0
		}, "iframe")
	}, Q = function(j, n, m, B) {
		var l = /(#\d+\-[a-zA-Z\d]+\-\d+\-\d+\-[a-f\d]{32}$)/g, T = (A.search + A.hash)
				.replace(/&/g, "#"), D = T.match(l) || "", o = new RegExp(
				Z.bdWList, "ig"), e = A.protocol + "//" + A.hostname
				+ A.pathname + A.search;
		if (o.test(A.href) && D == "" && typeof j == "undefined") {
			return
		}
		var k = [];
		if (bdShare.fn.b.length > 0) {
			k.push("button")
		}
		if (bdShare.fn.t.length > 0) {
			k.push("tools")
		}
		if (bdShare.fn.conf.bdType) {
			k.push(bdShare.fn.conf.bdType)
		}
		var W = (function() {
			for ( var s = 0, q = k.length, t = {}, r = []; s < q; s++) {
				!(k[s] in t) && r.push(k[s]) && (t[k[s]] = "")
			}
			return r.join(",")
		})();
		if (Z.tongji == "on" || D != "" || typeof j != "undefined") {
			if (D != "" && j != "3072") {
				D = D.toString().replace("#", "");
				(new Image()).src = Z.bdCommit + "back?url="
						+ encodeURIComponent(e) + "&sign="
						+ encodeURIComponent(D) + "&title="
						+ encodeURIComponent(I.substr(0, 300))
			}
			bdShare.velocity = bdShare.velocity || {};
			bdShare.velocity.mainJsLoaded = +new Date();
			if (typeof j != "undefined") {
				(new Image()).src = Z.bdCout + "&type=" + j + "&sign=" + D
						+ "&uid=" + Z.bdUid + "&desturl="
						+ encodeURIComponent(V.referrer) + "&linkid=" + H
						+ "&button=" + W
			} else {
				var p = [ 0, 0, 0, 0 ];
				for ( var E = 0, U = k.length; E < U; E++) {
					p[{
						tools : 0,
						button : 1,
						slide : 2
					}[k[E]]] = 1
				}
				bdShare._LogPool = bdShare._LogPool || [];
				bdShare._LogPool.push({
					key : "cite",
					api : {
						uid : Z.bdUid || "",
						linkid : H,
						type : parseInt(p.reverse().join(""), 2),
						mini : Z.bdMini ? 1 : 0
					}
				})
			}
		}
	}, d = {
		create : function() {
			var i = Z, k = i.bdList, D = k.length, T = [], E = "", l = J
					.getSize(), B = V.getElementById(i.bdIds + "_pop"), e = ((K || g) ? "absolute"
					: "fixed"), j = ((K || g) ? l.t : 0);
			if (!B) {
				while (D--) {
					E = J.list(k[D]), T.push('<a href="' + E.url + '" class="'
							+ E.cls + '">' + E.name + "</a>")
				}
				var W = J
						.html({
							id : i.bdIds + "_pop",
							style : "position:" + e,
							innerHTML : "<div><h5></h5><ul><li>"
									+ T.reverse().join("</li><li>")
									+ '</li></ul><p><a href="#" class="goWebsite">\u767e\u5ea6\u5206\u4eab</a></p></div>'
						});
				a.bind(W, "mouseover", "a");
				a.bind(W, "click", "b", function() {
					W.style.display = "none";
					O.style.display = "none"
				});
				J.on(W, "mouseover", function(r) {
					var r = r || window.event;
					var q = r.target || r.srcElement;
					var p = J.getPosition(q);
					var n = J.getMousePos(r);
					var m = n.x - p.l;
					var s = n.y - p.t;
					q.buttontype = 2;
					q.x = m;
					q.y = s;
					var o = r.relatedTarget || r.fromElement;
					if (J.contains(W, o)) {
						return
					}
					W.time = +new Date
				})
			}
			var U = W || B;
			U.getElementsByTagName("h5")[0].innerHTML = (C.title || i.bdPopTitle)
					+ "<b>&nbsp;</b>";
			J.setAttr(U, "display:block;");
			J.setAttr(U, "left:" + (l.w / 2 - U.offsetWidth / 2) + "px;top:"
					+ (j + l.h / 2 - U.offsetHeight / 2) + "px");
			J.setAttr(O, "position:" + e
					+ ";display:block;z-index:10000;width:" + U.offsetWidth
					+ "px;height:" + U.offsetHeight + "px;left:" + U.style.left
					+ ";top:" + U.style.top);
			J.scroll(U, "pop");
			J.on(F, "resize", function(o) {
				var m = J.getSize(), n = "left:"
						+ (m.w / 2 - U.offsetWidth / 2) + "px;top:"
						+ (j + m.h / 2 - U.offsetHeight / 2) + "px";
				J.setAttr(U, n);
				J.setAttr(O, n)
			});
			if (i.bdType != "slide") {
				V.getElementById(Z.bdIdsl).style.display = "none";
				V.getElementById("bdsIfr").style.display = "none"
			}
			window.bdShareActivity && bdShareActivity.check()
		}
	}, a = {
		bind : function(D, B, U, T) {
			var E = this;
			D.addEventListener ? D.addEventListener(B, function(W) {
				return E._action(W, W.target, U, D, T)
			}, false) : D.attachEvent("on" + B, function(W) {
				W = F.event;
				return E._action(W, W.srcElement, U, D, T)
			})
		},
		_action : function(W, B, i, U, T) {
			if (B.nodeName == i.toUpperCase()) {
				if (i == "a" || i == "span") {
					var j = B.className, D = j == "goWebsite" ? j : j
							.split(" ")[0].split("_")[1], E = this;
					if (D) {
						(D == "more" && i == "span") ? E._tools()
								: B.onclick = function(k, e) {
									return function(p) {
										var p = p || window.event;
										var o = p.target || p.srcElement;
										var n = J.getPosition(o);
										var m = J.getMousePos(p);
										var l = m.x - n.l;
										var q = m.y - n.t;
										if (k == "more") {
											E._tools()
										} else {
											if (k == "copy") {
												E._copy(E)
											} else {
												if (k == "print") {
													E._print()
												} else {
													E._jump(k, e, B, l, q)
												}
											}
										}
										return false
									}
								}(D, U)
					}
					return false
				}
				if (typeof T === "function") {
					T()
				}
			}
			if (typeof W.preventDefault === "function") {
				W.preventDefault();
				W.stopPropagation()
			} else {
				W.returnValue = false;
				W.cancelBubble = true
			}
		},
		_tools : function() {
			Q(3072);
			d.create()
		},
		_copy : function(D) {
			_this = D;
			var B = new _this._browsers();
			if (B.name == "IE") {
				window.clipboardData.setData("text", document.title + " "
						+ A.href);
				alert("\u6807\u9898\u548c\u94fe\u63a5\u590d\u5236\u6210\u529f\uff0c\u60a8\u53ef\u4ee5\u63a8\u8350\u7ed9QQ/MSN\u4e0a\u7684\u597d\u53cb\u4e86\uff01")
			} else {
				window
						.prompt(
								"\u60a8\u4f7f\u7528\u7684\u662f\u975eIE\u6838\u5fc3\u6d4f\u89c8\u5668\uff0c\u8bf7\u6309\u4e0b Ctrl+C \u590d\u5236\u4ee3\u7801\u5230\u526a\u8d34\u677f",
								document.title + " " + A.href)
			}
		},
		_mail : function(B) {
		},
		_print : function() {
			var B = document.getElementById("bdshare_pop");
			B && (B.style.display = "none");
			window.print();
			B && (B.style.display = "block");
			return
		},
		_jump : function(AV, AU, B, AD, AC) {
			var AT = Z, AB = AT.bdPic, U = AT.bdText, z = AT.weiboText, AL = AT.wbUid, W = G, AK = AT.bdDesc, u = AT.bdComment, o = AT.bdMiniWindow || 0;
			C = (AU.getAttribute("data") && AU.getAttribute("data") != "") ? J
					._parseJson(AU.getAttribute("data")) : C;
			if (C != "") {
				AB = encodeURIComponent(C.pic || "") || AB;
				W = encodeURIComponent(C.url || "") || W;
				u = encodeURIComponent(C.comment || "") || u;
				AK = encodeURIComponent(C.desc || "") || AK;
				AL = C.wbuid || AL;
				if (AV == "tsina") {
					if (C.text && C.weibotext) {
						U = encodeURIComponent((C.text + C.weibotext).substr(0,
								300))
					} else {
						if (C.weibotext) {
							U = encodeURIComponent((U + C.weibotext).substr(0,
									300))
						} else {
							if (C.text) {
								U = encodeURIComponent((C.text + z).substr(0,
										300))
							} else {
								U = encodeURIComponent((U + z).substr(0, 300))
							}
						}
					}
				} else {
					U = encodeURIComponent((C.text || "").substr(0, 300))
							|| encodeURIComponent(U.substr(0, 300))
				}
			} else {
				if (AV == "tsina") {
					U = encodeURIComponent((U + z).substr(0, 300))
				} else {
					U = encodeURIComponent(U.substr(0, 300))
				}
			}
			U = encodeURIComponent(U);
			L = new Date().getTime() + 3000;
			var AN = P.toString(32) + N.toString(32) + L.toString(32);
			var AX = B.buttontype;
			var T = Math.floor(bdShare.XY.loadedX);
			var E = Math.floor(bdShare.XY.loadedY);
			var n = AX > 0 ? 1 : 0;
			var AH = Math.floor(B.x);
			var AE = Math.floor(B.y);
			var i = Math.floor(AD);
			var e = Math.floor(AC);
			var AF = Math.floor(B.offsetWidth);
			var AQ = Math.floor(B.offsetHeight);
			var p = document.body.offsetWidth;
			var AA = document.body.offsetHeight;
			var r = window.screen.availWidth;
			var AG = window.screen.availHeight;
			var k = AX;
			var AI = +new Date;
			AI = AI - AU.time;
			var j = [ T, E, n, AH, AE, i, e, AF, AQ, k, AI, p, AA, r, AG ]
					.join(".");
			var D;
			switch (Z.bdType) {
			case "button":
				D = 1;
				break;
			case "slide":
				D = 2;
				break;
			default:
				D = 0;
				break
			}
			var AW = AV == "mail" ? "_mail" : AV;
			var q = "?click=1&url=" + W + "&uid=" + AT.bdUid + "&to=" + AW
					+ "&type=text&relateUid=" + AL + "&pic=" + AB + "&title="
					+ U + "&key=" + (AT.snsKey[AV] || "") + "&sign="
					+ AT.review + "&desc=" + AK + "&comment=" + u
					+ "&searchPic=" + AT.searchPic + "&l=" + AN + "&linkid="
					+ H + "&sloc=" + j + "&apiType=0&buttonType=" + D
					+ "&firstime=" + J.getCookie("bdshare_firstime");
			if (AV == "mshare") {
				var AS = AT.bdMshare + q
			} else {
				var AS = AT.bdCommit + q
			}
			var v = AT.bdCommit + "commit" + q + "&t=" + Math.random();
			if (AV != "goWebsite") {
				bdShare.fn._getSc("share");
				var AP = function() {
					var l = [];
					return function(s) {
						var m = l.push(new Image) - 1;
						l[m].onload = function() {
							l[m] = l[m].onload = null
						};
						l[m].src = s
					}
				}();
				setTimeout(function() {
					AP(v)
				}, 1500);
				if (AV == "bdxc") {
					var AR = window, AS = document, AM = "_bdXC", AJ;
					if (AR[AM]) {
						if (window._bdXC_loaded) {
							AR[AM].reInit()
						}
					} else {
						AJ = AS.createElement("script");
						AJ.setAttribute("charset", "utf-8");
						AJ.src = "http://xiangce.baidu.com/zt/collect/mark.js?"
								+ (new Date()).getTime();
						AS.getElementsByTagName("head")[0].appendChild(AJ)
					}
				} else {
					if (AV == "mail") {
						var AO = Z.bdCommit + "sendmail";
						window.open(AO + q, "_blank")
					} else {
						if (1 == o) {
							F
									.open(AS, "bdShare",
											"toolbar=0, scrollbars=1, status=0, resizable=1, height=400, width=600")
						} else {
							F.open(AS)
						}
					}
				}
			} else {
				F.open(AT.bdJump)
			}
		},
		_browsers : function() {
			var D = {};
			var B = navigator.userAgent.toLowerCase();
			var T, E;
			if (B.match(/msie ([\d.]+)/)) {
				E = B.match(/msie ([\d.]+)/);
				D.name = "IE";
				D.version = E[1]
			} else {
				if (B.match(/firefox\/([\d.]+)/)) {
					E = B.match(/firefox\/([\d.]+)/);
					D.name = "firefox";
					D.version = E[1]
				} else {
					if (B.match(/chrome\/([\d.]+)/)) {
						E = B.match(/chrome\/([\d.]+)/);
						D.name = "chrome";
						D.version = E[1]
					} else {
						if (B.match(/opera.([\d.]+)/)) {
							E = B.match(/opera.([\d.]+)/);
							D.name = "opera";
							D.version = E[1]
						} else {
							if (B.match(/safari.([\d.]+)/)) {
								E = B.match(/safari.([\d.]+)/);
								D.name = "safari";
								D.version = E[1]
							} else {
								D.name = "\u672a\u77e5\u7684\u6d4f\u89c8\u5668";
								D.version = "\u672a\u77e5\u7684\u7248\u672c\u53f7"
							}
						}
					}
				}
			}
			return D
		}
	};
	var H = J.generateLinkid();
	bdShare.fn = (function() {
		return {
			init : function() {
				N = new Date().getTime() + 1000;
				this.b = [];
				this.t = [];
				this.s = [];
				this.type = "load";
				this._getShare();
				var E = this;
				if (typeof bds_config != "undefined") {
					for ( var k in bds_config) {
						if (k == "bdPopTitle" || k == "bdText"
								|| k == "weiboText" || k == "bdPic"
								|| k == "wbUid" || k == "tongji"
								|| k == "render" || k == "snsKey"
								|| k == "review" || k == "bdComment"
								|| k == "bdDesc" || k == "bdTop"
								|| k == "searchPic" || k == "bdUrl"
								|| k == "bdMiniWindow") {
							if (k == "snsKey") {
								Z[k] = J._parseJson(bds_config[k])
							} else {
								Z[k] = (k == "render" || k == "bdPopTitle"
										|| k == "bdText" || k == "weiboText") ? bds_config[k]
										: encodeURIComponent(bds_config[k])
							}
						}
					}
				}
				this.conf = Z;
				this.imgW = Z.bdImgW;
				if (this.conf.render) {
					if (this.b.length > 0 || this.t.length > 0) {
						this._share()
					}
					if (this.conf.bdType == "slide") {
						this._slide()
					}
				}
				this._getSc(this.type);
				var W = this.t;
				for ( var U = 0; U < W.length; U++) {
					var e = W[U].getElementsByTagName("a");
					for ( var T = 0; T < e.length; T++) {
						!(e[T].getAttribute("href"))
								&& e[T].setAttribute("href", "#")
					}
				}
				bdShare.XY = bdShare.XY || {};
				function D(j) {
					var j = j || window.event;
					var i = J.getMousePos(j);
					bdShare.XY.loadedX = i.x;
					bdShare.XY.loadedY = i.y;
					if (bdShare.XY.loadedX > 0 && bdShare.XY.loadedY > 0) {
						J.unon(document, "mousemove", D)
					}
				}
				J.on(document, "mousemove", D);
				for ( var U = 0, B = this.t.length; U < B; U++) {
					(function(i) {
						var j = i;
						J.on(E.t[i], "mouseover", function(q) {
							var q = q || window.event;
							var p = q.target || q.srcElement;
							var o = J.getPosition(p);
							var m = J.getMousePos(q);
							var l = m.x - o.l;
							var r = m.y - o.t;
							p.buttontype = 0;
							p.x = l;
							p.y = r;
							var n = q.relatedTarget || q.fromElement;
							if (J.contains(E.t[j], n)) {
								return
							}
							E.t[j].time = +new Date
						})
					})(U)
				}
				Q();
				if (J.getCookie("bdshare_firstime") == null) {
					J.setCookie("bdshare_firstime", new Date() * 1, {
						path : "/",
						expires : new Date().setFullYear(2022) - new Date()
					})
				}
			},
			_getSc : function(D) {
				this.type = D;
				var E = V.querySelectorAll ? V.querySelectorAll(".shareCount")
						: V.getElementsByTagName("*"), B = E.length;
				while (B--) {
					if (/\sshareCount|shareCount\s|shareCount$/
							.test(E[B].className)) {
						this.s.push(E[B])
					}
				}
				if (this.s.length > 0) {
					J.callByBrowser(this.conf.bdApi + "getnum?url=" + G
							+ "&callback=bdShare.fn._getShare&type=" + D
							+ "&t=" + new Date().getTime())
				}
			},
			_getShare : function(T) {
				var E = T ? true : false, j = [];
				if (V.querySelectorAll) {
					this.b = V.querySelectorAll(".bdshare_b");
					this.t = V.querySelectorAll(".bdshare_t")
				} else {
					var i = V.getElementsByTagName("*"), D = i.length;
					while (D--) {
						var U = i[D];
						if (/\sbdshare_t|bdshare_t\s/.test(U.className)) {
							this.t.push(U)
						}
						if (/\sbdshare_b|bdshare_b\s|bdshare_b$/
								.test(U.className)) {
							this.b.push(U)
						}
					}
				}
				if (E) {
					var j = this.s, B = j.length, W;
					while (B--) {
						if (/\sshareCount|shareCount\s|shareCount$/
								.test(j[B].className)) {
							W = this.type == "share" ? (T.num[0] < 10000 ? parseInt(j[B].innerHTML) + 1
									: T.num[1])
									: (T.errno * 1 == 0 ? T.num[1] : 0);
							j[B].innerHTML = decodeURI(W);
							j[B].setAttribute("title",
									"\u7d2f\u8ba1\u5206\u4eab" + T.num[0]
											+ "\u6b21");
							j[B].onclick = function() {
								d.create()
							}
						}
					}
					this.s = []
				}
			},
			_share : function() {
				J.list_s(true);
				var i = this.b, q = this.t, D = i.length, r = q.length, B = V
						.getElementById(this.conf.bdIdsl), E = V
						.getElementById("bdsIfr"), k = this.conf.bdList, n = k.length;
				J.setAttr(B, "display:none;");
				a.bind(B, "mouseover", "a");
				if (D > 0) {
					while (D--) {
						if (i[D].id == "bdshare") {
							a.bind(i[D], "click", "img", function() {
								d.create()
							});
							a.bind(i[D], "mouseover", "a", function() {
								d.create()
							});
							this._s(i[D], B, E, i[D], "b")
						}
					}
				}
				if (r > 0) {
					while (r--) {
						if (q[r].id == "bdshare") {
							a.bind(q[r], "click", "span", function() {
								d.create()
							});
							a.bind(q[r], "mouseover", "a");
							var j = J.children(q[r]), U = j.length, u = "";
							while (U--) {
								var e = j[U];
								if (/bds_more/.test(e.className)) {
									u = j[U];
									if (g) {
										u.style.height = (/bds_tools_32/
												.test(q[r].className) ? 38 : 17)
												+ "px"
									}
									this
											._s((u == "" ? q[r] : u), B, E,
													q[r], u)
								} else {
									for ( var T = 0; T < n; T++) {
										if (k[T]) {
											var W = k[T].split(","), o = new RegExp(
													this.conf.bdPref + W[0]
															+ "$", "ig");
											if (k[T]) {
												var W = k[T].split(","), o = new RegExp(
														this.conf.bdPref + W[0]
																+ "$", "ig");
												if (o.test(e.className)) {
													if (W[1] == "拷贝") {
														e.title = "复制网址"
													} else {
														if (!e.title) {
															e.title = "\u5206\u4eab\u5230"
																	+ W[1]
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			},
			_s : function(W, B, D, U, j) {
				var E = this, T = [], i, e = (j == "" ? "none" : "block");
				this
						._popShow(
								W,
								{
									over : function(k) {
										T = J.getPosition(W);
										C = (U.getAttribute("data") && U
												.getAttribute("data") != "") ? J
												._parseJson(U
														.getAttribute("data"))
												: "";
										J.setAttr(B, "display:" + e);
										J
												.setAttr(
														B,
														"left:"
																+ (((J
																		.getSize().w - k.clientX) < B.offsetWidth) ? (T.l
																		- B.offsetWidth + W.offsetWidth)
																		: T.l)
																+ "px");
										J
												.setAttr(
														B,
														"top:"
																+ (((J
																		.getSize().h - k.clientY) < B.offsetHeight) ? (T.t - B.offsetHeight)
																		: T.t
																				+ W.offsetHeight)
																+ "px");
										J.setAttr(D, "display:" + e + ";width:"
												+ B.offsetWidth + "px;height:"
												+ B.offsetHeight + "px;left:"
												+ B.style.left + ";top:"
												+ B.style.top)
									},
									out : function(k) {
										i = setTimeout(function() {
											B.style.display = "none";
											D.style.display = "none"
										}, 100);
										E._popShow(B, {
											over : function() {
												clearTimeout(i);
												B.style.display = "block";
												D.style.display = "block"
											},
											out : function() {
												B.style.display = "none";
												D.style.display = "none"
											}
										})
									}
								})
			},
			_slide : function() {
				if (!F._bdS) {
					var k = this.conf.bdLeft == "right" ? "left" : "right", e = this.conf.bdHost
							+ "images/"
							+ this.conf.bdLeft.substring(0, 1)
							+ this.conf.bdImg + ".gif";
					F._bdS = J.html({
						id : this.conf.bdIds,
						innerHTML : '<img src="' + e + '" alt="" style="float:'
								+ k + ';margin-top:58px;"/>' + J.list_s(false)
					});
					var D = J.children(_bdS);
					var B = D[D.length - 1];
					J.on(B, "mouseover", function(s) {
						var s = s || window.event;
						var r = s.target || s.srcElement;
						var q = J.getPosition(r);
						var p = s.relatedTarget || s.fromElement;
						var o = J.getMousePos(s);
						var m = o.x - q.l;
						var t = o.y - q.t;
						r.buttontype = 1;
						r.x = m;
						r.y = t;
						if (J.contains(B, p)) {
							return
						}
						B.time = +new Date
					})
				}
				var j = this, E = _bdS, n = J.getSize(), l = V
						.getElementById(this.conf.bdIdsl), T = V
						.getElementById("bdsIfr"), W = (!K && !g) ? "fixed"
						: "absolute", i = (K ? n.t : 0)
						+ (this.conf.bdTop == 0 ? (n.h < l.offsetHeight ? -40
								: (n.h / 2 - l.offsetHeight / 2))
								: parseInt(this.conf.bdTop));
				J.setAttr(E, "overflow:hidden;height:330px;position:"
						+ W
						+ ";top:"
						+ i
						+ "px;"
						+ this.conf.bdLeft
						+ ":0;"
						+ ((k == "right") ? k + ":" + (n.w - this.imgW) + "px"
								: ""));
				J.setAttr(l, k + ":" + this.imgW + "px;display:none");
				a.bind(E, "click", "img", function() {
					Q(3072);
					d.create()
				});
				a.bind(E, "mouseover", "img", U);
				a.bind(l, "mouseover", "a");
				function U() {
					J.setAttr(l, "display:block;");
					if ((l.offsetWidth + j.imgW) == E.offsetWidth) {
						return
					}
					tm = setTimeout(function() {
						if ((l.offsetWidth + j.imgW) != E.offsetWidth) {
							j._move(E, 0, j.imgW, l.offsetWidth, T)
						}
					}, 100);
					j._popShow(l, {
						over : function() {
							J.setAttr(T, "height:" + l.offsetHeight + "px;"
									+ j.conf.bdLeft + ":0;top:0;display:block")
						},
						out : function() {
						}
					});
					j._popShow(E, {
						over : function() {
						},
						out : function() {
							if (E.offsetWidth == (l.offsetWidth + j.imgW)) {
								clearTimeout(tm);
								j._move(E, 0, l.offsetWidth + j.imgW,
										-l.offsetWidth, T)
							}
							T.style.display = "none"
						}
					})
				}
				J.scroll(E, "slide");
				J.on(F, "resize", function() {
					J.setAttr(E, ((k == "right") ? k + ":"
							+ (J.getSize().w - j.imgW) + "px" : ""))
				})
			},
			_move : function(B, j, e, T, D) {
				var i = B.style, W = D.style, U = this, E = 6;
				setInterval(function() {
					if (j < E) {
						j++;
						i.width = Math.ceil(T * j / E + e) + "px";
						W.width = Math.ceil(T * j / E + e) - U.imgW + "px"
					} else {
						return
					}
				}, 10)
			},
			_popShow : function(T, B) {
				if (V.all) {
					T.onmouseenter = function(U) {
						E(F.event)
					};
					T.onmouseleave = D
				} else {
					T.onmouseover = function(U) {
						U.relatedTarget == null ? E(U)
								: (!(this === U.relatedTarget || this
										.compareDocumentPosition(U.relatedTarget) == 20) && E(U))
					};
					T.onmouseout = function(U) {
						U.relatedTarget == null ? D(U)
								: (!(this === U.relatedTarget || this
										.compareDocumentPosition(U.relatedTarget) == 20) && D(U))
					}
				}
				function E(U) {
					B.over(U)
				}
				function D(U) {
					B.out(U)
				}
			}
		}
	})();
	M();
	bdShare.fn.init()
})();