// Add your function at the end. First function is of highest priority.
var contributorsList = [];
var thank = function() {
  var j = 0;
  setInterval(function() {
    $('#name').fadeOut(function() {
      if (j === contributorsList.length) {
        j = 0;
      }
      $(this).html("Thanks for your contributions, " + contributorsList[j++]);
      $(this).fadeIn();
    });
  }, 6000);
};

//Line

var getContributors = function(page) {
  // Fetching contributors list
  $.ajax({
      url: "https://api.github.com/repos/jboss-outreach/gci/contributors?page=1&&per_page=50"
  }).done(function(data) {
      var l = data.length;
      for(i = 0 ; i < l ;i++) {
	  for(j = i+1 ; j < l ;j++) {
	      var v1 = data[i].contributions , v2 = data[j].contributions;
	      if(v2 > v1) {
		  [data[i], data[j]] = [data[j], data[i]];
	      }
	  }
      }
    if (data.length === 0) {
      // Fetching is done, now display name in Thanks section
      thank();
      return;
    }
      var html_cont="";
      data.forEach(function(contributors) {
      contributorsList.push(contributors.login);
	var contributor =  contributors;
	  html_cont+='<div class="jboss-list-item"><div class="jboss-contrib-icon">'+
	      '<img src="'+contributor.avatar_url+'" style="width:100%;height: 100%;"></div>'+
	      '<div class="jboss-contrib-name">'+contributor.login+'</div>'+
	      '<div class="jboss-user-attribs"><span class="number">'+contributor.contributions+'</span> Contributions </div>'+
	      '<div class="jboss-user-attribs"><a href="'+contributor.html_url+'">View Github Profile</a></div></div>';

    });
      $(".jboss-list").html(html_cont);
  });
};
	  

// Calling recursion function
$(getContributors(1));

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
// Start ignoring JSHintBear
$(function() {
  var issueElement;
  $.ajax({
    url: "https://api.github.com/repos/fossasia/gci16.fossasia.org/issues?state=open"
  }).done(function(data) {
    var labels = [];
    var labelNames = [];
    var mainWrapper = $("#issues-categories-wrapper");
    for (var i = 0; i < data.length; i++) {
      if (data[i].hasOwnProperty("pull_request") || data[i].closed_at !== null) {
        data.splice(i, 1);
        i--;
        continue;
      }
    }
    for (i = 0; i < data.length; i++) {
      if (data[i].labels.length === 0) {
        issueElement = $('<div class="issue"></div>')
                .append($('<div class="issue-left"></div>')
                  .append($("<span></span>").append(data[i].number))
                  .append($("<a></a>").attr("target", "_blank").attr("href", data[i].html_url).append(data[i].title))
                  .append($("<p>Opened by </p>").append($("<a></a>").append(data[i].user.login).attr("href", data[i].user.html_url).attr('target', '_blank')))
                )
                .append($('<div class="issue-right"></div>')
                  .append($("<a class='comments'></a>")
                    .attr("href", data[i].html_url)
                    .attr('target', '_blank')
                    .append($("<i class='fa fa-comment'></i>"))
                    .append(data[i].comments))
                );
        issueElement.appendTo($("#unlabeled-category"));
      }
      for (var j = 0; j < data[i].labels.length; j++) {
        if ($.inArray(data[i].labels[j].name, labelNames) === -1) {
          labelNames.push(data[i].labels[j].name);
          labels.push(data[i].labels[j]);
        }
      }
    }
    for (i = 0; i < labels.length; i++) {
      var categoryElement = $('<div class="issues-category"></div>');
      var titleButton = $('<div class="button"></div>')
          .append($('<a></a>').append(labels[i].name).attr("href", labels[i].html_url))
          .css("background", "#" + labels[i].color);
      categoryElement.append(titleButton);
      for (j = data.length - 1; j >= 0; j--) {
        for (var k = data[j].labels.length - 1; k >= 0; k--) {
          if (data[j].labels[k].name === labels[i].name) {
            // all hail .append()
            // build the issue element
            issueElement = $('<div class="issue"></div>')
                .append($('<div class="issue-left"></div>')
                  .append($("<span></span>").append(data[j].number))
                  .append($("<a></a>").attr("target", "_blank").attr('href', data[j].html_url).append(data[j].title))
                  .append($("<p>Opened by </p>").append($("<a></a>").append(data[j].user.login).attr("href", data[j].user.html_url).attr('target', '_blank')))
                )
                .append($('<div class="issue-right"></div>')
                  .append($("<a class='comments'></a>")
                    .attr("href", data[j].html_url)
                    .attr('target', '_blank')
                    .append($("<i class='fa fa-comment'></i>"))
                    .append(data[j].comments))
                );
            categoryElement.append(issueElement);
          }
        }
      }
      mainWrapper.append(categoryElement);
    }
  });
});
$(document).ready(function() {
  $(document).on("scroll", onScroll);
});
// Stop ignoring
function onScroll() {
  var scrollPos = $(document).scrollTop();
  $('a.menu-item').each(function() {
    var currLink = $(this);
    var refElement = $(currLink.attr("href"));
    if (typeof(refElement.position()) === 'undefined') {
      refElement = $("#projects");
    }
    if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
      $('a.menu-item').removeClass("active");
      currLink.addClass("active");
    } else {
      currLink.removeClass("active");
    }
  });
}

