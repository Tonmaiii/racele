<script lang="ts">
    import { currentGuess, guesses, results } from '../../store/store'
    import Cover from '../Cover.svelte'
    import Row from './Row.svelte'

    $: words = [...$guesses, $currentGuess]
    $: submitted = $guesses.length
</script>

<div>
    <Cover />
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
        max-width: calc(min(25rem, (100vh - 4.5rem * 3) * 5/6 - 70px - 3rem));
        max-height: calc(
            (6 / 5) * min(25rem, (100vh - 4.5rem * 3) * 5/6 - 70px - 3rem)
        );
    }
</style>
