import { Box, Grid, TextField, Fab, Typography, InputLabel, MenuItem, FormControl, Button, CircularProgress, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import SelectMUI from "@mui/material/Select";
import LogoutIcon from '@mui/icons-material/Logout';
import Select from "react-select"
import { useState, useRef, useEffect, forwardRef } from "react"
import { useNavigate } from "react-router-dom"
import restCalls from "../restCalls"
import "./style.css"

export default function ShareRecipe() {

    const [recipeName, setRecipeName] = useState("");
    const [category, setCategory] = useState("");
    const [calories, setCalories] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [ingredients, setIngredients] = useState();
    const [description, setDescription] = useState("");
    const [ingredientsDescription, setIngredientsDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    const [imageArray, setImageArray] = useState();
    const fileInputRef = useRef();

    let navigate = useNavigate();
    var user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            }
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }
    }, [image]);


    function loadPhoto(f) {
        const reader = new FileReader();
        const fileByteArray = [];

        reader.readAsArrayBuffer(f);
        reader.onloadend = (evt) => {
            if (evt.target.readyState === FileReader.DONE) {
                const arrayBuffer = evt.target.result,
                    array = new Uint8Array(arrayBuffer);
                for (const a of array) {
                    fileByteArray.push(a);
                }
                setImageArray(fileByteArray)
            }
        }
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

    function recipeNameHandler(e) {
        setRecipeName(e.target.value);
    }

    function categoryHandler(e) {
        setCategory(e.target.value);
    }

    function caloriesHandler(e) {
        setCalories(e.target.value);
    }

    function difficultyHandler(e) {
        setDifficulty(e.target.value);
    }

    function ingredientsHandler(data) {
        setIngredients(data);
    }

    function descriptionHandler(e) {
        setDescription(e.target.value);
    }

    function ingredientsDescriptionHandler(e) {
        setIngredientsDescription(e.target.value);
    }

    function shareRecipeManager(e) {
        e.preventDefault();
        setLoading(true);
        restCalls.shareRecipe(recipeName, description, ingredients, difficulty, category, calories, imageArray, ingredientsDescription)
            .then(() => {
                restCalls.allRecipes(); setLoading(false); setOpen(true);
            })
            .catch(() => { setLoading(false); setOpen2(true) })
    }
    
    function logout() {
        navigate("/")
        localStorage.removeItem('ingredientList')
        localStorage.removeItem('pantry')
        localStorage.removeItem('recipes')
        localStorage.removeItem('topRatedRecipes')
        localStorage.removeItem('user')
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen2(false);
    };

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <Grid item xs={12} container className="container2">
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
            <Grid item xs={4}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }} >

                    <Typography sx={{ fontFamily: 'Verdana', fontWeight: 'bolder', fontSize: 18, mt: "8%" }}> User: {user.username} </Typography>
                    <TextField
                        margin="normal"
                        required
                        label="Name"
                        color="grey"
                        InputLabelProps={{
                            style: { fontFamily: 'Verdana', fontSize: 18 },
                        }}
                        sx={{ width: "70%" }}
                        onChange={recipeNameHandler}
                    />
                    <FormControl required margin="normal" sx={{ width: "70%" }}>
                        <InputLabel id="demo-simple-select-label" color="grey" sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Category</InputLabel>
                        <SelectMUI
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            color="grey"
                            onChange={categoryHandler}
                        >
                            <MenuItem value="complete meal" > <Typography sx={{ fontFamily: 'Verdana', fontSize: 17 }}>
                                Complete Meal
                            </Typography></MenuItem>
                            <MenuItem value="light meal"><Typography sx={{ fontFamily: 'Verdana', fontSize: 17 }}>
                                Light Meal
                            </Typography></MenuItem>
                        </SelectMUI>
                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        label="Calories"
                        color="grey"
                        InputLabelProps={{
                            style: { fontFamily: 'Verdana', fontSize: 18 },
                        }}
                        sx={{ width: "70%" }}
                        onChange={caloriesHandler}
                    />
                    <FormControl required margin="normal" sx={{ width: "70%" }}>
                        <InputLabel id="demo-simple-select-label" color="grey" sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Execution Difficulty (0-5)</InputLabel>
                        <SelectMUI
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={difficulty}
                            color="grey"
                            onChange={difficultyHandler}
                        >
                            <MenuItem value="1" >1</MenuItem>
                            <MenuItem value="2" >2</MenuItem>
                            <MenuItem value="3" >3</MenuItem>
                            <MenuItem value="4" >4</MenuItem>
                            <MenuItem value="5" >5</MenuItem>
                        </SelectMUI>
                    </FormControl>
                    <Box sx={{ width: "70%", height: "25%", mt: "2.5%", }}>
                        <Select
                            options={ingredientsList}
                            placeholder="Select ingredients"
                            value={ingredients}
                            onChange={ingredientsHandler}
                            isSearchable={true}
                            isMulti
                        />
                    </Box>

                    <TextField
                        margin="normal"
                        required
                        label="Ingredients and quantities"
                        color="grey"
                        InputLabelProps={{
                            style: { fontFamily: 'Verdana', fontSize: 18 },
                        }}
                        sx={{ width: "70%", mt: "5%" }}
                        multiline
                        rows={12}
                        onChange={ingredientsDescriptionHandler} />
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }} >
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 17, color: "black", pt: "5%", mb: "10%" }}>
                        Share your recipe by filling in the boxes with the respective information!
                    </Typography>

                    <div>
                        <form>
                            {preview ? (
                                <img
                                    src={preview}
                                    style={{ objectFit: "cover", width: "375px", height: "250px", cursor: "pointer" }}
                                    onClick={() => {
                                        setImage(null);
                                    }}
                                />
                            ) : (
                                <button
                                    style={{ width: "375px", height: "250px", cursor: "pointer" }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        fileInputRef.current.click();
                                    }}
                                >
                                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 17, color: "black", pt: "5%", mb: "3.5%" }}>
                                        Add Recipe Image
                                    </Typography>
                                </button>
                            )}
                            <input
                                type="file"
                                style={{ display: "none" }}
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file && file.type.substring(0, 5) === "image") {
                                        setImage(file);
                                        loadPhoto(file);
                                    } else {
                                        setImage(null);
                                    }
                                }}
                            />

                        </form>
                    </div>

                    <Button
                        type="submit"
                        variant="outlined"
                        color='inherit'
                        sx={{ mt: "8%", width: "30%" }}
                        onClick={(e) => { shareRecipeManager(e) }}
                    >
                        <Typography sx={{ fontFamily: 'Verdana', fontSize: 17, color: "black" }}> Share Recipe! </Typography>
                    </Button>
                    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                        <Alert severity="success" onClose={handleClose} sx={{ width: '100%' }}>
                            <Typography sx={{ fontFamily: 'Verdana', fontSize: 14 }}>Recipe shared successfully!</Typography>
                        </Alert>
                    </Snackbar>

                    <Snackbar open={open2} autoHideDuration={4000} onClose={handleClose2}>
                        <Alert severity="error" sx={{ width: '100%' }}>
                            <Typography sx={{ fontFamily: 'Verdana', fontSize: 14 }}>Recipe was not shared. Please verify the filled in information.</Typography>
                        </Alert>
                    </Snackbar>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }} >
                    <TextField
                        margin="normal"
                        required
                        label="Preparation (Process Description)"
                        color="grey"
                        InputLabelProps={{
                            style: { fontFamily: 'Verdana', fontSize: 18 },
                        }}
                        sx={{ width: "70%", mt: "14%" }}
                        multiline
                        rows={12}
                        onChange={descriptionHandler} />
                </Box>
            </Grid>
        </Grid>
    )
}