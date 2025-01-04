export interface DistanceMatrix {
    rows: {
        elements: {
            status: string;
            distance: { text: string; value: number };
            duration: { text: string; value: number };
        }[];
    }[];
}
