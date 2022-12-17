<template>
  <div class="wrap">
    <div class="table">
      <div v-for="(_, index) in arr" :key="index">
        <input
          class="cell"
          type="number"
          name="number"
          :id="String(index)"
          v-model="arr1[index]"
        />
      </div>
    </div>
    <div class="table">
      <div v-for="(_, index) in arrY" :key="index">
        <input
          type="number"
          name="number"
          :id="String(index)"
          v-model="arr2[index]"
          class="cell"
        />
      </div>
    </div>
    Elements = {{ size }}
    <div>Residual Term Lagrange = {{ maxL }}</div>
    <div>Residual Term Newton = {{ maxN }}</div>
    <div class="buttons">
      <button @click="LagrangeButtonClick">Lagrange</button>
      <button @click="NewtonButtonClick">Newton</button>
      <button @click="NewtonForwardButtonClick">Newton Forward</button>
      <button @click="NewtonBackButtonClick">Newton Back</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
/* tslint:disable */
import { ref, Ref, ComputedRef } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

let size = ref(4);
let arr1: Ref<Array<number>> = ref([]);
let arr2: Ref<Array<number>> = ref([]);
let x = ref(0);
let sum = ref(0);
let n = ref(10);
let a = ref(3);
let b = ref(4);
let m = ref(10000);
let maxL = ref(0);
let maxN = ref(0);

let h = computed((): number => (b.value - a.value) / n.value);

let sumEl = computed(() => {
  return arr1.value.reduce(function (a, b) {
    return Number(a) + Number(b);
  });
});

let sumEl2 = computed(() => {
  return arr2.value.reduce(function (a, b) {
    return Number(a) + Number(b);
  });
});

let arr = computed(() => {
  let arr = [];
  for (let i = 0; i < size.value; i++) {
    arr.push(arr1.value[i] ?? 0);
  }
  createMatrix(arr);
  return arr;
});
let arrY = computed(() => {
  let iarr2 = [];
  for (let i = 0; i < size.value; i++) {
    iarr2.push(arr2.value[i] ?? 0);
  }
  createMatrix2(iarr2);
  return iarr2;
});

// helpers

const createMatrix = (arr: Array<number>) => {
  arr1.value = arr;
};
const createMatrix2 = (arr: Array<number>) => {
  arr2.value = arr;
};

const factorialize = (num: number): number => {
  if (num < 0) return -1;
  else if (num == 0) return 1;
  else {
    return num * factorialize(num - 1);
  }
};

let arrCheshibov: ComputedRef<Array<number>> = computed(() => {
  let arr: Array<number> = [];

  for (let i = 0; i < n.value + 1; i++) {
    arr.push(Cheshibov(i));
  }

  return arr;
});

let f = (x: number) => {
  return x ** 2 - x ** 3;
};

const myRandomInts = (quantity: number, min: number, max: number) => {
  let arr = [];
  while (arr.length < quantity) {
    var candidateInt = Math.random() * (max - min) + min;
    if (arr.indexOf(candidateInt) === -1) arr.push(candidateInt);
  }
  return arr;
};

// buttons

const LagrangeButtonClick = () => {
  let arrF1 = [];

  let arrCheshibov: Array<number> = arrCheshibov.value;

  for (let i = 0; i < n.value + 1; i++) {
    arrF1.push(f(arrCheshibov[i]));
  }

  arr1.value = [...arrCheshibov];
  arr2.value = [...arrF1];
  size.value = n.value + 1;
  let max = 0;

  for (let i = 0; i < m.value; i++) {
    let el = a.value + ((b.value - a.value) / m.value) * i;
    let num1 = f(el);
    let num2 = Lagrange(el);
    let el2 = num1 - num2;
    if (max < Math.abs(el2)) {
      max = Math.abs(el2);
    }
  }

  maxL.value = max;
};

const NewtonButtonClick = () => {
  let arrX = myRandomInts(n.value + 1, a.value, b.value);
  arrX.sort((a, b) => a - b);

  let arrY = arrX.map((el) => f(el));
  arr1.value = [...arrX];
  arr2.value = [...arrY];
  size.value = n.value + 1;
  let max = 0;

  for (let i = 0; i < m.value; i++) {
    let el = a.value + ((b.value - a.value) / m.value) * i;
    let num1 = f(el);
    let num2 = Newton(el);
    let el2 = num1 - num2;
    if (max < Math.abs(el2)) {
      max = Math.abs(el2);
    }
  }

  maxN.value = max;
};

