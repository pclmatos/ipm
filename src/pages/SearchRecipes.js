import { Box, Grid, TextField, Typography, Card, CardMedia, CardContent, RadioGroup, FormControlLabel, Radio, ThemeProvider, createTheme } from "@mui/material";
import Select from "react-select"
import logoIHMcut from "../images/logoIHMcut.png"
import { useState } from "react"
import "./style.css"

export default function SearchRecipesPage() {
    const [vegetarian, setVegetarian] = useState("false")
    const [vegan, setVegan] = useState("false")
    const [kosher, setKosher] = useState("false")
    const [glutenFree, setGlutenFree] = useState("false")
    const [lactoseFree, setLactoseFree] = useState("false")
    const [completeMeal, setCompleteMeal] = useState("true")
    const [lightMeal, setLightMeal] = useState("true")
    const [selectedMeatFishEggsIngredients, setSelectedMeatFishEggsIngredients] = useState()

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

    function selectedMeatFishEggsIngredientsHandler(data) {
        setSelectedMeatFishEggsIngredients(data);
    }

    const meatFishEggsOptionList = [
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
            <Grid item xs={3}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }} >
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
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Compete Meal</Typography>} />
                            </RadioGroup>
                            <RadioGroup
                                value={lightMeal}
                                onClick={lightMealHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Light Meal</Typography>} />
                            </RadioGroup>
                        </ThemeProvider>
                    </Box>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 25, color: "black", pt: "5%", pb: "2%" }}>Ingredient Filtering</Typography>
                    <Select
                        options={meatFishEggsOptionList}
                        placeholder="Select ingredients"
                        value={selectedMeatFishEggsIngredients}
                        onChange={selectedMeatFishEggsIngredientsHandler}
                        isSearchable={true}
                        isMulti
                    />
                </Box>
            </Grid>
            <Grid container item xs={9} direction="row">
                <Box sx={{ p: 1, width: "33.3%" }}>
                    <Card variant="outlined" sx={{ p: 1 }}>
                        <CardContent >
                            <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Receita 1
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            image={logoIHMcut}
                            height="320"
                            alt="green iguana"
                        />
                    </Card>
                </Box>
                <Box sx={{ p: 1, width: "33.3%" }}>
                    <Card variant="outlined" sx={{ p: 1 }}>
                        <CardContent>
                            <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Receita 2
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            image={logoIHMcut}
                            height="320"
                            alt="green iguana"
                        />
                    </Card>
                </Box>
                <Box sx={{ p: 1, width: "33.3%" }}>
                    <Card variant="outlined" sx={{ p: 1 }}>
                        <CardContent >
                            <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Receita 3
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            image={logoIHMcut}
                            height="320"
                            alt="green iguana"
                        />
                    </Card>
                </Box>
                <Box sx={{ p: 1, width: "33.3%" }}>
                    <Card variant="outlined" sx={{ p: 1 }}>
                        <CardContent>
                            <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Receita 4
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            image={logoIHMcut}
                            height="320"
                            alt="green iguana"
                        />
                    </Card>
                </Box>
                <Box sx={{ p: 1, width: "33.3%" }}>
                    <Card variant="outlined" sx={{ p: 1 }}>
                        <CardContent>
                            <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Receita 5
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            image={logoIHMcut}
                            height="320"
                            alt="green iguana"
                        />
                    </Card>
                </Box>
            </Grid>
        </Grid>
    )
}