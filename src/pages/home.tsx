
import { Box, Divider, Typography } from "@mui/material"
import FeaturedCategories from "../components/products/FeaturedCategories"

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

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
                {/* <FeaturedProducts /> */}
            </Box>
        </Box>
    )
}

export default Home