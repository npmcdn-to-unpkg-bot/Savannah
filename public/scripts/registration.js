$(document).ready(function () {
  const registrationForm = $('.registration-form');
  registrationForm.submit(function (e) {
    // Prevent the form from submitting so
    // we can validate it before sending it
    e.preventDefault();

    // Remember some fields
    const usernameField = $('[name="username"]');
    const fullNameField = $('[name="full_name"]')
    const emailField = $('[name="email_address"]');

    // Patterns to compare field values against
    const usernamePattern = /^\s*[a-z0-9_(\s)*-]+$/ig;
    const fullNamePattern = /^[\w ]+$/ig;
    const emailPattern = /^([\w\.\-]+)@([\w\-]+)(([\.]*(\w){2,3})+)$/ig;

    // Determine whether each field has a valid value
    const invalidUsername = !usernamePattern.test(usernameField.val());
    const invalidFullName = !fullNamePattern.test(fullNameField.val());
    const invalidEmailAddress = !emailPattern.test(emailField.val());

    // Show bad data messages unless they're already showing
    if (invalidUsername && $('#badUsernameMessage').length == 0) {
      usernameField.before('<p class="message" id="badUsernameMessage">This username looks goofy.</p>')
    } else if (invalidUsername == false && $('#badUsernameMessage').length > 0) {
      // They fixed it so we'll get rid of the message
      $('#badUsernameMessage').hide();
      trySubmitting();
    }

    if (invalidFullName && $('#badFullNameMessage').length == 0) {
      fullNameField.before('<p class="message" id="badFullNameMessage">This looks a little weird.</p>');
    } else if (invalidFullName == false && $('#badFullNameMessage').length > 0) {
      // They fixed it so we'll get rid of the message
      $('#badFullNameMessage').hide();
      trySubmitting();
    }

    if (invalidEmailAddress && $('#badEmailAddressMessage').length == 0) {
      emailField.before('<p class="message" id="badEmailAddressMessage">This email address looks wrong.</p>')
    } else if (invalidEmailAddress == false && $('#badEmailAddressMessage').length > 0) {
      // They fixed it so we'll get rid of the message
      $('#badEmailAddressMessage').hide();
      trySubmitting();
    }

    function trySubmitting () {
      if (!invalidUsername && !invalidFullName && !invalidEmailAddress) {
        $('.registration-form')[0].submit();
      }
    }
  });
});
