import { nanoid } from "nanoid";

function MonthTable(props) {
  console.log('MonthTable', props);

  return (
    <div>
        <h2>Month Table</h2>
        <table>
            <thead>
                <tr>
                    <th>Month</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {props.list.map(item => (
                    <tr key={nanoid()}>
                        <td>{item.month}</td>
                        <td>{item.amount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default MonthTable
