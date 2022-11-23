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

    shareRecipe(recipeName, description, ingredients, difficulty, category, calories, photo, ingredientsDescription) {

        const ingredients2 = [];
        if (ingredients !== undefined) {
            for (var i = 0; i < ingredients.length; i++) {
                ingredients2.push(ingredients[i].value)
            }
        }
        console.log(ingredients2)
        return fetch("https://silent-blade-368222.appspot.com/rest/user/shareRecipe", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                author: JSON.parse(localStorage.getItem('user')).username,
                recipeName: recipeName,
                description: description,
                ingredients: ingredients2,
                difficulty: difficulty,
                category: category,
                calories: calories,
                photo: photo,
                ingredientsDescription: ingredientsDescription
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

    searchRecipe(vegetarian, vegan, kosher, glutenFree, lactoseFree, completeMeal, lightMeal, ingredients, searchText) {
        const ingredients2 = [];
        if (ingredients !== undefined) {
            for (var i = 0; i < ingredients.length; i++) {
                ingredients2.push(ingredients[i].value)
            }
        }
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
                searchText: searchText
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

    getPantry() {
        return fetch("https://silent-blade-368222.appspot.com/rest/user/pantry", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                username: JSON.parse(localStorage.getItem('user')).username
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
            localStorage.setItem('pantry', text);
            return text;
        })
    }

    rateRecipe(rating) {
        return fetch("https://silent-blade-368222.appspot.com/rest/user/recipes/rate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: JSON.parse(localStorage.getItem('recipes')).name,
                rating: rating
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

    /*
    updatePantry(entries) {
        return fetch("https://silent-blade-368222.appspot.com/rest/user/pantry", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: JSON.parse(localStorage.getItem('user')).username,
                entries: entries
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
            //localStorage.setItem('user', text);
            return text;
        })
    }
    */
}



const restCallsExport = new restCalls();
export default restCallsExport;