export function useInvertedData(data: any) {
    return data.map((serie: any) => ({
        ...serie,
        data: serie.data.map((point: { x: any; y: number; }): any => ({
            x: point.x,
            y: -point.y
        }))
    }));
}
