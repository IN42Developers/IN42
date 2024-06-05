import { AuthTokenData } from "../types/UserDataTypes";
import { getAccessToken, setAccessToken } from "./TokenStorage";
import { IncrementRequestCounter, AssertUserCanRequestData } from "./UserData";
import LogData, { logType } from "./debugging/debugging";

//generic function that allows you to get data from a specific endpoint in json format
export const GetDataFromEndPoint = async ( endpoint: string, logEndpoint: boolean = true ): Promise<any> => {

    if(AssertUserCanRequestData() == false)
        return;

    let uri: string = `https://api.intra.42.fr${endpoint}`;
    let tokendata: AuthTokenData = getAccessToken();
    // LogData(logType.INFO,"tokendata in getdata = ",tokendata);
    if(!tokendata){
        throw new Error("TokenData is Null");
    }

    let req: Request = new Request(uri, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokendata.access_token}`
        },
    });

    try {
        await IncrementRequestCounter();
        if(logEndpoint)
            LogData(logType.INFO,"GETting from",uri)
        const response = await fetch(req);
        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            // throw new Error(`Couldnt retrieve data from Endpoint: ${endpoint}`);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error){
        LogData(logType.ERROR,error);
        throw error;
    }
}


//generic function that allows you to get data from a specific endpoint in json format
export const PostDataToEndPoint = async (endpoint: string, params: any ): Promise<any> => {

    if(AssertUserCanRequestData() == false)
        return;

    let uri: string = `https://api.intra.42.fr${endpoint}`;
    let tokendata = getAccessToken();
    // LogData(logType.INFO,"tokendata in getdata = ",tokendata);

    const tokenRequest: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${tokendata.access_token}`,
        },
        body: params,
      };

    try {
        LogData(logType.INFO,'POSTing to',uri)
        await IncrementRequestCounter()
        // LogData(logType.INFO,"Post Request = ",tokenRequest)
        const response = await fetch(uri,tokenRequest);
        if(response.ok){
            LogData(logType.INFO,'Suceess')
            return response.json();
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
    }
    } catch (error){
        LogData(logType.ERROR,error);
        throw error;
    }
}


export const DeleteDataFromEndpoint =async (endpoint: string): Promise<void> => {

    const uri = `https://api.intra.42.fr${endpoint}`;
    if(AssertUserCanRequestData() == false)
        return;

    let tokendata: AuthTokenData = getAccessToken();
    try {
        await IncrementRequestCounter();
        LogData(logType.INFO,"DELETEing at",uri)
        const response = await fetch(uri, {
            method: 'DELETE',
            headers: {
           'Authorization': `Bearer ${tokendata.access_token}`, // Replace with your access token
         },
       })
       if (response.ok) {
        LogData(logType.INFO,'Deletion successfully');
       } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    } catch (error) {
        LogData(logType.ERROR, error);
        throw error;
    }

}

//yikes?
export const StallTimeBetweenApiCalls = () =>{
    return new Promise(resolve => setTimeout(resolve, 600));
}