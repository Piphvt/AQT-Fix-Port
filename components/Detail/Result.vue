<template>
    <v-dialog v-model="showModalResult" max-width="800px">
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
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
                <v-btn color="#24b224" @click="confirm" class="mb-4">ยืนยัน</v-btn>
                <v-btn color="#e50211" @click="cancel" class="ml-2 mb-4">ยกเลิก</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import moment from 'moment';

export default {
    props: {
        open: Boolean,
        details: Array,
        froms: Array,
        stocks: Array,
        customers: Array,
        customer_no: Number,
        customer_name: Number,
        created_date: String,
    },
    data() {
        return {
            showModalResult: this.open,
            headers: [
                { text: 'รหัสลูกค้า', value: 'customer_no', sortable: false, align: 'center' },
                { text: 'ชื่อเล่นลูกค้า', value: 'customer_name', sortable: false, align: 'center' },
                { text: 'ชื่อหุ้น', value: 'stock_name', sortable: false, align: 'center' },
                { text: 'จำนวนที่ติด', value: 'price', sortable: false, align: 'center' },
                { text: 'ราคาที่ติด', value: 'amount', sortable: false, align: 'center' },
                { text: 'วันที่ซื้อหุ้น', value: 'created_date', sortable: false, align: 'center' },
                { text: 'ที่มาที่ไป', value: 'from_name', sortable: false, align: 'center' },
            ],
        };
    },
    computed: {
        formattedStocks() {
            const froms = this.froms || [];
            const stocks = this.stocks || [];
            const customers = this.customers || [];

            return this.details.map(detail => {
                const from = froms.find(f => f.no === detail.from_no);
                const stock = stocks.find(s => s.no === detail.stock_no);

                const customer = customers.find(c => c.no === this.customer_no) ||
                    customers.find(c => c.no === this.customer_name) ||
                    { name: '', id: '' };

                return {
                    ...detail,
                    from_name: from ? from.name : '',
                    stock_name: stock ? stock.name : '',
                    customer_no: customer.id,
                    customer_name: customer.name,
                    created_date: detail.created_date || moment().format('YYYY-MM-DD'),
                };
            });
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
    async mounted() {
        document.addEventListener('keydown', this.handleKeydown);
    },

    beforeDestroy() {
        document.removeEventListener('keydown', this.handleKeydown);
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
