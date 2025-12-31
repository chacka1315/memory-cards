export type CardData = {
  id: number;
  name: string;
  first_src: string;
  second_src: string;
};

export type KnownFetchData = {
  id: number;
  name: string;
  sprites: SpritesNeeded;
};

type SpritesNeeded = {
  other: {
    dream_world: {
      front_default: string;
    };
    'official-artwork': {
      front_default: string;
    };
  };
};
