<style>
.avatar {
    width: 80px;
    height: 80px;
    border-radius:50%; /* Round avatar */
}
.post:first-child {
    margin-top:20px;
}
.post {
    padding: 10px;
    border: 5px solid black;
    margin-bottom: 20px;
}
.post_user_info {
    float: right;
    padding: 10px;
}
.content {
    float: left;
}
.clear-fix {
    clear: both;
}
</style>

<div class="mb-3 posts">World View. All Public posts, goals, milestones, and comments are here.

{{#each posts}}
<div class="post">
    <div class="">
        <figure class="post_user_info">
            <img class="avatar" src="assets/img/users-default-avatars/{{avatar}}.png"></img>
            <figcaption>{{post_username}}</figcaption>
        </figure>
        <span class="content">{{content}}</span>
        <div class="clear-fix"></div>
    </div>
    <div class="">
        <ul class="nav nav-tabs js-a" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="home" aria-selected="true">Milestones</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="profile" aria-selected="false">Comments</a>
            </li>
        </ul>
        <div class="tab-content js-b">
            <div class="tab-pane fade show active" role="tabpanel" aria-labelledby="home-tab">Milestones go here</div>
            <div class="tab-pane fade" role="tabpanel" aria-labelledby="profile-tab">Comments go here</div>
        </div>
    </div> <!-- Tabs and their contents -->
    <div class="pt-4 text-xs text-right">Note: The div should store this information: <code>data-post-id={{_id}}</code> and <code>data-owner-id={{user_id}}</code></div>
    
</div> <!-- post -->
{{/each}}

</div> <!-- posts -->

<script>
$(()=>{
    /**
     * A post tab is clicked. Two important components are A  which is the tabs,
     * and components B which is the appropriate content below the selected tab.
     * Information displayed through this manner can be milestones, comments, and 
     * more for that particular post. For this code to work, components A must be
     * adjacent sibling before components B.
     * 
     */
    $(".js-a a").on("click", ev=>{
        ev.preventDefault();
        var $contextDom = $(ev.target);
        var $a = $contextDom;
        var $componentA = $contextDom.closest(".js-a");

        // Change tab active state
        $componentA.find("a").removeClass("active");
        $a.addClass("active");
        var whichTab = $a.parent("li").index();

        // Activate the content based on the index position of the active tab
        var $componentB = $componentA.next(".js-b");
        $componentB.find(".tab-pane").removeClass("active show")
        $componentB.find(".tab-pane").eq(whichTab).addClass("active show")

    })
});
</script>

<!-- Remove line when refactored into production code: -->
<script>$(".page-title").text("{{pageTitle}}");</script>