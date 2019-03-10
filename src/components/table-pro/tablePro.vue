<style lang="less" scoped>
 .table-pro .column-bar > label.ivu-checkbox-group-item {
    width: 100px;
    height: 20px;
    line-height: 1px;
  }
</style>

<template>
  <div class="table-pro">
    <div class="action-bar">
      <slot name="actionBar"></slot>
    </div>
    <Table
      ref="tablesMain"
      :data="insideTableData"
      :columns="insideColumns"
      :stripe="stripe"
      :border="border"
      :show-header="showHeader"
      :width="width"
      :height="height"
      :loading="loading"
      :disabled-hover="disabledHover"
      :highlight-row="highlightRow"
      :row-class-name="rowClassName"
      :size="size"
      :no-data-text="noDataText"
      :no-filtered-data-text="noFilteredDataText"
      @on-current-change="onCurrentChange"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-selection-change="onSelectionChange"
      @on-sort-change="onSortChange"
      @on-filter-change="onFilterChange"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @on-expand="onExpand"
    >
      <slot name="header" slot="header"></slot>
      <slot name="footer" slot="footer"></slot>
      <slot name="loading" slot="loading"></slot>
    </Table>

    <div class="table-bottom">
      <div class="table-action">
        <Tooltip class="item" effect="dark" :content="$t('btn.refresh')" placement="top">
          <Button @click="onRefresh" :size="size">
            <Icon type="ios-refresh"/>
          </Button>
        </Tooltip>
        <Tooltip v-if="bizKey" class="item" effect="dark" :content="$t('btn.switchColumn')" placement="right">
          <Poptip placement="top-start" width="490" word-wrap :transfer="true">
            <Button :size="size">
              <Icon type="ios-apps-outline"/>
            </Button>
            <div slot="content">
              <Checkbox-group class="column-bar" v-model="tableColumnsChecked" :size="size"
                              @on-change="handleTableColumnChange">
                <template v-for="(item, key) in columns">
                  <Checkbox :label="item.key" v-if="item.key != 'handle' && item.type !== 'selection'">{{ item.title
                    }}
                  </Checkbox>
                </template>
              </Checkbox-group>
            </div>
          </Poptip>
        </Tooltip>
      </div>
      <div class="table-pagination">
        <Page :total="total"
              show-elevator
              show-sizer
              :page-size-opts="pageSizeOpts"
              :page-size="pageSizeOpts[0]"
              @on-change="onPageChange"
              @on-page-size-change="onPageSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import TablesEdit from './edit.vue'
  import handleBtns from './handle-btns'
  import './index.less'

  export default {
    name: 'Tables',
    props: {
      value: {
        type: Array,
        default() {
          return []
        }
      },
      columns: {
        type: Array,
        default() {
          return []
        }
      },
      size: {
        type: String,
        default() {
          return 'default';
        }
      },
      width: {
        type: [Number, String]
      },
      height: {
        type: [Number, String]
      },
      stripe: {
        type: Boolean,
        default: false
      },
      border: {
        type: Boolean,
        default: true
      },
      showHeader: {
        type: Boolean,
        default: true
      },
      highlightRow: {
        type: Boolean,
        default: false
      },
      rowClassName: {
        type: Function,
        default() {
          return ''
        }
      },
      context: {
        type: Object
      },
      noDataText: {
        type: String
      },
      noFilteredDataText: {
        type: String
      },
      disabledHover: {
        type: Boolean
      },
      loading: {
        type: Boolean,
        default: false
      },
      /**
       * @description 全局设置是否可编辑
       */
      editable: {
        type: Boolean,
        default: false
      },
      total: {
        type: Number,
        default: 0
      },
      bizKey: {
        type: String,
        default: null
      },
      pageSizeOpts: {
        type: Array,
        default: () => {
          return [20, 50, 100, 200]
        }
      }
    },
    /**
     * Events
     * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
     * @on-cancel-edit 返回值 {Object} 同上
     * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
     */
    data() {
      return {
        insideColumns: [],
        insideTableData: [],
        edittingCellId: '',
        edittingText: '',
        tableColumnsChecked: []
      }
    },
    methods: {
      suportEdit(item, index) {
        item.render = (h, params) => {
          return h(TablesEdit, {
            props: {
              params: params,
              value: this.insideTableData[params.index][params.column.key],
              edittingCellId: this.edittingCellId,
              editable: this.editable
            },
            on: {
              'input': val => {
                this.edittingText = val
              },
              'on-start-edit': (params) => {
                this.edittingCellId = `editting-${params.index}-${params.column.key}`
                this.$emit('on-start-edit', params)
              },
              'on-cancel-edit': (params) => {
                this.edittingCellId = ''
                this.$emit('on-cancel-edit', params)
              },
              'on-save-edit': (params) => {
                this.value[params.row.initRowIndex][params.column.key] = this.edittingText
                this.$emit('input', this.value)
                this.$emit('on-save-edit', Object.assign(params, {value: this.edittingText}))
                this.edittingCellId = ''
              }
            }
          })
        }
        return item
      },
      surportHandle(item) {
        let options = item.options || []
        let insideBtns = []
        options.forEach(item => {
          if (handleBtns[item]) insideBtns.push(handleBtns[item])
        })
        let btns = item.button ? [].concat(insideBtns, item.button) : insideBtns;
        item.render = (h, params) => {
          params.tableData = this.value
          return h('div', btns.map(item => item(h, params, this)))
        }
        return item
      },

      handleColumns(columns) {
        let tableColumnsChecked = this.tableColumnsChecked, columnsData = [];
        columns.map((item, index) => {
          let res = item
          if (tableColumnsChecked.indexOf(res.key) >= 0) {
            if (res.editable) {
              res = this.suportEdit(res, index)
            }
            if (res.key === 'handle') {
              res = this.surportHandle(res)
            }
            columnsData.push(res)
          }
        })
        this.insideColumns = columnsData;
      },

      handleClear(e) {
        if (e.target.value === '') this.insideTableData = this.value
      },

      handleTableData() {
        this.insideTableData = this.value.map((item, index) => {
          let res = item
          res.initRowIndex = index
          return res
        })
      },
      handleTableColumnChange(val) {
        localStorage.setItem(this.bizKey, JSON.stringify(this.tableColumnsChecked));
        this.handleColumns(this.columns)
      },
      exportCsv(params) {
        this.$refs.tablesMain.exportCsv(params)
      },
      clearCurrentRow() {
        this.$refs.talbesMain.clearCurrentRow()
      },
      onCurrentChange(currentRow, oldCurrentRow) {
        this.$emit('on-current-change', currentRow, oldCurrentRow)
      },
      onSelect(selection, row) {
        this.$emit('on-select', selection, row)
      },
      onSelectCancel(selection, row) {
        this.$emit('on-select-cancel', selection, row)
      },
      onSelectAll(selection) {
        this.$emit('on-select-all', selection)
      },
      onSelectionChange(selection) {
        this.$emit('on-selection-change', selection)
      },
      onSortChange(column, key, order) {
        this.$emit('on-sort-change', column, key, order)
      },
      onFilterChange(row) {
        this.$emit('on-filter-change', row)
      },
      onRowClick(row, index) {
        this.$emit('on-row-click', row, index)
      },
      onRowDblclick(row, index) {
        this.$emit('on-row-dblclick', row, index)
      },
      onExpand(row, status) {
        this.$emit('on-expand', row, status)
      },
      onRefresh() {
        this.$emit('on-refresh', null)
      },
      onPageSizeChange(size) {
        this.$emit('on-page-size-change', size)
      },
      onPageChange(page) {
        this.$emit('on-page-change', page)
      }
    },
    watch: {
      columns(columns) {
        this.handleColumns(columns)
      },
      value(val) {
        this.handleTableData()
      }
    },
    mounted() {
      let columnsCheck = JSON.parse(localStorage.getItem(this.bizKey))
      if (columnsCheck && columnsCheck.length > 0) {
        this.tableColumnsChecked = columnsCheck;
      } else {
        this.tableColumnsChecked = this.columns.map(item => {
          if (item.key && item.type !== 'selection') {
            return item.key
          }
        });
      }
      this.handleColumns(this.columns)
      this.handleTableData()
    }
  }
</script>
