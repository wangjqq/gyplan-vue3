<template>
  <div style="width: 97vw; margin: 0 20px">
    <header style="position: fixed; top: 110px; width: 100%">
      <el-row>
        <el-col :span="1" :offset="1">
          <el-button type="primary" @click="addFormVisible = true">添加</el-button>
        </el-col>
        <el-col :span="2">
          <el-cascader
            width="100px"
            v-model="chooesType"
            @change="chooesTypeChange"
            :options="ImsOptions"
            :props="{ expandTrigger: 'hover' }"
            placeholder="选择分类"></el-cascader>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" @click="getAllImsList1(), (chooesType = [])">显示全部</el-button>
        </el-col>
        <el-col :span="10" :offset="5">
          <p style="font-size: 30px; margin: 0">元器件管理系统</p>
        </el-col></el-row
      >
    </header>

    <el-table
      :data="ImsList"
      style="width: 100%; margin-top: 55px; height: 815px"
      border
      :row-class-name="tableRowClassName"
      height="95.5%"
      empty-text="你还没有数据噢,快点击添加按钮吧!">
      <el-table-column prop="id" sortable label="id" width="70" header-align="center" align="center"> </el-table-column>
      <el-table-column prop="type_name" sortable label="分类" width="180" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="package" sortable label="封装" header-align="center" align="center">
        <template #default="scope: any">
          <span v-if="!scope.row.edit">{{ scope.row.package }}</span>
          <el-input v-else v-model="scope.row.package" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" header-align="center" align="center">
        <template #default="scope: any">
          <span v-if="!scope.row.edit">{{ scope.row.name }}</span>
          <el-input v-else v-model="scope.row.name" />
        </template>
      </el-table-column>
      <el-table-column prop="place" label="存放地点" header-align="center" align="center">
        <template #default="scope: any">
          <span v-if="!scope.row.edit">{{ scope.row.place }}</span>
          <el-input v-else v-model="scope.row.place" />
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="数量" header-align="center" align="center">
        <template #default="scope: any">
          <span v-if="!scope.row.edit">{{ scope.row.quantity }}</span>
          <el-input v-else v-model="scope.row.quantity" />
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" header-align="center" align="center">
        <template #default="scope: any">
          <span v-if="!scope.row.edit">{{ scope.row.description }}</span>
          <el-input v-else v-model="scope.row.description" />
        </template>
      </el-table-column>
      <el-table-column prop="voltage" label="最大电压" header-align="center" align="center">
        <template #default="scope: any">
          <span v-if="!scope.row.edit">{{ scope.row.voltage == '' ? '' : scope.row.voltage + 'V' }}</span>
          <el-input v-else v-model="scope.row.voltage" />
        </template>
      </el-table-column>
      <el-table-column prop="electricity" label="最大电流" header-align="center" align="center">
        <template #default="scope: any">
          <span v-if="!scope.row.edit">{{ scope.row.electricity == '' ? '' : scope.row.electricity + 'A' }}</span>
          <el-input v-else v-model="scope.row.electricity" />
        </template>
      </el-table-column>
      <el-table-column prop="size" label="尺寸" align="center">
        <template #default="scope: any">
          <span v-if="!scope.row.edit">{{ scope.row.size }}</span>
          <el-input v-else v-model="scope.row.size" />
        </template>
      </el-table-column>
      <el-table-column prop="smt" sortable label="焊接方式" header-align="center" align="center" width="160">
        <template #default="scope: any">
          <span v-if="!scope.row.edit">{{ scope.row.smt == '1' ? '贴片' : '直插' }}</span>
          <el-radio-group v-else v-model="scope.row.smt">
            <el-radio :label="1">贴片</el-radio>
            <el-radio :label="0">直插</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="参考价格" header-align="center" align="center">
        <template #default="scope: any">
          <span v-if="!scope.row.edit">{{ scope.row.price }}</span>
          <el-input v-else v-model="scope.row.price" />
        </template>
      </el-table-column>
      <el-table-column label="操作" header-align="center" align="center" width="200">
        <template #default="scope: any">
          <el-space
            ><el-button type="primary" size="small" @click="scope.row.edit ? save(scope.row) : (scope.row.edit = true)"
              >{{ scope.row.edit ? '保存' : '编辑' }}
            </el-button>
            <el-button type="primary" size="small" @click="open(scope.row.id)">删除</el-button></el-space
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加元器件的弹出框 -->
    <el-dialog title="添加元器件" v-model="addFormVisible">
      <el-form :model="addform" :rules="rules" ref="ruleFormRef">
        <el-form-item label="元器件分类:" prop="type_id">
          <el-cascader v-model="addform.type_id" :options="ImsOptions"></el-cascader>
          <el-button class="el-icon-plus" @click="addTypeVisible = true" style="margin-left: 10px">新建</el-button>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="名称:" prop="name">
              <el-input v-model="addform.name" style="width: 204px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="封装:" prop="package">
              <el-input v-model="addform.package" style="width: 204px"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="数量:" prop="quantity">
              <el-input v-model="addform.quantity" style="width: 204px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单价:">
              <el-input v-model="addform.price" style="width: 204px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="尺寸:">
              <el-input v-model="addform.size" style="width: 204px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最大电压(V):">
              <el-input v-model="addform.voltage" style="width: 204px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最大电流(A):">
              <el-input v-model="addform.electricity" style="width: 204px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="存放位置:" prop="place">
              <el-input v-model="addform.place" style="width: 204px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="焊接方式:" prop="smt">
              <el-radio-group v-model="addform.smt">
                <el-radio :label="1">贴片</el-radio>
                <el-radio :label="0">直插</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="描述:" style="margin-left: 20px">
              <el-input type="textarea" :autosize="{ minRows: 3 }" v-model="addform.description" style="width: 300px">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addItem1(ruleFormRef)">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新建元器件分类的弹出框 -->
    <el-dialog title="新建元器件分类" v-model="addTypeVisible">
      <el-form :model="newTypeForm">
        <el-form-item label="选择父级分类:">
          <el-cascader v-model="newTypeForm.type_father_id" :options="ImsOptions" :props="{ checkStrictly: true }">
          </el-cascader>
        </el-form-item>
        <el-form-item label="新建分类名称:">
          <el-input v-model="newTypeForm.type_name" style="width: 204px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTypeVisible = false">取 消</el-button>
        <el-button type="primary" @click=";(addTypeVisible = false), addItemType1()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { getAllImsList, getImsListByType, getTypeList, addItemType, addItem, delItem, editItem } from '@/api/GyStation'

