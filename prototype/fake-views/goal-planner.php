<style>
/** Placeholder on empty */
.goal-planner-page [contenteditable]:empty:before {
    content: attr(data-placeholder);
}
.goal-planner-page [contenteditable]:empty {
    opacity: .5;
}
/* Date visual */
.goal-planner-page .date {
  margin-left: -20px;
  width: 100%;
  text-align: center;
}

/* Milestone inputs and buttons */
.goal-planner-page .milestone-wrapper {
  display: flex;
}
.goal-planner-page .milestone-wrapper, .milestone-detail {
  margin-bottom: 5px;
  height: 30px;
}
.goal-planner-page .milestone-wrapper input {
  width: 100%;
}
.goal-planner-page .milestone-wrapper button {
  width: 40px;
  height: 30px;
  margin-right: 5px;
}
.goal-planner-page .milestone-wrapper button:nth-child(2) {
  margin-left: 5px;
}
.goal-planner-page .milestone-add {
  display: block;
  margin: 10px auto 5px 0;
}

/* Milestone details */
.goal-planner-page .milestone-detail {
  width: 90%;
}

.goal-planner-page .goal-planner-last-button-wrapper {
  margin: 20px auto;
}
.goal-planner-page .goal-planner-last-button-wrapper button {
  transform: translateX(50%);
}
.goal-planner-page .carousel-indicators li:last-child {
  background-color: red;
}
.goal-planner-page .inserting::before {
  content: "NEW\00a0";
}
.goal-planner-page .inserting {
  color:red;
}
</style>

