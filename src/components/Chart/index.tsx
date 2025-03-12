import React, { useRef, useEffect, useState } from "react";
import Chart, {
  ChartConfiguration,
  ChartConfigurationCustomTypesPerDataset,
} from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";
import zoomPlugin from "chartjs-plugin-zoom";
import { TData } from "../../utils/movingAverage";

Chart.register(zoomPlugin);

type ChartProps = {
  datasets: ChartConfiguration["data"]["datasets"];
  type?: ChartConfiguration["type"];
  labels?: string[];
  options?: ChartConfiguration["options"];
  onHover?: (prop: TData) => void;
};

const ChartComponent: React.FC<ChartProps> = ({
  datasets,
  type,
  labels,
  options,
  onHover,
}: ChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const newChart = new Chart(ctx, {
          type,
          data: { labels, datasets },
          options: {
            ...options,
            onHover: (e: any) => {
              if (onHover) {
                const canvasPosition = getRelativePosition(e, newChart);
                const x = newChart.scales.x.getValueForPixel(canvasPosition.x);
                const y = newChart.scales.y.getValueForPixel(
                  canvasPosition.y
                ) as number;
                onHover({ x, y });
              }
            },
            transitions: {
              zoom: {
                animation: {
                  duration: 0,
                },
              },
            },
            plugins: {
              zoom: {
                pan: {
                  enabled: true,
                  mode: "x",
                },
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true,
                  },
                  mode: "x",
                },
              },
            },
          },
        } as ChartConfigurationCustomTypesPerDataset);
        setChartInstance(newChart);
        return () => {
          if (newChart) {
            newChart.destroy();
          }
        };
      }
    }
  }, []);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.options.animation = false;
      chartInstance.data = { datasets, labels };
      chartInstance.update();
    }
  }, [datasets, labels]);

  return <canvas ref={chartRef}></canvas>;
};

export default ChartComponent;
