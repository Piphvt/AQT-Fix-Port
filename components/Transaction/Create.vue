<template>
    <v-dialog v-model="TransactionCreateOpen" @close="updateOpen(false)" max-width="1000px">
        <ModalComplete :open="modal.complete.open" :message="modal.complete.message"
            :complete.sync="modal.complete.open" :method="goBack" />
        <ModalError :open="modal.error.open" :message="modal.error.message" :error.sync="modal.error.open" />
        <TransactionResult :open="showModalResult" :detail_amount="withdrawalItems"
            :stocks="withdrawalItems.map(item => ({ stock_no: item.stock_no }))" :customers="customers"
            :customer_no="customer_no" :customer_name="customer_name" :type="type" :commission_no="commission_no"
            @confirm="confirmAndAddDetails" @cancel="showModalResult = false" @update:open="showModalResult = $event" />

        <v-card flat>
            <v-card-title class="d-flex justify-center mb-3">
                <v-icon justify="center" size="30" color="#24b224">mdi-cash-plus</v-icon>&nbsp;
                <span class="custom-title">เพิ่มการซื้อขายหุ้นของลูกค้า</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" lazy-validation>
                    <v-row class="mb-0 mt-0 pa-0 justify-center">
                        <v-col cols="2" class="ml-2">
                            <v-select v-model="searchBy" :items="searchOptions" label="ค้นหาจาก" dense outlined>
                            </v-select>
                        </v-col>
                        <v-col cols="3">
                            <v-autocomplete v-if="searchBy === 'customer_name'" v-model="customer_name"
                                :items="customers" item-text="name" item-value="no" label="ชื่อลูกค้า" dense outlined
                                clearable :rules="[(v) => !!v || 'กรุณากรอกชื่อลูกค้า']">
                            </v-autocomplete>
                            <v-autocomplete v-else-if="searchBy === 'customer_no'" v-model="customer_no"
                                :items="customers" item-text="id" item-value="no" label="รหัสลูกค้า" dense outlined
                                clearable :rules="[(v) => !!v || 'กรุณากรอกรหัสลูกค้า']">
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="2">
                            <v-autocomplete v-model="commission_no" :items="commissions" item-text="name"
                                item-value="no" label="ค่าธรรมเนียม" dense outlined clearable
                                :rules="[(v) => !!v || 'กรุณากรอกค่าธรรมเนียม']">
                            </v-autocomplete>
                        </v-col>
                    </v-row>
                    <v-row v-for="(item, index) in withdrawalItems" :key="index" align="center">
                        <v-col cols="2" class="ml-6">
                            <v-autocomplete v-model="item.stock_no" :items="detail_amount" item-text="name"
                                item-value="no" label="ชื่อหุ้น" dense outlined :disabled="!isSearchValid"
                                :rules="[(v) => !!v || 'กรุณากรอกชื่อหุ้น']" clearable
                                @change="updateStockData(item)" />
                        </v-col>

                        <v-col cols="2">
                            <v-select v-model="item.type"
                                :items="[{ value: 1, text: 'ซื้อ' }, { value: 2, text: 'ขาย' }]" item-text="text"
                                item-value="value" label="ซื้อ/ขาย" dense outlined clearable
                                :disabled="!canEditItem(item)" :rules="[(v) => !!v || 'กรุณาเลือกซื้อหรือขาย']" />
                        </v-col>

                        <v-col cols="2">
                            <v-text-field v-model="item.price" label="ราคา" type="text" dense outlined
                                :disabled="!canEditItem(item)"
                                :rules="[(v) => !v || /^[0-9]*\.?[0-9]+$/.test(v.replace(/,/g, '')) || 'กรุณากรอกตัวเลข']"
                                @input="item.price = removeCommas(item.price)" />
                        </v-col>

                        <v-col cols="2">
                            <v-text-field v-model="item.amount" label="จำนวน" type="text" dense outlined
                                :disabled="!canEditItem(item)" :rules="[
                                    (v) => !v || /^[0-9]*\.?[0-9]+$/.test(v.replace(/,/g, '')) || 'กรุณากรอกตัวเลข',
                                ]" @input="item.amount = removeCommas(item.amount)" />
                        </v-col>

                        <v-col cols="2">
                            <v-menu v-model="datePickerMenus[index]" :close-on-content-click="false"
                                transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="item.created_date" label="วันที่ซื้อ/ขายหุ้น" readonly
                                        v-bind="attrs" v-on="on" outlined dense clearable :disabled="!canEditItem(item)"
                                        :error="!!item.dateError" :error-messages="item.dateError">
                                    </v-text-field>
                                </template>
                                <v-date-picker v-model="item.created_date" @input="datePickerMenus[index] = false"
                                    locale="th">
                                </v-date-picker>
                            </v-menu>
                        </v-col>


                        <v-col cols="1" class="d-flex align-center">
                            <v-btn icon color="#e50211" @click="removeProduct(index)" class="mb-6"
                                :disabled="withdrawalItems.length === 1">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                            <v-btn color="#24b224" @click="addProduct" text class="mb-6 ml-2">
                                <v-icon left>mdi-cash-plus</v-icon> เพิ่ม
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
                <v-card-actions class="card-title-center pa-0">
                    <v-btn color="#24b224" @click="showModalResult = true"
                        :disabled="!isFormValid || !isSearchValid || !isOverAmount || !isDateValid" class="mr-2">
                        ยืนยัน
                    </v-btn>
                    <v-btn @click="cancel" color="#e50211">
                        ยกเลิก
                    </v-btn>
                </v-card-actions>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import moment from 'moment';

