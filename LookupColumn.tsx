import { sp } from '@pnp/sp';
import * as React from 'react';

const LookupColumn: React.FC = () => {
  const [mylookup, setMyLookup] = React.useState<string | undefined>(undefined);

  const getLookup = async () => {
    try {
      const listdata = await sp.web.lists.getByTitle('LookupData').items.top(3).get();
      console.log(listdata)
      if (listdata.length > 0) {
        const lookupColumnValue = listdata[0]['MyName'];
  
        if (lookupColumnValue) {
          setMyLookup(lookupColumnValue.Title); // Assuming 'Title' is the property you want to display
          console.log(lookupColumnValue.Title);
        } else {
          setMyLookup('No data available');
        }
      } else {
        setMyLookup('No data available');
      }
    } catch (error) {
      console.error('Error getting lookup column data:', error);
      setMyLookup('Error occurred while fetching data');
    }
  };
  
  

  return (
    <>
      <h2>This is Your Lookup Column Value</h2>
      <p>Title: {mylookup}</p>
      <button onClick={getLookup} className='btn btn-success'>Show Lookup..</button>
    </>
  );
};

export default LookupColumn;
