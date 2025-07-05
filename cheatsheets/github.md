```
const reviews = await github.rest.pulls.listReviews({
owner: context.repo.owner,
repo: context.repo.repo,
pull_number: pr.number,
});

const approved = reviews.data.some((review) => review.state === "APPROVED");

if (!approved) {
core.setFailed("❌ PR is not approved yet.");
return;
}

```
