/* Local demonstrations only: no requests, storage or submissions. */
document.querySelectorAll('[data-demo-action]').forEach(function (button) {
  button.addEventListener('click', function () {
    document.getElementById('action-status').textContent = 'Example activated: ' + button.textContent + '.';
  });
});

var form = document.getElementById('demo-form');
var email = document.getElementById('demo-email');
var error = document.getElementById('email-error');
var formStatus = document.getElementById('form-status');
function clearError() {
  email.removeAttribute('aria-invalid');
  error.hidden = true;
  error.textContent = '';
}
email.addEventListener('input', function () { clearError(); formStatus.textContent = ''; });
form.addEventListener('submit', function (event) {
  event.preventDefault();
  clearError();
  if (!email.validity.valid) {
    email.setAttribute('aria-invalid', 'true');
    error.hidden = false;
    error.textContent = email.validity.valueMissing ? 'Error: enter an email address.' : 'Error: enter a valid email address.';
    formStatus.textContent = 'The form needs a correction.';
    email.focus();
    return;
  }
  formStatus.textContent = 'The form is valid. No data was sent.';
});
form.addEventListener('reset', function () { clearError(); formStatus.textContent = 'Form reset.'; });

var dialog = document.getElementById('demo-dialog');
document.getElementById('open-dialog').addEventListener('click', function () { dialog.showModal(); });
var progress = document.getElementById('demo-progress');
var progressButton = document.getElementById('run-progress');
var progressStatus = document.getElementById('progress-status');
progressButton.addEventListener('click', function () {
  progressButton.disabled = true;
  progressButton.setAttribute('aria-busy', 'true');
  progress.value = 0;
  progressStatus.textContent = 'Processing…';
  var timer = setInterval(function () {
    progress.value += 25;
    progress.textContent = progress.value + '%';
    if (progress.value === 100) {
      clearInterval(timer);
      progressButton.disabled = false;
      progressButton.removeAttribute('aria-busy');
      progressStatus.textContent = 'Done. The example has completed.';
    }
  }, 250);
});
