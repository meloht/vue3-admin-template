<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template #default="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Title" />
      <el-table-column
        prop="author"
        label="Author"
        width="110"
        align="center"
      />
      <el-table-column
        prop="pageviews"
        label="Pageviews"
        width="110"
        align="center"
      />
      <el-table-column
        align="center"
        label="Status"
        width="110"
        class-name="status-col"
      >
        <template #default="scope">
          <el-tag :type="statusFilter(scope.row.status)">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Display_time" width="200">
        <template #default="scope">
          <el-icon><Timer /></el-icon>
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import { Timer } from "@element-plus/icons-vue";
export default {
  components: { Timer },

  data() {
    return {
      list: null,
      listLoading: true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      const val = statusMap[status];
      return val;
    },
    fetchData() {
      this.listLoading = true;
      getList().then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
  },
};
</script>
