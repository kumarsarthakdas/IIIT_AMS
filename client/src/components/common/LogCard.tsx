import { Box, Stack, Typography } from '@pankod/refine-mui'
import { LogCardProps } from 'interfaces/log'

const LogCard = ({ id, assetName, assetStatus, assetId, creatorName }: LogCardProps) => {
    return (
        <Box
            width="100%"
            sx={{
                display: 'flex',
                flexDirection: { xs: "column", sm: "row" },
                gap: '20px',
                padding: '20px',
                '&:hover': {
                    boxShadow: '0 22px 45px 2px rgba(176,176,176,0.1)'
                }
            }}
        >
            <Stack direction="column" justifyContent="space-between" flex={1} gap={{ xs: 4, sm: 2 }}>
                <Stack gap={2} direction="row" flexWrap="wrap" alignItems="center">
                    <Typography fontSize={22} fontWeight={600} color="#11142d">Log ID:{id}</Typography>
                    <Typography fontSize={14} color="#6d8278">{creatorName} has {assetStatus} {assetName} with ID {assetId}</Typography>
                </Stack>
            </Stack>
        </Box>
    )
}

export default LogCard