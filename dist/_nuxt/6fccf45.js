(window.webpackJsonp=window.webpackJsonp||[]).push([[54,21,23],{670:function(e,t,n){"use strict";n.r(t);var r=n(638),o=n(230),c=n(101),l=n(651),d=n(639),m=n(225),f={props:{method:{type:Function,default:null},open:{required:!0},message:{type:String}},watch:{open:function(e){e?document.addEventListener("keydown",this.handleKeydown):document.removeEventListener("keydown",this.handleKeydown)}},data:function(){return{}},methods:{confirm:function(){null===this.method||this.method(),this.$emit("update:complete",!1)},handleKeydown:function(e){"Escape"===e.key&&this.confirm()}}},h=n(64),component=Object(h.a)(f,(function(){var e=this,t=e._self._c;return t(l.a,{attrs:{persistent:"","retain-focus":!1,"max-width":"300","max-height":"300","content-class":"rounded-xl"},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"])?null:e.confirm.apply(null,arguments)}},model:{value:e.open,callback:function(t){e.open=t},expression:"open"}},[t(o.a,[t(c.d,{staticClass:"d-flex align-center justify-center text-h6"},[t(m.a,{staticClass:"mr-3",attrs:{color:"#24b224",size:"40"}},[e._v("mdi-check-circle")]),e._v("\n      สำเร็จ\n    ")],1),e._v(" "),t(d.a,{staticClass:"mb-3"}),e._v(" "),t(c.c,{staticClass:"text-center"},[e._v("\n      "+e._s(e.message)+"\n    ")]),e._v(" "),t(c.a,{staticClass:"justify-center"},[t(r.a,{staticClass:"rounded-xl font-weight-medium mt-0",attrs:{color:"#24b224"},on:{click:e.confirm}},[e._v("\n        ตกลง\n      ")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports},677:function(e,t,n){"use strict";n.r(t);var r=n(638),o=n(230),c=n(101),l=n(651),d=n(639),m=n(225),f={props:{method:{type:Function,default:null},open:{required:!0},message:{type:String}},watch:{open:function(e){e?document.addEventListener("keydown",this.handleKeydown):document.removeEventListener("keydown",this.handleKeydown)}},data:function(){return{}},methods:{confirm:function(){null===this.method||this.method(),this.$emit("update:error",!1)},handleKeydown:function(e){"Escape"===e.key&&this.confirm()}}},h=n(64),component=Object(h.a)(f,(function(){var e=this,t=e._self._c;return t(l.a,{attrs:{persistent:"","retain-focus":!1,"max-width":"300","max-height":"300","content-class":"rounded-xl"},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"])?null:e.confirm.apply(null,arguments)}},model:{value:e.open,callback:function(t){e.open=t},expression:"open"}},[t(o.a,[t(c.d,{staticClass:"d-flex align-center justify-center text-h6"},[t(m.a,{staticClass:"mr-3",attrs:{size:"40",color:"#e50211"}},[e._v("mdi-alert")]),e._v("\n      เกิดข้อผิดพลาด\n    ")],1),e._v(" "),t(d.a,{staticClass:"mb-3"}),e._v(" "),t(c.c,{staticClass:"text-center"},[e._v("\n      "+e._s(e.message)+"\n    ")]),e._v(" "),t(c.a,{staticClass:"justify-center"},[t(r.a,{staticClass:"rounded-xl font-weight-medium mt-0",attrs:{color:"#24b224"},on:{click:e.confirm}},[e._v("\n        ตกลง\n      ")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports},794:function(e,t,n){var content=n(915);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(22).default)("02108c36",content,!0,{sourceMap:!1})},808:function(e,t,n){"use strict";n.r(t);var r=n(638),o=n(230),c=n(101),l=n(921),d=n(651),m=n(225),f=n(4);n(16),n(14),n(92),n(80),n(38),n(19),n(20),n(12),n(6),n(15);function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach((function(t){Object(f.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y={props:{open:Boolean,customers:Array,types:Array,bases:Array},data:function(){return{headers:[{text:"ไอดีลูกค้า",value:"id"},{text:"ชื่อเล่น",value:"nickname"},{text:"ประเภท",value:"type_name"},{text:"ฐานทุน",value:"base_name"}]}},computed:{formattedCustomers:function(){var e=this.types||[],t=this.bases||[];return this.customers.map((function(n){var r=e.find((function(e){return e.id===n.type_id})),base=t.find((function(b){return b.id===n.base_id}));return v(v({},n),{},{type_name:r?r.name:"",base_name:base?base.name:""})}))}},methods:{confirm:function(){this.$emit("confirm")},cancel:function(){this.$emit("cancel")}}},_=n(64),component=Object(_.a)(y,(function(){var e=this,t=e._self._c;return t(d.a,{attrs:{"max-width":"600px"},model:{value:e.open,callback:function(t){e.open=t},expression:"open"}},[t(o.a,[t(c.d,{staticClass:"d-flex justify-center"},[t(m.a,{staticClass:"mr-3",attrs:{justify:"center",size:"40",color:"#24b224"}},[e._v("mdi-text-box-check")]),e._v(" "),t("span",{staticClass:"headline"},[e._v("ตรวจสอบข้อมูลลูกค้า")])],1),e._v(" "),t(c.c,[t(l.a,{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.formattedCustomers,"hide-default-footer":""},scopedSlots:e._u([{key:"top",fn:function(){},proxy:!0}])})],1),e._v(" "),t(c.a,{staticClass:"d-flex justify-center"},[t(r.a,{staticClass:"mb-4",attrs:{color:"#24b224"},on:{click:e.confirm}},[e._v("ยืนยัน")]),e._v(" "),t(r.a,{staticClass:"ml-2 mb-4",attrs:{color:"#e50211"},on:{click:e.cancel}},[e._v("ยกเลิก")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports},914:function(e,t,n){"use strict";n(794)},915:function(e,t,n){var r=n(21)((function(i){return i[1]}));r.push([e.i,".little-icon[data-v-2913c47a]{font-size:3rem;margin-left:8px;margin-right:8px}.custom-card[data-v-2913c47a]{margin:auto;max-width:800px;width:100%}",""]),r.locals={},e.exports=r},946:function(e,t,n){"use strict";n.r(t);var r=n(638),o=n(230),c=n(101),l=n(682),d=n(696),m=n(225),f=n(681),h=n(704),v=n(703),y=(n(31),n(2)),_=(n(32),n(14),n(92),n(16),n(74),n(75),n(65),n(94),n(80),n(192),n(38),n(61),n(6),n(43),n(47),n(81),n(60),n(71),n(34),n(1)),x=n.n(_);function w(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,a){if(e){if("string"==typeof e)return k(e,a);var t={}.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?k(e,a):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,a=!0,u=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return a=e.done,e},e:function(e){u=!0,c=e},f:function(){try{a||null==n.return||n.return()}finally{if(u)throw c}}}}function k(e,a){(null==a||a>e.length)&&(a=e.length);for(var t=0,n=Array(a);t<a;t++)n[t]=e[t];return n}x.a.locale("th");var C={layout:"user",middleware:"auth",mounted:function(){var e=this;return Object(y.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.checkRank();case 2:return t.next=4,e.fetchTypesData();case 4:return t.next=6,e.fetchBasesData();case 6:case"end":return t.stop()}}),t)})))()},data:function(){return{modal:{complete:{open:!1,message:""},error:{open:!1,message:""}},valid:!1,showModalResult:!1,withdrawalItems:[{id:"AQT",nickname:"",type_id:null,base_id:null}],types:[],bases:[]}},computed:{isFormValid:function(){var e=this;return this.withdrawalItems.every((function(t){return e.isIdValid(t.numericId)&&e.isNicknameValid(t.nickname)}))}},methods:{isIdValid:function(e){return!!e&&/^(AQT)?[0-9]{9}$/.test(e)},isNicknameValid:function(e){return!!e&&/^[\u0E00-\u0E7F]+$/.test(e)},setFullId:function(e){e.numericId.startsWith("AQT")?e.id=e.numericId:e.id="AQT"+e.numericId},checkRank:function(){var e=this;return Object(y.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.$auth.loggedIn){t.next=12;break}if(n=e.$auth.user.status.toString(),r=e.$auth.user.ranks_id.toString(),"2"!==n){t.next=9;break}return e.$router.push("/"),t.next=7,e.$auth.logout();case 7:t.next=10;break;case 9:"1"===r||"2"===r||"3"===r?e.$router.push("/app/user/new"):e.$router.push("/auth");case 10:t.next=13;break;case 12:e.$router.push("/");case 13:case"end":return t.stop()}}),t)})))()},openModal:function(){this.showModalResult=!0},confirmAndAddCustomers:function(){var e=this;return Object(y.a)(regeneratorRuntime.mark((function t(){var n,r,o,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!((n=e.findDuplicateIds(e.withdrawalItems)).length>0)){t.next=5;break}return e.modal.error.message="มีไอดีซ้ำ : ".concat(n.join(", ")),e.modal.error.open=!0,t.abrupt("return");case 5:r=w(e.withdrawalItems),t.prev=6,r.s();case 8:if((o=r.n()).done){t.next=24;break}return c=o.value,t.prev=10,t.next=13,e.$store.dispatch("api/customer/addCustomer",{id:c.id,nickname:c.nickname,type_id:c.type_id,base_id:c.base_id,emp_id:e.$auth.user.no,created_date:x()(new Date).format("YYYY-MM-DD HH:mm:ss"),updated_date:x()(new Date).format("YYYY-MM-DD HH:mm:ss")});case 13:t.next=22;break;case 15:if(t.prev=15,t.t0=t.catch(10),console.error("Error adding customer:",t.t0),!t.t0.response||400!==t.t0.response.status){t.next=22;break}return e.modal.error.message="มีไอดีนี้ในระบบแล้ว : ".concat(c.id),e.modal.error.open=!0,t.abrupt("return");case 22:t.next=8;break;case 24:t.next=29;break;case 26:t.prev=26,t.t1=t.catch(6),r.e(t.t1);case 29:return t.prev=29,r.f(),t.finish(29);case 32:e.modal.complete.message="เพิ่มลูกค้าเรียบร้อยแล้ว!",e.modal.complete.open=!0,e.recordLog(),e.showModalResult=!1;case 36:case"end":return t.stop()}}),t,null,[[6,26,29,32],[10,15]])})))()},findDuplicateIds:function(e){var t=e.map((function(e){return e.id}));return t.filter((function(e,n){return t.indexOf(e)!==n&&e}))},fetchTypesData:function(){var e=this;return Object(y.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$store.dispatch("api/type/getTypes");case 3:(n=t.sent)&&(e.types=n.map((function(e){return{id:e.no,name:e.type}}))),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.error("Error fetching types:",t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},fetchBasesData:function(){var e=this;return Object(y.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$store.dispatch("api/base/getBases");case 3:(n=t.sent)&&(e.bases=n.map((function(e){return{id:e.no,name:e.base}}))),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.error("Error fetching types:",t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},addProduct:function(){this.withdrawalItems.push({id:null,nickname:"",type_id:null,base_id:null})},removeProduct:function(e){this.withdrawalItems.splice(e,1)},goBack:function(){this.$router.push("/app/user/management")},recordLog:function(){var e=this,details=this.withdrawalItems.map((function(t,n){var r,o,c=(null===(r=e.types.find((function(e){return e.id===t.type_id})))||void 0===r?void 0:r.name)||"ยังไม่ระบุ",l=(null===(o=e.bases.find((function(base){return base.id===t.base_id})))||void 0===o?void 0:o.name)||"ยังไม่ระบุ";return"ลูกค้าคนที่ ".concat(n+1,"\nรหัส : ").concat(t.id,"\nชื่อเล่น : ").concat(t.nickname,"\nประเภท : ").concat(c,"\nฐานทุน : ").concat(l)})).join("\n\n"),t={emp_name:this.$auth.user.fname+" "+this.$auth.user.lname,emp_email:this.$auth.user.email,detail:details.trim(),type:3,picture:this.$auth.user.picture||"ไม่รู้จัก",action:"เพิ่มลูกค้าใหม่",time:x()(new Date).format("YYYY-MM-DD HH:mm:ss")};this.$store.dispatch("api/log/addLogs",t)},goToManagement:function(){this.$router.push("/app/user/management")}}},$=(n(914),n(64)),component=Object($.a)(C,(function(){var e=this,t=e._self._c;return t("div",[t("ModalComplete",{attrs:{open:e.modal.complete.open,message:e.modal.complete.message,complete:e.modal.complete.open,method:e.goBack},on:{"update:complete":function(t){return e.$set(e.modal.complete,"open",t)}}}),e._v(" "),t("ModalError",{attrs:{open:e.modal.error.open,message:e.modal.error.message,error:e.modal.error.open},on:{"update:error":function(t){return e.$set(e.modal.error,"open",t)}}}),e._v(" "),t("ResultCustomer",{attrs:{open:e.showModalResult,customers:e.withdrawalItems,types:e.types,bases:e.bases},on:{confirm:e.confirmAndAddCustomers,cancel:function(t){e.showModalResult=!1}}}),e._v(" "),t(o.a,{staticClass:"custom-card",attrs:{flat:""}},[t(c.d,{staticClass:"d-flex align-center justify-center"},[t(m.a,{staticClass:"little-icon",attrs:{color:"#24b224"}},[e._v("mdi-account-plus")]),e._v("  \n            "),t("h3",{staticClass:"mb-0"},[e._v("ลูกค้าใหม่")])],1),e._v(" "),t(c.c,[t(d.a,[e._l(e.withdrawalItems,(function(n,o){return t(f.a,{key:o,attrs:{align:"center"}},[t(l.a,{staticClass:"ml-2",attrs:{cols:"3"}},[t(v.a,{attrs:{label:"ไอดีลูกค้า",type:"text",dense:"",outlined:"",prepend:"AQT",rules:[function(e){return!!e||"กรุณากรอกตัวเลขเท่านั้น"},function(e){return/^(AQT)?[0-9]{9}$/.test(e)||"กรุณากรอกข้อมูลให้ถูกต้อง"}],maxlength:"12"},on:{input:function(t){return e.setFullId(n)}},model:{value:n.numericId,callback:function(t){e.$set(n,"numericId",t)},expression:"item.numericId"}})],1),e._v(" "),t(l.a,{attrs:{cols:"2"}},[t(v.a,{attrs:{label:"ชื่อเล่น",type:"text",dense:"",outlined:"",rules:[function(e){return!!e||"กรุณากรอกชื่อเล่น"},function(e){return/^[\u0E00-\u0E7F]+$/.test(e)||"กรุณากรอกเฉพาะภาษาไทย"}]},model:{value:n.nickname,callback:function(t){e.$set(n,"nickname",t)},expression:"item.nickname"}})],1),e._v(" "),t(l.a,{attrs:{cols:"2"}},[t(h.a,{attrs:{items:e.types,"item-text":"name","item-value":"id",label:"ประเภท",dense:"",outlined:""},model:{value:n.type_id,callback:function(t){e.$set(n,"type_id",t)},expression:"item.type_id"}})],1),e._v(" "),t(l.a,{attrs:{cols:"2"}},[t(h.a,{attrs:{items:e.bases,"item-text":"name","item-value":"id",label:"ฐานทุน",dense:"",outlined:""},model:{value:n.base_id,callback:function(t){e.$set(n,"base_id",t)},expression:"item.base_id"}})],1),e._v(" "),t(l.a,{staticClass:"d-flex align-center",attrs:{cols:"2"}},[t(r.a,{staticClass:"mb-6",attrs:{icon:"",color:"#e50211"},on:{click:function(t){return e.removeProduct(o)}}},[t(m.a,[e._v("mdi-delete")])],1),e._v(" "),t(r.a,{staticClass:"mb-6 ml-2",attrs:{color:"#24b224",text:""},on:{click:e.addProduct}},[t(m.a,{attrs:{left:""}},[e._v("mdi-account-plus")]),e._v(" เพิ่ม\n                        ")],1)],1)],1)})),e._v(" "),t("div",{staticClass:"text-center"},[t(r.a,{staticClass:"mr-2",attrs:{color:"#24b224",disabled:!e.isFormValid},on:{click:function(t){e.showModalResult=!0}}},[e._v("\n                        บันทึก\n                    ")]),e._v(" "),t(r.a,{attrs:{color:"#e50211"},on:{click:e.goToManagement}},[e._v("\n                        ย้อนกลับ\n                    ")])],1)],2)],1)],1)],1)}),[],!1,null,"2913c47a",null);t.default=component.exports;installComponents(component,{ModalComplete:n(670).default,ModalError:n(677).default,ResultCustomer:n(808).default})}}]);