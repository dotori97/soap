document.addEventListener("DOMContentLoaded", function(){
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
            // $(".pan").each(function(){
            //     setInterval(function(){
            //         $(".pan").animate({"top":"-=40px"},function(){
            //         $(".pan").css({"top":"0px"}).append($(".pan div:first-child"));
            //         }); 
            //       },2000);
            //     })     

                  $(".menu-icon").click(function(){
                   $(".category-list").toggleClass("show");
                   $(this).toggleClass("active");
             
                   const img = $(this).find("img");
                   const currentSrc = img.attr("src");
             
                   if(currentSrc==="images/icons/menu.png"){
                     img.attr("src", "images/icons/cancel.png");
                   }else{
                     img.attr("src", "images/icons/menu.png");
                   }      
                  });
                  $(".shopping").mouseover(function(){
                   $(".shopping-sub").toggle();
                  });
                  $(".shopping-sub").mouseout(function(){
                   $(".shopping-sub").toggle();
                  });
                  $(".community").mouseover(function(){
                   $(".community-sub").toggle();
                  });
                  $(".community-sub").mouseout(function(){
                   $(".community-sub").toggle();
                  });
            })            
        
   .catch(error => console.error("header load error.", error));
})
