<template>
  <div class="card list-page-content">
    <Form ref="form" :model="queryForm" class="query-form">
      <Row :gutter="8">
        <Col :sm="12" :md="8" :lg="6">
          <FormItem>
            <Input v-model="queryForm.roleName" :placeholder="$t('system.role.roleNameSelectPlaceholder')"/>
          </FormItem>
        </Col>
        <Col :sm="12" :md="8" :lg="6">
          <FormItem>
            <Button class="mr10" icon="ios-search" @click="doQuery">{{$t('btn.search')}}</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <TablePro
      :height="height - 170"
      :loading="loading"
      ref="tables"
      editable
      v-model="list"
      :columns="columns"
      :total="pageInfo.total"
      :bizKey="bizKey"
      @on-delete="doDelete"
      @to-edit="toEdit"
      @on-selection-change="doSelectRow"
      @on-page-change="doChangePageIndex"
      @on-page-size-change="doChangePageSize"
    >
      <template slot="actionBar">
        <ButtonGroup type="primary" shape="circle">
          <!--v-permission="permissions.add"-->
          <Button @click="toAdd" icon="ios-add">{{$t('btn.add')}}</Button>
          <Button :disabled="selectRowData.length <= 0" @click="toEdit(null)" v-permission="permissions.delete"
                  icon="ios-trash-outline">{{$t('btn.delete')}}
          </Button>
        </ButtonGroup>
      </template>
    </TablePro>

    <Drawer
      class="edit-drawer"
      title="Create"
      v-model="showRoleFormFlag"
      width="720">
      <role-form :id="roleId"
                 :flag = "showRoleFormFlag"
                 @handleClose="showRoleFormFlag = false"
                 @handleSave="doSave" />
    </Drawer>
  </div>
</template>

<script>
import columns from './config/columns'
import listMixin from '@/libs/mixin/listMixin'
import config from './config/config'
import TablePro from '_c/table-pro'
import RoleForm from './components/_form'

export default {
  name: 'system-role-list',
  components: { TablePro, RoleForm },
  data () {
    return {
      roleId: null,
      queryForm: {},
      list: [],
      showRoleFormFlag: false,
      permissions: config.permission,
      selectRowData: [],
      bizKey: 'sysRoleManager',
      url: config.url,
      columns: columns.new(this)
    }
  },
  mixins: [listMixin],
  created () {
    this.doInit()
  },
  methods: {
    doInit () {
      this.doPage()
    },
    toAdd () {
      this.roleId = 0
      this.showRoleFormFlag = true
    },
    toEdit (column) {
      this.roleId = column.row.id
      this.showRoleFormFlag = true
    },
    doDelete(coulmn) {
      this.$api.get(this.url.delete, {roleId: coulmn.row.id}, () => {
        this.$api.messageSuccess()
        this.doQuery()
      })
    },
    doSave(data){
      let url = (data.id && data.id != 0) ? this.url.update : this.url.add;
      this.$api.post(url, data, (res) => {
          if (res.data) {
            this.showRoleFormFlag = false;
            this.$api.messageSuccess()
            setTimeout(() => {
              this.doInit()
            }, 1000)
          }
      })
    },
    doSelectRow (data) {
      this.selectRowData = data
    }
  }
}
</script>
