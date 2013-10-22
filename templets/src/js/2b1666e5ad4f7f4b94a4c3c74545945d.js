  var siteurl = "http://www.qtshu.com/";
  var sitedynamicurl = "http://a.qtshu.com/";
  var homeurl = "http://www.qtshu.com/";
  var memberurl = "http://a.qtshu.com/";
  var jieqi_res_url = "http://s.qtshu.com";
  var theme_res_url = "http://s.qtshu.com/v4";
  var load_transform = true;
  var load_jiaThisButton = true;
  var load_history = true;
/*
json2.js
2012-10-08

Public Domain.

NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

See http://www.JSON.org/js.html


This code should be minified before deployment.
See http://javascript.crockford.com/jsmin.html

USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
NOT CONTROL.


This file creates a global JSON object containing two methods: stringify
and parse.

JSON.stringify(value, replacer, space)
value any JavaScript value, usually an object or array.

replacer an optional parameter that determines how object
values are stringified for objects. It can be a
function or an array of strings.

space an optional parameter that specifies the indentation
of nested structures. If it is omitted, the text will
be packed without extra whitespace. If it is a number,
it will specify the number of spaces to indent at each
level. If it is a string (such as '\t' or '&nbsp;'),
it contains the characters used to indent at each level.

This method produces a JSON text from a JavaScript value.

When an object value is found, if the object contains a toJSON
method, its toJSON method will be called and the result will be
stringified. A toJSON method does not serialize: it returns the
value represented by the name/value pair that should be serialized,
or undefined if nothing should be serialized. The toJSON method
will be passed the key associated with the value, and this will be
bound to the value

For example, this would serialize Dates as ISO strings.

Date.prototype.toJSON = function (key) {
function f(n) {
// Format integers to have at least two digits.
return n < 10 ? '0' + n : n;
}

return this.getUTCFullYear() + '-' +
f(this.getUTCMonth() + 1) + '-' +
f(this.getUTCDate()) + 'T' +
f(this.getUTCHours()) + ':' +
f(this.getUTCMinutes()) + ':' +
f(this.getUTCSeconds()) + 'Z';
};

You can provide an optional replacer method. It will be passed the
key and value of each member, with this bound to the containing
object. The value that is returned from your method will be
serialized. If your method returns undefined, then the member will
be excluded from the serialization.

If the replacer parameter is an array of strings, then it will be
used to select the members to be serialized. It filters the results
such that only members with keys listed in the replacer array are
stringified.

Values that do not have JSON representations, such as undefined or
functions, will not be serialized. Such values in objects will be
dropped; in arrays they will be replaced with null. You can use
a replacer function to replace those with JSON values.
JSON.stringify(undefined) returns undefined.

The optional space parameter produces a stringification of the
value that is filled with line breaks and indentation to make it
easier to read.

If the space parameter is a non-empty string, then that string will
be used for indentation. If the space parameter is a number, then
the indentation will be that many spaces.

Example:

text = JSON.stringify(['e', {pluribus: 'unum'}]);
// text is '["e",{"pluribus":"unum"}]'


text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
// text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

text = JSON.stringify([new Date()], function (key, value) {
return this[key] instanceof Date ?
'Date(' + this[key] + ')' : value;
});
// text is '["Date(---current time---)"]'


JSON.parse(text, reviver)
This method parses a JSON text to produce an object or array.
It can throw a SyntaxError exception.

The optional reviver parameter is a function that can filter and
transform the results. It receives each of the keys and values,
and its return value is used instead of the original value.
If it returns what it received, then the structure is not modified.
If it returns undefined then the member is deleted.

Example:

// Parse the text. Values that look like ISO date strings will
// be converted to Date objects.

myData = JSON.parse(text, function (key, value) {
var a;
if (typeof value === 'string') {
a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
if (a) {
return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
+a[5], +a[6]));
}
}
return value;
});

myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
var d;
if (typeof value === 'string' &&
value.slice(0, 5) === 'Date(' &&
value.slice(-1) === ')') {
d = new Date(value.slice(5, -1));
if (d) {
return d;
}
}
return value;
});


This is a reference implementation. You are free to copy, modify, or
redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
lastIndex, length, parse, prototype, push, replace, slice, stringify,
test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate()) + 'T' +
                    f(this.getUTCHours()) + ':' +
                    f(this.getUTCMinutes()) + ':' +
                    f(this.getUTCSeconds()) + 'Z'
                : null;
        };

        String.prototype.toJSON =
            Number.prototype.toJSON =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = { // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i, // The loop counter.
            k, // The member key.
            v, // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

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
        icons: ["●", "○", "□", "■", "◆", "◇", "▲", "?", "▼", "?", "△", "?", "?", "▽", "★", "☆", "?", "?", "?", "?", "→", "←", "↑", "↓", "?", "↘", "↖", "↗", "↙", "⊕", "⊙", "⊿", "?", "⊥", "?", "÷", "×", "=", "+"],
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
    //浮动栏目
    function review() {
        try {
            var myurl = $('#review_list').attr('rel');
            if(myurl && myurl!=''){
	            $.ajax({
	                type: 'get',
	                url: myurl,
	                dataType: 'jsonp',
	                success: function (data) {
	                    if (data) {
	                        if (data.html)
	                            $('#review_list').html(data.html);
	                        else if (data.msg)
	                            alert(data.msg.replace(/<br[^<>]*>/g, '\n'))
	                    }
	                },
	                error: function (XMLHttpRequest, textStatus, errorThrown) {
	                    //function(){alert(this.response.replace(/<br[^<>]*>/g,'\n'));}
	                    //alert('发表评论失败，请检查是否登陆！')
	                }
	            });
            }
        } catch (e) { }
    }

    function postReview(obj) {
        if (obj.ptitle.value == '' || obj.ptitle.value == '请输入标题') {
            alert('请输入标题!');
            obj.focus();
            return false;
        };
        if (obj.pcontent.value == '' || obj.pcontent.value == '请输入内容!') {
            obj.focus();
            alert('请输入内容!');
            return false;
        }
        var myurl = $('#review_list').attr('rel');
        var data = {};
        data['action'] = 'newpost';
        data['ptitle'] = obj.ptitle.value;
        data['pcontent'] = obj.pcontent.value;
        if (chaptername){
            data['pcontent'] += '  @[url=' + location.href + ']'+chaptername+'[/url]';
        }
        if (obj.checkcode) {
            data['checkcode'] = obj.checkcode.value;
        }

        if (obj.shortreply) {
            data['shortreply'] = obj.shortreply.value;
        }

        $.ajax({
            type: 'get',
            url: myurl,
            data: data,
            dataType: 'jsonp',
            success: function (data) {
                if (data) {
                    if (data.html) {
                        obj.pcontent.value = '';
                        obj.ptitle.value = '';
                        obj.pcontent.focus();
                        if (obj.checkcode) {
                            obj.checkcode.value = '';
                        }
                        $('#review_list').html(data.html);

                    } else if (data.msg)
                    	if(data.msg=='对不起，您需要登录才能使用本功能！'){
                       	 	msc.dialog('login',function(data){
                       	 	postReview(obj);
                       	 	});
                    	}
                    	else{
                            alert(data.msg.replace(/<br[^<>]*>/g, '\n'))                        		
                    	}
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //function(){alert(this.response.replace(/<br[^<>]*>/g,'\n'));}
                alert('发表评论失败，请检查是否登陆！')
            }
        });

    }

    function addbookcase(urlbookcase, aid) {
		if(chapter_id){
			url_bookcase = urlbookcase+'&cid='+chapter_id;
		}
        if (url_bookcase) {
            $.ajax({
                type: 'get',
                url: url_bookcase,
                dataType: 'jsonp',
                success: function (data) {
                    if (data) {
                        if (data.status) {
                            alert('加入书架成功！')

                        } else if (data.msg)
                        	if(data.msg=='对不起，您需要登录才能使用本功能！'){
                           	 	msc.dialog('login',function(data){
                           	 		addbookcase(urlbookcase,aid);
                           	 	});
                        	}
                        	else{
                                alert(data.msg.replace(/<br[^<>]*>/g, '\n'))                        		
                        	}
                        else {
                            alert('加入书架失败！')
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //function(){alert(this.response.replace(/<br[^<>]*>/g,'\n'));}
                    alert('加入书架失败，请检查是否登陆！')
                }
            });
        }
    }

    function vote(url_bookcase, aid) {
        if (url_bookcase) {
            $.ajax({
                type: 'get',
                url: url_bookcase,
                dataType: 'jsonp',
                success: function (data) {
                    if (data) {
                        if (data.status) {
                            alert('推荐成功！')
                            msc.loadstats($('#myaction_script').attr('rel'));
                        } else if (data.msg){
                        	if(data.msg=='对不起，您需要登录才能使用本功能！'){
                           	 	msc.dialog('login',function(data){
                           	 	vote(url_bookcase,aid);
                           	 	});
                        	}
                        	else{
                                alert(data.msg.replace(/<br[^<>]*>/g, '\n'))
                        	}
                        }
                        else {
                            alert('推荐失败！')
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //function(){alert(this.response.replace(/<br[^<>]*>/g,'\n'));}
                    alert('推荐失败，请检查是否登陆！')
                }
            });
        }
    }

    function downtxt(url_bookcase, aid) {
        if (url_bookcase) {
        	window.location.href=url_bookcase; 
        	return false;
            var form = $("<form>");   //定义一个form表单
            form.attr('style', 'display:none');   //在form表单中添加查询参数
            form.attr('target', '_self');
            form.attr('method', 'get');
            form.attr('action', url_bookcase);

            $('body').append(form);  //将表单放置在web中
            form.submit();   //表单提交
        }
        return false;
    }


    function article_report(url, articlename, chaptername, aid) {
        if (msc.userislogin) {
            title = '《' + articlename + '》报错！';
            content = '来源网址：' + window.location.href + '     ';
            if (chaptername)
                content += '《' + articlename + '》' + chaptername + '错误详情：' + "    ";
            else
                content += '《' + articlename + '》错误详情：' + '       ';

            url = memberurl + 'newmessage.php?tosys=1&title=' + title + '&content=' + content;
            window.open(url);
        }
        else {
            window.open(url);
        }
        return false;
    }


    function articlepl(url, aid) {
        window.open(url);
        return false;
    }

    function addfriend(uid) {
        var url = memberurl + "myaddfriends.php?id=" + uid;
        if (url) {
            $.ajax({
                type: 'get',
                url: url,
                dataType: 'jsonp',
                success: function (data) {
                    if (data) {
                        if (data.status) {
                            alert('操作成功！')
                        } else if (data.msg)
                            alert(data.msg.replace(/<br[^<>]*>/g, '\n'))
                        else {
                            alert('操作失败！')
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //function(){alert(this.response.replace(/<br[^<>]*>/g,'\n'));}
                    alert('操作失败！')
                }
            });
        }
        return false;
    }

    function loadstats(url_bookcase, aid) {
        if (url_bookcase) {
            $.ajax({
                type: 'get',
                url: url_bookcase,
                dataType: 'jsonp',
                success: function (data) {
                    if (data) {
                        if (data.status && data.data) {
                            $.each(data.data, function (k, n) {
                                if ($('#td_' + k).length > 0)
                                    $('#td_' + k).html('&nbsp;' + n);
                            });

                        } else if (data.msg)
                            alert(data.msg.replace(/<br[^<>]*>/g, '\n'))
                        else {
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                }
            });
        }
    }


    window.msc = $.extend(window.msc || {}, {
        review: review,
        postReview: postReview,
        addbookcase: addbookcase,
        vote: vote,
        downtxt: downtxt,
        loadstats: loadstats,
        article_report: article_report,
        addfriend: addfriend,
        articlepl: articlepl
    });
})(jQuery);

$(function () {
    if(!chapter_id)msc.review();
});

	


(function ($) {
    //浮动栏目
    function floatbar() {
        try {
            var pllist = sitedynamicurl + 'modules/article/myreviews.php?aid=' + article_id + '&shortreply=1';
            var tool_html = '<div  id="float-bar"><div class="float-bar" style="right:-2px;">' +
           // '<div class="float-item" id="article_page_login"><span class="float-span">登&nbsp;&nbsp;&nbsp;&nbsp;录</span></div>' +
           // '<div class="float-item" id="article_page_logout" style="display:none;"><span class="float-span">注&nbsp;&nbsp;&nbsp;&nbsp;销</span></div>' +
            '<div class="float-pl" id="article-pl"><a class="open-btn" href="javascript:void(0);">&gt;</a><span class="float-span">评&nbsp;&nbsp;&nbsp;&nbsp;论</span></div>' +
            '<div class="float-item" id="article-bookcase"><span class="float-span">加书签</span></div>' +
            '<div class="float-item" id="article-vote"><span class="float-span">推&nbsp;&nbsp;&nbsp;&nbsp;荐</span></div>' +
            '<div class="float-item" id="article-report"><span class="float-span">反&nbsp;&nbsp;&nbsp;&nbsp;馈</span></div>'+
            '<div class="float-item" id="article-prev"><span class="float-span">上一章</span></div>' +
            '<div class="float-item" id="article-index"><span class="float-span">目&nbsp;&nbsp;&nbsp;&nbsp;录</span></div>';
            if (next_page == index_page)
                tool_html += '<div class="float-item"><span class="float-span">没有了</span></div>';
            else
                tool_html += '<div class="float-item" id="article-next"><span class="float-span">下一章</span></div>';

            tool_html += '<div class="float-pl" id="float-top" title="返回顶部"><a class="top-btn" href="javascript:void(0);">&gt;</a></div>' +
            '</div>';

            tool_html += '<div class="float-news" id="float-news" style="right:-450px;">'+
	            '<a class="float-close" href="javascript:void(0);">X</a>'+
	            '<div class="newslist">'+
	            '	<h3>评论</h3>'+
	            '	<div class="replylist" id="review_list" rel="' + pllist + '"></div>' +
	            '	<div class="ds-replybox">'+
	            '		<form id="replyform" method="post" action="' + sitedynamicurl + 'modules/article/reviews.php?aid=' + article_id + '" target="_blank">' +
                '           <input type="hidden" type="text" class="text" style="" name="ptitle" id="ptitle" maxlength="60" value="shotreplay" />' +
                '           <input type="hidden" name="action" id="action" value="newpost" />' +
                '           <input type="hidden" name="shortreply" value="1" />' +
	            '			<div class="ds-textarea-wrapper">'+
	            '				<textarea name="pcontent" id="pcontent" title="评论" placeholder="说点什么吧…"></textarea>'+
	            '			</div>'+
	            '			<div class="ds-post-toolbar">'+
	            '				<div class="ds-post-options ds-gradient-bg"><span class="ds-sync"></span></div>'+
	            '				<button class="ds-post-button" id="ds-post-allpl" type="submit" style="right: 108px;">所有评论</button>' +
                '				<button class="ds-post-button" id="ds-post-addpl" type="submit">发布</button>' +
	            '				<div class="ds-toolbar-buttons" id="ds-toolbar-buttons"></div>'+
	            '			</div>'+
	            '		</form>'+
	            '		</div>'+
	            '</div>'+
                '</div></div>';
            var obj = $(tool_html);
             $('.float-news', obj)
             $('.float-bar', obj).css('right', -2).show();
             $('.float-news', obj).css('right', -450).hide();
             
             var isloadedReview = false;
            $('#article-pl', obj).click(function () {
            	if(!isloadedReview && typeof(msc.review)=='function'){
            		isloadedReview = true;
            		msc.review();
            	}
            	
                $('.float-bar', obj).animate({
                    right: '-70px'
                }, 100, function () {
                    $('.float-bar', obj).hide();
                    $('.float-news', obj).show();
                    $('.float-news', obj).delay(50).animate({
                        right: '0px'
                    }, 300);
                });
                return false;
            });
            $('.float-close', obj).click(function () {
                $('.float-news', obj).animate({
                    right: '-450px'
                }, 300, function () {
                    $('.float-bar', obj).show();
                    $('.float-news', obj).hide();
                    $('.float-bar', obj).delay(50).animate({
                        right: '-2px'
                    }, 300);
                });
                return false;
            });
            
            $('#article-bookcase', obj).click(function () {
				url_bookcase = sitedynamicurl + 'modules/article/myaddbookcase.php?bid=' + article_id;
				if(chapter_id){
					url_bookcase = url_bookcase+'&cid='+chapter_id;
				}
                msc.addbookcase(url_bookcase , article_id);
            });

            $('#article-vote', obj).click(function () {
                msc.vote(sitedynamicurl + 'modules/article/myuservote.php?id=' + article_id, article_id);
            });

            $('#article-report', obj).click(function () {
                msc.dialog("report");//articlename, chaptername, location.href
                $('#report_title').val('《' + articlename + '》反馈！');
                $('#report_content_hide').val('标题：《' + articlename + '》' + chaptername + "\r\n网址：" + location.href + "\r\n详细内容：");

            });

            $('#article-prev', obj).click(function () {
                if (preview_page) window.location.href = preview_page;
            });

            $('#article-index', obj).click(function () {
                if (index_page) window.location.href = index_page;
            });

            $('#article-next', obj).click(function () {
                if (next_page) window.location.href = next_page;
            });

            $('#ds-post-allpl', obj).click(function () {
                window.location.href = pllist;
            });

            $('#ds-post-addpl', obj).click(function () {
                $('#replyform')[0].ptitle.value = "replyform";
                msc.postReview($('#replyform')[0]);
                return false;
            });
            
            $('#float-top', obj).hide().click(function () {
                var iebrws = document.all
                var cssfixedsupport=!iebrws || iebrws && document.compatMode=="CSS1Compat" && window.XMLHttpRequest //not IE or IE7+ browsers in standards mode
                var $body=(window.opera)? (document.compatMode=="CSS1Compat"? $('html') : $('body')) : $('html,body')
                $body.animate({scrollTop: 0}, 1000);
            });


            $('#article_page_login', obj).click(function () {
                return msc.dialog('login');
            });

            $('#article_page_logout', obj).click(function () {
                return msc.dialog('logout');
            });

            /*var logurl = memberurl + 'loginajax.php';
            msc.login(logurl, function (data) {
                if (data && data.islogin) {
                    $('#article_page_login', obj).hide();
                    $('#article_page_logout', obj).show();
                } else {
                    $('#article_page_login', obj).show();
                    $('#article_page_logout', obj).hide();
                }
            });*/

            $("body").append(obj);
            $('.float-bar', obj).efloat({ htype: "right", vtype: "top", offsetx: 2, offsety: 106 });
            $('.float-news', obj).efloat({ htype: "right", vtype: "top", offsetx: 450, offsety: '50%' });
            //$("#float-bar").efloat({ htype: "right", vtype: "top", offsetx: -10, offsety: '50%' });
            //$('.float-close', obj).click();
            //msc.review();

            if (UBBEditor) {
                UBBEditor.Create("pcontent", "ds-toolbar-buttons");
            }

            $(window).scroll(function () {
                if ((document.documentElement.scrollTop || document.body.scrollTop) > 0) {
                    $("#float-top").show();
                } else {
                    $("#float-top").hide();
                }
            });
        } catch (e) { }
    }
    function initFloatBar() {
    	
    }
    
    window.msc = $.extend(window.msc || {}, {
        floatbar: floatbar
    });
})(jQuery);

