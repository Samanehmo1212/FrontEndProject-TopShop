import { Box, Divider, Typography } from "@mui/material"
import FeaturedCategories from "../components/products/FeaturedCategories"

const Home = () => {
    return (
        <Box style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "15px",
            width: "100%"
        }}>
            <Typography variant="h2">Welcome to TopShop</Typography>

            <Box mt={5}>
                <FeaturedCategories />
            </Box>
            <Typography variant="h6"></Typography>
            <Box mt={5}>
            <Divider variant="middle" />
            </Box>
        </Box>
    )
}

export default Home