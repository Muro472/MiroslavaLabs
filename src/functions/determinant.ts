const det = (A: Array<Array<number>>) => {
  if (A.length === 2) {
    return A[0][0] * A[1][1] - A[0][1] * A[1][0];
  }
  let answer = 0;
  for (let i = 0; i < A.length; i++) {
    answer += Math.pow(-1, i) * A[0][i] * det(delRnC(A, i));
  }
  return answer;
};

const delRnC = (M: Array<Array<number>>, index: number) => {
  const temp = [];

  for (let i = 0; i < M.length; i++) {
    temp.push(M[i].slice(0));
  }
  temp.splice(0, 1);
  for (let i = 0; i < temp.length; i++) {
    temp[i].splice(index, 1);
  }
  return temp;
};

export default det;
