<template>

  <v-dialog persistent :retain-focus="false" v-model="open" max-width="300" max-height="300" content-class="rounded-xl"
    @keydown.esc="cancel" @keydown.enter="confirm">
    <v-card>
      <v-card-title class="d-flex align-center justify-center text-h6">
        <v-icon justify="center" class="mr-3" size="40" color="#24b224">mdi-help</v-icon>
        ต้องการทำรายการหรือไม่
      </v-card-title>

      <v-card-actions class="justify-center">
        <v-btn color="#24b224" @click="confirm" class="rounded-xl font-weight-medium mt-0 mb-2">
          ตกลง
        </v-btn>
        <v-btn color="#e50211" @click="cancel" class="rounded-xl font-weight-medium mt-0 mb-2">
          ยกเลิก
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>

export default {

  props: {
    method: { type: Function },
    open: {
      required: true,
    },
  },

  watch: {
    open(val) {
      if (val) {
        document.addEventListener('keydown', this.handleKeydown);
      } else {
        document.removeEventListener('keydown', this.handleKeydown);
      }
    },
  },

  methods: {
    confirm() {
      this.method();
      this.$emit("update:confirm", false);
    },

    cancel() {
      this.$emit("update:confirm", false);
    },

    handleKeydown(e) {
      if (e.key === 'Escape') {
        this.cancel();
      } else if (e.key === 'Enter') {
        this.confirm();
      }
    },
  },
};

</script>
