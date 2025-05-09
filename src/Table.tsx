const Table = ({ field, data }: { field: string | number; data: any[] }) => {
    return (
      <table className="border border-collapse w-full">
        <thead>
          <tr>
            <th className="border p-2 bg-gray-100">{field}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td className="border p-2">{d[field]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;
  