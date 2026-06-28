function validateImageSize(input) {
  const MAX_SIZE = 5 * 1024 * 1024;
  const error = document.getElementById("image-error");
  const info = document.getElementById("image-info");
  const preview = document.getElementById("image-preview");
  const file = input.files[0];
  const allowedTypes = ["image/jpeg", "image/png"];
  const allowedExts = [".jpg", ".jpeg", ".png"];

  // Reset
  error.style.display = "none";
  info.style.display = "none";
  preview.style.display = "none";
  preview.src = "";

  if (!file) return;

  const ext = "." + file.name.split(".").pop().toLowerCase();
  if (!allowedTypes.includes(file.type) || !allowedExts.includes(ext)) {
    input.value = "";
    error.textContent = "Only JPEG, PNG, and JPG images are allowed.";
    error.style.display = "block";
    return;
  }

  if (file.size > MAX_SIZE) {
    input.value = "";
    error.textContent = `File is too large (${(file.size / 1024 / 1024).toFixed(2)} MB). Maximum allowed size is 5 MB.`;
    error.style.display = "block";
    return;
  }

  // Show info
  info.textContent = `${file.name} — ${(file.size / 1024 / 1024).toFixed(2)} MB`;
  info.style.display = "block";

  // Show preview
  const reader = new FileReader();
  reader.onload = function (e) {
    preview.src = e.target.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
}
