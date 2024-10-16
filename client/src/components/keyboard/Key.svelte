<script lang="ts">
    export let letter: string
    import {
        addLetter,
        correctLetters,
        lockScreen,
        presentLetters,
        usedLetters
    } from '../../store/store'
    import colors from '../../util/colors'
    import { State } from '../../util/states'

    $: color =
        $correctLetters.has(letter) ? colors[State.Correct]
        : $presentLetters.has(letter) ? colors[State.Present]
        : $usedLetters.has(letter) ? colors[State.Incorrect]
        : colors[State.Unused]
</script>

<button
    on:mouseup={() => $lockScreen || addLetter(letter)}
    style="background-color: {color}"
>
    {letter}
</button>

<style>
    button {
        font-size: 12px;
        font-family: inherit;
        font-weight: bold;
        border: 0;
        padding: 0;
        margin: 0.25rem;
        height: 4rem;
        border-radius: 4px;
        cursor: pointer;
        user-select: none;
        color: white;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
