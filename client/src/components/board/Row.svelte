<script lang="ts">
    import type { State } from '../../util/states'
    import Letter from './Letter.svelte'

    export let word: string = ''
    export let unsubmitted = false
    export let result: State[]
</script>

{#each { length: 5 } as _, i}
    <Letter letter={word?.[i] ?? ''} {unsubmitted} state={result?.[i]} />
{/each}

<style>
</style>
