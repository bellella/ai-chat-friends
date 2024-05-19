export interface NextPageProps<SlugType = string, paramsType> {
	params: { slug: SlugType };
	searchParams?: { [key: string]: paramsType };
}
type DefaultParamsType = string | string[] | undefined;
export type NextPageFC<SlugType = string, paramsType = DefaultParamsType> = React.FC<NextPageProps<SlugType, paramsType>>;

export type Gender = 'F' | 'M' | 'O';