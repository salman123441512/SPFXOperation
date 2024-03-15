import * as React  from 'react';
import { sp } from '@pnp/sp';

const GetPersonGroup: React.FC = () => {
  const [personGroup, setPersonGroup] = React.useState<any>(null);

  const getPersonGroup = async () => {
    try {
      const response = await sp.web.siteUsers.getByLoginName('i:0#.f|membership|MohdSalman@salman200lok.onmicrosoft.com').get();
      setPersonGroup(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error getting person/group information:', error);

      // Log the detailed error message if available
      if (error?.response?.data?.error) {
        console.error('Detailed error:', error.response.data.error);
      }

      // Rethrow the error to see the full stack trace in the console
      throw error;
    }
  };

  React.useEffect(() => {
    // Fetch person/group information when the component mounts
    getPersonGroup();
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div>
      {personGroup ? (
        <>
          <p>Email: {personGroup?.Email}</p>
          <p>Title: {personGroup?.Title}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GetPersonGroup;
