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

function refreshPage() {
  $.ajax({
    url: '/',
    success: function(data) {
      var tmp = window.i;
      if (window.oldint) {
        clearTimeout(window.oldint);
      }      
      $('#body').html(data);
      if (window.oldint) {
        clearTimeout(window.oldint);
      }      
      window.i = tmp + 1;
      $('#reloadcount').html(" "+window.i);
      window.oldint = setInterval(refreshPage, 2 * 60 * 1000);
    }
  });
}

$(document).ready(function(){
    window.i = 0;
    window.oldint = setInterval(refreshPage,2 * 60 * 1000);
    letsDance();
});
