import React, { useState } from "react";
import { ExplorePageContainer } from './styles/explore_page.styles';
import { Search } from "@mui/icons-material";
import { Input, Typography, Hidden, Fade } from "@mui/material";
import { Box } from "@mui/system";
import WhoToFollowSmall from "../components/WhoToFollow/who_to_follow_small.component";
import { QUERY_USERS_LIST, QUERY_WHO_TO_FOLLOW_USERS } from "../utils/queries";
import { useQuery } from '@apollo/client';
import { useAppSelector } from "../app/hooks";
import { userProps } from '../index.types';
import WhoToFollowLoading from '../components/WhoToFollow/who_to_follow_loading.component';

const ExplorePage = () => {
  const currentUser = useAppSelector(state => state.currentUser)
  const { error: currentUserError, loading: currentUserLoading, user } = currentUser
  const userInfo: userProps = user
  const { error: whoToFollowError, loading: whoToFollowLoading, data: whoToFollowData, refetch: whoToRefetch } = useQuery(QUERY_WHO_TO_FOLLOW_USERS, {
    variables: { id: userInfo.id }
  })
  const [searchText, setSearchText] = useState<string>("")
  const { loading: userListLoading, error: userLostError, data, refetch } = useQuery(QUERY_USERS_LIST, {
    variables: { handle: searchText },
  });
  if (data) {
    var { usersList } = data;
    var usersArray: Array<{
      id: string,
      handle: string,
      avatar: string,
      isActive: string
    }> | undefined = usersList
  }
  let pending = userListLoading || userLostError || whoToFollowError || whoToFollowLoading || currentUserError || currentUserLoading;

  return (
    <ExplorePageContainer>
      <Fade in={true} timeout={1000}>
      <Box paddingTop="10px">
          <Box
            width="100%"
            borderRadius="28px"
            border="1px solid #eee"
            sx={{
              background: "#eee",
              "&:hover": {
                background: "white",
              },
            }}
          >
            <Input
              type="text"
              inputProps={{
                style: { padding: "10px" },
              }}
              disableUnderline
              fullWidth
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search User"
              startAdornment={
                <Search
                  sx={{
                    paddingLeft: "30px",
                    color: "#777",
                  }}
                />
              }
            />
          </Box>
          <Box
            sx={{
              background: "#eee",
              borderRadius: "28px",
              padding: "10px 20px",
              margin: "1rem 0",
              minHeight: '600px',
              display: "flex",
              // alignItems: "center",
              flexDirection: "column"
            }}
          >
            <Typography fontFamily='inherit' variant="h6" textAlign='center' sx={{ fontWeight: "bold" }}>
              Who to follow
            </Typography>
            {pending && (
              <>
                <WhoToFollowLoading />
                <WhoToFollowLoading />
                <WhoToFollowLoading />
                <WhoToFollowLoading />
              </>
            )}
            <div style={{ overflowY: "scroll" }}>
            {(searchText && usersArray) && (
              usersArray.map((user) => <WhoToFollowSmall key={user.id} id={user.id} handle={user.handle} avatar={user.avatar} isActive={user.isActive} userRefetch={refetch} whoToRefetch={whoToRefetch} />)
            )}
            {(!searchText && whoToFollowData) && (
              whoToFollowData?.whoToFollowUsers.map((user: any) => {
                return <WhoToFollowSmall key={user.id} id={user.id} handle={user.handle} avatar={user.avatar} isActive={user.isActive} userRefetch={refetch} whoToRefetch={whoToRefetch} />
              })
            )}
            </div>
          </Box>
        </Box>
      </Fade>
    </ExplorePageContainer>
  )
}

export default ExplorePage;