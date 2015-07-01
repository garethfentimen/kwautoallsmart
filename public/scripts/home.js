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
						});
				  });
				
				this.formHidden = false;
			} else {
				this.formContainer.slideUp();
				this.formHidden = true;
			}
		}

		return main;
	})();

	$(document).ready(function() {

		$("#quote-request-button").on("click", function() {
			window.form.toggleForm();
		});

		$("#quote-Form").on("submit", function(e) {
			$("#quote-Form").find(":input").prop("disabled", true);
			e.preventDefault();
			console.log($("#quote-Form").find(":input").serialize());

			$.post($("#quote-Form").prop("action"), $("#quote-Form").find(":input").serialize(), function() {
				$("#quote-Form").hide();
				$("#quote-request-form").slideDown().html("<p>Thank you for filling out the form. We will be in contact very soon.</p><img class='img-responsive center-block' width='100' src='images/success.png'>");
			}).fail(function(e) {
			    //console.log( "error", e);
		    }).always(function() {
			    $("#quote-Form").find(":input").prop("disabled", false);
			});
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
		    // ,
		    // submitHandler: function(validator, form, submitButton) {
		    //     var clientFullName = [validator.getFieldElements('clientFullName').val()];
		    //     if ()
		    //     {
		    //     	data.bv.disableSubmitButtons(true); 
		    //     }
		    // }
		}).on('error.field.bv', function(e, data) {
            data.bv.disableSubmitButtons(true); // disable submit buttons on errors
	    }).on('status.field.bv', function(e, data) {
	    	e.preventDefault();
            data.bv.disableSubmitButtons(false); // enable submit buttons on valid
	    });
	});


