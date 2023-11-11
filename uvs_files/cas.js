/*
 * Licensed to Jasig under one or more contributor license
 * agreements. See the NOTICE file distributed with this work
 * for additional information regarding copyright ownership.
 * Jasig licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License.  You may obtain a
 * copy of the License at the following location:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var editInnerHTML = "";
var deleteInnerHTML = "";
var currentRow = null;

function swapButtonsForConfirm(rowId, serviceId) {

    resetOldValue();
    var editCell = $("#edit"+rowId);
    var deleteCell = $("#delete"+rowId);

    var row = $("#row" + rowId);
    row.removeClass("over");
    row.addClass("highlightBottom");

    editInnerHTML = editCell.html();
    deleteInnerHTML = deleteCell.html();
    currentRow = rowId;
    
    editCell.html("Really?");
    deleteCell.html("<a id=\"yes\" href=\"deleteRegisteredService.html?id=" + serviceId + "\">Yes</a> <a id=\"no\" href=\"#\" onclick=\"resetOldValue();return false;\">No</a>");
}

function resetOldValue() {
    if (currentRow != null) {
        var curRow = $("#row"+currentRow);
        curRow.removeClass("over");
        curRow.removeClass("highlightBottom");
        var editCell = $("#edit"+currentRow);
        var deleteCell = $("#delete"+currentRow);

        editCell.html(editInnerHTML);
        deleteCell.html(deleteInnerHTML);
       
        editInnerHTML = null;
        deleteInnerHTML = null;
        currentRow = null;
    }
}

$(document).ready(function(){

    //focus username field
   $("input:visible:enabled:first").focus();
    //flash error box
    $('#msg.errors').animate({ backgroundColor: 'rgb(187,0,0)' }, 30).animate({ backgroundColor: 'rgb(255,238,221)' }, 500);
    if( $('#msg.errors').is(':animated') ) {
        $("#ContentHelp").css("border", "1px dotted #BB0000");
        $('#ContentHelp').css("display", "block");
        $('#ContentHelp').animate({ backgroundColor: 'rgb(187,0,0)' }, 30).animate({ backgroundColor: 'rgb(255,238,221)' }, 500);
     }
    //flash success box
    $('#msg.success').animate({ backgroundColor: 'rgb(51,204,0)' }, 30).animate({ backgroundColor: 'rgb(221,255,170)' }, 500);
    //flash info box
    $('#msg.info').animate({ backgroundColor: 'rgb(0,72,204)' }, 30).animate({ backgroundColor: 'rgb(227,239,255)' }, 500);
    //DEBUG
    // if (!window.console || window.console == {}) {
    //     window.console.log = function() {};
    //}

    //TOOLTIP LYON 1
    $('#show_hide').click(function() {
    $('#ContentHelp').slideToggle('slow');
        return false;
    });
    var targets = $( '[rel~=tooltip]' ),
        target  = false,
        tooltip = false,
        title   = false;
        targets.bind( 'mouseenter', function()  {
            target  = $( this );
            tip     = target.attr( 'title' );
            tooltip = $( '<div id="tooltip"></div>' );
            if( !tip || tip == '' )
                return false;
            target.attr('title','');
            tooltip.css( 'opacity', 0 )
                   .html( tip )
                   .appendTo( 'body' );
            var init_tooltip = function() {
                if( $( window ).width() < tooltip.outerWidth() * 1.5 )
                                          tooltip.css( 'max-width', $( window ).width() / 2 );
                    else
                        tooltip.css( 'max-width', 340 );
                    var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
                        pos_top  = target.offset().top - tooltip.outerHeight() - 20;
                    if( pos_left < 0 ) {
                        pos_left = target.offset().left + target.outerWidth() / 2 - 20;
                        tooltip.addClass( 'left' );
                    }
                    else
                        tooltip.removeClass( 'left' );
                    if( pos_left + tooltip.outerWidth() > $( window ).width() ) {
                        pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
                        tooltip.addClass( 'right' );
                    }
                    else
                        tooltip.removeClass( 'right' );
                    if( pos_top < 0 ) {
                        var pos_top  = target.offset().top + target.outerHeight();
                        tooltip.addClass( 'top' );
                    }
                    else
                        tooltip.removeClass( 'top' );
                        tooltip.css( { left: pos_left, top: pos_top } )
                               .animate( { top: '+=10', opacity: 1 }, 50 );
            };
            init_tooltip();
                $( window ).resize( init_tooltip );
                var remove_tooltip = function() {
                    tooltip.animate( { top: '-=10', opacity: 0 }, 50, function() {
                        $( this ).remove();
                    });
                target.attr( 'title', tip );
                };
                target.bind( 'mouseleave', remove_tooltip );
                tooltip.bind( 'click', remove_tooltip );
            });


});