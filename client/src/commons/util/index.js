// 화면 상단으로 이동
export const scrollToTop = () => {
    const options = {
        top: 0,
        left: 0
    };

    // 스크롤을 맨 위로 이동
    window.scrollTo(options);
};
