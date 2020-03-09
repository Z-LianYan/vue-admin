<template>
  <div class="invoice">
    <span @click="exportData">导出</span>
  </div>
</template>

<script>
import XLSX from "xlsx-style";
// import fs from "fs"
// const fs = require('fs')
export default {
  data() {
    return {};
  },
  methods: {
    exportData() {
      console.log("123456",XLSX);
    }
  },
  created() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.invoice {
  .excel {
    width: 1200px;
    overflow: auto;
    h2 {
      width: 1200px;
      text-align: center;
    }
    table {
      td {
        text-align: center;
      }
    }
  }
}
</style>