export const blurredStyle = `
    filter: blur(1px);

    @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
        filter: none;
    }
`;
