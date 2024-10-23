function CopyCode(clipboard) {
  document.querySelectorAll(".highlight").forEach((codeBlock) => {
    const button = document.createElement("button");
    button.className = "code-copy";
    button.type = "button";
    button.innerHTML = '<i class="fas fa-copy"></i> Copy';

    button.addEventListener("click", async () => {
      try {
        await clipboard.writeText(
          codeBlock.textContent
            .replace(/^\s*\d+\s/gm, "") // remove line numbers
            .replace(/^\s*|\s*$/g, "") // remove carriage returns at top and bottom of block
        );

        button.blur(); /* Chrome fix */
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-copy"></i> Copy';
        }, 2000);
      } catch (error) {
        button.innerHTML = '<i class="fas fa-exclamation"></i> Error';
        console.error(error);
      }
    });

    codeBlock.parentNode.insertBefore(button, codeBlock);
  });
}

CopyCode(navigator.clipboard);
