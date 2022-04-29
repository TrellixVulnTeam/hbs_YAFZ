const button = document.querySelector(".admin-menu-button");
const token = document.querySelector(".token");
const menu = document.querySelector(".admin-menu");
const subMenu = document.querySelectorAll(".admin-menu-item");
button &&
  button.addEventListener("click", function () {
    menu.classList.toggle("active");
  });

subMenu.forEach((item) =>
  item.addEventListener("click", function () {
    item.classList.toggle("active");
  })
);
const deleteActive = document.querySelectorAll(".active-modal");
const modal = document.querySelector(".modal-delete");
const formDelete = document.querySelector(".form-delete");
const formDeleteCate = document.querySelector(".form-delete-cate");
const formDeleteSlider = document.querySelector(".form-delete-slider");
const submitButton = document.querySelectorAll(".modal-confirm");
const cancelButton = document.querySelector(".modal-cancel");
let idDelete;
let idDeleteCate;
deleteActive.forEach((item) =>
  item.addEventListener("click", function (e) {
    e.preventDefault();
    // console.log('hie')
    idDelete = e.target.dataset.id;
    const modal = `<div class="modal-delete">
    <div class="modal-delete-content">
    <p>Bạn chắc chắn xóa?</p>
    <p>${e.target.dataset.id}</p>
    <div class="modal-delete-button-group">
        <button class="modal-delete-button modal-confirm">Xoa</button>
        <button class="modal-delete-button modal-cancel">Huy</button>
    </div>
    </div>
    </div>`;

    document.body.insertAdjacentHTML("beforeend", modal);
  })
);
const deleteActiveCate = document.querySelectorAll(".active-modal-cate");
deleteActiveCate.forEach((item) =>
  item.addEventListener("click", function (e) {
    e.preventDefault();
    idDeleteCate = e.target.dataset.id;
    const modal = `<div class="modal-delete">
    <div class="modal-delete-content">
    <p>Bạn chắc chắn xóa?</p>
    <p>${e.target.dataset.id}</p>
    <div class="modal-delete-button-group">
        <button class="modal-delete-button modal-confirm-cate">Xoa</button>
        <button class="modal-delete-button modal-cancel">Huy</button>
    </div>
    </div>
    </div>`;

    document.body.insertAdjacentHTML("beforeend", modal);
  })
);
const deleteActiveSlider = document.querySelectorAll(".active-modal-slider");
let idDeleteSlider;
deleteActiveSlider.forEach((item) =>
  item.addEventListener("click", function (e) {
    e.preventDefault();
    // console.log('jdsi');
    idDeleteSlider = e.target.dataset.id;
    const modal = `<div class="modal-delete">
    <div class="modal-delete-content">
    <p>Bạn chắc chắn xóa?</p>
    <p>${e.target.dataset.id}</p>
    <div class="modal-delete-button-group">
        <button class="modal-delete-button modal-confirm-slider">Xoa</button>
        <button class="modal-delete-button modal-cancel">Huy</button>
    </div>
    </div>
    </div>`;

    document.body.insertAdjacentHTML("beforeend", modal);
  })
);
document.addEventListener("click", function (e) {
  if (e.target.matches(".modal-cancel")) {
    const modal = e.target.parentNode.parentNode.parentNode;
    modal.parentNode.removeChild(modal);
  }
  if (e.target.matches(".modal-delete")) {
    e.target.parentNode.removeChild(e.target);
  }
  if (e.target.matches(".modal-confirm")) {
    formDelete.action = `/admin/delete/${idDelete}?_method=DELETE`;
    formDelete.submit();
  }
  if (e.target.matches(".modal-confirm-cate")) {
    formDeleteCate.action = `/admin/delete-cate/${idDeleteCate}?_method=DELETE`;
    formDeleteCate.submit();
  }
  if (e.target.matches(".modal-confirm-slider")) {
    formDeleteSlider.action = `/admin/delete-slider/${idDeleteSlider}?_method=DELETE`;
    formDeleteSlider.submit();
  }
});

// filter tab

const tab = document.querySelectorAll(".shop-header  p");
const tabContent = document.querySelectorAll(".shop-subcontent-small");
tab.forEach((item) =>
  item.addEventListener("click", function (e) {
    const title = e.target.dataset.tab;
    tab.forEach((item) => item.classList.remove("active"));
    e.target.classList.add("active");

    tabContent.forEach((item) => {
      item.classList.remove("active");
      if (title === item.getAttribute("data-tab")) {
        item.classList.add("active");
      }
    });
  })
);

//slider

const sliderList = document.querySelectorAll(".slider-item");
const sliderLeft = document.querySelector(".slider-left");
const sliderRight = document.querySelector(".slider-right");
let indexSlider = 0;
let autoPlaySlider = true;
sliderLeft &&
  sliderLeft.addEventListener("click", () => {
    prevSlider();
    // console.log('prev');
    showSlider();
  });
sliderRight &&
  sliderRight.addEventListener("click", () => {
    nextSlider();
    showSlider();
  });
const hideSlider = () => {
  sliderList.forEach((item) => item.classList.remove("active"));
};
const showSlider = () => {
  hideSlider();
  sliderList[indexSlider].classList.add("active");
};
const nextSlider = () => {
  indexSlider = indexSlider++ === sliderList.length - 1 ? 0 : indexSlider++;
  console.log(indexSlider);
};
const prevSlider = () => {
  indexSlider = indexSlider-- <= 0 ? sliderList.length - 1 : indexSlider--;
  console.log(indexSlider);
};

// image in detail page

const imageMain = document.querySelector(".product-detail-img-main img");
const imageSmall = document.querySelectorAll(".product-detail-img-item");

imageSmall.forEach((item) =>
  item.addEventListener("click", function (e) {
    const newLink = e.target.getAttribute("src");
    imageMain.setAttribute("src", newLink);
    imageSmall.forEach((item) => item.classList.remove("active"));
    e.target.parentNode.classList.add("active");
    // console.log(imageMain.getAttribute("src"));
  })
);

// amout add cart
const minus = document.querySelector(".add-cart-minus");
const increase = document.querySelector(".add-cart-increase");
const inputAmount = document.querySelector(".add-cart-num input");
// const hiddenClass = document.querySelector(".hidden").textContent;
// console.log(hiddenClass);
let amount = inputAmount ? inputAmount.value : "";

minus &&
  minus.addEventListener("click", function () {
    if (amount <= 1) {
      amount;
      alert("khong the be hon 1");
    } else {
      amount--;
    }
    inputAmount.value = amount;
  });
increase &&
  increase.addEventListener("click", function () {
    const amountRemain = inputAmount.nextElementSibling.textContent;
    // console.log(amountRemain);
    if (amount >= Number(amountRemain)) {
      alert("Khong con du san pham");
    } else {
      amount++;
    }
    inputAmount.value = amount;
  });
const buttonRedirect = document.querySelector(".add-cart-button");
// buttonRedirect.addEventListener("click", function () {
//   window.location.replace("http://hnam.com:3000/cart/add-cart");
// });
