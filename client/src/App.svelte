<script lang="ts">
    import Board from './components/board/Board.svelte'
    import Keyboard from './components/keyboard/Keyboard.svelte'
    import Topbar from './components/topbar/Topbar.svelte'
    import {
        addGuess,
        addLetter,
        lockScreen,
        removeLetter
    } from './store/store'

    document.addEventListener('keydown', ({ key }) => {
        if ($lockScreen) return
        if (key === 'Backspace') removeLetter()
        else if (key === 'Enter') addGuess()
        else if (key.match(/^[a-zA-Z]$/)) addLetter(key.toUpperCase())
    })
</script>

<main>
    <Topbar />
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
