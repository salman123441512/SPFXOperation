import * as React from "react";
import { useRef } from "react";
import { sp } from "@pnp/sp";
import 'bootstrap/dist/css/bootstrap.min.css';

interface inputdata {
  
  Name: string;
  Email: string;
  Password: string;
  Qualification: string;
  Address: string;
}



const AddListItem: React.FC = () => {
  const listName = 'Countries';
  

  var data = useRef<inputdata>({
    
    Name: '',
    Email: '',
    Password: '',
    Qualification: '',
    Address: ''
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    data.current = { ...data.current, [name]: value };
  };

  const addListItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 
   
    const itemProperties = {
    
      Title: new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }),
      Name: data.current.Name,
      Email: data.current.Email,
      Password: data.current.Password,
      Qualification: data.current.Qualification,
      Address: data.current.Address,
    };

    try {
      await sp.web.lists.getByTitle(listName).items.add(itemProperties);
      alert('Item added successfully');
     
    } catch (error) {
      alert('Error adding item: ' + error.message);
    }

    let item = document.getElementById('btn');
    if (item) item.setAttribute('type', 'reset');
  };

  return (
    <>
     
      <h3 className="text-center font-family-algerian">Please Enter Your Details.</h3>
      <form onSubmit={addListItem}>
        <input type="text" id="name" className="form-control mb-2" name="Name" onChange={handleInput} placeholder="Enter Your Name" />
        <input type="text" id="email" className="form-control mb-2" name="Email" onChange={handleInput} placeholder="Enter Your Email" />
        <input type="Password" id="password" className="form-control mb-2" name="Password" onChange={handleInput} placeholder="Enter Your Password" />
        <input type="text" id="qualification" className="form-control mb-2" name="Qualification" onChange={handleInput} placeholder="Enter Your Qualification" />
        <input type="text" id="address" className="form-control mb-2" name="Address" onChange={handleInput} placeholder="Enter Your Address" />
        <input type="submit" id="btn" className="btn btn-success mt-2 w-100% text-center" />
      </form>
      
    </>
  );
};

export default AddListItem;
