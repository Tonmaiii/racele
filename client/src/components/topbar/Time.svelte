<script lang="ts">
    import { startTime } from '../../store/store'
    import formatTime from '../../util/formatTime'

    let time: number
    const updateTime = () => {
        time = Date.now() - $startTime
        requestAnimationFrame(updateTime)
    }
    updateTime()
</script>

<div>
    {formatTime(time)}
</div>

<style>
    div {
        font-size: 2rem;
    }
</style>
