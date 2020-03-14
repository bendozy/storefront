const allProductsQuery = `
query products {
  products(search: "", pageSize: 10){
    aggregations {
      attribute_code
      count
      label
      options {
        count
        label
        value
      }
    }
    items {
      activity
      attribute_set_id
      canonical_url
      categories {
        id
        name
      }
      description {
        html
      }
      gender
      gift_message_available
      id
      image {
        label
        url
      }
      media_gallery {
        label
        url
      }
      meta_description
      meta_keyword
      meta_title
      name
      new
      new_from_date
      new_to_date
      options_container
      pattern
      performance_fabric
      price_tiers {
        quantity
      }
      related_products {
        id
      }
      sale
      short_description {
        html
      }
      size
      sku
      small_image {
        label
        url
      }
      thumbnail {
        label
        url
      }
      updated_at
      url_key
      url_rewrites {
        url
      }
    }
    total_count
  }
}
`
module.exports = allProductsQuery
