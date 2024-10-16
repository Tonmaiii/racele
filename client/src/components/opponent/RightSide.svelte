<script lang="ts">
    import OpponentBoard from './OpponentBoard.svelte'

    let containerOuter: HTMLDivElement
    let containerInner: HTMLDivElement

    export const changeLayout = (
        players: { name: string; id: string }[],
        start: number
    ) => {
        containerInner.replaceChildren()
        players.slice(start).findIndex(player => {
            const div = document.createElement('div')
            new OpponentBoard({
                target: div,
                props: { name: player.name, id: player.id }
            })
            containerInner.appendChild(div)
            if (containerOuter.scrollHeight !== containerOuter.clientHeight) {
                containerInner.removeChild(div)
                return true
            }
        })
    }
</script>

<div class="container-outer" bind:this={containerOuter}>
    <div class="container-inner" bind:this={containerInner}></div>
</div>

<style>
    .container-outer {
        flex: 1;
        height: auto;
        padding: 0.5rem;
        overflow: hidden;
    }

    .container-inner {
        display: grid;
        grid-template-columns: repeat(auto-fit, 8rem);
        gap: 0.5rem;
        width: 100%;
        justify-content: end;
    }
</style>
