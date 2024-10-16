<script lang="ts">
    import Board from './components/board/Board.svelte'
    import Keyboard from './components/keyboard/Keyboard.svelte'
    import Message from './components/message/Message.svelte'
    import LeftSide from './components/opponent/LeftSide.svelte'
    import RightSide from './components/opponent/RightSide.svelte'
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

    let changeRightSideLayout: (
        players: { name: string; id: string }[],
        start: number
    ) => void
</script>

<main>
    <LeftSide changeRightSide={changeRightSideLayout} />
    <div class="play-area">
        <Topbar />
        <div class="board-container">
            <Board />
        </div>
        <Keyboard />
    </div>
    <Message />
    <RightSide bind:changeLayout={changeRightSideLayout} />
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        height: 100%;
    }

    .board-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
    }

    .play-area {
        width: 100%;
        max-width: 35rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        flex-direction: column;
    }
</style>
