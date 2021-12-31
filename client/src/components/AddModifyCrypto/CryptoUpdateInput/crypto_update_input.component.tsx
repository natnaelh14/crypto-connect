import React, { useState } from "react";
import { FormControl, OutlinedInput, InputAdornment, Typography, IconButton } from "@mui/material";
const CoinImage = require("./coin.png")
import { Box } from "@mui/system";
import { QUERY_SEARCH_API } from "../../../utils/queries";
import { UPDATE_CRYPTO, DELETE_CRYPTO } from "../../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

type cryptoProps = {
    name: string,
    holding: number,
    cryptoId: number,
    refreshCrypto: () => void
}

const CryptoUpdateInput = ({ name, holding, cryptoId, refreshCrypto }: cryptoProps) => {

    const [updateCrypto, { }] = useMutation(UPDATE_CRYPTO);
    const [holdingValue, setHoldingValue] = useState<number>(holding)

    const { loading: loadingAPI, error: errorAPI, data: dataAPI } = useQuery(QUERY_SEARCH_API, {
        variables: {
            name: name.toLowerCase(),
        },
    })
    if (dataAPI) {
        var { cryptoSearchAPI } = dataAPI;
    }
    if (cryptoSearchAPI) {
        var currentPrice = cryptoSearchAPI.current_price;
        var image = cryptoSearchAPI.image;
    }

    const handleCryptoUpdate = async () => {
        if (holdingValue !== holding || holdingValue > 0) {
            try {
                await updateCrypto({
                    variables: {
                        id: cryptoId,
                        holding_amount: holdingValue
                    }
                }).then(() => {
                    refreshCrypto()
                })
            } catch (e) {
                throw new Error("Unable to update CryptoCurrency")
            }
        } else {
            return;
        }
    }
    const [deleteCrypto, { }] = useMutation(DELETE_CRYPTO)
    const handleCryptoDelete = async() => {
        try {
            deleteCrypto({
                variables: {
                    id: cryptoId
                },
            }).then(() => {
                refreshCrypto();
            })
        } catch (e) {
            throw new Error("Unable to delete CryptoCurrency")
        }
    }

    return (
        <>
            <Box sx={{ marginBottom: "30px" }}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    // '& > :not(style)': { m: 1 },
                }}>
                    <img src={image ? image : CoinImage} height='25' width='25' alt='crypto-image' />
                    <Typography fontFamily='inherit' ml='0.5rem'>{name.toUpperCase()}</Typography>
                    <Box sx={{ position: "absolute", left: "50%", display: "flex", flexDirection: "row" }}>
                        <FormControl sx={{ m: 0.25, maxWidth: 150 }}>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                value={holdingValue}
                                onChange={(e) => setHoldingValue(Number(e.target.value))}
                                startAdornment={<InputAdornment position="start">#</InputAdornment>}
                                label="Amount"
                                type="number"
                            />
                        </FormControl>
                        <Typography fontFamily='inherit' ml='0.5rem' display='flex' alignItems='center' > = ${(holding * currentPrice).toLocaleString()}</Typography>
                    </Box>
                    <Box display='flex' sx={{ flexDirection: "row", marginLeft: "auto" }} >
                        <IconButton onClick={handleCryptoUpdate}>
                            <SaveIcon />
                        </IconButton>
                        <IconButton onClick={handleCryptoDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default CryptoUpdateInput
