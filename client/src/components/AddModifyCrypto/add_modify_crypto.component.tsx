import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, Autocomplete, DialogTitle, IconButton, Typography, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NumberFormat from 'react-number-format';
import { Box } from "@mui/system";
import { coinsList } from './coin';
import { QUERY_CRYPTOS } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_CRYPTO } from '../../utils/mutations';
import CryptoUpdateInput from './CryptoUpdateInput/crypto_update_input.component';

type ModalProps = {
    open: boolean,
    handleClose: () => void,
    userId: string
}

const AddModifyCrypto = ({
    open,
    handleClose,
    userId
}: ModalProps) => {
    const [addCrypto, { }] = useMutation(ADD_CRYPTO);
    const [addHolding, setAddHolding] = useState("");
    const [addCoin, setAddCoin] = useState("")
    const { loading, error, data } = useQuery(QUERY_CRYPTOS, {
        variables: {
            user_id: "chG0WmOFPheLzl528legA3iIpbO2"
        },
    });
    if (data) {
        var { cryptoByUserId } = data;
    }

    const handleCrypto = () => {
    }

    const handleAddCrypto = async () => {
        try {
            const { data } = await addCrypto({
                variables: {
                    cryptoName: addCoin.toLowerCase(),
                    holdingAmount: Number(addHolding),
                    userId: userId
                }
            });
            if (data) {
                setAddHolding("")
                setAddCoin("")
            }
        } catch (e) {
            throw new Error('Unable to Add CryptoCurrency')
        }
    }

    return (
        <>
            {cryptoByUserId && (
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                    <DialogTitle>
                        <Typography fontFamily='inherit' textAlign='center' style={{ fontSize: '20px' }}>ADD/MODIFY CRYPTO</Typography>
                        <Box textAlign="right" borderBottom="1px solid #ccc">
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </DialogTitle>
                    <DialogContent style={{ height: '700px' }}>
                        <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                '& > :not(style)': { m: 1 },
                            }}>
                                <Autocomplete
                                    freeSolo
                                    // id="free-solo-2-demo"
                                    disableClearable
                                    fullWidth
                                    // sx={{ marginBottom: '3rem' }}
                                    options={coinsList.map((option) => option.name)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Search Crypto"
                                            variant='standard'
                                            value={addCoin}
                                            onChange={(e) => setAddCoin(e.target.value)}
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search',
                                            }}
                                        />
                                    )}
                                />
                                <NumberFormat
                                    customInput={TextField}
                                    onValueChange={(values: any) => setAddHolding(values.value)}
                                    value={addHolding}
                                    variant="standard"
                                />
                                <Button onClick={handleAddCrypto} variant="contained">ADD</Button>
                            </Box>
                            <Box borderBottom="1px solid #ccc" mb='2rem'>
                                <Typography
                                    display="inline-block"
                                    variant="caption"
                                    fontSize="16px"
                                    marginX="rem"
                                    padding="6px 0"
                                    fontWeight="500"
                                    fontFamily='inherit'
                                    borderBottom={`4px solid black`}
                                >
                                    HOLDINGS
                                </Typography>
                            </Box>
                            {cryptoByUserId && (
                                cryptoByUserId.map((val: any) => {
                                    return <CryptoUpdateInput name={val.crypto_name} holding={val.holding_amount} cryptoId={val.id} key={val.id} />
                                })
                            )
                            }
                        </Box>
                    </DialogContent>
                    <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="submit"
                            size="small"
                            sx={{
                                textTransform: "capitalize",
                                padding: "6px 20px",
                                marginBottom: '20px',
                                width: "60%",
                                background: "black",
                                fontFamily: 'inherit',
                                "&:hover": {
                                    background: "#333",
                                },
                            }}
                            variant="contained"
                            onClick={handleCrypto}
                        >
                            CLOSE
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>

    )
}

export default AddModifyCrypto;