import { Box, Typography, FormControl, FormHelperText, TextField, TextareaAutosize, Stack, Select, MenuItem, Button } from '@pankod/refine-mui';

import { FormProps } from 'interfaces/common';
import CustomButton from './CustomButton';

const Form = ({ type, register, handleSubmit, handleImageChange, formLoading, onFinishHandler, assetImage }: FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} an Asset
      </Typography>

      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
        <form style={{ marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 0.8 }}>
              <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d' }}>Enter Asset Name</FormHelperText>
              <TextField
                fullWidth
                required
                id="outlined-basic"
                color="info"
                variant="outlined"
                {...register('title', { required: true })}
              />
            </FormControl>
            <FormControl sx={{ flex: 0.2 }}>
              <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d' }}>Date of Purchase</FormHelperText>
              <TextField
                fullWidth
                required
                id="outlined-basic"
                color="info"
                type="date"
                variant="outlined"
                {...register('date', { required: true })}
              />
            </FormControl>
          </Stack>

          <FormControl>
            <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d' }}>Enter Description</FormHelperText>
            <TextareaAutosize
              minRows={5}
              required
              placeholder="Write description"
              color="info"
              style={{ width: '100%', background: 'transparent', fontSize: '16px', borderColor: 'rgba(0,0,0,0.23)', borderRadius: 6, padding: 10, color: '#919191' }}
              {...register('description', { required: true })}
            />
          </FormControl>

          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: '#11142d'
              }}>
                Select Asset Type
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ 'aria-label': 'Without label' }}
                // defaultValue="ledlight"
                {...register('assetType', { required: true })}
              >
                <MenuItem value="ledlight">LED Light</MenuItem>
                <MenuItem value="ceilingfan">Ceiling Fan</MenuItem>
                <MenuItem value="airconditioner">Air Contitioner</MenuItem>
                <MenuItem value="officetable">Office Table</MenuItem>
                <MenuItem value="officechair">Office Chair</MenuItem>
                <MenuItem value="studentdesk">Student Desk</MenuItem>
                <MenuItem value="laptop">Laptop</MenuItem>
                <MenuItem value="printer">Printer</MenuItem>
                <MenuItem value="cctvcamera">CCTV Camera</MenuItem>
                <MenuItem value="tabletennis">Table Tennis</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d' }}>Enter Quantity of Assets</FormHelperText>
              <TextField
                fullWidth
                required
                id="outlined-basic"
                color="info"
                type="number"
                variant="outlined"
                {...register('quantity', { required: true })}
              />
            </FormControl>

            <FormControl>
              <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d' }}>Quantity of Functional Assets</FormHelperText>
              <TextField
                fullWidth
                required
                id="outlined-basic"
                color="info"
                type="number"
                variant="outlined"
                {...register('functional', { required: true })}
              />
            </FormControl>

            <FormControl>
              <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d' }}>Enter Asset Price (per unit)</FormHelperText>
              <TextField
                fullWidth
                required
                id="outlined-basic"
                color="info"
                type="number"
                variant="outlined"
                {...register('price', { required: true })}
              />
            </FormControl>
          </Stack>

          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2}>
              <Typography color="#11142d" fontSize={16} fontWeight={500} my="10px">Asset Photo</Typography>

              <Button component="label" sx={{ width: 'fit-content', color: "#2ed480", textTransform: 'capitalize', fontSize: 16 }}>
                Upload *
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    // @ts-ignore
                    handleImageChange(e.target.files[0])
                  }}
                />
              </Button>
            </Stack>
            <Typography fontSize={14} color="#6d8278" sx={{ wordBreak: 'break-all' }}>{assetImage?.name}</Typography>
          </Stack>

          <CustomButton
            type="submit"
            title={formLoading ? 'Submitting...' : 'Submit'}
            backgroundColor="#17804c"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>
  )
}

export default Form;
