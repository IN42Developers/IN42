import { getAccessToken, setAccessToken } from "./TokenStorage";
import { IncrementRequestCounter, AssertUserCanRequestData } from "./UserData";

//generic function that allows you to get data from a specific endpoint in json format
export const GetDataFromEndPoint = async ( endpoint ) => {

    if(AssertUserCanRequestData() == false)
        return;

    let uri = `https://api.intra.42.fr${endpoint}`;
    let tokendata = getAccessToken();
    // console.log("tokendata in getdata = ",tokendata);
    if(!tokendata){
        // return null
        throw new Error("TokenData is Null");
    }

    let req = new Request(uri, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokendata.access_token}`
        },
    });

    try {
        // console.log('try fetching from',endpoint)
        IncrementRequestCounter();
        console.log("GETting from",uri)
        const response = await fetch(req);
        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            // throw new Error(`Couldnt retrieve data from Endpoint: ${endpoint}`);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error){
        console.log(error);
        throw error;
    }
}


//generic function that allows you to get data from a specific endpoint in json format
export const PostDataToEndPoint = async (endpoint, params ) => {

    if(AssertUserCanRequestData() == false)
        return;

    let uri = `https://api.intra.42.fr${endpoint}`;
    let tokendata = getAccessToken();
    // console.log("tokendata in getdata = ",tokendata);

    const tokenRequest = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${tokendata.access_token}`,
        },
        body: params,
      };

    try {
        console.log('POSTing to',uri)
        IncrementRequestCounter()
        // console.log("Post Request = ",tokenRequest)
        const response = await fetch(uri,tokenRequest);
        if(response.ok){
            console.log('Suceess')
            return response.json();
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
    }
    } catch (error){
        console.log(error);
        throw error;
    }
}


export const DeleteDataFromEndpoint =async (endpoint)=> {

    const uri = `https://api.intra.42.fr${endpoint}`;
    if(AssertUserCanRequestData() == false)
        return;

    let tokendata = getAccessToken();
    try {
        IncrementRequestCounter();
        console.log("DELETEing at",uri)
        const response = await fetch(uri, {
            method: 'DELETE',
            headers: {
           'Authorization': `Bearer ${tokendata.access_token}`, // Replace with your access token
         },
       })
       if (response.ok) {
         console.log('Deletion successfully');
       } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

}

//yikes?
export const StallTimeBetweenApiCalls = () =>{
    return new Promise(resolve => setTimeout(resolve, 600));
}