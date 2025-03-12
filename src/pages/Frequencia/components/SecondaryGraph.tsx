import Chart from "../../../components/Chart";

export type CompositionType = {
  Homens: number;
  Mulheres: number;
  Jovens: number;
  Adolescentes: number;
};

export type SecondaryGrapyProps = {
  composition: CompositionType;
};

const defaultComposition: CompositionType = {
  Homens: 1,
  Mulheres: 1,
  Jovens: 1,
  Adolescentes: 1,
};

function SecondaryGraph({ composition }: SecondaryGrapyProps) {
  const entries = Object.entries(composition ?? defaultComposition);
  const labels = entries.map(([k]) => k);
  const data = entries.map(([_, v]) => v);
  return (
    <Chart
      type={"doughnut"}
      labels={labels}
      datasets={[
        {
          data,
        },
      ]}
    />
  );
}

export default SecondaryGraph;
