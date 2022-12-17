import { Matrix } from "ts-matrix";

const inverse = (Arr: Array<Array<number>>, size: number) => {
  const da = new Matrix(size, size, Arr);
  return da.inverse().values;
};

export default inverse;
