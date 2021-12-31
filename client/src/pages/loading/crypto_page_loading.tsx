import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { CryptoDataContainer, CryptoDoughnutContainer, CryptoCarouselContainer } from "../styles/crypto_page.styles";
import TwitterPostLoading from "../../components/TwitterPost/twitter_post_loading.component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { RectShape } from "react-placeholder/lib/placeholders";


const CryptoPageLoading = () => {
    return (
        <>
            <CryptoDataContainer>
                <CryptoCarouselContainer>
                    <Grid item padding="1rem 1rem 1rem 1rem" width='350px' height='450px' border="5px solid #ccc">
                        <RectShape color='#cccccc' style={{ width: "300px", height: "400px" }} />
                    </Grid>
                </CryptoCarouselContainer>
                <CryptoDoughnutContainer>
                    <RectShape color='#cccccc' style={{ width: "400px", height: "400px" }} />
                </CryptoDoughnutContainer>
            </CryptoDataContainer>
            <Box textAlign="right" padding="10px 20px">
                <Skeleton
                    width={75}
                />
            </Box>
            <Box borderBottom="1px solid #ccc">
                <Skeleton
                    width={75}
                />
            </Box>
            <Box height="90vh" sx={{ overflowY: "scroll" }}>
                <TwitterPostLoading />
                <TwitterPostLoading />
                <TwitterPostLoading />
                <TwitterPostLoading />
            </Box>
        </>
    )
}

export default CryptoPageLoading;
