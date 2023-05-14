import { useState } from 'react';
import { useGetIdentity } from '@pankod/refine-core';
import { FieldValues, useForm } from '@pankod/refine-react-hook-form';
import { CircleSpinnerOverlay } from 'react-spinner-overlay';

import Form from 'components/common/Form';

const CreateAsset = () => {
  const { data: user } = useGetIdentity();
  const [assetImage, setAssetImage] = useState({ name: '', url: '' });
  const { refineCore: { onFinish, formLoading }, register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result: string) => setAssetImage({ name: file?.name, url: result }));
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!assetImage.name) return alert('Please select an image!');
    if (data.quantity < data.functional) return alert('Functional assets should be less than or equal to total quantity');
    setLoading(true);
    await onFinish({ ...data, photo: assetImage.url, email: user.email })
    setLoading(false);
  };

  return (
    <>
      {loading ? <CircleSpinnerOverlay
        loading={loading}
        overlayColor="rgba(0,0,0,0.2)"
      /> : null}
      <Form
        type="Create"
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        onFinishHandler={onFinishHandler}
        assetImage={assetImage}
      />
    </>
  )
}
export default CreateAsset
