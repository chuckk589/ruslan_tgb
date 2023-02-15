<template>
  <AgGridVue
    class="ag-theme-alpine"
    :column-defs="columnDefs"
    :default-col-def="defaultColDef"
    animateRows
    suppressCellFocus
    :get-row-id="getRowId"
    :row-data="rowData"
    rowSelection="multiple"
    suppressRowClickSelection
    pagination
    style="height: 100%"
    @grid-ready="onGridReady"
  >
  </AgGridVue>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3';
import UserCell from '../components/cellRenderers/UserCell.vue';
export default {
  name: 'UsersView',
  components: {
    AgGridVue,
    // eslint-disable-next-line vue/no-unused-components
    UserCell,
  },
  data() {
    return {
      columnDefs: [
        {
          headerName: 'ID',
          field: 'id',
        },
        { field: 'chatId', headerName: 'Telegram Id' },
        { field: 'username', headerName: 'Username' },
        {
          field: 'locale',
          headerName: 'Язык',
          valueFormatter: (params) =>
            this.$ctable.locales.find((c) => c.value == params.value)?.title,
          sortable: true,
        },
        {
          field: 'role',
          headerName: 'Роль',
          valueFormatter: (params) =>
            this.$ctable.roles.find((c) => c.value == params.value)?.title,
          sortable: true,
        },
        {
          field: 'createdAt',
          headerName: 'Дата регистрации',
          sortable: true,
          valueFormatter: (params) => new Date(params.value).toLocaleString(),
        },
        {
          field: 'action',
          headerName: '',
          filter: false,
          sortable: false,
          cellRenderer: 'UserCell',
        },
      ],
      gridApi: null,
      defaultColDef: {
        sortable: true,
        flex: 1,
        filter: true,
      },
      getRowId: function (params) {
        return params.data.id;
      },
      rowData: [],
    };
  },
  beforeUnmount() {
    this.$emitter.off('edit-user');
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.$http({ method: 'GET', url: `/v1/user/` }).then((res) => {
        this.rowData = res.data;
        this.gridApi.setRowData(this.rowData);
      });
      this.$emitter.on('edit-user', (evt) => {
        console.log(this.$emitter);
        const rowNode = this.gridApi.getRowNode(evt.id);
        rowNode.setData(evt);
      });
      
    },
  },
};
</script>
