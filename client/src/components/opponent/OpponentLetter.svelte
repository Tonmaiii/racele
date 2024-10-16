<script lang="ts">
    import colors from '../../util/colors'
    import { State } from '../../util/states'

    export let state: State = State.Unused
    export let unsubmitted = false
</script>

<div style="background-color: {unsubmitted ? '#0000' : colors[state]}"></div>

<style>
    div {
        aspect-ratio: 1/1;
    }
</style>
