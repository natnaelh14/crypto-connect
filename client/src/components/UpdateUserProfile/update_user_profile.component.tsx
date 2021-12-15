import React, { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import axios from 'axios';
import {
  Typography,
  Avatar,
  TextField,
  IconButton,
  FormLabel,
  Button,
  Dialog,
  Container,
  CssBaseline,
  FormControl,
  Select,
  MenuItem
} from "@mui/material";
import { useAppSelector } from '../../app/hooks';
import { userProps } from '../../index.types';
import { UPDATE_USER_PROFILE } from '../../utils/mutations';
import { QUERY_USER } from '../../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import noAvatar from '../../img/no-avatar.png';
import AvatarChoice from '../AvatarChoice/avatar-choice.component';

type ModalProps = {
  open: boolean,
  handleClose: () => void,
  userRefetch: () => void
}

const UpdateUserProfile = ({
  open,
  handleClose,
  userRefetch
}: ModalProps) => {
  const currentUser = useAppSelector((state) => state.currentUser);
  const { user } = currentUser
  const userInfo: userProps = user
  const { error: userError, loading: userLoading, data: userData } = useQuery(QUERY_USER, {
    variables: {
        id: userInfo.id
    }
});
  const [bio, setBio] = useState<string>(userData?.userProfile?.bio)
  const [city, setCity] = useState<string>(userData?.userProfile?.city)
  const [state, setState] = useState<string>(userData?.userProfile?.state)
  const [country, setCountry] = useState<string>(userData?.userProfile?.country)
  const [gender, setGender] = useState<string>(userData?.userProfile?.gender)
  const [avatar, setAvatar] = useState<FileList | any>()
  const [sampleAvatar, setSampleAvatar] = useState<string>("")
  const [birthDate, setBirthDate] = useState<Date | any>(userData?.userProfile?.birth_date)
  const [updateUserProfile, { data, loading, error }] = useMutation(UPDATE_USER_PROFILE)
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleSampleAvatar = (avatar: string) => {
    setSampleAvatar(avatar)
  }
  const handleModalClose = () => {
    setOpenModal(false);
  }
  const handleUpdateProfile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (avatar) {
        var resumeData = new FormData();
        resumeData.append("upload_preset", "resume");
        resumeData.append("file", avatar[0]);
        var resumeRes = await axios.post(
          `https://api.cloudinary.com/v1_1/doalzf6o2/image/upload`,
          resumeData
        );
        var avatarUrl = resumeRes.data.secure_url
      }
      await updateUserProfile({
        variables: {
          id: userInfo.id,
          handle: userInfo.handle,
          email: userInfo.email,
          avatar: avatarUrl ? avatarUrl : sampleAvatar ? sampleAvatar : userInfo.avatar,
          bio,
          city,
          state,
          country,
          gender,
          status: userData?.userProfile?.status,
          birth_date: birthDate,
          isActive: userInfo.isActive
        },
      }).then(() => {
        userRefetch()
      })
      handleClose();
    } catch (e) {
      handleClose();
      return e;
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Typography fontFamily='inherit' textAlign='center' style={{ fontSize: '20px' }}>Update Profile</Typography>
          <Box textAlign="right" borderBottom="1px solid #ccc">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent style={{ height: 'auto' }}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
              <Avatar
                alt="Remy Sharp"
                sx={{ width: "100px", height: "100px", margin: 'auto' }}
                src={userData?.userProfile?.avatar ? userData?.userProfile?.avatar : noAvatar}
              />
              <Typography fontFamily='inherit' textAlign='center' component="h1" variant="h6">
                {userInfo?.handle}
              </Typography>
              <Typography fontFamily='inherit' textAlign='center' component="p" variant="subtitle2">
                {`@${userInfo?.handle.trim().replace(/ /g,'').toLowerCase()}`}
              </Typography>
              <form noValidate>
                <TextField
                  variant="standard"
                  margin="normal"
                  minRows={3}
                  fullWidth
                  id="bio"
                  sx={{ fontFamily: 'inherit' }}
                  label="Bio"
                  name="bio"
                  autoComplete="off"
                  autoFocus
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="off"
                  autoFocus
                  sx={{ fontFamily: 'inherit' }}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  autoComplete="off"
                  autoFocus
                  sx={{ fontFamily: 'inherit' }}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  autoComplete="off"
                  autoFocus
                  sx={{ fontFamily: 'inherit' }}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <FormControl
                  style={{ marginTop: "15px", marginBottom: "15px" }}
                  fullWidth
                >
                  <FormLabel component="legend" sx={{ fontSize: '0.8rem' }} >Gender</FormLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    label="Gender"
                    sx={{ fontFamily: 'inherit' }}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  id="date"
                  variant="standard"
                  label="Birthday"
                  type="date"
                  sx={{ fontFamily: 'inherit' }}
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  style={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <br />
                <br />
                <FormLabel component="legend" sx={{ fontSize: '0.8rem' }} >Avatar</FormLabel>
                <br />
                <Button style={{ fontFamily: 'inherit' }} variant="outlined" component="label">
                  UPLOAD AVATAR
                  <input type="file" hidden onChange={(e) => setAvatar(e.target.files)} />
                </Button>
                <Button
                  style={{ fontFamily: 'inherit', marginLeft: "1rem" }}
                  variant="outlined"
                  component="label"
                  onClick={() => setOpenModal(true)}
                >
                  CHOOSE SAMPLE AVATAR
                </Button>
              </form>
            </div>
          </Container>
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
            onClick={handleUpdateProfile}
          >
            UPDATE PROFILE
          </Button>
        </DialogActions>
        {openModal && (
          <AvatarChoice
            open={openModal}
            handleClose={handleModalClose}
            handleSampleAvatar={handleSampleAvatar}
          />
        )}
      </Dialog>
    </>
  );
}

export default UpdateUserProfile;