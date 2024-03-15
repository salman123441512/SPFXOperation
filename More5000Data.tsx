import * as React from 'react';
import { sp } from '@pnp/sp';


interface My800Data {
  Title: any;
  field_1: string;
  field_2: string;
  field_3: string;
  field_4: string;
  field_5: string;
  field_6: string;
  field_7: string;
  field_8: string;
  field_9: string;
}

const GetAllItem:React.FC  = () => {
  const [myAllData, setMyAllData] = React.useState<My800Data []>([]);
var add = 0;


  const ExcelData = async () => {
    try {
      let response = await sp.web.lists.getByTitle('My8000+DataC').items.select('Title', 'field_1', 'field_2', 'field_3', 'field_4', 'field_5', 'field_6', 'field_7', 'field_8', 'field_9').top(5000).get();
  setMyAllData(response);
     
    } catch (error) {
      alert('Something Went Wrong: ' + error.message);
    }
  };
  

  return (
    <>
      <h3>This is Get Data more 8000</h3>
      <button onClick={ExcelData}>ExcelData..</button>
      <table className='teble table-hover '>
        <thead>
          <tr>
            <th>Title</th>
            <th>field 1</th>
            <th>field 2</th>
            <th>field 3</th>
            <th>field 4</th>
            <th>field 5</th>
            <th>field 6</th>
            <th>field 7</th>
            <th>field 8</th>
            <th>field 9</th>
          </tr>
        </thead>
        <tbody>
          {
          
          myAllData.map((item, index) => {
            add++
         return <tr key={index}>
              <td>{item.Title}</td>
              <td>{item.field_1}</td>
              <td>{item.field_2}</td>
              <td>{item.field_3}</td>
              <td>{item.field_4}</td>
              <td>{item.field_5}</td>
              <td>{item.field_6}</td>
              <td>{item.field_7}</td>
              <td>{item.field_8}</td>
              <td>{item.field_9}</td>
            </tr>
          })
         }
        </tbody>
      </table>
      <h3>Total Item = {add}</h3>
    </>
  );
};

export default GetAllItem;
