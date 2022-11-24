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
    
    allIngredients() {
        return fetch("https://silent-blade-368222.appspot.com/rest/user/allIngredients", {
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
            localStorage.setItem('ingredientList', text);
            return text;
        })
    }
    rateRecipe(rating,name) {
        return fetch("https://silent-blade-368222.appspot.com/rest/user/recipes/rate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: name,
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
            return text;
        })
    }

    filterIngredients(vegetables,meat,fish,fruits,cereals,others,seafoods) {
        const filter = [];
        filter.push(vegetables);
        filter.push(meat);
        filter.push(fish);
        filter.push(fruits);
        filter.push(cereals);
        filter.push(others);
        filter.push(seafoods);
        var type1 = null;
        for(var i = 0; i < filter.length; i++){
            if(filter[i]){
              if(i == 0){
                type1 = "vegetable";
              }else if(i == 1){
                type1 = "meat";
              }else if (i == 2){
                type1 = "fish";
              }else if(i == 3){
                type1 = "fruit"; 
              }else if ( i == 4){
                type1 = "cereal";
              } else if (i == 5){
                type1 = "other";
              }else if (i == 6){
                type1 = "sea_food";
              }
            }
        }
        console.log(type1);
        return fetch("https://silent-blade-368222.appspot.com/rest/user/pantry/filter", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                username: JSON.parse(localStorage.getItem('user')).username,
                type : type1
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
    filterTextIngredients(ingredient) {
        return fetch("https://silent-blade-368222.appspot.com/rest/user/pantry/ingredient", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                username: JSON.parse(localStorage.getItem('user')).username,
                ingredient: ingredient
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