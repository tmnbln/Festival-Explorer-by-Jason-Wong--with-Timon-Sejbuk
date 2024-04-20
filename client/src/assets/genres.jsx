const genreObj = {
    edm: "edm",
    indie: "indie",
    rock: "rock",
    pop: "pop",
    punk: "punk",
    rnb: "rhythm-and-blues-soul",
    folk: "folk",
    hiphop: "hip-hop-rap",
    metal: "metal",
    jazz: "jazz",
  };

  const genreArr = []
  for (const [key, value] of Object.entries(genreObj)) {
    genreArr.push(key);
  }

export { genreObj, genreArr };