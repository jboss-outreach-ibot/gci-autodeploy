$( document ).ready( function() {
	var org="jboss-outreach";
	var repo="gci";
	var getContributors = function(){
		jQuery.getJSON('https://api.github.com/repos/'+org+'/'+repo+'/contributors'+'?callback=?&&per_page=50',function(github_data){
			var html_cont  = "";
			var contributors = github_data.data
			$(contributors).each(function(){
			html_cont+='<div class="jboss-list-item"><div class="jboss-contrib-icon"><img src="'+this.avatar_url+'" width=100%></div><div class="jboss-contrib-name">'+this.login+'</div><div class="jboss-user-attribs"><span class="number">'+this.contributions+'</span> Contributions </div><div class="jboss-user-attribs"><a href="'+this.html_url+'">View Github Profile</a></div></div>';
			});
			$(".jboss-list").html(html_cont);
		})
	};
	var getTotalPrs =function(){
		jQuery.getJSON("https://api.github.com/orgs/jboss-outreach/repos",function(repo_list){
			var total_prs=0;
			var repos = repo_list;
			$(repos).each(function(){
				var api_pull_get = this.pulls_url;				
				jQuery.getJSON(api_pull_get.substring(0,api_pull_get.length-9),function(pr_list){
					prs = pr_list;
					total_prs+=(prs.length);
					$('.text2').html(total_prs);
				});
			});
		});
	};
	getTotalPrs();
	getContributors();
});
