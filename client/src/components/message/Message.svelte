<script lang="ts">
    import { messages } from '../../store/store'
</script>

<div class="container">
    <div class="messages">
        {#each $messages as [message, color]}
            <div style="color:{color}">{message}</div>
        {/each}
    </div>
</div>

<style>
    div.container {
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: right;
        opacity: 30%;
        font-size: 1rem;
        pointer-events: none;
    }

    div.messages {
        margin: 1rem;
        margin-top: 3rem;
    }
</style>
