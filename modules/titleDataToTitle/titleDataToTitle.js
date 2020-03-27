const titleDataToTitle = titleData => {
  const textContent = titleData.replace("<![CDATA[", "").replace("]]>", "");

  return textContent;
};

export default titleDataToTitle;
