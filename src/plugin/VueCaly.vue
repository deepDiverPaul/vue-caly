<template>
  <div class="vcly">
    <div class="vcly-date">
      <DatePicker v-model="appointment.date" :selectable="dates" @setdate="resetTime()" />
    </div>
    <div class="vcly-time">
      <div class="vcly-header text-center">
        {{prettyDate}}
      </div>
      <div class="" v-if="times.length === 0"> Bitte wähle ein Datum aus.</div>
      <div class="times flex flex-wrap">
        <div class="time m-1 text-center border p-1 clickable"
             v-for="(time, index) in times"
             :class="{'bg-primary text-white': appointment.time === time}"
             :key="index"
             @click="setTime(time)">{{time}}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DatePicker from './components/DatePicker.vue'

import useFreeSlots from "@/plugin/composables/useFreeSlots";

import type {VueCalyAppointment, VueCalyObject} from "@/plugin/VueCaly.types";
import {computed, Ref, ref} from "vue";

import demodata from '../../demo/demodata'


const availableSlots = useFreeSlots(demodata, 30)

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>();

interface Props {
  modelValue: string | null
  label?: string
  input?: Ref
}

const props = withDefaults(defineProps<Props>(), {

})

const appointment = ref<VueCalyAppointment>({
  date: null,
  time: null,
})

const resetTime = (): void => {
  appointment.value.time = null;
  //TODO reset value of input or so
}

const setTime = (time: string): void => {
  if(appointment.value.date === null) return
  appointment.value.time = time
  const event = new Date(appointment.value.date);
  const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
  value.value = `${event.toLocaleDateString('de-DE', options)} um ${appointment.value.time} Uhr`
}

const dates = computed(() => {
  return [...new Set(availableSlots.map(item => item.date))]
})

const times = computed(() => {
  if (typeof appointment.value.date !== 'string') return []
  return [...new Set(availableSlots.filter(s => s.date === appointment.value.date).map(item => item.time).sort())]
})

const prettyDate = computed((): string => {
  if(typeof appointment.value.date !== 'string') return ''
  const event = new Date(appointment.value.date);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return event.toLocaleDateString('de-DE', options)
})

const value = computed({
  get: () => props.modelValue,
  set: (data) => emits('update:modelValue', data)
});

</script>

<style scoped lang="scss">
.vcly {
  @apply border rounded rounded-2xl p-4 flex flex-col sm:flex-row;
  &-date {
    @apply w-full p-4 sm:p-8;
  }
  &-time {
    @apply w-full sm:w-96 p-4 sm:p-8;
  }
}

</style>
