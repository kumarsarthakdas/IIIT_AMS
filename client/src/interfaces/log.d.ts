import { BaseKey } from '@pankod/refine-core';

export interface LogCardProps {
    id?: BaseKey | undefined,
    assetName: string,
    assetStatus: string,
    assetId: string,
    creatorName: string
}
