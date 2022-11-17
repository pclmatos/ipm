class restCalls {
    login(username, password) {
        return fetch("https://silent-blade-368222.appspot.com/rest/user/login", {
            method: 'POST',
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
                confirmation: confirmation
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

    shareRecipe(author, recipeName, description, ingredients, difficulty, category, calories) {
        return fetch("https://silent-blade-368222.appspot.com/rest/user/shareRecipe", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                author: author,
                recipeName: recipeName,
                description: description,
                ingredients: ingredients,
                difficulty: difficulty,
                category: category,
                calories: calories

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

    searchRecipe() {
        return fetch("https://silent-blade-368222.appspot.com/rest/user/filterSearching", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                vegetarian: false,
                vegan: false,
                kosher: false,
                glutenFree: false,
                lactoseFree: false,
                ingredients: []
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