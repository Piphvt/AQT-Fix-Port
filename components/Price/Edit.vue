<template>

    <div>
        <ModalConfirm :open="modal.confirm.open" :message="modal.confirm.message" :confirm.sync="modal.confirm.open"
            :method="handleConfirmMethod" />
        <ModalComplete :open="modal.complete.open" :message="modal.complete.message"
            :complete.sync="modal.complete.open" :method="goBack" />
        <ModalWarning :open="modal.warning.open" :message="modal.warning.message" :warning.sync="modal.warning.open" />

        <v-dialog persistent :retain-focus="false" v-model="open" v-if="data" max-width="400" max-height="300"
            content-class="rounded-xl">
            <v-card class="rounded-xl">
                <v-card-title class="d-flex align-center justify-center mb-3">
                    <v-icon color="#ffc800" size="30">mdi-cloud-cog</v-icon>&nbsp;
                    <span class="custom-title">แก้ไข</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-row>
                            <v-col cols="5" sm="11" class="pa-0 ml-4">
                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40"
                                    :return-value.sync="formData.created_date" transition="scale-transition" offset-y
                                    min-width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="formattedCreatedDate" label="ข้อมูลวันที่" outlined dense
                                            readonly v-bind="attrs" v-on="on" :rules="[
                                                (v) => !!v || 'โปรดเลือกวันที่',
                                                (v) => moment(v).isValid() || 'วันที่ไม่ถูกต้อง'
                                            ]"></v-text-field>
                                    </template>
                                    <date-picker v-model="formData.created_date" no-title scrollable
                                        @input="onDateSelected" @change="onDateChange" format="YYYY-MM-DD HH:mm"
                                        type="datetime" :locale="'th'" />
                                </v-menu>
                            </v-col>

                            <v-col cols="6" sm="5" class="pa-0 mr-8 ml-4">
                                <v-autocomplete v-model="formData.stock_no" :items="stocks" item-text="name"
                                    item-value="no" label="ชื่อหุ้น" outlined dense
                                    :rules="[(v) => !!v || 'กรุณาเลือกชื่อหุ้น']" clearable>
                                </v-autocomplete>
                            </v-col>

                            <v-col cols="6" sm="5" class="pa-0">
                                <v-text-field v-model="formData.price" :rules="[
                                    (v) => !!v || 'โปรดกรอกราคาปิด',
                                    (v) => /^[0-9]*\.?[0-9]+$/.test(v) || 'กรุณากรอกตัวเลข'
                                ]" label="ราคาปิด" outlined dense required />
                            </v-col>
                        </v-row>
                    </v-form>
                    <v-card-actions class="card-title-center pa-0">
                        <v-btn @click="confirm" :disabled="!valid || !hasChanges || !formData.stock_no" depressed
                            color="#24b224" class="font-weight-medium mr-2">
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
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

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

    components: {
        DatePicker,
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
                    message: '',
                },
            },

            menu: false,

            moment,

            formData: {},
            valid: false,
            setOptions: [],
            details: [],
            stocks: [],
            originalData: {},

        };
    },

    computed: {
        hasChanges() {
            const dateHasChanged = !moment(this.formData.created_date).isSame(this.originalData.created_date);
            const stockNoHasChanged = this.formData.stock_no !== this.originalData.stock_no;
            const priceHasChanged = parseFloat(this.formData.price) !== parseFloat(this.originalData.price);
            return dateHasChanged || stockNoHasChanged || priceHasChanged;
        }
    },

    async mounted() {
        await this.fetchStockData();
    },

    mounted() {
        this.fetchStockData();
        this.formData = JSON.parse(JSON.stringify(this.data));
        this.originalData = JSON.parse(JSON.stringify(this.data));
        if (moment(this.formData.created_date).isValid()) {
            this.formattedCreatedDate = moment(this.formData.created_date).format('YYYY-MM-DD HH:mm');
        } else {
            this.formattedCreatedDate = '';
        }
        document.addEventListener('keydown', this.handleKeydown);
    },

    watch: {
        data: {
            handler(newData) {
                this.formData = JSON.parse(JSON.stringify(newData));
                this.originalData = JSON.parse(JSON.stringify(newData));
                if (moment(this.formData.created_date).isValid()) {
                    this.formattedCreatedDate = moment(this.formData.created_date).format('YYYY-MM-DD HH:mm');
                } else {
                    this.formattedCreatedDate = '';
                }
            },
            deep: true,
            immediate: true
        },
    },

    beforeDestroy() {
        document.removeEventListener('keydown', this.handleKeydown);
    },

    methods: {
        onDateSelected(date) {
            if (moment(date).isValid()) {
                this.formData.created_date = moment(date).toDate();
                this.formattedCreatedDate = moment(date).format('YYYY-MM-DD HH:mm');
            } else {
                this.formData.created_date = null;
                this.formattedCreatedDate = '';
            }
            this.menu = false;
        },

        onDateChange() {
            this.menu = false;
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
                this.formData.employee_no = this.$auth.user.no;
                this.formData.created_date = moment(this.formData.created_date).format('YYYY-MM-DD HH:mm:ss');
                const req = await this.$store.dispatch('api/price/updatePrice', this.formData);
                this.modal.complete.open = true;
            } catch (warning) {
                this.modal.warning.open = true;
            }
        },

        async fetchStockData() {
            try {
                const response = await this.$store.dispatch('api/stock/getStock');
                if (response) {
                    this.stocks = response.map(item => ({ no: item.no, name: item.stock }));
                }
            } catch (error) {
                console.error('Error fetching stocks:', error);
            }
        },

        getStockNameByNo(stockNo) {
            const stock = this.stocks.find(item => item.no === stockNo);
            return stock ? stock.stock : "ไม่พบข้อมูลหุ้น";
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