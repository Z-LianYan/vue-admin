<template>
  <el-card class="box-card">
    <el-button type="text" @click="downloadExl(jsono)">导出Ecel</el-button>
    <!-- <a href="" download="这里是下载的文件名.xlsx" id="hf"></a> -->
  </el-card>
</template>

<script>
// import XLSX from "xlsx-style";
// import "@/assets/dist/xlsx";
export default {
  data() {
    return {
      jsono:[{ //测试数据
        "保质期临期预警(天)": "adventLifecycle",
        "商品标题": "title",
        "建议零售价": "defaultPrice",
        "高(cm)": "height",
        "商品描述": "Description",
        "保质期禁售(天)": "lockupLifecycle",
      }]
    };
  },
  components: {},
  computed: {},
  mounted() {},
  watch: {},
  methods: {

    downloadExl(json, type) {
      var tmpDown;
      var tmpdata = json[0];
      json.unshift({});
      var keyMap = []; //获取keys
      //keyMap =Object.keys(json[0]);
      for (var k in tmpdata) {
        keyMap.push(k);
        json[0][k] = k;
      }

      console.log("json---",json);
      console.log("keyMap---",keyMap);
      // return;
      var tmpdata = []; //用来保存转换好的json
      // json.map((v, i) =>
      //   keyMap.map((k, j) =>
      //     Object.assign({},{
      //       v: v[k],position:(j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) +(i + 1)
      //     })
      //   )
      // ).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {v: v.v});

      var handleJson = json.map((v, i) =>
        keyMap.map((k, j) =>{
          console.log("++",this.getCharCol(j))
          return Object.assign({},{
            v: v[k],position:(j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) +(i + 1)
          })
        }
         
        )
      )
      console.log("handleJson----",handleJson)

      console.log("tmpdata",tmpdata);

      var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10

      console.log("outputPos",outputPos);

      // return;

      tmpdata["B1"].s = {
        font: { sz: 14, bold: true, color: { rgb: "FFFFAA00" } },
        fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "FFFF00" } },
        alignment: {vertical:"center",horizontal:"center"}
      }; //<====设置xlsx单元格样式
      tmpdata["!merges"] = [
        {
          s: { c: 1, r: 0 },
          e: { c: 4, r: 0 }
        }
      ]; //<====合并单元格

      // return

      var tmpWB = {
        SheetNames: ["mySheet"], //保存的表标题
        Sheets: {
          mySheet: Object.assign(
            {},
            tmpdata, //内容
            {
              "!ref": outputPos[0] + ":" + outputPos[outputPos.length - 1] //设置填充区域
            }
          )
        }
      };

      console.log("tmpDown",tmpWB);

      // return;

      tmpDown = new Blob(
        [
          this.s2ab(
            XLSX.write(
              tmpWB,
              {
                bookType: type == undefined ? "xlsx" : type,
                bookSST: false,
                type: "binary"
              } //这里的数据是用来定义导出的格式类型
            )
          )
        ],
        {
          type: ""
        }
      ); //创建二进制对象写入转换好的字节流

      // var href = URL.createObjectURL(tmpDown); //创建对象超链接
      // document.getElementById("hf").href = href; //绑定a标签
      // document.getElementById("hf").click(); //模拟点击实现下载

      

      var tmpa = document.createElement("a");
      tmpa.download = "下载.xlsx";
      tmpa.href = URL.createObjectURL(tmpDown);//创建对象超链接==>绑定到a标签
      tmpa.click();//模拟点击实现下载
      console.log("b--",tmpa)
      setTimeout(function() {
        //延时释放
        URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
      }, 100);
    },

    s2ab(s) {
      //字符串转字符流
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    },

    getCharCol(n) {
      let temCol = "",
        s = "",
        m = 0;
      while (n > 0) {
        m = (n % 26) + 1;
        s = String.fromCharCode(m + 64) + s;
        n = (n - m) / 26;
      }
      return s;
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