export default {
    middleware: 'auth',
    async fetch() {
        await this.fetchCustomerData()
        await this.fetchStockData()
        await this.fetchCommissionData()
        await this.fetchDetailAmountData()
        await this.fetchTransactionData();
        await this.fetchDetailData();
    },

    props: {
        open: {
            type: Boolean,
            required: true,
        },
    },

    data() {
        return {
            TransactionCreateOpen: this.open,

            modal: {
                complete: { open: false, message: '' },
                error: { open: false, message: '' },
            },

            searchBy: 'customer_no',
            searchOptions: [
                { text: 'รหัสลูกค้า', value: 'customer_no' },
                { text: 'ชื่อลูกค้า', value: 'customer_name' }
            ],
            customer_no: null,
            customer_name: null,
            commission_no: 1,

            datePickerMenus: [],

            showModalResult: false,
            withdrawalItems: [{
                stock_no: null, price: null, amount: null, type: 2, created_date: null,
            }],

            customers: [],
            commissions: [],
            stocks: [],
            detail_amount: [],
            transactions: [],
            details: [],
            isOverAmountError: ''
        };
    },

    watch: {
        open(newVal) {
            this.TransactionCreateOpen = newVal;
        },
        customer_no: {
            handler: 'fetchDetailAmountData',
            immediate: true
        },
        customer_name: {
            handler: 'fetchDetailAmountData',
            immediate: true
        },
    },

    computed: {
        isFormValid() {
            const isCustomerNameValid = this.searchBy === 'customer_name' ? this.customer_name : true;
            const isCustomerIdValid = this.searchBy === 'customer_no' ? this.customer_no : true;
            const isCommissionNoValid = this.commission_no !== null;

            return (
                isCustomerNameValid &&
                isCustomerIdValid &&
                isCommissionNoValid &&
                this.withdrawalItems.every(item =>
                    this.isItemValid(item.stock_no) &&
                    this.isItemValid(item.price) &&
                    this.isItemValid(item.amount) &&
                    this.isItemValid(item.type) &&
                    this.isItemValid(item.created_date)
                )
            );
        },

        isSearchValid() {
            return (
                this.searchBy &&
                (this.searchBy === 'customer_name' ? this.customer_name : this.customer_no) &&
                this.commission_no
            );
        },

        canEditItem() {
            return (item) => this.isSearchValid && !!item.stock_no;
        },

        totalAmountForStock() {
            return this.withdrawalItems.reduce((acc, item) => {
                const stockDetail = this.detail_amount.find(detail => detail.no === item.stock_no);
                if (stockDetail) {
                    const currentAmount = parseFloat(item.amount || 0);
                    const totalAmount = acc[item.stock_no] || 0;
                    const updatedAmount = item.type === 1
                        ? totalAmount - currentAmount
                        : totalAmount + currentAmount;
                    acc[item.stock_no] = updatedAmount;
                }
                return acc;
            }, {});
        },

        isOverAmount() {
            return this.withdrawalItems.every(item => {
                const stockDetail = this.detail_amount.find(detail => detail.no === item.stock_no);
                if (!stockDetail) return false;
                const totalAmount = this.totalAmountForStock[item.stock_no] || 0;
                return totalAmount <= parseFloat(stockDetail.remainingAmount);
            });
        },

        isDateValid() {
            let isValid = true;

            this.withdrawalItems.forEach(item => {
                const stockDetail = this.detail_amount.find(detail => detail.no === item.stock_no);
                if (!stockDetail) {
                    isValid = false;
                    return;
                }

                const selectedDate = item.created_date ? moment(item.created_date).format('YYYY-MM-DD') : null;
                const stockDate = stockDetail.created_date ? moment(stockDetail.created_date).format('YYYY-MM-DD') : null;

                if (!selectedDate || !stockDate) {
                    isValid = false;
                    item.dateError = 'กรุณาเลือกวันที่ซื้อ/ขาย';
                } else if (selectedDate < stockDate) {
                    isValid = false;
                    item.dateError = 'กรุณาเลือกวันที่ให้ถูกต้อง';
                } else {
                    item.dateError = '';
                }
            });

            return isValid;
        },



    },

    mounted() {
        this.fetchCustomerData()
        this.fetchStockData()
        this.fetchCommissionData()
        this.fetchDetailAmountData()
        this.fetchTransactionData();
        this.fetchDetailData();
        window.addEventListener('keydown', this.handleKeydown);
    },

    beforeDestroy() {
        window.removeEventListener('keydown', this.handleKeydown);
    },

    methods: {
        removeCommas(value) {
            return value.replace(/,/g, '');
        },

        async fetchTransactionData() {
            this.transactions = await this.$store.dispatch('api/transaction/getTransaction');
        },

        async fetchDetailData() {
            this.details = await this.$store.dispatch('api/detail/getDetail');
        },

        async fetchStockData() {
            this.stocks = await this.$store.dispatch('api/stock/getStock');
        },

        async fetchDetailAmountData() {
            this.detail_amount = [];
            const customerIdentifier = this.customer_no || this.customer_name;
            if (!customerIdentifier) return;

            try {
                const response = await this.$store.dispatch('api/detail/getDetail', { customer_no: customerIdentifier });
                this.detail_amount = response.filter(detail =>
                    detail.customer_no === customerIdentifier || detail.customer_name === customerIdentifier
                );

                await this.fetchStockData();
                await this.fetchTransactionData();

                this.detail_amount = this.detail_amount.map(detail => {
                    const stock = this.stocks.find(stock => stock.no === detail.stock_no);

                    const relatedTransactions = this.transactions.filter(
                        transaction => transaction.stock_detail_no === detail.no
                    );

                    const remainingAmount = relatedTransactions.reduce((total, transaction) => {
                        if (transaction.type === 1) {
                            return total + parseFloat(transaction.amount || 0);
                        } else if (transaction.type === 2) {
                            return total - parseFloat(transaction.amount || 0);
                        }
                        return total;
                    }, parseFloat(detail.amount || 0));

                    let latestCreatedDate = detail.created_date;
                    if (relatedTransactions.length > 0) {
                        latestCreatedDate = relatedTransactions.reduce((latest, transaction) => {
                            const transactionDate = new Date(transaction.created_date);
                            return transactionDate > new Date(latest) ? transaction.created_date : latest;
                        }, latestCreatedDate);
                    }

                    if (remainingAmount === 0) {
                        return null;
                    }

                    const result = {
                        ...detail,
                        name: stock ? `${stock.stock} (${remainingAmount.toLocaleString(2)})` : 'ไม่พบหุ้น',
                        remainingAmount,
                        created_date: latestCreatedDate
                    };

                    return result;
                }).filter(detail => detail !== null);

                console.log('Latest Created Date:', this.detail_amount.map(detail => detail.created_date));

            } catch (error) {
                this.detail_amount = [];
                console.error('Error fetching details:', error);
            }
        },

        async fetchCustomerData() {
            try {
                const response = await this.$store.dispatch('api/customer/getCustomer');
                if (response) {
                    this.customers = response.map(item => ({ no: item.no, id: item.id, name: item.nickname }));
                }
            } catch (error) {
            }
        },

        async fetchCommissionData() {
            try {
                const response = await this.$store.dispatch('api/commission/getCommission');
                if (response) {
                    this.commissions = response.map(item => ({ no: item.no, name: item.commission }));
                }
            } catch (error) {
            }
        },

        updateStockData(item) {
            const stockDetail = this.detail_amount.find(d => d.no === item.stock_no);
            if (stockDetail) {
                item.stock_detail_no = stockDetail.no;
            } else {
                item.stock_detail_no = null;
            }
        },

        isItemValid(item) {
            return item !== null && item !== '';
        },

        openModal() {
            this.showModalResult = true;
        },

        handleKeydown(event) {
            if (event.key === 'Escape') {
                this.cancel();
            }
        },

        updateOpen(val) {
            this.TransactionCreateOpen = val;
            this.$emit('update:open', val);
        },

        goBack() {
            window.location.reload();
        },

        async confirmAndAddDetails() {
            await this.fetchDetailData();
            await this.fetchTransactionData();
            await this.fetchDetailAmountData();

            let isTransactionAdded = false;

            const remainingAmounts = {};

            for (const transaction of this.withdrawalItems) {
                const stockDetailId = transaction.stock_detail_no;

                if (!remainingAmounts[stockDetailId]) {
                    const matchingDetail = this.details.find(detail => detail.no === stockDetailId);

                    const totalBuyAmount = this.transactions
                        .filter(t => t.stock_detail_no === stockDetailId && t.type === 1)
                        .reduce((sum, t) => sum + parseFloat(t.amount), parseFloat(matchingDetail?.amount || 0));

                    const totalSellAmount = this.transactions
                        .filter(t => t.stock_detail_no === stockDetailId && t.type === 2)
                        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

                    remainingAmounts[stockDetailId] = {
                        total: totalBuyAmount - totalSellAmount,
                        detailAmount: parseFloat(matchingDetail?.amount || 0),
                        transactionAmount: totalBuyAmount - parseFloat(matchingDetail?.amount || 0),
                    };
                }

                let { total: remainingTotal, detailAmount, transactionAmount } = remainingAmounts[stockDetailId];
                let amountToProcess = parseFloat(transaction.amount);

                const matchingDetailAmount = this.detail_amount.find(detail => detail.no === transaction.stock_no);
                const detailCreatedDate = matchingDetailAmount?.created_date;

                let updatedCreatedDate = moment(detailCreatedDate).add(5, 'minutes').format('YYYY-MM-DD HH:mm');

                console.log('Original created_date:', moment(detailCreatedDate).format('YYYY-MM-DD'));
                console.log('Target created_date:', moment(transaction.created_date).format('YYYY-MM-DD'));
                console.log('Updated created_date (after adding 5 minutes):', updatedCreatedDate);

                if (moment(transaction.created_date).format('YYYY-MM-DD') === moment(detailCreatedDate).format('YYYY-MM-DD')) {
                    transaction.created_date = updatedCreatedDate;
                } else {
                    transaction.created_date = moment(transaction.created_date).format('YYYY-MM-DD HH:mm');
                }

                if (transaction.type === 1) {
                    try {
                        await this.$store.dispatch('api/transaction/addTransaction', {
                            stock_detail_no: stockDetailId,
                            type: transaction.type,
                            price: parseFloat(transaction.price),
                            amount: amountToProcess,
                            commission_no: this.commission_no,
                            from_no: 3,
                            employee_no: this.$auth.user.no,
                            created_date: transaction.created_date,
                            updated_date: moment(new Date()).format('YYYY-MM-DD HH:mm'),
                        });
                        isTransactionAdded = true;

                        let remainingTotal = remainingAmounts[stockDetailId]?.total || 0;
                        let detailAmount = remainingAmounts[stockDetailId]?.detailAmount || 0;
                        let transactionAmount = remainingAmounts[stockDetailId]?.transactionAmount || 0;

                        remainingTotal += amountToProcess;
                        transactionAmount += amountToProcess;
                        remainingAmounts[stockDetailId] = {
                            total: remainingTotal,
                            detailAmount,
                            transactionAmount,
                        };

                    } catch (error) {
                        console.error('Error adding purchase transaction:', error);
                    }
                } else if (transaction.type === 2) {
                    while (amountToProcess > 0) {
                        if (transactionAmount > 0) {
                            const deduction = Math.min(amountToProcess, transactionAmount);
                            try {
                                await this.$store.dispatch('api/transaction/addTransaction', {
                                    stock_detail_no: stockDetailId,
                                    type: transaction.type,
                                    price: parseFloat(transaction.price),
                                    amount: deduction,
                                    commission_no: this.commission_no,
                                    from_no: 3,
                                    employee_no: this.$auth.user.no,
                                    created_date: transaction.created_date,
                                    updated_date: moment(new Date()).format('YYYY-MM-DD HH:mm'),
                                });
                                isTransactionAdded = true;
                            } catch (error) {
                                console.error('Error adding sell transaction:', error);
                            }

                            amountToProcess -= deduction;
                            transactionAmount -= deduction;
                        } else if (detailAmount > 0) {
                            const deduction = Math.min(amountToProcess, detailAmount);

                            const matchingDetail = this.details.find(detail => detail.no === stockDetailId);
                            const fromNo = matchingDetail?.from_no || 3;

                            try {
                                await this.$store.dispatch('api/transaction/addTransaction', {
                                    stock_detail_no: stockDetailId,
                                    type: transaction.type,
                                    price: parseFloat(transaction.price),
                                    amount: deduction,
                                    commission_no: this.commission_no,
                                    from_no: fromNo,
                                    employee_no: this.$auth.user.no,
                                    created_date: transaction.created_date,  // Use the modified or original created_date
                                    updated_date: moment(new Date()).format('YYYY-MM-DD HH:mm'),  // Keep using current time for updated_date
                                });
                                isTransactionAdded = true;
                            } catch (error) {
                                console.error('Error adding sell transaction:', error);
                            }

                            amountToProcess -= deduction;
                            detailAmount -= deduction;
                        } else {
                            console.error('Error: Not enough shares to sell.');
                            this.modal.error.message = `จำนวนหุ้นที่ขายมากกว่าจำนวนหุ้นที่มี`;
                            this.modal.error.open = true;
                            break;
                        }

                        remainingTotal -= transaction.amount;
                        remainingAmounts[stockDetailId] = { total: remainingTotal, detailAmount, transactionAmount };
                    }
                }
            }

            if (isTransactionAdded) {
                this.modal.complete.message = 'เพิ่มข้อมูลเรียบร้อย!';
                this.modal.complete.open = true;
            }

            this.showModalResult = false;
        }

        ,


        findDuplicateIds(stocks) {
            const names = stocks.map(stock => stock.name);
            return names.filter((name, index) => names.indexOf(name) !== index && name);
        },

        addProduct() {
            this.withdrawalItems.push({
                stock_no: null,
                amount: null,
                price: null,
                type: 2,
                created_date: null
            });
            this.datePickerMenus.push(false);
        },

        removeProduct(index) {
            this.withdrawalItems.splice(index, 1);
            this.datePickerMenus.splice(index, 1);
        },

        cancel() {
            this.newStockType = '';
            this.$emit('update:open', false);
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

.v-card-title .custom-title {
    font-size: 1.5rem !important;
}
</style>
