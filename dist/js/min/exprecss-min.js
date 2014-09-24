!function(){"use strict";var e=angular.module("exprecss",[]).run(function(e,n,t){t.on("click",function(e){(e.target.className.indexOf("btn-responsive-nav")>=0||e.target.className.indexOf("btn-responsive-nav-close")>=0)&&(angular.element(t[0].querySelector(".navbar ul")).toggleClass("nav-close nav-open"),e.preventDefault())}),t.on("click",function(e){if(e.target.className.indexOf("btn-dropdown")>=0){var n=angular.element(e.target),a=angular.element(t[0].querySelector("#"+n.attr("data-for")||n.attr("for")));e.preventDefault(),a.toggleClass("dropdown-menu-container-inactive dropdown-menu-container-active"),n[0].focus(),n.one("blur",function(){a.removeClass("dropdown-menu-container-inactive"),a.addClass("dropdown-menu-container-inactive")})}}),e.errorConfirm=function(){n("Error","Something real bad just now!","Freak out","Ignore").then(function(){alert("You freaked out")},function(){alert("You ignored it")})},e.errorAlert=function(){n("Error","Something real bad just now!","Whatever").then(function(){alert("You dismissed alert")})}});e.service("$expModal",function(e,n,t){var a=n.$new(!0),r=angular.element(t[0].body),i=e('<div class="modal-overlay" ng-if="showOverlay" ng-click="close()"></div>')(a,function(e){r.append(e)}),l={},o=0;this.showOverlay=function(e){a.showOverlay=!0,a.close=e},this.hideOverlay=function(){a.showOverlay=!1},this.register=function(n,t){var a=angular.extend({title:"Modal Title",html:"Modal Html"},n);return l[o]=e(angular.element('<div exp-modal-open="isOpen" exp-modal="'+a.title+'">'+a.html+"</div>"))(t),r.append(l[o]),o++},this.deregister=function(e){r.remove(l[e]),delete l[e]}}),e.factory("$expConfirm",function(e,n,t,a,r,i){var l=function(l,o,c,s,u){var d=e.defer(),f=n.$new(),v=angular.element(r[0].body);u=u||{};var p=angular.extend({headerClass:"modal-header-info",confirmClass:"btn-primary",cancelClass:"btn-primary"},u);angular.extend(f,{title:l,html:i.trustAsHtml(o),confirmText:c||"Okay",cancelText:s,headerClass:[p.headerClass],confirmClass:[p.confirmClass],cancelClass:[p.cancelClass],open:!0});var m=t(angular.element("<div exp-confirm></div>"))(f,function(e){v.append(e)}),h=function(){m.remove(),a.hideOverlay(),d.reject()},g=function(){m.remove(),a.hideOverlay(),d.resolve()};return angular.extend(f,{cancel:h,confirm:g}),s?(r.on("keyup",function y(e){27===e.which?(h(),r.off("keyup",y)):13===e.which&&(g(),r.off("keyup",y))}),a.showOverlay(h)):(a.showOverlay(g),r.on("keyup",function k(e){(27===e.which||13===e.which)&&(g(),r.off("keyup",k))})),d.promise};return l}),e.directive("expConfirm",function(e){return{restrict:"AE",template:'<div class="modal" ng-if="open">\n    <div class="modal-header" ng-class="headerClass">{{ title }}</div>\n    <div class="modal-body" ng-bind-html="html">\n    </div>\n    <div class="modal-footer">\n        <a class="btn float-left" id="cancel-modal-btn" ng-class="cancelClass" ng-if="cancelText" ng-click="cancel()">{{ cancelText }}</a>\n        <a class="btn float-right" id="confirm-modal-btn" ng-class="confirmClass" ng-click="confirm()">{{ confirmText }}</a>\n    </div>\n</div>',link:function(e,n,t){}}}),e.directive("expModal",function(e){return{restrict:"AE",scope:{title:"@expModal",open:"=expModalOpen"},templateUrl:"dist/templates/modal.html",transclude:!0,link:function(n,t,a){var r=function(){n.open=!1};n.$watch("open",function(n){n?e.showOverlay(r):e.hideOverlay()}),n.close=function(){n.open=!1}}}}),e.directive("expModalClick",function(e){return{restrict:"A",scope:{title:"@expModalClick",html:"@expModalClickHtml"},link:function(n,t,a){n.isOpen=!1;var r=e.register({title:n.title,html:n.html},n);t.on("click",function(e){n.isOpen=!0,n.$apply()}),n.$on("$destroy",function(){e.deregister(r)})}}}),e.directive("expMask",function(e){var n=/[\(\)\[\]0-9\-\s]+/,t=/[\(\)\[\]\s\-]/g,a=/[\(\)\[\]\s\-]/,r=function(e,n){var t=0,r=e.length,i="";for(var l in n){var o=n.charAt(l);if(a.test(o))i+=o;else{if(t>=r)break;i+=e[t++]}}return i},i=function(e){return e.replace(t,"").split("")},l=function(e){var n=[];for(var t in e)a.test(e[t])||n.push(+t);return n.push(n[n.length-1]+1),n.shift(),n},o=function(e){var n=0,t=[];for(var r in e)t.push(n),a.test(e[r])||n++;return t.push(t[t.length-1]),t};return{restrict:"A",scope:!0,require:"?ngModel",link:function(t,a,c,s){var u=c.expMask,d=l(u),f=o(u);n.test(u)||e.error("Invalid mask for input"),s&&(s.$render=function(){angular.isString(s.$modelValue)&&a.val(r(i(s.$modelValue),u))}),a.on("keydown",function(e){if(8===e.which){e.preventDefault();var n=a[0].selectionStart,l=a[0].selectionEnd,o=l-n,c=a.val(),d,f;0===o?((d=c.split("")).splice(n-1,1),c=d.join(""),f=n-1):((d=c.split("")).splice(n,o),c=d.join(""),f=n);var v=r(i(c),u);a.val(v),s&&t.$apply(function(){s.$setViewValue(v)}),a[0].selectionStart=a[0].selectionEnd=f}}),a.on("keypress",function(e){e.preventDefault();var n=a[0].selectionStart,l=a[0].selectionEnd,o=l-n,c=a.val(),v,p=String.fromCharCode(e.which);/[0-9]/.test(p)&&(0===o?((v=c.split("")).splice(n,0,p),c=v.join("")):((v=c.split("")).splice(n,o,p),c=v.join("")));var m=r(i(c),u);a.val(m),s&&t.$apply(function(){s.$setViewValue(m)}),a[0].selectionStart=a[0].selectionEnd=d[f[n]]})}}})}();