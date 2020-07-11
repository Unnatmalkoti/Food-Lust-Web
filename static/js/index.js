let foodTiles = document.querySelectorAll(".food-tile");
foodTiles.forEach((tile) => {
  tile.firstElementChild.addEventListener("click", () => {
    foodTiles.forEach((tile2) => {
      if (tile2 != tile) tile2.classList.remove("tile-active");
    });
    tile.classList.toggle("tile-active");
  });
});

let forms = document.querySelectorAll(".food-tile-details");

forms.forEach((form) => {
  let input = form.querySelector(".qty-input");

  input.disabled = true;
  //   for minus
  console.log("-");
  input.children[0].addEventListener("click", () => {
    if (input.children[1].value > 1) {
      input.children[1].value -= 1;
      addToCartExtern(form);
    } else if (input.children[1].value == 1) {
      input.children[1].value = 0;
      addToCartExtern(form);
      input.children[1].value = 1;
    }
  });
  input.children[2].addEventListener("click", () => {
    if (input.children[1].value < 10)
      input.children[1].value = 1 + parseInt(input.children[1].value);
    console.log("+");
    addToCartExtern(form);
    // form.submit();
  });
});

// let forms, qtyInput;
// $(document).ready(() => {
//   forms = $(".food-tile-details");
//   qtyInput = forms.find(".qty-input");
//   console.log(qtyInput);

//   qtyInput.find(".minus").on("click", () => {
//     // let input = $(this).prevObject.find("input");
//     // let val = input.val();
//     // if (val > 1) {
//     //   val--;
//     //   input.val(val);
//     //   input.form.submit();
//     // }
//   });

//   qtyInput.find(".plus").on("click", (e) => {
//     console.log(e);

//     // let input = $(this).parent().find("input");
//     // let val = input.val();
//     // if (val < 10) {
//     //   val++;
//     //   input.val(val);
//     //   input.form.submit();
//     // }
//   });
// });
