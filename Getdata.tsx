import * as React from "react";
import { sp } from "@pnp/sp";
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap-icons/font/bootstrap-icons.css';

import AddListItem from "./Senddata";
import GetAllItem from "./More5000Data";


interface inputdata {
 Title:any;
  Id: any;
  Name: string;
  Email: string;
  Password: string;
  Qualification: string;
  Address: string;
}


const GetItem: React.FC =  () => {

  const [totaldata, setTotalData] = React.useState<inputdata[]>([]);
  const [search,setSearch] = React.useState<String>('')
   

  const DeleteItem = (item: inputdata) => {
    const deleteId = item.Id;
    const siteUrl = 'https://salman200lok.sharepoint.com';
    const listName = 'Countries';
   
    // First, fetch the request digest value
    fetch(`${siteUrl}/_api/contextinfo`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose',
        },
        credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(data => {
        const requestDigest = data.d.GetContextWebInformation.FormDigestValue;

        // Use the obtained request digest in the DELETE request
        const deleteEndPoint = `${siteUrl}/_api/web/lists/getByTitle('${listName}')/items(${deleteId})`;

        const headers = {
            'Accept': 'application/json;odata=verbose',
            'Content-type': 'application/json;odata=verbose',
            'X-HTTP-Method': 'DELETE',
            'If-Match': '*',
            'X-RequestDigest': requestDigest
        };

        return fetch(deleteEndPoint, {
            method: 'POST',
            headers: headers,
            credentials: 'same-origin'
        });
    })
    .then(response => {
        console.log('Response status:', response.status);
        if (response.ok) {
            alert('Your Entry Deleted Successfully');
        } else {
            return response.json(); // Attempt to parse JSON response for additional error details
        }
    })
      .then(data => {
          if (data && data.error) {
              alert('Something Went Wrong ' + data.error.message.value);
          } 
      })
    .catch(error => {
       alert('Something Went Wrong ' + error.message);
    });
};

// Get specific column Data from SharePoni List

   const getdata = async () => {
    try {
      const listdata = await sp.web.lists.getByTitle('Countries').items.select('Title','Id', 'Name', 'Email', 'Password', 'Qualification', 'Address').get();
      setTotalData(listdata);
    } catch (error) {
      alert('Something Went Wrong !' + error.message);
    }
  };

  // Search A Particular Item
 
  const mysearch = () => {
    debugger;
    const searchInput = document.getElementById('search') as HTMLInputElement;
    if (searchInput) {
      const lowercasedSearch = searchInput.value.toLowerCase();
     
       totaldata.find((x) =>{
         if(x.Name.toLowerCase() === lowercasedSearch){
         setSearch(x.Name + 'Exists')
         }
         
       });
  
      
    }
  };
  
  
  return (
    <>
    <GetAllItem/>
    <hr/>
      <AddListItem/>
      <hr/>
      <h3 className="text-center">Show Your SharePoint List Data..</h3>
      <input type="text" name='search'className="form-control" id='search' placeholder="Search Name Here" />
      <button type='button' className="btn btn-primary mt-2" onClick={mysearch}>Search.</button>
     <p>Your Result :{search}</p>
      <button className="btn btn-success w-100% text-center" onClick={getdata}>Show Data</button>
      <table className="table table-border table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Qualification</th>
            <th>Address.</th>
          </tr>
        </thead>
        <tbody>
          {totaldata.reverse().map((item, index) => (
            <tr key={index}>
              <td>{item.Id}.</td>
              <td>{item.Title}</td>
              <td>{item.Name}</td>
              <td>{item.Email}</td>
              <td>{item.Password}</td>
              <td>{item.Qualification}</td>
              <td>{item.Address}</td>
              <td><i className="bi bi-trash " onClick={(()=>DeleteItem(item))} style={{fontWeight:'bolder',cursor:'pointer',fontSize:'18px'}}></i> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default GetItem;