$.addLoadFunc(function () {
    msc.floatbar();
});




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




(function (jq) {
    var IsAutoPage = 0;
    var scrollspeed = 50;
    var scrollval = null;
    // var preview_page = "null";
    // var next_page = "null";
    var default_bgcolor = 'f1f1f1';
    function $(id) {
        return jq('#' + id)[0];
    }
    function $$(id) {
        try {
            return $(id).style;
        }
        catch (e) { }
    }
    /*设置阅读样式*/
    var bg, size, color, width, speed, autopage, line, fontfamily, night, scrlltype,textalign;
    function getReadSet() {
        GetStyleCookie();
        setFontFamily(fontfamily);
        setFontSize(size);
        setBgColor(bg);
        setFontColor(color);
        setWidth(width);
        setAlign(textalign);
        setscrlltype(scrlltype);
        setAutopage(autopage);
        setSpeed(speed);
        setLine(line);
        if (night == "1")
            jq(function () {
                setNight(true);
           })
    }
    function setAutopage(value) {
        if (value == true)
            IsAutoPage = 1;
        else
            IsAutoPage = 0;

        if (IsAutoPage == "1")
            jq('#autopage').attr('checked', true);
        else
            jq('#autopage').removeAttr('checked');
        if (IsAutoPage != autopage)
            SetCookie("autopage", IsAutoPage);
    }

    function setAutopgdn(value) {
        if (value == true)
            value = 1;
        else
            value = 0;

        if (autopgdn != value)
            SetCookie("autopgdn", value);
    }

    function setSpeed(value) {
        if (!value || value == 'undefined' || value < 1 || value > 10) {
            value = 5;
        }
        scrollspeed = value;
        jq('#winscrll option[value=' + value + ']').attr('selected', true);
        if (value != speed)
            SetCookie("speed", value);
        if (IsAutoPage == "1")
            scrollstart();
    }
    function setFontSize(type) {
        if (!type || type == 'undefined' || type == "")
            return null;
        $$("htmlContent").fontSize = type + "px";
        jq('#txtsize option[value=' + type + ']').attr('selected', true);
        if (type != size)
            SetCookie("size", type);

        try {
            for (i = 0; i < document.getElementsByTagName("img").length;
		i++) {
                if (document.getElementsByTagName("img")[i].className == "ci") {
                    if (eval(type) < 14)
                        document.getElementsByTagName("img")[i].style.height = eval(type - (-2)) + "px";
                    else if ((eval(type) >= 14) & (eval(type) < 20))
                        document.getElementsByTagName("img")[i].style.height = "";
                    else
                        document.getElementsByTagName("img")[i].style.height = eval(type - 2) + "px";
                }
            }
        }
        catch (e) { }
    }
    function setBgColor(mycolor) {
        if (!mycolor || mycolor == 'undefined' || mycolor == "")
            mycolor = default_bgcolor;
        document.bgColor = mycolor;
        //$$("ncon").background = mycolor;
        jq('#bcolor option[value=' + mycolor + ']').attr('selected', true);
        if (mycolor != bg)
            SetCookie("bg", mycolor);
        try {
            for (i = 0; i < document.getElementsByTagName("font").length;
		i++) {
                if (document.getElementsByTagName("font")[i].className == "cp") {
                    document.getElementsByTagName("font")[i].style.color = mycolor;
                }
            }
        }
        catch (e) { }

    }
    function setFontColor(mycolor) {
        if (!mycolor || mycolor == 'undefined' || mycolor == "")
            mycolor = "#000000";
        $$("htmlContent").color = mycolor;
        jq('#txtcolor option[value=' + mycolor + ']').attr('selected', true);
        if (mycolor != color)
            SetCookie("color", mycolor);
    }
    function setFontFamily(myfontfamily) {
        if (!myfontfamily || myfontfamily == 'undefined' || myfontfamily == "")
            myfontfamily = "微软雅黑";
        $$('htmlContent').fontFamily = myfontfamily;

        jq('#txtfontfamily option[value=' + myfontfamily + ']').attr('selected', true);
        if (myfontfamily != fontfamily)
            SetCookie("fontfamily", myfontfamily);
    }
    
    function setWidth(mywidth) {
        if (!mywidth || mywidth == 'undefined' || mywidth == "")
            $$('htmlContent').width = "98%";
        else
            $$('htmlContent').width = (mywidth==100?98:mywidth) + "%";
        
        jq('#pagewidth option[value=' + mywidth + ']').attr('selected', true);
        if (mywidth != width)
            SetCookie("width", mywidth);
    }
    
    function setAlign(mywidth) {
       if( mywidth == 'left'){
           jq('.contentbox').css('margin','0');
           jq('.contentbox').css('paddingLeft','0');
           jq('.nc_m').css('paddingLeft','0');
           jq('.wrapper_main').css('paddingLeft','50px');
           jq('.ad_div,.wrapper_main .h1title,.space_wz03').css('textAlign','left');
           jq(function(){
               jq('.ad_div').css('textAlign','left');        	   
           })
        }
       else{
    	   mywidth = mywidth || "";
           jq('.contentbox').css('margin','0 auto');
           jq('.contentbox').css('paddingLeft','23px');
           jq('.nc_m').css('paddingLeft','20px');
           jq('.wrapper_main').css('paddingLeft','8px');
           jq('.ad_div,.wrapper_main .h1title,.space_wz03').css('textAlign','center');
           jq(function(){
               jq('.ad_div').css('textAlign','center');        	   
           })
       }
        jq('#textalign option[value=' + mywidth + ']').attr('selected', true);
        if (mywidth != textalign)
            SetCookie("textalign", mywidth);
    }
    
    function setLine(myline) {
        if (!myline || myline == 'undefined' || myline == "")
            $$('htmlContent').lineHeight = "150%";
        else
            $$('htmlContent').lineHeight = myline + "%";

        jq('#txtline option[value=' + myline + ']').attr('selected', true);
        
        if (myline != line)
            SetCookie("line", myline);
    }

    function setNight(mynight) {
        if (mynight == true)
            mynight = 1;
        else
            mynight = 0;

        if (mynight == "1")
            jq('#night').attr('checked', true);
        else {
            jq('#night').removeAttr('checked');
        }
        if (mynight != night)
            SetCookie("night", mynight);
        if (mynight == "1") {
            $("night").checked = true;
            document.bgColor = "121212";
            $$("htmlContent").color = "#939392";
            jq('.wrapper_main .h1title').css('border-bottom', '1px solid #333');
            jq('.space_wz03 .a1').css('border-bottom', '1px dashed #333');
            jq('#bottom_anav .a1').css('border-bottom', '1px dashed #333');
            jq('#chapter_web_hot').css('background', 'transparent');
            jq('#chapter_web_hot').css('border', '1px solid #333');
            jq('#chapter_web_hot ul').css('background', 'transparent');
            
        } else {
            $("night").checked = false;
            document.bgColor = bg;
            $$("htmlContent").color = color;
            jq('.wrapper_main .h1title').css('border-bottom', '1px solid #d4d5da');
            jq('.space_wz03 .a1').css('border-bottom', '1px dashed #d4d5da');
            jq('#bottom_anav .a1').css('border-bottom', '1px dashed #d4d5da');
            jq('#chapter_web_hot').css('background', '#fbe5d9');
            jq('#chapter_web_hot').css('border', '1px solid #d4d5da');
            jq('#chapter_web_hot ul').css('background', '#ffffed');
        } 
    }

    function setscrlltype(mytype) {
        if (!mytype || mytype == 'undefined' || mytype == "")
            mytype = 1;

        jq('#winscrlltype option[value=' + mytype + ']').attr('selected', true);
        if (scrlltype != mytype) {
            SetCookie("scrlltype", mytype);
        }
    }

    //开始滚动
    var isautoscroll = false;
    function scrollstart() {
        if (!scrollspeed || scrollspeed == 'undefined')
            scrollspeed = 5;
        isautoscroll = !isautoscroll;
        if (scrlltype == 2)
            scrollval = setInterval("msc.scrollmove()", scrollspeed * 1000);
        else
            scrollval = setInterval("msc.scrollmove()", scrollspeed * 10);
    }
    function scrollstop() {
        clearInterval(scrollval);
    }
    function scrollmove() {
        if (scrlltype == 2) {
            window.scrollBy(0, 300);
        }
        else {
            window.scrollBy(0, 1);
        }
        //alert(document.body.scrollTop + '|' + document.body.scrollHeight);
        if (document.body.scrollTop == document.body.scrollHeight - 1000) {
            scrollstop();
            scrollturnpage();
        }
    }


    function scrollturnpage() {
        //alert(IsAutoPage + '|' + next_page);
        if (IsAutoPage == "1" && next_page != "null" && next_page != "")
            setTimeout("window.location.href = next_page ", 500);
    }

    /*设置阅读样式*/

    /*保存阅读样式*/
    function SetCookie(name, value) {
        var _array = new Array(bg, size, color, width, speed, autopage, line, fontfamily, night, scrlltype,textalign);
        if (name == "bg") {
            _array[0] = value;
            bg = value;
        }
        else if (name == "size") {
            _array[1] = value;
            size = value;
        }
        else if (name == "color") {
            _array[2] = value;
            color = value;
        }
        else if (name == "width") {
            _array[3] = value;
            width = value;
        }
        else if (name == "speed") {
            _array[4] = value;
            speed = value;
        }
        else if (name == "autopage") {
            _array[5] = value;
            autopage = value;
        }
        else if (name == "line") {
            _array[6] = value;
            line = value;
        }
        else if (name == "fontfamily") {
            _array[7] = value;
            fontfamily = value;
        }
        else if (name == "night") {
            _array[8] = value;
            night = value;
        }
        else if (name == "scrlltype") {
            _array[9] = value;
            scrlltype = value;
        }
        else if (name == "textalign") {
            _array[10] = value;
            textalign = value;
        }
        var _value = _array[0] + "|" + _array[1] + "|" + _array[2] + "|" + _array[3] + "|" + _array[4] + "|" + _array[5] + "|" + _array[6] + "|" + _array[7] + "|" + _array[8] + "|" + _array[9]+ "|" + _array[10];
        Cookie.Set('PageStyle2', _value, 1000);
    }


    /*读取阅读样式*/
    function GetStyleCookie() {
        var _str = Cookie.Get("PageStyle2");
        if (!_str) {
        	msc.DropMenus.hideall()
        	msc.DropMenus.show(1);
        }
        _v = _str.split("|")
        bg = _v[0];
        if (!bg) bg = "";
        size = _v[1];
        if (!size) size = "";
        color = _v[2];
        if (!color) color = "";
        width = _v[3];
        if (!width) width = "";
        speed = _v[4];
        if (!speed) speed = "";
        autopage = _v[5];
        if (!autopage) autopage = "";
        line = _v[6];
        if (!line) line = "";
        fontfamily = _v[7];
        if (!fontfamily) fontfamily = "";
        night = _v[8];
        if (!night) night = "";
        scrlltype = _v[9];
        if (!scrlltype) scrlltype = "";
        
        if(_v.length>10)textalign = _v[10];
        if (!textalign) textalign = "";
        
    }


    function WriteSelect1() {
        document.write('<table cellspacing="0" cellpadding="0" width="100%" align="center" border="0"><form id="booktexts" name="booktexts"><tr><td width="55%" bgcolor="#bfceda" colspan="2" height="26">');
        document.write('<div align="right">双击滚屏，<select name="winscrll" size="1" id="winscrll" onchange="setSpeed(this.value);"><option value="5" selected="selected">速度</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;');
        document.write('阅读设置：<select id="bcolor" onchange="setBgColor(this.value);" name="bcolor" size="1"><option value="#d0cfb2" selected="selected">阅读底色</option><option style="BACKGROUND-COLOR: #d0cfb2" value="d0cfb2">默认设置</option><option style="BACKGROUND-COLOR: #e9faff" value="e9faff">经典淡蓝</option><option style="BACKGROUND-COLOR: #f1f1f1" value="f1f1f1">经典淡灰</option><option style="BACKGROUND-COLOR: #eefaee" value="eefaee">经典绿意</option><option style="BACKGROUND-COLOR: #ffffed" value="ffffed">经典明黄</option><option style="BACKGROUND-COLOR: #4394d6" value="4394d6">深蓝海洋</option><option style="BACKGROUND-COLOR: #d0cfb2" value="d0cfb2">秋意盎然</option><option style="BACKGROUND-COLOR: #9fc383" value="9fc383">绿意淡雅</option><option style="BACKGROUND-COLOR: #fcefff" value="fcefff">红粉世家</option><option style="BACKGROUND-COLOR: #fbe5d9" value="fbe5d9">红谈意浓</option><option style="BACKGROUND-COLOR: #c2ceda" value="c2ceda">海阔天空</option><option style="BACKGROUND-COLOR: #616378" value="616378">心碎过去</option><option style="BACKGROUND-COLOR: #ffffff" value="ffffff">雪白天地</option><option style="BACKGROUND-COLOR: #cccccc" value="cccccc">灰色世界</option></select>&nbsp;');
        document.write('<select id="txtsize" onchange="setFontSize(this.value)" name="txtsize" size="1"><option value="10" selected="selected">字体大小</option><option value="11">默认设置</option><option value="9">小</option><option value="13">中</option><option value="15">中大</option><option value="17">大</option></select>&nbsp;');
        document.write('<select name="txtcolor" id="txtcolor" onchange="setFontColor(this.value)" size="1"><option value="#000000" selected="selected">字体颜色</option><option value="#000000">默认设置</option><option value="#ffffff" style="BACKGROUND-COLOR: #FFFFFF">白色</option><option value="#ff0000" style="BACKGROUND-COLOR: #ff0000">红色</option><option value="#006600" style="BACKGROUND-COLOR: #006600">绿色</option><option value="#0000ff" style="BACKGROUND-COLOR: #0000ff">蓝色</option><option value="#660000" style="BACKGROUND-COLOR: #660000">棕色</option></select>&nbsp;');
        //document.write('<input id="saveset" onclick="saveSet()" type="button" value="保存设置" name="saveset" />&nbsp;');
        document.write("<input type='checkbox' onclick='javascript:setAutopage(this.checked);' id='autopage' name='autopage'/>自动翻页");
        document.write('</div>');
        document.write('</td></tr></form><tr><td></td></tr></table>');

    }
    function WriteSelect() {
        // document.write('<form id="booktexts" name="booktexts">');

        var bookTextHtml = '';
        bookTextHtml += '<table>';
        bookTextHtml += '<tr><td align="right">双击&nbsp;</td><td><select name="winscrlltype" size="1" id="winscrlltype" onchange="msc.setscrlltype(this.value);"><option value="1" selected="selected">滚屏</option><option value="2">翻屏</option></select>&nbsp;</td></tr>';
        bookTextHtml += '<tr><td align="right">滚屏/翻屏速度&nbsp;</td><td><select name="winscrll" size="1" id="winscrll" onchange="msc.setSpeed(this.value);"><option value="5" selected="selected">默认</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select>&nbsp;</td></tr>';
        bookTextHtml += '<tr><td align="right">阅读底色&nbsp;</td><td><select id="bcolor" onchange="msc.setBgColor(this.value);" name="bcolor" size="1"><option style="BACKGROUND-COLOR: #f1f1f1" value="f1f1f1" selected="selected">默认底色</option><option style="BACKGROUND-COLOR: #e9faff" value="e9faff">经典淡蓝</option><option style="BACKGROUND-COLOR: #f1f1f1" value="f1f1f1">经典淡灰</option><option style="BACKGROUND-COLOR: #eefaee" value="eefaee">经典绿意</option><option style="BACKGROUND-COLOR: #ffffed" value="ffffed">经典明黄</option><option style="BACKGROUND-COLOR: #4394d6" value="4394d6">深蓝海洋</option><option style="BACKGROUND-COLOR: #d0cfb2" value="d0cfb2">秋意盎然</option><option style="BACKGROUND-COLOR: #9fc383" value="9fc383">绿意淡雅</option><option style="BACKGROUND-COLOR: #fcefff" value="fcefff">红粉世家</option><option style="BACKGROUND-COLOR: #fbe5d9" value="fbe5d9">红谈意浓</option><option style="BACKGROUND-COLOR: #c2ceda" value="c2ceda">海阔天空</option><option style="BACKGROUND-COLOR: #616378" value="616378">心碎过去</option><option style="BACKGROUND-COLOR: #ffffff" value="ffffff">雪白天地</option><option style="BACKGROUND-COLOR: #cccccc" value="cccccc">灰色世界</option></select>&nbsp;</td></tr>';
        bookTextHtml += '<tr><td align="right">内容字体&nbsp;</td><td><select id="txtfontfamily" onchange="msc.setFontFamily(this.value)" name="txtfontfamily" size="1"><option value="微软雅黑" selected="selected">默认</option><option value="微软雅黑">雅黑</option><option value="宋体">宋体</option><option value="黑体">黑体</option></select>&nbsp;</td></tr>';
        bookTextHtml += '<tr><td align="right">字体大小&nbsp;</td><td><select id="txtsize" onchange="msc.setFontSize(this.value)" name="txtsize" size="1"><option value="16" selected="selected">默认</option><option value="12">小</option><option value="14">中</option><option value="16">中大</option><option value="20">大</option><option value="24">较大</option><option value="28">很大</option></select>&nbsp;</td></tr>';
        bookTextHtml += '<tr><td align="right">字体颜色&nbsp;</td><td><select name="txtcolor" id="txtcolor" onchange="msc.setFontColor(this.value)" size="1"><option value="#000000" selected="selected">默认</option><option value="#ffffff" style="BACKGROUND-COLOR: #FFFFFF">白色</option><option value="#ff0000" style="BACKGROUND-COLOR: #ff0000">红色</option><option value="#006600" style="BACKGROUND-COLOR: #006600">绿色</option><option value="#0000ff" style="BACKGROUND-COLOR: #0000ff">蓝色</option><option value="#660000" style="BACKGROUND-COLOR: #660000">棕色</option></select>&nbsp;</td></tr>';
        bookTextHtml += '<tr><td align="right">内容行距&nbsp;</td><td><select id="txtline" onchange="msc.setLine(this.value)" name="txtline" size="1"><option value="150" selected="selected">默认</option><option value="100">小</option><option value="150">中</option><option value="200">大</option></select>&nbsp;</td></tr>';
        bookTextHtml += '<tr><td align="right">页面宽度&nbsp;</td><td><select id="pagewidth" onchange="msc.setWidth(this.value)" name="pagewidth" size="1"><option value="" selected="selected">默认</option><option value="50">50%</option><option value="60">60%</option><option value="70">70%</option><option value="80">80%</option><option value="90">90%</option><option value="100">100%</option></select>&nbsp;</td></tr>';
        bookTextHtml += '<tr><td align="right">对齐方式&nbsp;</td><td><select id="textalign" onchange="msc.setAlign(this.value)" name="textalign" size="1"><option value="" selected="selected">默认</option><option value="center">居中</option><option value="left">左对齐</option></select>&nbsp;</td></tr>';
        //bookTextHtml += '<tr><td align="right"></td><td><input id="saveset" onclick="saveSet()" type="button" value="保存设置" name="saveset" />&nbsp;</td></tr>';
        bookTextHtml += '<tr><td align="right"></td><td><input type="checkbox" onclick="javascript:msc.setAutopage(this.checked);" id="autopage" name="autopage"/>自动翻页</td></tr>';
        bookTextHtml += '</table>';


        var watchingHtml = '';
        watchingHtml += '<div>';
        watchingHtml += '<div class="watching pageWatching" id="watching" style="display:inline-block;float:left;width: 170px;margin-right:0;"><div class="dropmenu" style="float: left;width: 75px;"><div class="handle">阅读历史</div><div class="panel" ><div id="mini_panel"> 正在加载中,请稍候....</div></div></div>';
        watchingHtml += '<div class="dropmenu"  style="float: left;width: 75px;margin-left: 10px;"><div class="handle" style="color:#C00;">阅读策略</div><div class="panel" ><div id="mini_panel_booktext">' + bookTextHtml + '</div></div></div></div>';
        watchingHtml += '<span><input type="checkbox" onclick="javascript:msc.setNight(this.checked);" id="night" name="night"/>&nbsp;关灯&nbsp;&nbsp;&nbsp;&nbsp;</span>';
        watchingHtml += '</div>';

        jq('#top_style_area').html(watchingHtml);
        msc.DropMenus.init('watching');

    }

    function init() {
        document.onmousedown = scrollstop;
        document.ondblclick = scrollstart;
    }
    window.msc = jq.extend(window.msc || {}, {
        setBgColor: setBgColor,
        setFontSize: setFontSize,
        setLine: setLine,
        setFontFamily: setFontFamily,
        setSpeed: setSpeed,
        setFontColor: setFontColor,
        setAutopage: setAutopage,
        getReadSet: getReadSet,
        WriteSelect: WriteSelect,
        init: init,
        scrollmove: scrollmove,
        setscrlltype: setscrlltype,
        setNight: setNight,
        setWidth: setWidth,
        setAlign:setAlign
    });
})(jQuery);

