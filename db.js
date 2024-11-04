
class DB {
    #apiBaseUrl = 'http://localhost:3000';

    constructor() {
    }

    async get(key) {
        let url = `${this.#apiBaseUrl}/get?key=${key}`;

        return fetch(url).then(resp => resp.json());
    }

    async set(key, value) {
        let url = `${this.#apiBaseUrl}/set`;
        let data = { key, value };

        let resp = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data) 
        });

        let respData = await resp.json();
        if (respData?.status === 0) {
            return true;
        } else {
            return false;
        }
    }
}

const db = new DB();

export default db;

