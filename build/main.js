#!/usr/bin/env node
!function(e,r){for(var t in r)e[t]=r[t]}(exports,function(e){var r={};function t(n){if(r[n])return r[n].exports;var u=r[n]={i:n,l:!1,exports:{}};return e[n].call(u.exports,u,u.exports,t),u.l=!0,u.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var u in e)t.d(n,u,function(r){return e[r]}.bind(null,u));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r,t){e.exports=t(1)},function(e,r,t){"use strict";var n=t(2);Object.defineProperty(r,"__esModule",{value:!0}),r.getPkgProp=function(e,r){if(c.default.nullOrUndefined(e))return null;var t=(0,c.default)(r);try{switch(t){case"undefined":return b(e);case"string":return x(e,r);case"Object":return g(e,r);default:k("getPkgProp","Unrecognized argument type")}}catch(e){k("getPkgProp","handler failed",e)}},r.handleUndefined=b,r.handleString=x,r.handleObject=g,r.handleError=k,r.getPkgUpJSON=function(){return O.apply(this,arguments)};var u=n(t(3)),a=n(t(4)),o=n(t(5)),i=n(t(6)),c=n(t(7)),f=n(t(8)),l=n(t(9)),d=n(t(10)),s=t(11),p=console.log;function b(e){return h.apply(this,arguments)}function h(){return(h=(0,o.default)(a.default.mark(function e(r){var t;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!c.default.nullOrUndefined(r)){e.next=2;break}return e.abrupt("return",null);case 2:return e.prev=2,e.next=5,(0,f.default)();case 5:t=e.sent,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),k("handleUndefined",e.t0,"pkgUp failed");case 11:return e.abrupt("return",x(r,t));case 12:case"end":return e.stop()}},e,null,[[2,8]])}))).apply(this,arguments)}function x(e){return y.apply(this,arguments)}function y(){return(y=(0,o.default)(a.default.mark(function e(r){var t,n,u,o=arguments;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=o.length>1&&void 0!==o[1]?o[1]:process.cwd(),!c.default.nullOrUndefined(r)){e.next=3;break}return e.abrupt("return",null);case 3:return!1===(u=t).endsWith("package.json")&&(u=i.default.resolve(u,"package.json")),e.prev=5,e.next=8,l.default.readJson(u);case 8:n=e.sent,e.next=14;break;case 11:e.prev=11,e.t0=e.catch(5),k("handleString",e.t0,"readJson failed");case 14:return e.abrupt("return",g(r,n));case 15:case"end":return e.stop()}},e,null,[[5,11]])}))).apply(this,arguments)}function g(e,r){return v.apply(this,arguments)}function v(){return(v=(0,o.default)(a.default.mark(function e(r,t){var n,o;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!c.default.nullOrUndefined(r)){e.next=2;break}return e.abrupt("return",null);case 2:return o=t,c.default.object(o)&&(!1===o.hasOwnProperty(r)?k("handleObject","property not found"):Object.entries(o).map(function(e){var t=(0,u.default)(e,2),a=t[0],o=t[1];a===r&&(n=o)})),e.abrupt("return",n);case 5:case"end":return e.stop()}},e)}))).apply(this,arguments)}function k(e,r,t){return e&&(0,s.printLine)("red"),c.default.undefined(e)||p("".concat(d.default.red(e))),c.default.undefined(t)||((0,s.printLine)({character:".",color:"grey"}),p("".concat(d.default.grey(t))),(0,s.printLine)({character:".",color:"grey"})),c.default.undefined(r)||p("".concat(d.default.red(r))),(0,s.printLine)("red"),!1}function O(){return(O=(0,o.default)(a.default.mark(function e(){var r;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,f.default)();case 2:return r=e.sent,e.next=5,l.default.readJson(r);case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}},e)}))).apply(this,arguments)}},function(e,r){e.exports=require("@babel/runtime/helpers/interopRequireDefault")},function(e,r){e.exports=require("@babel/runtime/helpers/slicedToArray")},function(e,r){e.exports=require("@babel/runtime/regenerator")},function(e,r){e.exports=require("@babel/runtime/helpers/asyncToGenerator")},function(e,r){e.exports=require("path")},function(e,r){e.exports=require("@sindresorhus/is")},function(e,r){e.exports=require("pkg-up")},function(e,r){e.exports=require("fs-extra")},function(e,r){e.exports=require("chalk")},function(e,r){e.exports=require("tacker")}]));
//# sourceMappingURL=main.js.map