import Settings from 'Settings';

class GymManagementApiService {

    static apiUrl = null;
    static userToken = null;

    static async request(uri, body, method) {
        
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': GymManagementApiService.userToken
        }

        let options = {
            headers: headers,
            body: method === 'GET' ? null : JSON.stringify(body),
            method: method,
        }

        let url = `${GymManagementApiService.apiUrl}${uri}`;

        console.log("url / options:", url, options);

        try{
            let response = await fetch(url, options);
            response = await response.json();
            console.log("response:", response);
            return response;
        }
        catch(error) {
            return error;
        }

    }

    // Setup Methods

    static setApiUrl() {
        GymManagementApiService.apiUrl = Settings.getApiUrl();
    }

    static setUserToken() {

    }

    // Login/Logout Methods

    static async login(email, password) {

    }

    // Contact Methods

    static async getContacts() {

        let filter = ``;
        //return await this.request('GetContacts', null, 'GET');
        return await this.request('Contact', null, 'GET');
    }

    static async createContact(contact) {
        return await this.request('Contact', contact, 'POST');
    }

    // Source Methods

    static async getSources() {

        let filter = ``;
        return await this.request('Source', null, 'GET');
    }

    // Status Methods

    static async getStatuses() {

        let filter = '';
        return await this.request('Status', null, 'GET');
    }

    // Interest Methods 
    
    static async getInterests() {

        let filter = '';
        return await this.request('Interest', null, 'GET');
    }
}

export default GymManagementApiService;