const categoryQuery = `
  query fetchCategory($id: String!){
    categoryList(filters: {
      ids: {
        eq: $id
      }
    }){
      image
      children {
        id
        image
        name
        description
        level
        canonical_url
        children_count
        created_at
        display_mode
        filter_price_range
        include_in_menu
        is_anchor
        meta_description
        meta_keywords
        meta_title
        path
        path_in_store
        position
        updated_at
        url_key
        url_path
        url_suffix
        products (pageSize: 10000){
          total_count
          page_info {
            current_page
            page_size
            total_pages
          }
          items {
            id
            sku
          }
        }
      }
    }
  }
`

module.exports = categoryQuery
