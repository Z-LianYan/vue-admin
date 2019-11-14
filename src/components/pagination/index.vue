<template>
  <el-pagination
    style="text-align:right"
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
      required: true,
      default: 20
    },
    currentPage: {
      type: Number,
      required: true,
      default: 1
    },

    pageSizes: {
      type: Array,
      // required: true,
      default: () => {
        return [20, 30, 50, 100]
      }
    },
  },
  computed: {},
  methods: {
    handleSizeChange(pageSize) {
      this.$emit("sizeChange",pageSize)
    },
    handleCurrentChange(currentPage) {
      this.$emit("currentChange",currentPage)
    }
  }
};
</script>

<style scoped>
</style>
