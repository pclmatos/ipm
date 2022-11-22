import { Grid, Box, Typography, Card, CardContent, CardMedia, createTheme, ThemeProvider, FormControlLabel, RadioGroup, Radio, Divider, Button } from "@mui/material";
import Select from "react-select"
import { useState } from "react"
import restCalls from "../restCalls"
import "./style.css"


export default function ConsultPantry() {
    const [vegetables, setVegetables] = useState("false")
    const [meat, setMeat] = useState("false")
    const [fish, setFish] = useState("false")
    const [fruits, setFruits] = useState("false")
    const [dairy, setDairy] = useState("false")
    const [driedFruits, setDriedFruits] = useState("false")
    const [sauces, setSauce] = useState("false")
    const [pastas, setPastas] = useState("false")
    const [fatsOils, setfatsOils] = useState("false")
    const [herbs, setherbs] = useState("false")
    const [rice, setRice] = useState("false")
    const [seasonings, setSeasoning] = useState("false")
    const [ingredients, setIngredients] = useState()

    var pantry = JSON.parse(localStorage.getItem('pantry'));

    function vegetablesHandler(e) {
        if (vegetables === "true") {
            setVegetables("false");
        } else {
            setVegetables(e.target.value);
        }
    }
    function meatHandler(e) {
        if (meat === "true") {
            setMeat("false");
        } else {
            setMeat(e.target.value);
        }
    }
    function fishHandler(e) {
        if (fish === "true") {
            setFish("false");
        } else {
            setFish(e.target.value);
        }
    }
    function fruitsHandler(e) {
        if (fruits === "true") {
            setFruits("false");
        } else {
            setFruits(e.target.value);
        }
    }
    function dairyHandler(e) {
        if (dairy === "true") {
            setDairy("false");
        } else {
            setDairy(e.target.value);
        }
    }
    function driedFruitsHandler(e) {
        if (driedFruits === "true") {
            setDriedFruits("false");
        } else {
            setDriedFruits(e.target.value);
        }
    }
    function saucesHandler(e) {
        if (sauces === "true") {
            setSauce("false");
        } else {
            setSauce(e.target.value);
        }
    }
    function pastasHandler(e) {
        if (pastas === "true") {
            setPastas("false");
        } else {
            setPastas(e.target.value);
        }
    }
    function fatsOilsHandler(e) {
        if (fatsOils === "true") {
            setfatsOils("false");
        } else {
            setfatsOils(e.target.value);
        }
    }
    function herbsHandler(e) {
        if (herbs === "true") {
            setherbs("false");
        } else {
            setherbs(e.target.value);
        }
    }
    function riceHandler(e) {
        if (rice === "true") {
            setRice("false");
        } else {
            setRice(e.target.value);
        }
    }
    function seasoningHandler(e) {
        if (seasonings === "true") {
            setSeasoning("false");
        } else {
            setSeasoning(e.target.value);
        }
    }
    function ingredientsHandler(data) {
        setIngredients(data);
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
        { value: 'barbecue_sauce', label: 'Barbecue Sauce' },
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
    /*
    function getPantryManager(e) {
        e.preventDefault();
        restCalls.getPantry()
    }
*/
    const theme = createTheme({
        palette: {
            primary: {
                main: "#000000",
            },
        },
    });




    return (
        <Grid container>
            <Grid item xs={2.95}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 25, color: "black", pt: "6%", pb: "1%" }}>Types of ingredients</Typography>
                    <Box sx={{ pl: '6%' }}>
                        <ThemeProvider theme={theme}>
                            <RadioGroup
                                value={vegetables}
                                onClick={vegetablesHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Vegetables</Typography>} />
                            </RadioGroup>
                            <RadioGroup
                                value={meat}
                                onClick={meatHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Meats</Typography>} />
                            </RadioGroup>
                            <RadioGroup
                                value={fish}
                                onClick={fishHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Fishes</Typography>} />
                            </RadioGroup>
                            <RadioGroup
                                value={fruits}
                                onClick={fruitsHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Fruits</Typography>} />
                            </RadioGroup>
                            <RadioGroup
                                value={dairy}
                                onClick={dairyHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Dairy products</Typography>} />
                            </RadioGroup>
                            <RadioGroup
                                value={driedFruits}
                                onClick={driedFruitsHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Dried Fruits</Typography>} />
                            </RadioGroup>
                            <RadioGroup
                                value={sauces}
                                onClick={saucesHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Sauces</Typography>} />
                            </RadioGroup>
                            <RadioGroup
                                value={pastas}
                                onClick={pastasHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Pastas</Typography>} />
                            </RadioGroup>
                            <RadioGroup
                                value={fatsOils}
                                onClick={fatsOilsHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Fats and Oils</Typography>} />
                            </RadioGroup>
                            <RadioGroup
                                value={herbs}
                                onClick={herbsHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Herbs and Spices</Typography>} />
                            </RadioGroup>
                            <RadioGroup
                                value={rice}
                                onClick={riceHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Rice</Typography>} />
                            </RadioGroup>
                            <RadioGroup
                                value={seasonings}
                                onClick={seasoningHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Seasonings</Typography>} />
                            </RadioGroup>
                        </ThemeProvider>
                    </Box>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 25, color: "black", pt: "5%", pb: "3%" }}>Search </Typography>
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
                        sx={{ mt: "8%", width: "20%" }}
                    //onClick={(e) => { searchRecipeManager(e) }}
                    >
                        <Typography sx={{ fontFamily: 'Verdana', fontSize: 16, color: "black" }}> Filter! </Typography>
                    </Button>
                </Box>
            </Grid>
            <Grid container item xs={0.05} direction="column" alignItems="center" justifyContent="center">
                <Divider orientation="vertical" sx={{ bgcolor: "#FFC86E", width: "20%" }} />
            </Grid>
            <Grid container item xs={9} direction='row'>

                {pantry.map((p) =>
                    <Box sx={{ p: 1, width: "20%" }}>
                        <Card variant="outlined" sx={{ p: 1 }}>
                            <CardContent >
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                   {p.split(" ")[0]}
                                </Typography>
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                    {p.split(" ")[1]}
                                </Typography>
                            </CardContent>
                            <CardMedia
                                component="img"
                                //image={recipe.photo == "undefined" ? logoIHMcut : recipe.photo}
                                height="320"
                                alt="green iguana"
                                sx={{ cursor: "pointer" }}
                            />
                        </Card>
                    </Box>
                )}
            </Grid>
        </Grid>
    )
}