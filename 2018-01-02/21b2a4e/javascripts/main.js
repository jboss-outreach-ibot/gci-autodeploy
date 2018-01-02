window.onload = function() {
  $.ajax({
    url: "https://api.github.com/orgs/jboss-outreach/repos"
  }).done(function(data) {
    data.forEach(function(repo) {
      var divRepeated = document.getElementById("repeatedCode");
      var code = "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3'><div class='card'><div class='avatar'><img id='projectImage" + repo.name + "' src='images/projects/project.png' alt='Project of JBoss'><div class='social' style='font-size: 20px; margin-top: -35px;'><b><p id='projectHeading" + repo.name + "' style='font-size: 25px;'> </p>contributors</b><br><a target='_blank' href='//github.com/jboss-outreach/" + repo.name + "'><i class='fa fa-github' style='font-size: 30px; margin: 5px;''></i></a></div><p id='projectTitle" + repo.name + "' style='display: inline-block;'></p></div></div></div>";
      divRepeated.insertAdjacentHTML('afterbegin', code);
      projectContributors(repo.name, repo.description);
    });
  });
};

"use strict";

function projectContributors(name, description){
        $.get("https://api.github.com/repos/jboss-outreach/" + name + "/contributors?page=1", function(data, status){
            var count = Object.keys(data).length;

            document.getElementById("projectImage" + name).src = imageUrl[name];
            document.getElementById("projectHeading" + name).innerHTML = count;

            if (name == "gci"){
            document.getElementById("projectTitle" + name).innerHTML = "Google Code-In Repository";
            }
            else {
            document.getElementById("projectTitle" + name).innerHTML = "&nbsp;" + name;
            }

        });
} 

let allContributors = [];

function storeContributors(contributors) {
  // Store all the contributors for the repo
  for (let contributor of contributors) {
    const index = allContributors.findIndex((element) => contributor.login === element.login);
    if (index >= 0) {
      allContributors[index].contributions += contributor.contributions;
    } else {
      allContributors.push({
        login: contributor.login,
        avatar_url: contributor.avatar_url,
        contributions: contributor.contributions,
        html_url: contributor.html_url,
      });
    }
  }
}

async function loadContributors() {
  const repos = await $.ajax("https://api.github.com/orgs/jboss-outreach/repos?per_page=100");

  // Assume a maximum of 200 contributors per repo
  const requests = repos.reduce((acc, cur) => {
    return acc.concat(
      $.get(cur.contributors_url + "?per_page=100&page=1", (data) => storeContributors(data)),
      $.get(cur.contributors_url + "?per_page=100&page=2", (data) => storeContributors(data))
    );
  }, []);
  await Promise.all(requests);

  // Build the HTML for the top 52 contributors (divisible by 4)
  allContributors
    .sort((a, b) => b.contributions - a.contributions)
    .slice(0, 52)
    .forEach((contributor) => {
      let html = "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3'><div class='card'><div class='avatar'>";
      html += "<img src=" + contributor.avatar_url + "><div class='contribs'><p style='margin-top: -2.5px !important;'>";
      html += contributor.contributions + " contribution";
      if (contributor.contributions > 1) {
        html += "s";
      }
      html += "</p><a href=" + contributor.html_url +
        " class='contributor-gh'><i class='fa fa-github fa-2x' aria-hidden='true'></i></a></div>";
      html += "<span>" + contributor.login + "</span></div></div></div>";
      $("#contributors-list").append(html);
    });
}
loadContributors();

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



var slideIndex = 0;
showSlides(slideIndex);
carousel();

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1}    
    x[slideIndex-1].style.display = "block";  
    setTimeout(carousel, 5000);
    dots[slideIndex-1].className += " active";
}



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
      $('a.menu-item').removeClass("active-menu");
      currLink.addClass("active-menu");
    } else {
      currLink.removeClass("active-menu");
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


