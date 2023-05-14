import { BaseKey } from '@pankod/refine-core';

export interface DepartmentCardProp {
    id?: BaseKey | undefined,
    name: string,
    email: string,
    avatar: string,
    noOfAssets: number
}

export interface InfoBarProps {
    icon: ReactNode,
    name: string
}
