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

    let expandedImage = "";
    function expandImage(event) {
        let miniImageSrc = event.currentTarget.lastElementChild.src;
        console.log(miniImageSrc);
        expandedImage = miniImageSrc

        let imageDialog = document.getElementById("imageViewer");
        imageDialog.showModal();

        const myDiv = document.getElementById('myDiv');
        myDiv.addEventListener('click', (event) => event.stopPropagation());
    }
</script>

<main>
    <h1>Photos</h1>
    <div class="flex-container">
        {#each image_links as link}
            <button class="square" on:click={expandImage}>
                <img loading="lazy" src="{link}" alt="">
            </button>
        {/each}
    </div>
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <dialog id="imageViewer" on:click={(self) => self.currentTarget.close()}>
       <div id="myDiv">
            <img id="expandedImage" src={expandedImage} alt="">
       </div>
    </dialog>
</main>

<style lang="sass">
    .flex-container 
        display: flex
        margin: 0 auto
        flex-wrap: wrap
        justify-content: center

    .square
        max-width: 275px
        width: 32%
        aspect-ratio: 1/1
        margin-right: 30px
        margin-bottom: 30px

        /* Remove Button Default CSS */
        background: none
        color: inherit
        border: none
        padding: 0
        font: inherit
        cursor: pointer
        outline: inherit

        img 
            width: 100%
            height: 100%
            object-fit: cover
            image-rendering: -webkit-optimize-contrast /* for Chrome */

            &:hover
                transform: scale(1.01)
            
            /* Rounded Corners */
            border-radius: 30px
            box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.1)

    #expandedImage 
        max-width: 90vw
        max-height: 90vh
    
</style>
