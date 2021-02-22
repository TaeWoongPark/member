export interface IBoard {
    id?: number | null
    userid?: string    
    title?: string
    content?: string
    createDt?: string
    updateDt?: string
    deleteDt?: string
}

export interface IPage {
    page: number
    count: number
    limit?: number
    offset?: number
}