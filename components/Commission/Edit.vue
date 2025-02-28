<template>

  <div>
    <ModalConfirm :open="modal.confirm.open" :message="modal.confirm.message" :confirm.sync="modal.confirm.open"
      :method="handleConfirmMethod" />
    <ModalComplete :open="modal.complete.open" :message="modal.complete.message" :complete.sync="modal.complete.open"
      :method="goBack" />
    <ModalWarning :open="modal.warning.open" :message="modal.warning.message" :warning.sync="modal.warning.open" />

    <v-dialog persistent :retain-focus="false" v-model="open" v-if="data" max-width="250" max-height="300"
      content-class="rounded-xl">
      <v-card class="rounded-xl">
        <v-card-title class="d-flex align-center justify-center mb-3">
          <v-icon color="#ffc800" size="30">mdi-credit-card-edit</v-icon>&nbsp;
          <span class="custom-title">แก้ไข</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" class="pa-0">
                <v-text-field v-model="formData.commission" :rules="validateStockRules(formData)" label="ค่าธรรมเนียม"
                  dense outlined required maxlength="12" class="text-center" />
              </v-col>
            </v-row>
          </v-form>
          <v-card-actions class="card-title-center pa-0">
            <v-btn @click="confirm" :disabled="!valid || !hasChanges" depressed color="#24b224"
              class="font-weight-medium mr-2">
              บันทึก
            </v-btn>
            <v-btn color="#e50211" @click="cancel" class="font-weight-medium">ยกเลิก
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>

import moment from 'moment';
moment.locale('th');

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
          message: 'ยืนยันการแก้ไขข้อมูล?',
        },
        complete: {
          open: false,
          message: 'แก้ไขข้อมูลสำเร็จ',
        },
        warning: {
          open: false,
          message: 'มีประเภทหุ้นชื่อนี้แล้ว',
        },
      },

      commissions: [],
      formData: { ...this.data },
      valid: false,
      originalData: {},

    };
  },

  computed: {
    hasChanges() {
      const commissionNoHasChanged = parseFloat(this.formData.commission) !== parseFloat(this.originalData.commission);
      return commissionNoHasChanged;
    },
  },

  async mounted() {
    await this.fetchCommissionData();
  },

  mounted() {
    this.fetchCommissionData();
    this.formData = JSON.parse(JSON.stringify(this.data));
    this.originalData = JSON.parse(JSON.stringify(this.data));
    document.addEventListener('keydown', this.handleKeydown);
  },

  watch: {
    data: {
      handler(newData) {
        this.formData = JSON.parse(JSON.stringify(newData));
        this.originalData = JSON.parse(JSON.stringify(newData));
      },
      deep: true,
      immediate: true
    }
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeydown);
  },

  methods: {
    validateStockRules(formData) {
      return [
        (v) => !!v || 'กรุณากรอกค่าธรรมเนียม',
        (v) => /^[0-9]*\.?[0-9]+$/.test(v) || 'กรุณากรอกตัวเลข',
        (v) => {
          if (parseFloat(formData.commission) === parseFloat(this.originalData.commission)) {
            return true;
          }
          if (!Array.isArray(this.commissions)) {
            return 'ข้อมูลค่าธรรมเนียมไม่ถูกต้อง';
          }
          const stockExists = this.commissions.some(c => !isNaN(c.name) && parseFloat(c.name) === parseFloat(formData.commission));
          if (stockExists) {
            return 'มีค่าธรรมเนียมนี้อยู่แล้ว';
          }
          return true;
        },
      ];
    },

    async fetchCommissionData() {
      try {
        const response = await this.$store.dispatch('api/commission/getCommission');
        if (response) {
          this.commissions = response.map(item => ({
            no: item.no,
            name: item.commission
          }));
        }
      } catch (error) {
        console.error('Error fetching sets:', error);
      }
    },

    async confirm() {
      this.modal.confirm.open = true;
      await new Promise((resolve) => {
        this.$watch('modal.confirm.open', (newValue) => {
          if (!newValue) {
            resolve();
          }
        });
      });

      if (!this.modal.confirm.open) {
        return;
      }

      await this.updateData();
    },

    async updateData() {
      try {
        this.formData.emp_id = this.$auth.user.no;
        const req = await this.$store.dispatch('api/commission/updateCommission', this.formData);
        this.modal.complete.open = true;
        this.recordLog();
      } catch (warning) {
        this.modal.warning.open = true;
      }
    },

    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.cancel();
      }
    },

    cancel() {
      this.modal.confirm.open = false;
      this.$emit('update:edit', false);
    },

    goBack() {
      window.location.reload();
    },

    handleConfirmMethod() {
      this.modal.confirm.open = false;
      this.updateData();
    },

    recordLog() {
      const Employee_Name = this.$auth.user.fname + ' ' + this.$auth.user.lname;
      const Employee_Email = this.$auth.user.email;
      const Employee_Picture = this.$auth.user.picture;
      const log = {
        action: 'แก้ไขค่าค่าธรรมเนียม',
        detail: 'จาก : ' + this.originalData.commission + '\nเป็น : ' + this.formData.commission,
        type: 1,
        employee_name: Employee_Name,
        employee_email: Employee_Email,
        employee_picture: Employee_Picture,
        created_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      };
      this.$store.dispatch('api/log/addLog', log);
    },
  },
};

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