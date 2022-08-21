<script lang="ts">
    import colors from '../../util/colors'
    import type { State } from '../../util/states'

    export let letter: string = ''
    export let unsubmitted = false
    export let state: State
</script>

<div
    style="background-color: {unsubmitted ? '#0000' : colors[state]}"
    class={unsubmitted ? 'unsubmitted' : ''}
>
    {letter}
</div>

<style>
    div {
        aspect-ratio: 1/ 1;
        display: flex;
        align-items: center;
        font-size: 2rem;
        font-weight: bold;
        justify-content: center;
        color: #fff;
    }

    .unsubmitted {
        border: 2px solid #3a3a3c;
    }

    @media (max-height: 600px) {
        div {
            font-size: 1rem;
            line-height: 1rem;
        }
    }
</style>
