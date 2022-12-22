<template>
  <div class="vcly">
    <div class="vcly__date">
      <DatePicker v-model="appointment.date" :selectable="dates" @setdate="resetTime()" />
    </div>
    <div class="vcly__time">
      <div class="vcly__time_header">
        {{prettyDate}}
      </div>
      <div class="vcly__time_list">
        <div class="vcly__time_item"
             v-for="(time, index) in times"
             :class="{'vcly__time_item--selected': appointment.time === time}"
             :key="index"
             @click="setTime(`${time}`)">{{time}}</div>
      </div>
      <div class="vcly__time_notice">
        your local timezone is used {{localTimezone}}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DatePicker from './components/DatePicker.vue'

import useFreeSlots from "@/plugin/composables/useFreeSlots";

import useSlotGenerator from "@/plugin/composables/useSlotGenerator";

import type {VueCalyAppointment, VueCalyObject} from "@/plugin/VueCaly.d";
import type {Ref} from "vue";
import {computed, ref, onMounted} from "vue";

// import demodata from '../../demo/demodata'
const demodata = useSlotGenerator([
  {
    days: [1,2,3,5],
    times: [
        [
            [9,30],[11,30]
        ],
        [
            [13,30],[18,30]
        ]
    ],
    start: new Date('2022-12-28'),
    end: new Date('2023-02-02'),
    gmtOffset: 8
  }
])

const availableSlots = useFreeSlots(demodata, 30, 30)

const emits = defineEmits<{
  (e: 'update:modelValue', value: VueCalyObject | null): void
}>();

interface Props {
  modelValue: VueCalyObject | null
  label?: string
  input?: Ref
}

const props = withDefaults(defineProps<Props>(), {

})

const appointment = ref<VueCalyAppointment>({
  date: null,
  time: null,
})

const localTimezone = ref('')

const resetTime = (): void => {
  appointment.value.time = null;
  value.value = null
  //TODO reset value of input or so
}

const setTime = (time: string): void => {
  if(appointment.value.date === null) {
    value.value = null
    return
  }
  appointment.value.time = time
  const event = new Date(`${appointment.value.date} ${appointment.value.time}`);
  const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
  value.value = {
    time: appointment.value.time,
    date: `${appointment.value.date}`,
    dateObject: event,
    // @ts-ignore
    string: `${event.toLocaleDateString('en-US', options)} at ${appointment.value.time}`
  }
}

const dates = computed(() => {
  return [...new Set(availableSlots.map(item => item.date))]
})

const times = computed(() => {
  if (typeof appointment.value.date !== 'string') return []
  return [...new Set(availableSlots.filter(s => s.date === appointment.value.date).map(item => item.time).sort())]
})

const prettyDate = computed((): string => {
  if(times.value.length === 0) return 'Please select a date'
  if(typeof appointment.value.date !== 'string') return ''
  const event = new Date(appointment.value.date);
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  // @ts-ignore
  return event.toLocaleDateString('de-DE', options)
})

const value = computed({
  get: () => props.modelValue,
  set: (data) => emits('update:modelValue', data)
});

onMounted(() => {
  localTimezone.value = `(${new window.Intl.DateTimeFormat().resolvedOptions().timeZone})`
})

</script>

<style lang="scss" scoped>
.vcly {
  @apply border rounded rounded-xl m-4 p-4 flex flex-col sm:flex-row items-center justify-center;
  &:before {
   content: "";
   @apply border-b border-r self-stretch;
 }
  &__date {
    @apply w-full max-w-sm pb-4 sm:p-4 sm:p-8 -order-1 sm:self-stretch;
  }
  &__time {
    @apply w-full sm:w-96 p-4 sm:p-8 self-stretch;
    &_list {
      @apply flex flex-wrap justify-center gap-2;
    }
    &_header {
      @apply text-center mb-4
    }
    &_notice {
      @apply text-center mt-4 text-xs text-gray-400
    }
    &_item {
      @apply text-center border p-1 cursor-pointer w-16 rounded;
      &--selected {
        @apply bg-blue-200 font-bold;
      }
    }
  }
}

</style>
