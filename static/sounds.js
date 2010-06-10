function letsDance() {
    document.body.style.background="#"+randhex()+randhex()+randhex()+randhex()+randhex()+randhex();
    var fore = "#"+randhexlight()+randhexlight()+randhexlight()+randhexlight()+randhexlight()+randhexlight();

    $(".jiggle").each(function(i) {
        this.style.color = fore;
        this.style.position = "relative";
        this.style.top = jiggly()+"px";
        this.style.left = Math.floor(Math.round(Math.random() * 20))+"px";
    });
}

function jiggly() {
    return 10-Math.floor(Math.round(Math.random() * 20));
}

function randhex() {
    return String.fromCharCode(97 + Math.round(Math.random() * 6));
}

function randhexlight() {
    return Math.round(Math.random() * 6);
}

function showmsg(m) {
    msgbox = document.getElementById("msg");
    msgbox.style.display="block";
    msgbox.innerHTML = m;
    setTimeout('msgbox.style.display="none";',10000);
}

function playsound(file) {
    $('body').append('\<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="165" height="38" id="niftyPlayer1" align="">\<param name=movie value="/static/niftyplayer.swf?file='+file+'&as=1">\<param name=quality value=high>\<param name=bgcolor value=#FFFFFF>\<embed src="/static/niftyplayer.swf?file='+file+'&as=1" quality=high bgcolor=#FFFFFF width="0" height="0" name="niftyPlayer1" align="" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer">\<\/embed>\<\/object>');
    setTimeout(function(){ $("#niftyPlayer1").remove(); }, 4000);
}

function gotMsg(msg) {
    msg = eval("(" + msg + ")");
    if (msg["say"] != null) {
        playsound("http://chapaai.adamsmith.as:8999/speech?text="+msg["say"]);
    }
    if (msg["text"] != null) {
        showmsg(msg["text"]);
    }
    document.getElementById("staff").src = document.getElementById("staff").src;
    waitForMsg();
}

function waitForMsg(){ $('body').append('\<script type="text/javascript" src="http://live.readyinrealtime.com/hackerdojo-signin?callback=gotMsg">\<\/script>'); }

$(document).ready(function(){
    setTimeout(waitForMsg, 4000);
    //letsDance();
});