$.addLoadFunc(function () {
    msc.init();
});


var preview_page = "null";
var next_page  = "null";

//预加载下一页
function readyload(uri) {
    uri = uri || next_page ;
    if (uri != "") {
        $.get(uri);
    }
}

//复制本页
function copyToClipBoard() {
    var clipBoardContent = "";
    clipBoardContent += document.title;
    clipBoardContent += "\n";
    clipBoardContent += this.location.href;
    window.clipboardData.setData("Text", clipBoardContent);
    alert("复制成功");
}


function KeyDown() {
    var event = document.all ? window.event : arguments[0];

    if (!event) return;
    if (event.keyCode == 37) document.location = preview_page;
    if (event.keyCode == 39) document.location = next_page;
    if (event.keyCode == 13) document.location = index_page;
}


var pagerightadh = 0;
$(function () {
   /* $(document).scroll(function () {
        //if (msc.History.chapterlen() < 15) return;
        var al = $('#pagerightad .adcomp_gg').length;
        al = al - 1;
        if (al > 0) {
            var of = $('#pagerightad .myad_wrap').eq(0).offset();
            var lof = $('#pagerightad .myad_wrap:first').innerHeight();
            var tl = $('#topnav').innerHeight();
            if ($('#pagerightad').css('position') == 'fixed') {
                if (document.body.scrollTop > pagerightadh + tl - 10 - lof) {
                }
                else {
                    $('#pagerightad .myad_wrap').show();
                    $('#pagerightad').css({ 'position': 'absolute', 'top': '0px' });
                }
            }
            else {
                if (document.body.scrollTop > pagerightadh - lof + tl-10) {
                    var ii = Math.round(al * Math.random());
                    pagerightadh = $('#pagerightad').outerHeight();
                    $('#pagerightad .myad_wrap').not('.adcomp_gg').hide();
                    $('#pagerightad .myad_wrap.adcomp_gg').not(':eq(' + ii + ')').hide();
                    $('#pagerightad').css({ 'position': 'fixed', 'top': '-' + (of.top - tl) + 'px' });
                }
                else {
                }
            }
        }
    });
*/
    document.onkeydown = KeyDown;
    /*$(document).scroll(function () {
    	if(document.body.scrollTop<100){
    		$('#topnav').fadeIn();
    	}
    	else{
    		$('#topnav').fadeOut();
    	}
    });*/
    readyload();
});

