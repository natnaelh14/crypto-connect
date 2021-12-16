import React from 'react';
import TwitterPost from '../TwitterPost/twitter_post.component';
import { QUERY_TWEETS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { Box } from "@mui/system";

const TwitterPostList: React.FC<{ cryptoName: string }> = ({ cryptoName }) => {
    var cryptoData: Array<string> = []
    const { loading, error, data } = useQuery(QUERY_TWEETS, {
        variables: {
            keyword: cryptoName
        }
    })
    if (data) {
        var { twitterSearch } = data
        var cryptoData: Array<string> = twitterSearch
    }

    return (
        <>
            {cryptoData && (
                cryptoData.map((text: any, index: any) => {
                    return <TwitterPost key= {index} text={text} />
                })
            )}
        </>
    )
}

export default TwitterPostList;
