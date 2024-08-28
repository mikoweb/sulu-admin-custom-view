import PaginationConst from '@app/core/domain/pagination/pagination-const';

export default class PaginationRequest {
    constructor(
        public readonly page: number = PaginationConst.defaultPage,
        public readonly limit: number = PaginationConst.defaultLimit,
    ) {
    }
}
