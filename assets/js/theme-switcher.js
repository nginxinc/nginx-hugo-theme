if (localStorage.getItem("useNewTheme") === "true") {
  useNewTheme(true);
}

function useNewTheme(useNewTheme) {
  localStorage.setItem("useNewTheme", `${useNewTheme}`);

  // swap out v1 and v2 css style
  const v1cssIds = [
    "cssFA1",
    "cssFA2",
    "cssFA3",
    "cssBootstrap",
    "css1",
    "css2",
    "css3",
    "css4",
    "css5",
    "css6"
  ];

  v1cssIds.forEach((cssId) => {
    document.getElementById(cssId).disabled = useNewTheme;
  });

  const v2cssIds = ["css7"];
  v2cssIds.forEach((cssId) => {
    document.getElementById(cssId).disabled = !useNewTheme;
  });

  // swap out v1 and v2 elements
  const v1ElementIds = ["sidebar", "toc"]

  v1ElementIds.forEach((elementId) => {
    document.getElementById(elementId).style.display = useNewTheme ? "none" : "";
  });

  const v2ElementIds = ["sidebar-v2"];
  v2ElementIds.forEach((elementId) => {
    document.getElementById(elementId).style.display = useNewTheme ? "": "none";
  });

  const mfElements = ['[data-mf="true"]'];
  mfElements.forEach((elementId) => {
    document
      .querySelectorAll(elementId)
      .forEach(
        (element) => (element.style.display = useNewTheme ? "" : "none")
      );
  });

}