var ubb_subdiv;
var UBBEditor = {
	Create : function(eid,tid){
		this.siteUrl = 'http://a.qtshu.com';
		this.TextId = eid;
		this.TextBox = document.getElementById(this.TextId);
		this.Menu = document.getElementById(tid);
		this.Init();
	},
	Init : function(){
		this.SmileList();
	},
	GetPosition : function(obj) {
		var r = new Array();
		r['x'] = obj.offsetLeft;
		r['y'] = obj.offsetTop;
		while(obj = obj.offsetParent) {
			if($(obj).css('position') == 'absolute' || $(obj).css('position') == 'relative') break;
			r['x'] += obj.offsetLeft;
			r['y'] += obj.offsetTop;
		}
		return r;
	},
	InsertText : function(eid,text){
		var obj = document.getElementById(eid);
		 var objLength=obj.value.length;
		obj.focus();
		if(typeof document.selection != "undefined"){
			document.selection.createRange().text = text;  
		}else{
			var st = obj.selectionStart;
			obj.value = obj.value.substr(0, st) + text + obj.value.substring(st, objLength);
			obj.setSelectionRange(st + text.length, st + text.length);  
		}
	},
	SmileList : function(){
		var menuSmileList = document.createElement("input");
		menuSmileList.type = "button";
		menuSmileList.id = "menuItemSmileList";
		menuSmileList.title = "表情";
		menuSmileList.className = "UBB_MenuItem";
		menuSmileList.style.backgroundImage = "url('" + this.siteUrl + "/images/ubb/bb_smile.gif" + "')";
		this.Menu.appendChild(menuSmileList);

		var smList = [];
		smList.push(['/:O', '1.gif', '惊讶']);
		smList.push(['/:~', '2.gif', '撇嘴']);
		smList.push(['/:*', '3.gif', '色色']);
		smList.push(['/:|', '4.gif', '发呆']);
		smList.push(['/8-)', '5.gif', '得意']);
		smList.push(['/:LL', '6.gif', '流泪']);
		smList.push(['/:$', '7.gif', '害羞']);
		smList.push(['/:X', '8.gif', '闭嘴']);
		smList.push(['/:Z', '9.gif', '睡觉']);
		smList.push(['/:`(', '10.gif', '大哭']);
		smList.push(['/:-', '11.gif', '尴尬']);
		smList.push(['/:@', '12.gif', '发怒']);
		smList.push(['/:P', '13.gif', '调皮']);
		smList.push(['/:D', '14.gif', '呲牙']);
		smList.push(['/:)', '15.gif', '微笑']);
		smList.push(['/:(', '16.gif', '难过']);
		smList.push(['/:+', '17.gif', '耍酷']);
		smList.push(['/:#', '18.gif', '禁言']);
		smList.push(['/:Q', '19.gif', '抓狂']);
		smList.push(['/:T', '20.gif', '呕吐']);

		var smCol = 4;
		var smTB = "<table border='0' cellpadding='0' cellspacing='" + smCol + "'>";
		count = smList.length;
		point = 0;
		cols = 0;
		while(point < count){
			if(cols == 0) smTB += "<tr>";
			smTB +="<td><img src='" + this.siteUrl + "/images/smiles/" + smList[point][1] + "' title='" + smList[point][2] + "' style='cursor:pointer' onclick='UBBEditor.InsertText(\""+this.TextId+"\", \"" + smList[point][0] + "\")' /></td>";
			cols++;
			if(cols >= smCol){
				smTB += "</tr>";
				cols = 0;
			}
			point++;
		}
		if(cols > 0) smTB += "</tr>";
		smTB += "</table>";

		var smlst = document.createElement("div");
		smlst.id = "SmileListTable";
		smlst.style.display = "none";
		smlst.className = "UBB_SmileList";
		smlst.innerHTML = smTB;
		this.TextBox.parentNode.insertBefore(smlst, this.TextBox);
		menuSmileList.onclick = function(e){
			if(ubb_subdiv){
				hideeve(ubb_subdiv);
			}
			ubb_subdiv = smlst.id;
			if(smlst.style.display == "none"){
				smlst.style.display = "";
				var p = UBBEditor.GetPosition(menuSmileList);		
				smlst.style.left = p['x']+'px';
				smlst.style.top = (p['y'] + 20)+'px';
			}

			var evt = (window.event || e);

			if(evt.preventDefault){
				evt.preventDefault();
				evt.stopPropagation();
			}else{
				evt.cancelBubble = true;
				evt.returnValue = false;
			}

			if(document.attachEvent){
				document.attachEvent("onclick", function(){smlst.style.display = "none";});
			}else{
				document.addEventListener("click", hideeve, false);
			}
		};
	}
}
function hideeve(){
	document.getElementById(ubb_subdiv).style.display = "none";
}

