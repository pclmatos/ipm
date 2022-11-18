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
            localStorage.setItem('user', text);
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

    searchRecipe(vegetarian, vegan, kosher, glutenFree, lactoseFree, completeMeal, lightMeal, ingredients) {
        console.log(ingredients)
        const ingredients2 = [];
        for (var i = 0; i < ingredients.length; i++) {
            ingredients2.push(ingredients[i].value)
        }
        console.log(ingredients2)
        return fetch("https://silent-blade-368222.appspot.com/rest/user/filterSearching", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                vegetarian: vegetarian,
                vegan: vegan,
                kosher: kosher,
                glutenFree: glutenFree,
                lactoseFree: lactoseFree,
                completeMeal: completeMeal,
                lightMeal: lightMeal,
                ingredients: ingredients2,
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
            localStorage.setItem('recipes', text);
            return text;
        })
    }

    allRecipes() {
        return fetch("https://silent-blade-368222.appspot.com/rest/user/allRecipes", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
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
            localStorage.setItem('recipes', text);
            return text;
        })
    }
}



const restCallsExport = new restCalls();
export default restCallsExport;