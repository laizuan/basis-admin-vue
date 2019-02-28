<template>
  <div class="page-content">
    <div :style="{'height': height + 'px'}">
      <split-pane v-model="offset">
        <div slot="left" class="pane left-pane">
          <Form ref="form" :model="queryForm" class="query-form">
            <Row :gutter="8">
              <Col :sm="12" :md="8" :lg="6">
                <FormItem>
                  <Input v-model="queryForm.menuName" clearable :placeholder="$t('system.menu.column.resourceName')"/>
                </FormItem>
              </Col>
              <Col :sm="12" :md="8" :lg="6">
                <FormItem>
                  <Button class="mr10" icon="ios-search" @click="doQuery">{{$t('btn.search')}}</Button>
                  <Button type="primary" @click="toAdd(null)" icon="ios-add">{{$t('btn.add')}}</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>


          <TreeTable
            :style="{'height': (height-80) + 'px', 'overflow': 'auto'}"
            :showIndex="false"
            border
            index-text="#"
            :is-fold="true"
            expand-key="menuName"
            :expand-type="true"
            :selectable="false"
            :columns="column"
            :data="list">

            <template slot="$expand" slot-scope="scope">
              <Row class="menu-expand" :gutter="8">
                <Col :span="6"><label>{{ $t('system.menu.column.resourceName')}}：</label><span>{{ scope.row.menuName }}</span></Col>
                <Col :span="6"><label>{{$t('system.menu.column.icon')}}：</label><span><v-icons :type="scope.row.icon"></v-icons></span></Col>
                <Col :span="6"><label>{{$t('system.menu.column.permission')}}：</label><span>{{ scope.row.permission }}</span></Col>
                <Col :span="6"><label>{{$t('system.menu.column.sort')}}：</label><span>{{ scope.row.sortNo }}</span></Col>
              </Row>
              <Row class="menu-expand" :gutter="8">
                <Col :span="6"><label>{{ $t('system.menu.column.status')}}：</label><span>{{ scope.row.enable.desc }}</span></Col>
                <Col :span="6"><label>{{$t('system.menu.column.type')}}：</label><span>{{ scope.row.menuType.desc }}</span></Col>
                <Col :span="6"><label>{{$t('system.menu.column.visible')}}：</label><span>{{ scope.row.visible.desc }}</span></Col>
              </Row>
            </template>

            <template slot="action" slot-scope="scope">
              <Button type="text" class="primary-text-color" @click="toEdit(scope.row)" ghost size="small">
                {{$t('btn.detail')}}
              </Button>
              <Divider type="vertical"/>
              <Button type="text" class="success-text-color" @click="toAdd(scope.row)" ghost size="small">
                {{$t('btn.add')}}
              </Button>
              <Divider type="vertical"/>
              <Poptip
                confirm
                placement="top-end"
                :transfer="true"
                :title="$t('message.deleteMsg')"
                @on-ok="doDelete(scope.row)">
                <Button type="text" class="error-text-color" ghost size="small">
                  {{$t('btn.delete')}}
                </Button>
              </Poptip>

            </template>

            <template slot="icon" slot-scope="scope">
              <div v-if="scope.row.icon != null">
                <v-icons :type="scope.row.icon" :size="20"/>
              </div>
            </template>

            <template slot="menuType" slot-scope="scope">
              <Tag type="dot" v-if="scope.row.menuType.value === 0" color="success">{{ scope.row.menuType.desc }}</Tag>
              <Tag type="dot" v-else-if="scope.row.menuType.value === 1" color="primary">{{ scope.row.menuType.desc }}
              </Tag>
              <Tag type="dot" v-else color="warning">{{ scope.row.menuType.desc }}</Tag>
            </template>
          </TreeTable>

        </div>
        <div slot="right" class="pane right-pane">
          <MenuForm @handleFast="doFast" :formData="selectRow" :list="list" :btnLoading="loading" @doSave="doSave"/>
        </div>
      </split-pane>
    </div>
  </div>
</template>
<script>
  import SplitPane from '_c/split-pane';
  import columns from './config/columns'
  import TreeTable from 'tree-table-vue'
  import MenuForm from './components/_form'
  import model from './config/model'
  import config from './config/config'

  export default {
    name: 'sys-menu-list',
    components: {SplitPane, TreeTable, MenuForm},
    data() {
      return {
        loading: false,
        queryForm: {},
        offset: 0.68,
        list: [],
        height: this.$config.clientHeight - 140,
        url: config.url,
        column: columns.new(this),
        selectRow: null,
        permissions: config.permission
      }
    },
    mounted() {
      this.doInit()
    },
    methods: {
      doInit() {
        this.doQuery()
      },
      doQuery() {
        this.$api.get(this.url.treeList, this.queryForm, (res) => {
          this.list = res.data;
        })
      },
      toAdd(row) {
        let form = model.new()
        if (row) {
          form.parentId = row.id;
          form.parentName = row.menuName;
        }
        this.selectRow = form
      },
      doSave(data) {
        this.loading = true;
        this.$api.post((data.id ? this.url.update : this.url.add), data, (res) => {
          this.loading = false;
          if (res.data) {
            this.$api.messageSuccess()
            this.doInit()
            this.selectRow = model.new()
          }
        }, ()=>{this.loading = false})
      },
      toEdit(row) {
        let form = {}
        form.id = row.id;
        let parentId = row.parentId
        if (parentId && parentId !== 0) {
          form.parentId = parentId
          let objs = this.list.filter(item => item.id === parentId)
          if (objs.length > 0) {
            form.parentName = objs[0].menuName
          }
        }
        this.selectRow = form;
      },
      doDelete(row) {
        this.$api.get(this.url.delete, {id: row.id}, (res) => {
          if (res.data === true) {
            this.$api.messageSuccess()
            this.doInit()
          }
        })
      },
      doFast(data) {
        if (data) {
          this.doInit()
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .pane {
    padding: 10px;
    height: 100%;
    background: #fff;
  }

  .right-pane {
    overflow: auto;
  }
  .menu-expand {
    label {
      width: 120px;
      color: rgba(0,0,0,.85);
      text-align: right;
    }
    span{
      color: rgba(0,0,0,.65);
    }
  }
</style>
