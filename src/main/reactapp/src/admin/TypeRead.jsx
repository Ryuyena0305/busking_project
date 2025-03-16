import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TypeRead(props) {
  useEffect(() => {
    onRead();
  }, []);
  const onRead = async () => {
    const response = await axios.get('http://localhost:8080/bus/bustype');
    setTypes(response.data);
  };
  const [types, setTypes] = useState([]);

  return (
    <>
      <div id="container">
        <h3>BUS TYPE</h3>
        <table>
          <thead>
            <tr>
              {' '}
              <th>번호</th> <th>이름</th> <th>증가요금</th>{' '}
            </tr>
          </thead>
          <tbody>
            {types.map((type, index) => {
              return (
                <tr>
                  <td>{type.btid}</td>
                  <td>{type.btname}</td>
                  <td>+{type.btprice}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
