var minutes = 60000;  /*number of milliseconds in a minute*/

function letsDance() {
    $(".jiggle").each(function(i) {
        this.style.position = "relative";
        this.style.top = jiggly()+"px";
        this.style.left = Math.floor(Math.round(Math.random() * 20))+"px";
    });
}

function jiggly() {
    return 10-Math.floor(Math.round(Math.random() * 20));
}

function refreshStaff() {
  window.StaffCount++;
  $('#staff').attr('src', 'http://hackerdojo-signin.appspot.com/staff');
  $('#staffReloadCount').html(" "+window.StaffCount);
}

function refreshEvents() {
  window.EventsCount++;
  $('#events').attr('src', 'http://events.hackerdojo.com/?base=mini');
  $('#eventsReloadCount').html(" "+window.EventsCount);
}

$(document).ready(function(){
    window.EventsCount = 0;
    window.StaffCount = 0;
    setInterval(refreshStaff, 10 * minutes);
    setInterval(refreshEvents, 60 * minutes);
    setInterval(letsDance, 30 * minutes);
});
