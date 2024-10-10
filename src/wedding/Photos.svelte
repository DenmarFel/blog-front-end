<script>
    import { onMount } from 'svelte';
    let image_links = [];
    let data;
    onMount(async () => {
        const response = await fetch('https://storage.googleapis.com/storage/v1/b/blogphotos10062024/o?&prefix=engagement/FlytographerEngagement');
        data = await response.json();
        let temp_links = [];
        for (let i = 0; i < data.items.length; i++) {
            temp_links.push(`https://storage.googleapis.com/blogphotos10062024/${data.items[i].name}`);
        }
        image_links = temp_links;
    });
</script>

<main>
    <h1>Photos</h1>
    <div class="flex-container">
        {#each image_links as link}
            <div class="square">
                <img loading="lazy" src="{link}" alt="">
            </div>
        {/each}
    </div>
</main>

<style>
    .flex-container {
        display: flex;
        max-width: 930px;
        margin: 0 auto;
        flex-wrap: wrap;
    }

    .square {
        width: 32%;
        aspect-ratio: 1/1;
        margin: 2px;
    }

    .square img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        image-rendering: -webkit-optimize-contrast; /* for Chrome */
    }
</style>
