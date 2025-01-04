export interface DistanceMatrix {
    rows: {
        elements: {
            status: string;
            distance: { text: string; value: number };
            duration: { text: string; value: number };
        }[];
    }[];
}

export interface AutoComplete {
    predictions: {
        structured_formatting: {
            main_text: string;
            secondary_text: string;
        };
        place_id: string;
        compound: {
            district: string;
            commune: string;
            province: string;
        };
    }[];
}

export interface Geocode {
    results: {
        place_id: string;
        name: string;
        address: string;
        compound: {
            district: string;
            commune: string;
            province: string;
        };
    }[];
}

export type PointList = [[number, number]][];
