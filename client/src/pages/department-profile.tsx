import { useOne } from "@pankod/refine-core"
import { useParams } from '@pankod/refine-react-router-v6';

import { Profile } from 'components';

const DepartmentProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: id as string
  })

  console.log(data);

  const myProfile = data?.data ?? [];

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <Profile
      type="Department"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      assets={myProfile.allAssets}
    />
  )
}

export default DepartmentProfile
