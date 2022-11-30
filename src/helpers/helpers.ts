export const sortArrayJson = (
  textInitialA: any,
  textInitialB: any,
  nameAttribute: any
) => {
  const textA = textInitialA[nameAttribute];
  const textB = textInitialB[nameAttribute];
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};