const NewtonForwardButtonClick = () => {
  let arrX = [];
  for (let i = 0; i < n.value; i++) {
    arrX.push(a.value + i * h.value);
  }

  let arrY = arrX.map((el) => f(el));
  arr1.value = [...arrX];
  arr2.value = [...arrY];
  size.value = n.value;
  let max = 0;

  for (let i = 0; i < m.value; i++) {
    let el = a.value + ((b.value - a.value) / m.value) * i;
    let num1 = f(el);
    let num2 = NewtonF(el);
    let el2 = num1 - num2;
    if (max < Math.abs(el2)) {
      max = Math.abs(el2);
    }
  }
  maxL.value = max;
};

const NewtonBackButtonClick = () => {
  let arrX = [];
  for (let i = 0; i < n.value; i++) {
    arrX.push(a.value + i * h.value);
  }

  let arrY = arrX.map((el) => f(el));
  arr1.value = [...arrX];
  arr2.value = [...arrY];
  size.value = n.value;
  let max = 0;

  for (let i = 0; i < m.value; i++) {
    let el = a.value + ((b.value - a.value) / m.value) * i;
    let num1 = f(el);
    let num2 = NewtonB(el);
    let el2 = num1 - num2;
    if (max < Math.abs(el2)) {
      max = Math.abs(el2);
    }
  }
  maxL.value = max;
};

const NewtonF = (x: number) => {
  let arrX = arr1.value;
  let arrY = arr2.value;
  let arrRes = [[...arrY]];
  for (let i = 0; i < n.value - 1; i++) {
    let arrT = [];
    for (let j = 0; j < n.value - i - 1; j++) {
      let el = arrRes[i][j + 1] - arrRes[i][j];
      arrT.push(el);
    }
    arrRes.push(arrT);
  }
  let N = 0;
  for (let i = 0; i < arrRes.length; i++) {
    let m = arrRes[i][0];
    for (let j = 0; j < i; j++) {
      m *= x - arrX[j];
    }
    N += m / (factorialize(i) * h.value ** i);
  }
  return N;
};

const NewtonB = (x: number) => {
  let arrX = arr1.value;
  let arrY = arr2.value;
  let arrRes = [[...arrY]];
  for (let i = 0; i < n.value - 1; i++) {
    let arrT = [];
    for (let j = 0; j < n.value - i - 1; j++) {
      let el = arrRes[i][j + 1] - arrRes[i][j];
      arrT.push(el);
    }
    arrRes.push(arrT);
  }
  let N = 0;
  for (let i = 0; i < arrRes.length; i++) {
    let m = arrRes[i][arrRes[i].length - 1];
    for (let j = 0; j < i; j++) {
      m *= x - arrX[arrRes.length - j - 1];
    }
    N += m / (factorialize(i) * h.value ** i);
  }
  return N;
};
const Cheshibov = (i: number) => {
  let el1 = (b.value + a.value) / 2;
  let el2 =
    ((b.value - a.value) / 2) *
    Math.cos(((2 * i + 1) / (2 * (n.value + 1))) * Math.PI);
  return el1 + el2;
};

const Lagrange = (x: number) => {
  let sum = 0;
  let arrX = arr1.value;
  let arrY = arr2.value;
  for (let i = 0; i < size.value; i++) {
    let arrX2 = [...arrX];
    arrX2.splice(i, 1);
    let a = 1;
    let b = 1;
    for (let j = 0; j < size.value - 1; j++) {
      a *= x - arrX2[j];
      b *= arrX[i] - arrX2[j];
    }
    sum += arrY[i] * (a / b);
  }
  return sum;
};

const Newton = (x: number) => {
  let arrX = arr1.value;
  let arrY = arr2.value;
  let arrRes = [[...arrY]];
  for (let i = 0; i < n.value - 1; i++) {
    let arrT = [];
    for (let j = 0; j < n.value - i - 1; j++) {
      let el = (arrRes[i][j + 1] - arrRes[i][j]) / (arrX[j + 1 + i] - arrX[j]);
      arrT.push(el);
    }
    arrRes.push(arrT);
  }
  let N = 0;
  for (let i = 0; i < arrRes.length; i++) {
    let m = arrRes[i][0];
    for (let j = 0; j < i; j++) {
      m *= x - arrX[j];
    }
    N += m;
  }
  return N;
};
</script>
<style lang="scss" scoped>
html {
  display: flex;
}
.table {
  display: flex;
  flex-direction: row;
  margin: 10px;
}
.buttons {
  display: flex;
  flex-direction: row;
  button {
    margin: 5px;
    width: 100px;
  }
}
</style>
