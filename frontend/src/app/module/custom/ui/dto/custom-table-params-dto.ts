export default class CustomTableParamsDto {
  constructor(
    public readonly sort: string | null = null,
    public readonly sortBy: string | null = null,
  ) {
  }
}
