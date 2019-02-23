<template>
  <div class="timePickerPro">
    <DatePicker type="daterange"
                :format="format"
                :options="options"
                :placeholder="$t('time.placeholder')"
                @on-change="handleChange"
    />
  </div>
</template>

<script>
  export default {
    name: "timePickerPro",
    props: {
      format: {
        type: String,
        default: 'yyyy-MM-dd'
      },
      placement: {
        type: String,
        default: 'left'
      },
      trigger: {
        type: String,
        default: 'hover'
      },
      defaultTime: {
        type: Object,
        default: () => {

        }
      }
    },
    data() {
      return {
        timeValues: [],
        options: {
          shortcuts: [
            {
              text: this.$t('time.toDay'),
              value() {
                let start = new Date();
                start.setHours(0);
                start.setMinutes(0);
                start.setSeconds(0);
                start.setMilliseconds(0);
                this.time1 = start;
                this.time2 = new Date(start.getTime() + 24 * 60 * 1000);
                return [this.time1, this.time2];
              },
              onClick: (picker) => {
              }
            },
            {
              text: this.$t('time.lastWeek'),
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
                return [start, end];
              },
              onClick: (picker) => {
              }
            },
            {
              text: this.$t('time.lastMonth'),
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              },
              onClick: (picker) => {
              }
            },
            {
              text: this.$t('time.lastThreeMonths'),
              value() {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 91);
                return [start, end];
              },
              onClick: (picker) => {
              }
            }
          ]
        }
      }
    },
    methods: {
      handleChange(date, value) {
        if (!(date[0] || date[1])) {
          this.timeValues = []
        } else {
          if ('yyyy-MM-dd' === this['format']) {
            date[0] += ' 00:00:00';
            date[1] += ' 23:59:59';
          }
          this.timeValues = date;
        }
      }
    }
  }
</script>

<style scoped>
 .ivu-date-picker {
   width: 100%;
 }
</style>
