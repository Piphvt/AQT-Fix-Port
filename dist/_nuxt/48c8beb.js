(window.webpackJsonp=window.webpackJsonp||[]).push([[59,26],{676:function(e,n,t){"use strict";t.r(n);var r=t(638),o=t(230),c=t(101),l=t(651),d=t(639),m=t(225),f={props:{method:{type:Function,default:null},open:{required:!0},message:{type:String}},watch:{open:function(e){e?document.addEventListener("keydown",this.handleKeydown):document.removeEventListener("keydown",this.handleKeydown)}},data:function(){return{}},methods:{confirm:function(){null===this.method||this.method(),this.$emit("update:warning",!1)},handleKeydown:function(e){"Enter"===e.key&&this.confirm()}}},h=t(64),component=Object(h.a)(f,(function(){var e=this,n=e._self._c;return n(l.a,{attrs:{persistent:"","retain-focus":!1,"max-width":"350","max-height":"300","content-class":"rounded-xl"},on:{keydown:function(n){return!n.type.indexOf("key")&&e._k(n.keyCode,"enter",13,n.key,"Enter")?null:e.confirm.apply(null,arguments)}},model:{value:e.open,callback:function(n){e.open=n},expression:"open"}},[n(o.a,[n(c.d,{staticClass:"d-flex align-center justify-center text-h6"},[n(m.a,{staticClass:"mr-3",attrs:{size:"40",color:"#e50211"}},[e._v("mdi-account-alert")]),e._v("\n      คำเตือน\n    ")],1),e._v(" "),n(d.a,{staticClass:"mb-3"}),e._v(" "),n(c.c,{staticClass:"text-center"},[e._v("\n      "+e._s(e.message)+"\n    ")]),e._v(" "),n(c.a,{staticClass:"justify-center"},[n(r.a,{staticClass:"rounded-xl font-weight-medium mt-0",attrs:{color:"#24b224"},on:{click:e.confirm}},[e._v("\n        ตกลง\n      ")])],1)],1)],1)}),[],!1,null,null,null);n.default=component.exports},948:function(e,n,t){"use strict";t.r(n);var r=t(2),o=(t(6),t(43),t(34),t(1));t.n(o).a.locale("th");var c={layout:"default",mounted:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.checkRank();case 2:case"end":return n.stop()}}),n)})))()},data:function(){return{modal:{warning:{open:!1,message:"ผู้ใช้นี้ยังไม่ได้รับการอนุมัติ"}}}},methods:{checkRank:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var t,r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!e.$auth.loggedIn){n.next=13;break}if(t=e.$auth.user.status.toString(),r=e.$auth.user.ranks_id.toString(),"2"!==t){n.next=10;break}return e.$router.push("/"),e.modal.warning.open=!0,n.next=8,e.$auth.logout();case 8:n.next=11;break;case 10:"1"===r||"2"===r||"3"===r?e.$router.push("/auth"):e.$router.push("/");case 11:n.next=14;break;case 13:e.$router.push("/");case 14:case"end":return n.stop()}}),n)})))()}}},l=t(64),component=Object(l.a)(c,(function(){var e=this,n=e._self._c;return n("div",[n("ModalWarning",{attrs:{open:e.modal.warning.open,message:e.modal.warning.message,warning:e.modal.warning.open},on:{"update:warning":function(n){return e.$set(e.modal.warning,"open",n)}}})],1)}),[],!1,null,null,null);n.default=component.exports;installComponents(component,{ModalWarning:t(676).default})}}]);