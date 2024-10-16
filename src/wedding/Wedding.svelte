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

let googleCalendarLink = "https://www.google.com/calendar/render?action=TEMPLATE&text=Wedding+of+Charlene+and+Denmar&dates=20260531T000000Z/20260531T053000Z&details=Test&location=&trp=false&sf=tr";
</script>

<main>
    <h1>Wedding</h1>
    {#if countdown == 0}
        <p>Today is the day!</p>
    {:else if countdown > 0}
        <p>Days until wedding: {countdown}</p>
    {:else}
        <p>Thank you for coming!</p>
    {/if}

    <a href="#/wedding/RSVP">RSVP</a>

    <p>Saturday, May 30, 2024, from 5:00 PM to 2:00 PM (PST)</p>
    <p>Save to <a href={googleCalendarLink} target="_blank">Google</a> · <a href="public/wedding.ics">iPhone</a></p><a href="static/wedding.ics">

</main>