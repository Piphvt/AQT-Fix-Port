(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{802:function(t,e,n){"use strict";n.r(e);var c=n(638),l=n(230),o=n(101),d=n(651),r=n(225),f={props:{open:{required:!0}},methods:{cancel:function(){this.$emit("update:open",!1),this.$emit("cancel-fetch")}}},h=n(64),component=Object(h.a)(f,(function(){var t=this,e=t._self._c;return e(d.a,{attrs:{persistent:"","max-width":"300","max-height":"300","content-class":"rounded-xl"},model:{value:t.open,callback:function(e){t.open=e},expression:"open"}},[e(l.a,{staticClass:"d-flex flex-column justify-space-between",staticStyle:{"min-height":"200px"}},[e("div",{staticClass:"d-flex justify-center mt-3",staticStyle:{"text-align":"center",padding:"0 15px"}},[e(r.a,[t._v("mdi-loading")]),t._v("กำลังดาวน์โหลดข้อมูล...\n        ")],1),t._v(" "),e("div",{staticClass:"d-flex justify-center mt-0"},[e("img",{attrs:{src:"http://localhost:3001/file/default/close_price.gif",alt:"Loading",width:"150"}})]),t._v(" "),e(o.a,{staticClass:"justify-center mb-2"},[e(c.a,{staticClass:"rounded-xl font-weight-medium",staticStyle:{color:"white"},attrs:{color:"#e50211"},on:{click:t.cancel}},[t._v("\n                ยกเลิก\n            ")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);