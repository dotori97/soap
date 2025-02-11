const urlParams = new URLSearchParams(window.location.search);
const produtId = urlParams.get('id');

fetch('products.json')
    .then(response => response.json())
    .then(products => {
        const product = products.find(p => p.id === produtId);

        if(product){
            document.getElementById('product-detail').innerHTML = `
                
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h1>${product.name}</h1>
                    <div class="info">                  
                        <p class="info1">${product.category}</p> 
                        <p class="info2">${product.skin_type}</p>
                    </div>
                    <p>정  가: <s>${product.price}원</s></p>
                    <p style="color:#008000"><b>할인가: ${product.dc_price}원</b></p>                    
                    <hr> 
                    <div class="option">
                        <p>추가옵션</p>
                        <label>
                            <input type="checkbox" class="option-checkbox" data-name="&nbsp;비누 거품망 &nbsp;&nbsp;&nbsp;" data-price="1000">비누 거품망(1000원)
                        </label>
                        <br>
                        <label>
                            <input type="checkbox" class="option-checkbox" data-name="&nbsp;자석 비누 홀더" data-price="3000">자석 비누 홀더(3000원)
                        </label>
                    </div>    
                    <div class="count">
                        <div>${product.name}</div>
                        <div class="quantity-box">
                            <button id="decrease"> - </button>
                            <span id="quantity"> 1 </span>
                            <button id="increase"> + </button>                            
                        </div>
                        <div><b id="total-price">${product.dc_price.toLocaleString()}원</b></div>
                    </div>  
                    <div id="selected-options"></div>
                    <hr>
                    <div class="final">
                        <p><b>총 결제 금액: <span id="final-price">${product.dc_price.toLocaleString()}원</b></p>
                    </div>
                    <div class="payment">                        
                        <div class="purchase">
                            <div class="basket">장바구니</div>
                            <div class="buy">바로구매</div>
                        </div>
                        <hr>
                        <div class="sns-payment">
                            <div class="naver">
                                <div class="naver-ptag">
                                    <p style="color:#00de5a; font-weight:600;">NAVER</p>
                                    <p>네이버ID로 간편구매</p>
                                    <p>네이버페이</p>
                                </div>
                                <div class="naver-logo"><img src="images/naverPay.png" alt="네이버페이 로고"></div>
                                <span class="jjim">찜</span>
                                <div class="naver-talk"><img src="images/naver_talk2.png" alt="네이버톡 로고"></div>
                            </div>                            
                            <div class="kakao">
                                <div class="kakao-ptag">
                                    <p>카톡 하나로 결제 끝</p>
                                    <p>카카오페이</p>
                                </div>
                                <div class="kakao-logo"><img src="images/kakaoPay.png" alt="카카오페이 로고"></div>
                                <div class="kakao-ch"><img src="images/kakao-ch2.png" alt="카카오채널 로고"></div>
                                <span class="jjim">찜</span>
                            </div>
                        <div>
                    </div>                                   
                </div>                
            `;

            
            const decreaseBtn = document.getElementById('decrease');
            const increaseBtn = document.getElementById('increase');
            const quantitySpan = document.getElementById('quantity');
            const totalPrice = document.getElementById('total-price');
            const finalPrice = document.getElementById('final-price');
            const checkboxes = document.querySelectorAll(".option-checkbox");
            const selectedOptionsDiv = document.getElementById('selected-options');
                      
            let quantity = 1;            
            let selectedOptions = {};

            function updatePrice(){
                let basePrice = product.dc_price * quantity;
                totalPrice.innerText = `${basePrice.toLocaleString()}원`;               

                let optionsTotal = Object.values(selectedOptions).reduce((sum, item)=>{
                    return sum + item.price * item.quantity;
                }, 0);
                
                let finalTotal = basePrice + optionsTotal;
                finalPrice.innerText = `${finalTotal.toLocaleString()}원`;
            }

            decreaseBtn.addEventListener('click', ()=>{
                if(quantity>1){
                    quantity--;
                    quantitySpan.textContent = quantity;
                    totalPrice.textContent = `${product.dc_price * quantity}원`;
                    updatePrice();                    
                }
            });

            increaseBtn.addEventListener('click', ()=>{
                quantity++;
                quantitySpan.textContent = quantity;
                totalPrice.textContent = `${product.dc_price * quantity}원`;
                updatePrice();
            })

            checkboxes.forEach((checkbox)=>{
                checkbox.addEventListener("change", function(){
                    let optionName = checkbox.dataset.name;
                    let optionPrice = parseInt(checkbox.dataset.price, 10);

                    if(checkbox.checked){
                        selectedOptions[optionName] = {price: optionPrice, quantity: 1};
                        renderSelectedOptions();
                    }else{
                        delete selectedOptions[optionName];
                        renderSelectedOptions();
                    }
                })
            })

            function renderSelectedOptions(){
                selectedOptionsDiv.innerHTML = "";

                Object.keys(selectedOptions).forEach((optionName) => {
                    let option = selectedOptions[optionName];

                    let optionDiv = document.createElement("div");
                    optionDiv.classList.add("option-count");

                    optionDiv.innerHTML=`
                        <div> ${optionName}</div>
                        <div class="quantity-box">
                            <button class="option-decrease" data-name="${optionName}"> - </button>
                            <span class="option-quantity">${option.quantity}</span>
                            <button class="option-increase" data-name="${optionName}"> + </button>
                        </div>
                        <div><b>${(option.price * option.quantity).toLocaleString()}원</b></div>    
                    `;

                    selectedOptionsDiv.appendChild(optionDiv);
                });

                document.querySelectorAll(".option-increase").forEach((btn)=>{
                    btn.addEventListener("click", function(){
                        let name = btn.dataset.name;
                        selectedOptions[name].quantity++;
                        renderSelectedOptions();
                        updatePrice();
                    });
                });

                document.querySelectorAll(".option-decrease").forEach((btn)=>{
                    btn.addEventListener("click", function(){
                        let name = btn.dataset.name;
                        if(selectedOptions[name].quantity > 1){
                            selectedOptions[name].quantity--;
                        }else{
                            delete selectedOptions[name];
                        }
                        renderSelectedOptions();
                        updatePrice();
                    });
                });
                updatePrice();
            }

            updatePrice();

        }else{
            document.getElementById('product-detail').innerHTML = `<p>상품을 찾을 수 없습니다.</p> `;         
        }
    })
    .catch(error => console.error(`상품 정보를 불러오는데 실패했습니다.`, error));