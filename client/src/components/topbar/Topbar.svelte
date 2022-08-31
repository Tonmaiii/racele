<script lang="ts">
    import { lockScreen } from '../../store/store'
    import Players from './Players.svelte'
    import Time from './Time.svelte'
</script>

<div>
    <Players />
    {#if !$lockScreen}
        <Time />
    {/if}
</div>

<style>
    div {
        height: 3rem;
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: calc(min(25rem, (100vh - 4.5rem * 3) * 5/6 - 70px - 3rem));
    }
</style>
