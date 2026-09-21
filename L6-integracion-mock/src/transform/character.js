function getOriginName(rawCharacter) {
  return rawCharacter.origin?.name ?? "unknown";
}

function getLocationName(rawCharacter) {
  return rawCharacter.location?.name ?? "unknown";
}

export function toCharacterProfile(rawCharacter) {
  const { id, name, status, species, image } = rawCharacter;

  return {
    id,
    name: name ?? "Desconocido",
    status: status ?? "Unknown",
    species: species ?? "Unknown",
    image: image ?? "",
    originName: getOriginName(rawCharacter),
    locationName: getLocationName(rawCharacter),
  };
}
