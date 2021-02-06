<style>
/** Placeholder on empty */
.goal-planner-page [contenteditable]:empty:before {
    content: attr(data-placeholder);
}
.goal-planner-page [contenteditable]:empty {
    opacity: .5;
}
/* Date visual */
.date {
  margin-left: -20px;
  width: 100%;
  text-align: center;
}

/* Milestone inputs and buttons */
.milestone {
  display: flex;
}
.milestone, .milestone-detail {
  margin-bottom: 5px;
  height: 30px;
}
.milestone input {
  width: 100%;
}
.milestone button {
  width: 40px;
  height: 30px;
  margin-right: 5px;
}
.milestone button:nth-child(2) {
  margin-left: 5px;
}
.milestone-add {
  display: block;
  margin-top: 10px;
}

/* Milestone details */
.milestone-detail {
  width: 90%;
}
</style>

<div class="goal-planner-page">
    <div class="grid">
      <div class="item item1">
        <p><strong>Goal</strong> Setting</p>
      </div>

      <div class="item item2">
        <p><span><i class="fa fa-star"></i> Goal:</span></p>
        <p class="text" contenteditable spellcheck="false" data-placeholder="You can edit this! Enter a goal.">{{goal}}</p>
      </div>
      <div class="grid2">
        <div class="item item4">
          <p><span><i class="fa fa-star"></i> Milestones:</span></p>
          <p class="help">(what you need to do)</p>
          <!-- <p class="text" data-placeholder="You can edit this! Enter specific subgoals"></p> -->
          <div class="milestones">
            {{#each milestones}}
            <div class="milestone">
              <input class="milestone" type="text" value="{{milestone}}" placeholder="Enter a milestone" />
              <button class="milestone-delete btn btn-success float-end" onclick="doneMilestone($(event.target))"><i class="fa fa-check"></i></button>
              <button class="milestone-delete btn btn-danger float-end" onclick="deleteMilestone($(event.target))"><i class="fa fa-times"></i></button>
            </div>
            {{/each}}
          </div>
          <button class="milestone-add btn btn-primary"><i class="fa fa-plus"></i> Add new milestone! </button>
          
        </div>
        <div class="item item3">
          <p><span>Strategy:</span></p>
          <p class="help">(how you do it)</p>
          <div class="milestone-details">
            {{#each milestones}}
              <input class="milestone-detail" type="text"/>
            {{/each}}
            <!-- <p class="text milestone-detail" contenteditable spellcheck="false" data-placeholder="You can edit this! Enter more details"></p> -->
          </div>
        </div>
      </div>
      <div class="grid3">
        <div class="item item5">
          <p><span>Motivation:</span></p>
          <p class="help">(why do you want to achieve this goal)</p>
          <p class="text" contenteditable spellcheck="false" data-placeholder="You can edit this! Enter reasons why you want to achieve this goal"></p>
        </div>
        <div class="grid4">
          <div class="item item6 pt-3">
            <p class="date"><span><i class="fa fa-star"></i> Start Date</span></p>
            <p><input type="date" class="date-start" /></p>
          </div>
          <div class="item item7">
            <p class="date"><span><i class="fa fa-star"></i> Target Date</span></p>
            <p><input type="date" class="date-end" /></p>
          </div>
        </div>
      </div>
    </div>

  </div>

<link rel="stylesheet" href="assets/css/goal-planner.css">


<script>
function doneMilestone($here) {
  var $milestone = $here.closest(".milestone");
  var whichIndex = $milestone.index();
  $milestone.find("input, button").attr("disabled", true);
  $(".milestone-detail").eq(whichIndex).attr("disabled", true);
  
}
function deleteMilestone($here) {
  var $milestone = $here.closest(".milestone");
  var whichIndex = $milestone.index();
  $milestone.remove();
  $(".milestone-detail").eq(whichIndex).remove();
}
$(".milestone-add").on("click", ()=>{
  $(".milestones").append(`
  <div class="milestone">
    <input class="milestone" type="text"/>
    <button class="milestone-delete btn btn-success float-end" onclick="doneMilestone($(event.target))"><i class="fa fa-check"></i></button>
    <button class="milestone-delete btn btn-danger float-end" onclick="deleteMilestone($(event.target))"><i class="fa fa-times"></i></button>
  </div>
  `);

  $(".milestone-details").append(`
    <input class="milestone-detail" type="text"/>
  `)
})
</script>

<!-- Remove line when refactored into production code: -->
<script>$(".page-title").text("{{pageTitle}}");</script>