// import { PiniaStore } from '../../store/pinia'
// const pinia = PiniaStore()

const ImsList = ref([])
const ImsOptions = ref([])
const ImsOptionsOld: any = ref([])
const chooesType = ref([])
const addFormVisible = ref(false)
const addTypeVisible = ref(false)
const ruleFormRef = ref<FormInstance>()
const addform: any = ref({
  type_id: '',
  type_name: '',
  type_father_id: '',
  package: '',
  electricity: '',
  description: '',
  voltage: '',
  name: '',
  quantity: '',
  price: '',
  smt: '',
  size: '',
  place: '',
})
const newTypeForm: any = ref({
  type_name: '',
  type_father_id: '',
})
const rules = reactive<FormRules>({
  type_id: [
    {
      type: 'array',
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (value == '') {
            console.log(value)
            reject('请选择元器件类型') // reject with error message
          } else {
            console.log(value)
            resolve()
          }
        })
      },
    },
  ],
  name: [
    {
      required: true,
      message: '请输入元器件名称',
    },
  ],
  quantity: [
    {
      required: true,
      message: '请输入数量',
    },
  ],
  place: [
    {
      required: true,
      message: '请输入存放位置',
    },
  ],
  smt: [
    {
      required: true,
      message: '请选择焊接方式',
    },
  ],
})

const save = async (data: any) => {
  const dataCopy = JSON.parse(JSON.stringify(data))
  delete dataCopy.edit
  await editItem(dataCopy)
  getAllImsList1()
  data.edit = false
}

