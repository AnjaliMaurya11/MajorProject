// starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

//Bootstrap modal backdrop function
document.addEventListener("hidden.bs.modal", function () {
  document.body.classList.remove("modal-open");
  document.body.style.removeProperty("overflow");
  document.body.style.removeProperty("padding-right");
  const backdrops = document.querySelectorAll(".modal-backdrop");
  backdrops.forEach((backdrop) => backdrop.remove());
});
