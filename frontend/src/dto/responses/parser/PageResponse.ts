export interface PageResponse{
    pages: PageInfo[]
}

export interface PageInfo {
    name: string,
    price: string,
    specifications: string,
    description: string,
    image: string,
    url: string

}