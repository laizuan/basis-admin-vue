<template>
  <div class="edit-content">
    <div class="card">
      <div class="title-box">
        <h3>{{ $t('system.menu.title') }}</h3>
        <ButtonGroup>
          <Button @click="doPrefab('list')">{{ $t('btn.list') }}</Button>
          <Button @click="doPrefab('add')">{{ $t('btn.add') }}</Button>
          <Button @click="doPrefab('edit')">{{ $t('btn.edit') }}</Button>
          <Button @click="doPrefab('delete')">{{ $t('btn.delete') }}</Button>
        </ButtonGroup>
      </div>

      <Form ref="menuForm" :model="form" :rules="rules" :label-width="120">
        <FormItem :label="$t('system.menu.column.resourceName')" prop="menu.menuName">
          <Input v-model="form.menu.menuName"
                 :placeholder="$t('tip.input') + $t('system.menu.column.resourceName') + $t('tip.required')"></Input>
        </FormItem>

        <FormItem :label="$t('system.menu.column.parentName')" prop="menu.parentId">
          <treeselect v-model="form.menu.parentId"
                      :clearable="true"
                      :placeholder="$t('tip.select2') + $t('system.menu.column.parentName')"
                      :close-on-select="true"
                      :normalizer="normalizer"
                      :show-count="true"
                      :options="list"/>
        </FormItem>

        <!--   <FormItem :label="$t('system.menu.column.href')" prop="menu.url">
             <Input v-model="form.menu.url" :placeholder="$t('tip.input') + $t('system.menu.column.href')"/>
           </FormItem>-->

        <FormItem :label="$t('system.menu.column.sort')" prop="menu.sortNo">
          <InputNumber :max="100" :min="0" v-model="form.menu.sortNo" :placeholder="$t('system.menu.column.sort')"/>
        </FormItem>


        <FormItem :label="$t('system.menu.column.permission')" prop="menu.permission">
          <Input v-model="form.menu.permission" :placeholder="$t('tip.input') + $t('system.menu.column.permission')"/>
        </FormItem>

        <FormItem :label="$t('system.menu.column.icon')" prop="menu.icon">
          <Input v-model="form.menu.icon" :placeholder="$t('tip.input') + $t('system.menu.column.icon')"/>
        </FormItem>

        <FormItem :label="$t('system.menu.column.type')" prop="menu.menuType">
          <RadioGroup v-model="form.menu.menuType.value">
            <Radio :label="item.value" v-for="item in menuTypes">{{ item.desc }}</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem :label="$t('system.menu.column.visible')" prop="menu.visible">
          <i-switch size="large" v-model="form.menu.visible.value" :true-value="0" :false-value="1">
            <span slot="open">{{ $t('btn.display') }}</span>
            <span slot="close">{{ $t('btn.hide') }}</span>
          </i-switch>
        </FormItem>

        <FormItem :label="$t('system.menu.column.status')" prop="menu.enable">
          <i-switch size="large" v-model="form.menu.enable.value" :true-value="1" :false-value="0">
            <span slot="open">{{ $t('btn.enable') }}</span>
            <span slot="close">{{ $t('btn.disable') }}</span>
          </i-switch>
        </FormItem>

        <FormItem :label-width="0" class="text-center">
          <Button type="primary" :loading="btnLoading" @click="doSubmit('menuForm')">{{ $t('btn.submit') }}</Button>
          <Button type="info" :disabled="this.form.menu.parentId === null" class="ml10" :loading="btnLoading"
                  @click="doFast()">{{ $t('system.menu.fastBtn') }}
          </Button>
          <Button @click="doReset()" class="ml10">{{ $t('btn.reset') }}</Button>
        </FormItem>
      </Form>
    </div>

  </div>
</template>

<script>
  import model from '../config/model'
  import rules from '../config/rules'
  import config from '../config/config'
  import formMixin from '@/libs/mixin/formMixin'
  import Treeselect from '@riophae/vue-treeselect'
  import '@/assets/css/vue-treeselect.less'

  export default {
    name: "sys-menu-form",
    props: {
      formData: {
        type: Object,
        default: () => {
          return model.new()
        }
      },
      list: {
        type: Array,
        default: []
      },
      btnLoading: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        form: {
          menu: model.new()
        },
        normalizer(node) {
          return {
            id: node.id,
            label: node.menuName,
            children: node.children,
          }
        },
        fastValue: '',
        url: config.url,
        showDrawerFlag: false,
        rules: rules.new(this),
        menuTypes: null,
        visibles: null,
        enables: null
      }
    },
    watch: {
      formData(val) {
        this.doGet(val)
      },
      visibles(val) {

      },
      enables(val) {

      }
    },
    created(){
      config.constants.getEnum(this, 'menuTypes', 'MenuTypeEnum')
      config.constants.getEnum(this, 'visibles', 'VisibleStateEnum')
      config.constants.getEnum(this, 'enables', 'EnableEnum')
    },
    mounted() {    },
    components: {Treeselect},
    mixins: [formMixin],
    methods: {
      doGet(val) {
        if (this.idIsNull(val.id)) {
          this.form.menu = model.new();
          this.form.menu.parentId = val.parentId;
          this.form.menu.parentName = val.parentName;
        } else {
          this.$api.get(this.url.get, {id: val.id}, (res) => {
            Object.assign(this.form.menu, res.data)
          })
        }
      },
      doSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$emit("doSave", this.form.menu);
          } else {
            this.$api.validateFile()
          }
        })
      },
      doPrefab(flag) {
        let prefab = {}
        prefab.menuType = {value: constants.MenuTypeEnum.BUTTON}
        prefab.visible = {value: constants.VisibleStateEnum.INVISIBLE}
        prefab.enable = {value: constants.EnableEnum.ENABLE}
        switch (flag) {
          case 'add':
            prefab.menuName = this.$t('btn.add')
            prefab.sortNo = 1
            prefab.permission = ':add'
            break;
          case 'list':
            prefab.menuName = this.$t('btn.list')
            prefab.sortNo = 2
            prefab.permission = ':list'
            break;
          case 'edit':
            prefab.menuName = this.$t('btn.edit')
            prefab.sortNo = 3
            prefab.permission = ':edit'
            break;
          case 'delete':
            prefab.menuName = this.$t('btn.delete')
            prefab.sortNo = 4
            prefab.permission = ':delete'
            break;
          default :
            prefab = null;
        }
        if (prefab) {
          Object.assign(this.form.menu, prefab)
        }
      },
      doReset() {
        this.form.menu = model.new()
      },
      doFast() {
        let that = this;
        this.$Modal.confirm({
          loading: true,
          title: this.$t('system.menu.fastTitle'),
          draggable: true,
          okText: this.$t('btn.confirm'),
          cancelText: this.$t('btn.cancel'),
          render: (h) => {
            return h('Input', {
              props: {
                value: this.value,
                autofocus: true,
                placeholder: this.$t('system.menu.fastInput')
              },
              on: {
                input: (val) => {
                  this.fastValue = val;
                }
              }
            })
          },
          onOk() {
              this.$api.post(that.url.fast, {prefix: that.fastValue,parentId: that.form.menu.parentId}, (res) => {
                that.fastValue = null;
              if (res.data === true) {
                that.$Modal.remove()
                that.$emit('handleFast', res.data);
              }
            })
          },
          onCancel() {
            that.fastValue = null;
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
