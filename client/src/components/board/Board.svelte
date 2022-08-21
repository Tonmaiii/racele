<script lang="ts">
    import Row from './Row.svelte'
    import { guesses, currentGuess, results } from '../../store/store'
    import { each } from 'svelte/internal'

    $: words = [...$guesses, $currentGuess]
    $: submitted = $guesses.length
</script>

<div>
    {#each { length: 6 } as _, i}
        <Row
            word={words[i]}
            unsubmitted={submitted <= i}
            result={$results[i]}
        />
    {/each}
</div>

<style>
    div {
        display: grid;
        gap: 0.25rem;
        grid-template-columns: repeat(5, 1fr);
        width: 100%;
        max-width: calc(min(25rem, (100vh - 4.5rem * 3) * 5/6 - 70px));
    }
</style>
