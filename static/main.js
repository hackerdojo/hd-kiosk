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
  $('#staff').attr('src', 'http://hackerdojo-signin.appspot.com/staff');
  window.StaffCount++;
  $('#staffReloadCount').html(" "+window.StaffCount);
  window.oldStaffInt = setTimeout(refreshStaff, 2 * minutes);
  letsDance();
}

function refreshEvents() {
  $('#events').attr('src', 'http://events.hackerdojo.com/?base=mini');
  window.EventsCount++;
  $('#eventsReloadCount').html(" "+window.EventsCount);
  window.oldEventsInt = setTimeout(refreshEvents, 6 * 60 * minutes);
}

$(document).ready(function(){
    window.EventsCount = 0;
    window.StaffCount = 0;
    window.oldStaffInt = setTimeout(refreshStaff,0.25 * minutes);
    window.oldEventsInt = setTimeout(refreshEvents,6 * 60 * minutes);
    letsDance();
});
