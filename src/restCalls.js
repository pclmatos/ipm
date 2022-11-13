class restCalls {
    login(username, password) {
        return fetch("https://silent-blade-368222.appspot.com/rest/user/login", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(function (response) {
            if (!response.ok) {
                return response.text().then((text) => {
                    const error = new Error(text)
                    error.code = response.status;
                    throw error
                })
            }
            return response.text()
        }).then(function (text) {
            localStorage.setItem('token', text);
            return text;
        })
    }

    register(username, password, confirmation) {
        return fetch("https://silent-blade-368222.appspot.com/rest/user/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                confirmation: confirmation,
            })
        }).then(function (response) {
            if (!response.ok) {
                return response.text().then((text) => {
                    const error = new Error(text)
                    error.code = response.status;
                    throw error
                })
            }
            return response.text()
        }).then(function (text) {
            return text;
        })
    }
}

const restCallsExport = new restCalls();
export default restCallsExport;