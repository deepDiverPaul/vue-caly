[![Build Status](https://drone.app.deep-node.de/api/badges/deepDiverPaul/vue-caly/status.svg?ref=refs/heads/main)](https://drone.app.deep-node.de/deepDiverPaul/vue-caly)

# 🐭 vue-caly

![public/media/screenshot.png](public/media/screenshot.png)

**still Work in progress**

## Install

`yarn add vue-caly`

or

`npm i vue-caly`

## Usage

### JavaScript `<script setup>`

```vue
<template>
  <div>
      <VueCaly v-model="date" />
  </div>
</template>

<script setup>
import {VueCaly} from "vue-caly";

const date = ref(null)

</script>
```

### TypeScript `<script setup>`

```vue
<template>
  <div>
      <VueCaly v-model="date" />
  </div>
</template>

<script lang="ts" setup>
import {VueCaly} from "vue-caly";
import {VueCalyObject} from "vue-caly/dist/VueCaly";


const date = ref<VueCalyObject | null>(null)

</script>
```

### Styles

```vue
<style>
@import "vue-caly/dist/style.css";
</style>
```

