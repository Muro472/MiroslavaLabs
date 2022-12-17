<template>
  <div className="App">
    <div>
      <input v-model="Eps" placeholder="ВВЕДІТЬ Eps" />
      <input v-model="A" placeholder="ВВЕДІТЬ A" />
      <input v-model="B" placeholder="ВВЕДІТЬ B" />
      <input v-model="N" placeholder="ВВЕДІТЬ N" />
    </div>
    <div>
      <button @click="RectButt">Reactangle</button>
      <button @click="TrapButt">Trap</button>
      <button @click="SimpsonButt">Simpson</button>
      <!-- <button onClick={()=> ()}>Trap</button>
        <button onClick={()=> ()}>Simpson</button>
        <button onClick={()=> CheckMistakeButt()}>Compare</button> -->
    </div>
    <div>Rect = {{ rectR }}</div>
    <div>Trap = {{ trapR }}</div>
    <div>Simpson = {{ simpsonR }}</div>
    <hr />
    <div>Rect Double = {{ rectR2 }}</div>
    <div>Trap Double = {{ trapR2 }}</div>
    <div>Simpson Double = {{ simpsonR2 }}</div>
    <hr />
    <!-- <div>{{mistake}}</div> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

let Eps = ref(2);
let A = ref(22);
let B = ref(2);
let N = ref(22);

let rectR = ref(0);
let trapR = ref(0);
let simpsonR = ref(0);

let rectR2 = ref(0);
let trapR2 = ref(0);
let simpsonR2 = ref(0);

//----------------funcs------------------
const Func = (x: number) => {
  return Math.atan(x);
};

const Integral = (x: number, y: number) => {
  return -Math.log2(Math.abs(Math.cos(y))) - -Math.log2(Math.abs(Math.cos(x)));
};

//----------------figures------------------

const Rect = (B: number, A: number, N: number) => {
  let h = (B - A) / N;
  let sum = 0;
  let x = A + h / 2;
  for (let i = 0; i < N; i++) {
    sum += Func(x);
    x += h;
  }
  return sum * h;
};

const Trapeze = (B: number, A: number, N: number) => {
  let h = (B - A) / N;
  let sum = 0;
  for (let i = 0; i <= N; i++) {
    sum += Func(A + h / 2 + i * h) * h;
  }
  return sum;
};

function Simpson(B: number, A: number, N: number) {
  let h = (B - A) / N;
  let s = (Func(A) + Func(B)) / 2;
  for (let i = 1; i <= N - 1; i++) {
    let xk = A + h * i;
    let xk1 = A + h * (i - 1);
    s += Func(xk) + 2 * Func((xk1 + xk) / 2);
  }
  let x = A + h * N;
  let x1 = A + h * (N - 1);
  s += 2 * Func((x1 + x) / 2);
  return (s * h) / 3;
}

//----------------buttons------------------

const RectButt = () => {
  rectR.value = Rect(+B.value, +A.value, +N.value);
  let i = 1;
  let diff;
  do {
    i++;
    diff = Math.abs(Rect(B.value, A.value, i) - Rect(B.value, A.value, i + 1));
  } while (diff > Eps.value);
  rectR2.value = Rect(B.value, A.value, i + 1);
};

const TrapButt = () => {
  trapR.value = Trapeze(+B.value, +A.value, +N.value);
  let i = 0;
  let diff;
  do {
    i++;
    diff = Math.abs(
      Trapeze(B.value, A.value, i) - Trapeze(B.value, A.value, i + 1)
    );
  } while (diff > Eps.value);
  trapR2.value = Trapeze(B.value, A.value, i + 1);
};

function SimpsonButt() {
  simpsonR.value = Simpson(+B.value, +A.value, +N.value);
  let i = 0;
  let diff;
  do {
    i++;
    diff = Math.abs(
      Simpson(B.value, A.value, i) - Simpson(B.value, A.value, i + 1)
    );
  } while (diff > Eps.value);
  simpsonR2.value = Simpson(B.value, A.value, i + 1);
}

//   function CheckMistakeButt() {
//     setMistake([`Rect Result = ${rectR}; Integral Result = ${Integral(B, A)}; Mistake = ${MistakeRect()}`
//     , `Trap Result = ${trapR}; Integral Result = ${Integral(B, A)}; Mistake = ${MistakeTrap()}`, `Simpson Result = ${simpsonR}; Integral Result = ${Integral(B, A)}; Mistake = ${MistakeSimp()}`]);
//   }
</script>
