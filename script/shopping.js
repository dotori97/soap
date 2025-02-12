document.addEventListener("DOMContentLoaded", function(){
    let allProducts = [];

    fetch('products.json')
      .then(response => response.json())
      .then(products=>{
        
        allProducts = products;       
  
      displayProducts(allProducts, "fillter-list");
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      })
  
      function displayProducts(products, elementId = "filter-list"){
        const productList = document.getElementById(elementId);
        if(!productList) return;

        if(products.length===0){
          productList.innerHTML=`<p>검색 결과가 없습니다.</p>`;
          return;
        }
  
        productList.innerHTML = products.map(product => `
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
  
      document.getElementById("filter-moisture").addEventListener("click", ()=>{
        filterProducts({category: "보습"});      
      })
  
      document.getElementById("filter-brightening").addEventListener("click", ()=>{
        filterProducts({category: "미백"});      
      })
  
      document.getElementById("filter-firming").addEventListener("click", ()=>{
        filterProducts({category: "탄력증진"});      
      })
  
      document.getElementById("filter-nourishing").addEventListener("click", ()=>{
        filterProducts({category: "영양공급"});      
      })
  
      document.getElementById("filter-troublecare").addEventListener("click", ()=>{
        filterProducts({category: "트러블케어"});      
      })
  
      document.getElementById("filter-sebum").addEventListener("click", ()=>{
        filterProducts({category: "피지조절"});      
      })
  
      document.getElementById("skin-dry").addEventListener("click", ()=>{
        filterProducts({skin_type: "건성"});      
      })
  
      document.getElementById("skin-oil").addEventListener("click", ()=>{
        filterProducts({skin_type: "지성"});      
      })
  
      document.getElementById("skin-combination").addEventListener("click", ()=>{
        filterProducts({skin_type: "복합성"});      
      })
  
      document.getElementById("skin-sensitive").addEventListener("click", ()=>{
        filterProducts({skin_type: "민감성"});      
      })
  
      document.getElementById("skin-all").addEventListener("click", ()=>{
        filterProducts({skin_type: "모든 피부"});      
      })
  
      document.getElementById("filter-kids").addEventListener("click", ()=>{
        filterProducts({usage: "유아"});      
      })
  
      document.getElementById("filter-hair").addEventListener("click", ()=>{
        filterProducts({usage: "모발"});      
      })
  
      document.getElementById("filter-body").addEventListener("click", ()=>{
        filterProducts({usage: "바디"});      
      })
      

      document.querySelectorAll(".shopping-category a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // 기본 동작(최상단 이동) 막기
        });
    });
    
  //   document.addEventListener("click", function (event) {
  //     if (event.target.classList.contains("filter-btn")) {
  //         event.preventDefault(); // 페이지 새로고침 방지
  //         const filterType = event.target.dataset.filter; // data-filter 값 가져오기
  //         filterProducts(filterType); // 필터링 함수 실행
  //     }
  // });
  
     
      function filterProducts({category, skin_type, usage}){
        let filtered = allProducts;
  
        if(category){
          filtered = filtered.filter(product => product.category === category);
        }
  
        if(skin_type){
          filtered = filtered.filter(product => product.skin_type === skin_type);
        }
  
        if(usage){
          filtered = filtered.filter(product => product.usage === usage);
        }
  
        console.log("Filtered Products:", filtered);
        displayProducts(filtered, "filter-list");

        if(filtered.length === 0){
            displayProducts(allProducts, "filter-list")
        }
      }

    //   const filters = [
    //     { id: "filter-moisture", filter: { category: "보습" } },
    //     { id: "filter-brightening", filter: { category: "미백" } },
    //     { id: "filter-firming", filter: { category: "탄력증진" } },
    //     { id: "filter-nourishing", filter: { category: "영양공급" } },
    //     { id: "filter-troublecare", filter: { category: "트러블케어" } },
    //     { id: "filter-sebum", filter: { category: "피지조절" } },
    //     { id: "skin-dry", filter: { skin_type: "건성" } },
    //     { id: "skin-oil", filter: { skin_type: "지성" } },
    //     { id: "skin-combination", filter: { skin_type: "복합성" } },
    //     { id: "skin-sensitive", filter: { skin_type: "민감성" } },
    //     { id: "skin-all", filter: { skin_type: "모든 피부" } },
    //     { id: "filter-kids", filter: { usage: "유아" } },
    //     { id: "filter-hair", filter: { usage: "모발" } },
    //     { id: "filter-body", filter: { usage: "바디" } }
    // ];

    // filters.forEach(({ id, filter }) => {
    //     const element = document.getElementById(id);
    //     if (element) {
    //         element.addEventListener("click", (even) => {              
    //           event.preventDefault();
    //           filterProducts(filter)});
    //     }
    // }); 

});

