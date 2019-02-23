<template>
  <div class="card list-page-content">
    <Row :gutter="8">
      <Form ref="form" :model="queryForm" class="query-form">
        <Col :sm="12" :md="8" :lg="6">
          <FormItem>
            <Input v-model="queryForm.userName" placeholder="Username"/>
          </FormItem>
        </Col>
        <Col :sm="12" :md="8" :lg="6">
          <FormItem>
            <Input v-model="queryForm.account" placeholder="account"/>
          </FormItem>
        </Col>
        <Col :sm="12" :md="8" :lg="6">
          <FormItem>
            <v-time-picker-pro ref="timePickerPro"/>
          </FormItem>
        </Col>
        <Col :sm="12" :md="8" :lg="6">
          <FormItem>
            <Button icon="ios-search" @click="doQuery">{{$t('btn.search')}}</Button>
          </FormItem>
        </Col>
      </Form>
    </Row>
    <TablePro
      :height="height - 180"
      :loading="loading"
      ref="tables"
      editable
      v-model="list"
      :columns="columns"
      :total="pageInfo.total"
      :bizKey="bizKey"
      @on-delete="doDelete"
      @to-edit="toEdit"
      @on-row-dblclick="toEdit"
      @on-selection-change="doSelectRow"
      @on-page-change="doChangePageIndex"
      @on-page-size-change="doChangePageSize"
    >
      <template slot="actionBar">
        <ButtonGroup class="mb10">
          <Button v-permission="permissions.add" @click="toEdit(null)" icon="ios-add">{{$t('btn.add')}}</Button>
          <Button :disabled="selectRowData.length <= 0" @click="toEdit(null)" v-permission="permissions.delete"
                  icon="ios-trash-outline">{{$t('btn.delete')}}
          </Button>
        </ButtonGroup>
      </template>
    </TablePro>

  </div>
</template>
<script>
  import listMixin from '@/libs/mixin/listMixin'
  import user from '@/libs/url/sys/user'
  import columns from './config/columns'
  import TablePro from '_c/table-pro'

  export default {
    name: 'sys-user-list',
    data() {
      return {
        queryForm: {
          userName: null,
          account: null
        },
        bizKey: 'sysUserList',
        selectRowData: [],
        columns: columns.new(this),
        list: [],
        url: user.url(),
        permissions: user.permission,
        addRouterName: 'userForm'
      }
    },
    mounted() {
      this.doInit()
    },
    mixins: [listMixin],
    components: {TablePro},
    methods: {
      doInit() {
        this.doPage()
      },
      doDelete(params) {
      },
      toEdit(params) {
        this.toAdd((params === null ? 0 : params.id))
      },
      doSelectRow(selection) {
        this.selectRowData = selection
      }
    }
  }
</script>

<style lang="less">

</style>
