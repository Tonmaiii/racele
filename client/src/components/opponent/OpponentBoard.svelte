<script lang="ts">
    import { opponentResults, times } from '../../store/store'
    import { State } from '../../util/states'
    import OpponentCover from './OpponentCover.svelte'
    import OpponentLetter from './OpponentLetter.svelte'

    export let id: string
    export let name: string

    $: results = $opponentResults[id]
    $: resultsPadded = Array(6)
        .fill(null)
        .map((_, i) => results?.[i] ?? new Array(5).fill(null))

    $: visible =
        results?.length === 6 ||
        results?.at(-1)?.every(state => state === State.Correct)
    $: placement = $times.findIndex(time => time.id === id) + 1
    $: time = $times.find(time => time.id === id)
</script>

<div class="container">
    <OpponentCover {placement} time={time?.time} {visible} />
    <div class="grid">
        {#each resultsPadded as result}
            {#each result as state}
                {#if state}
                    <OpponentLetter {state} />
                {:else}
                    <OpponentLetter unsubmitted={true} />
                {/if}
            {/each}
        {/each}
    </div>
    <div class="name">{name}</div>
</div>

<style>
    .container {
        position: relative;
        text-align: center;
        background-color: #0003;
    }

    .grid {
        display: grid;
        gap: 0.125rem;
        grid-template-columns: repeat(5, 1fr);
        width: 100%;
    }

    .name {
        text-wrap: nowrap;
        overflow: hidden;
        padding: 0.25rem;
    }
</style>
