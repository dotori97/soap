const urlParams = new URLSearchParams(window.location.search);
const produtId = urlParams.get('id');

fetch('products.json')
    .then(response => response.json())
    .then(products => {
        const product = products.find(p => p.id === produtId);

        if(product){
            document.getElementById('product-detail').innerHTML = `
                <h1>${product.name}</h1>
                <img src="${product.image}" alt="${product.name}" width="300">
                <p>정가: ${product.price}원</p>
                <p>할인가: ${product.dc_price}원</p>
                <div class="back"><a href="index.html">👈 목록으로 돌아가기</a></div>
            `;
        }else{
            document.getElementById('product-detail').innerHTML = `<p>상품을 찾을 수 없습니다.</p> `;         
        }
    })
    .catch(error => console.error(`상품 정보를 불러오는데 실패했습니다.`, error));