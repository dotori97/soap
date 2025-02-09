$(window).load(function(){
    // setInterval(function(){
    //    $(".pan").animate({"top":"-=40px"},function(){
    //    $(".pan").css({"top":"0px"}).append($(".pan div:first-child"));
    //    }); 
    //  },2000);
    //  $(".menu-icon").click(function(){
    //   $(".category-list").toggleClass("show");
    //   $(this).toggleClass("active");

    //   const img = $(this).find("img");
    //   const currentSrc = img.attr("src");

    //   if(currentSrc==="images/icons/menu.png"){
    //     img.attr("src", "images/icons/cancel.png");
    //   }else{
    //     img.attr("src", "images/icons/menu.png");
    //   }      
    //  });
    //  $(".shopping").mouseover(function(){
    //   $(".shopping-sub").toggle();
    //  });
    //  $(".shopping-sub").mouseout(function(){
    //   $(".shopping-sub").toggle();
    //  });
    //  $(".community").mouseover(function(){
    //   $(".community-sub").toggle();
    //  });
    //  $(".community-sub").mouseout(function(){
    //   $(".community-sub").toggle();
    //  });

    //  setInterval(function(){
    //   $(".pan2").animate({"left":"-=20%"},function(){
    //   $(".pan2").css({"left":"0px"}).append($(".pan2 div:first-child"));
    //   }); 
    // },5000);

    const $pan=$(".pan2");
    const $slides=$(".slide-sub");
    const slideWidth = 100;
    let currentIndex =0;
    const totalSlides = $slides.length;
    let isAnimating = false; 

    const indicators = document.querySelectorAll(".indicator");

    function updateIndicators(index){
      indicators.forEach((indicator, i) => {
        if (i===index){
          indicator.classList.add("active");
        }else{
          indicator.classList.remove("active");
        }
      });
    }

    function resetTextAnimations(){
      $(".text").css({
        opacity:0,
        transform: "translateY(20px)"
      });
    }

    // function activateTextAnimations(slideIndex){
    //   const $currentSlide = $slides.eq(slideIndex);

    //   $currentSlide.find(".text1").css({opacity: 1, transform: "translateY(0)"});

    //   setTimeout(()=>{
    //     $currentSlide.find(".text2").css({opacity: 1, transform: "translateY(0)"});
    //   }, 1000);

    //   setTimeout(()=>{
    //     $currentSlide.find(".text3").css({opacity: 1, transform: "translateY(0)"});
    //   }, 2000);
    // }

    function activateTextAnimations(slideIndex){
      const $currentSlide = $slides.eq(slideIndex);

      const textStyles =[
        {selector: ".text1", delay:0, style: {opacity:1, transform: "translateY(0)"}},
        {selector: ".text2", delay:1000, style: {opacity:1, transform: "translateY(0)"}},
        {selector: ".text3", delay:2000, style: {opacity:1, transform: "translateY(0)"}},
        {selector: ".text4", delay:0, style: {opacity:1, transform: "translateY(0)"}},
        {selector: ".text5", delay:1000, style: {opacity:1, transform: "translateY(0)"}},
        {selector: ".text6", delay:2000, style: {opacity:1, transform: "rotate(-10deg)"}},
        {selector: ".text7", delay:0, style: {opacity:1, transform: "scale(1.2)"}},
        {selector: ".text8", delay:1000, style: {opacity:1, transform: "translateY(0)"}},
        {selector: ".text9", delay:2000, style: {opacity:1, transform: "translateY(0)"}},
        {selector: ".text10", delay:0, style: {opacity:1, transform: "translateY(-10px)"}},
        {selector: ".text11", delay:1000, style: {opacity:1, transform: "translateY(-10px)" }},
        {selector: ".text12", delay:2000, style: {opacity:1, transform: "translateX(0)" }},
        {selector: ".text13", delay:3000, style: {opacity:1, transform: "translateX(0)" }},
      ];

      textStyles.forEach(({selector, delay, style})=>{
        setTimeout(()=>{
          $currentSlide.find(selector).css(style);
        }, delay);
      });
    }

   
    function changeSlide(direction){
      if(isAnimating) return;
      isAnimating = true;

      resetTextAnimations();

    //   $pan.animate({ left: `-${(currentIndex + 1) * slideWidth}%` }, 1000, function(){
    //     currentIndex++;

    //     if(currentIndex >= totalSlides - 1){
    //       $pan.css("left", "0px");
    //       currentIndex = 0; 
    //     }

    //     activateTextAnimations(currentIndex);
    //   });      
    // }
      if(direction === "next"){
        $pan.animate({ left: `-${(currentIndex + 1) * slideWidth}%` }, 1000, function () {
          // 마지막 슬라이드가 끝났을 때
          if (currentIndex === totalSlides - 1) {
            // 첫 번째 슬라이드로 이동하고 애니메이션 없이 위치 조정
            $pan.css("left", "0px");
            currentIndex = 0;
          } else {
            // 일반 슬라이드에서는 인덱스 증가
            currentIndex++;
          }    
           // 텍스트 애니메이션 활성화
           activateTextAnimations(currentIndex);
           updateIndicators(currentIndex);
           isAnimating = false;
          });
        } else if (direction === "prev"){
          if (currentIndex === 0) {
            currentIndex = totalSlides -1 ;
            $pan.css("left", `-${currentIndex * slideWidth}%`);
            activateTextAnimations(currentIndex);
            updateIndicators(currentIndex);
            isAnimating = false;
          } else {
            $pan.animate({left: `-${(currentIndex - 1) * slideWidth}%`}, 1000, function(){
              currentIndex--;
              activateTextAnimations(currentIndex);
              updateIndicators(currentIndex);
              isAnimating = false;
              }
            )            
          }
        }
      }
      

  //   if (currentIndex === totalSlides - 1) {
  //     $pan.animate({ left: `-${(currentIndex + 1) * slideWidth}%` }, 1000, function () {
  //       $pan.css("left", "0px"); // 위치 리셋 (애니메이션 없이)
  //       currentIndex = 0; // 첫 번째 슬라이드로 리셋
  //       activateTextAnimations(currentIndex); // 텍스트 애니메이션 시작
  //     });
  //   } else {
  //     // 일반적인 슬라이드 변경
  //     $pan.animate({ left: `-${(currentIndex + 1) * slideWidth}%` }, 1000, function () {
  //       currentIndex++;
  //       activateTextAnimations(currentIndex);
  //     });
  //   }
  // }

    let slideInterval = setInterval(function(){
      changeSlide("next");
    }, 10000);

    $(".prev-btn").click(function(){
      clearInterval(slideInterval);
      changeSlide("prev");
      slideInterval = setInterval(()=>{
        changeSlide("next");
      }, 10000);
    });

    $(".next-btn").click(function(){
      clearInterval(slideInterval);
      changeSlide("next");
      slideInterval = setInterval(()=>{
        changeSlide("next");
      }, 10000);
    });

    resetTextAnimations();
    activateTextAnimations(0);

    $(".s2-event").mouseover(function(){
      $(".setImg1").css({"z-index":"1"});
      $(".setImg2").css({"z-index":"2"});
    });
    $(".s2-event").mouseout(function(){
      $(".setImg1").css({"z-index":"2"});
      $(".setImg2").css({"z-index":"1"});
    })
    $(".s1-event").mouseover(function(){
      $(".setImg3").css({"z-index":"1"});
      $(".setImg4").css({"z-index":"2"});
    });
    $(".s1-event").mouseout(function(){
      $(".setImg3").css({"z-index":"2"});
      $(".setImg4").css({"z-index":"1"});
    })

    document.querySelectorAll(".prdPrice").forEach(item=>{
      // console.log("현재 item 내용", item.innerHTML); 

      const price = item.querySelector(".price")?.textContent || "가격 없음";
      const sale = item.querySelector(".selling")?.textContent || "가격 없음";

      item.innerHTML=`
        <div class="prdPrice">
          <span class="price">정가: <s>${price}원</s> </span>
          <span class="selling">할인가: ${sale}원 </span>
        </div>
      `;   

      // console.log("변경 후 item 내용:", item.innerHTML);
    })

    // setInterval(function(){
    //   $(".pan3").animate({"left":"-25%"}, function(){
    //     $(".pan3").css({"left":"0px"});
    //     $(".pan3 >div:first-child").appendTo(".pan3");
    //   });
    // }, 2000);
   

    const $pan2 = $(".pan3");
    const $slides2 = $(".saleList-container");
    const slideWidth2 = 25;
    const visibleSlide = 4;
    let currentIndex2  = 0;
    const totalSlides2 = $slides2.length;
    const maxIndex = totalSlides2 - visibleSlide;
    

    function changeSlide2(direction){

      if(direction ==="next"){
        if(currentIndex2 < maxIndex){
          currentIndex2++;
          $pan2.animate({left: `-${currentIndex2 * slideWidth2}%`}, 1000);
        }else{
          currentIndex2 = 0; 
          $pan2.animate({left: `-${maxIndex * slideWidth2}%`}, 1000, function(){
            $pan2.css("left", "0px");
          });
        } 
      }else if (direction==="prev"){
        if(currentIndex2 > 0){
          currentIndex2--;
          $pan2.animate({left: `-${currentIndex2 * slideWidth2}%`}, 1000);
        }else{
          currentIndex2=maxIndex;
          $pan2.css("left", `${currentIndex2 * slideWidth2}%`);
        }
      }  
    }         
           
    
    let slideInterval2 = setInterval(function(){
      changeSlide2("next");
    }, 2000);
    
    $(".prev-btn2").click(function(){
      clearInterval(slideInterval2);
      changeSlide2("prev");
      slideInterval2 = setInterval(() =>{
        changeSlide2("next");
      }, 2000)
    });

    $(".next-btn2").click(function(){
      clearInterval(slideInterval2);
      changeSlide2("next");
      slideInterval2 = setInterval(()=>{
        changeSlide2("next");
      }, 2000)
    });   


    let products = [];
    let visibleCount = 4;
        
    fetch('best.json')
      .then(response => response.json())
      .then(data => {
        products = data;
        renderBestProducts();
      })
      .catch(error => console.error('상품 정보를 불러오는 데 실패했습니다:', error));

      function renderBestProducts(){
        const besttList = document.getElementById('best-list');
        besttList.innerHTML = products.slice(0, visibleCount).map(product => `
          <div class="product-card">            
            <a href="product.html?id=${product.id}">
              <img src="${product.image}" alt="${product.name}" width="300">
              <h2>${product.name}</h2>
              <p>정가: ${product.price}원</p>
              <p>할인가: ${product.dc_price}원</p>
            </a>              
          </div>  
          `).join(''); 

          document.getElementById('load-more').style.display =
            visibleCount >= products.length ? 'none' : 'block'; 
          }
      
          document.getElementById('load-more').addEventListener('click', ()=>{
            visibleCount = products.length;
            renderBestProducts();
          })          
           
    
      fetch('recommend.json')
      .then(response => response.json())
      .then(data => {
        products = data;
        renderRecommendProducts();
      })
      .catch(error => console.error('상품 정보를 불러오는 데 실패했습니다:', error));  

      function renderRecommendProducts(){
        const recommendtList = document.getElementById('recommend-list');
        recommendtList.innerHTML = products.slice(0, visibleCount).map(product => `
          <div class="product-card">            
            <a href="product.html?id=${product.id}">
              <img src="${product.image}" alt="${product.name}" width="300">
              <P class="type">${product.type}</p>
              <h2>${product.name}</h2>
              <p>정가: ${product.price}원</p>
              <p>할인가: ${product.dc_price}원</p>
            </a>              
          </div>  
          `).join(''); 
          document.getElementById('load-more2').style.display = 
            visibleCount >= products.length ? 'none' : 'block' ;
          }
       
          document.getElementById('load-more2').addEventListener('click', ()=>{
            visibleCount = products.length;
            renderRecommendProducts();
          })        
  

   
  
  // let allProducts = [];

  // fetch('products.json')
  //   .then(response => response.json())
  //   .then(products=>{
  //     console.log(products);

  //     allProducts = products;
    
  //   const bestProducts = products.filter(product => product.best);
  //   console.log(bestProducts);
  //   displayProducts(bestProducts, "best-list");
    
  //   const recommendedProducts = products.filter(product => product.recommended);
  //   console.log(recommendedProducts);
  //   displayProducts(recommendedProducts, "recommend-list");

  //   displayProducts(allProducts);
  //   })
  //   .catch(error => {
  //     console.error("Error fetching products:", error);
  //   })

  //   function displayProducts(products, elementId="product-list"){
  //     const productList = document.getElementById(elementId);
  //     if(!productList) return;

  //     productList.innerHTML = products.map(product => `
  //       <div class="product-card">
  //         <a href="product.html?id=${product.id}">
  //           <img src="${product.image}" alt="${product.name}" width="300">
  //           <h2>${product.name}</h2>
  //           <p>정가: ${product.price}원</p>
  //           <p>할인가: ${product.dc_price}원</p>          
  //         </a>
  //       </div>  
  //       `).join('');
  //   }

  //   document.getElementById("filter-moisture").addEventListener("click", ()=>{
  //     filterProducts({category: "보습"});      
  //   })

  //   document.getElementById("filter-brightening").addEventListener("click", ()=>{
  //     filterProducts({category: "미백"});      
  //   })

  //   document.getElementById("filter-firming").addEventListener("click", ()=>{
  //     filterProducts({category: "탄력증진"});      
  //   })

  //   document.getElementById("filter-nourishing").addEventListener("click", ()=>{
  //     filterProducts({category: "영양공급"});      
  //   })

  //   document.getElementById("filter-troublecare").addEventListener("click", ()=>{
  //     filterProducts({category: "트러블케어"});      
  //   })

  //   document.getElementById("filter-sebum").addEventListener("click", ()=>{
  //     filterProducts({category: "피지조절"});      
  //   })

  //   document.getElementById("skin-dry").addEventListener("click", ()=>{
  //     filterProducts({skin_type: "건성"});      
  //   })

  //   document.getElementById("skin-oil").addEventListener("click", ()=>{
  //     filterProducts({skin_type: "지성"});      
  //   })

  //   document.getElementById("skin-combination").addEventListener("click", ()=>{
  //     filterProducts({skin_type: "복합성"});      
  //   })

  //   document.getElementById("skin-sensitive").addEventListener("click", ()=>{
  //     filterProducts({skin_type: "민감성"});      
  //   })

  //   document.getElementById("skin-all").addEventListener("click", ()=>{
  //     filterProducts({skin_type: "모든 피부"});      
  //   })

  //   document.getElementById("filter-kids").addEventListener("click", ()=>{
  //     filterProducts({usage: "유아"});      
  //   })

  //   document.getElementById("filter-hair").addEventListener("click", ()=>{
  //     filterProducts({usage: "모발"});      
  //   })

  //   document.getElementById("filter-body").addEventListener("click", ()=>{
  //     filterProducts({usage: "바디"});      
  //   })
    

  //   function filterProducts({category, skin_type, usage}){
  //     let filtered = allProducts;

  //     if(category){
  //       filtered = filtered.filter(product => product.category === category);
  //     }

  //     if(skin_type){
  //       filtered = filtered.filter(product => product.skin_type === skin_type);
  //     }

  //     if(usage){
  //       filtered = filtered.filter(product => product.usage === usage);
  //     }

  //     console.log("Filtered Products:", filtered);
  //     displayProducts(filtered, "filter-list");
  //   }
  
});

