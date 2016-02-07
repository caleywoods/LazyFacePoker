function getBirthdays() {
    var birthdays = $( '._3ng0 > div' ),
        textAreas = birthdays.find( 'textarea[name="message"]' ),
        message   = 'Happy Birthday ',
        anchors   = birthdays.find( 'a' ),
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
            dtsg     = $( form ).find( 'input[name="fb_dtsg"]' )[0].value,
            postData = {};

            node.val = message + name + "!";
            node.value = message + name + "!";
            node.innerText = message + name + "!";

        postData.fb_dtsg           = dtsg;
        postData.message_text      = message + name + "!";
        postData.__user            = myID;
        postData.walltarget        = friendID;

        var toSend = message + name + "!";

        // submitWishes( postData )
        submitForm( node, form, toSend);
    });
}

function submitForm(textarea, form, message) {
    textarea.value = message;

    var segments = []

    for (var i = 0, length = form.elements.length; i < length; i++) {
        var field = form.elements[i];
        // Skip fields without a name
        if (!field.hasAttribute["name"]) {
            continue;
        }
        segments.push(field.name + "=" + field.value);
    }

    //Someone loves var X
    var x = new XMLHttpRequest();
    x.onload = submitFormSuccess;
    x.open("POST", form.action, true);
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    x.send(segments.join("&"));

}

function submitFormSuccess(e) {
    console.log(e.responseText);
}

$( document ).ready(function() { getBirthdays(); });