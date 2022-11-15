import { Box, Grid, TextField, Typography, Card, CardMedia, CardContent } from "@mui/material";
import logoIHMcut from "../images/logoIHMcut.png"

export default function SearchRecipesPage() {
    return (
        <Grid container>
            <Grid item xs={3}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }} >
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>Filtros123</Typography>
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