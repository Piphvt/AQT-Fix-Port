(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{740:function(e,t,n){var content=n(756);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(22).default)("18dfbb0a",content,!0,{sourceMap:!1})},741:function(e,t,n){var content=n(758);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(22).default)("08215cd1",content,!0,{sourceMap:!1})},755:function(e,t,n){"use strict";n(740)},756:function(e,t,n){var r=n(21)((function(i){return i[1]}));r.push([e.i,".card-title-center[data-v-c9e0106a]{align-items:center;display:flex;justify-content:center;text-align:center}",""]),r.locals={},e.exports=r},757:function(e,t,n){"use strict";n(741)},758:function(e,t,n){var r=n(21)((function(i){return i[1]}));r.push([e.i,".card-title-center[data-v-7967cb76]{align-items:center;display:flex;justify-content:center;text-align:center}.file-input[data-v-7967cb76]{margin-bottom:0!important}.v-card-actions[data-v-7967cb76]{padding:0!important}.v-btn[data-v-7967cb76]{margin-top:0!important}",""]),r.locals={},e.exports=r},772:function(e,t,n){var content=n(826);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(22).default)("6fa15252",content,!0,{sourceMap:!1})},796:function(e,t,n){"use strict";n.r(t);var r=n(638),o=n(230),c=n(101),l=n(682),d=n(651),m=n(696),f=n(681),h=n(703),v=n(2),w=(n(92),n(6),n(34),n(1)),_=n.n(w);_.a.locale("th");var k={props:{method:{type:Function},open:{required:!0},data:{required:!0}},data:function(){return{modal:{confirm:{open:!1,message:"ยืนยันการเปลี่ยนรหัสผ่าน?"},complete:{open:!1,message:"เปลี่ยนรหัสผ่านสำเร็จ"},error:{open:!1,message:"โปรดกรอกข้อมูลให้ครบถ้วน"}},confirm_password:"",password:"",new_password:"",valid:!1,show1:!1,show2:!1,employees:[]}},mounted:function(){var e=this;return Object(v.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.fetchEmployeeData();case 2:document.addEventListener("keydown",e.handleKeydown);case 3:case"end":return t.stop()}}),t)})))()},beforeDestroy:function(){document.removeEventListener("keydown",this.handleKeydown)},methods:{confirm:function(){var e=this;return Object(v.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{e.$emit("update:edit",!1),e.modal.confirm.open=!0}catch(t){e.modal.error.open=!0}case 1:case"end":return t.stop()}}),t)})))()},updateData:function(){var e=this;return Object(v.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,e.data.new_password===e.data.confirm_password){t.next=5;break}return e.modal.error.message="รหัสผ่านไม่ตรงกัน",e.modal.error.open=!0,t.abrupt("return");case 5:return e.data.password=e.data.new_password,t.next=8,e.$store.dispatch("api/employee/updatePassword",e.data);case 8:t.sent,e.modal.complete.open=!0,e.recordLogUpdate(e.data.no),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(0),e.modal.error.message="เปลี่ยนรหัสผ่านไม่สำเร็จ";case 16:case"end":return t.stop()}}),t,null,[[0,13]])})))()},fetchEmployeeData:function(){var e=this;return Object(v.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("api/employee/getEmployees");case 2:e.employees=t.sent;case 3:case"end":return t.stop()}}),t)})))()},cancel:function(){this.$emit("update:edit",!1)},goBack:function(){window.location.reload()},handleKeydown:function(e){"Escape"===e.key&&this.cancel()},recordLogUpdate:function(e){var t=this.$auth.user.no,n=this.employees.find((function(e){return e.no===t})),r=n?n.fname:"Unknown",o=n?n.lname:"Unknown",c=n?n.email:"Unknown",l=n?n.picture:"Unknown",d={emp_name:r+" "+o,emp_email:c,detail:"รหัสผ่าน : "+this.data.new_password,type:4,picture:l,action:"เปลี่ยนรหัสผ่าน",time:_()(new Date).format("YYYY-MM-DD HH:mm:ss")};this.$store.dispatch("api/log/addLogs",d)}}},x=(n(755),n(64)),component=Object(x.a)(k,(function(){var e=this,t=e._self._c;return t("div",[t("ModalConfirm",{attrs:{open:e.modal.confirm.open,confirm:e.modal.confirm.open,method:e.updateData},on:{"update:confirm":function(t){return e.$set(e.modal.confirm,"open",t)}}}),e._v(" "),t("ModalComplete",{attrs:{open:e.modal.complete.open,message:e.modal.complete.message,complete:e.modal.complete.open,method:e.goBack},on:{"update:complete":function(t){return e.$set(e.modal.complete,"open",t)}}}),e._v(" "),t("ModalError",{attrs:{open:e.modal.error.open,message:e.modal.error.message,error:e.modal.error.open},on:{"update:error":function(t){return e.$set(e.modal.error,"open",t)}}}),e._v(" "),e.data?t(d.a,{attrs:{persistent:"","retain-focus":!1,"max-width":"400","max-height":"300","content-class":"rounded-xl"},model:{value:e.open,callback:function(t){e.open=t},expression:"open"}},[t(o.a,{staticClass:"rounded-xl"},[t(c.d,{staticClass:"headline font-weight-bold card-title-center mb-3"},[e._v("เปลี่ยนรหัสผ่าน")]),e._v(" "),t(c.c,[t(m.a,{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t(f.a,[t(l.a,{staticClass:"pa-0 mr-8 ml-4",attrs:{cols:"6",sm:"5"}},[t(h.a,{attrs:{"append-icon":e.show2?"mdi-eye":"mdi-eye-off",type:e.show2?"text":"password",rules:[function(e){return!!e||"โปรดกรอกรหัสผ่านใหม่"},function(e){return e&&e.length>=8||"รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"}],label:"รหัสผ่านใหม่",required:""},on:{"click:append":function(t){e.show2=!e.show2}},model:{value:e.data.new_password,callback:function(t){e.$set(e.data,"new_password",t)},expression:"data.new_password"}})],1),e._v(" "),t(l.a,{staticClass:"pa-0",attrs:{cols:"6",sm:"5"}},[t(h.a,{attrs:{"append-icon":e.show1?"mdi-eye":"mdi-eye-off",type:e.show1?"text":"password",rules:[function(e){return!!e||"โปรดยืนยันรหัสผ่านใหม่"},function(e){return e&&e.length>=8||"รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"},function(t){return t===e.data.new_password||"รหัสผ่านไม่ตรงกัน"}],label:"ยืนยันรหัสผ่านใหม่",required:""},on:{"click:append":function(t){e.show1=!e.show1}},model:{value:e.data.confirm_password,callback:function(t){e.$set(e.data,"confirm_password",t)},expression:"data.confirm_password"}})],1)],1)],1)],1),e._v(" "),t(c.a,{staticClass:"card-title-center"},[t(r.a,{staticClass:"font-weight-medium mb-5 mr-2",attrs:{color:"#24b224",disabled:!e.valid||null===e.data.new_password||void 0===e.data.new_password||null===e.data.confirm_password||void 0===e.data.confirm_password,depressed:""},on:{click:e.confirm}},[e._v("\n          เปลี่ยน\n        ")]),e._v(" "),t(r.a,{staticClass:"font-weight-medium mb-5",attrs:{color:"#e50211"},on:{click:e.cancel}},[e._v("\n          ยกเลิก\n        ")])],1)],1)],1):e._e()],1)}),[],!1,null,"c9e0106a",null);t.default=component.exports;installComponents(component,{ModalConfirm:n(672).default,ModalComplete:n(670).default,ModalError:n(677).default})},797:function(e,t,n){"use strict";n.r(t);var r=n(638),o=n(230),c=n(101),l=n(682),d=n(651),m=n(920),f=n(696),h=n(681),v=(n(42),n(2)),w=(n(92),n(38),n(6),n(34),n(1)),_=n.n(w);_.a.locale("th");var k={props:{method:{type:Function},open:{required:!0},data:{required:!0}},data:function(){return{modal:{confirm:{open:!1,message:"ยืนยันการเปลี่ยนรูปภาพ?"},complete:{open:!1,message:"อัพโหลดรูปภาพสำเร็จ"},error:{open:!1,message:"เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ"}},valid:!1,file:null,date:(new Date).toISOString().substr(0,10),employees:[]}},mounted:function(){var e=this;return Object(v.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.fetchEmployeeData();case 2:document.addEventListener("keydown",e.handleKeydown);case 3:case"end":return t.stop()}}),t)})))()},beforeDestroy:function(){document.removeEventListener("keydown",this.handleKeydown)},methods:{fetchEmployeeData:function(){var e=this;return Object(v.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("api/employee/getEmployees");case 2:e.employees=t.sent;case 3:case"end":return t.stop()}}),t)})))()},confirm:function(){var e=this;return Object(v.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:try{e.$emit("update:edit",!1),e.modal.confirm.open=!0}catch(t){e.modal.error.open=!0}case 1:case"end":return t.stop()}}),t)})))()},UploadFile:function(){var e=this;return Object(v.a)(regeneratorRuntime.mark((function t(){var n,data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,(n=new FormData).append("file",e.file),t.next=5,e.$store.dispatch("api/file/uploadProfile",n);case 5:return t.sent,data={no:e.data.no,picture:e.file.name},t.next=9,e.$store.dispatch("api/file/updateProfile",data);case 9:t.sent,e.modal.complete.open=!0,e.recordLogUpdate(e.data.no),t.next=18;break;case 14:t.prev=14,t.t0=t.catch(0),e.modal.error.message="เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ โปรดลองอีกครั้ง",e.modal.error.open=!0;case 18:case"end":return t.stop()}}),t,null,[[0,14]])})))()},handleKeydown:function(e){"Escape"===e.key&&this.cancel()},cancel:function(){this.$emit("update:edit",!1)},goBack:function(){window.location.reload()},recordLogUpdate:function(){var e=this.$auth.user.no,t=this.employees.find((function(t){return t.no===e})),n=t?t.fname:"Unknown",r=t?t.lname:"Unknown",o=t?t.email:"Unknown",c=t?t.picture:"Unknown",l={emp_name:n+" "+r,emp_email:o,detail:this.file.name,type:4,picture:c,action:"อัพโหลดรูปภาพ",time:_()(new Date).format("YYYY-MM-DD HH:mm:ss")};this.$store.dispatch("api/log/addLogs",l)}}},x=(n(757),n(64)),component=Object(x.a)(k,(function(){var e=this,t=e._self._c;return t("div",[t("ModalConfirm",{attrs:{open:e.modal.confirm.open,message:e.modal.confirm.message,confirm:e.modal.confirm.open,method:e.UploadFile},on:{"update:confirm":function(t){return e.$set(e.modal.confirm,"open",t)}}}),e._v(" "),t("ModalComplete",{attrs:{open:e.modal.complete.open,message:e.modal.complete.message,complete:e.modal.complete.open,method:e.goBack},on:{"update:complete":function(t){return e.$set(e.modal.complete,"open",t)}}}),e._v(" "),t("ModalError",{attrs:{open:e.modal.error.open,message:e.modal.error.message,error:e.modal.error.open},on:{"update:error":function(t){return e.$set(e.modal.error,"open",t)}}}),e._v(" "),e.data?t(d.a,{attrs:{persistent:"","retain-focus":!1,"max-width":"400","max-height":"300","content-class":"rounded-xl"},model:{value:e.open,callback:function(t){e.open=t},expression:"open"}},[t(o.a,{staticClass:"rounded-xl"},[t(c.d,{staticClass:"card-title-center mb-3"},[e._v("\n        อัพโหลดรูปภาพ\n      ")]),e._v(" "),t(c.c,[t(f.a,{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t(h.a,{attrs:{dense:""}},[t(l.a,{staticClass:"pa-0",attrs:{cols:"12"}},[t(m.a,{staticClass:"file-input",attrs:{rules:[function(e){return!!e||"โปรดเลือกไฟล์"},function(e){return e&&e.size<15e6||"ไฟล์ต้องมีขนาดไม่เกิน 15 MB"},function(e){return e&&["image/jpeg","image/png"].includes(e.type)||"ไฟล์ต้องเป็นรูปภาพเท่านั้น"}],accept:"image/*",label:"เลือกไฟล์",outlined:"",required:""},model:{value:e.file,callback:function(t){e.file=t},expression:"file"}})],1),e._v(" "),t(l.a,{staticClass:"pa-0",attrs:{cols:"12"}},[t(c.a,{staticClass:"card-title-center pa-0"},[t(r.a,{staticClass:"font-weight-medium mr-2 mb-2",staticStyle:{"min-width":"100px"},attrs:{color:"#24b224",disabled:!e.valid||null===e.file||void 0===e.file,depressed:""},on:{click:e.confirm}},[e._v("\n                  อัพโหลด\n                ")]),e._v(" "),t(r.a,{staticClass:"font-weight-medium mb-2",staticStyle:{"min-width":"100px"},attrs:{color:"#e50211"},on:{click:e.cancel}},[e._v("\n                  ยกเลิก\n                ")])],1)],1)],1)],1)],1)],1)],1):e._e()],1)}),[],!1,null,"7967cb76",null);t.default=component.exports;installComponents(component,{ModalConfirm:n(672).default,ModalComplete:n(670).default,ModalError:n(677).default})},825:function(e,t,n){"use strict";n(772)},826:function(e,t,n){var r=n(21)((function(i){return i[1]}));r.push([e.i,".card-title-center[data-v-8af10398]{align-items:center;display:flex;justify-content:center;text-align:center}",""]),r.locals={},e.exports=r},924:function(e,t,n){"use strict";n.r(t);var r=n(638),o=n(230),c=n(101),l=n(682),d=n(225),m=n(460),f=n(646),h=n(2),v=(n(92),n(38),n(6),n(43),n(34),n(1)),w=n.n(v);w.a.locale("th");var _={layout:"user",middleware:"auth",mounted:function(){var e=this;return Object(h.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.checkRank();case 2:return t.next=4,e.fetchEmployeeData();case 4:return t.next=6,e.fetchRankData();case 6:case"end":return t.stop()}}),t)})))()},data:function(){return{modal:{confirm:{open:!1,message:""},complete:{open:!1,message:""},error:{open:!1,message:""}},editDialog:!1,editPasswordDialog:!1,editUploadDialog:!1,editData:null,editPasswordData:null,editUploadData:null,employees:[],ranks:[],files:[]}},methods:{checkRank:function(){var e=this;return Object(h.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.$auth.loggedIn){t.next=12;break}if(n=e.$auth.user.status.toString(),r=e.$auth.user.ranks_id.toString(),"2"!==n){t.next=9;break}return e.$router.push("/"),t.next=7,e.$auth.logout();case 7:t.next=10;break;case 9:"1"===r||"2"===r||"3"===r?e.$router.push("/app/profile"):e.$router.push("/auth");case 10:t.next=13;break;case 12:e.$router.push("/");case 13:case"end":return t.stop()}}),t)})))()},fetchEmployeeData:function(){var e=this;return Object(h.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.$auth.user.no,t.next=3,e.$store.dispatch("api/employee/getEmployee",n);case 3:e.employees=t.sent;case 4:case"end":return t.stop()}}),t)})))()},fetchRankData:function(){var e=this;return Object(h.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("api/rank/getRanks");case 2:e.ranks=t.sent;case 3:case"end":return t.stop()}}),t)})))()},fetchFileData:function(){var e=this;return Object(h.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("api/file/viewProfile");case 2:e.files=t.sent;case 3:case"end":return t.stop()}}),t)})))()},getRankName:function(e){var t=this.ranks.find((function(t){return t.no===e}));return t?t.name:"Unknown"},formatDateTime:function(e){return w()(e).format("YYYY-MM-DD HH:mm")}}},k=(n(825),n(64)),component=Object(k.a)(_,(function(){var e=this,t=e._self._c;return t("div",[t("EmployeeEditDialog",{attrs:{open:e.editDialog,edit:e.editDialog,data:e.editData},on:{"update:edit":function(t){e.editDialog=t}}}),e._v(" "),t("EmployeeEditPassword",{attrs:{open:e.editPasswordDialog,edit:e.editPasswordDialog,data:e.editPasswordData},on:{"update:edit":function(t){e.editPasswordDialog=t}}}),e._v(" "),t("EmployeeEditUpload",{attrs:{open:e.editUploadDialog,edit:e.editUploadDialog,data:e.editUploadData},on:{"update:edit":function(t){e.editUploadDialog=t}}}),e._v(" "),e._l(e.employees,(function(n){return t(l.a,{key:n.no,attrs:{cols:"12"}},[t(o.a,{staticClass:"mx-auto my-12 rounded-xl text-center",attrs:{"max-width":"400",hover:""}},[t(m.a,{attrs:{height:"250",src:n.picture?"http://localhost:3001/file/profile/".concat(n.picture):"http://localhost:3001/file/profile/person-icon.jpg"},on:{click:function(t){e.editUploadDialog=!0,e.editUploadData=n}}}),e._v(" "),t(c.d,{staticClass:"card-title-center"},[e._v("\n                "+e._s(n.fname+" "+n.lname)+"\n            ")]),e._v(" "),t(c.c,[t(d.a,[e._v("mdi-email")]),e._v(" อีเมล : "+e._s(n.email)+"\n                "),t("br"),e._v(" "),t(d.a,[e._v("mdi-phone")]),e._v(" เบอร์โทรศัพท์ : "+e._s(n.phone)+"\n                "),t("br"),e._v(" "),t(d.a,[e._v("mdi-chair-rolling")]),e._v(" ตำแหน่ง : "+e._s(e.getRankName(n.ranks_id))+"\n                "),t("br"),e._v(" "),t(d.a,[e._v("mdi-gender-male-female")]),e._v(" เพศ : "+e._s(n.gender)+"\n                "),t("br"),e._v(" "),t(d.a,[e._v("mdi-calendar")]),e._v(" วันที่สร้าง : "+e._s(e.formatDateTime(n.created_date))+"\n                "),t("br"),e._v(" "),t(d.a,[e._v("mdi-calendar-clock")]),e._v(" อัพเดทล่าสุด : "+e._s(e.formatDateTime(n.updated_date))+"\n                "),t("br")],1),e._v(" "),t(f.a),e._v(" "),t(c.a,{staticClass:"card-title-center"},[t(r.a,{staticClass:"mb-3",attrs:{color:"#85d7df"},on:{click:function(){e.editDialog=!0,e.editData=n}}},[t(d.a,{attrs:{left:""}},[e._v("mdi-pencil")]),e._v("\n                    แก้ไขข้อมูล\n                ")],1),e._v(" "),t(r.a,{staticClass:"mb-3",attrs:{color:"#24b224"},on:{click:function(){e.editPasswordDialog=!0,e.editPasswordData=n}}},[t(d.a,{attrs:{left:""}},[e._v("mdi-lock")]),e._v("\n                    เปลี่ยนรหัสผ่าน\n                ")],1)],1)],1)],1)}))],2)}),[],!1,null,"8af10398",null);t.default=component.exports;installComponents(component,{EmployeeEditDialog:n(918).default,EmployeeEditPassword:n(796).default,EmployeeEditUpload:n(797).default})}}]);