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
}
.goal {

}
.detail {
    font-weight: 200;
}
.dates::before {
    content: "Duration:\00a0"
}
.post-owner {
    text-align: center;
}
.milestone-wrapper {
    width: 75%;
    border-radius: 5px;
    margin: 0 auto;
    border: 1px solid gray;
}
.comment-wrapper {
    width: 75%;
    border-radius: 5px;
    margin: 0 auto;
    border: 1px solid gray;
}
.clear-fix {
    clear: both;
}
</style>

<div class="mb-3 posts">
<!-- World View. All Public posts, goals, milestones, and comments are here. -->

{{#each posts}}
<div class="post" data-post-id={{_id}} data-owner-id={{user_id}}>
    <div class="">
        <figure class="post_user_info p-2">
            <img class="avatar" src="assets/img/users-default-avatars/{{avatar}}.png"></img>
            <figcaption class="post-owner">{{post_username}}</figcaption>
        </figure>
        <div class="goal"><label>Goal: </label><span>{{goal}}</span></div>
        <div class="detail"><label>Detail: </label><span>{{detail}}</span></div>

        <div class="dates mt-3">
            <span class="start">{{date start}}</span> - <span class="end">{{date end}}</span>
        </div>
        <div class="clear-fix"></div>
    </div>
    <!-- <div>
        <button onclick="getClosestDataAttribute($(event.target), 'post-id');">Test data attributes</button>
    </div> -->
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
            <div class="tab-pane fade show active" role="tabpanel" aria-labelledby="home-tab">
                <div class="milestones-wrapper">
                {{#each milestones}}
                    <div class="milestone-wrapper mt-2 mb-2 p-1" data-milestone-id={{milestone_id}}>
                        <div><labe>Milestone: </labe><span>{{milestone}}</span></div>
                        <div><labe>Detail: </labe><span>{{detail}}</span></div>
                    </div>
                {{/each}}
                </div>
            </div>
            <div class="tab-pane fade" role="tabpanel" aria-labelledby="profile-tab">
                <div class="comments-wrapper">
                {{#each comments}}
                <div class="comment-wrapper mt-2 mb-2 p-1" data-comment-id={{comment_id}} data-post-id={{post_id}} data-user-id={{user_id}}>
                    <div><label>Comment: </label><span>{{comment}}</span></div>
                </div>
                {{/each}}
                </div>
            </div>
        </div>
    </div> <!-- Tabs and their contents -->
    
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
