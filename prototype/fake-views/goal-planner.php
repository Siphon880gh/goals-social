<style>
.goal-planner-page [contenteditable]:empty:before {
    content: attr(data-placeholder);
}
.goal-planner-page [contenteditable]:empty {
    opacity: .5;
}
.date {
  margin-left: -20px;
  width: 100%;
  text-align: center;
}
</style>

<div class="goal-planner-page">
    <div class="grid">
      <div class="item item1">
        <p><strong>Goal</strong> Setting</p>
      </div>

      <div class="item item2">
        <p><span><i class="fa fa-star"></i> Goal:</span></p>
        <p class="text" contenteditable spellcheck="false" data-placeholder="You can edit this! Enter a goal."></p>
      </div>
      <div class="grid2">
        <div class="item item4">
          <p><span><i class="fa fa-star"></i> Milestones:</span></p>
          <p class="help">(what you need to do)</p>
          <p class="text" contenteditable spellcheck="false" data-placeholder="You can edit this! Enter specific subgoals"></p>
        </div>
        <div class="item item3">
          <p><span>Strategy:</span></p>
          <p class="help">(what you need to do)</p>
          <p class="text" contenteditable spellcheck="false" data-placeholder="You can edit this! Enter more details"></p>
        </div>
      </div>
      <div class="grid3">
        <div class="item item5">
          <p><span>Motivation:</span></p>
          <p class="help">(why do you want to achieve this goal)</p>
          <p class="text" contenteditable spellcheck="false" data-placeholder="You can edit this! Enter reasons why you want to achieve this goal"></p>
        </div>
        <div class="grid4">
          <div class="item item6">
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

<!-- Remove line when refactored into production code: -->
<script>$(".page-title").text("{{pageTitle}}");</script>