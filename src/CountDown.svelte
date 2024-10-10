<script>
function daysUntil(targetDate) {
    const today = new Date();
    const target = new Date(targetDate);
    const timeDifference = target - today;

    // Convert timeDifference(ms) to days
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysLeft;
}

let countdown = daysUntil('2026-05-30');
</script>

<main>
    <h1>Countdown</h1>
    {#if countdown == 0}
        <p>Today is the day!</p>
    {:else if countdown > 0}
        <p>Days until wedding: {countdown}</p>
    {:else}
        <p>Thank you for coming!</p>
    {/if}
</main>