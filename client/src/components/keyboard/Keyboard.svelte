<script lang="ts">
    import BackspaceKey from './BackspaceKey.svelte'
    import EnterKey from './EnterKey.svelte'
    import Key from './Key.svelte'

    //export let keys: string[]
</script>

<div class="container">
    <div class="row">
        {#each 'QWERTYUIOP' as letter}
            <Key {letter} />
        {/each}
    </div>
    <div class="row">
        <div class="space" />
        {#each 'ASDFGHJKL' as letter}
            <Key {letter} />
        {/each}
        <div class="space" />
    </div>
    <div class="row">
        <EnterKey />
        {#each 'ZXCVBNM' as letter}
            <Key {letter} />
        {/each}
        <BackspaceKey />
    </div>
</div>

<style>
    div.container {
        width: 100%;
        max-width: 35rem;
        flex: 0;
    }

    div.row {
        display: flex;
        width: 100%;
    }

    div.space {
        flex-grow: 0.5;
    }
</style>
