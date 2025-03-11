import React, { useRef, useEffect, useState } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(zoomPlugin);

type ChartProps = {
  data: ChartConfiguration["data"];
  options: ChartConfiguration["options"];
};

const ChartComponent: React.FC<ChartProps> = ({
  data,
  options,
}: ChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const newChart = new Chart(ctx, {
          data,
          options: {
            ...options,
            // animation: false,
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
        } as any);
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
      chartInstance.data = data;
      chartInstance.update();
    }
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default ChartComponent;
