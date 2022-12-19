<template>
  <div class="vcly-datepicker">
      <div class="vcly-monthselector">
        <div class="arrow clickable mr-2" @click="prevMonth()"><ArrowLeft /></div>
        <div class="month">{{months[month-1]}} {{year}}</div>
        <div class="arrow clickable ml-2" @click="addMonth()"><ArrowRight /></div>
      </div>
    <table class="a-month">
      <tr class="a-toprow">
        <th class="a-days" v-for="(day, index) in days" :key="index">
          {{day}}
        </th>
      </tr>
      <tr class="a-row" v-for="(row, index) in monthView" :key="index">
        <td class="a-day"
            :class="{'invisible': day === 0,'today': isToday(day),'selected': isSelected(day),'selectable': isSelectable(day)}"
            @click="setDate(day)"
            v-for="(day, dindex) in row"
            :key="dindex">
          <div class="ring" v-if="day > 0"><div class="number">{{ day }}</div></div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import {padding, calendarize} from "@/plugin/composables/useHelpers";
import {ref, computed} from "vue";
import ArrowRight from "@/plugin/components/icons/ArrowRight.vue";
import ArrowLeft from "@/plugin/components/icons/ArrowLeft.vue";

const today = new Date(),
    days = ['Mo','Di','Mi','Do','Fr','Sa','So'],
    months = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
    todayString = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
    thisYear = today.getFullYear();

const day = ref<null | number>(null)
const month = ref(today.getMonth()+1)
const year = ref(today.getFullYear())

interface Props  {
  modelValue: string | null
  selectable: (string | null | number)[]
}


const emits = defineEmits<{
  (e: 'update:modelValue', value: string | null): void,
  (e: 'setdate'): void
}>();

const props = defineProps<Props>()

const isToday = (d = 1): boolean => {
  return todayString === year.value + '-' + month.value + '-' + d
}

const isSelected = (d = 1): boolean => {
  if (day.value === null) return false
  return year.value + '-' + padding(month.value) + '-' + padding(day.value) === year.value + '-' + padding(month.value) + '-' + padding(d)
}

const isSelectable = (d = 1): boolean => {
  return props.selectable.includes(`${year.value}-${padding(month.value)}-${padding(d)}`)
}

const setDate = (d: number):void => {
  if (isSelectable(d) === false) return
  day.value = d
  value.value = year.value + '-' + padding(month.value) + '-' + padding(d)
  emits('setdate')
}

const addMonth = (): void => {
  if(month.value === 12){
    month.value = 1;
    year.value++;
  }else{
    month.value++;
  }
}

const prevMonth = (): void => {
  if(month.value === 1){
    month.value = 12;
    year.value--;
  }else{
    month.value--;
  }
}

const value = computed({
  get: () => props.modelValue,
  set: (data) => emits('update:modelValue', data)
});

const monthView = computed(() => {
  return calendarize(year.value + '-' + padding(month.value) + '-01', 1);
})


</script>

<style lang="scss" scoped>
.vcly-datepicker {
  @apply w-full;
  .vcly-monthselector {
    @apply flex justify-center items-center;
    .month {
      @apply text-center;
      width: 8rem;
    }
    .arrow {
      @apply cursor-pointer;
    }
  }
}
table.a-month {
  width: 100%;
  max-width: 450px;
  margin: 1rem auto;
  th,td {
    width: 14.2857%;
    text-align: center;
  }
  td.a-day{
    .ring {
      width: 90%;
      margin: 0.25em auto;
      aspect-ratio: 1;
      border-radius: 50%;
      color: #666;
      display: flex;
      justify-content: center;
      align-items: center;
      .number{
        color: inherit;
      }
    }
    &.today .ring{
      background-color: #eee;
      color: #333;
    }
    &.selectable .ring{
      @apply bg-blue-800 cursor-pointer text-white;
    }
    &.selectable.selected .ring{
      @apply bg-amber-600 text-white;
    }
  }
}

</style>
