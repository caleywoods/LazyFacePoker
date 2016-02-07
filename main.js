function getBirthdays() {
    var birthdays = $( '._3ng0 > div' ),
        textAreas = birthdays.find( 'textarea[name="message"]' ),
        message   = 'Happy Birthday ',
        anchors     = birthdays.find( 'a' ),
        count     = 0,
        names     = anchors.filter( function( idx ) {
                        return this.href.split( '/' )[3] !== "friendship";
                    }),
        friends   = anchors.filter( function( idx ) {
                        return this.href.split( '/' )[3] == "friendship";
                    }),
        myID      = friends[0].href.split( '/' )[4];

    textAreas.each( function( idx, node ) {
        var name     = names[idx].innerText.split( ' ' )[0],
            friendID = friends[idx].href.split( '/' )[5],
            form     = node.closest( 'form' ),
            dtsg     = $(form).find( 'input[name="fb_dtsg"]' )[0].value,
            postData = {};

        postData.__a               = '1';
        postData.birthday          = 1;
        postData.__dyn             = "";
        postData.fb_dtsg           = dtsg;
        postData.message_text      = message + name + "!";
        postData.nctr[_mod]        = 'pagelet_calendar_content'
        postData.post              = 'Post';
        postData.render_notif_only = 1;
        postData.__rev             = '2168097';
        postData.__req             = 11;
        postData.source            = 'calendar';
        postData.ttstamp           = generateTStamp( dtsg );
        postData.__user            = myID;
        postData.walltarget        = friendID;

        submitWishes( postData )
    });
}

function submitWishes( url, stuff ) {
    $.post({
        url: url,
        data: stuff,
        success: function( resp ) {
            console.log( resp );
        }
    })
}

function generateTStamp( dtsg ) {
    var u = '';
    for ( var v=0; v < dtsg.length; v++ ) {
        u += dtsg.charCodeAt( v );
        ttstamp = '2' + u;
    }
    return ttstamp;
}

$( document ).ready(function() { getBirthdays(); });