export type TData = {
  x: any;
  y: number | null;
};

function movingAverage(data: TData[], size: number): TData[] {
  if (!Array.isArray(data) || size <= 0) {
    return []; // Retorna um array vazio para entradas inválidas
  }
  const resultados: TData[] = [];
  for (let i = 0; i < data.length; i++) {
    let soma = 0;
    let contador = 0;
    for (let j = Math.max(0, i - size + 1); j <= i; j++) {
      if (data[j] && data[j].y !== null && data[j].y !== 0) {
        soma += data[j].y ?? 0;
        contador++;
      }
    }
    if (contador > 0) {
      resultados.push({
        x: data[i].x,
        y: soma / contador,
      });
    } else {
      resultados.push({
        x: data[i].x,
        y: null, // Ou outro valor que represente falta de dados
      });
    }
  }
  return resultados;
}

export default movingAverage;
