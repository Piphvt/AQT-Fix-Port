<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <div>
                <ModalConfirm :method="handleConfirm" :open="modalConfirmOpen"
                    @update:confirm="modalConfirmOpen = false" />
                <ModalComplete :open="modal.complete.open" :message="modal.complete.message"
                    :complete.sync="modal.complete.open" :method="goBack" />
                <ModalError :open="modal.error.open" :message="modal.error.message" :error.sync="modal.error.open" />
                <SetCreate :open="createSetOpen" @update:open="createSetOpen = false" />
                <SetEdit :open="editSet" :data="editAllData" @update:edit="editSet = false" />
            </div>
            <v-card-title class="d-flex justify-center">
                <v-icon justify="center" class="mr-3" size="30" color="#85d7df">mdi-archive-settings</v-icon>
                <span class="custom-title">ประเภทหุ้น</span>
            </v-card-title>
            <v-card-text>
                <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                    <v-icon left color="#24b224" @click="createSetOpen = true"
                        style="font-size: 1.5rem; margin-left: auto;">mdi-archive-plus</v-icon>
                </div>
                <v-data-table :headers="headers" :items="sets" item-value="no" item-key="no" :items-per-page="5">
                    <template v-slot:item.set="{ item }">
                        <div class="text-center" :style="{ color: getSetText(item.set).color }">{{ item.set }}</div>
                    </template>
                    <template v-slot:item.employee_no="{ item }">
                        <td class="text-center">{{ getEmployeeName(item.employee_no) }}</td>
                    </template>
                    <template v-slot:item.updated_date="{ item }">
                        <td class="text-center">{{ formatDateTime(item.updated_date) }}</td>
                    </template>
                    <template v-slot:item.detail="{ item }">
                        <div class="text-center">
                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon v-bind="attrs" v-on="on" color="#85d7df">mdi-dots-vertical</v-icon>
                                </template>
                                <v-list class="custom-list">
                                    <v-list-item @click="openEditStock(item)" class="custom-list-item">
                                        <v-list-item-icon style="margin-right: 4px;">
                                            <v-icon class="icon-tab" color="#ffc800">mdi-pencil-circle</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content style="font-size: 0.8rem;">แก้ไข</v-list-item-content>
                                    </v-list-item>
                                    <v-list-item @click="showConfirmDialog('delete', item)" class="custom-list-item">
                                        <v-list-item-icon style="margin-right: 4px;">
                                            <v-icon class="icon-tab" color="#e50211">mdi-delete-circle</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content style="font-size: 0.8rem;">ลบ</v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                    </template>
                </v-data-table>
            </v-card-text>
            <div class="text-center">
                <v-btn @click="dialog = false" class="mb-4" color="#e50211">ปิด</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import moment from 'moment-timezone';
import 'moment/locale/th';

export default {
    props: {
        value: Boolean,
    },

    data() {
        return {
            modal: {
                error: {
                    open: false,
                    message: '',
                },
                confirm: {
                    open: false,
                },
                complete: {
                    open: false,
                    message: '',
                },
            },

            sets: [],
            employees: [],

            currentAction: '',
            currentItem: null,
            modalConfirmOpen: false,

            createSetOpen: false,

            editAllData: {},
            editSet: false,

            headers: [
                { text: 'ข้อมูลวันที่', value: 'updated_date', align: 'center', cellClass: 'text-center' },
                { text: 'ชื่อประเภทหุ้น', value: 'set', sortable: false, align: 'center', cellClass: 'text-center' },
                { text: 'ทำรายการโดย', value: 'employee_no', sortable: false, align: 'center', cellClass: 'text-center' },
                { text: '', value: 'detail', sortable: false, align: 'center', cellClass: 'text-center' },
            ],

            dialog: this.value,
        };
    },

    watch: {
        value(newValue) {
            this.dialog = newValue;
        },
        dialog(newValue) {
            this.$emit('input', newValue);
        },
    },

    async mounted() {
        await this.fetchSetData();
        await this.fetchEmployeeData();
    },

    methods: {
        openEditStock(dividend) {
            this.editAllData = dividend;
            this.editSet = true;
        },

        goBack() {
            window.location.reload();
        },

        showConfirmDialog(action, item) {
            this.currentAction = action;
            this.currentItem = item;
            this.modalConfirmOpen = true;
        },

        async handleConfirm() {
            if (this.currentAction === 'delete') {
                try {
                    await this.$store.dispatch('api/set/deleteSet', this.currentItem.no);
                    this.modal.complete.message = 'ลบประเภทหุ้นนี้เรียบร้อยแล้ว';
                    this.modal.complete.open = true;
                } catch (error) {
                    this.modal.error.message = 'เกิดข้อผิดพลาดในการดำเนินการ';
                    this.modal.error.open = true;
                }
            }
            this.modalConfirmOpen = false;
        },

        async fetchSetData() {
            this.sets = await this.$store.dispatch('api/set/getSet');
        },

        async fetchEmployeeData() {
            this.employees = await this.$store.dispatch('api/employee/getEmployee');
        },

        getEmployeeName(empId) {
            const employee = this.employees.find(e => e.no === empId);
            return employee ? employee.fname + ' ' + employee.lname : 'ไม่ทราบ';
        },

        formatDateTime(date) {
            if (moment(date).isValid()) {
                return moment(date).format('DD/MM/YYYY HH:mm');
            }
            return 'Invalid Date';
        },

        getSetText(set) {
            if (set === 'SET') {
                return { text: 'SET', color: '#24b224' };
            } else if (set === 'SET50') {
                return { text: 'SET50', color: '#ffc800' };
            } else if (set === 'SET100') {
                return { text: 'SET100', color: '#38b6ff' };
            } else if (set === 'ETF') {
                return { text: 'ETF', color: '#8c52ff' };
            } else if (set === 'MAI') {
                return { text: 'MAI', color: '#ff914d' };
            } else if (set === 'Warrants') {
                return { text: 'Warrants', color: '#c1ff72' };
            } else if (set === 'DR') {
                return { text: 'DR', color: '#ff5757' };
            } else if (set === 'Preferred Stock') {
                return { text: 'Preferred Stock', color: '#ff66c4' };
            } else {
                return { text: '', color: 'inherit' };
            }
        },
    },
};
</script>

<style scoped>
.custom-list-item {
    padding: 0.1px 8px;
}

.custom-list {
    padding: 0.4px 2px;
}

.icon-tab {
    font-size: 120% !important;
}

.v-card-title .custom-title {
    font-size: 1.5rem !important;
}
</style>
