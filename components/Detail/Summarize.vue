<template>
    <v-dialog v-model="dialog" max-width="650px">
        <div>
            <DetailChange :open="editStock" :data="editAllData" @update:edit="editStock = false" />
        </div>
        <v-card>
            <v-card-title class="d-flex align-center justify-center">
                <v-icon color="#ffc800" size="30">mdi-account-hard-hat</v-icon>&nbsp;
                <span class="custom-title">สรุปหุ้น</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row justify="center" align="center">
                        <v-col cols="auto">
                            <div class="d-flex align-center justify-center">
                                <div class="d-flex align-center justify-center">
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
                                                    <v-list-item-content
                                                        style="justify-content: center; display: flex;">
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
                                    class="mx-2 search-size small-font"></v-select>

                                <v-autocomplete v-if="searchType === 'stock_no'" v-model="selectedStocks"
                                    class="mx-2 search-size small-font" :items="getSearchItems('stock_no')"
                                    label="ค้นหาชื่อหุ้น" dense outlined clearable multiple>
                                </v-autocomplete>

                                <v-autocomplete v-if="searchType === 'staff_no'" v-model="selectedStaffs"
                                    class="mx-2 search-size small-font" :items="getSearchItems('staff_no')"
                                    label="ค้นหาที่มาของหุ้น" dense outlined clearable multiple>
                                </v-autocomplete>

                                <v-btn icon @click="addSearch">
                                    <v-icon class="small-icon ">mdi-plus</v-icon>
                                </v-btn>

                                <v-btn color="success"
                                v-if="$auth.user.rank_no === 1 || $auth.user.rank_no === 3 "
                                @click="exportExcel" icon><v-icon>mdi-file-excel</v-icon></v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
                <v-data-table :headers="headers" :items="filteredDetails" item-value="no" item-key="no"
                    :items-per-page="5">
                    <template v-slot:item.stock_no="{ item }">
                        <div class="text-center">{{ getStockName(item.stock_no) }}</div>
                    </template>
                    <template v-slot:item.updated_date="{ item }">
                        <div class="text-center">{{ formatDateTime(item.updated_date) }}</div>
                    </template>
                    <template v-slot:item.staff_no="{ item }">
                        <div class="text-center">{{ getEmployeeName(item.staff_no) }}</div>
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
                                        <v-list-item-content
                                            style="font-size: 0.8rem;">แก้ไขผู้ติดตามหุ้น</v-list-item-content>
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
import ExcelJS from 'exceljs';

