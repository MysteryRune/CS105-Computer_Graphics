# CS105-Computer_Graphics

<details id="summary1" onclick="toggleSummary('summary1', 'summary2')">
  <summary>Show Summary 1</summary>
  
  This is the content for Summary 1.
</details>

<details id="summary2" onclick="toggleSummary('summary2', 'summary1')">
  <summary>Show Summary 2</summary>
  
  This is the content for Summary 2.
</details>

<script>
function toggleSummary(showId, hideId) {
  var showSummary = document.getElementById(showId);
  var hideSummary = document.getElementById(hideId);
  
  if (showSummary.open) {
    showSummary.open = false;
    hideSummary.open = true;
  } else {
    showSummary.open = true;
    hideSummary.open = false;
  }
}
</script>
