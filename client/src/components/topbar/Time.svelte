<script lang="ts">
    import { startTime } from '../../store/store'

    let time: number
    const updateTime = () => {
        time = Date.now() - $startTime
        requestAnimationFrame(updateTime)
    }
    updateTime()

    const timeToString = (time: number) =>
        `${`${Math.floor(time / 1000)}`}.${`${time % 1000}`.padStart(3, '0')}`
</script>

<div>
    {timeToString(time)}
</div>

<style>
    div {
        font-size: 2rem;
    }
</style>
