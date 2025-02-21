document.addEventListener("DOMContentLoaded", function(){

$(".gongi-btn").click(function(){      
    $(".gongi").css({"z-index":"3"});
    $(".qna").css({"z-index":"2"});
    $(".review").css({"z-index":"1"});
  });
  $(".qna-btn").click(function(){
    $(".qna").css({"z-index":"3"});
    $(".gongi").css({"z-index":"2"});
    $(".review").css({"z-index":"1"});
  });
  $(".review-btn").click(function(){
    $(".review").css({"z-index":"3"});
    $(".qna").css({"z-index":"2"});
    $(".gongi").css({"z-index":"1"});
  });

  console.log($(".gongi").css("display")); 
  console.log($(".qna").css("display")); 
  console.log($(".review").css("display"));
  console.log(document.querySelector(".gongi-btn"));  // null이면 요소가 없음
  console.log($(".gongi-btn"));  // jQuery로 확인

  //공지사항

  const notices = document.querySelectorAll(".notice-list li");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const closeBtn = document.getElementById("closeBtn");
  const noticeTitle = document.getElementById("noticeTitle");
  const noticeContent = document.getElementById("noticeContent");

  notices.forEach((notice)=>{
    notice.addEventListener("click", function(){
      const title = this.getAttribute("data-title");
      const content = this.getAttribute("data-content");

      noticeTitle.textContent = title;
      noticeContent.textContent = content;

      sidebar.classList.add("open");  //css상 안 보이도록 밀어놨던 사이드바 자체를 open class를 통해 화면에 보이는 쪽으로 당김
      sidebarOverlay.classList.add("active"); //배경 오버레이를 활성화해서 사용자가 클릭할 수 없게 함
    })
  })

  closeBtn.addEventListener("click", function(){
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");
  });

  sidebarOverlay.addEventListener("click", function(){
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");
  });

  
  
  //review

  const openModalBtn = document.getElementById("openModal");
  const modal = document.getElementById("reviewModal");
  const closeModalBtn = document.querySelector(".close");
  const saveReviewBtn = document.getElementById("saveReview");
  const stars = document.querySelectorAll(".stars span");  
  //이렇게 하면 .stars라는 부모 요소 안에 있는 모든 <span>요소들(각각의 별)이 선택된다. 
  //이제 stars는 별 각각을 담고 있는 NodeList가 된다.
  let selectedRating = 0;

  openModalBtn.addEventListener("click", () =>{
    modal.style.display = "block";
  });

  closeModalBtn.addEventListener("click", ()=>{
    modal.style.display = "none";
  });

  stars.forEach(star => {
    star.addEventListener("click", function(){
      selectedRating = this.getAttribute("data-value");
      stars.forEach(s=> s.classList.remove("active"));
      for(let i=0; i<selectedRating; i++){
        stars[i].classList.add("active");
      }
    });
  });

  saveReviewBtn.addEventListener("click", function(){
    // const title = document.getElementById("reviewTitle").value;
    const content = document.getElementById("reviewContent").value;
    const author = document.getElementById("reviewAuthor").value;
    const fileInput = document.getElementById("reviewImage");
    const file = fileInput.files[0];

    if(!content || !author || selectedRating === 0){
      alert("내용, 별점을 입력하세요!");
      return;
    }

    let imageUrl = "";
    if(file){
      const reader = new FileReader(); //new FileReader()를 생성해서 파일을 읽을 준비
      reader.onload = function(e){ //파일을 다 읽으면 실행할 함수 정의
        imageUrl = e.target.result; //파일을 Base64 문자열로 변환해서 저장.
        saveToLocalStorage(content, imageUrl, selectedRating, author);
      };
      reader.readAsDataURL(file); //파일을 Base64 데이터 URL로 변환해서 읽기 시작
      //실행순서
      //1. FileReader객체 생성
      //2. onload 함수 정의(파일을 다 읽으면 실행할 함수) --> 파일 읽기가 완료되면 자종 실행되는 이벤트 핸들러
      //3. readAsDataURL(file); 실행-> 파일을 읽기 시작 (비동기 작업이라서 실행 후 바로 결과를 반환하지 않음)
      //4. 파일 읽기가 완료되면 브라우저가 onload 실행
      //지금처럼 파일을 다 읽고 실행할 코드(onload)를 먼저 정의해야 안전하다
      //만약 onload를 나중에 정의하면 readAsDataURL(file)이 먼저 실행되어 파일을 다 읽은 후에는 실행되지 않을 수도
      //파일을 읽은 후 실행될 코드를 미리 정의하는 것이 중요!!!!
    }else{
      saveToLocalStorage(content, "", selectedRating, author);
    }
  });

  // function saveToLocalStorage(title, content, imageUrl, rating){
  //   const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  //   reviews.push({title, content, imageUrl, rating});
  //   localStorage.setItem("reviews", JSON.stringify(reviews));
  //   modal.style.display = "none";
  //   displayReviews();
  // }

  // function displayReviews(){
  //   const reviewsContainer = document.getElementById("reviewsContainer");
  //   reviewsContainer.innerHTML = "";
  //   const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  //   reviews.forEach(review => {
  //     const reviewCard = document.createElement("div");
  //     reviewCard.classList.add("review-card");

  //     reviewCard.innerHTML = `
  //       <h3>${review.title}</h3>
  //       ${review.imageUrl ? `<img src="${review.imageUrl}" alt="후기 이미지">` : ""}
  //       <P>${review.content.substring(0, 50)}...</p>
  //       <p>${"⭐".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p>
  //     `;
  //     reviewsContainer.appendChild(reviewCard);
  //   });    
  // }


  function saveToLocalStorage(content, imageUrl, rating, author, index=null){
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    if(index != null){
      reviews[index] = {content, imageUrl, rating, author};
    }else{
      reviews.unshift({content, imageUrl, rating, author});
    }    
    localStorage.setItem("reviews", JSON.stringify(reviews));
    modal.style.display = "none";
    displayReviews();
  }

  function displayReviews(){
    const reviewsContainer = document.getElementById("reviewsContainer");
    reviewsContainer.innerHTML = "";
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    reviews.forEach((review, index) => {
      const reviewCard = document.createElement("div");
      reviewCard.classList.add("review-card");

      reviewCard.innerHTML = `        
        ${review.imageUrl ? `<img src="${review.imageUrl}" alt="후기 이미지">` : ""}
        <P>${review.content.substring(0, 120)}...</p>
        <p>작성자: ${review.author}</p>
        <p>${"⭐".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p>
        <button class="edit-review" data-index="${index}">수정</button>
        <button class="delete-review" data-index="${index}">삭제</button>
      `;
      reviewsContainer.appendChild(reviewCard);
    });    
    attachEventListeners();
  }

  function attachEventListeners() {
    document.querySelectorAll(".delete-review").forEach(button => {
      button.addEventListener("click", function(){
        const index = this.getAttribute("data-index");
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.splice(index, 1);
        localStorage.setItem("reviews", JSON.stringify(reviews));
        displayReviews();
      });
    });

    document.querySelectorAll(".edit-review").forEach(button => {
      button.addEventListener("click", function(){
        const index = this.getAttribute("data-index");
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        const review = reviews[index];
        // document.getElementById("reviewTitle").value = review.title;
        document.getElementById("reviewContent").value=review.content;
        selectedRating = review.rating;
        modal.style.display = "block";

        saveReviewBtn.onclick=null; //기존 클릭 이벤트 제거. 이 코드가 없으면 수정한 뒤 똑같은 카드가 두 개 생성됨.
        //saveReviewBtn.onclick 이벤트 핸들러가 여러 번 등록되면서 발생. 기존 핸들러를 초기화한 후 새로운 핸들러를 등록해야.
        saveReviewBtn.onclick = function() {
          // const title = document.getElementById("reviewTitle").value;
          const content= document.getElementById("reviewContent").value;
          const author = review.author;
          saveToLocalStorage(content, review.imageUrl, selectedRating, author, index);
        };
      });
    });
  }
  
  displayReviews();

});