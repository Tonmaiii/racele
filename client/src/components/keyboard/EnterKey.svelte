<script lang="ts">
    import { addGuess } from '../../store/store'
</script>

<button on:click={addGuess}>ENTER</button>

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
        background-color: #818384;
        color: white;
        flex: 1.5;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
