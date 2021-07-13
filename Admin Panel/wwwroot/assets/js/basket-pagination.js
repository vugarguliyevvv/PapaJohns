"use strict";


//addtobasket
        
function AddToBasket(elements) {
    let allAddSpan;
    if (elements === undefined) {
        allAddSpan = document.querySelectorAll(".addToBasket");
    } else {
        allAddSpan = elements;
    }
    
    allAddSpan.forEach(item => {
        item.addEventListener("click", function (e) {
            console.log(allAddSpan);
            let id = e.target.getAttribute("data-id");
            let formdata = new FormData();
            if (document.getElementById("pageName").value === "detail") {
                let addProductCount = document.getElementById("addProductCount").value;
                let productDbCount=document.getElementById("productDbCount").value;
                if (addProductCount > 1 && addProductCount<=productDbCount) {
                    formdata.append("addProductCount", addProductCount);
                }
            }

            formdata.append("id", id);
            axios.post('/basket/AddBasket', formdata)
                .then(function (response) {
                    console.log(response.data.basketTotalPrice)
                    console.log(response.data.basketProductCount)
                    let totalPriceNav = document.getElementById('totalPriceNav');
                    let totalCountNav = document.getElementById('totalCountNav');
                    if (response.data.basketProductCount != null) {
                        totalPriceNav.textContent = "$ " + response.data.basketTotalPrice;
                        totalCountNav.textContent = response.data.basketProductCount;
                    } else {
                        window.location = "/Account/Login";
                    }

                })
                .catch(function (error) {
                    if (error.response) {
                        let errorObj = error.response.data;
                        for (let errors in errorObj) {
                            let error = errorObj[errors];
                            console.log(error);
                        }
                    }
                });
        })
    })  
}                 

AddToBasket();



//plus product

let plusProduct = document.querySelectorAll('.plusProduct');

plusProduct.forEach(item => {
    item.addEventListener("click", function (e) {
        var plusBtn = e.target;
        let formdata = new FormData();
        let id = plusBtn.getAttribute("data-id");
        formdata.append("id", id);
        axios.post('/basket/ProductCountPlusAxious', formdata)

            .then(function (response) {
                console.log(response.data)
                let basketTotalPrice = document.getElementById('basketTotalPrice');
                let totalPriceNav = document.getElementById('totalPriceNav');

                basketTotalPrice.innerHTML = 'Total: $ ' + response.data.basketTotalPrice;
                totalPriceNav.innerHTML = '$ ' + response.data.basketTotalPrice;
                plusBtn.parentElement.parentElement.previousElementSibling.
                    previousElementSibling.textContent = response.data.productBasketCount;
                plusBtn.parentElement.parentElement.previousElementSibling.previousElementSibling
                    .previousElementSibling.textContent = response.data.productTotalPrice;

                if (response.data.productBasketCount > 1) {
                    plusBtn.parentElement.parentElement.previousElementSibling
                        .firstElementChild.firstElementChild.classList.remove('d-none');
                }

                if (response.data.productBasketCount == response.data.basketProductDbCount) {
                    plusBtn.classList.add('d-none');
                }

            })
            .catch(function (error) {
                if (error.response) {
                    let errorObj = error.response.data;
                    for (let errors in errorObj) {
                        let error = errorObj[errors];
                        console.log(error);
                    }
                }
            });
    })
})


//minus product
let minusProduct = document.querySelectorAll('.minusProduct');

minusProduct.forEach(item => {
    item.addEventListener("click", function (e) {
        var minusBtn = e.target;

        let formdata = new FormData();
        let id = minusBtn.getAttribute("data-id");
        formdata.append("id", id);
        axios.post('/basket/ProductCountMinusAxious', formdata)

            .then(function (response) {
                console.log(response.data.productBasketCount)
                console.log(response.data.basketProducts)
                console.log(response.data.basketTotalPrice)
                let basketTotalPrice = document.getElementById('basketTotalPrice');
                let totalPriceNav = document.getElementById('totalPriceNav');

                basketTotalPrice.innerHTML = 'Total: $ ' + response.data.basketTotalPrice;
                totalPriceNav.innerHTML = '$ ' + response.data.basketTotalPrice;


                minusBtn.parentElement.parentElement.previousElementSibling.textContent = response.data.productBasketCount;
                minusBtn.parentElement.parentElement.previousElementSibling.
                    previousElementSibling.textContent = response.data.productTotalPrice;

                if (response.data.productBasketCount == 1) {
                    minusBtn.classList.add('d-none');
                } else {
                    minusBtn.parentElement.parentElement.nextElementSibling.
                        firstElementChild.firstElementChild.classList.remove('d-none');
                }


            })
            .catch(function (error) {
                if (error.response) {
                    let errorObj = error.response.data;
                    for (let errors in errorObj) {
                        let error = errorObj[errors];
                        console.log(error);
                    }
                }
            });
    })
})

