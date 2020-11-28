const getRandomColor = () => {
    const colors = [
        "#DAF7A6",
        "#FFC300",
        "#FF5733",
        "#C70039",
        "#10E85E",
        "#10E8CE",
        "#1065E8",
        "#5410E8",
        "#E810C4",
        "#E88910",
        "#E81010",
        "#B0E810",
    ];
    return colors [Math.floor(Math.random() * (colors.length + 1))];
    // return '#'+Math.random().toString(16).substr(2,6);
}

module.exports = {
    getRandomColor,
};