import { useEffect, useRef } from "react";

type TableProps<T> = {
  data: T[];
  current?: T;
};

const Table = <T extends Record<string, any>>({
  data,
  current,
}: TableProps<T>) => {
  // const data = useMemo(() => data, [data]);
  const columns = Object.keys(data?.[0] ?? []);
  const ref = useRef<any>(null);
  const id = columns[0];

  useEffect(() => {
    if (current && ref.current) {
      const position =
        data.reduce((a, d, i) => {
          if (d[id] == current[id]) {
            return i;
          }
          return a;
        }, 0) / data.length;
      const elHeight = ref.current.offsetHeight / 2;
      ref.current.scrollTop = position * ref.current.scrollHeight - elHeight;
    }
  }, [ref.current, current]);

  return (
    <div
      ref={ref}
      className={`overflow-x-auto overflow-y-scroll h-fit max-h-100`}
    >
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr
              key={index}
              className={`${row[id] === current?.[id] && "bg-sky-300"}`}
            >
              {columns.map((column) => (
                <td
                  key={`${index}-${column}`}
                  className={`px-6 py-4 whitespace-nowrap`}
                >
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
