<template>

  <div>
    <ModalConfirm :open="modal.confirm.open" :message="modal.confirm.message" :confirm.sync="modal.confirm.open"
      :method="UploadFile" />
    <ModalComplete :open="modal.complete.open" :message="modal.complete.message" :complete.sync="modal.complete.open"
      :method="goBack" />
    <ModalError :open="modal.error.open" :message="modal.error.message" :error.sync="modal.error.open" />

    <v-dialog persistent :retain-focus="false" v-model="open" v-if="data" max-width="400" max-height="300"
      content-class="rounded-xl">
      <v-card class="rounded-xl">
        <v-card-title class="d-flex align-center justify-center mb-3">
          <v-icon color="#38b6ff" size="30">mdi-upload</v-icon>&nbsp;
          <span class="custom-title">อัพโหลดรูปภาพ</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row dense>
              <v-col cols="12" class="pa-0">
                <v-file-input v-model="file" :rules="[
                  (v) => !!v || 'โปรดเลือกไฟล์',
                  (v) => (v && v.size < 15000000) || 'ไฟล์ต้องมีขนาดไม่เกิน 15 MB',
                  (v) => (v && ['image/jpeg', 'image/png'].includes(v.type)) || 'ไฟล์ต้องเป็นรูปภาพเท่านั้น',
                ]" accept="image/*" label="เลือกไฟล์" dense outlined required class="file-input"></v-file-input>
              </v-col>
            </v-row>
          </v-form>
          <v-card-actions class="card-title-center pa-0">
            <v-btn color="#24b224" @click="confirm" :disabled="!valid || file === null || file === undefined" depressed
              class="font-weight-medium mr-2">
              บันทึก
            </v-btn>
            <v-btn color="#e50211" @click="cancel" class="font-weight-medium">
              ยกเลิก
            </v-btn>
          </v-card-actions>
        </v-card-text>


      </v-card>
    </v-dialog>
  </div>

</template>

<script>

import moment from 'moment'
moment.locale('th')

export default {

  props: {
    method: { type: Function },
    open: {
      required: true,
    },
    data: {
      required: true,
    },
  },

  data() {
    return {

      modal: {
        confirm: {
          open: false,
          message: 'ยืนยันการเปลี่ยนรูปภาพ?',
        },
        complete: {
          open: false,
          message: 'อัพโหลดรูปภาพสำเร็จ',
        },
        error: {
          open: false,
          message: 'เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ',
        },
      },

      valid: false,
      file: null,
      date: new Date().toISOString().substr(0, 10),
      employees: [],

    }
  },

  async mounted() {
    await this.fetchEmployeeData();
    document.addEventListener('keydown', this.handleKeydown);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeydown);
  },

  methods: {
    async fetchEmployeeData() {
      this.employees = await this.$store.dispatch('api/employee/getEmployee');
    },

    async confirm() {
      try {
        this.$emit('update:edit', false)
        this.modal.confirm.open = true
      } catch (error) {
        this.modal.error.open = true
      }
    },

    async UploadFile() {
      try {
        const formData = new FormData();
        formData.append('file', this.file);
        const uploadResponse = await this.$store.dispatch('api/file/uploadProfile', formData);
        const data = {
          no: this.data.no,
          picture: this.file.name,
        };
        const updateResponse = await this.$store.dispatch('api/file/updateProfile', data);
        this.modal.complete.open = true;
        this.recordLog(this.data.no);
      } catch (error) {
        this.modal.error.message = 'เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ โปรดลองอีกครั้ง';
        this.modal.error.open = true;
      }
    },

    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.cancel();
      }
    },

    cancel() {
      this.$emit('update:edit', false)
    },

    goBack() {
      window.location.reload();
    },

    recordLog() {
      const Employee_Name = this.$auth.user.fname + ' ' + this.$auth.user.lname;
      const Employee_Email = this.$auth.user.email;
      const Employee_Picture = this.$auth.user.picture;
      const log = {
        action: 'อัพโหลดรูปภาพ',
        edit_no: this.data.no,
        detail: this.file.name,
        type: 4,
        employee_name: Employee_Name,
        employee_email: Employee_Email,
        employee_picture: Employee_Picture,
        created_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }
      this.$store.dispatch('api/log/addLog', log)
    },
  },
}

</script>

<style scoped>
.card-title-center {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.file-input {
  margin-bottom: 0px !important;
}

.v-card-actions {
  padding: 0 !important;
}

.v-btn {
  margin-top: 0px !important;
}

.v-card-title .custom-title {
  font-size: 1.5rem !important;
}
</style>
