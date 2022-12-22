<template>
  <div class="vcly_dp">
    <div class="vcly_dp__month">
      <div class="vcly_dp__month_arrow" @click="prevMonth()"><ArrowLeft /></div>
      <div class="vcly_dp__month_month" @click="resetPage()">{{months[month-1]}} {{year}}</div>
      <div class="vcly_dp__month_arrow" @click="addMonth()"><ArrowRight /></div>
    </div>
    <div class="vcly_dp__day">
      <div class="vcly_dp__day_header">
        <div class="vcly_dp__day_name" v-for="(day, index) in days" :key="index">
          {{day}}
        </div>
      </div>
      <div class="vcly_dp__day_row" v-for="(row, index) in monthView" :key="index">
        <div class="vcly_dp__day_day"
            :class="{
          'vcly_dp__day_day--invisible': day === 0,
          'vcly_dp__day_day--today': !isSelected(day) && isToday(day),
          'vcly_dp__day_day--selected': isSelected(day) && !isToday(day),
          'vcly_dp__day_day--selected-today': isSelected(day) && isToday(day),
          'vcly_dp__day_day--selectable': isSelectable(day)
        }"
            @click="setDate(day)"
            v-for="(day, dindex) in row"
            :key="dindex">
          <div class="vcly_dp__day_number" :class="{'vcly_dp__day_number--empty': day === 0}">{{ day }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {padding, calendarize} from "@/plugin/composables/useHelpers";
import {ref, computed} from "vue";
import ArrowRight from "@/plugin/components/icons/ArrowRight.vue";
import ArrowLeft from "@/plugin/components/icons/ArrowLeft.vue";

const today = new Date(),
    days = ['Mo','Tu','We','Th','Fr','Sa','Su'],
    months = ['January','February','March','April','May','June','July','August','September','October','November','December'],
    todayString = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

const day = ref<null | string | number>(null)
const month = ref(today.getMonth()+1)
const year = ref(today.getFullYear())

interface Props  {
  modelValue: string | number | null
  selectable: (string | null | number)[]
}


const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void,
  (e: 'setdate'): void
}>();

const props = defineProps<Props>()

const resetPage = (): void => {
  month.value = today.getMonth()+1
  year.value = today.getFullYear()
}

const isToday = (d = 1): boolean => {
  return todayString === year.value + '-' + month.value + '-' + d
}

const isSelected = (d = 1): boolean => {
  return year.value + '-' + padding(month.value) + '-' + padding(d) === value.value
}

const isSelectable = (d = 1): boolean => {
  return props.selectable.includes(`${year.value}-${padding(month.value)}-${padding(d)}`)
}

const setDate = (d: number):void => {
  if (!isSelectable(d)) return
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

setDate(today.getDate());

</script>

<style lang="scss" scoped>
.vcly_dp {
  @apply w-full;
  &__month {
    @apply flex justify-center items-center mb-4;
    &_month {
      @apply text-center;
      width: 8rem;
    }
    &_arrow {
      @apply cursor-pointer;
    }
  }
  &__day {
    @apply flex flex-col gap-2;

    &_row, &_header {
      @apply grid grid-cols-7 gap-2;
    }

    &_name {
      @apply text-center;
    }

    &_day {
      @apply aspect-square rounded-full flex justify-center items-center;

      &--selectable {
        @apply bg-gray-500 cursor-pointer text-white;
      }

      &--today {
        @apply bg-red-500 text-white;
      }

      &--selected-today {
        @apply ring ring-gray-600 bg-red-500 text-white;
      }

      &--selected {
        @apply ring ring-red-600 bg-gray-200 cursor-pointer text-black;
      }
    }

    &_number {
      &--empty {
        @apply hidden;
      }
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
    .wrapper {
      @apply w-4/5 mx-auto my-1 aspect-square rounded-full flex justify-center items-center;
    }
    &.today .wrapper{
      @apply ring ring-amber-200;
    }
    &.selectable .wrapper{
      @apply ring ring-blue-200 cursor-pointer;
    }
    &.selectable.selected .wrapper{
      @apply ring ring-blue-600 bg-blue-100;
    }
  }
}

</style>
