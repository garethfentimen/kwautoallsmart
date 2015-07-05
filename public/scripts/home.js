window.form = (function() {
		var main = {};

		main.formHidden = true;
		main.formContainer = $("#quote-request-form");
		main.formObject = main.formContainer.find("#quote-Form");
		
		main.toggleForm = function () {
			if (main.formHidden) {
				$(".footer").hide();
				$("#quote-request-button").animate({
				    opacity: 0
				  }, 200, function() {
				  	 var button = this;
				  	 main.formContainer.slideDown(300, function() {
							$(".footer").fadeIn();
							$(button).hide();
							$("#form-header").show();
							$('.submit-button', $(this)).attr('disabled', true);
							$("#clientFullName").focus();
						});
				  });
				
				this.formHidden = false;
			} else {
				this.formContainer.slideUp();
				this.formHidden = true;
			}
		};
		
		main.formObject.find(".submit-button").on("click", function(e) {
			e.preventDefault();
			var serialisedData = main.formObject.data().bootstrapValidator.$form.serialize();
			main.formObject.find(":input").prop("disabled", true);
			
			var anyRequiredFieldsEmpty = false;
			$(this).find(":input").each(function() {
				if ($(this).attr("required") === 'required' && $(this).val() === '')
				{
					anyRequiredFieldsEmpty = true;	
				}
			});
			
			if (anyRequiredFieldsEmpty) {
				main.formObject.find(":input").prop("disabled", false);
				return false;	
			}
			
			$.post(main.formObject.prop("action"), serialisedData, function(result) {
				main.formObject.hide();				
				var resultObj = JSON.parse(result);				
				if (resultObj.Success)
				{
					$("#quote-request-form")
						.html("<p>Thank you for filling out the form. We will be in contact very soon.</p><img class='img-responsive center-block' width='100' src='images/success.png'>")
							.slideDown();	
				}
				else {
					$("#quote-request-form")
						.html("<p>This is embarrassing, something went wrong :(. Please try again, but if this problem persists try going to the contact me page</p>")
							.slideDown(); 
				}
			}).always(function() {
			    main.formObject.find(":input").prop("disabled", false);
			});
		});

		return main;
	})();

$(document).ready(function() {

	$("#quote-request-button").on("click", function() {
		window.form.toggleForm();
	});

	$("#quote-Form").bootstrapValidator({
	    feedbackIcons: {
	        valid: 'glyphicon glyphicon-ok',
	        invalid: 'glyphicon glyphicon-remove',
	        validating: 'glyphicon glyphicon-refresh'
	    },
	    fields: {
	    	clientFullName: {
                validators: {
                    notEmpty: {
                        message: 'You must provide us with a contact number'
                    }
                }
            },
	        clientContactNumber: {
	            validators: {
	                notEmpty: {
	                    message: 'You must provide us with a contact number'
	                },
	                phone: {
                        country: 'GB',
                        message: 'The value is not valid UK phone number'
                    }
	            }
	        },
	        clientAddress: {
	        	validators: {
        			notEmpty: {
	                    message: 'You must provide us with at least the first line of your address'
	                }
	            }
	        },
	        clientPostcode: {
	        	validators: {
	        		notEmpty: {
	                    message: 'You must provide us with a post code'
	                },
	        		zipCode: {
                        country: 'GB',
                        message: 'The value is not valid UK postal code'
                    }
	        	}
	        }
	    }
	}).on('error.field.bv', function(e, data) {
        data.bv.disableSubmitButtons(true); // disable submit buttons on errors
    }).on('status.field.bv', function(e, data) {
        data.bv.disableSubmitButtons(false); // enable submit buttons on valid
		e.preventDefault();
    });
});