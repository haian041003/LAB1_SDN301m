const APIEndpoint = '/api';
if (window.location.pathname.includes('product')) {
  document.getElementById('manage-product').setAttribute('data-active', 'true');
} else {
  document.getElementById('manage-category').setAttribute('data-active', 'true');
}

const x = document.getElementsByTagName('BODY')[0]; // Select body tag because of disable scroll when modal is active
const modal = document.getElementById('modal'); // modal

const modalClose = document.getElementsByClassName('modal-close'); // close modal button
const confirmBtn = document.getElementById('confirm-btn'); // confirm
const logoutBtn = document.getElementById('logout-btn'); // logout

logoutBtn.addEventListener('click', async () => {
  // remove token
  document.cookie = 'x-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  window.location.href = '/dashboard/login';
});

function openModal() {
  modal.style.display = 'block'; // Show modal
  x.style.overflow = 'hidden'; // Disable scroll on body
}

// Select and trigger all close buttons
for (var i = 0; i < modalClose.length; i++) {
  modalClose[i].addEventListener('click', function () {
    modal.style.display = 'none'; // Hide modal
    x.style.overflow = 'auto'; // Active scroll on body
  });
}

// Close modal when click away from modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'; // Hide modal
    x.style.overflow = 'auto'; // Active scroll on body
  }
};

// handle form submit
const form = document.getElementById('product-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // open modal
    openModal();
    confirmBtn.onclick = async () => {
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      const method = window.location.pathname.includes('add-product') ? 'POST' : 'PATCH';
      const url = window.location.pathname.includes('add-product')
        ? `${APIEndpoint}/product`
        : `${APIEndpoint}/product/${data.id}`;

      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${
            document.cookie
              .split('; ')
              .find((row) => row.startsWith('x-auth-token'))
              .split('=')[1]
          }`,
          'Content-Type': 'application/json',
        },
      });
      window.location.href = '/dashboard/manage-product';
    };
  });
}

// handle delete product
const deleteBtns = document.getElementsByClassName('delete-btn-product');
for (let i = 0; i < deleteBtns.length; i++) {
  deleteBtns[i].addEventListener('click', async (e) => {
    e.preventDefault();
    openModal();
    confirmBtn.onclick = async () => {
      const response = await fetch(`${APIEndpoint}/product/${deleteBtns[i].getAttribute('id')}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${
            document.cookie
              .split('; ')
              .find((row) => row.startsWith('x-auth-token'))
              .split('=')[1]
          }`,
        },
      });
      window.location.href = '/dashboard/manage-product';
    };
  });
}

// handle form submit
const formCategory = document.getElementById('category-form');
if (formCategory) {
  formCategory.addEventListener('submit', async (e) => {
    e.preventDefault();
    // open modal
    openModal();
    confirmBtn.onclick = async () => {
      const formData = new FormData(formCategory);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      const method = window.location.pathname.includes('add-category') ? 'POST' : 'PATCH';
      const url = window.location.pathname.includes('add-category')
        ? `${APIEndpoint}/category`
        : `${APIEndpoint}/category/${data.id}`;

      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${
            document.cookie
              .split('; ')
              .find((row) => row.startsWith('x-auth-token'))
              .split('=')[1]
          }`,
          'Content-Type': 'application/json',
        },
      });
      window.location.href = '/dashboard/manage-category';
    };
  });
}

// handle delete category
const deleteBtnsCategory = document.getElementsByClassName('delete-btn-category');
for (let i = 0; i < deleteBtnsCategory.length; i++) {
  deleteBtnsCategory[i].addEventListener('click', async (e) => {
    e.preventDefault();
    openModal();
    confirmBtn.onclick = async () => {
      const response = await fetch(`${APIEndpoint}/category/${deleteBtnsCategory[i].getAttribute('id')}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${
            document.cookie
              .split('; ')
              .find((row) => row.startsWith('x-auth-token'))
              .split('=')[1]
          }`,
        },
      });
      window.location.href = '/dashboard/manage-category';
    };
  });
}