$(".menu-item").click(function(){
    $("#collapse").removeClass("in");
});

var modalShown = false;

$(".card").click(function() {
    console.log("it was clicked");
    if (!modalShown) {
        $(this).next(".modal").css("display", "block");
        modalShown = true;
    }
});

$(".close").click(function() {
    $(this).parent().css("display", "none");
    modalShown = false;
    // window.opener.location.reload(false);
});

//Import Latest Issues
var issueOpenSvg =
  '<svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z" fill="white"></path></svg> ';
var issueClosedSvg =
  '<svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M7 10h2v2H7v-2zm2-6H7v5h2V4zm1.5 1.5l-1 1L12 9l4-4.5-1-1L12 7l-1.5-1.5zM8 13.7A5.71 5.71 0 0 1 2.3 8c0-3.14 2.56-5.7 5.7-5.7 1.83 0 3.45.88 4.5 2.2l.92-.92A6.947 6.947 0 0 0 8 1C4.14 1 1 4.14 1 8s3.14 7 7 7 7-3.14 7-7l-1.52 1.52c-.66 2.41-2.86 4.19-5.48 4.19v-.01z" fill="white"></path></svg> ';
$.ajax({
  type: "GET",
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  headers: { Accept: "application/vnd.github.v3+json" },
  url:
    "https://api.github.com/search/issues?q=@jboss-outreach+label:codein&sort=created&order=desc",
  success: function(data, status, jqXHR) {
    var result = $.parseJSON(JSON.stringify(data));
    $("#issueList").fadeOut(function() {
      $("#issueList").html(
        '<div class="list-group-item row font-weight-bold"><strong><div class="col-xs-6">Issue Name</div><div class="col-xs-4">Repository</div><div class="col-xs-2"><span class="issueBadge">Status</span></div></strong></div>'
      );
      var maxIterations = result.total_count < 10 ? result.total_count : 10;
      for (var i = 0; i < maxIterations; i++) {
        var item = result.items[i];
        var myRegexp = /github\.com\/jboss-outreach\/(.+?)\/issues/i;
        var match = myRegexp.exec(item.html_url);
        var issueStateHTML =
          '<span class="issueBadge ' +
          (item.state == "open"
            ? 'issueOpen">' + issueOpenSvg
            : 'issueClosed">' + issueClosedSvg) +
          item.state +
          "</span>";
        $("#issueList").append(
          '<a href="' +
            item.html_url +
            '" class="row list-group-item ' +
            (item.state == "open"
              ? "list-group-item-success"
              : "list-group-item-danger") +
            '">' +
            '<div class="col-xs-6">' +
            item.title +
            '</div><div class="col-xs-4">' +
            match[1] +
            '</div><div class="col-xs-2">' +
            issueStateHTML +
            "</div></a>"
        );
      }
      $("#issueList").fadeIn();
    });
  }
});


