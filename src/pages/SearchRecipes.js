import { Box, Grid, Typography, Card, CardMedia, TextField, CardContent, Fab, Rating, RadioGroup, CircularProgress, FormControlLabel, Radio, ThemeProvider, createTheme, Button, Divider } from "@mui/material";
import Select from "react-select"
import logoIHMcut from "../images/logoIHMcut.png"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import restCalls from "../restCalls"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LogoutIcon from '@mui/icons-material/Logout';
import "./style.css"

export default function SearchRecipesPage() {
    const [vegetarian, setVegetarian] = useState("false")
    const [vegan, setVegan] = useState("false")
    const [kosher, setKosher] = useState("false")
    const [glutenFree, setGlutenFree] = useState("false")
    const [lactoseFree, setLactoseFree] = useState("false")
    const [completeMeal, setCompleteMeal] = useState("true")
    const [lightMeal, setLightMeal] = useState("true")
    const [ingredients, setIngredients] = useState()
    const [searchText, setSearchText] = useState(null)
    const [readOnly, setReadOnly] = useState(false)
    const [loading, setLoading] = useState(false)

    const [showRecipe, setShowRecipe] = useState(false)
    const [currentRecipe, setCurrentRecipe] = useState(null)

    const [rating, setRating] = useState()
    const [rate, setRate] = useState(false)

    var recipes = JSON.parse(localStorage.getItem('recipes'));
    let navigate = useNavigate();

    useEffect(() => {
        if (currentRecipe != null && rate) {
            ratingManager()
        }
    }, [rate])

    function logout() {
        navigate("/")
        localStorage.removeItem('ingredientList')
        localStorage.removeItem('pantry')
        localStorage.removeItem('recipes')
        localStorage.removeItem('topRatedRecipes')
        localStorage.removeItem('user')
    }

    function vegetarianHandler(e) {
        if (vegetarian === "true") {
            setVegetarian("false");
        } else {
            setVegetarian(e.target.value);
        }
    }

    function veganHandler(e) {
        if (vegan === "true") {
            setVegan("false");
        } else {
            setVegan(e.target.value);
        }
    }

    function kosherHandler(e) {
        if (kosher === "true") {
            setKosher("false");
        } else {
            setKosher(e.target.value);
        }
    }

    function glutenFreeHandler(e) {
        if (glutenFree === "true") {
            setGlutenFree("false");
        } else {
            setGlutenFree(e.target.value);
        }
    }

    function lactoseFreeHandler(e) {
        if (lactoseFree === "true") {
            setLactoseFree("false");
        } else {
            setLactoseFree(e.target.value);
        }
    }

    function completeMealHandler(e) {
        if (completeMeal === "true") {
            setCompleteMeal("false");
        } else {
            setCompleteMeal(e.target.value);
        }
    }

    function lightMealHandler(e) {
        if (lightMeal === "true") {
            setLightMeal("false");
        } else {
            setLightMeal(e.target.value);
        }
    }

    function ingredientsHandler(data) {
        setIngredients(data);
    }

    function showRecipeHandler(e) {
        if (!showRecipe) {
            setShowRecipe(true);
        } else {
            setShowRecipe(false);
        }
    }

    function updateCurrRecipe(recipe) {
        setCurrentRecipe(recipe);
        setRating(recipe.rating)
    }

    function ratingManager() {
        restCalls.rateRecipe(rating, currentRecipe.name).then(() => { restCalls.searchRecipe(vegetarian, vegan, kosher, glutenFree, lactoseFree, completeMeal, lightMeal, ingredients, searchText); restCalls.topRatedRecipes() })
    }

    function handleSearchText(e) {
        if (e.target.value === "") {
            setSearchText(null)
        } else {
            setSearchText(e.target.value)
        }
    }

    function searchRecipeManager(e) {
        e.preventDefault();
        setLoading(true)
        console.log(searchText)
        restCalls.searchRecipe(vegetarian, vegan, kosher, glutenFree, lactoseFree, completeMeal, lightMeal, ingredients, searchText)
            .then(() => { setLoading(false) })
            .catch(() => { setLoading(false) })
    }

    function clearFiltersManager() {
        setLoading(true)
        setCompleteMeal(true)
        setLightMeal(true)
        setSearchText(null)
        setVegetarian(false)
        setVegan(false)
        setKosher(false)
        setGlutenFree(false)
        setLactoseFree(false)
        setIngredients("")
        setSearchText("")
        restCalls.allRecipes()
            .then(() => { setLoading(false) })
            .catch(() => { setLoading(false) })
    }

    const ingredientsList = [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "pear", label: "Pear" },
        { value: "strawberry", label: "Strawberry" },
        { value: "grape", label: "Grape" },
        { value: "watermelon", label: "Watermelon" },
        { value: "orange", label: "Orange" },
        { value: "blueberry", label: "Blueberry" },
        { value: "lemon", label: "Lemon" },
        { value: "peach", label: "Peach" },
        { value: "avocado", label: "Avocado" },
        { value: "pineapple", label: "Pineapple" },
        { value: "cherry", label: "Cherry" },
        { value: "cantaloupe", label: "Cantaloupe" },
        { value: "raspberry", label: "Raspberry" },
        { value: "lime", label: "Lime" },
        { value: "blackberry", label: "Blackberry" },
        { value: "clementine", label: "Clementine" },
        { value: "mango", label: "Mango" },
        { value: "plum", label: "Plum" },
        { value: "kiwi", label: "Kiwi" },
        { value: "potato", label: "Potato" },
        { value: "tomato", label: "Tomato" },
        { value: "onion", label: "Onion" },
        { value: "carrot", label: "Carrot" },
        { value: "bell_pepper", label: "Bell Pepper" },
        { value: "broccoli", label: "Broccoli" },
        { value: "cucumber", label: "Cucumber" },
        { value: "lettuce", label: "Lettuce" },
        { value: "celery", label: "Celery" },
        { value: "mushroom", label: "Mushroom" },
        { value: "garlic", label: "Garlic" },
        { value: "spinach", label: "Spinach" },
        { value: "green_bean", label: "Green Bean" },
        { value: "cabbage", label: "Cabbage" },
        { value: "sweet_potato", label: "Sweet Potato" },
        { value: "green_onion", label: "Green Onion" },
        { value: "cauliflower", label: "Cauliflower" },
        { value: "aspargo", label: "Aspargo" },
        { value: "peas", label: "Peas" },
        { value: "basil", label: "Basil" },
        { value: "pork", label: "Pork" },
        { value: "chicken", label: "Chicken" },
        { value: "beef", label: "Beef" },
        { value: "lamb", label: "Lamb" },
        { value: "goat", label: "Goat" },
        { value: "turkey", label: "Turkey" },
        { value: "duck", label: "Duck" },
        { value: "buffalo", label: "Buffalo" },
        { value: "goose", label: "Goose" },
        { value: "rabbit", label: "Rabbit" },
        { value: "shrimp", label: "Shrimp" },
        { value: "tuna", label: "Tuna" },
        { value: "salmon", label: "Salmon" },
        { value: "tilapia", label: "Tilapia" },
        { value: "catfish", label: "Catfish" },
        { value: "crab", label: "Crab" },
        { value: "cod", label: "Cod" },
        { value: "clam", label: "Clam" },
        { value: "pangasius", label: "Pangasius" },
        { value: "egg", label: "Egg" },
        { value: "milk", label: "Milk" },
        { value: "chocolate", label: "Chocolate" },
        { value: "sugar", label: "Sugar" },
        { value: "salt", label: "Salt" },
        { value: "pepper", label: "Pepper" },
        { value: "cinnamon", label: "Cinnamon" },
        { value: "cream", label: "Cream" },
        { value: "olive_oil", label: "Olive Oil" },
        { value: "tomato_sauce", label: "Tomato Sauce" },
        { value: "soy_sauce", label: "Soy Sauce" },
        { value: "hot_sauce", label: "Hot Sauce" },
        { value: "oregano", label: "Oregano" },
        { value: "paprika", label: "Paprika" },
        { value: "curry", label: "Curry" },
        { value: "cheese", label: "Cheese" },
        { value: "butter", label: "Butter" },
        { value: "yogurt", label: "Yogurt" },
        { value: "bread", label: "Bread" },
        { value: "croissant", label: "Croissant" },
        { value: "grain", label: "Grain" },
        { value: "oat", label: "Oat" },
        { value: "rice", label: "Rice" },
        { value: "pasta", label: "Pasta" },
        { value: "quinoa", label: "Quinoa" },
        { value: "corn", label: "Corn" },
        { value: "lentils", label: "Lentils" },
    ];

    const theme = createTheme({
        palette: {
            primary: {
                main: "#000000",
            },
        },
    });

    return (
        <Grid container className="container"  >
            {loading && <CircularProgress size='3rem' color="inherit" sx={{ position: "absolute", top: "50%", left: "50%", overflow: "auto" }} />}
            <Fab
                variant="extended"
                sx={{
                    position: "fixed", top: "92%", left: "92%", overflow: "auto", bgcolor: "#FFC86E", "&:hover": {
                        bgcolor: "#ffba4d"
                    }
                }}
                onClick={logout}
            >
                <LogoutIcon sx={{ mr: 1, color: "black" }} />  <Typography sx={{ fontFamily: 'Verdana', fontSize: 15, color: "black" }}>Logout</Typography>
            </Fab>
            <Grid item xs={2.95}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }} >
                    <TextField
                        sx={{ "mt": 4 }}
                        id="standard-search"
                        value={searchText}
                        onChange={handleSearchText}
                        label="Search Recipe"
                        type="search"
                    />

                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 25, color: "black", pt: "6%", pb: "1%" }}>Diet Filtering</Typography>
                    <Box sx={{ pl: "6%" }}>
                        <ThemeProvider theme={theme}>
                            <RadioGroup
                                value={vegetarian}
                                onClick={vegetarianHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Vegetarian</Typography>} />
                            </RadioGroup>
                            <RadioGroup
                                value={vegan}
                                onClick={veganHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Vegan</Typography>} />
                            </RadioGroup>
                            <RadioGroup
                                value={kosher}
                                onClick={kosherHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Kosher</Typography>} />
                            </RadioGroup>
                            <RadioGroup
                                value={glutenFree}
                                onClick={glutenFreeHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Gluten Free</Typography>} />
                            </RadioGroup>
                            <RadioGroup
                                value={lactoseFree}
                                onClick={lactoseFreeHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Lactose Free</Typography>} />
                            </RadioGroup>
                        </ThemeProvider>
                    </Box>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 25, color: "black", pt: "6%", pb: "1%" }}>Meal Filtering</Typography>
                    <Box sx={{ pl: "9%" }}>
                        <ThemeProvider theme={theme}>
                            <RadioGroup
                                value={completeMeal}
                                onClick={completeMealHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Complete Meal</Typography>} />
                            </RadioGroup>
                            <RadioGroup
                                value={lightMeal}
                                onClick={lightMealHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Light Meal</Typography>} />
                            </RadioGroup>
                        </ThemeProvider>
                    </Box>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 25, color: "black", pt: "5%", pb: "3%" }}>Ingredient Filtering</Typography>

                    <Box sx={{ width: "40%" }}>
                        <Select
                            options={ingredientsList}
                            placeholder="Select ingredients"
                            value={ingredients}
                            onChange={ingredientsHandler}
                            isSearchable={true}
                            isMulti
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="outlined"
                        color='inherit'
                        sx={{ mt: "4%", width: "40%" }}
                        onClick={(e) => { clearFiltersManager(e) }}
                    >
                        <Typography sx={{ fontFamily: 'Verdana', fontSize: 16, color: "black" }}> Clear filters </Typography>
                    </Button>

                    <Button
                        type="submit"
                        variant="outlined"
                        color='inherit'
                        sx={{ mt: "4%", width: "20%" }}
                        onClick={(e) => { searchRecipeManager(e) }}
                    >
                        <Typography sx={{ fontFamily: 'Verdana', fontSize: 16, color: "black" }}> Filter! </Typography>
                    </Button>
                </Box>
            </Grid>
            <Grid container item xs={0.05} direction="column" alignItems="center" justifyContent="center">
                <Divider orientation="vertical" sx={{ bgcolor: "#FFC86E", width: "20%" }} />
            </Grid>
            <Grid container item xs={9} direction="row">
                {!showRecipe ? recipes.map((recipe) =>
                    <>
                        <Box sx={{ p: 1, width: "33.3%" }}>
                            <Card val variant="outlined" sx={{ p: 1 }}>
                                <CardContent >
                                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                        {recipe.name}
                                    </Typography>
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    image={recipe.photo === "undefined" ? logoIHMcut : recipe.photo}
                                    height="320"
                                    alt="green iguana"
                                    onClick={() => { showRecipeHandler(); updateCurrRecipe(recipe); setReadOnly(false) }}
                                    sx={{ cursor: "pointer" }}

                                />
                            </Card>
                        </Box>
                    </>
                ) :
                    <>
                        <Grid container item xs={3}>
                            <Button color="inherit" onClick={() => { showRecipeHandler(); setRate(false) }}>
                                <KeyboardBackspaceIcon />
                            </Button>
                        </Grid>
                        <Box sx={{ p: 0.5, width: "45%" }}>
                            <Card variant="outlined" sx={{ p: 1 }}>
                                <CardContent >
                                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black", textAlign: "center" }}>
                                        {currentRecipe.name} (Shared by: {currentRecipe.author})
                                    </Typography>
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    image={currentRecipe.photo === "undefined" ? logoIHMcut : currentRecipe.photo}
                                    height="350"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black" }}>
                                        Ingredients (specification):<Typography sx={{ fontFamily: 'Verdana', fontSize: 18, color: "#BA852D" }}> - {currentRecipe.ingredientsDescription}</Typography>
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black" }}>
                                        Description:<Typography sx={{ fontFamily: 'Verdana', fontSize: 18, color: "#BA852D" }}> - {currentRecipe.description}</Typography>
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black" }}>
                                        Category:<Typography sx={{ fontFamily: 'Verdana', fontSize: 18, color: "#BA852D" }}> - {currentRecipe.category}</Typography>
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black" }}>
                                        Calories:<Typography sx={{ fontFamily: 'Verdana', fontSize: 18, color: "#BA852D" }}> - {currentRecipe.calories}</Typography>
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black" }}>
                                        Difficulty (1-5):<Typography sx={{ fontFamily: 'Verdana', fontSize: 18, color: "#BA852D" }}> - {currentRecipe.difficulty}</Typography>
                                    </Typography>

                                    <Rating
                                        sx={{ "mt": 2, "ml": "75%" }}
                                        size="large"
                                        name="simple-controlled"
                                        value={rating}
                                        readOnly={readOnly}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            setRate(true)
                                            setRating(newValue)
                                            setReadOnly(true)
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </Box>
                    </>
                }
            </Grid>
        </Grid>
    )
}