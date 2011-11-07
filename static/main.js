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
  $.ajax({
    url: 'http://hackerdojo-signin.appspot.com/staff',
    success: function(data) {
      $('#staff').src(data);
      window.oldStaffInt = setInterval(refreshPage, 2 * minutes);
    }
  });
}

function refreshEvent() {
  $.ajax({
    url: 'http://events.hackerdojo.com/?base=mini',
    success: function(data) {
      $('#events').src(data);
      window.oldEventsInt = setInterval(refreshPage, 6 * 60 * minutes);
    }
  });
}

$(document).ready(function(){
    window.oldStaffInt = setInterval(refreshPage,2 * minutes);
    window.oldEventsInt = setInterval(refreshPage,6 * 60 * minutes);
    letsDance();
});