export default {
    props: {
        value: Boolean,
    },

    data() {
        return {
            filteredDetails: [],
            selectedStocks: [],
            selectedStaffs: [],
            showSavedSearchesDialog: false,
            searchType: 'stock_no',
            searchTypes: [
                { text: 'ชื่อหุ้น', value: 'stock_no' },
                { text: 'ผู้ติดตามหุ้น', value: 'staff_no' },
            ],
            searchQuery: '',
            savedSearches: [],

            details: [],
            stocks: [],
            employees: [],

            editStock: false,
            editAllData: {},

            dialog: this.value,

            headers: [
                {
                    text: 'ข้อมูลวันที่',
                    value: 'updated_date',
                    align: 'center',
                    cellClass: 'text-center',
                },

                {
                    text: 'ชื่อหุ้น',
                    value: 'stock_no',
                    sortable: false,
                    align: 'center',
                    cellClass: 'text-center',
                },

                {
                    text: 'จำนวน',
                    value: 'stock_amount',
                    sortable: false,
                    align: 'center',
                    cellClass: 'text-center',
                },

                {
                    text: 'ผู้ติดตามหุ้น',
                    value: 'staff_no',
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

    watch: {
        value(newValue) {
            this.dialog = newValue;
        },
        dialog(newValue) {
            this.$emit('input', newValue);
        },
        savedSearches() {
            this.applyFilters();
        },
        details() {
            this.applyFilters();
        }
    },

    async mounted() {
        await Promise.all([
            this.fetchDetailData(),
            this.fetchStockData(),
            this.fetchEmployeeData()
        ]);
    },

    methods: {
        openEditStock(follow) {
            this.editAllData = follow;
            this.editStock = true;
        },

        applyFilters() {
            this.filteredDetails = this.details.filter(detail => {
                return this.savedSearches.every(search => this.applySearchFilter(detail, search));
            });
        },

        getSearchItems(type) {
            if (type === 'stock_no') {
                return this.details
                    .filter(detail => this.getStockName(detail.stock_no))
                    .map(detail => this.getStockName(detail.stock_no));
            } else if (type === 'staff_no') {
                return this.details
                    .filter(detail => this.getEmployeeName(detail.staff_no))
                    .map(detail => this.getEmployeeName(detail.staff_no));
            }
            return [];
        },

        addSearch() {
            if (this.searchType === 'stock_no' || this.searchType === 'staff_no') {
                this.addSearchItemsToSearch();
            } else {
                if (this.searchQuery.trim()) {

                    const savedSearch = {
                        query: this.searchQuery,
                        type: this.searchType,
                    };
                    this.savedSearches.push(JSON.parse(JSON.stringify(savedSearch)));
                    this.searchQuery = '';
                }
            }
        },

        addSearchItemsToSearch() {
            const selectedItems =
                this.searchType === 'stock_no' ? this.selectedStocks :
                    this.searchType === 'staff_no' ? this.selectedStaffs : [];

            if (selectedItems.length > 0) {
                this.savedSearches.push({
                    query: selectedItems,
                    type: this.searchType,
                });

                if (this.searchType === 'stock_no') {
                    this.selectedStocks = [];
                }
                if (this.searchType === 'staff_no') {
                    this.selectedStaffs = [];
                }

            }
        },

        applySearchFilter(detail, search) {
            let field;
            if (search.type === 'stock_no') {
                field = this.getStockName(detail.stock_no) || 'ยังไม่ระบุ';
            } else if (search.type === 'staff_no') {
                field = this.getEmployeeName(detail.staff_no) || 'ยังไม่ระบุ';
            } else {
                field = detail[search.type];
            }

            if (Array.isArray(search.query)) {
                return search.query.some(query => {
                    const lowerCaseField = typeof field === 'string' ? field.toLowerCase() : '';
                    return lowerCaseField === query.toLowerCase();
                });
            } else {
                const searchQuery = search.query.toLowerCase();
                return typeof field === 'string' && field.toLowerCase() === searchQuery;
            }
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

        async fetchDetailData() {
            this.details = await this.$store.dispatch('api/detail/getDetail');
            const transactions = await this.$store.dispatch('api/transaction/getTransaction');
            const stocks = await this.$store.dispatch('api/stock/getStock');

            if (!transactions || !Array.isArray(transactions)) {
                console.error('Transactions data is missing or invalid:', transactions);
                transactions = [];
            }

            if (!stocks || !Array.isArray(stocks)) {
                console.error('Stocks data is missing or invalid:', stocks);
                stocks = [];
            }

            const filteredDetails = this.details.filter(detail => {
                const relatedTransactions = transactions.filter(
                    transaction => transaction.stock_detail_no === detail.no
                );

                const buy = (detail.amount || 0) +
                    relatedTransactions
                        .filter(transaction => transaction.type === 1)
                        .reduce((sum, transaction) => sum + (transaction.amount || 0), 0);

                const sale = relatedTransactions
                    .filter(transaction => transaction.type === 2)
                    .reduce((sum, transaction) => sum + (transaction.amount || 0), 0);

                const remainingStock = buy - sale;
                return remainingStock > 0;
            });

            const stockCount = filteredDetails.reduce((acc, detail) => {
                const stockNo = detail.stock_no;

                if (!acc[stockNo]) {
                    acc[stockNo] = { count: 0, latestUpdatedDate: null };
                }

                acc[stockNo].count += 1;

                if (!acc[stockNo].latestUpdatedDate || new Date(detail.updated_date) > new Date(acc[stockNo].latestUpdatedDate)) {
                    acc[stockNo].latestUpdatedDate = detail.updated_date;
                }

                return acc;
            }, {});

            const uniqueDetails = [];
            filteredDetails.forEach(detail => {
                const stockNo = detail.stock_no;

                if (!uniqueDetails.some(item => item.stock_no === stockNo)) {
                    const matchingStock = stocks.find(stock => stock.no === stockNo);
                    detail.staff_no = matchingStock ? matchingStock.staff_no : null;

                    detail.stock_amount = stockCount[stockNo].count;
                    detail.latest_updated_date = stockCount[stockNo].latestUpdatedDate;

                    uniqueDetails.push(detail);
                }
            });

            this.details = uniqueDetails;
        },

        async fetchStockData() {
            this.stocks = await this.$store.dispatch('api/stock/getStock')
        },

        async fetchEmployeeData() {
            this.employees = await this.$store.dispatch('api/employee/getEmployee')
        },

        getEmployeeName(employeeNo) {
            const employee = this.employees.find(e => e.no === employeeNo);
            return employee ? employee.fname + ' ' + employee.lname : '';
        },

        getStockName(stockNo) {
            const stock = this.stocks.find(s => s.no === stockNo);
            return stock ? stock.stock : '';
        },

        formatDateTime(date) {
            if (moment(date).isValid()) {
                return moment(date).format('DD/MM/YYYY HH:mm');
            }
            return 'Invalid Date';
        },

        exportExcel() {
            const workbook = new ExcelJS.Workbook();

            const groupedDetails = this.filteredDetails.reduce((acc, item) => {
                if (!acc[item.staff_no]) acc[item.staff_no] = [];
                acc[item.staff_no].push(item);
                return acc;
            }, {});

            Object.keys(groupedDetails).forEach(staff_no => {
                const employeeName = this.getEmployeeName(parseInt(staff_no));
                const worksheet = workbook.addWorksheet(employeeName || `พนักงาน-${staff_no}`);

                const headers = this.headers.filter(header => header.value !== 'detail' && header.value !== 'staff_no')
                    .map(header => ({
                        header: header.text,
                        key: header.value,
                        style: { font: { name: 'Angsana New', size: 16 } }
                    }));

                worksheet.columns = headers;

                groupedDetails[staff_no].forEach((item, index) => {
                    const rowData = {};
                    this.headers.forEach(header => {
                        if (header.value === 'updated_date') {
                            rowData[header.value] = moment(item[header.value]).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm');
                        } else if (header.value === 'stock_no') {
                            rowData[header.value] = this.getStockName(item.stock_no);
                        } else if (header.value === 'stock_amount') {
                            rowData[header.value] = item.stock_amount.toLocaleString(2);
                        } else if (header.value !== 'detail' && header.value !== 'staff_no') {
                            rowData[header.value] = item[header.value];
                        } else {
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
            });

            const currentDate = moment().tz('Asia/Bangkok').format('YYYY-MM-DD');
            workbook.xlsx.writeBuffer().then(buffer => {
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.setAttribute('download', `หุ้นของโค้ช-${currentDate}.xlsx`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
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
    flex: 1 0 20%;
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

.v-card-title .custom-title {
    font-size: 1.5rem !important;
}
</style>
