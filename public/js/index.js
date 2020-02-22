(function( $ ) {
    function validateField( field ) {
        if( field.val().length === 0 || /^\s+$/.test( field.val() ) ) {
            field.addClass( "is-invalid" );
        }
        if( field.attr( "type" ) === "number" ) {
            if( !/^\d+$/.test( field.val() ) ) {
                field.addClass( "is-invalid" );
            }
        }
    }

    function validateForm( form ) {

        form.find( ".alert-danger" ).remove();
        form.find( ".is-invalid" ).removeClass( "is-invalid" );

        form.find( ":input" ).not( ":submit" ).each(function() {
            validateField( $( this ) );
        });
        if( $( ".is-invalid" ).length ) {
            form.append( '<div class="alert alert-danger mt-5">I dati inseriti non sono validi.</div>' );
            return false;
        }
        return true;
    }
    $(function() {
        if( $( ".table" ).length ) {
            $( ".table" ).DataTable({
                language: {
                    url: "https://cdn.datatables.net/plug-ins/1.10.20/i18n/Italian.json"
                }
            });
        }
        if( $( "#user-form" ).length ) {
            $( "#start" ).autoComplete({
                resolver: "custom",
                formatResult: function ( item ) {
                    return {
                        value: item.progressiva_km,
                        text: item.nome
                    };
                },
                events: {
                    search: function ( qry, callback ) {
                        $.ajax(
                            "/api/caselli",
                            {
                                data: { term: qry }
                            }
                        ).done(function ( res ) {
                            callback( res.results )
                        });
                    }
                }
            }).on( "autocomplete.select", function ( evt, item ) {
                $( "#start" ).data( "km", item.progressiva_km );
            });

            $( "#arrival" ).autoComplete({
                resolver: "custom",
                formatResult: function ( item ) {
                    return {
                        value: item.progressiva_km,
                        text: item.nome
                    };
                },
                events: {
                    search: function ( qry, callback ) {
                        $.ajax(
                            "/api/caselli",
                            {
                                data: { term: qry }
                            }
                        ).done(function ( res ) {
                            callback( res.results )
                        });
                    }
                }
            }).on( "autocomplete.select", function ( evt, item ) {
                $( "#arrival" ).data( "km", item.progressiva_km );
            });

            $( document ).on( "focus", ".is-invalid", function() {
                $( this ).removeClass( "is-invalid" );
            });

            $( "#user-form" ).on( "submit", function( e ) {
                e.preventDefault();
                var $form = $( this );
                var valid = validateForm( $form );

                $form.find( ".alert" ).remove();
                $form.find( ".is-invalid" ).removeClass( "is-invalid" );

                if( valid ) {
                    var data = {
                        start: $( "#start" ).data( "km" ),
                        arrival: $( "#arrival" ).data( "km" ),
                        model: $( "#model" ).val(),
                        brand: $( "#brand" ).val(),
                        plate: $( "#plate" ).val(),
                        year: $( "#year" ).val(),
                        axles: $( "#axles" ).val(),
                        weight: $( "#weight" ).val(),
                        height: $( "#height" ).val(),
                        class_veic: $( "#class_veic" ).val(),
                        class_env: $( "#class_env" ).val()
                    };

                    $.post( "/api/calculate", data, function( res ) {
                        if( res.errors ) {
                            $.each( res.errors, function( i, err ) {
                                for( var field in err ) {
                                    $( "#" + field ).addClass( "is-invalid" ).after( '<div class="alert alert-danger mt-5">' + err[field] + '</div>' );
                                }
                            });
                        } else if(res.done) {
                            window.location = '/pagamento';
                        }
                    });
                }
            });
        }
    });
})( jQuery );