function showads(adid) {
if (adid == 'pagetopad1') {

/*谷歌横幅1 728x90(内页)*/
document.writeln("<!--article_pagetopad1-->\r\n<div class=\"myad_wrap adcomp_gg\">\r\n<script type=\"text/javascript\"><!--\ngoogle_ad_client = \"ca-pub-9046430709022222\";\n/* 内页横幅1 */\ngoogle_ad_slot = \"3489730002\";\ngoogle_ad_width = 728;\ngoogle_ad_height = 90;\n//-->\n</script>\n<script type=\"text/javascript\"\nsrc=\"http://pagead2.googlesyndication.com/pagead/show_ads.js\">\n</script>\r\n</div>");
}
else if (adid == 'pagetopad2') {

/*谷歌横幅2 728x90(内页)*/
document.writeln("<!--article_pagetopad2-->\r\n<div class=\"myad_wrap adcomp_gg\">\r\n<script type=\"text/javascript\"><!--\ngoogle_ad_client = \"ca-pub-9046430709022222\";\n/* 内页横幅2 */\ngoogle_ad_slot = \"2749843332\";\ngoogle_ad_width = 728;\ngoogle_ad_height = 90;\n//-->\n</script>\n<script type=\"text/javascript\"\nsrc=\"http://pagead2.googlesyndication.com/pagead/show_ads.js\">\n</script>\r\n</div>");
}
else if (adid == 'sharescript') {

/*百度分享_article_sharescript*/
document.getElementById("bdshell_js").src = "http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + Math.ceil(new Date()/3600000)
}
else if (adid == 'pagetxtad1') {

/*谷歌横幅4 728x90(内页)*/
document.writeln("<!--article_pagetxtad1-->\r\n<div class=\"myad_wrap adcomp_gg\">\r\n<script type=\"text/javascript\"><!--\ngoogle_ad_client = \"ca-pub-9046430709022222\";\n/* 内页横幅3 */\ngoogle_ad_slot = \"9236769396\";\ngoogle_ad_width = 728;\ngoogle_ad_height = 90;\n//-->\n</script>\n<script type=\"text/javascript\"\nsrc=\"//pagead2.googlesyndication.com/pagead/show_ads.js\">\n</script>\r\n</div>");
}
}

function showstat() {
document.writeln("<!--default--><script>\nvar _hmt = _hmt || [];\n(function() {\n  var hm = document.createElement(\"script\");\n  hm.src = \"//hm.baidu.com/hm.js?726dafde1ca84e6b92a2710cddc694c1\";\n  var s = document.getElementsByTagName(\"script\")[0]; \n  s.parentNode.insertBefore(hm, s);\n})();\n</script>\n");
}


