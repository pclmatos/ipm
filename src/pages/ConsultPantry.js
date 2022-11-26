import { Grid, Box, Typography, Card, CardContent, CircularProgress, CardMedia, createTheme, ThemeProvider, FormControl, FormControlLabel, RadioGroup, Radio, Divider, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Select from "react-select"
import React, { useState } from "react"
import restCalls from "../restCalls"
import "./style.css"


export default function ConsultPantry() {
    const [vegetables, setVegetables] = useState(false)
    const [meat, setMeat] = useState(false)
    const [fish, setFish] = useState(false)
    const [fruits, setFruits] = useState(false)
    const [seafoods, setSeafoods] = useState(false)
    const [others, setOthers] = useState(false)
    const [cereals, setCereals] = useState(false)
    const [ingredients, setIngredients] = useState()
    const [ingredients2, setIngredients2] = useState()
    const [ingredients3, setIngredients3] = useState()
    const [loading, setLoading] = useState(false)

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    var pantry = JSON.parse(localStorage.getItem('pantry'));
    var ingredientList = JSON.parse(localStorage.getItem('ingredientList'));

    function searchIngredient(iName) {
        for (var i = 0; i < ingredientList.length; i++) {
            if (ingredientList[i].name == iName) {
                return ingredientList[i];
            }
        }
    }

    function vegetablesHandler(e) {
        if (vegetables) {
            setVegetables(false);
        } else {
            setVegetables(e.target.value);
        }
    }

    function meatHandler(e) {
        if (meat) {
            setMeat(false);
        } else {
            setMeat(e.target.value);
        }
    }

    function fishHandler(e) {
        if (fish) {
            setFish(false);
        } else {
            setFish(e.target.value);
        }
    }

    function fruitsHandler(e) {
        if (fruits) {
            setFruits(false);
        } else {
            setFruits(e.target.value);
        }
    }

    function seafoodHandler(e) {
        if (seafoods) {
            setSeafoods(false);
        } else {
            setSeafoods(e.target.value);
        }
    }

    function othersHandler(e) {
        if (others) {
            setOthers(false);
        } else {
            setOthers(e.target.value);
        }
    }

    function cerealsHandler(e) {
        if (cereals) {
            setCereals(false);
        } else {
            setCereals(e.target.value);
        }
    }

    function ingredientsHandler(data) {
        setIngredients(data);
    }

    function ingredients2Handler(data) {
        setIngredients2(data);
    }

    function ingredients3Handler(data) {
        setIngredients3(data);
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

    function getFiltersManager(e) {
        e.preventDefault();
        setLoading(true);
        if (vegetables || meat || fish || fruits || cereals || others || seafoods) {
            restCalls.filterIngredients(vegetables, meat, fish, fruits, cereals, others, seafoods)
                .then(() => { setLoading(false); /*window.location.reload(false)*/ })
                .catch(() => { setLoading(false) })
        } else {
            restCalls.filterTextIngredients(ingredients.value.toString())
                .then(() => { setLoading(false); /*window.location.reload(false)*/ })
                .catch(() => { setLoading(false) })
        }
    }
    function clearFiltersManager(e) {
        setLoading(true)
        setVegetables(false);
        setMeat(false);
        setFish(false);
        setFruits(false);
        setCereals(false);
        setOthers(false);
        setSeafoods(false);
        setIngredients("")
        restCalls.getPantry().then(() => { setLoading(false); /*window.location.reload(false)*/ })
            .catch(() => { setLoading(false) })
    }

    function getLabel(valueStr) {
        let foundIngredient = ingredientsList.find(ingredient => ingredient.value == valueStr)

        return foundIngredient.label;
    }

    function getPantryList() {
        const pantryList = []
        for(let i=0; i<pantry.length; i++) {
            let auxValue = pantry[i].split(" ")[0]
            let auxLabel = getLabel(auxValue)
            pantryList.push({ value: auxValue, label: auxLabel })
        }
        return pantryList
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: "#000000",
            },
        },
    });

    function generateIngredients() {
        const ingredientCards = [];
        pantry.map((p) => {
            ingredientCards.push(
                <>
                    <Box sx={{ p: 1, width: "20%" }}>
                        <Card variant="outlined" sx={{ p: 1 }}>
                            <CardContent >
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black", display: 'flex', justifyContent: 'center' }}>
                                    {p.split(" ")[0]}
                                </Typography>
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black", display: 'flex', justifyContent: 'center' }}>
                                    {p.split(" ")[1]}
                                </Typography>
                            </CardContent>
                            <CardMedia
                                component="img"
                                image={searchIngredient(p.split(" ")[0]).photo}
                                height="150"
                                alt="green iguana"
                            />
                        </Card>
                    </Box>
                </>)
        })
        return ingredientCards;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        restCalls.addIngredient()
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleClickClose1 = () => {
        setLoading(true)
        setOpen(false);
        setIngredients2()
        restCalls.addIngredient(ingredients2).then(() => { setLoading(false); /*window.location.reload(false)*/ })
            .catch(() => { setLoading(false) })
    };

    const handleClickClose2 = () => {
        setLoading(true)
        setOpen2(false);
        setIngredients3()
        restCalls.removeIngredient(ingredients3).then(() => { setLoading(false); /*window.location.reload(false)*/ })
            .catch(() => { setLoading(false) })
    };

    return (
        <Grid container>
            {loading && <CircularProgress size='3rem' color="inherit" sx={{ position: "absolute", top: "50%", left: "50%", overflow: "auto" }} />}
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
                                value={seafoods}
                                onClick={seafoodHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Seafoods</Typography>} />
                            </RadioGroup>
                            <RadioGroup
                                value={cereals}
                                onClick={cerealsHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Cereals</Typography>} />
                            </RadioGroup>
                            <RadioGroup
                                value={others}
                                onClick={othersHandler}>
                                <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Others</Typography>} />
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
                            isMulti={false}
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="outlined"
                        color='inherit'
                        sx={{ mt: "6%", width: "20%" }}
                        onClick={(e) => { getFiltersManager(e) }}
                    >
                        <Typography sx={{ fontFamily: 'Verdana', fontSize: 16, color: "black" }}> Filter </Typography>
                    </Button>
                    <Button
                        type="submit"
                        variant="outlined"
                        color='inherit'
                        sx={{ mt: "4%", width: "40%" }}
                        onClick={(e) => { clearFiltersManager(e) }}
                    >
                        <Typography sx={{ fontFamily: 'Verdana', fontSize: 16, color: "black" }}> Clear filters </Typography>
                    </Button>



                    <Button variant="outlined" color='inherit' sx={{ mt: "10%", width: "50%" }} onClick={handleClickOpen}>
                        <Typography sx={{ fontFamily: 'Verdana', fontSize: 16, color: "black" }}> Add Ingredients</Typography>
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogTitle>Add ingredients to your pantry!</DialogTitle>
                        <DialogContent>
                            <FormControl sx={{ mt: 2, minWidth: 120, minHeight: 175 }}>
                                <Select
                                    options={ingredientsList}
                                    placeholder="Select ingredients"
                                    value={ingredients2}
                                    onChange={ingredients2Handler}
                                    isSearchable={true}
                                    isMulti
                                />
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" color='inherit' onClick={handleClickClose1}>Add!</Button>
                        </DialogActions>
                    </Dialog>

                    <Button variant="outlined" color='inherit' sx={{ mt: "4%", width: "50%" }} onClick={handleClickOpen2}>
                        <Typography sx={{ fontFamily: 'Verdana', fontSize: 16, color: "black" }}> Remove Ingredients</Typography>
                    </Button>
                    <Dialog
                        open={open2}
                        onClose={handleClose2}
                    >
                        <DialogTitle>Remove ingredients from your pantry!</DialogTitle>
                        <DialogContent>
                            <FormControl sx={{ mt: 2, minWidth: 120, minHeight: 175 }}>
                                <Select
                                    options={getPantryList()}
                                    placeholder="Select ingredients"
                                    value={ingredients3}
                                    onChange={ingredients3Handler}
                                    isSearchable={true}
                                    isMulti
                                />
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" color='inherit' onClick={handleClickClose2}>Remove!</Button>
                        </DialogActions>
                    </Dialog>

                </Box>
            </Grid>
            <Grid container item xs={0.05} direction="column" alignItems="center" justifyContent="center">
                <Divider orientation="vertical" sx={{ bgcolor: "#FFC86E", width: "20%" }} />
            </Grid>
            <Grid container item xs={9} direction='row'>
                {generateIngredients()}
            </Grid>
        </Grid>
    )
}