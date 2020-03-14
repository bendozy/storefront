const categoryQuery = `
    query fetchCategory($id: String!){
        categoryList(filters: {
            ids: {
                eq: $id
            }
        }) {
            children {
                id
                name
        
            }
        }
    }
`

export default categoryQuery
