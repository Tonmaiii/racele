<script lang="ts">
    import Board from './components/board/Board.svelte'
    import Keyboard from './components/keyboard/Keyboard.svelte'
</script>

<main>
    <div>
        <Board />
    </div>
    <Keyboard />
</main>

<style>
    main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 100%;
        flex-direction: column;
    }

    div {
        width: 100%;
        height: 100%;
        display: flex;
        flex: 1;
        justify-content: center;
    }
</style>
