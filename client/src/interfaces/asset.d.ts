import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    date: Date,
    description: string,
    assetType: string,
    quantity: number,
    functional:number,
    price: number | undefined,
}

export interface AssetCardProps {
  id?: BaseKey | undefined,
  title: string,
  quantity: string,
  functional: string,
  price: string,
  photo: string,
}
