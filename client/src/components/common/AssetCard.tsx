import { CurrencyRupeeOutlined } from '@mui/icons-material';
import { Link } from '@pankod/refine-react-router-v6';
import { Typography, Box, Card, CardMedia, CardContent, Stack } from '@pankod/refine-mui';

import { AssetCardProps } from 'interfaces/asset';

const AssetCard = ({ id, title, quantity, functional, price, photo }: AssetCardProps) => {
  return (
    <Card
      component={Link}
      to={`/assets/show/${id}`}
      sx={{
        maxWidth: '340px',
        padding: '10px',
        '&:hover': {
          boxShadow: '0 22px 45px 2px rgba(176, 176, 176, 0.1)'
        },
        cursor: 'pointer'
      }}
      elevation={0}
    >
      <CardMedia
        component="img"
        width="100%"
        height={230}
        image={photo}
        alt="card image"
        sx={{ borderRadius: '10px' }}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '10px', paddingX: '5px' }}>
        <Stack direction="column" gap={1}>
          <Typography fontSize={16} fontWeight={500} color="#11142d">{title}</Typography>
          <Stack direction="row" gap={0.5} alignItems="center">
            <CurrencyRupeeOutlined
              sx={{ fontSize: 18, color: '#11142d' }}
            />
            <Typography fontSize={16} color="#17804c">{price}</Typography>
          </Stack>
        </Stack>
        <Stack direction="column" gap={1}>
          <Box px={1.5} py={0.3} borderRadius={1} bgcolor="#17804c" height="fit-content">
            <Typography fontSize={14} fontWeight={600} color="#fcfcfc">Total units: {quantity}</Typography>
          </Box>
          <Box px={1.5} py={0.3} borderRadius={1} bgcolor="#ececec" height="fit-content">
            <Typography fontSize={14} fontWeight={600} color="#17804c">Functional: {functional}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default AssetCard
