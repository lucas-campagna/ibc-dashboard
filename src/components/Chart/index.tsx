import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(zoomPlugin);

type BarProps = {
  config: Chart["config"];
};

const ChartComponent: React.FC<BarProps> = ({ config }: BarProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const newChart = new Chart(ctx, {
          ...config,
          options: {
            transitions: {
              zoom: {
                animation: {
                  duration: 0
                }
              }
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
        });
        setChartInstance(newChart);
        return () => {
          if (newChart) {
            newChart.destroy();
          }
        };
      }
    }
  }, [config]);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.update();
    }
  }, [chartInstance, config]);

  return <canvas ref={chartRef}></canvas>;
};

export default ChartComponent;
