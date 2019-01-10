/*
    This is the global custom javascript file
    to overwrite the main js functions or for
    adding new features or integrations.
*/

$( document ).ready( function () {
    /*
        Defining all the validation rules
        for our signup form.
    */
	$( "#signupForm" ).validate( {
		rules: {
			first_name: {
				required: true,
				maxlength: 50
			},
			last_name: {
				required: true,
				maxlength: 50
			},
			email: {
				required: true,
				email: true,
				maxlength: 100
			},
			phone: {
				minlength: 11,
				maxlength: 20
			}
		},
		messages: {
			first_name: {
				required: "Please enter your first name",
				maxlength: "Your first name cannot be longer than 50 characters"
			},
			last_name: {
				required: "Please enter your last name",
				maxlength: "Your last name cannot be longer than 50 characters"
			},
			email: {
				required: "Please enter your email address",
				email: "Please enter a valid email address",
				maxlength: "Your email address cannot be longer than 100 characters"
			},
			phone: {
				minlength: "Your phone number must consist of at least 10 characters <br /> (format: (358) 040-1234567 )",
				maxlength: "Your phone number must consist of no more than 20 characters <br /> (format: (358) 040-1234567 )"
			}
			
		},
		errorElement: "em",
		errorPlacement: function ( error, element ) {
			// Add the `invalid-feedback` class to the error element
			error.addClass( "invalid-feedback" );

			if ( element.prop( "type" ) === "checkbox" ) {
				error.insertAfter( element.next( "label" ) );
			} else {
				error.insertAfter( element );
			}
		},
		highlight: function ( element, errorClass, validClass ) {
			$( element ).addClass( "is-invalid" ).removeClass( "is-valid" );
		},
		unhighlight: function (element, errorClass, validClass) {
			$( element ).addClass( "is-valid" ).removeClass( "is-invalid" );
		}
	} );
	
	// Add the mask format for phone number field
	$("#phone").mask("(999) 999-9999999");
    
    // Allowing only alphabets in name fields 
    $('.alphaonly').bind('keyup blur',function(){ 
        var input = $(this);
        input.val(input.val().replace(/[^a-zA-Z ]/g,'') ); }
    );
    
    // Let's post our data to API and fetch results
    function processForm( e ){
        $.ajax({
            url: './apps/register.php',
            dataType: 'json',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded',
            data: $(this).serialize(),
            success: function( data, textStatus, jQxhr ){
                $('#response').addClass( data.type );
                $('#response').html( data.message );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( jqXhr.status + " " + errorThrown  );
                $('#response').addClass( "alert-danger" );
                $('#response').html( "Something went wrong please report to us." );
            }
        });

        e.preventDefault();
    }
    $('#signupForm').submit( processForm );

} );