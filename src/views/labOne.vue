<template>
  <div class="wrap">
    <div v-if="load">
      <div class="row" v-for="i in sizei" :key="i">
        <div v-for="j in sizej" :key="j">
          <input type="number" v-model="arr[i - 1][j - 1]" />
        </div>
      </div>
    </div>
    <button @click="click">click</button>
    <input v-model="sizeInput" type="number" />
    <div>
      <input v-model="radio" value="val1" type="radio" />
      Розвязати СЛАР
    </div>
    <div>
      <input v-model="radio" value="val2" type="radio" />
      Обчислення визначника матриці
    </div>
    <div>
      <input v-model="radio" value="val3" type="radio" />
      Обчислення оберненої матриці до матриці
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

import determinant from "@/functions/determinant";
import gaus from "@/functions/gaus";
import inverse from "@/functions/inverse";

let arr: Ref<Array<Array<number>>> = ref([]);
let sizeInput: Ref<number> = ref(4);
let radio = ref("val1");

let ans: Ref<Array<number> | number | null> = ref(null);

const click = () => {
  if (radio.value === "val1") {
    ans.value = gaus(arr.value);
    create();
  }
  if (radio.value === "val2") ans.value = determinant(arr.value);
  if (radio.value === "val3") {
    arr.value = inverse(arr.value, sizeInput.value);
    ans.value = null;
  }
};

//NOT INTERESTING

let sizei: Ref<number> = ref(4);
let sizej: Ref<number> = ref(4);

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
  sizei.value = sizeInput.value;
  sizej.value = radio.value === "val1" ? sizeInput.value + 1 : sizeInput.value;
  arr.value = [];
  let i = 0;
  while (i < sizei.value) {
    let arrSmall: Array<number> = [];
    let j = 0;
    while (j < sizej.value) {
      arrSmall.push(0);
      j++;
    }
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
input {
  margin: 2px;
}

.row {
  display: flex;
}
</style>
