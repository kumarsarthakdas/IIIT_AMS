/* eslint-disable no-restricted-globals */
import { Typography, Box, Stack } from '@pankod/refine-mui';
import { useDelete, useGetIdentity, useShow } from '@pankod/refine-core';
import { useParams, useNavigate } from '@pankod/refine-react-router-v6';
import { Delete, Edit, CurrencyRupeeOutlined, VillaOutlined, AddCommentOutlined } from '@mui/icons-material';

import { CustomButton } from 'components';
import axios from 'axios';

function checkImage(url: any) {
  let img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const AssetDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { queryResult } = useShow({ resource: "assets" });
  const { mutate } = useDelete();
  const { id } = useParams();

  const { data, isLoading, isError } = queryResult;

  const AssetDetails = data?.data ?? {};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const isCurrentUser = user.email === AssetDetails.creator.email;

  const handleDeleteAsset = () => {
    const response = confirm('Are you sure you want to delete this asset? Please contact the designated agency/vendor to dispose the asset physically.');
    if (response) {
      mutate({
        resource: 'assets',
        id: id as string,
      }, {
        onSuccess: () => {
          navigate('/assets');
        },
      });
    }
  };

  const handleEmail = async () => {
    const response = confirm('Confirm request email for asset "' + AssetDetails.title + '" from the department "' + AssetDetails.creator.name + '"');
    if (response) {
      const emailData = {
        sent_from: user.email,
        sent_to: AssetDetails.creator.email,
        subject: "Request for borrowing asset: " + AssetDetails.title,
        message: "The department of " + user.name + " with email <" + user.email + "> has a request to borrow the asset " + AssetDetails.title + ". The quantity and time period of borrowing the items shall be discussed further.",
      };
      const res = await axios.post("https://iiit-ams.onrender.com/api/v1/sendemail", emailData);
      console.log("Email sent to " + AssetDetails.creator.name + " <" + AssetDetails.creator.email + "> from " + user.name + " <" + user.email + ">.");
      console.log(res.data);
    }
  };

  return (
    <Box
      borderRadius="15px"
      padding="20px"
      bgcolor="#fcfcfc"
      height="100%"
    // width="fit-content"
    >
      <Typography fontSize={25} fontWeight={700} color="#11142D">Details</Typography>

      <Box mt="20px" display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={4}>

        <Box flex={1} maxWidth={{ xs: 764, md: 1100 }}>
          <Box mb="15px" px="5px">
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" flexWrap="wrap" alignItems="flex-start">
              <Stack direction="row" justifyContent="flex-start" alignItems="baseline" textAlign="center">
                <Typography fontSize={18} fontWeight={500} color="#11142D" textTransform="capitalize">Asset Title:&nbsp;</Typography>
                <Typography fontSize={16} fontWeight={400} color="#11142D">{AssetDetails.title}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="flex-start" alignItems="baseline" textAlign="center">
                <Typography fontSize={18} fontWeight={500} color="#11142D" textTransform="capitalize">Asset ID:&nbsp;</Typography>
                <Typography fontSize={16} fontWeight={400} color="#11142D">{AssetDetails._id}</Typography>
              </Stack>
            </Stack>
          </Box>

          <img
            src={AssetDetails.photo}
            alt="asset_details-img"
            width="50%"
            style={{ objectFit: 'cover', borderRadius: '10px' }}
            className="asset_details-img"
          />
        </Box>

        <Box>
          <Box width="100%" flex={1} display="flex" flexDirection="column" gap="20px">
            <Stack direction="column" flexWrap="wrap" justifyContent="space-between" alignItems="flex-start" gap={2}>
              <Box>
                <Typography fontSize={18} fontWeight={600} color="#11142D">Asset Type</Typography>
                <Typography fontSize={16} fontWeight={600} color="#6d8278" mb={0.5} textTransform="uppercase">{AssetDetails.assetType}</Typography>
              </Box>
              <Box>
                <Typography fontSize={18} fontWeight={600} color="#11142D">Purchase Date</Typography>
                <Typography fontSize={16} fontWeight={600} color="#6d8278" mb={0.5}>{AssetDetails.date}</Typography>
              </Box>

              <Box>
                <Typography fontSize={18} fontWeight={600} color="#11142D">Asset Price (per unit)</Typography>
                <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                  <CurrencyRupeeOutlined sx={{ color: '#6d8278' }} />
                  <Typography fontSize={16} color="#6d8278">{AssetDetails.price}</Typography>
                </Stack>
              </Box>

              <Box>
                <Typography fontSize={18} fontWeight={600} color="#11142D">Total Quantity</Typography>
                <Stack direction="row" alignItems="flex-end" gap={1}>
                  <Typography fontSize={22} fontWeight={700} color="#17804c">{AssetDetails.quantity}</Typography>
                  <Typography fontSize={16} color="#6d8278" mb={0.5}>units</Typography>
                </Stack>
              </Box>

              <Box>
                <Typography fontSize={18} fontWeight={600} color="#11142D">Functional Quantity</Typography>
                <Stack direction="row" alignItems="flex-end" gap={1}>
                  <Typography fontSize={22} fontWeight={700} color="#17804c">{AssetDetails.functional}</Typography>
                  <Typography fontSize={16} color="#6d8278" mb={0.5}>units</Typography>
                </Stack>
              </Box>
            </Stack>

            <Stack direction="column" gap="10px">
              <Typography fontSize={18} color="#11142D">Description</Typography>
              <Typography fontSize={14} color="#6d8278" p={2} border="1px solid #E4E4E4" borderRadius="10px">
                {AssetDetails.description}
              </Typography>
            </Stack>
          </Box>

          <Box mt="15px" width="100%" flex={1} maxWidth={320} display="flex" flexDirection="column" gap="20px">
            <Stack
              width="100%"
              p={2}
              direction="column"
              justifyContent="center"
              alignItems="center"
              border="1px solid #E4E4E4"
              borderRadius={2}
            >

              <Stack mt={2} justifyContent="center" alignItems="center" textAlign="center">
                <img
                  src={checkImage(AssetDetails.creator.avatar) ? AssetDetails.creator.avatar : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"}
                  alt="avatar"
                  width={75}
                  height={75}
                  style={{ borderRadius: '100%', objectFit: 'cover' }}
                />

                <Box mt="15px">
                  <Typography fontSize={18} fontWeight={600} color="#11142D">{AssetDetails.creator.name}</Typography>
                </Box>

                <Typography mt={1} fontSize={16} fontWeight={600} color="#11142D">{AssetDetails.creator.allAssets.length} Assets</Typography>
              </Stack>

              <Stack width="100%" mt="25px" direction="row" flexWrap="wrap" gap={2}>
                <CustomButton
                  title={!isCurrentUser ? 'Request' : 'Edit'}
                  type={!isCurrentUser ? 'submit' : 'button'}
                  backgroundColor="#17804c"
                  color="#FCFCFC"
                  fullWidth
                  icon={!isCurrentUser ? <AddCommentOutlined /> : <Edit />}
                  handleClick={() => {
                    if (isCurrentUser) {
                      navigate(`/assets/edit/${AssetDetails._id}`);
                    }
                    else handleEmail();
                  }}
                />
                <CustomButton
                  title={!isCurrentUser ? 'View' : 'Delete'}
                  backgroundColor={!isCurrentUser ? '#475be8' : '#d42e2e'}
                  color="#FCFCFC"
                  fullWidth
                  icon={!isCurrentUser ? <VillaOutlined /> : <Delete />}
                  handleClick={() => {
                    if (isCurrentUser) handleDeleteAsset();
                    else {
                      navigate(`/departments/show/${AssetDetails.creator._id}`);
                    }
                  }}
                />
              </Stack>
            </Stack>
          </Box>

        </Box>
      </Box>
    </Box >
  );
};

export default AssetDetails;
