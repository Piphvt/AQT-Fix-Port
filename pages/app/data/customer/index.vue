<template>

    <div>
        <ModalWarning :open="modal.warning.open" :message="modal.warning.message" :warning.sync="modal.warning.open" />
        <ModalConfirm :method="handleConfirm" :open="modalConfirmOpen" @update:confirm="modalConfirmOpen = false" />
        <ModalComplete :open="modal.complete.open" :message="modal.complete.message"
            :complete.sync="modal.complete.open" :method="goBack" />
        <CustomerEdit :open="editCustomer" :data="editAllData" @update:edit="editCustomer = false" />
        <CustomerCreate :open="CustomerCreateOpen" @update:open="CustomerCreateOpen = false" />

        <v-card class="custom-card" flat>
            <v-container>
                <v-row justify="center" align="center">
                    <v-col cols="auto">
                        <v-card-title class="d-flex align-center justify-center">
                            <v-icon class="little-icon" color="#85d7df">mdi-account</v-icon>&nbsp;
                            <h3 class="mb-0">ลูกค้า</h3>
                        </v-card-title>
                        <div class="d-flex align-center mt-2 justify-center">
                            <div class="d-flex align-center mt-2 justify-center">
                                <v-icon class="small-icon" @click="toggleSavedSearchesDialog">
                                    mdi-format-list-bulleted-type
                                </v-icon>
                                <span>{{ savedSearches.length }}</span>
                            </div>

                            <v-dialog v-model="showSavedSearchesDialog" max-width="400px">
                                <v-card>
                                    <v-card-title class="headline"
                                        style="justify-content: center; display: flex;">บันทึกการค้นหา</v-card-title>
                                    <v-card-text>
                                        <v-list>
                                            <v-list-item-group v-if="savedSearches.length > 0">
                                                <v-list-item v-for="(search, index) in savedSearches" :key="index">
                                                    <v-list-item-content>
                                                        <v-list-item-title>
                                                            <strong>ประเภท :</strong>
                                                            {{ getSearchTypeText(search.type) }}
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle v-if="search.query">
                                                            <strong>รายละเอียด :</strong> {{ search.query }}
                                                        </v-list-item-subtitle>
                                                        <v-list-item-subtitle v-if="search.start && search.end">
                                                            <strong>ระยะเวลา :</strong> {{
                                                                formatDateTime(search.start)
                                                            }} - {{ formatDateTime(search.end) }}
                                                        </v-list-item-subtitle>
                                                        <v-list-item-subtitle v-if="search.topics">
                                                            <strong>หัวข้อ :</strong> {{ search.topics.join(', ') }}
                                                        </v-list-item-subtitle>
                                                    </v-list-item-content>
                                                    <v-list-item-action>
                                                        <v-btn icon @click="deleteSearch(index)">
                                                            <v-icon color=#e50211>mdi-delete</v-icon>
                                                        </v-btn>
                                                    </v-list-item-action>
                                                </v-list-item>
                                            </v-list-item-group>
                                            <v-list-item v-else>
                                                <v-list-item-content style="justify-content: center; display: flex;">
                                                    <v-icon color=#e50211>mdi-alert-circle</v-icon>
                                                    ไม่มีข้อมูลการค้นหา</v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="#e50211" @click="showSavedSearchesDialog = false">ปิด</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                            <v-select v-model="searchType" :items="searchTypes" dense outlined
                                class="mx-2 search-size small-font" @change="onSearchTypeChange"></v-select>

                            <v-autocomplete v-if="searchType === 'nickname'" v-model="selectedNicknames"
                                class="mx-2 search-size small-font" :items="getSearchItems('nickname')"
                                label="ค้นหาชื่อเล่น" dense outlined clearable multiple>
                            </v-autocomplete>

                            <v-autocomplete v-if="searchType === 'id'" v-model="selectedIds"
                                class="mx-2 search-size small-font" :items="getSearchItems('id')"
                                label="ค้นหารหัสสมาชิก" dense outlined clearable multiple>
                            </v-autocomplete>

                            <v-autocomplete v-if="searchType === 'type_no'" v-model="selectedTopics"
                                class="mx-2 search-size small-font" :items="getSearchItems('type_no')"
                                label="ค้นหาประเภท" dense outlined clearable multiple>
                            </v-autocomplete>

                            <v-menu v-if="searchType === 'updated_date'" v-model="datePickerMenu"
                                :close-on-content-click="false" transition="scale-transition" offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <div v-bind="attrs" v-on="on" class="date-picker-activator">
                                        <v-icon class="small-label">mdi-calendar-start-outline</v-icon>
                                        <date-picker v-model="startDateTime" format="YYYY-MM-DD HH:mm"
                                            type="datetime" />
                                    </div>
                                </template>
                            </v-menu>

                            <v-menu v-if="searchType === 'updated_date'" v-model="endDatePickerMenu"
                                :close-on-content-click="false" transition="scale-transition" offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <div v-bind="attrs" v-on="on" class="date-picker-activator ml-2">
                                        <v-icon class="small-label">mdi-calendar-end-outline</v-icon>
                                        <date-picker v-model="endDateTime" format="YYYY-MM-DD HH:mm" type="datetime" />
                                    </div>
                                </template>
                            </v-menu>

                            <v-btn icon @click="addSearch">
                                <v-icon class="small-icon ">mdi-plus</v-icon>
                            </v-btn>

                            <v-btn color="success" v-if="$auth.user.rank_no === 1 || $auth.user.rank_no === 3"
                                @click="exportExcel" icon>
                                <v-icon>mdi-file-excel</v-icon>
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-container>

            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                <v-menu v-model="showColumnSelector" offset-y offset-x :close-on-content-click="false">
                    <template v-slot:activator="{ on }">
                        <v-icon v-on="on" class="tab-icon" style="font-size: 1.8rem;"
                            color="#38b6ff">mdi-checkbox-multiple-marked</v-icon>
                    </template>
                    <v-list class="header-list">
                        <v-list-item v-for="header in headers.filter(header => header.value !== 'detail' && header.value !== 'select' && header.value !== 'action')"
                            :key="header.value" class="header-item">
                            <v-list-item-content>
                                <v-checkbox v-model="visibleColumns" :value="header.value" :label="header.text" />
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <div>
                    <v-icon @click="CustomerCreateOpen = true" class="tab-icon-two"
                        style="font-size: 1.8rem; margin-left: auto;" left color="#24b224">mdi-account-plus</v-icon>
                </div>
            </div>

            <v-data-table :headers="filteredHeaders" :items="filtered" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
                item-key="no" :items-per-page="5">
                <template v-slot:item.select="{ item }">
                    <div class="text-center"
                        style="display: flex; justify-content: center; align-items: center; height: 100%;">
                        <v-checkbox v-if="isSelectingItems" v-model="selectedItems" :value="item.no"
                            style="transform: scale(1);" />
                    </div>
                </template>
                <template v-slot:item.id="{ item }">
                    <div class="text-center">{{ item.id }}</div>
                </template>
                <template v-slot:item.nickname="{ item }">
                    <div class="text-center">{{ item.nickname }}</div>
                </template>
                <template v-slot:item.type_no="{ item }">
                    <div class="text-center" :style="{ color: getTypeText(getTypeName(item.type_no)).color }">
                        {{ getTypeName(item.type_no) }}
                    </div>
                </template>
                <template v-slot:item.base_no="{ item }">
                    <div class="text-center">
                        {{ getBaseName(item.base_no) }}
                    </div>
                </template>
                <template v-slot:item.employee_no="{ item }">
                    <div class="text-center">{{ getEmployeeName(item.employee_no) }}</div>
                </template>
                <template v-slot:item.updated_date="{ item }">
                    <div class="text-center">{{ formatDateTime(item.updated_date) }}</div>
                </template>
                <template v-slot:item.detail="{ item }">
                    <div class="text-center">
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon v-bind="attrs" v-on="on" color="#85d7df">mdi-dots-vertical</v-icon>
                            </template>
                            <v-list class="custom-list">
                                <v-list-item @click="openEditCustomer(item)" class="custom-list-item">
                                    <v-list-item-icon style="margin-right: 4px;">
                                        <v-icon class="icon-tab" color="#ffc800">mdi-pencil-circle</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content style="font-size: 0.8rem;">แก้ไข</v-list-item-content>
                                </v-list-item>

                                <v-list-item v-if="$auth.user.rank_no === 1 || $auth.user.rank_no === 3"
                                    @click="toggleSelectItems" class="custom-list-item">
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
            <div class="text-center">
                <v-btn v-if="isSelectingItems && selectedItems.length > 0" color="red" @click="deleteSelectedItems"
                    class="mb-4" style="font-size: 1.5 rem; margin-left: auto;">
                    <v-icon left color="white">mdi-delete</v-icon> ลบ
                </v-btn>
            </div>
        </v-card>

        <v-dialog v-model="dialog" max-width="300px">
            <v-card>
                <v-card-title class="headline"
                    style="justify-content: center; display: flex;">รายละเอียดเพิ่มเติม</v-card-title>
                <v-card-text>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#e50211" @click="dialog = false">ปิด</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

