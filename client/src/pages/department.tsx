import { useList } from '@pankod/refine-core';
import { Box, Typography } from '@pankod/refine-mui';

import { DepartmentCard } from 'components';

const Departments = () => {
  const { data, isLoading, isError } = useList({ resource: 'users' });

  const allDepartments = data?.data ?? [];

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">Departments List</Typography>

      <Box
        mt="20px"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          backgroundColor: '#fcfcfc'
        }}
      >
        {allDepartments.map((department) => (
          <DepartmentCard
            key={department._id}
            id={department._id}
            name={department.name}
            email={department.email}
            avatar={department.avatar}
            noOfAssets={department.allAssets.length}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Departments