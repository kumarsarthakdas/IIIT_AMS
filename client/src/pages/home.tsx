import { useList } from '@pankod/refine-core';
import { Typography, Box } from '@pankod/refine-mui';

import { AssetCard } from 'components';

const Home = () => {

  const { data, isLoading, isError } = useList({
    resource: 'assets',
    config: {
      pagination: {
        pageSize: 6
      }
    }
  })

  const latestAssets = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>
  if (isError) return <Typography>Something went wrong!</Typography>

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Dashboard
      </Typography>

      <Box
        flex={1}
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
      >
        <Typography fontSize="18px" fontWeight={600} color="#11142d">Latest Assets</Typography>

        <Box mt={2.5} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {latestAssets.map((asset) => (
            <AssetCard
              key={asset._id}
              id={asset._id}
              title={asset.title}
              quantity={asset.quantity}
              functional={asset.functional}
              price={asset.price}
              photo={asset.photo}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default Home
