if (localStorage.getItem("useNewTheme") === "true") {
  useNewTheme(true);
}

function useNewTheme(useNewTheme) {
  localStorage.setItem("useNewTheme", `${useNewTheme}`);

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
    "css6",
  ];

  v1cssIds.forEach((cssId) => {
    document.getElementById(cssId).disabled = useNewTheme;
  });

  const v2cssIds = ["css7"];
  v2cssIds.forEach((cssId) => {
    document.getElementById(cssId).disabled = !useNewTheme;
  });
}
