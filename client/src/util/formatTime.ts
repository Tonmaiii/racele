const formatTime = (time: number) =>
    `${`${Math.floor(time / 1000)}`}.${`${time % 1000}`.padStart(3, '0')}`
export default formatTime
