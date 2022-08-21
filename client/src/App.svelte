<script lang="ts">
    import Board from './components/board/Board.svelte'
    import Keyboard from './components/keyboard/Keyboard.svelte'
</script>

<main>
    <Board />
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
</style>
