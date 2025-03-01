export const timeFormatter = (second: number) => {
    const minute = Math.floor(second / 60);
    const sec = second % 60;
    
    if (sec === 0) {
        return `${minute}분`;
    }
    return `${minute}분 ${sec}초`;
};
