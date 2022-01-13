// Client facing scripts here

const renderProducts = (products) => {
  products.forEach(product => {
    let singleProduct = createProductElement(product)
    $('.filtered-products').append(singleProduct)
  });
}

const createProductElement = (product) => {
  const { url, price, name, sold } = product
  let singleProductElement = $(`<div class="container-1">
<div class="p1">
  Availability: ${sold}
    <header>
      <img src=${url}>
    </header>
    <footer>
      <div>
      ${name} $${price}
      </div>
      <i class="fas fa-heart"></i>
      <i class="fas fa-cart-plus"></i>
    </footer>
</div>
</div> `)
  return singleProductElement
}





$(document).ready(function () {
  $('.filter').find('form').submit(function (e) {
    e.preventDefault()

    //collects values form input
    const minPrice = $('#minPrice').val()
    const maxPrice = $('#maxPrice').val()
    //
    $.ajax({
      url: "products/filter",
      type: 'POST',
      // dataType:'json',
      data: {
        minPrice: minPrice,
        maxPrice: maxPrice
      },
      success: function (res) {
        console.log(res.products)
        renderProducts(res.products)
      }

    })
  })
})

/* */
