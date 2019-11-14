<template>
  <el-pagination
    style="text-align:center"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  ></el-pagination>
</template>

<script>
export default {
  name: "pagination",
  props: {
    total: {
      type: Number,
      required: true,
      default: 0
    },

    pageSize: {
      type: Number,
      // required: true,
      default: 20
    },
    currentPage: {
      type: Number,
      // required: true,
      default: 1
    },

    pageSizes: {
      type: Array,
      // required: true,
      default: () => {
        return [20, 30, 50, 100]
      }
    },

    fetchData:{
      type: Function,
      required: true,
    }
  },
  computed: {},
  methods: {
    handleSizeChange(pageSize) {
      console.log("pageSize",pageSize);
      // this.$parent.fetchOptions.limit = pageSize;
      this.fetchData();
    },

    handleCurrentChange(currentPage) {
      this.props.currentPage = currentPage;
      this.fetchData()
    }
  }
};
</script>

<style scoped>
</style>
