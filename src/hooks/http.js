import { useState, useEffect } from 'react';

export const useHttp = (url, dependencies, cleanupCallback = () => {}) => {
    const [isLoading, setLoading] = useState(false);
    const [fetchedData, setData] = useState(null);

    useEffect(() => {
        setLoading(true);
        console.log('sending http request: ' + url);
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch.');
                }
                return response.json();
            })
            .then(charData => {
                setData(charData);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });

        return cleanupCallback;
    }, dependencies);

    return [isLoading, fetchedData];
};
