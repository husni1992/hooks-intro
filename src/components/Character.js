import React, { useEffect } from 'react';

import { useHttp } from '../hooks/http';
import Summary from './Summary';

const Character = props => {
    // const [loadedCharacter, setLoadedCharacter] = useState({});
    // const [isLoading, setIsLoading] = useState(false);

    // shouldComponentUpdate(nextProps, nextState) {
    //   console.log('shouldComponentUpdate');
    //   return (
    //     nextProps.selectedChar !== props.selectedChar ||
    //     nextState.loadedCharacter.id !== loadedCharacter.id ||
    //     nextState.isLoading !== isLoading
    //   );
    // }

    // componentDidUpdate(prevProps) {
    //   console.log('Component did update');
    //   if (prevProps.selectedChar !== props.selectedChar) {
    //     this.fetchData();
    //   }
    // }

    // componentDidMount() {
    //   this.fetchData();
    // }

    // componentWillUnmount() {
    //   console.log('Too soon...');
    // }

    // Component did update
    // component Did Mount
    // useEffect(() => {
    //     fetchData();

    //     return () => {
    //         console.log('Cleaning up...');
    //     };
    // }, [props.selectedChar]);

    // const fetchData = () => {
    //     console.log('Sending Http request for new character with id ' + props.selectedChar);
    //     setIsLoading(true);
    //     fetch('https://swapi.co/api/people/' + props.selectedChar)
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Could not fetch person!');
    //             }
    //             return response.json();
    //         })
    //         .then(charData => {
    //             const loadedCharacter = {
    //                 id: props.selectedChar,
    //                 name: charData.name,
    //                 height: charData.height,
    //                 colors: {
    //                     hair: charData.hair_color,
    //                     skin: charData.skin_color,
    //                 },
    //                 gender: charData.gender,
    //                 movieCount: charData.films.length,
    //             };

    //             setLoadedCharacter(loadedCharacter);
    //             setIsLoading(false);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             setIsLoading(false);
    //         });
    // };

    const [isLoading, fetchedData] = useHttp('https://swapi.co/api/people/' + props.selectedChar, [props.selectedChar], () => {
        console.log('Cleaning up...');
    });

    useEffect(() => {
        console.log('started');
        return () => {
            console.log('component did unmount');
        };
    }, []);

    const loadedCharacter = fetchedData
        ? {
              id: props.selectedChar,
              name: fetchedData.name,
              height: fetchedData.height,
              colors: {
                  hair: fetchedData.hair_color,
                  skin: fetchedData.skin_color,
              },
              gender: fetchedData.gender,
              movieCount: fetchedData.films.length,
          }
        : null;

    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter) {
        content = (
            <Summary
                name={loadedCharacter.name}
                gender={loadedCharacter.gender}
                height={loadedCharacter.height}
                hairColor={loadedCharacter.colors.hair}
                skinColor={loadedCharacter.colors.skin}
                movieCount={loadedCharacter.movieCount}
            />
        );
    } else if (!isLoading && !loadedCharacter) {
        content = <p>Failed to fetch character.</p>;
    }

    console.log('rendering: Character');
    return content;
};

export default React.memo(Character, (prevProps, nextProps) => {
    return prevProps.selectedChar === nextProps.selectedChar;
});
