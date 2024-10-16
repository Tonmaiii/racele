<script lang="ts">
    import {} from '../../store/store'
    import formatTime from '../../util/formatTime'

    export let placement: number | null
    export let time: number
    export let visible = false

    const ordinal = (n: number) =>
        n === 0 ? ''
        : n === 1 ? '1st'
        : n === 2 ? '2nd'
        : n === 3 ? '3rd'
        : `${n}th`

    const color = (n: number) =>
        n === 1 ? '#D6AF36'
        : n === 2 ? '#A7A7AD'
        : n === 3 ? '#A77044'
        : '#808080'

    $: text = placement === null ? '' : ordinal(placement)
    $: timeText = time ? formatTime(time) : ''
</script>

<div
    style="visibility: {visible ? 'visible' : (
        'hidden'
    )}; background-color: {color(placement) + 'B0'}; color: white"
>
    <span>{text}</span>
    <span class="time">{timeText}</span>
</div>

<style>
    div {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        text-align: center;
        flex-direction: column;
    }

    span.time {
        font-size: 2rem;
    }
</style>
