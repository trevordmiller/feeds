const descriptionDataToSummary = descriptionData => {
  if (!descriptionData) {
    return null;
  }

  const textContent = descriptionData.replace(/<[^>]*>/g, "");

  const maxCharacterNoise = 80;

  if (textContent.length > maxCharacterNoise) {
    return null;
  }

  return textContent;
};

export default descriptionDataToSummary;
