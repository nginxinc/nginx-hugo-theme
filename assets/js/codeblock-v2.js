document.addEventListener('DOMContentLoaded', () => {
  const codeblockLines = document.querySelectorAll('span.c1');
  codeblockLines.forEach((val) => {
    const parent = val.parentNode;
    parent.parentNode.insertBefore(val, parent.nextSibling);
  });
});
