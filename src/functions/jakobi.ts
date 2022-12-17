import { sum_array } from "./zeidel";

export function method_yacobi(matrix: any, vector: any, eps: any) {
  let counter = 0;
  const res = [];
  let xVector = new Array(matrix.length).fill(0);
  const el: { [key: string]: any } = {};
  let converge = false;

  while (!converge) {
    const test = [];

    for (let i = 0; i < matrix.length; i++) {
      const xNew = Object.assign({}, xVector);
      xNew[i] = 1;
      el[`s${i}`] = matrix[i].map((element: any) => element * -1);
      el[`s${i}`][i] = vector[i];
      el[`s${i}`] = el[`s${i}`].map((element: any) => element / matrix[i][i]);
      el[`s${i}_sum`] = sum_array(
        el[`s${i}`].map((element: any, index: number) => element * xNew[index])
      );
      test[i] = el[`s${i}_sum`].toFixed(4);
    }

    converge = Math.abs(sum_array(xVector) - sum_array(test)) <= eps;
    xVector = test;
    res.push(xVector);
    counter = counter + 1;
  }

  const lol = [`counter=${counter}`];
  res.push([lol]);
  return res;
}
