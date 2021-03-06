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

.goal-planner-page .main-buttons-wrapper {
  margin: 20px auto;
}
.goal-planner-page .main-buttons-wrapper a {
  margin-top: 10px;
  margin-right: 10px;
  width: 68px;
  display: inline-block;
}
.txf-50pc-right {
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
/** Fix bug where carousel arrow blocks top menu items from working */
.carousel-control-next, .carousel-control-prev {
  margin-top:50px;
}

/** Autocomplete dropdown styling to remove bullet style */
.ui-autocomplete {
    z-index: 99999;
    background-color:white;
    border-left: 1px solid gray;
   margin-left: 0;
   padding-left: 5px;
   font-size: 1.25rem;
   font-style: Arial;
 }
 .ui-autocomplete li {
   list-style: none;
   margin-left: 0;
   padding-left: 0;
 }
 .ui-helper-hidden-accessible {
   display: none;
 }
</style>

<script>
// Sets recommendations for milestone autocompletion
// TODO: For recommendations, you want to setup an api route that gives this information back to window.recommendations
window.recommendations = [];
(async() => { return await window.milestones.find().toArray() })().then(arr=>{ window.recommendations = arr.map(obj=>obj.milestone); });
</script>
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
        <div class="grid3 main-buttons-wrapper">

            {{#if @last}}
              <a class="txf-50pc-right" href="#" onclick="event.preventDefault(); create_post($(event.target), 'post-id');"><button class="btn btn-danger"><i class="fa fa-plus"></i> Add</button></a>
            {{else}}
              <a href="#" onclick="event.preventDefault(); update_post($(event.target), 'post-id');"><button class="btn btn-primary"><i class="fa fa-save"></i> Update</button></a>
              <a href="#" onclick="event.preventDefault(); delete_post($(event.target), 'post-id');"><button class="btn btn-secondary"><i class="fa fa-trash"></i> Delete</button></a>
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
  function delete_post($here, datasetName) {
  if(!confirm("Are you sure you want to delete this post / goal?" ))
    return;
    var postId = getClosestDataAttribute($here, datasetName);
    hasher.setHash(`delete-api/posts/${postId}`);
  } // delete_post

  function update_post($here, datasetName) {
    var $context = $here.closest(`[data-${datasetName}]`);
    var goalPostData = {
      goal: $context.find(".html-goal").html(),
      detail: $context.find(".html-detail").html(),
      start: $context.find(".date-start").val(),
      end: $context.find(".date-end").val(),
      _id: $context.data(datasetName)
    }

    var $context = $here.closest(`[data-${datasetName}]`);
    var $milestones =  $context.find(".milestone");
    var $milestoneDetails =  $context.find(".milestone-detail");
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
} // update_post

function create_post($here, datasetName) {
  var $context = $here.closest(`[data-${datasetName}]`);
    var goalPostData = {
      goal: $context.find(".html-goal").html(),
      detail: $context.find(".html-detail").html(),
      start: $context.find(".date-start").val(),
      end: $context.find(".date-end").val(),
      _id: null // similar to update_post but there's no existing psot id
    }


    var $milestones =  $context.find(".milestone");
    var $milestoneDetails =  $context.find(".milestone-detail");
    // go thru every milestone, get Id, and use that Id to get milestone details. also get milestone Id if exists
    var milestoneData = $milestones.map((i,milestone)=>{
        var milestoneId = $(milestone).data("milestone-id"); // "" vs a value
        var milestoneName = $(milestone).val();
        var milestoneDetail = $milestoneDetails.eq(i).val();
        var done = $(milestone).attr("disabled")?1:0;
        return {milestoneId, milestoneName, milestoneDetail, done }
    }).toArray();
    goalPostData.milestones = milestoneData;
    // debugger;

    // Mimick ajax
    window.req.body = goalPostData;
    // No need to get response other than error handling, just going to redirect to profile 
    hasher.setHash(`post-api/posts/`);
} // create_post

</script>

<script>
/** Onload disable milestones that are done */
var milestonesToDisable = [];
{{#each posts}}
  {{#each milestones}}
    {{#if done}}
    milestonesToDisable.push({{milestone_id}});
    {{/if}}
  {{/each}}
{{/each}}

for(var i=0; i<milestonesToDisable.length; i++) {
  var milestoneId = milestonesToDisable[i];
  $(`[data-milestone-id="${milestoneId}"]`).attr("disabled", true).addClass("bg-secondary text-white border-success");
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
  var $milestoneWrapper = $here.closest(".milestone-wrapper");
  var whichIndex = $milestoneWrapper.index();
  var $milestone = $milestoneWrapper.find("input");
  var wasDisabled = $milestone.attr("disabled")?true:false;
  if(!wasDisabled) {
    $milestone.attr("disabled", true).addClass("bg-secondary text-white border-success");
    $(".milestone-detail").eq(whichIndex).attr("disabled", true).addClass("bg-secondary text-white border-success");
  } else {
    $milestone.attr("disabled", false).removeClass("bg-secondary text-white border-success");
    $(".milestone-detail").eq(whichIndex).attr("disabled", false).removeClass("bg-secondary text-white border-success");
  }
  
}
function deleteMilestone($here) {
  if(!confirm("Are you sure you want to delete? Chosen: " + $here.closest(".milestone-wrapper").find("input").val() ))
    return;
    
  var $context = $here.closest(".milestone-wrapper");
  var $milestone = $context;
  var milestoneName = $context.find("input").val();
  var milestoneId = $context.find("input").data("milestone-id");

  // Remove from DB:
  if (milestoneId) {
    hasher.setHash(`delete-api/milestones/${milestoneId}`);
  }

  // Remove from DOM
  var whichIndex = $milestone.index();
  $milestone.remove();
  $(".milestone-detail").eq(whichIndex).remove();
}
function addMilestone($here) {
  var $milestones = $here.prev(".milestones");

  // Append milestone
  $milestones.append(`
  <div class="milestone-wrapper">
    <input class="milestone" type="text" data-milestone-id=""/>
    <button class="milestone-delete btn btn-success float-end" onclick="doneMilestone($(event.target))"><i class="fa fa-check"></i></button>
    <button class="milestone-delete btn btn-danger float-end" onclick="deleteMilestone($(event.target))"><i class="fa fa-times"></i></button>
  </div>
  `);
  
  // Append milestone detail
  var $ancestor = $milestones.closest(".carousel-item");
  $ancestor.find(".milestone-details").append(`
    <input class="milestone-detail" type="text" data-milestone-id=""/>
  `);

  // Re-add autocompletion to all milestones
  setRecommendationsToMilestoneInputs();
}
</script>

<script>
function setRecommendationsToMilestoneInputs() {

  /** This jQuery UI autocompletion setting:
   *  - Array is fed to source.
   *  - That array has mixed values.
   *    - String
   *    - HTML tags. If has HTML tags, the first DIV's text will go to text input on selection
  */
  $("input.milestone").autocomplete({
    source: window.recommendations,
    html: true,

    select: function( event, ui ) { 
        var $input = $(event.target);
        
          var raw = ui.item.value;
          var tempDom = $(`<article>${raw}</article>`);
          var hasDiv = tempDom.find("*").first().length
          if(hasDiv) {
            var text = tempDom.find("*").first().text();
            $input.val(text);
          } else {
            $input.val(raw);
          }
          // Allowing you to override the default behaivor of clicking a suggestion
          return false;
      } // select
  
  });
}
setTimeout(()=>{
  window.recommendations.push("<span>Get an accountability partner</span><span style='margin-left:100px'><i class='fa fa-thumbs-up'></i> Improved chances</span>");
  window.recommendations = [...new Set(window.recommendations)];
  setRecommendationsToMilestoneInputs();
}, 2000);
</script>

<!-- Remove line when refactored into production code: -->
<script>$(".page-title").text("{{pageTitle}}");</script>