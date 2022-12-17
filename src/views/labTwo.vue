<template>
  <div class="wrap">
    <div v-if="load">
      <div class="row" v-for="i in sizeInput" :key="i">
        <div v-for="j in sizeInput" :key="j">
          <input type="number" v-model="arr[i - 1][j - 1]" />
        </div>
        <input type="number" v-model="vector[i - 1]" />
      </div>
    </div>
    <div>
      eps:
      <input type="number" v-model="epsilon" />
    </div>
    <button @click="click">click</button>
    <input v-model="sizeInput" type="number" />
    <div>
      <input v-model="radio" value="val1" type="radio" />
      якобі
    </div>
    <div>
      <input v-model="radio" value="val2" type="radio" />
      зейдель
    </div>

    <div v-if="ans">
      <div v-if="typeof ans === 'number'">Resoult: {{ ans }}</div>
      <div v-else>
        <div v-for="(el, i) in ans" :key="i">№{{ i }}: {{ el }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref, watch } from "vue";

import { method_zeidel } from "@/functions/zeidel";
import { method_yacobi } from "@/functions/jakobi";

let arr: Ref<Array<Array<number>>> = ref([]);
let vector: Ref<Array<number>> = ref([]);
let sizeInput: Ref<number> = ref(4);
let epsilon: Ref<number> = ref(0);
let radio = ref("val1");

let ans: Ref<Array<number> | number | null> = ref(null);

const click = () => {
  if (radio.value === "val1")
    console.log(method_zeidel(arr.value, vector.value, epsilon.value));
  if (radio.value === "val2")
    console.log(method_yacobi(arr.value, vector.value, epsilon.value));
};

//NOT INTERESTING

let load = ref(false);

watch(
  () => radio.value,
  () => create()
);

watch(
  () => sizeInput.value,
  () => create()
);

const create = () => {
  load.value = false;
  arr.value = [];
  let i = 0;
  while (i < sizeInput.value) {
    let arrSmall: Array<number> = [];
    let j = 0;
    while (j < sizeInput.value) {
      arrSmall.push(0);
      j++;
    }
    vector.value.push(0);
    arr.value.push(arrSmall);
    i++;
  }
  load.value = true;
};

onMounted(() => {
  create();
});
</script>

<style scoped lang="scss">
.row {
  display: flex;
}
</style>
