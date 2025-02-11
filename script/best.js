document.addEventListener("DOMContentLoaded", function(){
    let products = [];
            
    fetch('best.json')
      .then(response => response.json())
      .then(data => {
        products = data;
        renderBestProducts();
      })
      .catch(error => console.error('상품 정보를 불러오는 데 실패했습니다:', error));

      function renderBestProducts(){
        const besttList = document.querySelector('.best-list');
        besttList.innerHTML = products.map(product => `
          <div class="product-card">            
            <a href="product.html?id=${product.id}">
              <img src="${product.image}" alt="${product.name}" width="300">
              <h2>${product.name}</h2>
              <p>정가: ${product.price}원</p>
              <p>할인가: ${product.dc_price}원</p>
            </a>              
          </div>  
          `).join(''); 
        }

})