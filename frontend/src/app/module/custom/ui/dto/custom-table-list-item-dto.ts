import { DateTime } from 'luxon';

export default class CustomTableListItemDto {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly createdAt: DateTime | null,
        public readonly updatedAt: DateTime | null,
    ) {
    }

    public static createFromObject(data: any): CustomTableListItemDto {
        return new CustomTableListItemDto(
            data.id ?? '',
            data.name ?? '',
            data.createdAt ? DateTime.fromISO(data.createdAt) : null,
            data.updatedAt ? DateTime.fromISO(data.updatedAt) : null,
        );
    }
}
