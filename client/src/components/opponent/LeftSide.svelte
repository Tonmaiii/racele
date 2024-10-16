<script lang="ts">
    import { onMount } from 'svelte'
    import { players } from '../../store/store'
    import OpponentBoard from './OpponentBoard.svelte'

    let containerOuter: HTMLDivElement
    let containerInner: HTMLDivElement

    $: if (mounted) changeLayout($players)
    const changeLayout = (players: { name: string; id: string }[]) => {
        containerInner.replaceChildren()
        let newRightSideStart = players.findIndex(player => {
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
        if (newRightSideStart === -1) newRightSideStart = players.length
        if (newRightSideStart !== rightSideStart) {
            rightSideStart = newRightSideStart
            changeRightSide(players, rightSideStart)
        }
    }

    export let changeRightSide: (
        players: { name: string; id: string }[],
        start: number
    ) => void

    let rightSideStart: number

    const observer = new ResizeObserver(() => changeLayout($players))

    let mounted = false
    onMount(() => {
        mounted = true
        observer.observe(containerOuter)
    })
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
    }
</style>
