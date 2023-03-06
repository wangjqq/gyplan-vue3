<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="id" width="100" />
    <el-table-column prop="name" label="项目名称" width="180" />
    <el-table-column prop="source" label="项目来源" width="120" />
    <el-table-column prop="createdTime" label="创建时间" width="150" />
    <el-table-column prop="endTime" label="完工时间" width="150" />
    <el-table-column label="耗材" width="280">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px" v-for="(item, index) in scope.row.use"
            >{{ item.name }}:{{ item.num }}个</span
          >
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="280">
      <template #default="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)"
          type="info"
          >查看</el-button
        >
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)"
          type="primary"
          >修改</el-button
        >
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)"
          type="danger"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive } from 'vue'

const tableData = [
  {
    id: 1,
    name: '51太阳能',
    source: '闲鱼',
    createdTime: '20230306',
    endTime: '20230401',
    use: [
      {
        name: '0603电阻5R',
        num: 10,
      },
      {
        name: '0805电容10pF',
        num: 5,
      },
    ],
  },
]
</script>
<style></style>
