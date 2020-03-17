const allProductsQuery = `
  query products {
    products(search: "", pageSize: 1000){
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
        new_from_date
        new_to_date
        options_container
        pattern
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

        performance_fabric
        eco_collection
        new
        
        ... on ConfigurableProduct {
          configurable_options {
            attribute_id          
            attribute_code          
            label
            values {
              label
              value_index
            }
          }
        }

        categories {
          id
          name
          url_path
        }

        price_range {
          maximum_price {
            regular_price {
              currency
              value
            }
            final_price {
              currency
              value
            }
            discount {
              amount_off
              percent_off
            }
            fixed_product_taxes {
              label
              amount {
                currency
                value
              }
            }
          }
          
          minimum_price {
            regular_price {
              currency
              value
            }
            final_price {
              currency
              value
            }
            discount {
              amount_off
              percent_off
            }
            fixed_product_taxes {
              label
              amount {
                currency
                value
              }
            }
          }
        }
      }
      total_count
    }
  }
`
export default allProductsQuery
