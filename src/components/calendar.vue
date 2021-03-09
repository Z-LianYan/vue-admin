<template>
  <section class="container">
    <div class="calender">
      <div class="calender-header">
        <p @click="onLeft" class="gz">{{leftBtnText}}</p>
        <p>{{showYearMonth|formatYearMonth}}</p>
        <p class="yb" @click="onRight">{{rightBtnText}}</p>
      </div>
      <div class="date-wrapper">
        <div class="week">
          <div class="day" v-for="item in ['日','一','二','三','四','五','六']" :key="item">{{ item }}</div>
        </div>
        <div class="date-detail" :style="'height:'+scrollHeight+'px;transition: all ease 1s;'">
          <div class="year-wrapper" v-for="(year,yIdx) in calenderData" :key="yIdx+'y'">
            <div
              ref="target_month"
              @touchstart.stop="touchStart"
              @touchend.stop="touchEnd($event,year.year,months.month)"
              @touchmove.stop.prevent="touchMove"
              :class="['month-wrapper','month-'+year.year+months.month]"
              v-for="(months,mIdx) in year.months"
              :key="mIdx+'m'"
            >
              <div
                :class="['day-wrapper',days.weekend?'activateWeekend':'']"
                v-for="(days,dIdx) in months.days"
                :key="dIdx"
              >
                <div
                  @click="selectDate(year.year,months.month,days.day)"
                  :class="[
                            'day',
                            getCurrentDate()==(`${year.year}`+`-${months.month<10?'0'+months.month:months.month}`+`-${days.day<10?'0'+days.day:days.day}`)?'tragetElement activateCurrentDate':'',
                            selectedDate==(`${year.year}`+`-${months.month<10?'0'+months.month:months.month}`+`-${days.day<10?'0'+days.day:days.day}`)?'activateSeletedDate':'']"
                >
                  <div v-if="days.day" class="day-point">
                    {{days.day}}
                    <p class="point-box">
                      <span :class="['point']" v-if="days.day<8"></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  computed:{},
  props: {
    leftBtnText: {
      // 日历天头部 左边的文本
      type: String,
      default: ""
    },
    rightBtnText: {
      // 日历天头部 右边的文本
      type: String,
      default: ""
    },
    selected_date: {
      //格式 YYYY-MM-DD
      type: String,
      default: ""
    }
  },
  watch: {
    selected_date: {
      //父组件传入被选中日期
      handler(date) {
        console.log("被选中日期", date);
        if (date) {
          //格式 YYYY-MM-DD
          this.selectedDate = date;
          this.showYearMonth = date;
        } else {
          this.selectedDate = this.getCurrentDate();
          this.showYearMonth = this.getCurrentDate();
        }
      },
      deep: true, //true 深度监听
      // 加上immediate选项后，实例化后立刻回调一次
      immediate: true
    }
  },
  filters:{
    formatYearMonth(ym){
      let yearM = ym.split('-')
      yearM.splice(2,1);
      return yearM.join('年')+'月'
    }
  },
  data() {
    return {
      minDate: new Date(2021, 1, 1),
      maxDate: new Date(2024, 12, 31),
      calenderData: [],
      scrollHeight: 250, //滚动容器的高度
      selectedDate: "", //被选中的日期
      showYearMonth: "", //只负责显示日历头部的年月份

     
      startPageY: 0
    };
  },

  async created() {},
  async mounted() {
    this.handleCalenderData();

    this.$nextTick(() => {
      // setTimeout(() => {
        this.onPosition();
      // }, 1500);
    });
  },

  methods: {
    touchMove(e) {
      // console.log("touchMove",e);
      let { startPageY } = this;
      let scroll = document.getElementsByClassName("date-detail")[0];

      this.cz = e.changedTouches[0].pageY - startPageY; //当前pageY位置减去开始按下时的pageY位置

      let cur = e.currentTarget.offsetTop - this.cz;

      // console.log("cur",cur,this.cz)

      scroll.scrollTop = cur;
    },
    touchStart(e) {
      this.cz = 0;
      this.startPageY = e.changedTouches[0].pageY; //记录按下时的pageY的位置
    },
    touchEnd(e, year, month, flag) {
      console.log("touchEnd", e, year, month);
      let { cz } = this;
      let scroll = document.getElementsByClassName("date-detail")[0];
      let offset_height = e.currentTarget.offsetHeight;
      let half = offset_height / 2;
      let target_val = e.currentTarget.offsetTop + half;

      // console.log("Math.abs(cz)",cz,Math.abs(cz),half)
      if (!cz || Math.abs(cz) < half) {
        return (scroll.scrollTop = e.currentTarget.offsetTop);
      }
      let scrollTop = scroll.scrollTop;

      if (scrollTop < target_val && scrollTop > e.currentTarget.offsetTop) {
        // console.log("return")
        return (scroll.scrollTop = e.currentTarget.offsetTop);
      }

      if (scrollTop >= target_val) {
        //上拉
        console.log("上拉");

        if (month == 12 && e.currentTarget.parentNode.nextElementSibling) {
          year += 1;
          month = 1;
          let target_e =
            e.currentTarget.parentNode.nextElementSibling.firstElementChild;
          scroll.scrollTop = target_e.offsetTop; //到了12月跳转到下一年的一月
          this.addScrollHeightAnimation(target_e);
          this.showYearMonth = `${year}-${month < 10 ? "0" + month : month}`;
          return;
        }
        if (e.currentTarget.nextElementSibling) {
          month += 1;
          let target_e = e.currentTarget.nextElementSibling;
          scroll.scrollTop = target_e.offsetTop;
          this.addScrollHeightAnimation(target_e);
          this.showYearMonth = `${year}-${month < 10 ? "0" + month : month}`;
        }
      }

      if (scrollTop <= e.currentTarget.offsetTop) {
        //下拉
        console.log("下拉");

        if (month == 1 && e.currentTarget.parentNode.previousElementSibling) {
          year -= 1;
          month = 12;
          let target_e =
            e.currentTarget.parentNode.previousElementSibling.lastElementChild;
          scroll.scrollTop = target_e.offsetTop; //到了12月跳转到下一年的一月
          this.addScrollHeightAnimation(target_e);
          this.showYearMonth = `${year}-${month < 10 ? "0" + month : month}`;
          return;
        }
        if (e.currentTarget.previousElementSibling) {
          month -= 1;
          let target_e = e.currentTarget.previousElementSibling;
          scroll.scrollTop = target_e.offsetTop;
          this.addScrollHeightAnimation(target_e);
          this.showYearMonth = `${year}-${month < 10 ? "0" + month : month}`;
        }
      }
    },

    onPosition() {
      let cur_day_target = document.getElementsByClassName("tragetElement")[0];
      let cur_month_target = cur_day_target.parentNode.parentNode; //当前月份的容器
      let cur_month_target_offset_top = cur_month_target.offsetTop; //offsetTop：当前元素离<定位父级>元素顶部的距离(无定位浏览器顶部)
      this.scrollTop = cur_month_target_offset_top;
      document.getElementsByClassName("date-detail")[0].scrollTop = this.scrollTop; //滚动到当天日期
      this.addScrollHeightAnimation(cur_month_target);
    },

    addScrollHeightAnimation(cur_month_target) {
      let h = cur_month_target.offsetHeight; //当前月份的高度

      this.scrollHeight = h;
    },
    getCurrentDate(format) {
      let d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth() + 1; //0~11
      // let month = d.getMonth();//0~11
      let date = d.getDate();
      let dt = year.toString() + "-" + (month < 10 ? "0" + month : month.toString()) + "-" + (date < 10 ? "0" + date : date.toString());
      if (format == "YYYY年MM月DD") {
        return ( year + "年" + (month < 10 ? "0" + month : month) + "月" + date + "日" );
      }
      if (format == "YYYY年MM月") {
        return year + "年" + (month < 10 ? "0" + month : month) + "月";
      }
      return dt;
    },

    handleCalenderData() {
      let minYear = this.minDate.getFullYear();
      let maxYear = this.maxDate.getFullYear();
      console.log("maxYear   minYear", minYear, maxYear);

      for (let i = minYear; i < maxYear; i++) {
        // 定义每个月的天数，如果是闰年第二月改为29天
        let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let months = [];
        if ((i % 4 === 0 && i % 100 !== 0) || i % 400 === 0) {
          daysInMonth[1] = 29;
        }
        for (let j = 0; j < daysInMonth.length; j++) {
          let days = [];

          let firstDayMonth = new Date(i, j, 1).getDay(); //当月的第一天是星期几 （ 星期天是0，i是年，j是月(月是从零开始的0～11)）

          if (firstDayMonth > 0) {
            for (let d = 0; d < firstDayMonth; d++) {
              days.push({});
            }
          }

          for (let k = 1; k <= daysInMonth[j]; k++) {
            let isWeekend = new Date(i, j, k).getDay();
            days.push({
              weekend: isWeekend == 0 || isWeekend == 6 ? true : false,
              day: k
            });
          }

          months.push({
            month: j + 1,
            days: days
          });
        }
        this.calenderData.push({
          year: i,
          months: months
        });
      }
      console.log("calenderData", this.calenderData);
    },
    onLeft() {
      this.$emit("onLeftEvent");
    },
    onRight() {
      this.$emit("onRightEvent");
    },
    selectDate(year, month, day) {
      if (!day) return;
      let selectedDate = `${year}` + `-${month < 10 ? "0" + month : month}` + `-${day < 10 ? "0" + day : day}`;
      this.showYearMonth = selectedDate;
      if (this.selectedDate == selectedDate) return;
      this.selectedDate = selectedDate;
      console.log(this.selectedDate + "--");
      this.$emit("onSelectDate", selectedDate);
    },
    getCurrentDate(format) {
      let d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth() + 1; //0~11
      let date = d.getDate();
      let dt =
        year.toString() +
        "-" +
        (month < 10 ? "0" + month : month.toString()) +
        "-" +
        (date < 10 ? "0" + date : date.toString());
      if (format == "YYYY年MM月DD") {
        return (
          year + "年" + (month < 10 ? "0" + month : month) + "月" + date + "日"
        );
      }
      if (format == "YYYY年MM月") {
        return year + "年" + (month < 10 ? "0" + month : month) + "月";
      }
      return dt;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  .calender {
    background: #4873c1;

    .calender-header {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      color: #fff;
      align-items: center;
      .gz {
        text-align: left;
        font-size: 14px;
      }
      p {
        flex: 1;
        text-align: center;
      }

      .yb {
        text-align: right;
        font-size: 14px;
      }
    }

    .date-wrapper {
      .week {
        display: flex;
        padding: 10px 0;

        .day {
          flex: 1;
          color: #86a3cf;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .date-detail {
        overflow-x: hidden;
        scrollbar-width: none;
        position: relative;

        // overflow: hidden;

        .year-wrapper {
          .month-wrapper {
            display: flex;
            flex-wrap: wrap;
            color: #fff;
            .day-wrapper {
              width: 14.285714285714286%;
              height: 50px;
              // line-height: 50px;
              // text-align: center;
              display: flex;
              justify-content: center;
              align-items: center;

              .day {
                width: 60%;
                height: 60%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 15px;
                .day-point {
                  position: relative;
                  .point-box {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    margin: 0 auto;
                    bottom: -5px;
                    left: 50%;
                    .point {
                      display: block;
                      width: 100%;
                      height: 100%;
                      border-radius: 2px;
                      // background: red;
                      transform: translateX(-50%);
                    }
                  }
                }
              }
              .activateCurrentDate {
                color: #fff;
                border-radius: 50%;
                background: #6a8bb8;
              }
              .activateSeletedDate {
                color: #4076bc;
                border-radius: 50%;
                background: #fff;
              }
            }

            .activateWeekend {
              color: #86a3cf;
            }
          }
        }
      }

      .date-detail::-webkit-scrollbar {
        display: none;
        /* Chrome Safari 隐藏滚动条 */
      }
    }
  }
}
</style>