//remove product from basket
let allRemove = document.querySelectorAll(".removeProduct");
allRemove.forEach(item => {
    item.addEventListener("click", function (e) {
        let id = e.target.getAttribute("data-id");
        let formdata = new FormData();
        formdata.append("id", id);
        axios.post('/basket/RemoveProduct', formdata)

            .then(function (response) {
                console.log(response.data)
                let basketTotalPrice = document.getElementById('basketTotalPrice');
                let totalPriceNav = document.getElementById('totalPriceNav');
                let totalCountNav = document.getElementById('totalCountNav');

                totalPriceNav.innerHTML = '$ ' + response.data.basketTotalPrice;
                totalCountNav.innerHTML = response.data.basketProductCount;
                item.parentElement.parentElement.parentElement.remove();

                if (response.data.basketTotalPrice > 0) {
                    basketTotalPrice.innerHTML = 'Total: $ ' + response.data.basketTotalPrice;
                } else {
                    basketTotalPrice.remove();
                    let link =
                        `<p>
                    Sebet boshdur mehsullari sechmek uchun ya
                    <a href="Home">Home</a> ya da
                    <a href="Shop">Shop</a> sehifesine baxa bilersiniz
                </p>`
                    document.getElementById('basketBox').innerHTML = link;
                }
            })
            .catch(function (error) {
                if (error.response) {
                    let errorObj = error.response.data;
                    for (let errors in errorObj) {
                        let error = errorObj[errors];
                        console.log(error);
                    }
                }
            });
    })
})



//pagination
let paginationItems = document.querySelectorAll('.paginationItems');
var arr = [];
paginationItems.forEach(item => {
    item.addEventListener("click", function (e) {

        e.preventDefault();
        
        let previous = document.getElementById("previous");
        let next = document.getElementById("next");
        let pageCount = document.getElementById("pageCount").value;
        var pageNumber = e.target;
        let formdata = new FormData();

        var page = parseInt(pageNumber.getAttribute("data-page"));

        arr.push(page);
        //previous
        if (e.target == previous) {
            if (isNaN(arr[0])) {
                arr.pop();
                return;
            }

            if (isNaN(arr[arr.length - 1])) {
                arr.pop();
                page = arr[arr.length - 1];

                page--;
                arr.push(page);

            } else {
                page = arr[arr.length - 1];
                page--;
            }
        }

        if (page < 1) {
            arr.pop();
            return;
        }

        //next
        if (e.target == next) {
            if (isNaN(arr[0])) {
                arr.pop();
                page = 1;
                arr.push(page);
            }
            if (isNaN(arr[arr.length - 1])) {
                arr.pop();
                page = arr[arr.length - 1];
                if (page == pageCount) { return; }
                page++;
                arr.push(page);
            } else {
                page = arr[arr.length - 1];
                page++;
                arr.push(page);
            }
        }


        formdata.append("page", page);
        axios.post('/Shop/Index', formdata)
            .then(function (response) {
                //console.log(response.data)

                document.getElementById("productList").innerHTML = response.data;
                
                AddToBasket(document.querySelectorAll(".addToBasket"));

            })
            .catch(function (error) {
                if (error.response) {
                    let errorObj = error.response.data;
                    for (let errors in errorObj) {
                        let error = errorObj[errors];
                        console.log(error);
                    }
                }
            });
    })
})


//category checkbox
let chechboxBtn=document.querySelectorAll(".checkBoxCategory");
chechboxBtn.forEach(item=>{
    item.addEventListener("click",function (e){
        alert(e.target.getAttribute("data-id"));
    })
})