</template>

<script>

import ExcelJS from 'exceljs';
import moment from 'moment-timezone';
import 'moment/locale/th'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {

    layout: 'user',
    middleware: 'auth',

    async mounted() {
        await this.checkRank();
        await this.fetchCustomerData();
        await this.fetchEmployeeData();
        await this.fetchTypeData();
        await this.fetchBaseData();
    },

    components: {
        DatePicker,
    },

    data() {
        return {
            modal: {
                warning: {
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

            customers: [],
            types: [],
            employees: [],
            bases: [],

            selectedNicknames: [],
            selectedIds: [],
            selectedTopics: [],

            selectedItems: [],
            handleConfirm: null,
            isSelectingItems: false,
            modalConfirmOpen: false,

            CustomerCreateOpen: false,

            sortBy: 'updated_date',
            currentAction: '',
            searchQuery: '',
            searchType: 'nickname',
            selectedItemDetail: '',
            startDateTime: '',
            endDateTime: '',
            editDialogOpen: false,
            isSearchFieldVisible: false,
            datePickerMenu: false,
            endDatePickerMenu: false,
            showSavedSearchesDialog: false,
            showColumnSelector: false,
            editCustomer: false,
            dialog: false,
            sortDesc: true,
            selectedCustomer: null,
            currentItem: null,
            customerNo: null,
            actionType: null,
            savedSearches: [],
            editAllData: {},

            searchTypes: [
                { text: 'ชื่อเล่น', value: 'nickname' },
                { text: 'รหัสสมาชิก', value: 'id' },
                { text: 'ประเภท', value: 'type_no' },
                { text: 'ข้อมูลวันที่', value: 'updated_date' }
            ],

            visibleColumns: ['updated_date', 'id', 'nickname', 'type_no', 'base_no', 'employee_no', 'detail', 'select'],

            headers: [
                {
                    text: '',
                    value: 'select',
                    sortable: false,
                    align: 'center',
                    cellClass: 'text-center',
                },

                {
                    text: 'ข้อมูลวันที่',
                    value: 'updated_date',
                    align: 'center',
                    cellClass: 'text-center',
                },

                {
                    text: 'ประเภท',
                    value: 'type_no',
                    sortable: false,
                    align: 'center',
                    cellClass: 'text-center',
                },

                {
                    text: 'รหัสสมาชิก',
                    value: 'id',
                    sortable: false,
                    align: 'center',
                    cellClass: 'text-center',
                },

                {
                    text: 'ชื่อเล่น',
                    value: 'nickname',
                    sortable: false,
                    align: 'center',
                    cellClass: 'text-center',
                },

                {
                    text: 'ฐานทุน',
                    value: 'base_no',
                    sortable: false,
                    align: 'center',
                    cellClass: 'text-center',
                },

                {
                    text: 'ทำรายการโดย',
                    value: 'employee_no',
                    sortable: false,
                    align: 'center',
                    cellClass: 'text-center',
                },

                {
                    text: '',
                    value: 'detail',
                    sortable: false,
                    align: 'center',
                    cellClass: 'text-center',
                },
            ],
        };
    },

    computed: {
        filtered() {
            let filteredCustomers = this.customers;
            this.savedSearches.forEach(search => {
                filteredCustomers = filteredCustomers.filter(customer => {
                    return this.applySearchFilter(customer, search);
                });
            });
            return filteredCustomers;
        },

        filteredHeaders() {
            return this.headers.filter(header => this.visibleColumns.includes(header.value));
        },
    },

    methods: {

        toggleSelectItems() {
            this.isSelectingItems = !this.isSelectingItems;
        },

        async deleteSelectedItems() {
            this.handleConfirm = async () => {
                const selectedIds = this.selectedItems;

                for (let i = 0; i < selectedIds.length; i++) {
                    try {
                        await this.$store.dispatch('api/customer/deleteCustomer', selectedIds[i]);

                        this.currentItem = this.getCurrentItem(selectedIds[i]);

                        this.recordLog();
                    } catch (error) {
                        console.error(`Error deleting item with id ${selectedIds[i]}:`, error);
                    }
                }

                this.$emit('updateItems');
                this.selectedItems = [];
                this.isSelectingItems = false;

                this.modal.complete.message = 'ลบรายการที่เลือกสำเร็จ';
                this.modal.complete.open = true;
                this.modalConfirmOpen = false;
            };

            this.modalConfirmOpen = true;
        },

        getCurrentItem(no) {
            return this.customers.find(item => item.no === no);
        },

        async fetchTypeData() {
            this.types = await this.$store.dispatch('api/type/getType')
        },

        getTypeName(typeId) {
            const type = this.types.find(t => t.no === typeId);
            return type ? type.type : 'ยังไม่ระบุ';
        },

        async fetchBaseData() {
            this.bases = await this.$store.dispatch('api/base/getBase')
        },

        getBaseName(baseId) {
            const base = this.bases.find(b => b.no === baseId);
            return base ? base.base : 'ยังไม่ระบุ';
        },

        async fetchCustomerData() {
            this.customers = await this.$store.dispatch('api/customer/getCustomer');
        },

        async fetchEmployeeData() {
            this.employees = await this.$store.dispatch('api/employee/getEmployee');
        },

        getEmployeeName(empId) {
            const employee = this.employees.find(e => e.no === empId);
            return employee ? employee.fname + ' ' + employee.lname : 'ไม่ทราบ';
        },

        openEditCustomer(customer) {
            this.editAllData = customer;
            this.editCustomer = true;
        },

        showEditDialog(item) {
            this.selectedCustomer = item;
            this.editDialogOpen = true;
        },

        getSearchItems(type) {
            if (type === 'nickname') {
                return this.customers.map(emp => emp.nickname);
            } else if (type === 'id') {
                return this.customers.map(emp => emp.id);
            } else if (type === 'type_no') {
                return this.customers.map(emp => this.getTypeName(emp.type_no) || 'ยังไม่ระบุ');
            }
            return [];
        },

        showConfirmDialog(action, item) {
            this.currentAction = action;
            this.currentItem = item;
            this.modalConfirmOpen = true;
        },

        async checkRank() {
            if (this.$auth.loggedIn) {
                const Status = this.$auth.user.status.toString();
                const RankID = this.$auth.user.rank_no.toString();
                if (Status === '2') {
                    this.$router.push('/');
                    await this.$auth.logout();
                }
                else {
                    if (RankID === '1') {
                        this.$router.push('/app/data/customer');
                    } else if (RankID === '2') {
                        this.$router.push('/app/data/customer');
                    } else if (RankID === '3') {
                        this.$router.push('/app/data/customer');
                    } else if (RankID === '4') {
                        this.$router.push('/app/data/customer');
                    } else {
                        this.$router.push('/auth');
                    }
                }
            } else {
                this.$router.push('/');
            }
        },

        getTypeText(type) {
            if (type === 'เทรดเอง') {
                return { text: 'เทรดเอง', color: '#24b224' };
            } else if (type === 'เทรดตามโค้ช') {
                return { text: 'เทรดตามโค้ช', color: '#ffc800' };
            } else {
                return { text: 'ยังไม่ระบุ', color: '#e50211' };
            }
        },

        getBaseText(base) {
            if (base === 'มีเงิน') {
                return { text: 'มีเงิน', color: '#24b224' };
            } else if (base === 'รอจังหวะ') {
                return { text: 'รอจังหวะ', color: '#ffc800' };
            } else if (base === 'รอคุย') {
                return { text: 'รอคุย', color: '#85d7df' };
            } else {
                return { text: 'ยังไม่ระบุ', color: '#e50211' };
            }
        },

        formatDateTime(date) {
            if (moment(date).isValid()) {
                return moment(date).format('YYYY-MM-DD HH:mm');
            }
            return 'Invalid Date';
        },

        openDetail(item) {
            this.selectedItemDetail = item.detail;
            this.dialog = true;
        },

        onSearchTypeChange() {
            this.isSearchFieldVisible = this.searchType !== 'updated_date' && this.searchType !== 'type_no';
        },

        validateDateRange() {
            const start = moment(this.startDateTime);
            const end = moment(this.endDateTime);

            if (start.isValid() && end.isValid() && start.isAfter(end)) {
                this.modal.warning.open = true;
                return false;
            }
            return true;
        },

        addSearch() {
            if (!this.validateDateRange()) {
                return;
            }

            if (this.searchType === 'nickname' || this.searchType === 'id' || this.searchType === 'type_no') {
                this.addSearchItemsToSearch();
            } else {
                this.savedSearches.push({
                    query: this.searchQuery,
                    type: this.searchType,
                    start: this.startDateTime,
                    end: this.endDateTime
                });
                this.searchQuery = '';
                this.startDateTime = '';
                this.endDateTime = '';
            }
        },

        addSearchItemsToSearch() {
            const selectedItems =
                this.searchType === 'nickname' ? this.selectedNicknames :
                    this.searchType === 'id' ? this.selectedIds :
                        this.searchType === 'type_no' ? this.selectedTopics : [];

            if (selectedItems.length > 0) {
                this.savedSearches.push({
                    query: selectedItems,
                    type: this.searchType,
                    start: this.startDateTime,
                    end: this.endDateTime
                });

                if (this.searchType === 'nickname') {
                    this.selectedNicknames = [];
                } else if (this.searchType === 'id') {
                    this.selectedIds = [];
                } else if (this.searchType === 'type_no') {
                    this.selectedTopics = [];
                }

                this.startDateTime = '';
                this.endDateTime = '';
            }
        },

        applySearchFilter(customer, search) {
            let queryMatched = true;

            let field;
            if (search.type === 'type_no') {
                field = this.getTypeName(customer.type_no) || 'ยังไม่ระบุ';
            } else {
                field = customer[search.type];
            }

            if (search.type === 'id' || search.type === 'nickname' || search.type === 'type_no') {
                queryMatched = search.query.some(query => {
                    const lowerCaseField = typeof field === 'string' ? field.toLowerCase() : '';
                    return lowerCaseField === query.toLowerCase();
                });
            } else {
                const searchQuery = search.query.toLowerCase();
                queryMatched = typeof field === 'string' && field.toLowerCase() === searchQuery;
            }

            const timeMatched = search.type === 'updated_date'
                ? this.checkTimeRange(customer, search)
                : true;

            return queryMatched && timeMatched;
        },

        checkTimeRange(customer, search) {
            const customerTime = moment(customer.updated_date);
            const startTime = moment(search.start);
            const endTime = moment(search.end);
            return (!startTime.isValid() || customerTime.isSameOrAfter(startTime)) &&
                (!endTime.isValid() || customerTime.isSameOrBefore(endTime));
        },

        toggleSavedSearchesDialog() {
            this.showSavedSearchesDialog = !this.showSavedSearchesDialog;
        },

        deleteSearch(index) {
            this.savedSearches.splice(index, 1);
        },

        getSearchTypeText(type) {
            const found = this.searchTypes.find(item => item.value === type);
            return found ? found.text : type;
        },

        exportExcel() {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('ลูกค้าทั้งหมด');

            const headers = this.filteredHeaders
                .filter(header => header.value !== 'picture' && header.value !== 'detail' && header.value !== 'select')
                .map(header => ({
                    header: header.text,
                    key: header.value,
                    style: { font: { name: 'Angsana New', size: 16 } }
                }));

            worksheet.columns = headers;

            this.filtered.forEach((item, index) => {
                const rowData = {};
                this.filteredHeaders.forEach(header => {
                    if (header.value === 'updated_date') {
                        rowData[header.value] = moment(item[header.value]).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm');
                    } else if (header.value === 'type_no') {
                        rowData[header.value] = this.getTypeName(item.type_no);
                    } else if (header.value === 'employee_no') {
                        rowData[header.value] = this.getEmployeeName(item.employee_no);
                    } else if (header.value === 'base_no') {
                        rowData[header.value] = this.getBaseName(item.base_no);
                    } else if (header.value !== 'picture' && header.value !== 'detail' && header.value !== 'select') {
                        rowData[header.value] = item[header.value];
                    }
                });
                worksheet.addRow(rowData);
            });

            worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell) => {
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
                cell.font = { bold: true, name: 'Angsana New', size: 18 };
            });

            worksheet.eachRow((row) => {
                row.eachCell({ includeEmpty: true }, (cell) => {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                });
            });

            const currentDate = moment().tz('Asia/Bangkok').format('YYYY-MM-DD');
            workbook.xlsx.writeBuffer().then(buffer => {
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.setAttribute('download', `ข้อมูลลูกค้า-${currentDate}.xlsx`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        },

        goBack() {
            window.location.reload();
        },

        recordLog() {
            const Employee_Name = this.$auth.user.fname + ' ' + this.$auth.user.lname;
            const Employee_Email = this.$auth.user.email;
            const Employee_Picture = this.$auth.user.picture;
            const log = {
                action: 'ลูกค้า',
                name: this.currentItem.id,
                detail: 'ชื่อเล่น : ' + this.currentItem.nickname +
                    '\nประเภท : ' + this.getTypeName(this.currentItem.type_no) +
                    '\nฐานทุน : ' + this.getBaseName(this.currentItem.base_no),
                type: 1,
                employee_name: Employee_Name,
                employee_email: Employee_Email,
                employee_picture: Employee_Picture,
                created_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            };

            this.$store.dispatch('api/log/addLog', log);
        },


        goToNewUser() {
            this.$router.push('/app/user/new');
        },
    },
};

</script>

<style scoped>
.small-font {
    font-size: 0.8rem;
}

::v-deep .v-select-list .v-list-item__title {
    font-size: 0.8rem;
}

::v-deep .v-label {
    font-size: 0.8rem;
}

.small-label {
    margin-right: 8px;
}

.small-icon {
    font-size: 1.5rem;
    margin-right: 6px;
    margin-left: 6px;
}

.tab-icon {
    cursor: pointer;
    margin-right: 6px;
    margin-left: 24px;
}

.tab-icon-two {
    cursor: pointer;
    margin-right: 24px;
    margin-left: 0px;
}

.little-icon {
    font-size: 2.5rem;
    margin-right: 8px;
    margin-left: 8px;
}

.date-picker-activator {
    display: flex;
    align-items: center;
}

.ml-2 {
    margin-left: 8px;
}

.mx-2 {
    margin-left: 8px;
    margin-right: 8px;
}


.mt-2 {
    margin-top: 1px;
}

.d-flex {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
}

.same-size {
    max-width: 200px;
    max-height: 40px;
}

.search-size {
    max-width: 200px;
    max-height: 40px;
}

.v-data-table th,
.v-data-table td {
    padding: 8px;
    text-align: center;
}

.v-card-title {
    display: flex;
    align-items: center;
}

::v-deep .v-text-field.small-font .v-input__control .v-input__label {
    font-size: 0.8rem !important;
}

.v-menu__content {
    top: 100%;
    left: 0;
    margin-top: 0px;
    margin-bottom: 0px;
}

.custom-list-item {
    padding: 0 0;
}

.v-list-item__content {
    padding: 0;
}

.header-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    gap: 0px;
}

.header-item {
    flex: 1 0 0%;
    box-sizing: border-box;
}

.v-list-item__content {
    display: flex;
    align-items: center;
}

.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
}

.image-container img {
    max-width: 100%;
    max-height: 60px;
}

.icon-tab {
    font-size: 120% !important;
}

.custom-list-item {
    padding: 0.1px 8px;
}

.custom-list {
    padding: 0.4px 2px;
}

.custom-card {
    max-width: 1000px;
    width: 100%;
    margin: auto;
}
</style>