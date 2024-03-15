import { sp } from '@pnp/sp';
import * as React from 'react';
import GetPersonGroup from './GetGroupPerson';
import LookupColumn from './LookupColumn';

const SendFile: React.FC = () => {
    const [user, setUser] = React.useState<any>(null)
    
    const myfile = () => {
        debugger;
        const siteUrl = 'https://salman200lok.sharepoint.com'; // Remove '/Shared%20Documents'
        const libraryName = 'Documents';

        // Initialize PnP JS with the site URL
        sp.setup({
            sp: {
                baseUrl: siteUrl,
            },
        });

        // Get file input element and selected file
        const fileInput = document.getElementById('myfile') as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            const selectedFile = fileInput.files[0];
            const fileName = selectedFile.name;

            // Create a FileReader to read the file content
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target?.result as string;

                // Upload the file to the SharePoint library
                sp.web.lists.getByTitle(libraryName).rootFolder.files.add(fileName, fileContent, true)
                    .then((result) => {
                        alert(`File ${fileName} uploaded successfully.`);
                        const fileInput = document.getElementById('myfile') as HTMLInputElement;
                        if (fileInput) {
                            fileInput.value = ''
                        }
                    })
                    .catch((error) => {
                        alert(`Error uploading file: ${error}`);
                    });
            };

            // Read the file content as text
            reader.readAsText(selectedFile);
        } else {
            alert('No file selected.');
        }
    };
    const getmycurrentUser = async () => {
        try {
            let response = await sp.web.currentUser.get()
            setUser(response)
            console.log(response)
        }
        catch (error) {
            alert('Somthing went Wrong')
        }
    };
   

    return (
        <>
            <input type='file' id='myfile' />
            <button id='button' onClick={myfile}>Upload File.</button>
            <p>User : {user && user.Title}, Email : {user && user.Email}, Id : {user && user.Id}</p>
            <button onClick={getmycurrentUser}>GetUser</button>

           <hr/>
           <GetPersonGroup/>
           <hr/>
           <LookupColumn/>
        </>
    );
};

export default SendFile;

