<template>
    <v-dialog v-model="showModalResult" max-width="350px" @keydown="handleKeydown">
        <v-card>
            <v-card-title class="d-flex align-center justify-center">
                <v-icon color="#24b224" size="30">mdi-alert-circle</v-icon>&nbsp;
                <span class="custom-title">ตรวจสอบความถูกต้อง</span>
            </v-card-title>
            <v-card-text>
                <v-data-table :headers="headers" :items="formattedStocks" class="elevation-1" hide-default-footer>
                    <template v-slot:top>
                    </template>
                </v-data-table>
                <v-card-actions class="card-title-center pa-0">
                    <v-btn color="#24b224" @click="confirm" class="mt-4 mr-2">ยืนยัน</v-btn>
                    <v-btn color="#e50211" @click="cancel" class="mt-4">ยกเลิก</v-btn>
                </v-card-actions>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        open: Boolean,
        stocks: Array,
        sets: Array,
        employees: Array,
    },
    data() {
        return {
            showModalResult: this.open,
            headers: [
                { text: 'ชื่อหุ้น', value: 'stock', sortable: false, align: 'center', cellClass: 'text-center' },
                { text: 'ประเภท', value: 'set_name', sortable: false, align: 'center', cellClass: 'text-center' },
                { text: 'ผู้ติดตามหุ้น', value: 'staff_name', sortable: false, align: 'center', cellClass: 'text-center' },
            ],
        };
    },
    computed: {
        formattedStocks() {
            const sets = this.sets || [];
            const employees = this.employees || [];
            return this.stocks.map(stock => {
                const set = sets.find(s => s.no === stock.set_no);
                const employee = employees.find(e => e.no === stock.staff_no);
                return {
                    ...stock,
                    set_name: set ? set.name : 'ยังไม่ระบุ',
                    staff_name: employee ? employee.name : 'ยังไม่ระบุ',
                };
            });
        },
    },
    async mounted() {
        document.addEventListener('keydown', this.handleKeydown);
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.handleKeydown);
    },
    methods: {
        confirm() {
            this.$emit('confirm');
        },
        cancel() {
            this.$emit('cancel');
            this.showModalResult = false;
        },
        handleKeydown(event) {
            if (this.showModalResult) {
                if (event.key === 'Escape') {
                    this.cancel();
                } else if (event.key === 'Enter') {
                    this.confirm();
                }
            }
        },
    },
    watch: {
        open(newValue) {
            this.showModalResult = newValue;
        },
        showModalResult(newValue) {
            this.$emit('update:open', newValue);
        }
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

.v-card-title .custom-title {
    font-size: 1.5rem !important;
}
</style>
