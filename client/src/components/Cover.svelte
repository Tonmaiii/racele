<script lang="ts">
    import {
        countdown,
        finalTime,
        lockScreen,
        times,
        word
    } from '../store/store'

    const ordinal = (n: number) =>
        n === 0
            ? ''
            : n === 1
            ? '1st'
            : n === 2
            ? '2nd'
            : n === 3
            ? '3rd'
            : `${n}th`

    const color = (n: number) =>
        n === 1
            ? '#D6AF36'
            : n === 2
            ? '#A7A7AD'
            : n === 3
            ? '#A77044'
            : '#808080'

    let text: string
    let time: string
    $: {
        if ($finalTime === -1) text = 'The word was'
        else
            text = $countdown
                ? `${$countdown}`
                : ordinal($times.indexOf($finalTime) + 1)
        time =
            $finalTime === -2
                ? ''
                : $finalTime === -1
                ? $word
                : `${$finalTime / 1000}`
    }
</script>

<div
    style="visibility: {$lockScreen
        ? 'visible'
        : 'hidden'}; background-color: {color($times.indexOf($finalTime) + 1) +
        'B0'}; color: white"
>
    {text} <br />
    {time}
</div>

<style>
    div {
        position: fixed;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: calc(min(25rem, (100vh - 4.5rem * 3) * 5/6 - 70px - 3rem));
        max-height: calc(
            (6 / 5) * min(25rem, (100vh - 4.5rem * 3) * 5/6 - 70px - 3rem)
        );
        font-size: 4rem;
        text-align: center;
    }
</style>