<div class="goal-planner-page">
<div id="myCarousel" class="carousel slide" data-bs-ride="carousel">

  <ol class="carousel-indicators">
  {{#each posts}}
    <li data-bs-target="#myCarousel" data-bs-slide-to="{{@index}}" 
    class="{{#if @first}}{{/if}}"
    ></li>
  {{/each}}
  </ol>
  
  <div class="carousel-inner">

  {{#each posts}}
    <article class="carousel-item {{#if @first}}active{{/if}}">

      <div class="grid grid-wrapper" data-post-id="{{_id}}">
        <div class="item item1">
          <p class="{{#if @last}}inserting{{/if}}"><strong>Goal</strong> Setting</p>
        </div>

        <div class="item item2">
          <p><span><i class="fa fa-star"></i> Goal:</span></p>
          <p class="text html-goal" contenteditable spellcheck="false" data-placeholder="You can edit this! Enter a goal.">{{goal}}</p>
        </div>
        <div class="grid2">
          <div class="item item4">
            <p><span><i class="fa fa-star"></i> Milestones:</span></p>
            <p class="help">(what you need to do)</p>
            <!-- <p class="text" data-placeholder="You can edit this! Enter specific subgoals"></p> -->
            <div class="milestones">
              {{#each milestones}}
              <div class="milestone-wrapper">
                <input class="milestone" type="text" value="{{milestone}}" data-milestone-id={{milestone_id}} placeholder="Enter a milestone" />
                <button class="milestone-delete btn btn-success float-end" onclick="doneMilestone($(event.target))"><i class="fa fa-check"></i></button>
                <button class="milestone-delete btn btn-danger float-end" onclick="deleteMilestone($(event.target))"><i class="fa fa-times"></i></button>
              </div>
              {{/each}}
            </div>
            <button class="milestone-add btn btn-primary" onclick="addMilestone($(event.target));"><i class="fa fa-plus"></i> Add new milestone! </button>
            
          </div>
          <div class="item item3">
            <p><span>Strategy:</span></p>
            <p class="help">(how you do it)</p>
            <div class="milestone-details">
              {{#each milestones}}
                <input class="milestone-detail" data-milestone-id={{milestone_id}} type="text" value="{{detail}}"/>
              {{/each}}
              <!-- <p class="text milestone-detail" contenteditable spellcheck="false" data-placeholder="You can edit this! Enter more details"></p> -->
            </div>
          </div>
        </div>
        <div class="grid3">
          <div class="item item5">
            <p><span>Motivation:</span></p>
            <p class="help">(why do you want to achieve this goal)</p>
            <p class="text html-detail" contenteditable spellcheck="false" data-placeholder="You can edit this! Enter reasons why you want to achieve this goal">{{detail}}</p>
          </div>
          <div class="grid4">
            <div class="item item6 pt-3">
              <p class="date"><span><i class="fa fa-star"></i> Start Date</span></p>
              <p><input type="date" class="date-start" value="{{datepickerFormat start}}" /></p>
            </div>
            <div class="item item7">
              <p class="date"><span><i class="fa fa-star"></i> Target Date</span></p>
              <p><input type="date" class="date-end" value="{{datepickerFormat end}}"/></p>
            </div>
          </div> <!-- second before lsat -->
        </div>
        <div class="grid3 goal-planner-last-button-wrapper">

            {{#if @last}}
              <button class="btn btn-danger" onclick="event.preventDefault(); create_post($(event.target));"><i class="fa fa-plus"></i> Add</button>
            {{else}}
              <a href="patch-api/posts/{{_id}}" onclick="event.preventDefault(); update_post($(event.target), 'post-id');"><button class="btn btn-primary"><i class="fa fa-save"></i> Update</button></a>
            {{/if}}

        </div>
      </div> <!-- grid-wrapper -->
  </article> <!-- .carousel-item.active -->
  {{/each}}

      </div> <!-- .carousel-inner -->
    </div> <!-- .carousel.slide data-bs-ride="carousel" -->

<!-- #carouselExampleControls -->
<a class="carousel-control-prev" href="#myCarousel" role="button" data-bs-slide="prev" onclick="event.preventDefault();">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </a>
  <a class="carousel-control-next" href="#myCarousel" role="button" data-bs-slide="next" onclick="event.preventDefault();">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </a>
  </div> <!-- goal-planner-page -->

<link rel="stylesheet" href="assets/css/goal-planner.css">

<script>
  function update_post($here, datasetName) {
    var goalPostData = {
      goal: $(".html-goal").html(),
      detail: $(".html-detail").html(),
      start:$(".date-start").val(),
      end: $(".date-end").val(),
      id: getClosestDataAttribute($here, datasetName)
    }

    var $milestones = $(".milestone");
    var $milestoneDetails = $(".milestone-detail");
    // go thru every milestone, get Id, and use that Id to get milestone details. also get milestone Id if exists
    var milestoneData = $milestones.map((i,milestone)=>{
        var milestoneId = $(milestone).data("milestone-id"); // "" vs a value
        var milestoneName = $(milestone).val();
        var milestoneDetail = $milestoneDetails.eq(i).val();
        var done = $(milestone).attr("disabled")?1:0;
        return {milestoneId, milestoneName, milestoneDetail, done }
    }).toArray();
    goalPostData.milestones = milestoneData;

    // Mimick ajax
    window.req.body = goalPostData;
    // No need to get response other than error handling, just going to redirect to profile 
    hasher.setHash(`patch-api/posts/${goalPostData.id}`);
}
</script>
<script>
$(()=>{
  var myCarousel = document.querySelector('#myCarousel');
  var settings = {
    interval: false,
    wrap: true,
    touch: true
  }
  var carousel = new bootstrap.Carousel(myCarousel, settings);
  window.goalPlannerNext = carousel.next;
  window.goalPlannerPrev = carousel.prev;
});

function doneMilestone($here) {
  var $milestone = $here.closest(".milestone-wrapper");
  var whichIndex = $milestone.index();
  $milestone.find("input, button").attr("disabled", true);
  $(".milestone-detail").eq(whichIndex).attr("disabled", true);
  
}
function deleteMilestone($here) {
  var $milestone = $here.closest(".milestone-wrapper");
  var whichIndex = $milestone.index();
  $milestone.remove();
  $(".milestone-detail").eq(whichIndex).remove();
}
function addMilestone($here) {
  var $milestones = $here.prev(".milestones");
  $milestones.append(`
  <div class="milestone-wrapper">
    <input class="milestone" type="text" data-milestone-id=""/>
    <button class="milestone-delete btn btn-success float-end" onclick="doneMilestone($(event.target))"><i class="fa fa-check"></i></button>
    <button class="milestone-delete btn btn-danger float-end" onclick="deleteMilestone($(event.target))"><i class="fa fa-times"></i></button>
  </div>
  `);

  var $ancestor = $milestones.closest(".carousel-item");

  $ancestor.find(".milestone-details").append(`
    <input class="milestone-detail" type="text" data-milestone-id=""/>
  `)
}
</script>

<!-- Remove line when refactored into production code: -->
<script>$(".page-title").text("{{pageTitle}}");</script>