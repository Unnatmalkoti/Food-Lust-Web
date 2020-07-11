function toggleDropDown() {
  const menu = document.getElementById("user-dropdown");
  menu.classList.toggle("opened");
}

function renderCartItems(cartItems) {
  //   console.log(cartItems);
  $(".cart-item-list").empty();
  let total = 0;
  if (cartItems.length < 1) {
    $(".cart-item-list").append("<h6>Your Cart is Empty.</h6>");
    return;
  }

  cartItems.forEach((cartitem) => {
    console.log(cartitem);
    let parent = $(`input[name='item'][value=${cartitem.item.id}]`).parent();
    parent.find("input[name='quantity']").val(cartitem.quantity);

    if (cartitem.quantity > 0) parent.addClass("in-cart");
    else parent.removeClass("in-cart");

    $(".cart-item-list").append(
      '<li class="cart-item">' +
        "<div>" +
        `<strong>${cartitem.item.name}</strong><br>` +
        `<span class="cart-item-qty">Qty: ${cartitem.quantity}</span>` +
        "</div>" +
        `₹${cartitem.item.price * cartitem.quantity}` +
        "</li>"
    );
    total += cartitem.item.price * cartitem.quantity;
  });
  $(".cart .cart-bottom").empty();
  $(".cart .cart-bottom").append(
    `<h3 class="total">Total: <span>₹${total}</span> </h3>`
  );
  $(".cart .cart-bottom").append(
    `<a href="food/checkout">Proceed to Checkout</a>`
  );
}

function getCartItems() {
  $.ajax({
    type: "GET",
    url: location.origin + "/food/api/cart-items/",
    dataType: "json",
    success: renderCartItems,
  });
  return false;
}

function addToCart(e) {
  let form = $(this);
  e.preventDefault();
  //   console.log(form);
  console.log("value :", e.target.querySelector(".qty-input input").value);
  if (e.target.querySelector(".qty-input input").value)
    e.target.querySelector(".add-to-cart").classList.add("in-cart");
  else e.target.children(".add-to-cart").classList.remove("in-cart");

  //   console.log(form.serialize());
  $.ajax({
    type: "POST",
    url: location.origin + "/food/api/cart-items/",
    data: form.serialize(),
    success: function (data) {
      //   console.log("Submission was successful.");
      //   console.log(data);
      getCartItems();
    },
    error: function (data) {
      console.log("An error occurred.");
      console.log(data);
    },
  });
}

function addToCartExtern(form) {
  form = $(form);
  // console.log(form);
  //   console.log("value :", form.find(".qty-input input").val());
  if (parseInt(form.find(".qty-input input").val()) > 0)
    form.find(".add-to-cart").addClass("in-cart");
  else form.find(".add-to-cart").removeClass("in-cart");

  //   console.log(form.serialize());
  $.ajax({
    type: "POST",
    url: location.origin + "/food/api/cart-items/",
    data: form.serialize(),
    success: function (data) {
      //   console.log("Submission was successful.");
      //   console.log(data);
      getCartItems();
    },
    error: function (data) {
      console.log("An error occurred.");
      console.log(data);
    },
  });
}

$(".food-tile-details").on("submit", addToCart);

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}

$(document).ready(() => {
  var csrftoken = getCookie("csrftoken");
  $.ajaxSetup({
    beforeSend: function (xhr, settings) {
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      }
    },
  });
  getCartItems();
  //   forms = $("food-tile-details");
  //   forms.children(".qty-input input").on("change", () => $(this).form.submit());
});
