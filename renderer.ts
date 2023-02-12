const tbody = document.querySelector("tbody");
(async () => {
  console.log("HERE");
  const tr = await window.electronAPI.getTableRow();
  console.log(tr);
  if (tbody) tbody.innerHTML = tr;
})();
