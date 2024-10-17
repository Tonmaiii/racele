<script lang="ts">
    import { lockScreen, notStarted, startTime } from '../../store/store'
    import Players from './Players.svelte'
    import Settings from './Settings.svelte'
    import Time from './Time.svelte'
</script>

<div>
    <Players />
    {#if !$lockScreen || ($notStarted && $startTime)}
        <Time />
    {/if}
    <Settings />
</div>

<style>
    div {
        height: 3rem;
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 35rem;
        border-bottom: 1px solid #3a3a3c;
    }
</style>
