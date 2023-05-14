import { useTable } from '@pankod/refine-core';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Select, MenuItem } from '@pankod/refine-mui';
import { CustomButton } from 'components';

const Logs = () => {
    const {
        tableQueryResult: { data, isLoading, isError },
        current,
        setCurrent,
        setPageSize,
        pageCount,
    } = useTable();

    const logs = data?.data ?? [];
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                {!logs.length ? 'There are no logs' : 'Logs'}
            </Typography>
            <Box
                mt="20px"
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    backgroundColor: '#fcfcfc'
                }}
            >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="Log Table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: '700' }}>Log ID</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="left">Asset&nbsp;Name</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="left">Asset&nbsp;ID</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="left">Department&nbsp;Name</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="left">Log&nbsp;Date</TableCell>
                                <TableCell sx={{ fontWeight: '700' }} align="left">Asset&nbsp;Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {logs.map((log) => (
                                <TableRow
                                    key={log._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {log._id}
                                    </TableCell>
                                    <TableCell align="left">{log.assetName}</TableCell>
                                    <TableCell align="left">{log.assetId}</TableCell>
                                    <TableCell align="left">{log.creatorName.name}</TableCell>
                                    <TableCell align="left">{log.logDate}</TableCell>
                                    <TableCell align="left">
                                        <Chip label={log.assetStatus} color={log.assetStatus === "Created" ? "info" : (log.assetStatus === "Edited" ? "success" : "error")} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box display="flex" flexWrap="wrap">
                {logs.length > 0 && (
                    <Box display="flex" gap={2} mt={3} flexWrap="wrap">
                        <CustomButton
                            title="Previous"
                            handleClick={() => setCurrent((prev) => prev - 1)}
                            backgroundColor="#17804c"
                            color="#fcfcfc"
                            disabled={!(current > 1)}
                        />
                        <Box display={{ xs: 'hidden', sm: 'flex' }} alignItems="center" gap="5px">
                            Page{' '}<strong>{current} of {pageCount}</strong>
                        </Box>
                        <CustomButton
                            title="Next"
                            handleClick={() => setCurrent((prev) => prev + 1)}
                            backgroundColor="#17804c"
                            color="#fcfcfc"
                            disabled={current === pageCount}
                        />
                        <Select
                            variant="outlined"
                            color="info"
                            displayEmpty
                            required
                            inputProps={{ 'aria-label': 'Without label' }}
                            defaultValue={10}
                            onChange={(e) => setPageSize(e.target.value ? Number(e.target.value) : 10)}
                        >
                            {[10, 20, 30, 40, 50].map((size) => (
                                <MenuItem key={size} value={size}>Show {size}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default Logs