const open = (id: string) => {
  ElMessageBox.confirm('删除后无法恢复,确认删除?', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      let formData = new FormData()
      formData.append('id', id)
      await delItem(formData)
      getAllImsList1()
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}

// 点击级联选择器更新元器件列表
const chooesTypeChange = async (val: Number[]) => {
  // console.log(val.at(-1))
  const local: any = window.localStorage.getItem('logindata')
  let id = JSON.parse(local).id
  let params: any = {
    type_id: val.at(-1),
    id: id,
  }
  let data: any = await getImsListByType(params)
  if (data.status == 200) {
    ImsList.value = data.data
    ElMessage({
      message: data.message,
      type: 'success',
    })
  }
  // console.log(data)
}

// 如果元器件数量为0,更改行颜色为红色
const tableRowClassName = ({ row, rowIndex }: { row: any; rowIndex: number }) => {
  if (row.quantity == 0) {
    return 'warning-row'
  }
  return ''
}

// 获取所有元器件列表
const getAllImsList1 = async () => {
  const local: any = window.localStorage.getItem('logindata')
  console.log(JSON.parse(local))
  let id = JSON.parse(local).id
  let params = {
    id: id,
  }
  let data: any = await getAllImsList(params)
  if (data.status == 200) {
    ImsList.value = data.data
    ElMessage({
      message: data.message,
      type: 'success',
    })
  }
}
getAllImsList1()
// 获取元器件分类列表
const getTypeList1 = async () => {
  const local: any = window.localStorage.getItem('logindata')
  let id = JSON.parse(local).id
  let params = {
    id: id,
  }
  let data: any = await getTypeList(params)
  // console.log(data)
  data.data.forEach((element: any) => {
    element.value = element.id
    element.label = element.type_name
  })
  ImsOptionsOld.value = data.data
  var rJson: any = []
  //将所有的pid的数据加到对应的id数据对象里面去，需要添加一个属性children
  for (var i = 0; i < data.data.length; i++) {
    var arr = []
    for (var j = 0; j < data.data.length; j++) {
      if (data.data[i].id == data.data[j].type_father_id) {
        data.data[i].children = arr
        arr.push(data.data[j])
      }
    }
  }
  for (var i = 0; i < data.data.length; i++) {
    if (data.data[i].type_father_id == 0) {
      rJson.push(data.data[i])
    }
  }
  ImsOptions.value = rJson
}
getTypeList1()
// 添加元器件分类
const addItemType1 = async () => {
  newTypeForm.value.type_father_id = newTypeForm.value.type_father_id.at(-1)
  const local: any = window.localStorage.getItem('logindata')
  let id = JSON.parse(local).id
  let params = {
    type_name: newTypeForm.value.type_name,
    type_father_id: newTypeForm.value.type_father_id,
    id: id,
  }
  let data: any = await addItemType(params)
  // console.log(data)
  if (data.status == 200) {
    getTypeList1()
    ElMessage({
      message: data.message,
      type: 'success',
    })
    newTypeForm.value = {
      type_name: '',
      type_father_id: '',
    }
  }
}

// 添加元器件
const addItem1 = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')
      if (typeof addform.value.type_id == 'object') {
        addform.value.type_id = addform.value.type_id.at(-1)
      }
      ImsOptionsOld.value.forEach((element: any) => {
        if (element.id == addform.value.type_id) {
          addform.value.type_name = element.type_name
          addform.value.type_father_id = element.type_father_id
        }
      })
      const local: any = window.localStorage.getItem('logindata')
      let id = JSON.parse(local).id
      let params = {
        type_id: addform.value.type_id,
        id: id,
        type_name: addform.value.type_name,
        type_father_id: addform.value.type_father_id,
        package: addform.value.package,
        voltage: addform.value.voltage,
        electricity: addform.value.electricity,
        description: addform.value.description,
        name: addform.value.name,
        quantity: addform.value.quantity,
        price: addform.value.price,
        smt: addform.value.smt,
        size: addform.value.size,
        place: addform.value.place,
      }
      let data = await addItem(params)
      if (data.status == 200) {
        ElMessage({
          message: '新增元器件成功',
          type: 'success',
        })
        getAllImsList1()
        addFormVisible.value = false
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
</style>
