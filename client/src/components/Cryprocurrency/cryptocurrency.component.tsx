import React, { useEffect, useState } from 'react';
import { Grid, Button } from "@mui/material";
import { Box } from "@mui/system";
import CryptoChart from '../CryptoChart/crypto_chart.component';
import CoinGraph from '../CoinGraph/coin_graph.component';
import MoreInfoCryptoModal from '../MoreInfoCryptoModal/more_info_crypto_modal.component';

type nameProps = {
    name: string
}
// @ts-ignore
const CryptoCurrency = ({ name }: nameProps) => {

    const [coinData, setCoinData] = useState<any>();
    const [coinDateData, setCoinDateData] = useState<any>();
    const [coinPriceData, setCoinPriceData] = useState<any>();
    const [openModal, setOpenModal] = useState(false);
    const handleModalClose = () => {
        setOpenModal(false)
    };
    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const [modalData, setModalData] = useState({
        description: '',
        whitepaper: { link: "" },
        org_structure: "",
        proof_type: ""
    });
    const [coinMarketData, setCoinMarketData] = useState([
        {
            image: "",
            market_cap: 0,
            market_cap_rank: 0,
            current_price: 0,
            symbol: "",
            ath: 0,
            circulating_supply: 0
        }
    ]);

    useEffect(() => {
        (async () => {
            await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${name}`)
                .then((response) => {
                    return response.json()
                })
                .then((res: any) => {
                    fetch(`https://api.coinpaprika.com/v1/coins/${res[0].symbol}-${name}`)
                        .then((response) => {
                            return response.json();
                        })
                        .then((response: any) => {
                            setModalData(response)
                        })
                    setCoinMarketData(res)
                })
                .catch((e) => {
                    return
                })
            await fetch(`https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=usd&days=30&interval=daily`)
                .then((response) => {
                    return response.json()
                })
                .then((res) => {
                    let day = []
                    let price = []
                    for (let i = 0; i < res.prices.length; i++) {
                        day.push(res.prices[i][0]);
                        price.push(res.prices[i][1]);
                    };
                    setCoinDateData(day);
                    setCoinPriceData(price);
                })
                .catch((e) => {
                    return
                })
            await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${name}`)
                .then((res: any) => {
                    return res.json()
                })
                .then((res: any) => {
                    setCoinData(res[0])
                })
                .catch((e) => {
                    return
                })
        })()
    }, [name])

    return (
        <>
            {coinData && (
                <Box >
                    <Grid item padding="1rem 1rem 1rem 1rem" border="1px solid #ccc">
                        <CryptoChart coinName={coinData.name} coinImage={coinData.image} coinRank={coinData.market_cap_rank} coinMarketCap={coinData.market_cap} coinCurrentPrice={coinData.current_price} coinATH={coinData.ath} />
                        <CoinGraph coinDates={coinDateData} coinPrices={coinPriceData} />
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                onClick={handleModalOpen}
                                sx={{
                                    backgroundColor: 'black', "&:hover": {
                                        background: "#333",
                                    },
                                }}
                            >More Info</Button>
                        </Box>
                    </Grid>
                </Box>
            )}
            {openModal && (
                <MoreInfoCryptoModal
                    open={openModal}
                    handleClose={handleModalClose}
                    coinName={name}
                    coinDescription={modalData.description}
                    coinWhitePaper={modalData.whitepaper.link}
                    coinStructure={modalData.org_structure}
                    coinProof={modalData.proof_type}
                    coinImage={coinMarketData[0].image}
                    coinMarketCap={coinMarketData[0].market_cap}
                    coinMarketCapRank={coinMarketData[0].market_cap_rank}
                    coinCurrentPrice={coinMarketData[0].current_price}
                    coinRank={coinMarketData[0].market_cap_rank}
                    coinAllTime={coinMarketData[0].ath}
                    coinSupply={coinMarketData[0].circulating_supply}
                    coinSymbol={coinMarketData[0].symbol}
                />
            )}
        </>


    )
}

export default CryptoCurrency
// @ts-ignore
